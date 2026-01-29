
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface LmsPodcastExploreTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsPodcastExploreTemplate: React.FC<LmsPodcastExploreTemplateProps> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Para Você");

    const categories = ["Para Você", "Negócios", "Tecnologia", "Saúde", "Sociedade", "Investimentos"];

    // Mock Data
    const featuredPodcast = {
        title: "The Diary Of A CEO",
        host: "Steven Bartlett",
        episode: "The AI Revolution: How To Prepare",
        description: "Steven senta com os maiores especialistas em IA do mundo para desmistificar o que vem a seguir. Uma conversa brutalmente honesta sobre o futuro do trabalho.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2500&auto=format&fit=crop",
        logo: "https://i.scdn.co/image/ab6765630000ba8a7e0a8163f53856d2524a87c6" 
    };

    const trendingPodcasts = [
        { title: "Huberman Lab", host: "Andrew Huberman", category: "Saúde", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop", isNew: false },
        { title: "Lenny's Podcast", host: "Lenny Rachitsky", category: "Produto", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop", isNew: true },
        { title: "All-In Podcast", host: "Chamath, Jason, Sacks & Friedberg", category: "Negócios", image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=800&auto=format&fit=crop", isNew: false },
        { title: "My First Million", host: "Shaan Puri & Sam Parr", category: "Empreendedorismo", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop", isNew: false },
        { title: "Naval", host: "Naval Ravikant", category: "Filosofia", image: "https://images.unsplash.com/photo-1478737270239-2f02b77ac618?q=80&w=800&auto=format&fit=crop", isNew: false },
    ];

    const techPodcasts = [
        { title: "Hard Fork", host: "NYT", category: "Tech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop", isNew: true },
        { title: "Lex Fridman", host: "Lex Fridman", category: "AI & Tech", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", isNew: false },
        { title: "Acquired", host: "Ben & David", category: "História", image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=800&auto=format&fit=crop", isNew: false },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20 selection:bg-primary/30">
            
            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 transition-all">
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
                            <Icon name="microphone" className="text-brand-gold" /> Podcasts
                        </span>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8 ml-8 text-sm font-medium text-muted-foreground">
                            <button className="text-foreground font-bold border-b-2 border-primary h-16 flex items-center">Explorar</button>
                            <button className="hover:text-foreground transition-colors">Minha Lista</button>
                            <button className="hover:text-foreground transition-colors">Salvos</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64 hidden md:block">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                            <Input 
                                placeholder="Buscar episódios..." 
                                className="pl-9 h-9 bg-muted/30 border-border text-xs focus:border-brand-gold/50 rounded-full" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-6 py-8 space-y-12">
                
                {/* --- HERO: FEATURED PODCAST --- */}
                <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl group cursor-pointer" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_PODCAST_DETAIL)}>
                    <div className="absolute inset-0">
                        <img 
                            src={featuredPodcast.image} 
                            alt="Hero" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 md:p-16 max-w-2xl space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                             <Badge variant="outline" className="border-brand-gold/30 text-brand-gold bg-brand-gold/10 uppercase tracking-widest text-[9px]">
                                 Em Destaque
                             </Badge>
                             <span className="text-xs font-bold text-white/70 flex items-center gap-1"><Icon name="headphones" size="size-3" /> Resumo disponível</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                            {featuredPodcast.title}
                        </h1>
                        
                        <p className="text-lg md:text-xl text-zinc-300 font-serif leading-relaxed line-clamp-3">
                            {featuredPodcast.description}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4">
                            <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200">
                                <Icon name="play" type="solid" className="mr-2" /> Ouvir Resumo
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 font-bold">
                                <Icon name="plus" className="mr-2" /> Minha Lista
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- CATEGORIES PILLS --- */}
                <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                                selectedCategory === cat
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-card text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                            )}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- SECTION 1: TRENDING --- */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-sans flex items-center gap-2">
                            <Icon name="trend-up" className="text-brand-gold" /> Em Alta
                        </h2>
                        <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">Ver tudo</Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {trendingPodcasts.map((pod, i) => (
                            <div 
                                key={i} 
                                className="group cursor-pointer space-y-3"
                                onClick={() => onNavigate?.(Section.TEMPLATE_LMS_PODCAST_DETAIL)}
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden relative shadow-lg border border-border/10">
                                    <img src={pod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pod.title} />
                                    {pod.isNew && (
                                        <div className="absolute top-2 left-2 bg-brand-gold text-black text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                                            NOVO EP
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                                            <Icon name="play" type="solid" size="size-5" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">{pod.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{pod.host}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION 2: TECH & FUTURE --- */}
                <section className="space-y-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-sans flex items-center gap-2">
                            <Icon name="microchip" className="text-brand-blue" /> Tech & Futuro
                        </h2>
                        <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">Ver tudo</Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {techPodcasts.map((pod, i) => (
                            <div 
                                key={i} 
                                className="group cursor-pointer space-y-3"
                                onClick={() => onNavigate?.(Section.TEMPLATE_LMS_PODCAST_DETAIL)}
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden relative shadow-lg border border-border/10">
                                    <img src={pod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pod.title} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                                            <Icon name="play" type="solid" size="size-5" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">{pod.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{pod.host}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default LmsPodcastExploreTemplate;
