
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Symbol } from '../ui/symbol';
import { useToast } from '../../hooks/use-toast';

interface LmsPodcastReadTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsPodcastReadTemplate: React.FC<LmsPodcastReadTemplateProps> = ({ onNavigate }) => {
    const { toast } = useToast();
    
    // --- State ---
    const [fontSize, setFontSize] = useState(21); 
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);
    const [selectionMenu, setSelectionMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
    const [isPlaying, setIsPlaying] = useState(false);

    // Mock Podcast Data
    const podcast = {
        title: "Como a Linear constrói produtos",
        guest: "Karri Saarinen",
        host: "Lenny Rachitsky",
        duration: "1h 12m",
        category: "PRODUTO & DESIGN",
        summaryDate: "24 Out 2025"
    };

    const keyMoments = [
        { id: 1, time: "04:20", title: "A Cultura de Design First", active: true },
        { id: 2, time: "12:15", title: "Por que não usamos PMs", active: false },
        { id: 3, time: "28:40", title: "O conceito de 'Quality Bar'", active: false },
        { id: 4, time: "45:10", title: "Como contratar designers", active: false },
        { id: 5, title: "Insights Finais", active: false },
    ];

    const mentionedTools = [
        { name: "Linear", icon: "rocket" },
        { name: "Figma", icon: "palette" },
        { name: "Notion", icon: "file-text" },
    ];

    // --- Selection Logic ---
    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            setSelectionMenu({
                x: rect.left + rect.width / 2,
                y: rect.top + window.scrollY - 10,
                visible: true
            });
        } else {
            setSelectionMenu(prev => ({ ...prev, visible: false }));
        }
    };

    const handleAction = (action: string) => {
        toast({
            title: action,
            description: "Salvo nas suas notas.",
            variant: "default"
        });
        setSelectionMenu(prev => ({ ...prev, visible: false }));
        window.getSelection()?.removeAllRanges();
    };

    useEffect(() => {
        let timer: any;
        const handleScroll = (e: any) => {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(progress);
            
            setIsScrolling(true);
            setSelectionMenu(prev => ({ ...prev, visible: false }));
            clearTimeout(timer);
            timer = setTimeout(() => setIsScrolling(false), 1500);
        };

        const scrollContainer = document.getElementById('podcast-reader-area');
        scrollContainer?.addEventListener('scroll', handleScroll);
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden relative bg-[#050505] text-[#D1D1D1] selection:bg-brand-gold/20">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.05] mix-blend-screen z-0"></div>

            {/* Dynamic Progress Hairline */}
            <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[70]">
                <div 
                    className="h-full bg-brand-gold shadow-[0_0_20px_rgba(201,178,152,0.8)] transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Selection Contextual Toolbar */}
            {selectionMenu.visible && (
                <div 
                    className="fixed z-[100] -translate-x-1/2 -translate-y-full mb-6 animate-scale-in"
                    style={{ left: selectionMenu.x, top: selectionMenu.y }}
                >
                    <div className="flex items-center backdrop-blur-2xl border border-white/10 bg-[#0A0A0A]/90 rounded-2xl p-1 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                        <button 
                            onClick={() => handleAction("Destaque")}
                            className="flex flex-col items-center gap-1.5 px-5 py-3 hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <Icon name="pencil" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity text-brand-gold" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Destacar</span>
                        </button>
                        <div className="w-px h-10 bg-white/10"></div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.getSelection()?.toString() || "");
                                handleAction("Copiado");
                            }}
                            className="flex flex-col items-center gap-1.5 px-5 py-3 hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <Icon name="copy" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Copiar</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Immersive Header HUD */}
            <header className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isScrolling ? "opacity-0 -translate-y-16 scale-95 pointer-events-none" : "opacity-100 translate-y-0 scale-100"
            )}>
                <div className="backdrop-blur-3xl border border-white/10 bg-[#0A0A0A]/90 rounded-full h-16 px-8 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-6">
                        <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_PODCAST_DETAIL)} className="opacity-60 hover:opacity-100 p-2 transition-all active:scale-90 text-white">
                            <Icon name="arrow-left" size="size-5" />
                        </button>
                        
                        {/* Mini Player */}
                        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
                             <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                             >
                                 <Icon name={isPlaying ? "pause" : "play"} type="solid" size="size-3" className={!isPlaying ? "ml-0.5" : ""} />
                             </button>
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-bold text-white leading-none mb-0.5">Ouvindo Agora</span>
                                 <span className="text-[10px] text-zinc-500 font-mono">12:30 / 1:12:00</span>
                             </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex bg-white/5 rounded-full p-1 items-center">
                            <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 active:scale-90 text-white">
                                <Icon name="minus" size="size-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-[10px] font-black opacity-40 text-white">{fontSize}</span>
                            <button onClick={() => setFontSize(Math.min(36, fontSize + 2))} className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 active:scale-90 text-white">
                                <Icon name="plus" size="size-3" />
                            </button>
                        </div>

                        <button 
                            onClick={() => setTocOpen(true)}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95 bg-zinc-900 text-white border border-white/5"
                        >
                            <Icon name="list" size="size-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Layout */}
            <div className="flex w-full h-full pt-20">
                
                {/* LEFT SIDEBAR: Key Moments (Desktop) */}
                <aside className="hidden lg:flex w-80 flex-col border-r border-white/5 bg-[#0A0A0A] p-6 overflow-y-auto custom-scrollbar z-20">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Icon name="clock" /> Momentos Chave
                    </h3>
                    <div className="space-y-1">
                        {keyMoments.map((moment) => (
                            <button 
                                key={moment.id}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl text-sm transition-all group border border-transparent",
                                    moment.active 
                                        ? "bg-brand-gold/10 text-brand-gold border-brand-gold/20" 
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {moment.time && <span className="block text-[10px] font-mono opacity-60 mb-1">{moment.time}</span>}
                                <span className="font-bold leading-tight block">{moment.title}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* CENTER: Reader Canvas */}
                <main 
                    id="podcast-reader-area" 
                    className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-6 sm:px-12 scroll-smooth"
                    onMouseUp={handleTextSelection}
                >
                    <div className="max-w-[65ch] mx-auto py-24 space-y-24">
                        
                        {/* Editorial Header */}
                        <div className="text-center space-y-8 animate-fade-in mb-24">
                            <Badge variant="outline" className="uppercase tracking-[0.8em] text-[10px] font-black px-8 py-2 rounded-full border-brand-gold/30 text-brand-gold bg-brand-gold/5 mx-auto">
                                Resumo Executivo
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                                {podcast.title}
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-zinc-400 font-serif italic text-lg">
                                <span>{podcast.guest}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                                <span>{podcast.host}</span>
                            </div>
                        </div>

                        {/* Article Body */}
                        <article 
                            className="font-serif leading-[1.7] text-zinc-300 transition-all duration-700"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            <p className="mb-12 first-letter:text-8xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:font-sans first-letter:text-brand-gold">
                                A Linear não é apenas uma ferramenta de gestão de projetos; é uma declaração filosófica sobre como software deve ser construído. Karri Saarinen defende que a velocidade e a qualidade não são opostos, mas sim complementares quando a cultura certa está instalada.
                            </p>

                            <h3 className="text-3xl font-bold font-sans tracking-tight text-white mt-24 mb-8 flex items-center gap-3">
                                <span className="text-brand-gold opacity-50">#1</span> Design First
                            </h3>
                            
                            <p className="mb-12">
                                Ao contrário da maioria das startups do Vale do Silício que priorizam "funcionalidade primeiro", a Linear coloca a experiência do usuário no centro. Eles acreditam que ferramentas internas não precisam ser feias ou lentas.
                            </p>

                            {/* Quote Insight */}
                            <div className="my-20 p-10 border-l-4 border-brand-gold bg-gradient-to-r from-brand-gold/10 to-transparent relative group">
                                 <Icon name="quote-right" className="absolute top-4 right-4 text-brand-gold/20 text-4xl" />
                                 <p className="text-2xl font-serif italic text-white leading-relaxed">
                                     "Não temos gerentes de produto (PMs) tradicionais. Nossos engenheiros e designers têm autonomia para decidir o que construir, porque eles usam o produto todos os dias."
                                 </p>
                                 <cite className="block mt-6 text-xs font-black uppercase tracking-[0.2em] text-brand-gold not-italic">
                                     — Karri Saarinen
                                 </cite>
                            </div>

                            <p className="mb-12">
                                Essa abordagem elimina a camada de "tradução" que geralmente existe entre a especificação do produto e a implementação. Quando o criador é também o usuário, o ciclo de feedback é instantâneo.
                            </p>

                            <h3 className="text-3xl font-bold font-sans tracking-tight text-white mt-24 mb-8 flex items-center gap-3">
                                <span className="text-brand-gold opacity-50">#2</span> Quality Bar
                            </h3>

                            <p className="mb-12">
                                O conceito de "Quality Bar" (Barra de Qualidade) na Linear é inegociável. Eles preferem atrasar uma feature do que lançá-la com bugs visuais ou de performance. Isso cria uma confiança profunda na base de usuários.
                            </p>

                            {/* Takeaway Box */}
                            <div className="my-24 p-8 rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl pointer-events-none text-white">
                                    <Icon name="check-circle" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h4 className="text-lg font-bold font-sans uppercase tracking-widest text-white flex items-center gap-2">
                                        <Icon name="lightbulb" className="text-yellow-500" /> Insight Acionável
                                    </h4>
                                    <ul className="space-y-4">
                                        {[
                                            "Revise seu processo de QA: O design visual é tratado como bug de primeira classe?",
                                            "Dê autonomia: Seus engenheiros entendem o 'porquê' ou apenas o 'como'?",
                                            "Dogfooding: Sua equipe usa o que constrói?"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start text-base text-zinc-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* Footer */}
                        <footer className="pt-32 pb-24 border-t border-white/10 text-center space-y-12">
                            <h4 className="text-3xl font-bold text-white tracking-tight">Pronto para o próximo nível?</h4>
                            <div className="flex justify-center gap-6">
                                <Button className="h-14 px-10 rounded-full bg-brand-gold text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                    Ouvir Episódio Completo
                                </Button>
                                <Button variant="outline" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/10 uppercase tracking-wider font-bold">
                                    Baixar PDF
                                </Button>
                            </div>
                        </footer>
                    </div>
                </main>

                {/* RIGHT SIDEBAR: Mentions & Tools (Desktop) */}
                <aside className="hidden xl:flex w-80 flex-col border-l border-white/5 bg-[#0A0A0A] p-6 overflow-y-auto custom-scrollbar z-20">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Icon name="layers" /> Mencionado
                    </h3>
                    
                    <div className="space-y-4">
                        {mentionedTools.map((tool, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white">
                                        <Icon name={tool.icon} size="size-4" />
                                    </div>
                                    <span className="text-sm font-bold text-zinc-200">{tool.name}</span>
                                </div>
                                <Icon name="external-link" size="size-3" className="text-zinc-600 group-hover:text-brand-gold" />
                            </div>
                        ))}
                    </div>

                    <Separator className="bg-white/5 my-8" />

                    <div className="bg-gradient-to-br from-brand-gold/10 to-transparent p-6 rounded-2xl border border-brand-gold/20 text-center space-y-4">
                        <div className="w-12 h-12 mx-auto bg-brand-gold text-black rounded-full flex items-center justify-center font-bold text-xl">
                            AI
                        </div>
                        <p className="text-sm text-brand-gold font-serif italic">
                            "Quer um resumo personalizado focado em engenharia?"
                        </p>
                        <Button size="sm" className="w-full bg-brand-gold text-black hover:bg-white font-bold text-xs">
                            Gerar com IA
                        </Button>
                    </div>
                </aside>

            </div>

            {/* Mobile TOC Drawer */}
            <div className={cn(
                "fixed inset-0 z-[120] transition-all duration-500 lg:hidden",
                tocOpen ? "visible" : "invisible"
            )}>
                <div 
                    className={cn("absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500", tocOpen ? "opacity-100" : "opacity-0")}
                    onClick={() => setTocOpen(false)}
                />
                <div className={cn(
                    "absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#121212] border-l border-white/10 p-6 transition-transform duration-500",
                    tocOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Navegação</span>
                        <button onClick={() => setTocOpen(false)} className="text-zinc-500 hover:text-white"><Icon name="cross" /></button>
                    </div>
                    <div className="space-y-2">
                        {keyMoments.map((moment) => (
                            <button 
                                key={moment.id}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl text-sm transition-all border border-transparent",
                                    moment.active 
                                        ? "bg-brand-gold/10 text-brand-gold border-brand-gold/20" 
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                                onClick={() => setTocOpen(false)}
                            >
                                <span className="font-bold block">{moment.title}</span>
                                {moment.time && <span className="text-xs opacity-60 font-mono mt-1 block">{moment.time}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LmsPodcastReadTemplate;
