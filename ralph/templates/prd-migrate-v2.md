# Ralph PRD Template: Profile Migration to v2.0

## Mode: refactor

## Context

You are migrating existing psychological profiles to HBOS v2.0 format. This involves:
1. Adding YAML frontmatter with structured metadata
2. Ensuring all 12 standard sections exist
3. Adding missing sections (Sombra, Corpo-Mente, Aplicação Prática, Cross-System)
4. Expanding Exemplos section with figures + fictional characters
5. Maintaining all existing quality content

## Critical Resources

Before starting, you MUST read these files:
- `docs/mmos/architecture/BEHAVIORAL-ONTOLOGY.md` - Understand the 5 dimensions + 3 layers
- `expansion-packs/mmos/templates/profile-template-v2.md` - Template structure
- `expansion-packs/mmos/schemas/profile-frontmatter-schema.yaml` - YAML schema
- `expansion-packs/mmos/data/cross-system-correlations.yaml` - Cross-system mappings

## Task Structure

For each profile in the system:

### Step 1: Read and Analyze
- Read the existing profile completely
- Identify which sections already exist
- Note quality content to preserve

### Step 2: Create YAML Frontmatter
Add to the beginning of the file:
```yaml
---
profile_id: "{system}_{profile-slug}"
system: "{system}"
system_category: "{category}"  # trait-based|type-based|dynamic|relational|symbolic
profile_name: "{Name}"
profile_code: "{code}"
version: "2.0"
last_updated: "2026-01-16"
evidence_level: "{A|B|C|D}"
evidence_notes: "{justification}"
dimensions:
  energia: {score: 0.0, confidence: 0.0, facets: []}
  cognição: {score: 0.0, confidence: 0.0, facets: []}
  emoção: {score: 0.0, confidence: 0.0, facets: []}
  relação: {score: 0.0, confidence: 0.0, facets: []}
  propósito: {score: 0.0, confidence: 0.0, facets: []}
correlates_with:
  big-five: []
  mbti: []
  eneagrama: []
  attachment: []
tags:
  personality: []
  cognitive: []
  emotional: []
  relational: []
  professional: []
flags:
  burnout_risk: "low|moderate|high"
  leadership_fit: []
  conflict_style: ""
layer: "traits|patterns|narrative"
primary_dimensions: []
---
```

### Step 3: Add Missing Sections

If missing, add these sections:

#### Section 4: Sombra
```markdown
## 4. Sombra

### 4.1 Pontos Cegos
| Ponto Cego | Como se Manifesta | Impacto |
|------------|-------------------|---------|
| {ponto1} | {manifestação} | {impacto} |

### 4.2 Armadilhas Cognitivas
- **{armadilha1}**: {descrição}. *Correção: {como evitar}*

### 4.3 Padrões Destrutivos
{descrição de padrões destrutivos e como interromper}
```

#### Section 7: Corpo-Mente
```markdown
## 7. Corpo-Mente

### 7.1 Interface Somática
{como o perfil se manifesta no corpo}

### 7.2 Riscos de Saúde
| Área | Risco | Prevenção |
|------|-------|-----------|
| Física | {risco} | {prevenção} |
| Mental | {risco} | {prevenção} |

### 7.3 Práticas Recomendadas
- **Exercício:** {recomendação}
- **Mindfulness:** {recomendação}
- **Regulação:** {recomendação}
```

#### Section 9: Exemplos (expand if brief)
```markdown
## 9. Exemplos Ilustrativos

### 9.1 Figuras Notáveis
| Pessoa | Por que Exemplifica este Perfil |
|--------|--------------------------------|
| **{Nome1}** | {descrição detalhada} |
| **{Nome2}** | {descrição detalhada} |
(minimum 5 figures)

### 9.2 Personagens Fictícios
| Personagem | Obra | Como Exemplifica |
|------------|------|------------------|
| **{Personagem1}** | {Obra} | {descrição} |
(minimum 4 characters)

### 9.3 Padrão Comum Observado
{síntese de 2-3 parágrafos sobre o que une os exemplos}
```

#### Section 10: Aplicação Prática
```markdown
## 10. Aplicação Prática

### 10.1 Protocolo de Identificação
1. {pergunta de triagem}
2. {pergunta de triagem}
(minimum 5 questions)

### 10.2 Indicadores Comportamentais
- {indicador observável}
(minimum 4 indicators)

### 10.3 Red Flags / Green Flags
| 🚩 Red Flags | 🟢 Green Flags |
|-------------|----------------|
| {alerta} | {saudável} |

### 10.4 Recomendações de Interação
**Para trabalhar com este perfil:**
- {recomendação}

**Para relacionar-se com este perfil:**
- {recomendação}
```

#### Section 11: Cross-System
```markdown
## 11. Cross-System

### 11.1 Correlações com Outros Sistemas
| Sistema | Correlação Provável | Confiança |
|---------|---------------------|-----------|
| Big Five | {perfis} | {Alta/Média/Baixa} |
| MBTI | {tipos} | {Alta/Média/Baixa} |

### 11.2 Tensões e Contradições
{onde pode haver conflito com outros sistemas}

### 11.3 Síntese Integrativa
{como integrar com outros sistemas}
```

### Step 4: Validate
- All 12 sections present
- YAML frontmatter complete
- Existing content preserved
- New content is substantive (not placeholder)

## Output Format

The modified file should:
1. Start with YAML frontmatter (---)
2. Have all 12 numbered sections
3. Preserve existing quality content
4. Add new sections with substantive content
5. End with References section including evidence level disclaimer

## Quality Criteria

- NO placeholder text ("TODO", "TBD", "to be added")
- NO generic content - everything specific to the profile
- Minimum 5 notable figures + 4 fictional characters in Exemplos
- Minimum 5 identification questions in Aplicação Prática
- Cross-system mappings must reference the correlations data file
