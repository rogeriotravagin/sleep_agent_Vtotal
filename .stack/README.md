# AIOS + Auto-Claude + Ralph Stack

Stack de integração de 3 camadas para orquestração de agentes IA.

```
AIOS-core (Planejamento)     → Stories YAML detalhadas
    ↓
Auto-Claude (Orquestração)   → Distribui para worktrees paralelos
    ↓
Ralph (Execução)             → Loop autônomo até conclusão
```

## Instalação

```bash
# Navegar para a pasta .stack
cd .stack

# Instalar dependências
npm install

# Verificar status
bash scripts/stack-status.sh
```

## Uso

### Processar uma story

```bash
bash scripts/stack-start.sh --story docs/stories/1.1.story.md
```

### Processar várias stories em batch

```bash
bash scripts/stack-start.sh --batch docs/stories/ --parallel 3
```

### Verificar status

```bash
bash scripts/stack-status.sh
```

### Sincronizar estados

```bash
bash scripts/stack-sync.sh
```

### Parar execução

```bash
bash scripts/stack-stop.sh
```

## Estrutura

```
.stack/
├── config/
│   └── stack-config.yaml     # Configuração unificada
├── adapters/
│   ├── interfaces/           # Contratos TypeScript
│   ├── aios-to-spec.adapter.ts
│   ├── spec-to-prd.adapter.ts
│   ├── aios-to-prd.adapter.ts
│   └── ralph-executor.ts
├── orchestrator/
│   ├── pipeline.ts           # Pipeline principal
│   ├── worktree-manager.ts   # Gerencia git worktrees
│   └── rate-limiter.ts       # Rate limiting
├── cli/
│   └── run-pipeline.ts       # CLI em TypeScript
├── scripts/
│   ├── stack-start.sh
│   ├── stack-status.sh
│   ├── stack-sync.sh
│   └── stack-stop.sh
├── logs/                     # Logs de execução
└── temp/                     # Arquivos temporários
```

## Fluxo de Dados

```
┌─────────────────┐
│   AIOS Story    │  (.story.md com 13 seções)
│   status: Ready │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AiosToSpec      │  Adapter converte formato
│ Adapter         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Auto-Claude     │  spec.md + requirements.json
│ Spec            │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SpecToPrd       │  Adapter converte para Ralph
│ Adapter         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ralph PRD       │  prd.json + progress.txt
│ (git worktree)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ralph Loop      │  Executa até COMPLETE
│ (claude CLI)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Merge to main   │
│ (via worktree)  │
└─────────────────┘
```

## Configuração

Editar `.stack/config/stack-config.yaml`:

```yaml
aios:
  enabled: true
  storiesPath: "../aios-core/docs/stories"

autoClaude:
  enabled: true
  maxParallelAgents: 6

ralph:
  enabled: true
  maxIterations: 30
  timeout: 3600000

rateLimiting:
  enabled: true
  maxRequestsPerMinute: 800
  perAgentLimit: 60
```

## Componentes

### AIOS Core
- **Localização:** `aios-core/`
- **Função:** Planejamento e definição de stories
- **Formato:** Stories em Markdown com 13 seções

### Auto-Claude
- **Localização:** `.auto-claude/`
- **Função:** Orquestração e distribuição
- **Formato:** Specs em Markdown + JSON

### Ralph
- **Localização:** `ralph/`
- **Função:** Execução autônoma
- **Formato:** PRD JSON com userStories

## Rate Limiting

A stack implementa rate limiting centralizado:

- **Global:** 800 requests/minuto (reservando 20% do limite)
- **Por agente:** 60 requests/minuto
- **Circuit breaker:** Abre após 5 falhas consecutivas
- **Backoff exponencial:** Com jitter para evitar thundering herd

## Worktrees

Cada task é executada em um git worktree isolado:

```bash
# Listar worktrees ativos
git worktree list

# Limpar worktrees órfãos
git worktree prune
```

Os worktrees são criados em `.auto-claude/worktrees/` e nomeados como `task-{id}-{timestamp}`.

## Desenvolvimento

```bash
# Build TypeScript
npm run build

# Type check
npm run typecheck

# Rodar em dev mode
npx tsx cli/run-pipeline.ts --help
```

## Troubleshooting

### Claude CLI não encontrado
Instale o Claude CLI:
```bash
npm install -g @anthropic-ai/claude-cli
```

### Rate limit exceeded
Reduza `maxParallelAgents` no config ou aguarde o rate limit resetar.

### Worktree já existe
```bash
git worktree prune
git branch -D auto-claude/{task-id}
```

## Licença

MIT
