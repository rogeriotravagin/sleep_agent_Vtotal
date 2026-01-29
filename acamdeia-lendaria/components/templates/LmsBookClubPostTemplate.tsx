
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface LmsBookClubPostTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsBookClubPostTemplate: React.FC<LmsBookClubPostTemplateProps> = ({ onNavigate }) => {
    const [isLiked, setIsLiked] = useState(false);
    
    const post = {
        title: "A Morte da Intuição Reativa",
        subtitle: "Como o 'Skin in the Game' de Taleb mudou minha tomada de decisão em projetos de IA.",
        category: "RISCO & GESTÃO",
        author: { 
            name: "Alan Nicolas", 
            role: "Founder & Architect", 
            avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj" 
        },
        date: "24 OUT 2025",
        readTime: "12 min",
        views: "1.2k",
        likes: 242,
        cover: "https://images.unsplash.com/photo-1555449372-525d0c754d9b?q=80&w=2574&auto=format&fit=crop"
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans animate-fade-in pb-40 overflow-x-hidden selection:bg-primary/20">
            
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

            {/* Smart Header HUD */}
            <header className="sticky top-0 z-50 bg-[#050505]/40 backdrop-blur-3xl border-b border-white/5 h-20">
                <div className="container max-w-5xl mx-auto px-8 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-500 hover:text-white gap-4 pl-0 font-black uppercase tracking-[0.4em] text-[9px]"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_CLUB)}
                    >
                        <Icon name="arrow-left" size="size-3" /> Voltar ao Feed
                    </Button>
                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-6 mr-2">
                             <Symbol name="star" className="text-primary" /> Insight Destacado
                         </div>
                         <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                            <Icon name="bookmark" />
                         </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-8 pt-24 relative z-10 space-y-20">
                
                {/* --- POST HEADER: EDITORIAL STYLE --- */}
                <header className="space-y-12 text-center md:text-left">
                    <div className="space-y-6">
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.8em] text-[10px] font-black px-10 py-3 rounded-full mx-auto md:mx-0">
                            {post.category}
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                            A Morte da <br/>
                            <span className="text-zinc-700 italic font-serif font-light tracking-normal">Intuição Reativa.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-serif font-light italic text-zinc-400 leading-snug opacity-80 border-l-2 border-primary/20 pl-8 md:max-w-2xl">
                            "{post.subtitle}"
                        </p>
                    </div>

                    {/* Author & Meta HUD */}
                    <div className="flex flex-col md:flex-row items-center justify-between py-10 border-y border-white/5 gap-8">
                        <div className="flex items-center gap-6">
                            <Avatar className="w-16 h-16 border-2 border-primary shadow-xl">
                                <AvatarImage src={post.author.avatar} className="grayscale hover:grayscale-0 transition-all duration-700" />
                                <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Escrito por</p>
                                <p className="text-xl font-bold text-white tracking-tight">{post.author.name}</p>
                                <p className="text-[10px] text-zinc-600 font-mono">{post.author.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            <div className="flex flex-col items-center">
                                <span>Publicado</span>
                                <span className="text-zinc-400 mt-1 font-mono">{post.date}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span>Leitura</span>
                                <span className="text-zinc-400 mt-1 font-mono">{post.readTime}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span>Visualizações</span>
                                <span className="text-zinc-400 mt-1 font-mono">{post.views}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- MAIN CONTENT: SCIENTIFIC TYPOGRAPHY --- */}
                <article 
                    className="prose dark:prose-invert max-w-none font-serif text-xl md:text-2xl leading-[1.7] text-zinc-300 space-y-12
                    prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-white
                    prose-strong:text-white prose-strong:font-bold
                    prose-blockquote:border-l-primary prose-blockquote:bg-white/[0.02] prose-blockquote:p-12 prose-blockquote:rounded-r-[3rem] prose-blockquote:italic prose-blockquote:text-3xl prose-blockquote:font-light"
                >
                    <p className="first-letter:text-9xl first-letter:font-black first-letter:text-primary first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-4 first-letter:font-sans">
                        A verdade desconfortável que Nassim Taleb nos impõe é que a maioria das estruturas corporativas modernas são desenhadas para remover a responsabilidade individual. O gestor que não "sangra" com o erro, não merece o bônus do acerto.
                    </p>

                    <p>
                        Em 2026, com a onipresença da IA, esse conceito torna-se vital. Se você delega sua estratégia para um modelo de linguagem sem ter a <strong>"pele em jogo"</strong>, você não está escalando; você está apenas automatizando sua própria obsolescência.
                    </p>

                    {/* High-Res Media Breakdown */}
                    <figure className="my-24 space-y-6">
                        <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                            <img src={post.cover} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center pl-2 group-hover:scale-110 transition-transform">
                                    <Icon name="play" type="solid" className="text-white text-3xl" />
                                </div>
                            </div>
                        </div>
                        <figcaption className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 text-center italic">
                            FIG 1.0 — A FRONTEIRA DA ASSIMETRIA POSITIVA.
                        </figcaption>
                    </figure>

                    <h3>A Regra de Ouro do Arquiteto</h3>
                    <p>
                        A IA deve ser usada para processar o volume, mas o <strong>filtro de relevância</strong> deve ser humano. Se o custo do erro de um agente autônomo não recai sobre você, o incentivo para a qualidade desaparece.
                    </p>

                    <blockquote>
                        "O oposto da fragilidade não é a robustez. É a antifragilidade: a capacidade de se tornar melhor através do estresse."
                    </blockquote>

                    <p>
                        Lendários constroem sistemas que aprendem com o erro. Eles não temem o caos; eles o domesticam.
                    </p>
                </article>

                {/* --- ENGAGEMENT FOOTER --- */}
                <footer className="pt-24 space-y-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
                        <div className="flex gap-4">
                            <Button 
                                onClick={() => setIsLiked(!isLiked)}
                                className={cn(
                                    "h-16 px-12 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500",
                                    isLiked ? "bg-red-500 text-white shadow-glow-red" : "bg-white/[0.03] border border-white/10 text-white hover:bg-white/10"
                                )}
                            >
                                <Icon name="heart" type={isLiked ? "solid" : "regular"} className="mr-3" /> {isLiked ? 'Reverenciado' : 'Reverenciar'}
                            </Button>
                            <Button variant="outline" className="h-16 w-16 rounded-[2rem] border-white/10 text-zinc-500 hover:text-white">
                                <Icon name="share" size="size-5" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {["#Antifragilidade", "#Sistemas", "#IA"].map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-white/5 text-zinc-500 border-none hover:text-primary transition-colors text-[10px] font-bold px-4 py-1.5 rounded-full">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Discussions Luxury Style */}
                    <section className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Sala de Reflexão (12)</h3>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Apenas mentes verificadas</span>
                        </div>

                        <div className="space-y-8">
                            {/* Input Card */}
                            <div className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 flex gap-6">
                                <Avatar className="w-12 h-12 border border-white/10 shrink-0">
                                    <AvatarFallback className="bg-zinc-900 text-zinc-500 font-bold">EU</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-4">
                                    <Textarea 
                                        placeholder="Contribua com a clareza..." 
                                        className="bg-transparent border-none focus:ring-0 text-lg font-serif italic p-0 resize-none min-h-[80px]"
                                    />
                                    <div className="flex justify-end">
                                        <Button className="rounded-full bg-foreground text-background font-black uppercase text-[10px] px-8 h-10 tracking-widest">Publicar</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Item */}
                            <div className="space-y-6">
                                <div className="flex gap-6 group">
                                    <Avatar className="w-12 h-12 border border-white/5 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                                        <AvatarFallback>SL</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-zinc-200">Sarah Lima</span>
                                            <span className="text-[10px] font-mono text-zinc-600 tracking-widest">2H ATRÁS</span>
                                        </div>
                                        <p className="text-lg text-zinc-400 font-serif leading-relaxed italic">
                                            "Isso muda tudo no recrutamento de novos gestores de tráfego. Paramos de olhar apenas para o ROI e começamos a olhar para o 'Downside Protection' de cada conta."
                                        </p>
                                        <div className="flex gap-6 text-[10px] font-black text-zinc-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="hover:text-primary transition-colors">Apoiar</button>
                                            <button className="hover:text-white transition-colors">Responder</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </footer>
            </main>

            {/* Background Minimal Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[60]"></div>
        </div>
    );
};

export default LmsBookClubPostTemplate;
