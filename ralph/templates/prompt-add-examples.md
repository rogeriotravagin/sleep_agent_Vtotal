# Prompt: Adicionar Seção de Exemplos a Perfil Existente

## Contexto

Você é um especialista em psicologia e cultura pop. Sua tarefa é adicionar uma seção de "Exemplos Ilustrativos" a um perfil psicológico existente.

## Arquivo de Entrada

{INPUT_FILE}

## Tarefa

1. **Leia o perfil existente** para entender:
   - Qual sistema psicológico (HEXACO, Big Five, Schema Therapy, etc.)
   - Qual perfil/tipo/dimensão específica
   - Características centrais descritas

2. **Pesquise e selecione exemplos** que demonstrem este perfil:
   - 5-8 figuras notáveis (pessoas reais famosas)
   - 3-5 personagens fictícios
   - Priorize exemplos reconhecíveis pelo público brasileiro

3. **Adicione a seção ao FINAL do arquivo**, seguindo este formato:

```markdown
---

## Exemplos Ilustrativos

### Figuras Notáveis

*(Utilize estas figuras como arquétipos para análise de padrões, não como classificações definitivas.)*

| Pessoa | Por que exemplifica este perfil |
|--------|--------------------------------|
| **[Nome]** | [Descrição 1-2 frases] |
...

### Personagens Fictícios

| Personagem | Obra | Como exemplifica o perfil |
|------------|------|---------------------------|
| **[Nome]** | [Obra] | [Descrição] |
...

### Padrão Comum Observado

[1-2 parágrafos sobre o que une estes exemplos]
```

## Critérios de Qualidade

### Para Figuras Notáveis:
- Mix de gêneros, áreas, épocas
- Incluir brasileiros quando possível
- Evitar pessoas muito controversas
- Características bem documentadas publicamente

### Para Personagens Fictícios:
- Obras populares e conhecidas (filmes, séries, livros)
- Mix de mídias e gêneros
- Personagens com arcos que demonstram o perfil

### Descrições:
- Concisas (1-2 frases)
- Focadas em COMO a pessoa/personagem demonstra o perfil
- Comportamentos observáveis, não suposições

## Output

Retorne APENAS a seção de exemplos para ser adicionada ao arquivo (não o arquivo completo).

Comece com `---` e termine com o parágrafo "Padrão Comum Observado".
