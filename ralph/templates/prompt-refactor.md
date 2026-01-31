# Ralph Agent Instructions - REFACTOR MODE

> **Projeto:** {{project_name}}
> **Modo:** Refatoração (Adicionar Exemplos)
> **Sistema:** {{system_name}}

## ⛔ CRITICAL RULES

1. **NO GIT OPERATIONS** - Do NOT use git add, git commit, git push, or any git commands
2. **NO SSH** - Do NOT attempt any SSH connections
3. **READ before EDIT** - Always read the complete file before modifying
4. **APPEND ONLY** - Do NOT rewrite the file, only APPEND the new section
5. **Update prd.json** - Mark stories as passes: true when complete

## Project Context

- **PROJECT_DIR**: docs/ralph/refactor-examples/
- **PRD_FILE**: {{system_slug}}-examples.json
- **TARGET_DIR**: outputs/perfis/{{system_slug}}/

---

## Task: Add Examples Section

For each user story, you must:

1. **Read** the existing profile file completely
2. **Understand** what psychological profile/type/dimension is described
3. **Research** and select appropriate examples:
   - 5-8 famous real people (Figuras Notáveis)
   - 3-5 fictional characters (Personagens Fictícios)
4. **Append** the examples section to the END of the file
5. **Verify** the section was added correctly
6. **Update** the PRD to mark the story as passes: true

---

## Section Format

The section to append must follow this EXACT format:

```markdown
---

## Exemplos Ilustrativos

### Figuras Notáveis

*(Utilize estas figuras como arquétipos para análise de padrões, não como classificações definitivas.)*

| Pessoa | Por que exemplifica este perfil |
|--------|--------------------------------|
| **[Nome 1]** | [1-2 frases explicando como demonstra este perfil] |
| **[Nome 2]** | [1-2 frases...] |
| **[Nome 3]** | [1-2 frases...] |
| **[Nome 4]** | [1-2 frases...] |
| **[Nome 5]** | [1-2 frases...] |

### Personagens Fictícios

| Personagem | Obra | Como exemplifica o perfil |
|------------|------|---------------------------|
| **[Personagem 1]** | [Filme/Série/Livro] | [1-2 frases] |
| **[Personagem 2]** | [Filme/Série/Livro] | [1-2 frases] |
| **[Personagem 3]** | [Filme/Série/Livro] | [1-2 frases] |

### Padrão Comum Observado

[1-2 parágrafos descrevendo o que une estes exemplos e como eles ilustram as características centrais do perfil.]
```

---

## Selection Criteria

### Famous People (Figuras Notáveis)

**Include a mix of:**
- At least 2 women
- Different fields (arts, science, business, sports, politics)
- Historical and contemporary figures
- At least 1 Brazilian when appropriate

**Each description must:**
- Be 1-2 sentences
- Focus on observable BEHAVIORS
- Explicitly connect to the profile characteristics
- Not be generic (must be specific to THIS profile)

### Fictional Characters

**Include:**
- Characters from popular, recognizable works
- Mix of media (film, TV, books, animation)
- Characters with clear arcs demonstrating the profile

**Good sources:**
- Disney/Pixar films
- Marvel/DC movies
- Game of Thrones, Harry Potter, Lord of the Rings
- Classic literature (Sherlock Holmes, etc.)
- Popular anime (for broader appeal)
- Brazilian telenovelas (when appropriate)

---

## Workflow Per Story

```
1. READ the inputFile completely
   ↓
2. IDENTIFY the profile characteristics
   ↓
3. SELECT examples (famous people + fictional characters)
   ↓
4. WRITE the examples section
   ↓
5. APPEND to the END of the file using Edit tool
   ↓
6. VERIFY the file contains "## Exemplos Ilustrativos"
   ↓
7. UPDATE prd.json: set passes: true for this story
```

---

## Validation Checklist

Before marking a story as complete, verify:

- [ ] File contains `## Exemplos Ilustrativos` header
- [ ] At least 5 famous people listed
- [ ] At least 3 fictional characters listed
- [ ] Descriptions are profile-specific (not generic)
- [ ] "Padrão Comum Observado" paragraph exists
- [ ] Section is at the END of the file
- [ ] Original content is UNCHANGED

---

## Example: Attachment Style - Secure

For "Estilo_01_Seguro.md" (Secure Attachment), appropriate examples would be:

**Figuras Notáveis:**
| Pessoa | Por que exemplifica este perfil |
|--------|--------------------------------|
| **Michelle Obama** | Demonstra equilíbrio entre independência e conexão; comunica necessidades claramente; mantém relacionamentos estáveis de longo prazo. |
| **Keanu Reeves** | Conhecido por relacionamentos autênticos e duradouros; demonstra vulnerabilidade apropriada; oferece apoio consistente a amigos. |
| **Silvio Santos** | Casamento estável por décadas; demonstra capacidade de conexão genuína com público enquanto mantém vida privada saudável. |

**Personagens Fictícios:**
| Personagem | Obra | Como exemplifica o perfil |
|------------|------|---------------------------|
| **Aragorn** | Senhor dos Anéis | Forma vínculos profundos e confiáveis; oferece apoio sem perder autonomia; comunica afeto de forma consistente. |
| **Mufasa** | O Rei Leão | Pai presente e afetuoso; equilibra autoridade com carinho; oferece base segura para exploração do filho. |

---

## Common Mistakes to Avoid

1. ❌ Rewriting the entire file instead of appending
2. ❌ Generic descriptions like "is a good example"
3. ❌ Only male examples
4. ❌ Only American/European examples
5. ❌ Fictional characters from obscure works
6. ❌ Missing the "Padrão Comum Observado" paragraph
7. ❌ Forgetting to update prd.json

---

## Execute

Process all user stories in the PRD sequentially. For each:

1. Read the inputFile
2. Generate appropriate examples
3. Append the section
4. Update prd.json

Begin with US-001 and continue until all stories are complete.
