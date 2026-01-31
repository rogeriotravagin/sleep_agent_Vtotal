# Task: Update Handoff

```yaml
name: update-handoff
trigger: after_story_completion
required: true
blocking: true
description: "Atualizar handoff.md após completar cada story - OBRIGATÓRIO"
```

## Quando Executar

Esta task é **OBRIGATÓRIA** e deve ser executada:
- ✅ Após cada story ser marcada como `passes: true`
- ✅ Antes de iniciar a próxima story
- ✅ Antes de outputar `<promise>COMPLETE</promise>`

## Processo

### Passo 1: Ler Handoff Atual
```
Read handoff.md do diretório do projeto
```

### Passo 2: Preencher Template

Substituir placeholders com informações da story completada:

| Placeholder | Valor |
|-------------|-------|
| `{{last_story_id}}` | ID da story completada (ex: US-003) |
| `{{last_story_title}}` | Título da story |
| `{{status}}` | ✅ Completa |
| `{{timestamp}}` | Data/hora atual |
| `{{critical_learning_N}}` | Top 3-5 learnings CRÍTICOS desta story |
| `{{error_N}}` | Erros cometidos (para não repetir) |
| `{{decision_N}}` | Decisões tomadas que afetam próximas |
| `{{file_N}}` | Arquivos modificados |
| `{{change_N}}` | O que mudou em cada arquivo |
| `{{next_story_id}}` | Próxima story pendente |
| `{{next_story_title}}` | Título da próxima |
| `{{required_context}}` | O que precisa carregar para próxima |
| `{{files_to_load}}` | Arquivos específicos para próxima |
| `{{completed_count}}` | Quantidade de stories completas |
| `{{total_count}}` | Total de stories |

### Passo 3: Regras de Preenchimento

#### Context Mínimo (CRÍTICO)
- Máximo 5 itens
- Só o que é ESSENCIAL para próxima story
- Priorizar: padrões de código, decisões arquiteturais, gotchas

#### Erros a Evitar
- Específicos desta sessão
- Formato: "NÃO: [ação específica]"
- Incluir YAML issues, path issues, etc.

#### Decisões Tomadas
- Decisões que afetam implementação futura
- Ex: "Usar pipe | para strings com :"

### Passo 4: Sobrescrever (NÃO Append)

```
Write handoff.md com conteúdo atualizado
```

**IMPORTANTE:** Handoff é SOBRESCRITO, não append. Mantém tamanho fixo.

### Passo 5: Validar

Checklist antes de finalizar:
- [ ] Todas seções preenchidas?
- [ ] Menos de 100 linhas?
- [ ] Arquivos listados existem?
- [ ] Próxima story identificada corretamente?

## Exemplo Preenchido

```markdown
# Handoff - Alex Hormozi Agent Upgrade

## 🎯 Estado Atual
- **Última Story:** US-003: Integração das Signature Phrases
- **Status:** ✅ Completa
- **Timestamp:** 2026-01-15 14:30

## 🧠 Context Mínimo (CARREGAR PRIMEIRO)
1. YAML precisa de aspas para strings com `:` ou `*`
2. Seção signature_phrases tem 3 tiers de categorização
3. Scarcity scripts têm 4 timings (48h, 24h, 4h, 1h)

## 🚫 Erros a Evitar
- NÃO: Usar `- '*cmd' - desc` sem aspas completas
- NÃO: Deixar texto fora de aspas após `"valor"`

## 🔧 Decisões Tomadas
- Usar aspas duplas para toda linha de comando
- Manter frases em inglês + tradução pt_br

## 📁 Arquivos Tocados
| Arquivo | Mudança |
|---------|---------|
| `alex-hormozi.md` | +150 linhas signature_phrases |
| `progress.txt` | Checkbox US-003 |

## ➡️ Próxima Story
- **ID:** US-004
- **Título:** Implementação do CLOSER Framework
- **Contexto necessário:** 04_COMMUNICATION_DNA.md seção 5.1
- **Arquivos a carregar:** alex-hormozi.md (seção operational_frameworks)

## 📊 Progresso
- Stories: 3/8
- Quality Gates: ✅ YAML válido, ✅ Comandos funcionam

---
*Atualizado: 2026-01-15 14:30 | Por: Ralph*
```

## Integração com Workflow

```yaml
story_completion_workflow:
  steps:
    1: Implementar acceptance criteria
    2: Validar YAML (validation-gate)
    3: Testar comandos existentes
    4: Commitar código
    5: Marcar passes=true em prd.json
    6: ⭐ EXECUTAR update-handoff (OBRIGATÓRIO)
    7: Verificar próxima story
    8: Se todas completas → <promise>COMPLETE</promise>
```

## Gate de Validação

Se handoff.md não for atualizado:
- ❌ Não pode marcar story como completa
- ❌ Não pode iniciar próxima story
- ❌ Não pode outputar COMPLETE

---
*Task criada: 2026-01-15*
*Integra com: validation-gate.md, ralph.md*
