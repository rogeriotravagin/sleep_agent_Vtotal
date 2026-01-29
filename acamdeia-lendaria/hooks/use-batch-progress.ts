
import { useState, useEffect, useCallback } from 'react';
import { BatchProgress } from '../types/batch';

const JSON_URL = '/batch-progress.json';
const API_BASE = '/api/pipeline';

export function useBatchProgress() {
  const [data, setData] = useState<BatchProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [serverAvailable, setServerAvailable] = useState(false);
  const [isAutoRefreshing, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch static JSON data (Read)
  const fetchData = useCallback(async () => {
    try {
      // Add timestamp to prevent caching
      const res = await fetch(`${JSON_URL}?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to load batch data");
      const jsonData = await res.json();
      setData(jsonData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      // Suppress error in console for demo purposes, just warn
      console.warn("Batch data fetch failed (Demo Mode active):", err);
      if (loading) setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Check Server Status (Health)
  const checkServer = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/`);
      if (res.ok) {
        setServerAvailable(true);
      } else {
        setServerAvailable(false);
      }
    } catch (e) {
      setServerAvailable(false);
    }
  }, []);

  // Polling Effect
  useEffect(() => {
    fetchData();
    checkServer();

    let interval: ReturnType<typeof setInterval>;
    if (isAutoRefreshing) {
      interval = setInterval(() => {
        fetchData();
        // We verify server less frequently or just rely on action failures, 
        // but checking here ensures the "Server Offline" badge is accurate.
        checkServer(); 
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isAutoRefreshing, fetchData, checkServer]);

  // Actions
  const playBook = async (slug: string) => {
    const res = await fetch(`${API_BASE}/books/${slug}/play`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to start pipeline');
    fetchData(); // Immediate refresh
    return await res.json();
  };

  const pauseBook = async (slug: string) => {
    const res = await fetch(`${API_BASE}/books/${slug}/pause`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to pause pipeline');
    fetchData();
    return await res.json();
  };

  const retryBook = async (slug: string) => {
    const res = await fetch(`${API_BASE}/books/${slug}/retry`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from_phase: 1 })
    });
    if (!res.ok) throw new Error('Failed to retry pipeline');
    fetchData();
    return await res.json();
  };

  const addBook = async (title: string, author: string, slug?: string) => {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, slug })
    });
    if (!res.ok) throw new Error('Failed to add book');
    fetchData();
    return await res.json();
  };

  return {
    data,
    loading,
    error,
    lastUpdated,
    serverAvailable,
    isAutoRefreshing,
    setAutoRefresh,
    refetch: fetchData,
    playBook,
    pauseBook,
    retryBook,
    addBook
  };
}
