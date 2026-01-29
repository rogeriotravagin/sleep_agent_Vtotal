
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Spotlight } from '../ui/spotlight';

interface LmsCourseGridTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsCourseGridTemplate: React.FC<LmsCourseGridTemplateProps> = ({ onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    
    const categories = [
        { name: "Agentes IA", icon: "brain", color: "#32ADE6" },
        { name: "Mentalidade", icon: "bolt", color: "#C9B298" },
        { name: "Desenvolvimento", icon: "code-simple", color: "#5856D6" },
        { name: "Automação", icon: "refresh", color: "#FF9500" },
        { name: "Negócios", icon: "briefcase", color: "#AF52DE" },
        { name: "Design", icon: "palette", color: "#5AC8FA" },
        { name: "IA Básico", icon: "microchip", color: "#34C759" }
    ];

    const courses = [
        // --- CATEGORIA: AGENTES IA ---
        { 
            id: 1, 
            title: "Claude Code Expert", 
            subtitle: "Última aula: Automatizando PRDs com IA",
            author: "José Carlos Amorim", 
            category: "Agentes IA", 
            accent: "from-cyan-500/20 to-blue-600/5",
            tag: "65%",
            progress: 65,
            icon: "terminal"
        },
        { 
            id: 5, 
            title: "Mentes Sintéticas v4", 
            subtitle: "Treinamento avançado de clones de voz",
            author: "Alan Nicolas", 
            category: "Agentes IA", 
            accent: "from-brand-gold/20 to-yellow-600/5",
            tag: "NOVO",
            progress: 0,
            icon: "microphone"
        },
        { 
            id: 10, 
            title: "Arquitetura de Agentes", 
            subtitle: "Construindo exércitos digitais",
            author: "Alan Nicolas", 
            category: "Agentes IA", 
            accent: "from-blue-500/20 to-indigo-600/5",
            tag: "HOT",
            progress: 0,
            icon: "network-cloud"
        },

        // --- CATEGORIA: MENTALIDADE ---
        { 
            id: 2, 
            title: "Sistema Nexialista", 
            subtitle: "Última aula: O Poder dos Primeiros Princípios",
            author: "Alan Nicolas", 
            category: "Mentalidade", 
            accent: "from-brand-gold/20 to-orange-900/5",
            tag: "12%",
            progress: 12,
            icon: "brain"
        },
        { 
            id: 6, 
            title: "Deep Work Protocol", 
            subtitle: "Foco extremo em um mundo de ruído",
            author: "Alan Nicolas", 
            category: "Mentalidade", 
            accent: "from-zinc-500/20 to-black/5",
            tag: "95%",
            progress: 95,
            icon: "clock"
        },
        { 
            id: 11, 
            title: "Antifragilidade nos Negócios", 
            subtitle: "Lucrando com o caos do mercado",
            author: "Alan Nicolas", 
            category: "Mentalidade", 
            accent: "from-red-500/20 to-black/5",
            tag: "VIP",
            progress: 0,
            icon: "shield-check"
        },

        // --- CATEGORIA: DESENVOLVIMENTO ---
        { 
            id: 3, 
            title: "LangChain Engine", 
            subtitle: "IA Conversacional de Alta Performance",
            author: "Alan Nicolas", 
            category: "Desenvolvimento", 
            accent: "from-purple-500/20 to-indigo-600/5",
            tag: "MASTER",
            progress: 0,
            icon: "code-simple"
        },
        { 
            id: 4, 
            title: "VibeCoding Master", 
            subtitle: "A arte de programar sem digitar código",
            author: "José Carlos Amorim", 
            category: "Desenvolvimento", 
            accent: "from-blue-400/20 to-cyan-600/5",
            tag: "NOVO",
            progress: 0,
            icon: "magic-wand"
        },
        { 
            id: 12, 
            title: "Supabase & IA", 
            subtitle: "Backend escalável para apps inteligentes",
            author: "José Carlos Amorim", 
            category: "Desenvolvimento", 
            accent: "from-emerald-500/20 to-teal-600/5",
            tag: "TECH",
            progress: 0,
            icon: "database"
        },

        // --- CATEGORIA: AUTOMAÇÃO ---
        { 
            id: 7, 
            title: "Automação N8N Elite", 
            subtitle: "Crie funcionários digitais 24/7",
            author: "José Carlos Amorim", 
            category: "Automação", 
            accent: "from-orange-500/20 to-red-600/5",
            tag: "PRO",
            progress: 0,
            icon: "refresh"
        },
        { 
            id: 13, 
            title: "Make.com Advanced", 
            subtitle: "Integrações complexas sem código",
            author: "José Carlos Amorim", 
            category: "Automação", 
            accent: "from-blue-600/20 to-purple-600/5",
            tag: "MASTER",
            progress: 0,
            icon: "settings"
        },

        // --- CATEGORIA: NEGÓCIOS ---
        { 
            id: 8, 
            title: "SaaS Blueprint IA", 
            subtitle: "Escalando microsserviços com IA",
            author: "Alan Nicolas", 
            category: "Negócios", 
            accent: "from-emerald-500/20 to-teal-600/5",
            tag: "VIP",
            progress: 0,
            icon: "rocket"
        },
        { 
            id: 14, 
            title: "Copywriting Científico", 
            subtitle: "A arte de vender com dados e IA",
            author: "Alan Nicolas", 
            category: "Negócios", 
            accent: "from-brand-gold/20 to-yellow-900/5",
            tag: "ROI",
            progress: 0,
            icon: "megaphone"
        }
    ];

    const continueWatching = courses.filter(c => c.progress > 0 && c.progress < 100);

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans animate-fade-in pb-40 selection:bg-primary/30 overflow-x-hidden">
            
            {/* --- TOP HUD NAVIGATION --- */}
            <header className="sticky top-0 z-50 bg-[#020202]/40 backdrop-blur-3xl border-b border-white/[0.03] h-20">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
                            <Symbol name="infinity" className="text-white text-3xl transition-all duration-700 group-hover:rotate-180 group-hover:text-primary" />
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-[11px] uppercase tracking-[0.4em]">Academia</span>
                                <span className="font-bold text-[9px] uppercase tracking-[0.6em] text-primary">Lendária[IA]</span>
                            </div>
                        </div>
                        <nav className="hidden lg:flex items-center gap-10">
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-primary pb-1">Explorar</button>
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors">Trilhas</button>
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors">Favoritos</button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group hidden md:block">
                            <Icon name="search" className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors" size="size-3" />
                            <Input 
                                placeholder="BUSCAR CONTEÚDO..." 
                                className="pl-8 h-10 w-48 bg-transparent border-none text-[9px] uppercase font-black tracking-widest focus:ring-0 rounded-none border-b border-white/[0.05] focus:border-primary/40 transition-all" 
                            />
                        </div>
                        <Avatar className="h-10 w-10 border border-white/10 p-0.5 bg-zinc-900 shadow-2xl">
                            <AvatarFallback className="bg-zinc-800 text-[10px] font-black">AN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-6 pt-12 space-y-32">
                
                {/* --- FILTROS HUD --- */}
                <section className="space-y-6">
                    <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
                        <button
                            onClick={() => setActiveCategory("Todos")}
                            className={cn(
                                "px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500 border whitespace-nowrap",
                                activeCategory === "Todos"
                                    ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105"
                                    : "bg-white/[0.02] text-zinc-600 border-white/[0.05] hover:border-white/20 hover:text-zinc-400"
                            )}
                        >
                            Todos
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500 border whitespace-nowrap flex items-center gap-3",
                                    activeCategory === cat.name
                                        ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105"
                                        : "bg-white/[0.02] text-zinc-600 border-white/[0.05] hover:border-white/20 hover:text-zinc-400"
                                )}
                            >
                                <Icon name={cat.icon} size="size-3" className={activeCategory === cat.name ? "text-black" : "text-zinc-700"} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* --- SECTION: CONTINUAR ASSISTINDO --- */}
                {continueWatching.length > 0 && activeCategory === "Todos" && (
                    <section className="space-y-12">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-700">Continuar Assistindo</h2>
                            <div className="h-px flex-1 bg-white/[0.05]"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {continueWatching.map((course) => (
                                <div 
                                    key={course.id}
                                    className="group relative rounded-3xl border border-white/[0.05] bg-[#080808] p-8 flex items-center gap-8 cursor-pointer transition-all duration-500 hover:border-white/20 hover:bg-white/[0.02]"
                                    onClick={() => onNavigate?.(Section.TEMPLATE_LMS_STUDENT)}
                                >
                                    <div className={cn(
                                        "w-24 h-24 rounded-2xl flex items-center justify-center border border-white/[0.05] bg-gradient-to-br shrink-0 transition-transform duration-500 group-hover:scale-105",
                                        course.accent
                                    )}>
                                        <Icon name={course.icon} size="size-8" className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex-1 space-y-4 min-w-0">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white truncate">{course.title}</h3>
                                            <p className="text-xs text-zinc-500 font-serif italic truncate mt-1">{course.subtitle}</p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                                <span className="text-zinc-600">Progresso</span>
                                                <span className="text-zinc-400">{course.tag}</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary shadow-[0_0_10px_rgba(201,178,152,0.4)] transition-all duration-1000" 
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                        <Icon name="play" type="solid" className="text-primary" size="size-5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- ACERVO DINÂMICO (POR CATEGORIA) --- */}
                {categories.map((cat) => {
                    const categoryCourses = courses.filter(c => c.category === cat.name);
                    if (categoryCourses.length === 0) return null;
                    if (activeCategory !== "Todos" && activeCategory !== cat.name) return null;

                    return (
                        <section key={cat.name} className="space-y-12">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-700">{cat.name}</h2>
                                <div className="h-px flex-1 bg-white/[0.05]"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {categoryCourses.map((course) => (
                                    <Spotlight 
                                        key={course.id}
                                        className="rounded-luxury border border-white/[0.05] bg-[#080808] overflow-hidden group cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
                                        onClick={() => onNavigate?.(Section.TEMPLATE_LMS_DETAIL)}
                                        color="rgba(201, 178, 152, 0.1)"
                                    >
                                        <div className={cn("aspect-[16/10] relative overflow-hidden bg-gradient-to-br border-b border-white/[0.03]", course.accent)}>
                                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                                                <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
                                            </div>
                                            
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-125">
                                                <Symbol name="infinity" className="text-[12rem] text-white" />
                                            </div>

                                            <div className="absolute top-6 right-6">
                                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[8px] font-black tracking-widest text-primary">
                                                    {course.tag.includes('%') ? 'EM CURSO' : course.tag}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-5">
                                            <div className="space-y-1.5">
                                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] opacity-80 group-hover:opacity-100 transition-opacity">{course.category}</p>
                                                <h3 className="text-2xl font-bold leading-[1.1] tracking-tighter text-white group-hover:text-primary transition-colors">{course.title}</h3>
                                                <p className="text-xs text-zinc-500 font-serif italic mt-2 line-clamp-1">{course.subtitle}</p>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-5 border-t border-white/[0.03]">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-6 w-6 border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                                                        <AvatarFallback className="text-[8px] bg-zinc-900">AN</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{course.author}</span>
                                                </div>
                                                <div className="text-zinc-800 group-hover:text-primary transition-colors">
                                                    <Icon name="arrow-right" size="size-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Spotlight>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* --- FOOTER: MANIFESTO --- */}
                <footer className="pt-20 pb-40 text-center space-y-10">
                    <div className="w-px h-24 bg-gradient-to-b from-primary/50 to-transparent mx-auto"></div>
                    <h3 className="text-4xl md:text-6xl font-light font-serif italic text-zinc-600 leading-tight">
                        Construindo o <span className="text-white font-bold not-italic">Futuro</span>, <br/>
                        com a <span className="text-white font-bold not-italic">Elite</span>.
                    </h3>
                </footer>

            </main>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
        </div>
    );
};

export default LmsCourseGridTemplate;
