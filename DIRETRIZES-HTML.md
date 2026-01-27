# Diretrizes para Criação de Páginas HTML

## Academia Lendária Design System v4.1.0

Este documento estabelece as diretrizes oficiais para criação de qualquer página HTML seguindo o padrão visual da Academia Lendária.

---

## 1. Estrutura Base HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">

  <!-- Icons (Flaticon UIcons) -->
  <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css">
  <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.1.0/uicons-solid-rounded/css/uicons-solid-rounded.css">
  <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.1.0/uicons-brands/css/uicons-brands.css">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Tailwind Config -->
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Source Serif 4', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            brand: {
              gold: '#C9B298',
              yellow: '#FFCC00',
              'yellow-dark': '#D1A700',
              blue: '#007AFF',
              green: '#34C759',
              red: '#FF3B30',
              orange: '#FF9500',
              pink: '#FF2D55',
              indigo: '#5856D6',
              cyan: '#32ADE6',
              mint: '#00C7BE',
            },
          },
          borderRadius: {
            luxury: '2.5rem',
          },
          animation: {
            'fade-in': 'fade-in 0.5s ease-out forwards',
            'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
            'scale-in': 'scale-in 0.3s ease-out forwards',
            'float': 'float 3s ease-in-out infinite',
            'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          },
          keyframes: {
            'fade-in': {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            'fade-in-up': {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            'scale-in': {
              '0%': { transform: 'scale(0.95)', opacity: '0' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            },
            'float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            'pulse-slow': {
              '0%, 100%': { opacity: '1' },
              '50%': { opacity: '0.5', transform: 'scale(1.05)' },
            },
          },
        },
      },
    }
  </script>

  <!-- CSS Variables & Custom Styles -->
  <style>
    :root {
      --background: 0 0% 100%;
      --foreground: 0 0% 9%;
      --card: 0 0% 100%;
      --card-foreground: 0 0% 9%;
      --primary: 32 27% 69%;
      --primary-foreground: 30 20% 11%;
      --secondary: 0 0% 96%;
      --secondary-foreground: 0 0% 9%;
      --muted: 0 0% 96%;
      --muted-foreground: 0 0% 45%;
      --accent: 0 0% 96%;
      --accent-foreground: 0 0% 9%;
      --destructive: 0 84% 60%;
      --destructive-foreground: 0 0% 98%;
      --border: 0 0% 89%;
      --input: 0 0% 89%;
      --ring: 32 27% 69%;
      --radius: 0.75rem;
    }

    .dark {
      --background: 0 0% 0%;
      --foreground: 0 0% 98%;
      --card: 0 0% 3%;
      --card-foreground: 0 0% 98%;
      --primary: 32 27% 69%;
      --primary-foreground: 30 20% 11%;
      --secondary: 0 0% 9%;
      --secondary-foreground: 0 0% 98%;
      --muted: 0 0% 9%;
      --muted-foreground: 0 0% 63%;
      --accent: 0 0% 9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62% 30%;
      --border: 0 0% 12%;
      --input: 0 0% 12%;
    }

    * {
      border-color: hsl(var(--border));
    }

    body {
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
    }

    /* Utility Classes */
    .bg-background { background-color: hsl(var(--background)); }
    .bg-foreground { background-color: hsl(var(--foreground)); }
    .bg-card { background-color: hsl(var(--card)); }
    .bg-primary { background-color: hsl(var(--primary)); }
    .bg-secondary { background-color: hsl(var(--secondary)); }
    .bg-muted { background-color: hsl(var(--muted)); }
    .bg-accent { background-color: hsl(var(--accent)); }
    .bg-destructive { background-color: hsl(var(--destructive)); }

    .text-foreground { color: hsl(var(--foreground)); }
    .text-card-foreground { color: hsl(var(--card-foreground)); }
    .text-primary { color: hsl(var(--primary)); }
    .text-primary-foreground { color: hsl(var(--primary-foreground)); }
    .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .text-accent-foreground { color: hsl(var(--accent-foreground)); }
    .text-destructive { color: hsl(var(--destructive)); }

    .border-border { border-color: hsl(var(--border)); }
    .border-input { border-color: hsl(var(--input)); }
    .border-primary { border-color: hsl(var(--primary)); }

    .ring-ring { --tw-ring-color: hsl(var(--ring)); }

    /* Gradient Text */
    .text-gradient-brand {
      background: linear-gradient(135deg, #C9B298 0%, #F2EBE4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Glow Effect */
    .shadow-glow {
      box-shadow: 0 0 20px rgba(201, 178, 152, 0.15);
    }

    .shadow-glow-strong {
      box-shadow: 0 0 30px rgba(201, 178, 152, 0.3);
    }

    /* Custom Scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: hsl(var(--border));
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--muted-foreground));
    }

    /* Luxury Vignette */
    .bg-luxury-vignette {
      background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
    }
  </style>
</head>
<body class="dark overflow-x-hidden font-sans">
  <!-- Conteúdo aqui -->
</body>
</html>
```

---

## 2. Paleta de Cores

### Cor Principal (Brand)
| Nome | HSL | HEX | Uso |
|------|-----|-----|-----|
| **Gold (Primary)** | 32 27% 69% | #C9B298 | Cor principal, CTAs, destaques |
| Gold Foreground | 30 20% 11% | #231F1B | Texto sobre gold |

### Cores de Suporte
| Nome | HEX | Uso |
|------|-----|-----|
| Yellow | #FFCC00 | Alertas, destaques especiais |
| Blue | #007AFF | Links, informação |
| Green | #34C759 | Sucesso, confirmações |
| Red | #FF3B30 | Erros, alertas críticos |
| Orange | #FF9500 | Avisos |
| Pink | #FF2D55 | Destaque alternativo |
| Indigo | #5856D6 | Ações secundárias |
| Cyan | #32ADE6 | Informação secundária |
| Mint | #00C7BE | Sucesso alternativo |

### Temas Alternativos Disponíveis
- **Gold** (padrão): #C9B298
- **Slate**: #538096
- **Mint**: #00C7BE
- **Teal**: #30B0C7
- **Cyan**: #32ADE6
- **Indigo**: #5856D6
- **Pink**: #FF2D55
- **Brown**: #A2845E

---

## 3. Tipografia

### Fontes
| Fonte | Uso | Pesos |
|-------|-----|-------|
| **Inter** | UI, títulos, botões, labels | 400, 500, 600, 700, 800, 900 |
| **Source Serif 4** | Corpo de texto, parágrafos | 200-900, itálico |
| **JetBrains Mono** | Código, dados técnicos | 400, 700 |

### Escala Tipográfica
| Elemento | Tailwind | Tamanho | Peso | Classe |
|----------|----------|---------|------|--------|
| Hero/Display | text-7xl md:text-8xl | 72-96px | Bold | font-sans font-bold |
| H1 | text-5xl md:text-6xl | 48-60px | Bold | font-sans font-bold |
| H2 | text-4xl | 36px | Bold | font-sans font-bold |
| H3 | text-3xl | 30px | Bold | font-sans font-bold |
| H4 | text-2xl | 24px | SemiBold | font-sans font-semibold |
| UI Large | text-lg | 18px | SemiBold | font-sans font-semibold |
| Body | text-base | 16px | Regular | font-serif |
| Small | text-sm | 14px | Regular | font-sans |
| Caption | text-xs | 12px | Medium | font-sans font-medium |

### Regras de Uso
- Usar **Inter** para títulos, UI e CTAs
- Usar **Source Serif 4** para textos longos e parágrafos
- Manter linhas entre 50-75 caracteres
- Evitar CAPS em frases longas (reservar para badges/labels)
- Não centralizar parágrafos com mais de 3 linhas

---

## 4. Espaçamento

### Grid Base: 8px

| Tailwind | Pixels | Uso |
|----------|--------|-----|
| p-1, gap-1 | 4px | Muito compacto |
| p-2, gap-2 | 8px | Compacto |
| p-4, gap-4 | 16px | Padrão compacto |
| p-6, gap-6 | 24px | Padrão |
| p-8, gap-8 | 32px | Padrão card |
| p-10, gap-10 | 40px | Espaçoso |
| p-12, gap-12 | 48px | Muito espaçoso |
| p-16, gap-16 | 64px | Seções |
| p-20, gap-20 | 80px | Grandes seções |
| p-24, gap-24 | 96px | Hero sections |

---

## 5. Componentes

### Card
```html
<div class="rounded-luxury border border-border bg-card text-card-foreground shadow-sm transition-all duration-500">
  <div class="flex flex-col space-y-1.5 p-8">
    <h3 class="text-2xl font-sans font-bold leading-none tracking-tight text-foreground">
      Título do Card
    </h3>
    <p class="text-sm text-muted-foreground">Descrição do card</p>
  </div>
  <div class="p-8 pt-0">
    <!-- Conteúdo -->
  </div>
  <div class="flex items-center p-8 pt-0">
    <!-- Footer -->
  </div>
</div>
```

### Button (Variantes)
```html
<!-- Primary (Default) -->
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]">
  BOTÃO PRIMÁRIO
</button>

<!-- Secondary -->
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all active:scale-[0.98]">
  BOTÃO SECUNDÁRIO
</button>

<!-- Outline -->
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 border border-border bg-transparent hover:bg-muted transition-all active:scale-[0.98]">
  BOTÃO OUTLINE
</button>

<!-- Ghost -->
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 hover:bg-muted transition-all active:scale-[0.98]">
  BOTÃO GHOST
</button>

<!-- Glowing (Premium) -->
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 bg-black border border-primary/30 text-primary shadow-glow hover:shadow-glow-strong transition-all active:scale-[0.98]">
  BOTÃO GLOWING
</button>

<!-- Tamanhos -->
<!-- Small: h-10 px-6 -->
<!-- Default: h-14 px-8 py-2 -->
<!-- Large: h-16 px-12 text-xs -->
<!-- Icon: h-10 w-10 p-0 -->
```

### Badge (Variantes)
```html
<!-- Default -->
<span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] bg-primary/10 text-primary border-transparent">
  DEFAULT
</span>

<!-- Success -->
<span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] bg-brand-green/10 text-brand-green border-transparent">
  SUCESSO
</span>

<!-- Warning -->
<span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] bg-brand-orange/10 text-brand-orange border-transparent">
  AVISO
</span>

<!-- Destructive -->
<span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] bg-destructive/10 text-destructive border-transparent">
  ERRO
</span>

<!-- Outline -->
<span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] border-border bg-transparent text-foreground">
  OUTLINE
</span>
```

### Input
```html
<input
  type="text"
  placeholder="Placeholder..."
  class="flex h-14 w-full rounded-2xl border border-input bg-background px-6 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
>
```

### Icons (Flaticon UIcons)
```html
<!-- Regular -->
<i class="fi fi-rr-home text-base"></i>
<i class="fi fi-rr-user text-lg"></i>
<i class="fi fi-rr-search text-xl"></i>

<!-- Solid -->
<i class="fi fi-sr-heart text-base"></i>
<i class="fi fi-sr-star text-lg"></i>

<!-- Brands -->
<i class="fi fi-brands-github text-2xl"></i>
<i class="fi fi-brands-twitter text-2xl"></i>

<!-- Tamanhos -->
<!-- text-xs (12px), text-sm (14px), text-base (16px), text-lg (18px) -->
<!-- text-xl (20px), text-2xl (24px), text-3xl (30px), text-4xl (36px) -->
```

---

## 6. Layout

### Container Principal
```html
<div class="flex h-screen bg-background text-foreground overflow-hidden font-sans">
  <!-- Sidebar (opcional) -->
  <aside class="w-64 border-r border-border bg-card hidden md:flex flex-col">
    <!-- Conteúdo da sidebar -->
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col h-full overflow-hidden">
    <!-- Header Mobile -->
    <header class="md:hidden p-4 border-b border-border flex items-center justify-between">
      <!-- Menu mobile -->
    </header>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
      <!-- Conteúdo -->
    </div>
  </main>
</div>
```

### Grid Responsivo
```html
<!-- 1 coluna mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Breakpoints
| Breakpoint | Largura | Uso |
|------------|---------|-----|
| sm | 640px | Mobile grande |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Desktop grande |
| 2xl | 1536px | Telas largas |

---

## 7. Animações

### Classes de Animação
```html
<!-- Fade In -->
<div class="animate-fade-in">Conteúdo</div>

<!-- Fade In Up -->
<div class="animate-fade-in-up">Conteúdo</div>

<!-- Scale In -->
<div class="animate-scale-in">Conteúdo</div>

<!-- Float (loop) -->
<div class="animate-float">Conteúdo flutuante</div>

<!-- Pulse Slow (loop) -->
<div class="animate-pulse-slow">Conteúdo pulsante</div>
```

### Delay de Animação
```html
<div class="animate-fade-in-up" style="animation-delay: 0.1s">Item 1</div>
<div class="animate-fade-in-up" style="animation-delay: 0.2s">Item 2</div>
<div class="animate-fade-in-up" style="animation-delay: 0.3s">Item 3</div>
```

---

## 8. Efeitos Visuais

### Gradiente de Texto
```html
<h1 class="text-gradient-brand text-6xl font-bold">
  Título com Gradiente
</h1>
```

### Glow Effect
```html
<div class="shadow-glow">Elemento com brilho suave</div>
<div class="shadow-glow-strong">Elemento com brilho forte</div>
```

### Perspectiva 3D
```html
<div class="perspective-1000">
  <div class="transform rotate-y-6 hover:rotate-y-0 transition-transform">
    Card com perspectiva
  </div>
</div>
```

### Vinheta de Fundo
```html
<div class="relative">
  <img src="..." class="w-full h-full object-cover">
  <div class="absolute inset-0 bg-luxury-vignette"></div>
</div>
```

---

## 9. Dark Mode

### Toggle Manual
```javascript
// Ativar dark mode
document.documentElement.classList.add('dark');

// Desativar dark mode
document.documentElement.classList.remove('dark');

// Toggle
document.documentElement.classList.toggle('dark');
```

### Detectar Preferência do Sistema
```javascript
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

---

## 10. Checklist de Validação

Antes de finalizar qualquer página, verifique:

### Estrutura
- [ ] Meta tags corretas (charset, viewport)
- [ ] Fontes carregadas (Inter, Source Serif 4, JetBrains Mono)
- [ ] Ícones carregados (Flaticon UIcons)
- [ ] Tailwind CSS configurado
- [ ] CSS Variables definidas

### Visual
- [ ] Cor primária gold (#C9B298) aplicada corretamente
- [ ] Tipografia seguindo a hierarquia definida
- [ ] Espaçamentos no grid de 8px
- [ ] Border-radius luxury (2.5rem) em cards e botões
- [ ] Dark mode funcionando

### Responsividade
- [ ] Layout funciona em mobile (< 640px)
- [ ] Layout funciona em tablet (768px)
- [ ] Layout funciona em desktop (1024px+)
- [ ] Textos legíveis em todos os tamanhos

### Performance
- [ ] Fontes com preconnect
- [ ] Imagens otimizadas
- [ ] Animações suaves (não travam)

### Acessibilidade
- [ ] Contraste adequado de cores
- [ ] Focus states visíveis
- [ ] Navegação por teclado funcional
- [ ] Alt text em imagens

---

## 11. Exemplos de Seções

### Hero Section
```html
<section class="min-h-screen flex items-center justify-center p-8 md:p-16">
  <div class="text-center max-w-4xl animate-fade-in-up">
    <span class="inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] bg-primary/10 text-primary border-transparent mb-8">
      ACADEMIA LENDÁRIA
    </span>
    <h1 class="text-gradient-brand text-5xl md:text-7xl font-bold mb-6">
      Título Principal da Página
    </h1>
    <p class="text-xl text-muted-foreground font-serif mb-10 max-w-2xl mx-auto">
      Descrição elegante e persuasiva que explica o valor da oferta ou conteúdo da página.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]">
        COMEÇAR AGORA
      </button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] h-14 px-8 py-2 border border-border bg-transparent hover:bg-muted transition-all active:scale-[0.98]">
        SAIBA MAIS
      </button>
    </div>
  </div>
</section>
```

### Cards Grid
```html
<section class="p-8 md:p-16">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Nossos Recursos</h2>
    <p class="text-muted-foreground font-serif max-w-2xl mx-auto">
      Descrição breve dos recursos apresentados abaixo.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <!-- Card 1 -->
    <div class="rounded-luxury border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 hover:shadow-glow animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="p-8">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <i class="fi fi-rr-star text-2xl text-primary"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Recurso 1</h3>
        <p class="text-muted-foreground font-serif">
          Descrição do recurso com detalhes sobre seus benefícios.
        </p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="rounded-luxury border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 hover:shadow-glow animate-fade-in-up" style="animation-delay: 0.2s">
      <div class="p-8">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <i class="fi fi-rr-rocket text-2xl text-primary"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Recurso 2</h3>
        <p class="text-muted-foreground font-serif">
          Descrição do recurso com detalhes sobre seus benefícios.
        </p>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="rounded-luxury border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 hover:shadow-glow animate-fade-in-up" style="animation-delay: 0.3s">
      <div class="p-8">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <i class="fi fi-rr-shield-check text-2xl text-primary"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Recurso 3</h3>
        <p class="text-muted-foreground font-serif">
          Descrição do recurso com detalhes sobre seus benefícios.
        </p>
      </div>
    </div>
  </div>
</section>
```

---

## 12. Referências

- **Design System Original:** `acamdeia-lendaria/`
- **Framework de Desenvolvimento:** `aios-core/`
- **Documentação Tailwind:** https://tailwindcss.com/docs
- **Flaticon UIcons:** https://www.flaticon.com/uicons
- **Google Fonts:** https://fonts.google.com

---

**Versão:** 1.0.0
**Última atualização:** Janeiro 2026
**Baseado em:** Academia Lendária Design System v4.1.0 + AIOS-Core v3.10.0
