
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Spotlight } from '../ui/spotlight';

interface LmsBookClubTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsBookClubTemplate: React.FC<LmsBookClubTemplateProps> = ({ onNavigate }) => {
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const categories = ["Todos", "Sistemas", "Liderança", "IA Aplicada", "Filosofia", "Vendas"];

    const posts = [
        {
            id: 1,
            title: "Análise Técnica: Skin in the Game",
            author: "Pedro Alencar",
            category: "RISCO",
            excerpt: "Como a assimetria de risco define o sucesso de longo prazo em agências de IA.",
            image: "https://images.unsplash.com/photo-1555449372-525d0c754d9b?q=80&w=1000",
            meta: "15 min de leitura",
            likes: 128,
            comments: 42,
            accent: "from-brand-gold/20 to-transparent"
        },
        {
            id: 2,
            title: "O Guia Visual das 48 Leis do Poder",
            author: "Sarah Lima",
            category: "ESTRATÉGIA",
            excerpt: "Dissecando os gatilhos de autoridade em negociações complexas de 6 dígitos.",
            image: "https://images.unsplash.com/photo-1507842217121-ad58641040ab?q=80&w=1000",
            meta: "8 min de leitura",
            likes: 95,
            comments: 18,
            accent: "from-blue-500/10 to-transparent"
        },
        {
            id: 3,
            title: "Antifragilidade na Operação Enxuta",
            author: "Alan Nicolas",
            category: "SISTEMAS",
            excerpt: "Por que tentar prever o mercado é um erro e como se beneficiar do caos aleatório.",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000",
            meta: "12 min de leitura",
            likes: 240,
            comments: 89,
            accent: "from-purple-500/10 to-transparent"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in pb-40 relative selection:bg-primary/30 overflow-x-hidden">
            
            {/* Immersive Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]"></div>
            </div>

            {/* Header HUD */}
            <header className="sticky top-0 z-50 bg-[#020202]/40 backdrop-blur-3xl border-b border-white/5 h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
                            <Symbol name="infinity" className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-700" />
                            <span className="font-black text-[10px] uppercase tracking-[0.4em]">Clube do Livro</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" className="text-zinc-500 hover:text-white text-[9px] font-black uppercase tracking-[0.3em]">
                            Meus Artigos
                        </Button>
                        <Button className="bg-white text-black hover:bg-zinc-200 rounded-full h-10 px-8 text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                            Novo Insight
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-8 py-20 relative z-10 space-y-24">
                
                {/* Hero Manifesto */}
                <section className="max-w-4xl space-y-8">
                    <div className="space-y-4">
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.6em]">
                            INTELIGÊNCIA COLETIVA
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                            Onde ideias se tornam <br/>
                            <span className="text-zinc-600 italic font-serif font-light tracking-normal">legado.</span>
                        </h1>
                    </div>
                    <p className="text-2xl font-serif font-light italic text-zinc-400 leading-relaxed max-w-2xl opacity-80 border-l border-white/10 pl-10">
                        "Não lemos para acumular páginas, mas para reconstruir nossas defesas cognitivas."
                    </p>
                </section>

                {/* Categories Navigation */}
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-10 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 border whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-white text-black border-white shadow-glow scale-105"
                                    : "bg-white/[0.02] text-zinc-600 border-white/[0.05] hover:border-white/20 hover:text-zinc-300"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Feed Gallery */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post, i) => (
                        <Spotlight 
                            key={post.id} 
                            className="rounded-[2.5rem] bg-[#080808]/40 backdrop-blur-3xl border border-white/5 overflow-hidden group cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] hover:border-primary/20"
                            color="rgba(201, 178, 152, 0.08)"
                            onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_CLUB_POST)}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img src={post.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
                                <div className="absolute top-6 left-6">
                                    <Badge className="bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-widest text-primary">
                                        {post.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-10 space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-serif italic leading-relaxed line-clamp-2">
                                        "{post.excerpt}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
                                            <AvatarFallback className="text-[10px] font-bold bg-zinc-900">{post.author.split(' ')[0][0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase text-zinc-300 tracking-wider">{post.author}</span>
                                            <span className="text-[8px] font-mono text-zinc-600">{post.meta}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-zinc-700 group-hover:text-zinc-400 transition-colors">
                                        <div className="flex items-center gap-1.5">
                                            <Icon name="heart" size="size-3" />
                                            <span className="text-[10px] font-bold font-mono">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Icon name="comment" size="size-3" />
                                            <span className="text-[10px] font-bold font-mono">{post.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Spotlight>
                    ))}
                </section>

                {/* Footer Loading */}
                <div className="py-20 flex flex-col items-center gap-6">
                    <div className="w-px h-20 bg-gradient-to-b from-primary/30 to-transparent"></div>
                    <Button variant="ghost" className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 hover:text-white">
                        Explorar arquivos anteriores
                    </Button>
                </div>
            </main>

            {/* Global Grain Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[60]"></div>
        </div>
    );
};

export default LmsBookClubTemplate;
