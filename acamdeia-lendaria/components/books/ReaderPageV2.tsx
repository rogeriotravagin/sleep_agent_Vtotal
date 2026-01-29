
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

interface ReaderPageV2Props {
    onNavigate?: (section: Section) => void;
    setSidebarCollapsed?: (collapsed: boolean) => void;
}

const ReaderPageV2: React.FC<ReaderPageV2Props> = ({ onNavigate, setSidebarCollapsed }) => {
    const { toast } = useToast();
    const articleRef = useRef<HTMLDivElement>(null);
    
    // --- State ---
    const [fontSize, setFontSize] = useState(21); // Início recomendado
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);
    const [selectionMenu, setSelectionMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
    const [readingMode, setReadingMode] = useState<'paper' | 'night' | 'sepia'>('paper');

    const book = {
        title: "O Rei e o Conselheiro",
        author: "Mente Lendária",
        category: "LIDERANÇA ANCESTRAL",
        chapter: "2",
        chapterTitle: "O Preço da Coroa e a Máscara da Aprovação"
    };

    const chapters = [
        { id: 1, title: "O Trono Vazio", completed: true },
        { id: 2, title: "O Preço da Coroa", active: true },
        { id: 3, title: "O Sussurro da Sombra", completed: false },
        { id: 4, title: "O Despertar do Rei", completed: false },
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
            description: "Sincronizado com seu arquivo mental.",
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

        const scrollContainer = document.getElementById('reader-v2-scroll-area');
        scrollContainer?.addEventListener('scroll', handleScroll);
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, []);

    // --- LUXURY THEME MAPPING - SCIENTIFIC CONTRAST ---
    const themeStyles = {
        paper: {
            container: "bg-[#FDFCFB] text-[#1A1A1A] selection:bg-[#C9B298]/30", // Vellum Italian
            texture: "opacity-[0.03] mix-blend-multiply",
            hud: "bg-white/80 border-black/5 text-black",
            accent: "text-[#C9B298]",
            dimmed: "text-black/40",
            aside: "bg-zinc-900 text-white",
            button: "bg-black text-white hover:bg-zinc-800"
        },
        night: {
            container: "bg-[#050505] text-[#D1D1D1] selection:bg-brand-gold/20", // Soft silver for OLED
            texture: "opacity-[0.05] mix-blend-screen",
            hud: "bg-[#0A0A0A]/90 border-white/10 text-white",
            accent: "text-brand-gold",
            dimmed: "text-white/30",
            aside: "bg-zinc-900 border-white/5 text-white",
            button: "bg-white text-black hover:bg-zinc-200"
        },
        sepia: {
            container: "bg-[#F5F2E9] text-[#3E2C1C] selection:bg-[#AC8E68]/40", // Vellum Premium
            texture: "opacity-[0.06] mix-blend-multiply",
            hud: "bg-[#E8E2D2]/90 border-[#3E2C1C]/10 text-[#3E2C1C]",
            accent: "text-[#8D7556]",
            dimmed: "text-[#3E2C1C]/40",
            aside: "bg-[#3E2C1C] text-[#F5F2E9]",
            button: "bg-[#3E2C1C] text-[#F5F2E9] hover:opacity-90"
        }
    };

    const currentTheme = themeStyles[readingMode];

    return (
        <div className={cn("flex h-screen overflow-hidden relative transition-colors duration-1000 ease-in-out", currentTheme.container)}>
            
            {/* Background Texture Overlay (Premium Grain) */}
            <div className={cn("absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0 transition-opacity duration-1000", currentTheme.texture)}></div>

            {/* Dynamic Progress Hairline */}
            <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/5 dark:bg-white/5 z-[70]">
                <div 
                    className="h-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)] transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Selection Contextual Toolbar */}
            {selectionMenu.visible && (
                <div 
                    className="fixed z-[100] -translate-x-1/2 -translate-y-full mb-6 animate-scale-in"
                    style={{ left: selectionMenu.x, top: selectionMenu.y }}
                >
                    <div className={cn("flex items-center backdrop-blur-2xl border rounded-2xl p-1 shadow-[0_30px_60px_rgba(0,0,0,0.4)]", currentTheme.hud)}>
                        <button 
                            onClick={() => handleAction("Destaque")}
                            className="flex flex-col items-center gap-1.5 px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <Icon name="pencil" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Destacar</span>
                        </button>
                        <div className="w-px h-10 bg-current opacity-10"></div>
                        <button 
                            onClick={() => handleAction("Nota")}
                            className="flex flex-col items-center gap-1.5 px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <Icon name="plus" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Anotar</span>
                        </button>
                        <div className="w-px h-10 bg-current opacity-10"></div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.getSelection()?.toString() || "");
                                handleAction("Copiado");
                            }}
                            className="flex flex-col items-center gap-1.5 px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all group"
                        >
                            <Icon name="copy" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Copiar</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Immersive Header HUD */}
            <header className={cn(
                "fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isScrolling ? "opacity-0 -translate-y-16 scale-95 pointer-events-none" : "opacity-100 translate-y-0 scale-100"
            )}>
                <div className={cn("backdrop-blur-3xl border rounded-full h-20 px-10 flex items-center justify-between shadow-2xl transition-colors duration-1000", currentTheme.hud)}>
                    <div className="flex items-center gap-8">
                        <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)} className="opacity-60 hover:opacity-100 p-2 transition-all active:scale-90">
                            <Icon name="arrow-left" size="size-5" />
                        </button>
                        <div className="hidden sm:block">
                            <p className={cn("text-[7px] font-black uppercase tracking-[0.6em] leading-none mb-1.5", currentTheme.accent)}>{book.title}</p>
                            <h2 className="text-xs font-bold tracking-tight opacity-60 uppercase">{book.chapterTitle}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Improved Mode Switcher */}
                        <div className="flex bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5">
                            {(['paper', 'night', 'sepia'] as const).map(m => (
                                <button 
                                    key={m}
                                    onClick={() => setReadingMode(m)}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all active:scale-90 flex items-center justify-center",
                                        readingMode === m ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-40 hover:opacity-100",
                                        m === 'paper' ? 'bg-[#FDFCFB]' : m === 'night' ? 'bg-[#050505]' : 'bg-[#F5F2E9]'
                                    )}
                                    title={`Modo ${m}`}
                                >
                                    {readingMode === m && <div className="w-1 h-1 rounded-full bg-primary" />}
                                </button>
                            ))}
                        </div>
                        
                        <Separator orientation="vertical" className="h-6 bg-current opacity-10" />

                        <div className="flex bg-black/5 dark:bg-white/5 rounded-full p-1 items-center">
                            <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 active:scale-90">
                                <Icon name="minus" size="size-3" />
                            </button>
                            <span className="w-10 text-center font-mono text-[10px] font-black opacity-40">{fontSize}px</span>
                            <button onClick={() => setFontSize(Math.min(36, fontSize + 2))} className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 active:scale-90">
                                <Icon name="plus" size="size-3" />
                            </button>
                        </div>

                        <button 
                            onClick={() => setTocOpen(true)}
                            className={cn("w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95", currentTheme.button)}
                        >
                            <Icon name="list" size="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Reader Engine Canvas */}
            <main 
                id="reader-v2-scroll-area" 
                className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-6 sm:px-12 scroll-smooth"
                onMouseUp={handleTextSelection}
            >
                <div className="max-w-[70ch] mx-auto py-64 space-y-32">
                    
                    {/* Editorial Master Opening */}
                    <div className="text-center space-y-12 animate-fade-in mb-48">
                        <div className="space-y-4">
                            <Badge variant="outline" className={cn("uppercase tracking-[0.8em] text-[10px] font-black px-10 py-3 rounded-full border-current/20 bg-current/5", currentTheme.accent)}>
                                {book.category}
                            </Badge>
                            <p className={cn("text-xs font-mono font-bold tracking-widest uppercase mt-4", currentTheme.dimmed)}>Capítulo {book.chapter}</p>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
                            {book.chapterTitle.split(' e ')[0]} <br/>
                            <span className={cn("italic font-serif font-light text-6xl md:text-8xl tracking-normal", currentTheme.accent)}>& {book.chapterTitle.split(' e ')[1]}</span>
                        </h1>
                        <div className={cn("w-24 h-1 mx-auto rounded-full bg-current opacity-10")}></div>
                    </div>

                    {/* Pro-Reading Article Body - Line Height 1.6x Applied */}
                    <article 
                        className="font-serif leading-[1.6] transition-all duration-700"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <p className={cn(
                            "mb-16 first-letter:text-9xl first-letter:font-black first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:font-sans",
                            "first-letter:" + currentTheme.accent.replace('text-', 'text-')
                        )}>
                            O Rei, como qualquer líder, está obcecado pela sua própria imagem. Ele pergunta como deve tratar seus subordinados para ser amado e se o povo o amará se ele for generoso. O Conselheiro expõe a insinceridade dessas perguntas, revelando que o Rei está interessado apenas em <strong>autopreservação e ego.</strong>
                        </p>

                        <p className="mb-16">
                            Liderança não é um teatro para uma audiência; é o peso invisível de decisões tomadas no silêncio da responsabilidade. O verdadeiro poder não reside no trono, mas na capacidade de abdicar da máscara de perfeição em favor da verdade nua.
                        </p>

                        {/* Immersive Breakpoint Insight */}
                        <div className={cn("my-32 -mx-4 md:-mx-24 border-y p-16 md:p-24 relative overflow-hidden group transition-colors duration-1000", "border-current/10 bg-current/5")}>
                             <div className={cn("absolute top-0 right-0 p-12 opacity-[0.03] text-[25rem] group-hover:scale-110 transition-transform duration-[3000ms]", currentTheme.accent)}>
                                <Icon name="crown" />
                             </div>
                             <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
                                 <div className={cn("flex justify-center gap-4 animate-pulse", currentTheme.accent)}>
                                     <Symbol name="star" /> <Symbol name="star" /> <Symbol name="star" />
                                 </div>
                                 <p className="text-3xl md:text-5xl font-light italic leading-tight opacity-90">
                                     "A coroa é apenas um aro de metal frio até que seja aquecida pelo fogo do sacrifício real."
                                 </p>
                                 <cite className={cn("block text-[10px] font-black uppercase tracking-[0.5em] not-italic", currentTheme.accent)}>
                                     — O Conselheiro Silencioso
                                 </cite>
                             </div>
                        </div>

                        <p className="mb-16">
                            Quando o Rei busca aprovação, ele entrega sua autoridade nas mãos daqueles que ele deveria guiar. Um líder faminto por validação é um líder que pode ser manipulado. A autonomia lendária exige que o "Sim" e o "Não" nasçam de princípios inegociáveis, não da temperatura da opinião pública.
                        </p>

                        {/* Luxury Character Block */}
                        <aside className={cn("my-24 p-16 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-1000", currentTheme.aside)}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.1),transparent_70%)] opacity-50"></div>
                            <div className="relative z-10 space-y-8">
                                <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[9px] px-6 py-2 border-none">SISTEMA DE DECISÃO</Badge>
                                <h4 className="text-3xl font-bold tracking-tight">O Filtro da Integridade</h4>
                                <p className="opacity-70 font-serif text-xl leading-relaxed">
                                    Ao ser confrontado com um dilema ético, se a resposta não for um "Sim" inabalável que ressoa em sua alma, então deve ser um "Não" absoluto. <strong>A integridade não admite zonas cinzentas de 89%.</strong>
                                </p>
                                <div className="pt-6 space-y-4">
                                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                                        <span>Grau de Pureza da Ação</span>
                                        <span className="text-primary">Incorruptível</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <p className="mb-16">
                            A solidão no topo não é um castigo, é um pré-requisito. Aqueles que não suportam o silêncio da própria consciência nunca serão capazes de ouvir a verdade no meio do barulho da corte. A busca por aprovação é, no fundo, um medo profundo da própria sombra.
                        </p>

                        {/* Structured Sovereign Cycle */}
                        <div className="my-32 space-y-16">
                             <h3 className={cn("text-xs font-black uppercase tracking-[0.6em] text-center border-b pb-8 transition-colors", "border-current/10", currentTheme.dimmed)}>
                                O CAMINHO DA SOBERANIA
                            </h3>
                            <div className="grid gap-12">
                                {[
                                    { t: "DESPIR-SE", d: "Remover as máscaras sociais e os títulos para encarar a verdade nua." },
                                    { t: "DISCERNIR", d: "Separar o ruído da aclamação da voz da sabedoria interna." },
                                    { t: "EXECUTAR", d: "Agir com a precisão de quem não busca aplausos, mas resultados eternos." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-12 items-start group">
                                        <span className={cn("text-6xl font-black font-sans italic group-hover:opacity-30 transition-all duration-700", "opacity-10")}>0{i+1}</span>
                                        <div className="space-y-3 pt-4">
                                            <h5 className="font-black text-sm uppercase tracking-[0.4em]">{step.t}</h5>
                                            <p className={cn("text-xl font-serif leading-snug max-w-xl", currentTheme.dimmed.replace('opacity-40', 'opacity-100'))}>{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grand Pull Quote */}
                        <div className="my-56 relative text-center px-4 md:px-20">
                             <span className={cn("text-[18rem] absolute -top-56 left-0 opacity-[0.05] pointer-events-none font-serif leading-none select-none", currentTheme.accent)}>“</span>
                             <p className="text-5xl md:text-8xl font-light font-serif italic leading-[1.1] tracking-tighter relative z-10">
                                Lidere por <span className={cn("font-medium not-italic", currentTheme.accent)}>verdade</span>,<br/> não por <span className={cn("line-through", currentTheme.dimmed)}>vanidade</span>.
                             </p>
                             <span className={cn("text-[18rem] absolute -bottom-80 right-0 opacity-[0.05] pointer-events-none font-serif leading-none select-none", currentTheme.accent)}>”</span>
                        </div>

                    </article>

                    {/* Progress Footer */}
                    <footer className={cn("pt-64 pb-48 border-t flex flex-col items-center gap-20 transition-colors duration-1000", "border-current/10")}>
                        <div className="text-center space-y-8 animate-pulse-slow">
                            <p className={cn("text-[10px] font-black uppercase tracking-[0.8em]", currentTheme.dimmed)}>Próximo na Sequência</p>
                            <h4 className={cn("text-4xl md:text-6xl font-bold hover:opacity-80 transition-all duration-700 cursor-pointer tracking-tighter")}>Capítulo 3: O Sussurro da Sombra</h4>
                        </div>
                        <Button className={cn("h-24 px-20 rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-[0_30px_80px_rgba(0,0,0,0.2)] active:scale-95 group overflow-hidden border-none", currentTheme.button)}>
                            <span className="relative z-10">Consolidar Aprendizado</span>
                        </Button>
                    </footer>
                </div>
            </main>

            {/* Luxury TOC Slider */}
            <div className={cn(
                "fixed inset-0 z-[120] transition-all duration-1000",
                tocOpen ? "visible" : "invisible"
            )}>
                <div 
                    className={cn("absolute inset-0 bg-background/90 backdrop-blur-2xl transition-opacity duration-1000", tocOpen ? "opacity-100" : "opacity-0")}
                    onClick={() => setTocOpen(false)}
                />
                <div className={cn(
                    "absolute right-0 top-0 bottom-0 w-full max-w-lg p-20 flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl border-l",
                    tocOpen ? "translate-x-0" : "translate-x-full",
                    currentTheme.hud
                )}>
                    <div className="flex justify-between items-center mb-32">
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.8em]", currentTheme.accent)}>Arquitetura da Obra</span>
                        <button onClick={() => setTocOpen(false)} className="opacity-60 hover:opacity-100 p-4 bg-current/5 rounded-full transition-all hover:rotate-90">
                            <Icon name="cross" size="size-5" />
                        </button>
                    </div>

                    <div className="space-y-16 flex-1 overflow-y-auto custom-scrollbar pr-6">
                        {chapters.map((ch) => (
                            <div 
                                key={ch.id} 
                                className={cn(
                                    "group cursor-pointer space-y-4",
                                    ch.active ? "text-foreground" : "opacity-40 hover:opacity-100"
                                )}
                            >
                                <div className="flex items-center gap-8">
                                    <span className="text-sm font-mono font-black opacity-20 group-hover:opacity-100 transition-opacity">0{ch.id}</span>
                                    <h4 className={cn(
                                        "text-2xl md:text-3xl font-bold transition-all duration-700 tracking-tighter",
                                        ch.active ? "translate-x-6 scale-110" : "group-hover:translate-x-4",
                                        ch.active ? currentTheme.accent : ""
                                    )}>
                                        {ch.title}
                                    </h4>
                                    {ch.completed && <Icon name="check" size="size-4" className={cn("ml-auto animate-fade-in", currentTheme.accent)} />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <div className={cn("border rounded-[2rem] p-10 space-y-8 shadow-inner", "bg-current/5 border-current/10")}>
                            <div className="flex items-center justify-between">
                                <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", currentTheme.accent)}>Sua Frequência</span>
                                <span className="text-xs font-mono font-bold">{Math.round(scrollProgress)}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-current opacity-10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${scrollProgress}%` }} />
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-[9px] font-serif italic opacity-50">Restam aprox. 12 minutos</p>
                                <Icon name="clock" size="size-3" className="opacity-30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Precision HUD Controls */}
            <div className={cn(
                "fixed bottom-12 left-1/2 -translate-x-1/2 z-[80] backdrop-blur-3xl border rounded-full px-16 h-20 flex items-center gap-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isScrolling ? "opacity-0 translate-y-24 scale-75" : "opacity-100 translate-y-0 scale-100",
                currentTheme.hud
            )}>
                {[
                    { label: 'Destaque', icon: 'pencil' },
                    { label: 'Ouvir IA', icon: 'headset' },
                    { label: 'Vincular', icon: 'link' },
                    { label: 'Exportar', icon: 'rocket' }
                ].map(action => (
                    <button key={action.label} className="flex flex-col items-center gap-1.5 group transition-all">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:bg-current/5 group-hover:-translate-y-1">
                            <Icon name={action.icon} size="size-5" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[7px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-80 transition-opacity hidden sm:block">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReaderPageV2;
