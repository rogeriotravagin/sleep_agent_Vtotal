
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface LmsPodcastDetailTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsPodcastDetailTemplate: React.FC<LmsPodcastDetailTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data ---
    const podcast = {
        title: "Lenny's Podcast",
        host: "Lenny Rachitsky",
        cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop",
        description: "Entrevistas profundas com líderes de produto de classe mundial, growth experts e fundadores. Desconstruindo táticas acionáveis para construir, lançar e escalar produtos.",
        category: "Produto & Growth",
        rating: 4.9,
        listeners: "125k",
        episodesCount: 142
    };

    const episodes = [
        {
            id: 1,
            title: "Como a Linear constrói produtos (com Karri Saarinen)",
            date: "20 Out",
            duration: "1h 12m",
            summaryDuration: "14 min",
            description: "Karri revela os segredos de design e engenharia por trás da velocidade da Linear. Discutimos 'quality bar', por que eles não usam PMs e como manter o foco.",
            isNew: true,
            hasSummary: true
        },
        {
            id: 2,
            title: "O Guia de Growth B2B (com Kyle Poyar)",
            date: "15 Out",
            duration: "58m",
            summaryDuration: "11 min",
            description: "As principais alavancas de crescimento para SaaS em 2025. Pricing, Packaging e PLG vs Sales-Led.",
            isNew: false,
            hasSummary: true
        },
        {
            id: 3,
            title: "Liderança em tempos de crise (com Brian Chesky)",
            date: "08 Out",
            duration: "1h 30m",
            summaryDuration: "18 min",
            description: "O CEO do Airbnb compartilha como reconstruiu a empresa do zero durante a pandemia. Lições brutais de sobrevivência.",
            isNew: false,
            hasSummary: true
        },
        {
            id: 4,
            title: "Design Systems que escalam (com Figma Team)",
            date: "01 Out",
            duration: "45m",
            summaryDuration: "9 min",
            description: "Mergulho profundo na arquitetura de design do Figma. Tokens, variáveis e governança.",
            isNew: false,
            hasSummary: true
        }
    ];

    const [activeTab, setActiveTab] = useState("episodes");
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-foreground font-sans animate-fade-in pb-20 selection:bg-primary/30">
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 h-20 transition-all">
                <div className="container max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-zinc-400 hover:text-white gap-2 pl-0"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_PODCAST_EXPLORE)}
                        >
                            <Icon name="arrow-left" size="size-4" /> Voltar
                        </Button>
                    </div>
                    <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><Icon name="share" /></Button>
                         <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><Icon name="menu-dots" /></Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl mx-auto px-6 py-12">
                
                {/* --- HERO SECTION --- */}
                <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
                    {/* Cover Art */}
                    <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 relative group">
                        <img src={podcast.cover} alt={podcast.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6 pt-2">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                                {podcast.title}
                            </h1>
                            <p className="text-xl text-primary font-bold">{podcast.host}</p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-zinc-400 font-medium">
                            <span className="flex items-center gap-2"><Icon name="star" type="solid" className="text-brand-gold" size="size-3" /> {podcast.rating}</span>
                            <span className="flex items-center gap-2"><Icon name="users" size="size-3" /> {podcast.listeners} ouvintes</span>
                            <span className="flex items-center gap-2"><Icon name="list" size="size-3" /> {podcast.episodesCount} episódios</span>
                        </div>

                        <p className="text-zinc-400 font-serif leading-relaxed max-w-2xl text-base md:text-lg">
                            {podcast.description}
                        </p>

                        <div className="flex gap-4 pt-2">
                            <Button 
                                className={cn(
                                    "rounded-full px-8 h-12 font-bold transition-all",
                                    isFollowing ? "bg-transparent border border-white/20 text-white hover:bg-white/10" : "bg-white text-black hover:bg-zinc-200"
                                )}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? "Seguindo" : "Seguir"}
                            </Button>
                            <Button variant="ghost" className="rounded-full px-4 h-12 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/5">
                                <Icon name="bell" size="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- TABS & CONTENT --- */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-white/10 mb-8">
                        <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start w-full">
                            <TabsTrigger value="episodes" className="rounded-none border-b-2 border-transparent px-0 pb-4 text-sm font-bold text-zinc-500 hover:text-white data-[state=active]:border-primary data-[state=active]:text-white bg-transparent transition-all">
                                Episódios
                            </TabsTrigger>
                            <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent px-0 pb-4 text-sm font-bold text-zinc-500 hover:text-white data-[state=active]:border-primary data-[state=active]:text-white bg-transparent transition-all">
                                Sobre
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="episodes" className="space-y-6 animate-fade-in">
                        
                        {/* Filters Row */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Últimos Episódios</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 gap-2">
                                    <Icon name="filter" size="size-3" /> Filtrar
                                </Button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {episodes.map((ep) => (
                                <div key={ep.id} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-brand-gold/30 hover:bg-zinc-900/60 transition-all cursor-default relative overflow-hidden">
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                    {/* Meta & Date */}
                                    <div className="md:w-24 shrink-0 flex flex-col items-center md:items-start justify-center md:justify-start gap-2 pt-1">
                                        <span className="text-xs font-bold text-zinc-500 font-mono bg-white/5 px-2 py-1 rounded">{ep.date}</span>
                                        {ep.isNew && <Badge className="bg-brand-gold text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border-none">Novo</Badge>}
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 space-y-3 z-10">
                                        <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-tight">
                                            {ep.title}
                                        </h4>
                                        <p className="text-sm text-zinc-400 font-serif leading-relaxed line-clamp-2">
                                            {ep.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap items-center gap-4 pt-2">
                                            {/* Action: Play Summary */}
                                            {ep.hasSummary ? (
                                                <Button 
                                                    size="sm" 
                                                    className="h-9 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-xs gap-2 shadow-lg"
                                                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_PODCAST_READ)}
                                                >
                                                    <Icon name="play" type="solid" size="size-3" /> Resumo ({ep.summaryDuration})
                                                </Button>
                                            ) : (
                                                <Button size="sm" disabled className="h-9 rounded-full bg-zinc-800 text-zinc-500 font-bold text-xs gap-2 opacity-50">
                                                    <Icon name="clock" size="size-3" /> Resumindo...
                                                </Button>
                                            )}

                                            {/* Secondary: Listen Full */}
                                            <Button variant="ghost" size="sm" className="h-9 rounded-full text-zinc-400 hover:text-white text-xs gap-2 hover:bg-white/5">
                                                Episódio Completo ({ep.duration})
                                            </Button>
                                            
                                            {/* Action: Read Key Insights */}
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-9 rounded-full text-brand-gold hover:text-brand-gold/80 text-xs gap-2 ml-auto hover:bg-brand-gold/10"
                                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_PODCAST_READ)}
                                            >
                                                <Icon name="file-text" size="size-3" /> Ler Insights
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="about" className="animate-fade-in">
                        <Card className="bg-zinc-900/40 border-white/5">
                            <CardContent className="p-8">
                                <p className="text-zinc-400 font-serif leading-relaxed">
                                    Sobre o Podcast: {podcast.description}
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

            </main>
        </div>
    );
};

export default LmsPodcastDetailTemplate;
