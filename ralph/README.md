# Ralph Expansion Pack

**Versão:** 2.5 (External Loop Architecture)
**Status:** ✅ Ready
**Dependências:** `ralph.sh` (bash script) + Claude Code CLI
**Ativação:** `@ralph` (preparação) → `./ralph.sh` (execução)

---

## Visão Geral

Ralph é um sistema de **desenvolvimento autônomo** que combina:

| Fonte | Contribuição |
|-------|--------------|
| **[Ralph Original](https://ghuntley.com/ralph/)** | Loop autônomo, prd.json, progress.txt |
| **[ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks)** | PRD 9 seções, tasks granulares, perguntas A/B/C/D |
| **AIOS Framework** | Story-driven, Quality Gates, Dev Agent Record, Strict Sections |

---

## Arquitetura (AIOS-Compliant)

```
expansion-packs/ralph/
├── README.md                    # Esta documentação
├── agents/
│   └── ralph.md                # Agent definition (ativa com @ralph)
├── workflows/
│   └── autonomous-loop.md      # Workflow AIOS completo
├── checklists/
│   ├── quality-gates.md        # Quality Gates obrigatórios
│   └── pre-implementation.md   # Validação pré-implementação
├── scripts/
│   └── ralph.sh                # Script bash alternativo
├── tasks/
│   ├── create-prd.md           # Task AIOS (mode: elicit)
│   ├── start-loop.md           # Task AIOS (mode: execute)
│   └── update-handoff.md       # Task AIOS (obrigatória pós-story)
└── templates/
    ├── prd.json                # Template JSON para Ralph autônomo
    ├── prd-template.md         # PRD completo (11 seções + AIOS)
    ├── tasks-template.md       # Tasks com checkboxes
    ├── progress.txt            # Progress log (AIOS-enhanced)
    ├── prompt.md               # Prompt com princípios AIOS
    └── handoff-template.md     # Template de handoff entre stories
```

### Sync to .claude/commands/
```
.claude/commands/Ralph/
└── agents/
    └── ralph.md               # Auto-synced from expansion-packs
```

---

## 🆕 Content Mode & Parallel Execution (v2.7)

### Content Mode

Para projetos de **produção de conteúdo** (não código):

```json
{
  "project": "MBTI - 16 Perfis",
  "mode": "content",
  "branchName": "",
  "outputDir": "outputs/perfis/mbti",
  "parallelization": {
    "enabled": true,
    "maxConcurrent": 16
  }
}
```

**Características:**
- `mode: "content"` → Sem branch (trabalha no main)
- `branchName: ""` → Não cria branch separada
- Validação simplificada (arquivo criado, conteúdo válido)
- Execução paralela por default

### Parallel Execution

Stories independentes podem executar em paralelo:

```bash
# Detecção automática
./expansion-packs/ralph/scripts/ralph.sh docs/ralph/mbti-16-perfis/ 16
# → Detecta mode: content, redireciona para ralph-parallel.sh

# Ou direto
./expansion-packs/ralph/scripts/ralph-parallel.sh docs/ralph/mbti-16-perfis/ 16
```

**Campos do prd.json para paralelismo:**

```json
{
  "parallelization": {
    "enabled": true,
    "maxConcurrent": 16,
    "batchSize": 4
  },
  "userStories": [
    {
      "id": "US-002",
      "outputFile": "outputs/perfis/mbti/Perfil_INTJ.md",
      "dependencies": [],
      ...
    }
  ]
}
```

| Campo | Descrição |
|-------|-----------|
| `parallelization.enabled` | Ativa execução paralela |
| `parallelization.maxConcurrent` | Max stories simultâneas |
| `story.outputFile` | Path do arquivo de output |
| `story.dependencies` | IDs de stories que devem completar antes |

### Quando usar cada modo

| Modo | Use quando... |
|------|---------------|
| **code** (default) | Desenvolvimento de features, PRs, branches |
| **content** | Geração de documentos, perfis, artigos |

### Templates

| Template | Uso |
|----------|-----|
| `templates/prd-content.json` | Schema para projetos de conteúdo |
| `templates/prompt-content.md` | Prompt para Content Mode |
| `templates/prompt.md` | Prompt para Code Mode (default) |

---

## 🚨 ARQUITETURA CRÍTICA: LOOP EXTERNO

> **O loop autônomo é controlado por `ralph.sh` (bash), NÃO por comandos dentro do Claude!**

### Por que Loop Externo?

```
❌ ERRADO (causa /compact):
Claude sessão única → story 1 → story 2 → story 3 → /compact!

✅ CORRETO (cada story = contexto fresco):
ralph.sh → Claude sessão 1 (story 1) → termina
         → Claude sessão 2 (story 2) → termina
         → Claude sessão 3 (story 3) → termina
         → ... até <promise>COMPLETE</promise>
```

### Como Funciona

1. **`ralph.sh`** é um loop bash que controla as iterações
2. **Cada iteração** spawna uma NOVA sessão Claude com contexto limpo
3. **Persistência** é via arquivos: `prd.json`, `progress.txt`, git history
4. **Cada sessão** executa UMA story e termina
5. **O loop continua** até todas stories terem `passes: true`

### Workflow Correto

```bash
# FASE 1: Preparação (sessão interativa)
@ralph                    # Ativar Ralph agent
*create-prd               # OU criar PRD com perguntas
*convert                  # OU converter PRD existente para prd.json
# Sair da sessão Claude (Ctrl+C ou *exit)

# FASE 2: Execução (loop externo)
./expansion-packs/ralph/scripts/ralph.sh 30   # Max 30 iterações
```

---

## Princípios Integrados

### Do Ralph Original
- ✅ Loop autônomo até completar
- ✅ prd.json com user stories
- ✅ progress.txt com learnings
- ✅ Patterns compound across iterations
- ✅ Completion promise

### Do ai-dev-tasks
- ✅ PRD com 9 seções estruturadas
- ✅ Perguntas clarificadoras A/B/C/D
- ✅ Tasks com parent + subtasks
- ✅ Task 0.0: Create branch (sempre primeiro)
- ✅ Relevant Files section
- ✅ Instructions for checkboxes
- ✅ Pause after Phase 1 + "Go"
- ✅ Target: junior developer

### Do AIOS Framework
- ✅ **Story-Driven:** PRD tem todo contexto (Dev Notes)
- ✅ **Strict Sections:** Ralph só edita seções autorizadas
- ✅ **Quality Gates:** Checklist obrigatório antes de [x]
- ✅ **Dev Agent Record:** File List + Session Log
- ✅ **Patterns Compound:** Codebase Patterns no topo
- ✅ **No Scope Creep:** Proibido editar requirements
- ✅ **Agent Delegation:** Ralph orquestra agents AIOS especializados

---

## Agent Delegation via Skill Tool (AIOS Integration)

Ralph é o **maestro** que invoca agents especializados usando o **Skill tool**. Cada agent é definido como uma Skill em `.claude/skills/`.

### Skills Disponíveis

| Skill Name | Agent | Especialidade |
|------------|-------|---------------|
| `dev-agent` | James | Implementation, debugging, code |
| `architect-agent` | Winston | Architecture, API design, infrastructure |
| `qa-agent` | Quinn | Testing, validation, quality gates |

### Mapeamento de Stories

| Tipo de Story | Keywords | Skill Invocada |
|---------------|----------|----------------|
| Architecture/Design | "arquitetura", "design system", "API design" | `architect-agent` |
| Implementation/Code | "implementar", "criar componente", "código" | `dev-agent` |
| Testing/QA | "testar", "test", "QA", "validar" | `qa-agent` |
| Simple/Setup | "mkdir", "setup", "README" | Ralph direto |

### Delegation Protocol

```
1. ANALYZE: Analisar título e acceptance criteria
2. MATCH: Identificar skill_name baseado em keywords
3. ANNOUNCE: "📋 Delegating US-XXX to {skill_name} ({agent_name})"
4. INVOKE: Skill(skill="{skill_name}", args="Execute US-XXX: {context}")
5. RECEIVE: Receber resultado da skill
6. VERIFY: Verificar acceptance criteria
7. UPDATE: Atualizar prd.json e progress.txt
8. NEXT: Próxima story ou COMPLETE
```

### Exemplo de Delegação via Skill

```
Ralph detecta story: "US-003: Implementar API de login"
Keywords: "Implementar", "API"
Match: implementation → dev-agent

Ralph invoca:
Skill(skill="dev-agent", args="Execute US-003: Implementar API de login.
  Criteria: POST /api/auth/login, JWT token, validação")

@dev (James) executa e retorna:
🛠️ @dev (James) executing US-003
✅ Endpoint criado
✅ Tests passing (3/3)
✅ TypeScript compiles
Files: app/api/auth/login/route.ts, lib/auth/jwt.ts

Ralph integra resultado em progress.txt
```

### Instalação de Skills

Skills devem estar em `.claude/skills/`:

```
.claude/skills/
├── dev-agent/
│   └── SKILL.md
├── architect-agent/
│   └── SKILL.md
└── qa-agent/
    └── SKILL.md
```

---

## Ativação

### Como Agent AIOS (Recomendado)

```
@ralph
```

Isso ativa o agent Ralph com todos os comandos disponíveis:
- `*help` - Mostrar comandos
- `*create-prd` - Criar PRD estruturado (com perguntas clarificadoras)
- `*convert` - Converter PRD markdown existente para prd.json
- `*start-loop` - Iniciar loop autônomo
- `*validate` - Validar Quality Gates
- `*status` - Ver progresso atual
- `*exit` - Desativar agent

---

## Comandos

### Dentro do Claude (Preparação)

```bash
@ralph              # Ativar Ralph agent
*help               # Ver comandos disponíveis
*create-prd         # Criar PRD com perguntas clarificadoras
*convert            # Converter PRD.md existente para prd.json
*status             # Ver progresso atual
*validate           # Validar Quality Gates
*run                # Ver instruções de como executar ralph.sh
*exit               # Desativar agent
```

### Fora do Claude (Execução do Loop)

```bash
# Executar loop autônomo (RECOMENDADO)
./expansion-packs/ralph/scripts/ralph.sh [max_iterations]

# Exemplos:
./expansion-packs/ralph/scripts/ralph.sh        # Default: 10 iterações
./expansion-packs/ralph/scripts/ralph.sh 30     # Max 30 iterações
./expansion-packs/ralph/scripts/ralph.sh 50     # Max 50 iterações
```

### Verificar Progresso

```bash
# Ver status das stories
cat prd.json | jq '.userStories[] | {id, title, passes}'

# Ver histórico
cat progress.txt

# Ver últimos commits
git log --oneline -10
```

---

## Workflows Disponíveis

### 1. Ralph Autônomo (prd.json) - RECOMENDADO

Para tarefas bem definidas que podem rodar sem supervisão:

```bash
# FASE 1: Preparação (dentro do Claude)
claude                                          # Iniciar Claude Code
@ralph                                          # Ativar Ralph
*convert                                        # Converter PRD existente para prd.json
# OU
*create-prd                                     # Criar PRD do zero com perguntas

# Sair do Claude (Ctrl+C ou *exit)

# FASE 2: Execução (fora do Claude)
./expansion-packs/ralph/scripts/ralph.sh 30    # Executar loop autônomo
```

### 2. Manual com Review (tasks.md)

Para features que precisam de revisão humana:

```bash
# 1. Criar PRD markdown
cp expansion-packs/ralph/templates/prd-template.md ./prd-feature.md

# 2. Criar tasks
cp expansion-packs/ralph/templates/tasks-template.md ./tasks-feature.md

# 3. Trabalhar task por task com review
```

### 3. Híbrido

Começar manual, converter para Ralph quando confiante:

```bash
# 1. Começar com PRD markdown + review
# 2. Quando aprovado, converter para prd.json
# 3. Executar Ralph para implementação
```

---

## Templates

### prd-template.md (11 Seções)

1. Introduction/Overview
2. Goals
3. User Stories
4. Functional Requirements
5. Non-Goals
6. Design Considerations
7. Technical Considerations
8. **Dev Notes (AIOS)** - Contexto completo
9. Success Metrics
10. Open Questions
11. **Quality Gates (AIOS)** - Definition of Done
12. **Dev Agent Record (AIOS)** - Audit trail

### progress.txt (AIOS-Enhanced)

- **Codebase Patterns** - No topo, lido primeiro
- **Key Files Reference** - Arquivos importantes
- **File List (Cumulative)** - Audit trail
- **Quality Gates Status** - Checkboxes
- **Session Log** - Histórico de iterações
- **Completion Summary** - Estatísticas finais

### prompt.md (AIOS Principles)

- **Authorized Sections** - O que Ralph pode editar
- **Quality Gate Checklist** - Validações obrigatórias
- **AIOS Summary** - Princípios a seguir

---

## Quality Gates

Story NÃO está completa até TODOS passarem:

```markdown
### Code Quality
- [ ] npm run typecheck passa
- [ ] npm run lint passa
- [ ] Sem console.log no código
- [ ] Error handling implementado

### Testing
- [ ] Unit tests escritos
- [ ] Tests passando
- [ ] Edge cases cobertos

### Documentation
- [ ] File List atualizado
- [ ] Learnings documentados
- [ ] AGENTS.md atualizado (se patterns)

### Integration
- [ ] Works with existing code
- [ ] No breaking changes
- [ ] Follows existing patterns
```

---

## Seções Autorizadas

Ralph só pode editar:

### Em prd.json:
- ✅ `passes` (false → true)
- ✅ `notes` (adicionar notas)
- ❌ User stories
- ❌ Acceptance criteria

### Em progress.txt:
- ✅ Session Log (APPEND only)
- ✅ File List (adicionar)
- ✅ Codebase Patterns (adicionar)
- ✅ Quality Gates Status (check)
- ❌ Metadata do projeto

### Em handoff.md:
- ✅ OVERWRITE completo após cada story
- ✅ Context mínimo para próxima story
- ✅ Erros a evitar
- ✅ Arquivos tocados

---

## Boas Práticas

1. **Stories pequenas** - Devem caber em 1 context window
2. **Dev Notes completas** - TODO contexto no PRD
3. **Quality Gates** - Sempre validar antes de [x]
4. **File List** - Documentar todas as mudanças
5. **Patterns** - Adicionar learnings ao topo
6. **Sem scope creep** - Stick to acceptance criteria
7. **Sempre --max-iterations** - Safety net obrigatório
8. **Browser verification** - Obrigatório para UI stories
9. **Thread URLs** - Incluir links para sessões no progress

---

## Archiving

O script Ralph arquiva automaticamente runs anteriores quando você muda de branch:

```
archive/
└── 2026-01-14-feature-name/
    ├── prd.json
    └── progress.txt
```

Isso acontece automaticamente quando `branchName` no prd.json muda.

---

## Story Sizing (Crítico)

> Stories DEVEM ser completáveis em UMA context window.
> Se muito grandes, o LLM esgota contexto e produz código quebrado.

### Tamanho Certo
- ✅ Adicionar coluna no banco + migration
- ✅ Criar componente UI único
- ✅ Atualizar uma server action
- ✅ Adicionar validação em um form

### Muito Grande (Dividir!)
- ❌ Construir dashboard inteiro
- ❌ Adicionar sistema de autenticação
- ❌ Refatorar API completa
- ❌ CRUD completo de uma entidade

---

## Referências

- [Guia Completo](../../docs/guides/ralph-guide.md)
- [Ralph Original - Geoffrey Huntley](https://ghuntley.com/ralph/)
- [ai-dev-tasks - snarktank](https://github.com/snarktank/ai-dev-tasks)
- [Plugin ralph-loop](https://github.com/anthropics/claude-plugins-official)
- [AIOS Framework](./.aios-core/)

---

## Changelog

### v2.7 (2026-01-16)
- **Content Mode** - Novo modo para produção de conteúdo (não código)
- **Parallel Execution** - `ralph-parallel.sh` executa stories em paralelo
- **Auto-detect** - `ralph.sh` detecta mode: content e redireciona automaticamente
- **No Branch** - `branchName: ""` permite trabalhar direto no main
- **New Fields** - `outputFile`, `dependencies`, `parallelization` no prd.json
- **Templates** - `prd-content.json`, `prompt-content.md` para Content Mode

### v2.6 (2026-01-16)
- **Handoff System** - Context filter entre stories para zero perda de contexto
- **handoff.md** - Template estruturado com learnings críticos, erros a evitar, próxima story
- **Step 0** - Carregar handoff ANTES de qualquer story
- **Step 10** - Atualizar handoff APÓS cada story (GATE obrigatório)
- **update-handoff.md** - Task formal com validação
- **ralph.sh** - Injeta HANDOFF_FILE no prompt

### v2.5 (2026-01-15)
- **External Loop Architecture** - Loop controlado por `ralph.sh` bash, não por comandos internos
- **Prevents /compact** - Cada story executa em sessão Claude NOVA com contexto limpo
- **Correct CLI Syntax** - `claude -p --dangerously-skip-permissions` para modo não-interativo
- **Removed Plugin Dependency** - Não requer mais `ralph-loop` plugin (nunca existiu)
- **Documentation Rewrite** - Workflow correto documentado

### v2.4 (2026-01-15)
- **Skill-Based Delegation** - Ralph usa Skill tool para invocar agents reais
- **Agent Skills Created** - dev-agent, architect-agent, qa-agent em .claude/skills/
- **Real Agent Invocation** - `Skill(skill="dev-agent", args="...")` em vez de persona assumption
- **Workflow Updated** - `autonomous_loop_with_skill_delegation`

### v2.3 (2026-01-14)
- **Agent Delegation** - Ralph agora orquestra agents AIOS especializados
- **Delegation Map** - Mapeamento de keywords para @architect, @dev, @qa, @ux-expert, @po
- **Delegation Protocol** - Fluxo de handoff estruturado
- **data/agent-delegation.md** - Documentação completa de delegação

### v2.2 (2026-01-14)
- **Archiving automático** - Arquiva runs anteriores ao mudar de branch
- **Browser verification** - Obrigatório para UI stories
- **Thread URL tracking** - Links para sessões no progress.txt
- **Story sizing guidelines** - Documentação sobre tamanho de stories

### v2.1 (2026-01-14)
- **100% AIOS Compliant**
- Agent definition file (`agents/ralph.md`)
- Workflows directory (`workflows/autonomous-loop.md`)
- Checklists (`quality-gates.md`, `pre-implementation.md`)
- Task metadata com pre/post conditions
- Sync to `.claude/commands/`
- Ativação via `@ralph`

### v2.0 (2026-01-14)
- Integração completa com AIOS Framework
- Dev Notes section no PRD
- Quality Gates obrigatórios
- Dev Agent Record (File List + Session Log)
- Strict Sections (authorized edits only)
- Patterns compound enhanced

### v1.0 (2026-01-14)
- Criação inicial
- Templates Ralph + ai-dev-tasks
- Plugin ralph-loop integration
