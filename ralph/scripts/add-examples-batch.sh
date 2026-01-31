#!/bin/bash
# add-examples-batch.sh
# Adiciona seção de exemplos a perfis que não têm

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Defaults
DRY_RUN=false
OFFSET=0
LIMIT=0
MAX_CONCURRENT=4

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --offset)
      OFFSET="$2"
      shift 2
      ;;
    --limit)
      LIMIT="$2"
      shift 2
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_CONCURRENT="$1"
      fi
      shift
      ;;
  esac
done

echo -e "${BLUE}🔧 Add Examples Batch${NC}"
echo "=========================="
echo ""

# Find files without examples
echo -e "${YELLOW}🔍 Buscando arquivos sem seção de exemplos...${NC}"

FILES_TO_PROCESS=()
for file in $(find outputs/perfis -name "*.md" -type f | grep -vE "Modelo|INDEX|etl|QA_" | sort); do
  if ! grep -qiE "exemplos ilustrativos|figuras notáveis|pessoas famosas|personagens fictícios" "$file" 2>/dev/null; then
    FILES_TO_PROCESS+=("$file")
  fi
done

TOTAL=${#FILES_TO_PROCESS[@]}
echo -e "📄 Total de arquivos sem exemplos: ${GREEN}$TOTAL${NC}"

# Apply offset and limit
if [ $OFFSET -gt 0 ]; then
  FILES_TO_PROCESS=("${FILES_TO_PROCESS[@]:$OFFSET}")
  echo -e "📍 Offset: $OFFSET (começando do arquivo #$((OFFSET+1)))"
fi

if [ $LIMIT -gt 0 ]; then
  FILES_TO_PROCESS=("${FILES_TO_PROCESS[@]:0:$LIMIT}")
  echo -e "📍 Limit: $LIMIT arquivos"
fi

BATCH_SIZE=${#FILES_TO_PROCESS[@]}
echo -e "📦 Arquivos neste batch: ${GREEN}$BATCH_SIZE${NC}"
echo ""

if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}🔄 DRY RUN - Arquivos que seriam processados:${NC}"
  for file in "${FILES_TO_PROCESS[@]}"; do
    echo "   $file"
  done | head -20
  if [ $BATCH_SIZE -gt 20 ]; then
    echo "   ... e mais $((BATCH_SIZE - 20)) arquivos"
  fi
  exit 0
fi

# Create log directory
LOG_DIR="logs/add-examples-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$LOG_DIR"

echo -e "${GREEN}🚀 Iniciando processamento...${NC}"
echo -e "📁 Logs em: $LOG_DIR"
echo ""

# Process files
PROCESSED=0
ERRORS=0

for file in "${FILES_TO_PROCESS[@]}"; do
  PROCESSED=$((PROCESSED + 1))

  # Get profile info
  system=$(echo "$file" | sed 's|outputs/perfis/||' | cut -d'/' -f1)
  filename=$(basename "$file" .md)

  echo -e "${BLUE}[$PROCESSED/$BATCH_SIZE]${NC} $system/$filename"

  # Create prompt for this file
  PROMPT="Leia o arquivo $file e adicione uma seção de 'Exemplos Ilustrativos' ao final.

A seção deve incluir:
1. 5-8 figuras notáveis (pessoas famosas reais) que exemplificam este perfil
2. 3-5 personagens fictícios de filmes, séries ou livros
3. Um parágrafo 'Padrão Comum Observado' que conecta os exemplos

Formato da seção:

---

## Exemplos Ilustrativos

### Figuras Notáveis

*(Utilize estas figuras como arquétipos para análise de padrões, não como classificações definitivas.)*

| Pessoa | Por que exemplifica este perfil |
|--------|--------------------------------|
| **Nome** | Descrição breve de como exemplifica |

### Personagens Fictícios

| Personagem | Obra | Como exemplifica o perfil |
|------------|------|---------------------------|
| **Nome** | Filme/Série/Livro | Descrição breve |

### Padrão Comum Observado

[Parágrafo conectando os exemplos]

---

IMPORTANTE:
- Leia o arquivo COMPLETO primeiro para entender o perfil
- Adicione a seção ao FINAL do arquivo existente
- NÃO reescreva o arquivo, apenas ADICIONE a seção
- Use o Edit tool para append
- Inclua brasileiros nos exemplos quando possível"

  # Run claude to add examples (using subshell to capture output)
  LOG_FILE="$LOG_DIR/${system}_${filename}.log"

  # Use claude code to process
  echo "$PROMPT" | claude --print > "$LOG_FILE" 2>&1 &

  # Simple rate limiting
  if [ $((PROCESSED % MAX_CONCURRENT)) -eq 0 ]; then
    wait
    echo -e "   ${GREEN}✓ Batch de $MAX_CONCURRENT concluído${NC}"
  fi
done

wait

echo ""
echo -e "${GREEN}✅ Processamento concluído!${NC}"
echo -e "📊 Processados: $PROCESSED"
echo -e "📁 Logs em: $LOG_DIR"
