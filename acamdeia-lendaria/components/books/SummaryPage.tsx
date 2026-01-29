
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Symbol } from '../ui/symbol';

interface SummaryPageProps {
    onNavigate?: (section: Section) => void;
}

const MindMapNode = ({ title, subtitle, x, y, type = 'child' }: { title: string, subtitle?: string, x: string, y: string, type?: 'root' | 'child' }) => (
    <div 
        className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-6 transition-all duration-700 hover:scale-110 cursor-pointer z-10 group",
            type === 'root' 
                ? "bg-foreground text-background w-56 h-56 rounded-full shadow-2xl border-8 border-border/10" 
                : "bg-card border border-border w-44 h-auto min-h-[120px] rounded-3xl hover:border-primary/50 shadow-xl"
        )}
        style={{ left: x, top: y }}
    >
        <span className={cn("font-bold leading-tight uppercase tracking-widest", type === 'root' ? "text-xl" : "text-xs text-foreground")}>{title}</span>
        {subtitle && <span className="text-[9px] mt-3 font-serif italic text-muted-foreground leading-snug group-hover:text-foreground/70 transition-colors">{subtitle}</span>}
        
        {/* Pulsing Dot for children */}
        {type === 'child' && (
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary animate-pulse opacity-0 group-hover:opacity-100" />
        )}
    </div>
);

const SummaryPage: React.FC<SummaryPageProps> = ({ onNavigate }) => {
    
    const book = {
        title: "A Psicologia do Dinheiro",
        author: "Morgan Housel",
        cover: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=1000&auto=format&fit=crop",
        duration: "18:42",
        category: "ECONOMIA COMPORTAMENTAL",
        summary: "Uma exploração profunda sobre como o comportamento humano influencia as decisões financeiras mais do que a lógica matemática."
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState("mindmap");

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-32 overflow-hidden relative">
            
            {/* Header Glass Adaptive */}
            <header className="fixed top-0 z-50 bg-background/60 backdrop-blur-3xl border-b border-border h-20 w-full">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="arrow-left" size="size-4" />
                    </button>
                    <div className="text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground leading-none mb-1">Ouvindo Agora</p>
                        <h2 className="text-sm font-bold text-foreground tracking-tight">{book.title}</h2>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Icon name="bookmark" /></Button>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-8 pt-32 h-[calc(100vh-80px)] flex flex-col">
                
                {/* Tabs Minimalistas Adaptive */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-card/60 backdrop-blur-2xl rounded-full border border-border p-1 shadow-md">
                        {[
                            { id: 'mindmap', label: 'Mapa Mental', icon: 'aperture' },
                            { id: 'summary', label: 'Conceitos', icon: 'list' },
                            { id: 'action', label: 'Plano de Ação', icon: 'bolt' }
                        ].map(t => (
                            <button
                                key={t.id}
                                className={cn(
                                    "px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-700 flex items-center gap-3",
                                    activeTab === t.id
                                        ? "bg-foreground text-background shadow-xl scale-105"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setActiveTab(t.id)}
                            >
                                <Icon name={t.icon} size="size-3" /> {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Viewport Adaptive */}
                <div className="flex-1 relative rounded-[3rem] bg-card border border-border overflow-hidden shadow-2xl">
                    
                    <Tabs value={activeTab} className="h-full">
                        {/* VIEW 1: MAPA MENTAL (Visão Galáxia) Adaptive */}
                        <TabsContent value="mindmap" className="h-full m-0 relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05),transparent_70%)] pointer-events-none"></div>
                            
                            {/* SVG Connections (Constellation Style) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                 <path d="M50,50 L20,25 M50,50 L80,25 M50,50 L20,75 M50,50 L80,75" className="stroke-border/30 stroke-[0.2]" strokeDasharray="1 2" />
                            </svg>

                            <MindMapNode title="PSICOLOGIA DO DINHEIRO" x="50%" y="50%" type="root" />
                            
                            <MindMapNode 
                                title="LÓGICA VS PSICHE" 
                                subtitle="Planilhas não medem o medo do mercado." 
                                x="20%" y="25%" 
                            />
                            <MindMapNode 
                                title="O PODER DO TEMPO" 
                                subtitle="Juros compostos são um milagre da paciência." 
                                x="80%" y="25%" 
                            />
                            <MindMapNode 
                                title="RIQUEZA VS FORTUNA" 
                                subtitle="O que você não gasta é o que te faz livre." 
                                x="20%" y="75%" 
                            />
                            <MindMapNode 
                                title="NUNCA É O BASTANTE" 
                                subtitle="O perigo de mover a linha de chegada constante." 
                                x="80%" y="75%" 
                            />

                            {/* Floating Tooltip/Hint Adaptive */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
                                Interação Ativa: Explore os Nodes
                            </div>
                        </TabsContent>

                        {/* VIEW 2: CONCEITOS (Minimalist List) Adaptive */}
                        <TabsContent value="summary" className="h-full m-0 overflow-y-auto custom-scrollbar p-12 md:p-24">
                            <div className="max-w-2xl mx-auto space-y-24">
                                {[
                                    { t: "Ninguém é Louco", c: "Suas decisões dependem das experiências que você teve, não apenas de fatos." },
                                    { t: "Sorte e Risco", c: "Nada é tão bom nem tão ruim quanto parece. Ambos são gêmeos da mesma moeda." },
                                    { t: "Riqueza é o que você não vê", c: "Gastar dinheiro para mostrar às pessoas quanto dinheiro você tem é a maneira mais rápida de ter menos dinheiro." }
                                ].map((idea, i) => (
                                    <div key={i} className="space-y-6 group">
                                        <div className="flex items-center gap-6">
                                            <span className="text-4xl font-black text-foreground/5 group-hover:text-primary/20 transition-colors font-sans italic">0{i+1}</span>
                                            <h3 className="text-2xl font-bold text-foreground tracking-tight">{idea.t}</h3>
                                        </div>
                                        <p className="text-muted-foreground font-serif text-xl leading-relaxed pl-16 opacity-90">
                                            {idea.c}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* VIEW 3: ACTION PLAN Adaptive */}
                        <TabsContent value="action" className="h-full m-0 flex items-center justify-center p-12">
                             <div className="max-w-xl w-full space-y-12">
                                <div className="text-center space-y-4">
                                    <h3 className="text-3xl font-bold text-foreground">Próximos Passos</h3>
                                    <p className="text-muted-foreground font-serif">Transforme o conhecimento em ativos reais.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Defina seu 'número de suficiência' hoje.",
                                        "Automatize 20% do aporte para ignorar oscilações.",
                                        "Escreva seu erro financeiro mais caro e a lição dele."
                                    ].map((action, i) => (
                                        <div key={i} className="flex gap-6 items-center p-6 bg-muted/10 border border-border/50 rounded-3xl hover:bg-muted/20 transition-colors group cursor-pointer">
                                            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                                                <Icon name="check" size="size-3" className="text-foreground group-hover:text-primary" />
                                            </div>
                                            <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">{action}</p>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Sticky Audio Controls (Floating HUD) Adaptive */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-2xl animate-fade-in">
                <div className="bg-card/90 backdrop-blur-3xl border border-border/50 rounded-[2rem] p-6 shadow-2xl">
                    <div className="space-y-6">
                        {/* Progress Bar Detail */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
                                <span>04:20</span>
                                <span>{book.duration}</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden group cursor-pointer">
                                <div className="h-full bg-primary relative" style={{ width: '35%' }}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform"></div>
                                </div>
                            </div>
                        </div>

                        {/* Player Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="rewind" size="size-5" /></button>
                                <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                                >
                                    <Icon name={isPlaying ? "pause" : "play"} type="solid" size="size-6" className={!isPlaying ? "ml-1" : ""} />
                                </button>
                                <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="forward" size="size-5" /></button>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Velocidade</span>
                                    <button className="text-xs font-mono font-bold text-primary hover:opacity-80 transition-colors">1.5x</button>
                                </div>
                                <div className="h-8 w-px bg-border"></div>
                                <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="volume" size="size-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SummaryPage;
