
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface LmsToolsTemplateProps {
    onNavigate?: (section: Section) => void;
}

interface Tool {
    id: string;
    name: string;
    description: string;
    logoUrl?: string; // URL for logo
    logoIcon?: string; // Icon fallback
    logoColor?: string; // Tailwind text color class for icon
    featured?: boolean;
}

interface ToolCategory {
    id: string;
    title: string;
    description: string;
    tools: Tool[];
}

const LmsToolsTemplate: React.FC<LmsToolsTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data ---
    const categories: ToolCategory[] = [
        {
            id: 'ia',
            title: "Inteligência Artificial",
            description: "Modelos de linguagem e geração de conteúdo.",
            tools: [
                { id: 'gpt', name: "ChatGPT", description: "O modelo mais versátil da OpenAI.", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", featured: true },
                { id: 'claude', name: "Claude", description: "IA da Anthropic com foco em segurança e análise.", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Claude_AI_logo.svg", featured: true },
                { id: 'mid', name: "Midjourney", description: "Geração de imagens artísticas via Discord.", logoIcon: "palette", logoColor: "text-foreground" },
                { id: 'gemini', name: "Gemini", description: "IA multimodal do Google integrada ao Workspace.", logoIcon: "google", logoColor: "text-blue-400" },
                { id: 'perplexity', name: "Perplexity", description: "Motor de busca conversacional em tempo real.", logoIcon: "search-alt", logoColor: "text-teal-400" },
            ]
        },
        {
            id: 'auto',
            title: "Automação & Integração",
            description: "Conecte seus aplicativos e crie fluxos automáticos.",
            tools: [
                { id: 'n8n', name: "n8n", description: "Automação de fluxo de trabalho baseada em nós.", logoUrl: "https://n8n.io/favicon.ico", featured: true },
                { id: 'zapier', name: "Zapier", description: "O padrão da indústria para integrações fáceis.", logoUrl: "https://cdn.icon-icons.com/icons2/2699/PNG/512/zapier_logo_icon_169305.png" },
                { id: 'make', name: "Make", description: "Antigo Integromat. Poder visual para cenários complexos.", logoUrl: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1407e3243177f198150499092490731f/make-make.png" },
            ]
        },
        {
            id: 'nocode',
            title: "No-Code & Apps",
            description: "Construa software sem escrever código.",
            tools: [
                { id: 'bubble', name: "Bubble", description: "A plataforma no-code mais poderosa para web apps.", logoIcon: "layout-fluid", logoColor: "text-indigo-400" },
                { id: 'flutterflow', name: "FlutterFlow", description: "Apps nativos bonitos e rápidos.", logoIcon: "mobile-android", logoColor: "text-blue-500" },
                { id: 'notion', name: "Notion", description: "Wiki, docs e gestão de projetos tudo-em-um.", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
                { id: 'airtable', name: "Airtable", description: "Planilha com superpoderes de banco de dados.", logoIcon: "table", logoColor: "text-yellow-400" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20">
            
            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground md:hidden"
                        >
                            <Icon name="menu-burger" size="size-4" />
                        </Button>
                        <span className="font-bold text-lg tracking-tight flex items-center gap-2">
                            <Icon name="microchip" className="text-brand-gold" /> Ferramentas
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Icon name="search" size="size-4" />
                        </Button>
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="space-y-12 py-8">
                
                {/* Hero Section */}
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-8 md:p-12 shadow-sm">
                        {/* Overlay for consistent dark hero feel even in light mode if desired, but making it adaptive here */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background to-card opacity-50 dark:from-zinc-900 dark:to-black"></div>

                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Icon name="settings" className="text-[10rem] text-foreground rotate-45" />
                        </div>
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <Badge variant="outline" className="text-brand-blue border-brand-blue/30 bg-brand-blue/5 uppercase tracking-widest text-[10px]">
                                Tech Stack Oficial
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                                Arsenal de Ferramentas
                            </h1>
                            <p className="text-muted-foreground font-serif text-lg">
                                Nossa curadoria das melhores IAs e softwares do mercado. Selecionadas para garantir produtividade e escala.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Categories Rows */}
                <div className="space-y-16">
                    {categories.map((cat) => (
                        <section key={cat.id} className="space-y-4">
                            <div className="container max-w-7xl mx-auto px-6">
                                <div className="flex items-end justify-between border-b border-border pb-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-1">{cat.title}</h3>
                                        <p className="text-sm text-muted-foreground font-serif">{cat.description}</p>
                                    </div>
                                    <Button variant="ghost" className="text-xs text-muted-foreground hover:text-foreground hidden sm:flex">
                                        Ver todas <Icon name="arrow-right" className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Horizontal Scroll */}
                            <div className="flex overflow-x-auto pb-8 px-6 gap-6 snap-x snap-mandatory scrollbar-hide container max-w-7xl mx-auto">
                                {cat.tools.map((tool) => (
                                    <div 
                                        key={tool.id} 
                                        className="snap-start min-w-[280px] w-[280px] bg-card border border-border rounded-2xl p-6 hover:border-brand-gold/50 transition-all duration-300 group cursor-pointer relative hover:-translate-y-1 shadow-sm hover:shadow-md"
                                    >
                                        {/* Featured Tag */}
                                        {tool.featured && (
                                            <div className="absolute top-0 right-0 bg-brand-gold text-black text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                                Essencial
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 mb-6">
                                            {/* Logo Container */}
                                            <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center p-3 shadow-inner group-hover:shadow-brand-gold/10 transition-shadow">
                                                {tool.logoUrl ? (
                                                    <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Icon name={tool.logoIcon || 'box'} className={cn("text-3xl", tool.logoColor)} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-foreground group-hover:text-brand-gold transition-colors">{tool.name}</h4>
                                                <Badge variant="secondary" className="text-[9px] bg-muted text-muted-foreground mt-1 hover:bg-muted/80">
                                                    {cat.id.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground font-serif leading-relaxed line-clamp-2 h-10 mb-6">
                                            {tool.description}
                                        </p>

                                        <Button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border group-hover:border-brand-gold/30">
                                            Acessar <Icon name="external-link" className="ml-2" size="size-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default LmsToolsTemplate;
