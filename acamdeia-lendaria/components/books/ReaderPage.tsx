
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

interface ReaderPageProps {
    onNavigate?: (section: Section) => void;
    setSidebarCollapsed?: (collapsed: boolean) => void;
}

const ReaderPage: React.FC<ReaderPageProps> = ({ onNavigate, setSidebarCollapsed }) => {
    const { toast } = useToast();
    const articleRef = useRef<HTMLDivElement>(null);
    
    // --- State ---
    const [fontSize, setFontSize] = useState(20);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);
    const [selectionMenu, setSelectionMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });

    const book = {
        title: "Essencialismo",
        author: "Greg McKeown",
        category: "PRODUTIVIDADE",
        chapter: "Capítulo 2",
        chapterTitle: "Escolha: O Poder Invencível"
    };

    const chapters = [
        { id: 1, title: "A Disciplina da Busca por Menos", completed: true },
        { id: 2, title: "Escolha: O Poder Invencível", active: true },
        { id: 3, title: "Discernimento: O que Importa?", completed: false },
        { id: 4, title: "Trade-offs: O que eu abro mão?", completed: false },
        { id: 5, title: "Escapar: A Arte de Não Estar Disponível", completed: false },
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
            description: "Ação registrada no seu perfil lendário.",
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

        const scrollContainer = document.getElementById('reader-scroll-area');
        scrollContainer?.addEventListener('scroll', handleScroll);
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden relative">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] dark:opacity-[0.05] z-0"></div>

            {/* Progress Bar Hairline */}
            <div className="fixed top-0 left-0 right-0 h-[2px] bg-border/10 z-[70]">
                <div 
                    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Floating Selection Toolbar */}
            {selectionMenu.visible && (
                <div 
                    className="fixed z-[100] -translate-x-1/2 -translate-y-full mb-4 animate-scale-in"
                    style={{ left: selectionMenu.x, top: selectionMenu.y }}
                >
                    <div className="flex items-center bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <button 
                            onClick={() => handleAction("Texto Destacado")}
                            className="flex flex-col items-center gap-1.5 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors group"
                        >
                            <Icon name="pencil" size="size-4" className="text-zinc-400 group-hover:text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Destacar</span>
                        </button>
                        <div className="w-px h-8 bg-white/5 mx-1"></div>
                        <button 
                            onClick={() => handleAction("Nota Criada")}
                            className="flex flex-col items-center gap-1.5 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors group"
                        >
                            <Icon name="plus" size="size-4" className="text-zinc-400 group-hover:text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Anotar</span>
                        </button>
                        <div className="w-px h-8 bg-white/5 mx-1"></div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.getSelection()?.toString() || "");
                                handleAction("Copiado");
                            }}
                            className="flex flex-col items-center gap-1.5 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors group"
                        >
                            <Icon name="copy" size="size-4" className="text-zinc-400 group-hover:text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Copiar</span>
                        </button>
                    </div>
                    {/* Arrow */}
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-900/95 mx-auto -mt-0.5"></div>
                </div>
            )}

            {/* Smart Header */}
            <header className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isScrolling ? "opacity-0 -translate-y-12" : "opacity-100 translate-y-0"
            )}>
                <div className="bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2rem] h-20 px-8 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-8">
                        <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)} className="text-muted-foreground hover:text-foreground p-2">
                            <Icon name="arrow-left" size="size-5" />
                        </button>
                        <div className="hidden sm:block">
                            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-primary leading-none mb-1.5">{book.title}</p>
                            <h2 className="text-sm font-bold text-foreground tracking-tight">{book.chapterTitle}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex bg-muted/20 rounded-full p-1.5 border border-border/50 items-center">
                            <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="w-10 h-10 flex items-center justify-center hover:text-primary transition-all active:scale-90">
                                <Icon name="minus" size="size-3" />
                            </button>
                            <div className="w-10 h-10 flex items-center justify-center text-xs font-mono font-black text-muted-foreground">{fontSize}px</div>
                            <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="w-10 h-10 flex items-center justify-center hover:text-primary transition-all active:scale-90">
                                <Icon name="plus" size="size-3" />
                            </button>
                        </div>
                        <button 
                            onClick={() => setTocOpen(true)}
                            className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95"
                        >
                            <Icon name="list" size="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Scrollable Reader Canvas */}
            <main 
                id="reader-scroll-area" 
                className="flex-1 overflow-y-auto custom-scrollbar relative z-10"
                onMouseUp={handleTextSelection}
            >
                <div className="max-w-3xl mx-auto py-56 px-10 space-y-24 selection:bg-primary/20">
                    
                    {/* Chapter Splash */}
                    <div className="text-center space-y-10 animate-fade-in mb-40">
                        <div className="flex justify-center gap-4">
                           <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.6em] text-[10px] font-black px-8 py-2 rounded-full">
                                {book.category}
                            </Badge>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
                            {book.chapterTitle}
                        </h1>
                        <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full"></div>
                    </div>

                    {/* Article Content */}
                    <article 
                        className="font-serif leading-[1.85] text-foreground/80 transition-all duration-500"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <p className="mb-16 first-letter:text-8xl first-letter:font-black first-letter:text-primary first-letter:mr-5 first-letter:float-left first-letter:font-sans first-letter:leading-none">
                            Temos perdido nossa capacidade de escolher. Aprendemos o desamparo. Nos esquecemos de que temos uma opção em praticamente tudo o que fazemos. O essencialismo não é sobre fazer mais coisas em menos tempo.
                        </p>

                        <p className="mb-16">
                            Não é sobre fazer menos só por fazer menos. É sobre fazer apenas as coisas certas. É sobre investir seu tempo e energia no mais alto nível de contribuição possível. 
                            <strong> A vida moderna nos treina para sermos reativos</strong>, mas a grandeza exige proatividade radical na curadoria das nossas prioridades.
                        </p>

                        {/* Conceptual Figure */}
                        <figure className="my-32 space-y-6">
                            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group bg-muted">
                                <img 
                                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop" 
                                    alt="Conceito" 
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
                            </div>
                            <figcaption className="text-center text-[9px] uppercase font-black tracking-[0.4em] text-muted-foreground italic">
                                Fig 2.1 — O Campo de Força do Essencialista.
                            </figcaption>
                        </figure>

                        {/* System Insight Callout */}
                        <div className="my-24 p-12 bg-primary/5 border-l-4 border-primary rounded-r-[2.5rem] relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-[0.03] text-9xl text-primary group-hover:scale-110 transition-transform">
                                <Icon name="bulb" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex gap-4 items-center mb-6">
                                    <Icon name="bulb" className="text-primary" size="size-5" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Insight do Mentor</span>
                                </div>
                                <p className="text-2xl md:text-3xl text-foreground font-serif leading-relaxed italic opacity-90">
                                    "Se você não priorizar sua vida, alguém o fará por você. O essencialismo é o antídoto contra a diluição de impacto."
                                </p>
                            </div>
                        </div>

                        <p className="mb-16">
                            A palavra prioridade veio para a língua inglesa no século 14. Era singular. Significava a primeira coisa ou a coisa anterior. Permaneceu singular pelos próximos quinhentos anos. Somente nos anos 1900 pluralizamos o termo.
                        </p>

                        <h2 className="text-4xl font-bold font-sans tracking-tighter text-foreground mt-32 mb-10">
                            A Ilusão da Produtividade
                        </h2>

                        <p className="mb-16">
                            Ilogicamente, raciocinamos que ao mudar a palavra poderíamos dobrar a realidade. De alguma forma, agora seríamos capazes de ter múltiplas "primeiras" coisas. O caminho do essencialista é a busca incansável pelo menos, mas melhor.
                        </p>

                        {/* Special UI Block: The 90% Rule */}
                        <aside className="my-24 bg-zinc-900 text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.05] text-[20rem] pointer-events-none rotate-12">
                                <Symbol name="star" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px] px-6 py-2">
                                    Protocolo de Decisão
                                </Badge>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-bold tracking-tight">A Regra dos 90%</h4>
                                    <p className="text-zinc-400 font-serif text-xl leading-relaxed">
                                        Ao avaliar uma opção, use um critério rígido de 0 a 100. Se a pontuação for menor que 90, a resposta é automaticamente zero. <strong>Se não for um "Sim" óbvio, é um "Não" absoluto.</strong>
                                    </p>
                                </div>
                                <div className="pt-6 space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <span>Threshold de Qualidade</span>
                                        <span className="text-primary">90% Essential</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[90%] shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* List: Methodology */}
                        <div className="my-32 space-y-12">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground text-center border-b border-border pb-6">
                                O CICLO ESTRATÉGICO
                            </h3>
                            <div className="grid gap-10">
                                {[
                                    { t: "EXPLORAR", d: "Discernir o vital do trivial usando filtros de alta precisão." },
                                    { t: "ELIMINAR", d: "Remover o que não contribui para o seu objetivo máximo." },
                                    { t: "EXECUTAR", d: "Criar um sistema que torne a execução sem esforço." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-10 items-start p-10 border border-border/50 rounded-[2rem] hover:bg-muted/30 transition-all group">
                                        <span className="text-5xl font-black text-primary/10 font-sans italic group-hover:text-primary/30 transition-colors">0{i+1}</span>
                                        <div className="space-y-2">
                                            <h5 className="font-black text-xs uppercase tracking-[0.3em] text-foreground">{step.t}</h5>
                                            <p className="text-lg text-muted-foreground font-serif leading-snug">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pull Quote Giant */}
                        <div className="my-48 relative text-center px-10">
                             <span className="text-[15rem] absolute -top-40 left-0 opacity-[0.04] pointer-events-none font-serif text-primary">“</span>
                             <p className="text-4xl md:text-7xl font-light font-serif italic text-foreground leading-[1.1] tracking-tight">
                                Viva por <span className="text-primary font-medium not-italic">design</span>, <br/>não por <span className="text-muted-foreground/30 line-through">padrão</span>.
                             </p>
                             <span className="text-[15rem] absolute -bottom-60 right-0 opacity-[0.04] pointer-events-none font-serif text-primary">”</span>
                        </div>

                    </article>

                    {/* Footer Navigation */}
                    <footer className="pt-40 pb-32 border-t border-border/50 flex flex-col items-center gap-16">
                        <div className="text-center space-y-6">
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Próximo Capítulo</p>
                            <h4 className="text-3xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer tracking-tighter">Capítulo 3: O Poder do Discernimento</h4>
                        </div>
                        <Button className="h-20 px-16 rounded-[2rem] bg-foreground text-background font-black uppercase tracking-[0.4em] text-[11px] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                            Finalizar Leitura do Capítulo
                        </Button>
                    </footer>
                </div>
            </main>

            {/* Table of Contents Overlay */}
            <div className={cn(
                "fixed inset-0 z-[110] transition-all duration-700",
                tocOpen ? "visible" : "invisible"
            )}>
                <div 
                    className={cn("absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity duration-700", tocOpen ? "opacity-100" : "opacity-0")}
                    onClick={() => setTocOpen(false)}
                />
                <div className={cn(
                    "absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border p-16 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    tocOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex justify-between items-center mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground">Índice</span>
                        <button onClick={() => setTocOpen(false)} className="text-muted-foreground hover:text-foreground p-2">
                            <Icon name="cross" size="size-5" />
                        </button>
                    </div>

                    <div className="space-y-12">
                        {chapters.map((ch) => (
                            <div 
                                key={ch.id} 
                                className={cn(
                                    "group cursor-pointer space-y-3",
                                    ch.active ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-xs font-mono font-black opacity-20">{String(ch.id).padStart(2, '0')}</span>
                                    <h4 className={cn(
                                        "text-xl font-bold transition-all duration-500",
                                        ch.active ? "translate-x-4 text-primary" : "group-hover:translate-x-2"
                                    )}>
                                        {ch.title}
                                    </h4>
                                    {ch.completed && <Icon name="check" size="size-3" className="text-primary ml-auto" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-16 left-16 right-16">
                        <div className="bg-muted/20 border border-border/50 rounded-3xl p-8 space-y-6">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Sua Jornada</p>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="font-bold">{Math.round(scrollProgress)}%</span>
                                    <span className="text-muted-foreground/60">Posição: 24/156</span>
                                </div>
                                <div className="h-1 w-full bg-border/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${scrollProgress}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom HUD Actions */}
            <div className={cn(
                "fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-card/60 backdrop-blur-3xl border border-border/50 rounded-full px-12 h-16 flex items-center gap-12 shadow-2xl transition-all duration-700",
                isScrolling ? "opacity-0 translate-y-12 scale-95" : "opacity-100 translate-y-0 scale-100"
            )}>
                {[
                    { label: 'Destaque', icon: 'pencil' },
                    { label: 'Nota', icon: 'comment-alt' },
                    { label: 'Share', icon: 'share' },
                    { label: 'Ouvir', icon: 'headset' }
                ].map(action => (
                    <button key={action.label} className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all flex items-center gap-3 group">
                        <Icon name={action.icon} size="size-4" className="group-hover:text-primary transition-colors" />
                        <span className="hidden md:inline">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReaderPage;
