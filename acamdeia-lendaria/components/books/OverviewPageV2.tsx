
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface OverviewPageV2Props {
    onNavigate?: (section: Section) => void;
}

const OverviewPageV2: React.FC<OverviewPageV2Props> = ({ onNavigate }) => {
    
    const bookData = {
        title: "Atomic Habits",
        subtitle: "Pequenas mudanças, resultados impressionantes.",
        author: "James Clear",
        category: "ENGENHARIA COMPORTAMENTAL",
        syncScore: 94,
        pages: 320,
        published: "2018",
        readingTime: "18 MIN",
        cover: "https://m.media-amazon.com/images/I/81Ykq87N65L._SY466_.jpg", 
        description: " James Clear revela um sistema prático de como o comportamento humano é moldado pelo ambiente e por sistemas, não pela força de vontade pura. Este não é um livro de autoajuda comum; é um manual técnico para hackear a própria biologia.",
        aboutAuthor: {
            name: "James Clear",
            avatar: "https://jamesclear.com/wp-content/uploads/2023/11/james-clear-headshot.png",
            bio: " James Clear é um autor focado em hábitos e melhoria contínua. Seu trabalho é baseado em biologia, psicologia e neurociência aplicada a sistemas de performance."
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in pb-32 overflow-x-hidden selection:bg-primary/30">
            
            {/* Immersive Atmospheric Backdrop */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[70vh] bg-cover bg-center opacity-10 blur-[120px] scale-125"
                    style={{ backgroundImage: `url(${bookData.cover})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03]"></div>
            </div>

            {/* Sticky Minimal Header */}
            <header className="sticky top-0 z-50 bg-transparent backdrop-blur-3xl border-b border-white/5 h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-500 hover:text-white gap-4 pl-0 font-black uppercase tracking-[0.4em] text-[9px]"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                    >
                        <Icon name="arrow-left" size="size-3" /> Biblioteca
                    </Button>
                    
                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-6 mr-2">
                             <Symbol name="infinity" className="text-primary" /> Lendária Core 2.0
                         </div>
                         <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                            <Icon name="share" />
                         </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* --- LEFT: THE ARTIFACT (Capa & Sync Score) --- */}
                    <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
                        
                        <div className="relative group perspective-1000">
                            {/* Ambient Glow */}
                            <div className="absolute inset-10 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            
                            {/* 3D Floating Cover with Glass Reflection */}
                            <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.7)] border border-white/10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-8 group-hover:rotate-y-6 group-hover:shadow-primary/20 cursor-pointer">
                                <img src={bookData.cover} alt={bookData.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                                
                                {/* Shimmer Effect Layer */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-2000 ease-in-out"></div>
                                
                                {/* Label Superior */}
                                <div className="absolute top-8 left-8">
                                    <Badge className="bg-black/60 backdrop-blur-md border border-white/10 text-white font-black text-[9px] px-5 py-2 rounded-full uppercase tracking-widest">
                                        Físico + Digital
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* SYNC SCORE - Dossier View */}
                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                             <div className="flex justify-between items-center">
                                 <div>
                                     <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary mb-1.5">Alinhamento</p>
                                     <h4 className="text-2xl font-bold tracking-tight">Sync Score</h4>
                                 </div>
                                 <div className="text-5xl font-black text-white font-mono">{bookData.syncScore}%</div>
                             </div>
                             
                             <div className="space-y-4">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]" style={{ width: `${bookData.syncScore}%` }} />
                                </div>
                                <p className="text-sm text-zinc-500 font-serif italic leading-relaxed">
                                    "Esta obra possui alta densidade de princípios aplicáveis ao seu momento de escala operacional."
                                </p>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                                 <div className="space-y-2">
                                     <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Complexidade</p>
                                     <div className="flex gap-1.5">
                                         {[1,2,3,4,5].map(i => <div key={i} className={cn("h-1 flex-1 rounded-full", i <= 3 ? "bg-primary" : "bg-white/5")} />)}
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Pragmatismo</p>
                                     <div className="flex gap-1.5">
                                         {[1,2,3,4,5].map(i => <div key={i} className={cn("h-1 flex-1 rounded-full", i <= 5 ? "bg-primary" : "bg-white/5")} />)}
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* --- RIGHT: NARRATIVE & METADATA --- */}
                    <div className="lg:col-span-7 space-y-24 pt-8">
                        
                        {/* Title Section */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-8 py-2 rounded-full uppercase tracking-[0.6em] text-[10px] font-black">
                                    {bookData.category}
                                </Badge>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                                    {bookData.title.split(' ')[0]} <br/>
                                    <span className="text-zinc-600 italic font-serif font-light tracking-normal">{bookData.title.split(' ').slice(1).join(' ')}</span>
                                </h1>
                            </div>
                            
                            <p className="text-3xl font-serif font-light italic text-zinc-400 leading-snug max-w-2xl border-l-2 border-primary/20 pl-8">
                                "{bookData.subtitle}"
                            </p>

                            <div className="flex gap-6 pt-6">
                                <Button 
                                    className="h-20 px-20 rounded-[2.5rem] bg-foreground text-background font-black text-xs uppercase tracking-[0.5em] shadow-2xl hover:scale-105 transition-all group overflow-hidden relative"
                                    onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_READ_V2)}
                                >
                                    <span className="relative z-10">Iniciar Leitura</span>
                                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                </Button>
                                <Button variant="outline" size="icon" className="h-20 w-20 rounded-[2.5rem] border-white/10 hover:bg-white/5 text-white">
                                    <Icon name="plus" size="size-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Metadata Dossier Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-white/5">
                            {[
                                { l: "VOLUME", v: bookData.pages + " PGS" },
                                { l: "RETENÇÃO", v: bookData.readingTime },
                                { l: "PUBLICAÇÃO", v: bookData.published },
                                { l: "IDIOMA", v: "PT/EN" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-2 text-center md:text-left">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">{item.l}</p>
                                    <p className="text-xl font-black font-mono tracking-tighter text-white/90">{item.v}</p>
                                </div>
                            ))}
                        </div>

                        {/* Narrative Content - SCIENTIFIC RULES APPLIED */}
                        <div className="space-y-16">
                             <div className="max-w-[65ch] space-y-8">
                                <p className="text-2xl font-serif leading-[1.6] text-zinc-300 font-light first-letter:text-9xl first-letter:font-black first-letter:text-primary first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-3">
                                    {bookData.description}
                                </p>
                                <p className="text-2xl font-serif leading-[1.6] text-zinc-400">
                                    A metodologia de Clear baseia-se na ideia de que você não sobe ao nível de seus objetivos; você cai ao nível de seus sistemas. Este resumo destila o trivial e entrega apenas o vital.
                                </p>
                             </div>
                             
                             {/* Technical Callout Insight */}
                             <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] relative overflow-hidden group">
                                 <Icon name="info" className="absolute -right-6 -top-6 text-[15rem] text-white opacity-[0.02] group-hover:scale-110 transition-transform duration-[2000ms]" />
                                 <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8">O que o Mentor diz:</h5>
                                 <p className="text-2xl font-serif text-zinc-400 italic leading-relaxed">
                                     "Diferente de outros livros de autoajuda, Clear foca em arquitetura de escolha. Se você está cansado de depender da motivação (recurso finito), este é o seu manual de engenharia comportamental."
                                 </p>
                             </div>
                        </div>

                        {/* AUTHOR SECTION (SYNTHETIC MIND STYLE) */}
                        <section className="space-y-12 pt-16">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">A Mente Autora</h3>
                            
                            <div className="group bg-gradient-to-br from-zinc-900/40 to-black border border-white/5 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-[18rem] text-primary group-hover:scale-110 transition-transform duration-[3000ms]">
                                    <Icon name="brain" />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
                                    <div className="shrink-0">
                                        <Avatar className="w-36 h-36 border-4 border-[#0a0a0a] shadow-2xl ring-2 ring-primary/20">
                                            <AvatarImage src={bookData.aboutAuthor.avatar} className="grayscale hover:grayscale-0 transition-all duration-1000" />
                                            <AvatarFallback>JC</AvatarFallback>
                                        </Avatar>
                                        <Badge className="w-full mt-6 bg-primary text-black font-black text-[9px] uppercase tracking-widest py-2 justify-center border-none">Verified Mind</Badge>
                                    </div>
                                    
                                    <div className="flex-1 space-y-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                            <div>
                                                <h4 className="text-4xl font-bold tracking-tighter text-white">{bookData.aboutAuthor.name}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mt-2">The Habit Architect</p>
                                            </div>
                                            <Button 
                                                className="rounded-full bg-white text-black hover:bg-zinc-200 font-black uppercase text-[9px] tracking-[0.4em] h-14 px-10 shadow-xl"
                                            >
                                                Consultar IA do Autor
                                            </Button>
                                        </div>

                                        <p className="text-xl font-serif text-zinc-400 leading-relaxed italic opacity-80">
                                            {bookData.aboutAuthor.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Global Minimal Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
        </div>
    );
};

export default OverviewPageV2;
