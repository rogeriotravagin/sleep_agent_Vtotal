# Validation Gate: YAML

```yaml
name: yaml-validation-gate
trigger: before_story_completion
required: true
blocking: true
description: "Validar YAML de arquivos modificados antes de marcar story completa"
```

## Propósito

Prevenir que código com YAML inválido seja marcado como completo.
Este gate é **OBRIGATÓRIO** e **BLOQUEANTE**.

## Quando Executar

- ✅ Antes de marcar qualquer story como `passes: true`
- ✅ Antes de commitar arquivos `.md` com blocos YAML
- ✅ Após qualquer edição em arquivos de agente

## Comando de Validação

```bash
python3 -c "
import yaml, re
with open('ARQUIVO.md') as f: c = f.read()
m = re.search(r'\`\`\`yaml\n(.*?)\n\`\`\`', c, re.DOTALL)
if m: yaml.safe_load(m.group(1)); print('✅ YAML válido')
"
```

## Erros Comuns e Correções

### 1. Dois-pontos em Valores
```yaml
# ❌ ERRADO
- STEP 3: Greet user with: "Hello"

# ✅ CORRETO - usar pipe
- STEP 3: |
    Greet user with: "Hello"
```

### 2. Asterisco em Listas
```yaml
# ❌ ERRADO
- '*help' - Ver comandos

# ✅ CORRETO - aspas completas
- "*help - Ver comandos"
```

### 3. Parênteses Fora de Aspas
```yaml
# ❌ ERRADO
expected: "Sim" (comentário)

# ✅ CORRETO - tudo dentro das aspas
expected: "'Sim' (comentário)"
```

## Checklist

- [ ] Validação YAML executada?
- [ ] Strings com `:` entre aspas ou com `|`?
- [ ] Comandos com `*` entre aspas?
- [ ] Sem texto solto após valores?

---
*Gate criado: 2026-01-15 | Motivação: Bug YAML em alex-hormozi.md*
