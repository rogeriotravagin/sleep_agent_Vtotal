# Enriquecimento de Frontmatter v2.0 com LLM

6 Ralphs paralelos usando Claude Code para enriquecer ~400 perfis psicométricos.

## Quick Start

### Opção 1: Rodar em 6 terminais separados

```bash
# Terminal 1 - Developmental (maslow, erikson, kohlberg, kegan, fowler)
claude "$(cat tasks/enrich-llm/ralph-1-developmental.md)"

# Terminal 2 - Enneagram
claude "$(cat tasks/enrich-llm/ralph-2-enneagram.md)"

# Terminal 3 - Traits (bigfive, hexaco)
claude "$(cat tasks/enrich-llm/ralph-3-traits.md)"

# Terminal 4 - Parts (ifs, psychosynthesis, voice-dialogue, shadow-work)
claude "$(cat tasks/enrich-llm/ralph-4-parts.md)"

# Terminal 5 - Behavioral (disc, mbti, attachment, conflict, belbin)
claude "$(cat tasks/enrich-llm/ralph-5-behavioral.md)"

# Terminal 6 - Consciousness (spiral, hawkins, integral, TA)
claude "$(cat tasks/enrich-llm/ralph-6-consciousness.md)"
```

### Opção 2: Script automatizado

```bash
./tasks/enrich-llm/run-all-ralphs.sh
```

## Distribuição de Trabalho

| Ralph | Sistemas | Arquivos |
|-------|----------|----------|
| 1 | maslow, erikson, kohlberg, kegan, fowler | ~52 |
| 2 | enneagram, eneagrama, enneagram-shadow | ~74 |
| 3 | bigfive, bigfive-perfis, big-five-neo-pi-r, hexaco | ~112 |
| 4 | ifs, psychosynthesis, voice-dialogue, shadow-work | ~58 |
| 5 | disc, mbti, attachment, conflict-styles, belbin | ~48 |
| 6 | spiral, hawkins-consciousness, integral-aqal, TA | ~58 |

**Total: ~400 arquivos**

## Campos Enriquecidos

### Todos os sistemas
- `profile_name` - Nome em inglês
- `profile_name_pt` - Nome em português
- `profile_code` - Código 2-4 letras
- `description_short` - Descrição curta EN
- `description_short_pt` - Descrição curta PT
- `keywords` - Palavras-chave
- `evidence_notes` - Notas sobre evidência científica
- `related_profiles` - Conexões com outros sistemas

### Campos específicos
Cada sistema tem campos próprios definidos nos arquivos `ralph-N-*.md`

## Monitoramento

```bash
# Ver logs em tempo real
tail -f tasks/enrich-llm/logs/ralph-*.log

# Verificar commits
git log --oneline -20

# Contar arquivos processados
git diff --name-only HEAD~10 | grep "_v2.md" | wc -l
```

## Checklist de Conclusão

- [ ] Ralph-1 complete → `ralph-1-complete.md`
- [ ] Ralph-2 complete → `ralph-2-complete.md`
- [ ] Ralph-3 complete → `ralph-3-complete.md`
- [ ] Ralph-4 complete → `ralph-4-complete.md`
- [ ] Ralph-5 complete → `ralph-5-complete.md`
- [ ] Ralph-6 complete → `ralph-6-complete.md`

## Arquivos

```
tasks/enrich-llm/
├── README.md                    # Este arquivo
├── prd.json                     # PRD do projeto
├── prompt-template.md           # Template de prompt
├── ralph-1-developmental.md     # Instruções Ralph 1
├── ralph-2-enneagram.md         # Instruções Ralph 2
├── ralph-3-traits.md            # Instruções Ralph 3
├── ralph-4-parts.md             # Instruções Ralph 4
├── ralph-5-behavioral.md        # Instruções Ralph 5
├── ralph-6-consciousness.md     # Instruções Ralph 6
├── run-all-ralphs.sh            # Script de orquestração
└── logs/                        # Logs de execução
```
