# Ralph Agent Instructions - {{system_name}}

> **Projeto:** {{system_name}}
> **Modo:** Produção de Conteúdo
> **Modelo:** {{origin_author}} ({{origin_year}})

## ⛔ CRITICAL RULES

1. **NO GIT OPERATIONS** - Do NOT use git add, git commit, git push, or any git commands
2. **NO SSH** - Do NOT attempt any SSH connections
3. **ONLY write files** - Your only job is to write markdown files to outputs/
4. **Update prd.json** - Mark stories as passes: true when complete

## Project Context

- **PROJECT_DIR**: docs/ralph/{{slug}}/
- **PRD_FILE**: prd.json
- **OUTPUT_DIR**: outputs/perfis/{{slug}}/

---

## Core Knowledge

### Princípio Fundamental

> {{principle}}

### Core Insight

> {{core_insight}}

### O que Mapeia

> {{maps_what}}

### Tipo de Sistema

| Atributo | Valor |
|----------|-------|
| **System Type** | {{system_type}} |
| **Layer** | {{layer}} |
| **Category** | {{category}} |
| **Structure Type** | {{structure_type}} |
| **Epistemology** | {{epistemology}} |

### Casos de Uso

{{#each use_cases}}
- {{this}}
{{/each}}

### Outputs Típicos

{{#each typical_outputs}}
- {{this}}
{{/each}}

---

## Scientific Foundation

### Origem e Autoria

| Atributo | Valor |
|----------|-------|
| **Autor Original** | {{origin_author}} |
| **Ano** | {{origin_year}} |
| **Tradição** | {{origin_tradition}} |
| **Validade Científica** | {{scientific_validity}} |

### Fontes Primárias

{{#if primary_sources}}
{{#each primary_sources}}
- {{this}}
{{/each}}
{{else}}
- {{origin_author}} ({{origin_year}}) - Obra original
{{/if}}

### Detection Configuration

{{#if is_detection_based}}
| Parâmetro | Valor |
|-----------|-------|
| **Detection-Based** | Sim |
| **Confiança Mínima** | {{detection_min_confidence}} |
| **Evidências Mínimas** | {{detection_min_evidence}} |
| **Fontes de Dados** | {{#each detection_data_sources}}{{this}}{{#unless @last}}, {{/unless}}{{/each}} |
{{else}}
Este sistema não usa detecção automática por IA.
{{/if}}

---

## Componentes do Sistema

> Total: {{components_count}} componentes

{{#each components}}
### {{display_order}}. {{name}}

**Slug:** `{{slug}}`
**Tipo:** {{component_type}}

{{#if description}}
> {{description}}
{{/if}}

{{#if spectrum_low}}
| Espectro | Descrição |
|----------|-----------|
| **Baixo** | {{spectrum_low}} |
| **Alto** | {{spectrum_high}} |
{{/if}}

{{#if parent_component_id}}
**Parent:** {{parent_component_name}}
{{/if}}

---

{{/each}}

## Estrutura do Perfil

O perfil de cada componente deve seguir esta estrutura:

```markdown
# {{component_name}}
## Sistema: {{system_name}}

---

## 1. Visão Geral
- Breve descrição do componente
- Posição no sistema geral
- Relevância e aplicabilidade

## 2. {{#if spectrum_high}}Pontuação Alta{{else}}Características Principais{{/if}}
{{#if spectrum_high}}
- Comportamentos típicos de alta pontuação
- Manifestações positivas
- Manifestações disfuncionais (excesso)
{{else}}
- Atributos definidores
- Padrões comportamentais
- Motivações subjacentes
{{/if}}

## 3. {{#if spectrum_low}}Pontuação Baixa{{else}}Dinâmicas e Relações{{/if}}
{{#if spectrum_low}}
- Comportamentos típicos de baixa pontuação
- Manifestações positivas
- Manifestações disfuncionais (deficiência)
{{else}}
- Como interage com outros componentes
- Tensões e complementaridades
- Contextos de ativação
{{/if}}

## 4. Desenvolvimento
- Caminhos de crescimento
- Práticas recomendadas
- Armadilhas comuns

## 5. Figuras Conhecidas (Se Aplicável)
- Exemplos reais ou ficcionais
- Justificativa baseada em evidências

---

## Referências
- {{origin_author}} ({{origin_year}})
{{#each primary_sources}}
- {{this}}
{{/each}}
```

---

## Quality Standards

### Requisitos Mínimos

| Critério | Valor |
|----------|-------|
| **Linhas por Perfil** | Mínimo 200 |
| **Fonte Primária** | {{origin_author}} ({{origin_year}}) |
| **Validade Científica** | {{scientific_validity}} |
| **Linguagem** | PT-BR, científica mas acessível |

### Checklist de Qualidade

- [ ] Todas as seções obrigatórias preenchidas
- [ ] Referências bibliográficas corretas
- [ ] Linguagem consistente (PT-BR)
- [ ] Exemplos concretos incluídos
- [ ] Sem placeholders ou TODOs
- [ ] Mínimo de linhas atingido

---

## Key Principles

⚠️ **IMPORTANTE - Core Insight do Sistema:**
> {{core_insight}}

⚠️ **ATENÇÃO - Princípio Fundamental:**
> {{principle}}

{{#if epistemology}}
⚠️ **EPISTEMOLOGIA:**
> Abordagem: {{epistemology}}
{{/if}}

{{#if ideological_stance}}
⚠️ **POSICIONAMENTO:**
> {{ideological_stance}}
{{/if}}

---

## Application Notes

{{#if application_notes}}
```json
{{application_notes}}
```
{{else}}
Nenhuma nota de aplicação específica definida para este sistema.
{{/if}}

---

## Sua Tarefa

### Fluxo de Trabalho

1. **Ler prd.json** → Identificar story atribuída (qual componente criar)
2. **Pesquisar fontes** → {{origin_author}} e literatura relacionada
3. **Criar perfil** → Seguir template de estrutura acima
4. **Validar** → Checklist de qualidade + 200+ linhas
5. **Atualizar status** → passes: true no prd.json

### Ordem de Criação

{{#each components}}
{{display_order}}. `{{slug}}` - {{name}}
{{/each}}

### Output Esperado

Para cada componente, criar arquivo em:
```
outputs/perfis/{{slug}}/{{component_slug}}.md
```

---

## Validation Checklist

Antes de marcar story como completa:

### Conteúdo
- [ ] Arquivo criado no path correto
- [ ] Todas as 5 seções presentes
- [ ] Mínimo 200 linhas
- [ ] Referências incluídas

### Qualidade
- [ ] Linguagem PT-BR correta
- [ ] Sem erros gramaticais
- [ ] Exemplos concretos
- [ ] Consistência com core_insight

### Formato
- [ ] Markdown válido
- [ ] Headers corretos
- [ ] Tabelas formatadas
- [ ] Code blocks quando aplicável

---

## Stop Condition

Quando a story atribuída estiver completa:

```
<promise>STORY_COMPLETE:[STORY_ID]</promise>
```

Se TODAS as stories estiverem completas:

```
<promise>COMPLETE</promise>
```

---

## Se Travado

1. **Documentar bloqueio** no campo notes da story
2. **Pesquisar fontes** → Não inventar conteúdo
3. **Se realmente bloqueado** → Marcar story como bloqueada
4. **NUNCA** output false completion promise

---

## Metadata

```yaml
template_version: "2.0"
generated_from: "mapping_systems + system_components"
last_updated: "{{generated_at}}"
total_components: {{components_count}}
system_slug: "{{slug}}"
```

---

Agora comece. Leia prd.json e execute a story atribuída.
