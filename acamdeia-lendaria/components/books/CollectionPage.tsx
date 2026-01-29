
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CollectionPageProps {
    onNavigate?: (section: Section) => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ onNavigate }) => {
    
    // --- Mock Data ---
    const collection = {
        title: "Leituras Obrigatórias de IA 2026",
        subtitle: "Explore insights na fronteira da tecnologia",
        curator: "Curadores da Academia",
        description: "Mais do que nunca, a inteligência artificial está incorporada em nossas interações diárias e fluxos de trabalho, prometendo revolucionar o futuro conforme a tecnologia avança. Da estratégia e ética à contratação, produto e o futuro da inteligência, esta coleção equipa você para tomar decisões de IA mais inteligentes agora.",
        tags: ["Tecnologia e Futuro", "Empreendedorismo", "Gestão e Liderança"],
        books: [
            {
                id: 'b1',
                title: "Supremacy",
                author: "Parmy Olson",
                subtitle: "AI, ChatGPT, and the Race that Will Change the World",
                cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
                duration: "26 min",
                rating: 4.2,
                color: "bg-green-500", // Placeholder for cover color
            },
            {
                id: 'b2',
                title: "Empire of AI",
                author: "Karen Hao",
                subtitle: "Dreams and Nightmares in Sam Altman's OpenAI",
                cover: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=300&auto=format&fit=crop",
                duration: "22 min",
                rating: 4.0,
                color: "bg-orange-400",
            },
            {
                id: 'b3',
                title: "Vibe Coding",
                author: "Steve Yegge & Gene Kim",
                subtitle: "Building Software With GenAI, Chat, Agents, and Beyond",
                cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop",
                duration: "21 min",
                rating: 4.3,
                color: "bg-purple-500",
            },
            {
                id: 'b4',
                title: "Me, My Customer, and AI",
                author: "Henrik Werdelin",
                subtitle: "The New Rules of Entrepreneurship",
                cover: "https://images.unsplash.com/photo-1531297461136-82lw8z1a?q=80&w=300&auto=format&fit=crop",
                duration: "18 min",
                rating: 3.9,
                color: "bg-blue-600",
            }
        ],
        related: [
            { title: "Construa sua Vantagem com IA", items: 8, icon: "rocket" },
            { title: "IA e o Futuro do Trabalho", items: 8, icon: "briefcase" },
            { title: "Mente Sobre a Máquina", items: 7, icon: "brain" },
            { title: "Tendências Digitais à Frente", items: 10, icon: "chart-line" },
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20">
            
            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border h-16 transition-all duration-300">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                        >
                            <Icon name="arrow-left" size="size-4" />
                        </Button>
                        <span className="font-bold text-lg tracking-tight flex items-center gap-2">
                            <Icon name="book-open" className="text-brand-gold" /> Biblioteca
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="relative w-64 hidden md:block">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                            <Input 
                                placeholder="Buscar..." 
                                className="pl-9 h-9 bg-muted/30 border-border text-xs focus:border-brand-gold/50 rounded-full" 
                            />
                        </div>
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <div className="bg-brand-yellow/10 dark:bg-brand-gold/5 pt-12 pb-16 border-b border-border/50">
                <div className="container max-w-7xl mx-auto px-6">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-8">
                        <span className="hover:text-primary cursor-pointer transition-colors">Tecnologia & Futuro</span>
                        <Icon name="angle-small-right" size="size-3" />
                        <span className="text-foreground">{collection.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                        {/* Cover Image (Folder Stack Effect) */}
                        <div className="relative w-64 h-64 shrink-0 group perspective-1000">
                             {/* Back Layers */}
                             <div className="absolute top-4 left-4 w-full h-full bg-blue-400 rounded-xl border border-white/10 shadow-sm rotate-6 transition-transform duration-500 group-hover:rotate-12"></div>
                             <div className="absolute top-2 left-2 w-full h-full bg-blue-500 rounded-xl border border-white/10 shadow-sm rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
                             
                             {/* Main Front Card */}
                             <div className="absolute inset-0 bg-blue-600 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                                 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                                     <Icon name="microchip" className="text-9xl rotate-12" />
                                 </div>
                                 <h2 className="text-2xl font-bold font-serif leading-tight relative z-10">{collection.title}</h2>
                                 <div className="mt-4 flex gap-1 justify-center relative z-10">
                                     <Icon name="star" type="solid" className="text-yellow-400" size="size-4" />
                                     <Icon name="star" type="solid" className="text-yellow-400" size="size-4" />
                                     <Icon name="star" type="solid" className="text-yellow-400" size="size-4" />
                                 </div>
                             </div>
                        </div>

                        {/* Info Text */}
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-3">{collection.title}</h1>
                                <p className="text-xl text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                                    <Icon name="book-open" size="size-5" />
                                    {collection.subtitle}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 justify-center md:justify-start text-sm font-medium">
                                <span className="text-muted-foreground">Curadoria por</span>
                                <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-full border border-border shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span className="font-bold">{collection.curator}</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button size="lg" className="rounded-full h-12 px-8 font-bold text-base bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 w-full md:w-auto">
                                    <Icon name="play-circle" type="solid" className="mr-2" size="size-5" /> Começar Agora
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container max-w-7xl mx-auto px-6 py-12 space-y-16">
                
                {/* --- ABOUT SECTION --- */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold font-sans">Sobre esta coleção</h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                        {collection.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="px-4 py-2 text-sm font-medium bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer transition-colors border-0">
                                <Icon name={i === 0 ? "microchip" : i === 1 ? "rocket" : "users-alt"} className="mr-2 opacity-70" size="size-4" />
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <p className="font-serif text-lg text-muted-foreground leading-relaxed max-w-4xl">
                        {collection.description}
                    </p>

                    <div className="pt-4 border-t border-border/50">
                        <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10 gap-2">
                            <Icon name="share" size="size-4" /> Compartilhar com amigos
                        </Button>
                    </div>
                </section>

                {/* --- BOOK GRID --- */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold font-serif mb-1">{collection.title}</h2>
                        <p className="text-muted-foreground font-serif">{collection.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {collection.books.map((book) => (
                            <div 
                                key={book.id} 
                                className="group cursor-pointer flex flex-col h-full"
                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_SUMMARY)}
                            >
                                {/* Cover */}
                                <div className={cn("aspect-[2/3] rounded-lg shadow-md mb-4 overflow-hidden relative transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1", book.color)}>
                                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity" />
                                    
                                    {/* Text Overlay on Cover */}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-center text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">{book.author}</p>
                                        <h3 className="text-xl font-bold text-white font-serif leading-tight">{book.title}</h3>
                                    </div>

                                    {/* Audio Icon */}
                                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
                                        <Icon name="headphones" size="size-4" />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col">
                                    <h4 className="font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors">{book.title}</h4>
                                    <p className="text-xs text-muted-foreground font-medium mb-2">{book.author}</p>
                                    
                                    <p className="text-xs text-muted-foreground font-serif line-clamp-2 mb-3 flex-1">
                                        {book.subtitle}
                                    </p>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold border-t border-border/50 pt-3">
                                        <span className="flex items-center gap-1"><Icon name="document" size="size-3" /> {book.duration}</span>
                                        <span className="flex items-center gap-1"><Icon name="star" size="size-3" /> {book.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- RELATED COLLECTIONS --- */}
                <section className="pt-12 border-t border-border">
                    <h3 className="text-2xl font-bold font-sans mb-8">Mais Coleções</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collection.related.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square rounded-xl bg-card border border-border p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                        <Icon name={item.icon} size="size-8" />
                                    </div>
                                    
                                    <h4 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                                    
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                        <Icon name="layers" size="size-3" /> {item.items} itens
                                    </div>

                                    {/* Stack Effect Visual */}
                                    <div className="absolute top-2 right-2 w-full h-full border-t border-r border-border rounded-tr-xl pointer-events-none opacity-50 translate-x-2 -translate-y-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default CollectionPage;
