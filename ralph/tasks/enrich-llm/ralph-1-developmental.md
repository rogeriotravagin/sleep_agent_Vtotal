# Ralph-1: Developmental Systems Enrichment

## Sua Missão
Enriquecer os frontmatters dos seguintes sistemas com análise LLM:
- `maslow` (10 arquivos)
- `erikson` (12 arquivos)
- `kohlberg` (12 arquivos)
- `kegan` (10 arquivos)
- `fowler-faith` (8 arquivos)

## Processo para CADA arquivo

1. **Ler o arquivo** `outputs/perfis/{system}/*_v2.md`
2. **Analisar o conteúdo** e extrair:
   - profile_name (inglês)
   - profile_name_pt (português)
   - profile_code (2-4 letras)
   - description_short (1-2 frases EN)
   - description_short_pt (1-2 frases PT)
   - keywords (3-5 palavras)
   - evidence_notes
   - related_profiles (conexões com outros sistemas)
   - Campos específicos do sistema

3. **Atualizar o frontmatter** preservando campos existentes
4. **Salvar o arquivo**

## Campos Específicos

### Maslow
```yaml
hierarchy_level: 1-5
hierarchy_name: "Deficiency Needs" ou "Growth Needs"
need_type: "physiological|safety|belonging|esteem|self-actualization"
```

### Erikson
```yaml
stage_number: 1-8
age_range: "0-1 year", "1-3 years", etc.
virtue: "Hope", "Will", "Purpose", etc.
crisis: "Trust vs Mistrust", etc.
```

### Kohlberg
```yaml
stage_number: 1-6
level: "Pre-conventional", "Conventional", "Post-conventional"
moral_orientation: descrição da orientação moral
```

### Kegan
```yaml
order_number: 0-5
subject_object: o que está sujeito vs objeto neste estágio
complexity: nível de complexidade mental
```

### Fowler
```yaml
stage_number: 0-6
faith_style: descrição do estilo de fé
age_typical: faixa etária típica
```

## Exemplo de Enriquecimento

**Antes:**
```yaml
---
profile_id: "maslow_nivel_01_fisiologicas"
display_name: "Nivel_01_Fisiologicas"
system: "maslow"
system_category: "stage"
evidence_level: "A"
version: "2.0"
related_profiles:
  - system: "bigfive"
    profiles: []
---
```

**Depois:**
```yaml
---
profile_id: "maslow_nivel_01_fisiologicas"
system: "maslow"
system_category: "stage"
profile_name: "Physiological Needs"
profile_name_pt: "Necessidades Fisiológicas"
profile_code: "PHY"
description_short: "The most basic human needs including food, water, warmth, and rest."
description_short_pt: "As necessidades humanas mais básicas incluindo comida, água, calor e descanso."
keywords: ["survival", "basic needs", "homeostasis", "biological", "instinct"]
hierarchy_level: 1
hierarchy_name: "Deficiency Needs"
need_type: "physiological"
version: "2.0"
last_updated: "2026-01-17"
evidence_level: "A"
evidence_notes: "Maslow's hierarchy is foundational in psychology. The physiological level has strong empirical support as survival needs take precedence."
related_profiles:
  - system: "spiral"
    profiles: ["beige"]
  - system: "erikson"
    profiles: ["trust_vs_mistrust"]
---
```

## Execução

Processar na ordem:
1. maslow (10 arquivos)
2. erikson (12 arquivos)
3. kohlberg (12 arquivos)
4. kegan (10 arquivos)
5. fowler-faith (8 arquivos)

Total: ~52 arquivos

Ao terminar cada sistema, fazer commit:
```
feat: enrich {system} profiles with LLM analysis
```

Ao terminar todos, reportar no arquivo:
`tasks/enrich-llm/ralph-1-complete.md`
