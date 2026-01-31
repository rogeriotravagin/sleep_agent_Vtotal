# Data Intelligence Pack v2.0

Time de especialistas em analytics organizados por Tier para decisoes baseadas em dados.

---

## Overview

O Data Intelligence Pack e um sistema de clones especializados para transformar dados em decisoes estrategicas. Baseado em metodologias de especialistas mundiais como Peter Fader (Wharton), Sean Ellis (GrowthHackers), Nick Mehta (Gainsight), e Avinash Kaushik (ex-Google).

### Problema que Resolve

- Implementar metricas sem saber qual decisao elas informam
- Dashboards cheios de numeros sem clareza estrategica
- Health Scores e attribution sem fundamentacao
- Analises que nao geram acao

### Solucao

Consultar o clone certo ANTES de implementar qualquer metrica ou funcionalidade, seguindo um fluxo estruturado em 3 camadas.

---

## Arquitetura de 3 Camadas

```
+---------------------------------------------------------------------+
|                    6 CLONES EM 3 CAMADAS                            |
+---------------------------------------------------------------------+
|                                                                     |
|  TIER 0: FUNDAMENTACAO (usar ANTES de qualquer metrica)             |
|  +-- @peter-fader  -> "Quem vale mais e por que" (CLV/RFM)          |
|  +-- @sean-ellis   -> "Como crescer via referral" (Viral/PMF)       |
|                                                                     |
|  TIER 1: OPERACIONALIZACAO (monitorar e medir)                      |
|  +-- @nick-mehta   -> "Quem em risco e o que fazer" (Health)        |
|  +-- @david-spinks -> "Comunidade esta saudavel?" (SPACES)          |
|  +-- @wes-kao      -> "Por que nao completam?" (CBC)                |
|                                                                     |
|  TIER 2: COMUNICACAO (traduzir em acao)                             |
|  +-- @avinash-kaushik -> "O que significa e que acao" (Reports)     |
|                                                                     |
|  ORQUESTRADOR                                                       |
|  +-- @data-chief  -> Tier workflow e delegacao                      |
|                                                                     |
+---------------------------------------------------------------------+
```

---

## Quick Start Guide

### 1. Ativar o Orquestrador

```
/data-chief
```

O Data Chief analisa seu problema e recomenda o especialista ideal.

### 2. Ou Ativar um Especialista Diretamente

```
/peter-fader    # Para CLV, RFM, segmentacao
/sean-ellis     # Para PMF, AARRR, growth
/nick-mehta     # Para Health Score, churn
/david-spinks   # Para community metrics
/wes-kao        # Para learning outcomes
/avinash-kaushik # Para attribution, dashboards
```

### 3. Executar Tasks

Cada especialista tem tasks associadas:

```
*clv            # Calcular Customer Lifetime Value
*rfm            # Segmentacao RFM
*health-score   # Criar Health Score
*churn          # Prever churn
*attribution    # Modelo de attribution
*community      # Metricas de comunidade
```

### 4. Regra de Ouro

> **Nunca implemente uma metrica sem passar por pelo menos 1 fundamentador (Tier 0).**

---

## Agents Disponiveis

### Tier 0 - Fundamentadores

| Agent | Especialidade | Frameworks Principais | Status |
|-------|---------------|----------------------|--------|
| **@peter-fader** | CLV, RFM, Customer Centricity | Customer Centricity, BG/NBD, Gamma-Gamma | Implementado |
| **@sean-ellis** | PMF, AARRR, North Star Metric | AARRR Funnel, ICE Score, Sean Ellis Test | Planejado |

**Peter Fader** (Wharton School)
- Co-fundador da Zodiac (vendida para Nike)
- Autor de "Customer Centricity"
- Criador dos modelos BG/NBD e Gamma-Gamma para CLV
- Filosofia: "Nem todos os clientes sao iguais - aceite a heterogeneidade"

**Sean Ellis** (GrowthHackers)
- Criador do termo "Growth Hacking"
- Autor de "Hacking Growth"
- Criador do PMF Test ("40% very disappointed")
- Filosofia: "Growth comes from experiments, not opinions"

### Tier 1 - Operacionalizadores

| Agent | Especialidade | Frameworks Principais | Status |
|-------|---------------|----------------------|--------|
| **@nick-mehta** | Health Score, Churn, CS | DEAR Framework, Churn Prediction | Planejado |
| **@david-spinks** | Community Metrics | SPACES Framework, MLTV | Planejado |
| **@wes-kao** | Learning Outcomes | CBC Model, Completion Metrics | Planejado |

**Nick Mehta** (Gainsight CEO)
- Autor de "Customer Success"
- Criador do framework DEAR (Deployment, Engagement, Adoption, ROI)
- Filosofia: "Churn e um sintoma, nao a doenca"

**David Spinks** (CMX Founder)
- Autor de "The Business of Belonging"
- Criador do framework SPACES
- Filosofia: "Comunidade e a unica coisa que nao pode ser copiada"

**Wes Kao** (Maven Co-founder)
- Pioneira em Cohort-Based Courses (CBC)
- Foco em completion rates e learning outcomes
- Filosofia: "Active learning > passive consumption"

### Tier 2 - Comunicadores

| Agent | Especialidade | Frameworks Principais | Status |
|-------|---------------|----------------------|--------|
| **@avinash-kaushik** | Attribution, Reporting | DMMM, So What Test | Planejado |

**Avinash Kaushik** (ex-Google)
- Digital Marketing Evangelist
- Autor de "Web Analytics 2.0"
- Criador do DMMM e So What Test
- Filosofia: "Se nao muda uma decisao, nao meca"

### Orquestrador

| Agent | Funcao | Status |
|-------|--------|--------|
| **@data-chief** | Orquestrar especialistas, decision matrix, workflow | Implementado |

---

## Tasks Disponiveis

### Customer Analytics

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `calculate-clv` | Calcular CLV (historico, preditivo, BG/NBD) | @peter-fader | Implementado |
| `segment-rfm` | Segmentacao RFM de clientes | @peter-fader | Planejado |
| `analyze-cohort` | Analise de cohort para retencao | @peter-fader | Planejado |

### Customer Success

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `design-health-score` | Criar Health Score com DEAR | @nick-mehta | Planejado |
| `predict-churn` | Sistema de predicao de churn | @nick-mehta | Implementado |

### Growth

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `run-pmf-test` | Executar Sean Ellis PMF Test | @sean-ellis | Planejado |
| `define-north-star` | Definir North Star Metric | @sean-ellis | Planejado |
| `run-growth-experiment` | Experimentos com ICE scoring | @sean-ellis | Planejado |

### Community

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `measure-community` | Metricas SPACES de comunidade | @david-spinks | Implementado |

### Learning

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `design-learning-outcomes` | Learning outcomes e completion | @wes-kao | Planejado |

### Attribution & Reporting

| Task | Descricao | Agent Primario | Status |
|------|-----------|----------------|--------|
| `build-attribution` | Modelo de attribution marketing | @avinash-kaushik | Implementado |
| `create-dashboard` | Dashboard com DMMM e So What | @avinash-kaushik | Planejado |

---

## Checklists

| Checklist | Descricao | Status |
|-----------|-----------|--------|
| `customer-360-checklist` | Implementacao de Customer 360 | Implementado |
| `health-score-checklist` | Validacao de Health Score | Implementado |

---

## Templates

| Template | Descricao | Status |
|----------|-----------|--------|
| `clv-report-tmpl.yaml` | Relatorio de CLV | Planejado |
| `health-score-report-tmpl.yaml` | Relatorio de Health Score | Implementado |

---

## Workflow Examples

### Workflow 1: Customer 360

Quando construir uma visao completa do cliente:

```
1. @peter-fader   -> Definir quem sao os melhores clientes (CLV/RFM)
2. @nick-mehta    -> Adicionar camada de health e risco
3. @avinash-kaushik -> Criar dashboard executivo
```

### Workflow 2: Sistema de Churn

Quando criar sistema de alertas de churn:

```
1. @peter-fader   -> Definir valor dos clientes (quem priorizar)
2. @nick-mehta    -> Criar Health Score e churn prediction
3. @david-spinks  -> Adicionar sinais de comunidade (se aplicavel)
4. @wes-kao       -> Adicionar sinais de learning (se aplicavel)
```

### Workflow 3: Attribution

Quando construir modelo de attribution:

```
1. @sean-ellis    -> Definir North Star Metric primeiro
2. @avinash-kaushik -> Construir modelo de attribution
3. @peter-fader   -> Conectar com valor de cliente por canal
```

### Workflow 4: Otimizacao de Completion

Quando melhorar completion rates de cursos:

```
1. @wes-kao       -> Diagnosticar problemas de completion
2. @david-spinks  -> Avaliar papel da comunidade
3. @nick-mehta    -> Criar alertas de risco de abandono
```

---

## Frameworks Principais

### Fader: Customer Centricity

```
1. Identify Value (quem vale)
2. Enhance Value (aumentar CLV)
3. Acquire Like Best (lookalike)
4. Accept Heterogeneity (tratar diferente)
```

### Ellis: AARRR

```
A - Acquisition (como descobrem)
A - Activation (primeira experiencia)
R - Retention (voltam?)
R - Referral (indicam?) <- FOCO PRINCIPAL
R - Revenue (pagam?)
```

### Mehta: DEAR

```
D - Deployment (implementou?)
E - Engagement (usa?)
A - Adoption (features avancadas?)
R - ROI (ve valor?)
```

### Spinks: SPACES

```
S - Support (membros ajudam membros)
P - Product (feedback, ideias)
A - Acquisition (referrals)
C - Content (UGC)
E - Engagement (eventos)
S - Success (best practices)
```

### Kao: CBC Elements

```
[ ] Fixed dates (urgencia)
[ ] Cohort (accountability)
[ ] Live sessions (interacao)
[ ] Active learning (nao passivo)
[ ] Premium price (commitment)
[ ] Deliverables (projetos)
```

### Kaushik: So What Test

```
1. SO WHAT? (por que importa)
2. WHAT CHANGED? (vs antes)
3. WHY? (causa raiz)
4. NOW WHAT? (acao clara)
```

---

## Selecao Rapida

### Por Pergunta

| Pergunta | Clone |
|----------|-------|
| "Quem sao melhores clientes?" | @peter-fader |
| "Quanto vale cada cliente?" | @peter-fader |
| "Programa de indicacao funciona?" | @sean-ellis |
| "Qual North Star Metric?" | @sean-ellis |
| "Quem em risco de churn?" | @nick-mehta |
| "Que acao tomar com cliente X?" | @nick-mehta |
| "Comunidade esta saudavel?" | @david-spinks |
| "Por que membros nao participam?" | @david-spinks |
| "Por que completion 3%?" | @wes-kao |
| "Como redesenhar curso?" | @wes-kao |
| "Qual fonte traz clientes?" | @avinash-kaushik |
| "Como apresentar pro CEO?" | @avinash-kaushik |

### Por Stakeholder

| Stakeholder | Clone |
|-------------|-------|
| CEO/Board | @avinash-kaushik |
| CS Team | @nick-mehta |
| Marketing | @avinash-kaushik + @sean-ellis |
| Finance | @peter-fader |
| Product/Education | @wes-kao |
| Community | @david-spinks |

---

## Anti-Patterns

| Anti-Pattern | Solucao |
|--------------|---------|
| Health Score sem definir quem importa | Use @peter-fader primeiro |
| Attribution sem objetivo claro | Use @avinash-kaushik DMMM |
| Comunidade sem proposta de valor | Use @david-spinks SPACES |
| Curso 3% completion | Use @wes-kao CBC |
| Referral sem timing | Use @sean-ellis + @nick-mehta |
| Report sem acao | Use @avinash-kaushik So What |

---

## Estrutura do Pack

```
expansion-packs/data/
+-- config.yaml                # Configuracao do pack
+-- README.md                  # Este arquivo
+-- agents/                    # Definicoes dos clones
|   +-- data-chief.md          # Orquestrador
|   +-- peter-fader.md         # Tier 0 - CLV/RFM
|   +-- sean-ellis.md          # Tier 0 - Viral/Referral (planejado)
|   +-- nick-mehta.md          # Tier 1 - Health/Churn (planejado)
|   +-- david-spinks.md        # Tier 1 - Community (planejado)
|   +-- wes-kao.md             # Tier 1 - Learning (planejado)
|   +-- avinash-kaushik.md     # Tier 2 - Attribution (planejado)
+-- tasks/                     # Tarefas executaveis
|   +-- calculate-clv.md       # CLV calculation
|   +-- predict-churn.md       # Churn prediction
|   +-- measure-community.md   # Community metrics
|   +-- build-attribution.md   # Attribution model
+-- templates/                 # Templates de output
|   +-- health-score-report-tmpl.yaml
+-- checklists/                # Validacao
|   +-- customer-360-checklist.md
|   +-- health-score-checklist.md
+-- docs/
    +-- framework/             # Documentacao completa do framework
        +-- 01_arquitetura_geral.md
        +-- 02_tier0_fundacao.md
        +-- 03_tier1_fundamentadores.md
        +-- 04_tier2_operacionalizadores.md
        +-- 05_tier3_comunicadores.md
        +-- 06_matriz_decisao.md
        +-- 07_workflows.md
        +-- 08_cheatsheet.md
```

---

## Framework Documentation

Para documentacao detalhada do framework, consulte:

| Documento | Conteudo |
|-----------|----------|
| [01_arquitetura_geral.md](docs/framework/01_arquitetura_geral.md) | Visao geral e estrutura |
| [02_tier0_fundacao.md](docs/framework/02_tier0_fundacao.md) | Principios base e anti-patterns |
| [03_tier1_fundamentadores.md](docs/framework/03_tier1_fundamentadores.md) | Peter Fader + Sean Ellis |
| [04_tier2_operacionalizadores.md](docs/framework/04_tier2_operacionalizadores.md) | Nick Mehta + David Spinks + Wes Kao |
| [05_tier3_comunicadores.md](docs/framework/05_tier3_comunicadores.md) | Avinash Kaushik |
| [06_matriz_decisao.md](docs/framework/06_matriz_decisao.md) | Quando usar qual clone |
| [07_workflows.md](docs/framework/07_workflows.md) | Fluxos completos por funcionalidade |
| [08_cheatsheet.md](docs/framework/08_cheatsheet.md) | Resumo rapido de uma pagina |

---

## Contexto de Aplicacao

| Contexto | Caracteristica |
|----------|----------------|
| **Modelo de Negocio** | SaaS, Comunidade, Educacao Online |
| **Estagio** | Startup / Scale-up |
| **Aquisicao Principal** | Indicacoes e Referral |
| **Desafio Principal** | Completion rate baixo (3% -> meta 96%) |

---

## Checklist Pre-Implementacao

Antes de implementar qualquer metrica:

```
[ ] Defini decisao que metrica informa
[ ] Consultei clone da Camada 0 (Fader ou Ellis)
[ ] Sei quem vai olhar e quando
[ ] Tenho acao clara para cada resultado
[ ] Tenho baseline para comparar
```

---

*Data Intelligence Pack v2.0*
*Analytics Clone Squad for Data-Driven Decisions*
