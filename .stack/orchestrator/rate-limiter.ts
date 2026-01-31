/**
 * Rate Limiter
 *
 * Centralized rate limiting with circuit breaker pattern
 * Manages API call rates across all agents
 */

export interface RateLimiterConfig {
  enabled: boolean;
  maxRequestsPerMinute: number;
  maxTokensPerMinute: number;
  perAgentLimit: number;
  perAgentTokenLimit: number;
  backoff: {
    initialDelay: number;
    maxDelay: number;
    multiplier: number;
    jitter: boolean;
  };
  circuitBreaker: {
    enabled: boolean;
    failureThreshold: number;
    resetTimeout: number;
  };
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
  capacity: number;
  refillRate: number; // tokens per second
}

interface AgentState {
  bucket: TokenBucket;
  failures: number;
  lastFailure: number | null;
  circuitOpen: boolean;
  circuitOpenedAt: number | null;
}

export interface RateLimitResult {
  allowed: boolean;
  waitTime: number; // ms to wait before retry
  reason?: string;
}

export class RateLimiter {
  private config: RateLimiterConfig;
  private globalBucket: TokenBucket;
  private agentStates: Map<string, AgentState> = new Map();
  // Reserved for future queuing implementation
  // private pendingRequests: Array<{
  //   agentId: string;
  //   resolve: (result: RateLimitResult) => void;
  //   tokens: number;
  // }> = [];

  constructor(config: RateLimiterConfig) {
    this.config = config;

    // Initialize global bucket
    const tokensPerSecond = config.maxRequestsPerMinute / 60;
    this.globalBucket = {
      tokens: config.maxRequestsPerMinute,
      lastRefill: Date.now(),
      capacity: config.maxRequestsPerMinute,
      refillRate: tokensPerSecond,
    };

    // Start background refill timer
    if (config.enabled) {
      setInterval(() => this.refillBuckets(), 1000);
    }
  }

  /**
   * Request permission to make an API call
   */
  async acquire(agentId: string, tokens = 1): Promise<RateLimitResult> {
    if (!this.config.enabled) {
      return { allowed: true, waitTime: 0 };
    }

    // Get or create agent state
    const agentState = this.getOrCreateAgentState(agentId);

    // Check circuit breaker
    if (agentState.circuitOpen) {
      const timeSinceOpen = Date.now() - (agentState.circuitOpenedAt || 0);
      if (timeSinceOpen < this.config.circuitBreaker.resetTimeout) {
        return {
          allowed: false,
          waitTime: this.config.circuitBreaker.resetTimeout - timeSinceOpen,
          reason: 'Circuit breaker open',
        };
      } else {
        // Half-open: allow one request to test
        agentState.circuitOpen = false;
        agentState.failures = 0;
      }
    }

    // Refill buckets
    this.refillBucket(this.globalBucket);
    this.refillBucket(agentState.bucket);

    // Check global limit
    if (this.globalBucket.tokens < tokens) {
      const waitTime = this.calculateWaitTime(this.globalBucket, tokens);
      return {
        allowed: false,
        waitTime: this.applyJitter(waitTime),
        reason: 'Global rate limit exceeded',
      };
    }

    // Check agent limit
    if (agentState.bucket.tokens < tokens) {
      const waitTime = this.calculateWaitTime(agentState.bucket, tokens);
      return {
        allowed: false,
        waitTime: this.applyJitter(waitTime),
        reason: 'Agent rate limit exceeded',
      };
    }

    // Consume tokens
    this.globalBucket.tokens -= tokens;
    agentState.bucket.tokens -= tokens;

    return { allowed: true, waitTime: 0 };
  }

  /**
   * Report a successful API call
   */
  reportSuccess(agentId: string): void {
    const state = this.agentStates.get(agentId);
    if (state) {
      state.failures = 0;
      state.lastFailure = null;
    }
  }

  /**
   * Report a failed API call
   */
  reportFailure(agentId: string, isRateLimitError = false): void {
    const state = this.agentStates.get(agentId);
    if (!state) return;

    state.failures++;
    state.lastFailure = Date.now();

    // Open circuit if threshold exceeded
    if (
      this.config.circuitBreaker.enabled &&
      state.failures >= this.config.circuitBreaker.failureThreshold
    ) {
      state.circuitOpen = true;
      state.circuitOpenedAt = Date.now();
      console.warn(`Circuit breaker opened for agent: ${agentId}`);
    }

    // If rate limit error, apply extra backoff
    if (isRateLimitError) {
      state.bucket.tokens = 0;
    }
  }

  /**
   * Get current rate limit status
   */
  getStatus(): {
    global: { available: number; capacity: number; percentage: number };
    agents: Map<string, { available: number; capacity: number; circuitOpen: boolean }>;
  } {
    this.refillBucket(this.globalBucket);

    const agents = new Map<string, { available: number; capacity: number; circuitOpen: boolean }>();

    for (const [agentId, state] of this.agentStates) {
      this.refillBucket(state.bucket);
      agents.set(agentId, {
        available: Math.floor(state.bucket.tokens),
        capacity: state.bucket.capacity,
        circuitOpen: state.circuitOpen,
      });
    }

    return {
      global: {
        available: Math.floor(this.globalBucket.tokens),
        capacity: this.globalBucket.capacity,
        percentage: (this.globalBucket.tokens / this.globalBucket.capacity) * 100,
      },
      agents,
    };
  }

  /**
   * Wait for rate limit to allow request
   */
  async waitForSlot(agentId: string, tokens = 1, maxWait = 60000): Promise<RateLimitResult> {
    const startTime = Date.now();
    let totalWait = 0;

    while (totalWait < maxWait) {
      const result = await this.acquire(agentId, tokens);

      if (result.allowed) {
        return result;
      }

      const waitTime = Math.min(result.waitTime, maxWait - totalWait);
      await this.sleep(waitTime);
      totalWait = Date.now() - startTime;
    }

    return {
      allowed: false,
      waitTime: 0,
      reason: `Max wait time (${maxWait}ms) exceeded`,
    };
  }

  /**
   * Reset rate limiter for an agent
   */
  reset(agentId: string): void {
    const state = this.agentStates.get(agentId);
    if (state) {
      state.bucket.tokens = state.bucket.capacity;
      state.failures = 0;
      state.lastFailure = null;
      state.circuitOpen = false;
      state.circuitOpenedAt = null;
    }
  }

  /**
   * Reset all rate limiters
   */
  resetAll(): void {
    this.globalBucket.tokens = this.globalBucket.capacity;
    this.agentStates.clear();
  }

  // ============================================
  // Private Methods
  // ============================================

  private getOrCreateAgentState(agentId: string): AgentState {
    let state = this.agentStates.get(agentId);

    if (!state) {
      const tokensPerSecond = this.config.perAgentLimit / 60;
      state = {
        bucket: {
          tokens: this.config.perAgentLimit,
          lastRefill: Date.now(),
          capacity: this.config.perAgentLimit,
          refillRate: tokensPerSecond,
        },
        failures: 0,
        lastFailure: null,
        circuitOpen: false,
        circuitOpenedAt: null,
      };
      this.agentStates.set(agentId, state);
    }

    return state;
  }

  private refillBuckets(): void {
    this.refillBucket(this.globalBucket);

    for (const state of this.agentStates.values()) {
      this.refillBucket(state.bucket);
    }
  }

  private refillBucket(bucket: TokenBucket): void {
    const now = Date.now();
    const elapsed = (now - bucket.lastRefill) / 1000; // seconds
    const refill = elapsed * bucket.refillRate;

    bucket.tokens = Math.min(bucket.capacity, bucket.tokens + refill);
    bucket.lastRefill = now;
  }

  private calculateWaitTime(bucket: TokenBucket, neededTokens: number): number {
    const tokensNeeded = neededTokens - bucket.tokens;
    if (tokensNeeded <= 0) return 0;

    const secondsToWait = tokensNeeded / bucket.refillRate;
    return Math.ceil(secondsToWait * 1000);
  }

  private applyJitter(waitTime: number): number {
    if (!this.config.backoff.jitter) {
      return waitTime;
    }

    // Add 0-25% random jitter
    const jitter = waitTime * 0.25 * Math.random();
    return Math.ceil(waitTime + jitter);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default RateLimiter;
