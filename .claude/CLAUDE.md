# Academia Lendaria - Claude Code Configuration

## Project Overview
Este projeto contém páginas HTML seguindo o Design System da Academia Lendária.

## Design System Reference
Todas as páginas devem seguir as diretrizes definidas em `DIRETRIZES-HTML.md`.

## Key Resources
- **Design System:** `acamdeia-lendaria/` - Componentes React de referência
- **AIOS Framework:** `aios-core/` - Framework de desenvolvimento
- **Diretrizes:** `DIRETRIZES-HTML.md` - Guia completo para criação de páginas

## Tech Stack
- HTML5
- Tailwind CSS (via CDN)
- Google Fonts (Inter, Source Serif 4, JetBrains Mono)
- Flaticon UIcons

## Brand Colors
- **Primary (Gold):** #C9B298
- **Background Dark:** #000000
- **Background Light:** #FFFFFF

## Design Principles
1. **Luxuoso e Premium** - Usar border-radius luxury (2.5rem), sombras suaves
2. **Dark Mode First** - Priorizar modo escuro como padrão
3. **Responsivo** - Mobile-first com breakpoints em 640px, 768px, 1024px
4. **Acessível** - Contraste adequado, focus states visíveis

## File Structure
```
html-busines/
├── .claude/                    # Claude Code config
│   ├── CLAUDE.md              # This file
│   └── rules/                 # Additional rules
├── acamdeia-lendaria/         # Design System reference
├── aios-core/                 # AIOS Framework
├── DIRETRIZES-HTML.md         # HTML guidelines
└── *.html                     # Project pages
```

## Coding Standards
- Usar classes Tailwind para estilização
- Seguir hierarquia tipográfica definida
- Aplicar espaçamento no grid de 8px
- Usar CSS variables para cores do tema

## Commands
- `aios` - Iniciar AIOS Framework
- `git status` - Verificar mudanças
- `git add . && git commit -m "message"` - Commitar mudanças

## Git Configuration
- **User:** rogeriotravagin
- **Email:** rogeriobtj1@gmail.com
