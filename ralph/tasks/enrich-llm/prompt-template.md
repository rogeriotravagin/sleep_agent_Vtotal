# Prompt Template: Enriquecimento de Perfil Psicométrico

## Contexto
Você está enriquecendo o frontmatter YAML de um perfil psicométrico. Analise o conteúdo do arquivo e extraia/gere os campos solicitados.

## Arquivo a Processar
**Sistema:** {{system}}
**Arquivo:** {{filename}}

### Frontmatter Atual:
```yaml
{{current_frontmatter}}
```

### Conteúdo do Arquivo:
```markdown
{{body_content}}
```

## Tarefa
Analise o conteúdo acima e retorne um JSON com os campos enriquecidos:

```json
{
  "profile_name": "Nome em inglês (extraído ou traduzido do título)",
  "profile_name_pt": "Nome em português",
  "profile_code": "Código 2-4 letras (ex: INTJ, SA, AB)",
  "description_short": "Descrição curta em inglês (1-2 frases)",
  "description_short_pt": "Descrição curta em português (1-2 frases)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "evidence_notes": "Nota sobre base empírica/científica deste sistema",
  "related_profiles": [
    {"system": "outro_sistema", "profiles": ["perfil1", "perfil2"]}
  ],
  // Campos específicos do sistema (se aplicável):
  {{system_specific_fields}}
}
```

## Regras
1. **profile_name**: Sempre em inglês. Se título está em PT, traduza.
2. **profile_name_pt**: Sempre em português. Se título está em EN, traduza.
3. **profile_code**: Abreviação única (2-4 caracteres uppercase)
4. **description_short**: Máximo 200 caracteres, capture a essência
5. **keywords**: 3-5 palavras-chave relevantes para busca
6. **evidence_notes**: Seja honesto sobre nível de evidência empírica
7. **related_profiles**: Sugira conexões com outros sistemas psicométricos

## Campos Específicos por Sistema

### Maslow
- hierarchy_level: 1-5 (ou 6-8 para versão expandida)
- hierarchy_name: "Deficiency Needs" ou "Growth Needs"
- need_type: "physiological", "safety", "belonging", "esteem", "self-actualization"

### Erikson
- stage_number: 1-8
- age_range: "0-1 year", "1-3 years", etc.
- virtue: "Hope", "Will", "Purpose", etc.
- crisis: "Trust vs Mistrust", etc.

### Enneagram
- type_number: 1-9
- center: "Head", "Heart", "Gut"
- core_fear: Medo central do tipo
- core_desire: Desejo central do tipo
- wing: null ou número da asa
- instinct: "SP", "SO", "SX" ou null

### Big Five / NEO-PI-R
- dimension: "O", "C", "E", "A", "N"
- facet: nome da faceta se aplicável
- polarity: "high" ou "low"

### MBTI
- type_code: "INTJ", "ENFP", etc.
- cognitive_functions: "Ni-Te-Fi-Se"
- temperament: "NT", "NF", "SJ", "SP"
- dominant_function: "Ni", "Te", etc.

### DISC
- disc_type: "D", "I", "S", "C" ou combinação
- primary_style: "Dominance", "Influence", etc.
- motivators: "Results", "Recognition", etc.
- fears: "Being taken advantage of", etc.

### IFS
- part_type: "Manager", "Firefighter", "Exile", "Self"
- protective_role: descrição do papel protetor
- burden: descrição da carga/crença carregada

### Attachment
- attachment_style: "Secure", "Anxious", "Avoidant", "Disorganized"
- anxiety_level: "Low" ou "High"
- avoidance_level: "Low" ou "High"

### Spiral Dynamics
- spiral_level: 1-8 (ou tier)
- color: "Beige", "Purple", "Red", etc.
- worldview: descrição curta da visão de mundo
- life_conditions: condições de vida associadas

## Resposta
Retorne APENAS o JSON válido, sem explicações adicionais.
