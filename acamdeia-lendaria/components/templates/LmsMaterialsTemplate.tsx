
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface LmsMaterialsTemplateProps {
    onNavigate?: (section: Section) => void;
}

interface Material {
    id: string;
    title: string;
    type: string;
    size: string;
    icon: string;
    color: string;
}

interface CategorySection {
    title: string;
    items: Material[];
}

const LmsMaterialsTemplate: React.FC<LmsMaterialsTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data Organized by Categories ---
    const sections: CategorySection[] = [
        {
            title: "Documentos Essenciais",
            items: [
                { id: '1', title: "Contrato de Prestação de Serviços", type: "DOCX", size: "500 KB", icon: "file-contract", color: "text-blue-400" },
                { id: '2', title: "Briefing Padrão de Projeto", type: "G-Docs", size: "Link", icon: "file-edit", color: "text-yellow-400" },
                { id: '3', title: "Proposta Comercial Irresistível", type: "PDF", size: "2.4 MB", icon: "file-pdf", color: "text-red-400" },
                { id: '4', title: "NDA - Acordo de Confidencialidade", type: "PDF", size: "1.1 MB", icon: "lock", color: "text-zinc-400" },
            ]
        },
        {
            title: "Planilhas de Gestão",
            items: [
                { id: '5', title: "Fluxo de Caixa Avançado", type: "XLSX", size: "4.2 MB", icon: "file-excel", color: "text-green-500" },
                { id: '6', title: "Calculadora de ROI", type: "Sheets", size: "Link", icon: "calculator", color: "text-green-400" },
                { id: '7', title: "Dashboard de Métricas", type: "XLSX", size: "12 MB", icon: "chart-pie", color: "text-purple-400" },
                { id: '8', title: "Controle de Pessoal", type: "Sheets", size: "Link", icon: "users", color: "text-orange-400" },
            ]
        },
        {
            title: "Kits de Design & Marketing",
            items: [
                { id: '9', title: "Pack de Ícones 3D", type: "ZIP", size: "140 MB", icon: "cube", color: "text-pink-400" },
                { id: '10', title: "Templates de Social Media", type: "FIG", size: "Link", icon: "figma", color: "text-purple-500" }, // Figma brand icon special handling via type check in render
                { id: '11', title: "Brandbook Template", type: "PDF", size: "15 MB", icon: "palette", color: "text-cyan-400" },
                { id: '12', title: "Slide Deck Pitch", type: "PPTX", size: "22 MB", icon: "presentation", color: "text-brand-gold" },
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
                            <Icon name="folder-open" className="text-brand-gold" /> Materiais
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
                
                {/* Hero Banner */}
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-8 md:p-12 shadow-sm">
                         {/* Subtle dark overlay for contrast on light mode */}
                         <div className="absolute inset-0 bg-gradient-to-r from-background to-card opacity-50 dark:from-zinc-900 dark:to-black"></div>

                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Icon name="folder" className="text-9xl text-foreground rotate-12" />
                        </div>
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <Badge variant="outline" className="text-brand-gold border-brand-gold/30 bg-brand-gold/5 uppercase tracking-widest text-[10px]">
                                Área de Downloads
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                                Insumos para sua Jornada
                            </h1>
                            <p className="text-muted-foreground font-serif text-lg">
                                Templates validados, contratos blindados e ferramentas de gestão prontos para copiar e colar no seu negócio.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Categories Rows */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <section key={idx} className="space-y-4">
                            <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    {section.title}
                                </h3>
                                <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground h-auto p-0">
                                    Ver todos <Icon name="angle-small-right" />
                                </Button>
                            </div>
                            
                            {/* Horizontal Scroll Container */}
                            <div className="flex overflow-x-auto pb-6 px-6 gap-4 snap-x snap-mandatory scrollbar-hide container max-w-7xl mx-auto">
                                {section.items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="snap-start min-w-[200px] w-[200px] group cursor-pointer"
                                    >
                                        <div className="aspect-[4/5] bg-card border border-border rounded-xl relative overflow-hidden transition-all duration-300 group-hover:border-brand-gold/30 group-hover:-translate-y-1 hover:shadow-xl">
                                            {/* Top Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                                            
                                            {/* Icon Center */}
                                            <div className="absolute inset-0 flex items-center justify-center z-0 bg-muted/30 group-hover:scale-110 transition-transform duration-500">
                                                <Icon name={item.icon} className={cn("text-5xl opacity-80", item.color)} type={item.type === 'FIG' ? 'brands' : 'regular'} />
                                            </div>

                                            {/* Content Bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                <div className="flex justify-between items-end mb-2">
                                                    <Badge variant="secondary" className="text-[9px] h-5 bg-white/10 text-white backdrop-blur-sm border-0">
                                                        {item.type}
                                                    </Badge>
                                                    <span className="text-[10px] text-zinc-300 font-mono">{item.size}</span>
                                                </div>
                                                <h4 className="font-bold text-sm text-white leading-tight line-clamp-2 group-hover:text-brand-gold transition-colors">
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Download Overlay Action */}
                                            <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300">
                                                    <Icon name="download" size="size-5" />
                                                </div>
                                            </div>
                                        </div>
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

export default LmsMaterialsTemplate;
