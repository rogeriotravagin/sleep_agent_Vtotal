# Ralph Prompt: Refactor - Add Examples Section

## Mode: refactor (append-examples)

## Context
You are refactoring existing psychological profile files to add a missing "Exemplos Ilustrativos" (Illustrative Examples) section.

## Task

### Input
- **File to refactor:** `{INPUT_FILE}`
- **System:** `{SYSTEM_NAME}`
- **Profile:** `{PROFILE_NAME}`

### Instructions

1. **READ the existing file completely** to understand:
   - What psychological system this belongs to
   - What specific profile/type/dimension is described
   - The core characteristics and behaviors described

2. **GENERATE an Examples section** with:
   - 5-8 famous real people (Figuras Notáveis)
   - 3-5 fictional characters (Personagens Fictícios)
   - A connecting paragraph (Padrão Comum Observado)

3. **APPEND the section to the END of the file** using the Edit tool

## Section Format

```markdown
---

## Exemplos Ilustrativos

### Figuras Notáveis

*(Utilize estas figuras como arquétipos para análise de padrões, não como classificações definitivas.)*

| Pessoa | Por que exemplifica este perfil |
|--------|--------------------------------|
| **[Nome 1]** | [1-2 frases explicando como a pessoa demonstra este perfil] |
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

[1-2 parágrafos descrevendo o que une estes exemplos e como eles ilustram as características centrais do perfil. Destacar comportamentos típicos, escolhas de vida, e como o perfil se manifesta em diferentes contextos.]
```

## Selection Criteria

### For Famous People (Figuras Notáveis):
- **Mix of genders** (at least 2 women)
- **Mix of fields** (arts, science, business, sports, politics)
- **Mix of eras** (historical and contemporary)
- **Include Brazilians** when possible and appropriate
- **Well-documented characteristics** (not speculation)
- **Avoid**: highly controversial figures, people with only tangential connection

### For Fictional Characters:
- **Popular, recognizable works** (major films, hit series, classic books)
- **Mix of media** (film, TV, literature, animation)
- **Characters with clear arcs** that demonstrate the profile
- **Include**: Disney/Pixar, Marvel/DC, Game of Thrones, Harry Potter, classic literature, popular anime

### For Descriptions:
- **Concise** (1-2 sentences max)
- **Behavior-focused** (what they DO, not what they ARE)
- **Observable traits** (not internal speculation)
- **Connected to the profile** (explicitly show the link)

## Quality Checklist

Before completing, verify:
- [ ] Section starts with `---` separator
- [ ] At least 5 famous people included
- [ ] At least 3 fictional characters included
- [ ] Mix of genders in examples
- [ ] At least 1 Brazilian included (if appropriate)
- [ ] All descriptions are profile-specific (not generic)
- [ ] "Padrão Comum Observado" connects examples to profile
- [ ] Section is APPENDED to end of file (not replacing content)

## ⛔ CRITICAL RULES

1. **DO NOT rewrite the existing file** - only APPEND the new section
2. **DO NOT use git** - no git add, commit, push
3. **DO NOT create new files** - only modify the existing file
4. **READ the file COMPLETELY** before generating examples
5. **VERIFY the section was added** after editing

## Example Output

For a profile about "Introversion" (Big Five), the section might include:

**Figuras Notáveis:**
- Bill Gates (technology focus, systematic thinking)
- Albert Einstein (solitary work, deep concentration)
- J.K. Rowling (writing in isolation, rich inner world)
- Keanu Reeves (low-key lifestyle, private nature)
- Fernanda Montenegro (selective public appearances, depth over breadth)

**Personagens Fictícios:**
- Sherlock Holmes (preference for solitude, analytical focus)
- Elsa (Frozen) (need for space, internal processing)
- Bruce Wayne (solitary preparation, small trusted circle)

## Validation

After adding the section, the file MUST contain:
- `## Exemplos Ilustrativos` header
- `### Figuras Notáveis` subsection
- `### Personagens Fictícios` subsection
- `### Padrão Comum Observado` subsection
