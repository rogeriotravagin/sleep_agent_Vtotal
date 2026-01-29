
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';

interface LmsBookSummaryTemplateProps {
    onNavigate?: (section: Section) => void;
}

// Helper Component for Mind Map Node
const MindMapNode = ({ title, subtitle, x, y, type = 'child', color = 'bg-card' }: { title: string, subtitle?: string, x: string, y: string, type?: 'root' | 'child', color?: string }) => (
    <div 
        className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-4 transition-all hover:scale-110 cursor-pointer z-10 group shadow-lg",
            type === 'root' 
                ? "bg-brand-gold text-black border-4 border-black/10 w-48 h-48 rounded-full" 
                : cn("border border-border hover:border-brand-gold w-40 h-auto min-h-[100px] rounded-xl", color)
        )}
        style={{ left: x, top: y }}
    >
        <span className={cn("font-bold leading-tight", type === 'root' ? "text-lg" : "text-sm text-foreground")}>{title}</span>
        {subtitle && <span className={cn("text-[10px] mt-1 font-serif leading-snug", type === 'root' ? "opacity-80 text-black" : "text-muted-foreground")}>{subtitle}</span>}
        
        {/* Connector Dot */}
        <div className={cn(
            "absolute w-3 h-3 rounded-full border-2 z-20",
             type === 'root' ? "bg-black border-brand-gold" : "bg-brand-gold border-background",
             type === 'root' ? "hidden" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        )}></div>
    </div>
);

const LmsBookSummaryTemplate: React.FC<LmsBookSummaryTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data ---
    const book = {
        title: "A Psicologia do Dinheiro",
        author: "Morgan Housel",
        cover: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=1000&auto=format&fit=crop",
        duration: "18 min",
        category: "Finanças",
        tags: ["Mentalidade", "Riqueza", "Investimentos"],
        summary: "Uma exploração profunda sobre como o comportamento humano influencia as decisões financeiras mais do que a lógica matemática.",
        progress: 35, // Percentage
    };

    const chapters = [
        { id: 1, title: "Ninguém é Louco", duration: "2:10", completed: true },
        { id: 2, title: "Sorte & Risco", duration: "3:05", completed: true },
        { id: 3, title: "Nunca é Suficiente", duration: "2:45", completed: false },
        { id: 4, title: "Juros Compostos", duration: "3:20", completed: false },
        { id: 5, title: "Ficar Rico vs Manter-se Rico", duration: "4:10", completed: false },
    ];

    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState("summary");
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [isAudioMode, setIsAudioMode] = useState(true);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20 relative">
            
            {/* Sticky Navbar */}
            <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border h-16 transition-all duration-300">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                        >
                            <Icon name="arrow-left" size="size-4" />
                        </Button>
                        <div className="hidden md:flex flex-col">
                            <span className="font-bold text-sm leading-tight text-foreground">{book.title}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{book.author}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                         {/* Audio Toggle */}
                         <div className="flex items-center bg-muted/30 rounded-lg p-0.5 border border-border">
                            <button 
                                onClick={() => setIsAudioMode(true)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                    isAudioMode ? "bg-background text-brand-gold shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon name="headphones" size="size-3" /> Com Áudio
                            </button>
                            <button 
                                onClick={() => setIsAudioMode(false)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                    !isAudioMode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon name="document" size="size-3" /> Texto
                            </button>
                         </div>

                         {/* Font Size Controls */}
                         <div className="hidden md:flex items-center gap-1 bg-muted/30 rounded-lg p-1 border border-border">
                            <button onClick={() => setFontSize('sm')} className={cn("w-6 h-6 flex items-center justify-center rounded text-xs font-serif hover:bg-background", fontSize === 'sm' && "bg-background text-foreground shadow-sm")}>A</button>
                            <button onClick={() => setFontSize('md')} className={cn("w-6 h-6 flex items-center justify-center rounded text-sm font-serif hover:bg-background", fontSize === 'md' && "bg-background text-foreground shadow-sm")}>A</button>
                            <button onClick={() => setFontSize('lg')} className={cn("w-6 h-6 flex items-center justify-center rounded text-lg font-serif hover:bg-background", fontSize === 'lg' && "bg-background text-foreground shadow-sm")}>A</button>
                        </div>

                        <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                            <Icon name="bookmark" size="size-3" /> Salvar
                        </Button>
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Main Content Area (Reading) */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* Hero / Player Header */}
                        {isAudioMode ? (
                            <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-in">
                                {/* Blurry Backdrop */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none blur-xl scale-110"
                                    style={{ backgroundImage: `url(${book.cover})` }}
                                ></div>
                                
                                {/* Cover Image */}
                                <div className="w-32 h-48 rounded-lg shadow-xl shrink-0 overflow-hidden border border-white/10 relative z-10">
                                    <img src={book.cover} alt="Cover" className="w-full h-full object-cover" />
                                </div>

                                {/* Info & Player */}
                                <div className="flex-1 w-full relative z-10 space-y-6">
                                    <div className="text-center md:text-left">
                                        <div className="flex justify-center md:justify-start gap-2 mb-3">
                                            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-foreground/10 text-foreground">{book.category}</Badge>
                                            <span className="text-xs font-bold bg-brand-gold text-black px-2 py-0.5 rounded flex items-center gap-1">
                                                <Icon name="clock" size="size-3" /> {book.duration}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">{book.title}</h1>
                                        <p className="text-muted-foreground text-sm">Resumo do livro de <strong>{book.author}</strong></p>
                                    </div>

                                    {/* Audio Player */}
                                    <div className="bg-background/60 backdrop-blur-md border border-border rounded-xl p-4 flex flex-col gap-3">
                                        <div className="flex items-center justify-between gap-4">
                                            <Button 
                                                size="icon" 
                                                className="w-12 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0 shadow-lg"
                                                onClick={() => setIsPlaying(!isPlaying)}
                                            >
                                                <Icon name={isPlaying ? "pause" : "play"} type="solid" size="size-5" className="ml-0.5" />
                                            </Button>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                                                    <span>04:20</span>
                                                    <span>{book.duration}</span>
                                                </div>
                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full cursor-pointer relative group">
                                                    <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <div className="h-full bg-brand-gold w-[35%] relative">
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                                <Icon name="settings-sliders" size="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 animate-fade-in border-b border-border/50 pb-8">
                                <div className="flex gap-6 items-start">
                                    <div className="w-20 h-28 rounded-lg shadow-md shrink-0 overflow-hidden border border-border">
                                        <img src={book.cover} alt="Cover" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <Badge variant="secondary" className="text-[10px]">{book.category}</Badge>
                                        <h1 className="text-3xl font-bold font-serif leading-tight">{book.title}</h1>
                                        <p className="text-sm text-muted-foreground">Por {book.author}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg text-sm text-muted-foreground border border-border/50">
                                    <Icon name="info" size="size-4" /> 
                                    Você está no modo leitura. O áudio foi desativado.
                                </div>
                            </div>
                        )}

                        {/* Tabs Navigation */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 mb-8 h-auto gap-8">
                                {['summary', 'mindmap', 'action'].map(t => (
                                    <TabsTrigger 
                                        key={t}
                                        value={t} 
                                        className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-bold text-muted-foreground hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent transition-all capitalize"
                                    >
                                        {t === 'summary' ? 'Resumo' : t === 'mindmap' ? 'Mapa Mental' : 'Plano de Ação'}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="summary" className="animate-fade-in space-y-12">
                                
                                {/* Intro Text */}
                                <div className={cn(
                                    "prose dark:prose-invert max-w-none text-muted-foreground font-serif leading-relaxed",
                                    fontSize === 'sm' && "text-base",
                                    fontSize === 'md' && "text-lg",
                                    fontSize === 'lg' && "text-xl"
                                )}>
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-foreground first-letter:mr-3 first-letter:float-left">
                                        Fazer bem feito com dinheiro tem pouco a ver com o quão inteligente você é e muito a ver com como você se comporta. E comportamento é difícil de ensinar, mesmo para pessoas realmente inteligentes.
                                    </p>
                                    <p>
                                        Um gênio que perde o controle de suas emoções pode ser um desastre financeiro. O oposto também é verdadeiro. Pessoas comuns sem educação financeira podem ser ricas se tiverem um punhado de habilidades comportamentais que não têm nada a ver com medidas formais de inteligência.
                                    </p>
                                </div>

                                {/* Key Idea Card 1 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold text-sm">1</div>
                                        <h3 className="text-xl font-bold font-sans text-foreground">Ninguém é Louco</h3>
                                    </div>
                                    <Card className="bg-card border border-border shadow-sm">
                                        <CardContent className="p-8 md:p-10">
                                            <p className={cn(
                                                "text-foreground/90 font-serif leading-relaxed font-normal",
                                                fontSize === 'sm' && "text-base",
                                                fontSize === 'md' && "text-lg",
                                                fontSize === 'lg' && "text-xl"
                                            )}>
                                                Sua experiência pessoal com dinheiro compõe talvez 0,00000001% do que aconteceu no mundo, mas 80% de como você pensa que o mundo funciona.
                                            </p>
                                            <div className="mt-8 p-6 bg-muted/30 border-l-4 border-brand-gold rounded-r-lg italic text-foreground/80 text-base font-sans leading-relaxed">
                                                "As pessoas fazem coisas loucas com dinheiro, mas ninguém é louco. Todos tomam decisões baseadas em suas próprias experiências únicas que fazem sentido para elas naquele momento."
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Key Idea Card 2 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold text-sm">2</div>
                                        <h3 className="text-xl font-bold font-sans text-foreground">Sorte & Risco</h3>
                                    </div>
                                    <Card className="bg-card border border-border shadow-sm">
                                        <CardContent className="p-8 md:p-10">
                                            <p className={cn(
                                                "text-foreground/90 font-serif leading-relaxed font-normal",
                                                fontSize === 'sm' && "text-base",
                                                fontSize === 'md' && "text-lg",
                                                fontSize === 'lg' && "text-xl"
                                            )}>
                                                Nada é tão bom ou tão ruim quanto parece. O mundo é grande e complexo. A sorte e o risco são irmãos. Eles são a realidade de que cada resultado na vida é guiado por forças além do esforço individual.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Conclusion */}
                                <div className="p-8 bg-muted/20 rounded-xl border border-border text-center space-y-4">
                                    <Icon name="book-open" className="mx-auto text-muted-foreground" size="size-8" />
                                    <h3 className="font-bold text-lg">Parabéns pela leitura!</h3>
                                    <p className="text-sm text-muted-foreground font-serif">Você absorveu os conceitos chave deste best-seller.</p>
                                    <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold">
                                        Marcar como Concluído
                                    </Button>
                                </div>

                            </TabsContent>
                            
                            {/* --- MIND MAP TAB --- */}
                            <TabsContent value="mindmap">
                                <div className="relative w-full h-[600px] bg-muted/10 rounded-xl border border-border overflow-hidden select-none">
                                    <div className="absolute top-4 left-4 z-20">
                                        <Badge variant="outline" className="bg-background/80 backdrop-blur">Mapa Conceitual</Badge>
                                    </div>

                                    {/* SVG Connections */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                         {/* Connection Lines with Gradient definitions if needed, sticking to simple strokes for now */}
                                         <path d="M50,50 L20,25" className="stroke-border stroke-2" strokeDasharray="1 1" />
                                         <path d="M50,50 L80,25" className="stroke-border stroke-2" strokeDasharray="1 1" />
                                         <path d="M50,50 L20,75" className="stroke-border stroke-2" strokeDasharray="1 1" />
                                         <path d="M50,50 L80,75" className="stroke-border stroke-2" strokeDasharray="1 1" />
                                         
                                         {/* Decorative Circles */}
                                         <circle cx="50" cy="50" r="15" className="fill-brand-gold/5 stroke-brand-gold/20" />
                                         <circle cx="50" cy="50" r="30" className="fill-none stroke-brand-gold/10 stroke-[0.5] stroke-dasharray-4" />
                                    </svg>

                                    {/* Nodes */}
                                    <MindMapNode 
                                        title="A Psicologia do Dinheiro" 
                                        subtitle="Morgan Housel" 
                                        x="50%" y="50%" 
                                        type="root" 
                                    />
                                    
                                    <MindMapNode 
                                        title="Comportamento > Lógica" 
                                        subtitle="Nossas experiências pessoais moldam nossa visão de risco, não planilhas." 
                                        x="20%" y="25%" 
                                        color="bg-blue-500/5 border-blue-500/20"
                                    />
                                    <MindMapNode 
                                        title="Riqueza vs Fortuna" 
                                        subtitle="Riqueza é o que você não vê (ativos). Fortuna é o que você gasta (carros)." 
                                        x="80%" y="25%" 
                                        color="bg-green-500/5 border-green-500/20"
                                    />
                                    <MindMapNode 
                                        title="O Poder do 'Suficiente'" 
                                        subtitle="Não mova a linha de chegada. A comparação social é o ladrão da alegria." 
                                        x="20%" y="75%" 
                                        color="bg-red-500/5 border-red-500/20"
                                    />
                                    <MindMapNode 
                                        title="Juros Compostos" 
                                        subtitle="A força mais poderosa do universo financeiro requer paciência e tempo." 
                                        x="80%" y="75%" 
                                        color="bg-purple-500/5 border-purple-500/20"
                                    />
                                    
                                    {/* Overlay Controls */}
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                         <Button size="icon" variant="outline" className="bg-background shadow-sm h-8 w-8"><Icon name="zoom-in" size="size-3" /></Button>
                                         <Button size="icon" variant="outline" className="bg-background shadow-sm h-8 w-8"><Icon name="zoom-out" size="size-3" /></Button>
                                         <Button size="icon" variant="outline" className="bg-background shadow-sm h-8 w-8"><Icon name="expand" size="size-3" /></Button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-[10px] text-muted-foreground font-mono">
                                        Clique nos nós para expandir
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="action">
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-card items-start">
                                            <div className="w-6 h-6 rounded border-2 border-muted-foreground/30 flex items-center justify-center shrink-0 mt-1 cursor-pointer hover:border-brand-gold hover:bg-brand-gold/10"></div>
                                            <div>
                                                <h4 className="font-bold text-sm mb-1">Definir o "Suficiente"</h4>
                                                <p className="text-xs text-muted-foreground font-serif">Escreva qual é o seu número de independência financeira e pare de mover a linha de chegada.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* Right Sidebar: Chapter List */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        <Card className="bg-card border border-border sticky top-24">
                            <div className="p-4 border-b border-border bg-muted/20">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Conteúdo</h3>
                            </div>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/50">
                                    {chapters.map((chapter) => (
                                        <div 
                                            key={chapter.id} 
                                            className="p-4 flex items-center gap-3 hover:bg-muted/30 cursor-pointer group transition-colors"
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0",
                                                chapter.completed 
                                                    ? "bg-green-500 text-white border-green-500" 
                                                    : "bg-transparent text-muted-foreground border-muted-foreground/30 group-hover:border-foreground"
                                            )}>
                                                {chapter.completed && <Icon name="check" size="size-3" />}
                                                {!chapter.completed && chapter.id}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm font-medium truncate group-hover:text-primary transition-colors",
                                                    chapter.completed ? "text-muted-foreground line-through decoration-border" : "text-foreground"
                                                )}>
                                                    {chapter.title}
                                                </p>
                                                <span className="text-[10px] text-muted-foreground font-mono">{chapter.duration}</span>
                                            </div>
                                            <Icon name="play-circle" className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" size="size-4" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommendation */}
                        <div className="bg-muted/10 rounded-xl p-4 border border-border">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Próxima Leitura</p>
                            <div className="flex gap-3">
                                <div className="w-12 h-16 bg-muted rounded border border-border shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Essencialismo</h4>
                                    <p className="text-xs text-muted-foreground font-serif">Greg McKeown</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
};

export default LmsBookSummaryTemplate;
