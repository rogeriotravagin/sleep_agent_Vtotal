#!/bin/bash
# migrate-system.sh - Migra um sistema de perfis para v2.0
# Uso: ./migrate-system.sh <system_name> [evidence_level]

SYSTEM="$1"
EVIDENCE="${2:-B}"  # Default evidence level B

if [ -z "$SYSTEM" ]; then
    echo "❌ Uso: ./migrate-system.sh <system_name> [evidence_level]"
    echo "   Exemplo: ./migrate-system.sh via A"
    exit 1
fi

DIR="/Users/alan/Code/mmos/outputs/perfis/$SYSTEM"

if [ ! -d "$DIR" ]; then
    echo "❌ Diretório não encontrado: $DIR"
    exit 1
fi

cd "$DIR"

# Contar arquivos
TOTAL=$(find . -maxdepth 1 -name "*.md" ! -name "*_v2.md" | wc -l | tr -d ' ')
EXISTING_V2=$(find . -maxdepth 1 -name "*_v2.md" | wc -l | tr -d ' ')

echo "📂 Sistema: $SYSTEM"
echo "📄 Arquivos v1: $TOTAL"
echo "📄 Arquivos v2 existentes: $EXISTING_V2"
echo "🎯 Evidence Level: $EVIDENCE"
echo ""

# Determinar system_category baseado no sistema
case "$SYSTEM" in
    *strength*|via) CATEGORY="strength" ;;
    *dimension*|bigfive*|hexaco*) CATEGORY="dimension" ;;
    *facet*) CATEGORY="facet" ;;
    *trait*|dark-triad) CATEGORY="trait" ;;
    *schema*) CATEGORY="schema" ;;
    *saboteur*) CATEGORY="saboteur" ;;
    *stage*|erikson|kohlberg|kegan|maslow|spiral|fowler*|hawkins*) CATEGORY="stage" ;;
    *archetype*|jung*|greek*|tarot*) CATEGORY="archetype" ;;
    *defense*|defesas|ego-defenses) CATEGORY="defense" ;;
    *style*|conflict*|learning*|attachment) CATEGORY="style" ;;
    *type*|mbti|socionics|keirsey*) CATEGORY="type" ;;
    *intelligence*) CATEGORY="intelligence" ;;
    *value*|schwartz|moral*) CATEGORY="value" ;;
    *) CATEGORY="profile" ;;  # Default
esac

echo "🏷️ System Category: $CATEGORY"
echo ""

COUNT=0
for f in *.md; do
    # Skip se já é v2
    case "$f" in *_v2.md) continue;; esac

    name="${f%.md}"
    v2_file="${name}_v2.md"

    # Skip se v2 já existe
    if [ -f "$v2_file" ]; then
        echo "⏭️ Skip (já existe): $v2_file"
        continue
    fi

    # Gerar slug
    slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | tr '-' '_')

    # Criar frontmatter
    {
        echo "---"
        echo "profile_id: \"${SYSTEM}_${slug}\""
        echo "display_name: \"$name\""
        echo "system: \"$SYSTEM\""
        echo "system_category: \"$CATEGORY\""
        echo "evidence_level: \"$EVIDENCE\""
        echo "version: \"2.0\""
        echo "related_profiles:"
        echo "  - system: \"bigfive\""
        echo "    profiles: []"
        echo "---"
        echo ""
        cat "$f"
    } > "$v2_file"

    echo "✅ Criado: $v2_file"
    COUNT=$((COUNT + 1))
done

echo ""
echo "📊 Resultado: $COUNT arquivos v2 criados"
echo "📊 Total v2 agora: $(find . -maxdepth 1 -name "*_v2.md" | wc -l | tr -d ' ')"
