
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';

interface LmsBookReadTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsBookReadTemplate: React.FC<LmsBookReadTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data ---
    const book = {
        title: "Essencialismo",
        author: "Greg McKeown",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
        readTime: "15 min",
        category: "Produtividade",
        progress: 10, // Reading progress
    };

    const chapters = [
        { id: 1, title: "A Disciplina da Busca por Menos", completed: true },
        { id: 2, title: "Escolha: O Poder Invencível", completed: false },
        { id: 3, title: "Discernimento: O que Importa?", completed: false },
        { id: 4, title: "Trade-offs: O que eu abro mão?", completed: false },
        { id: 5, title: "Escapar: A Arte de Não Estar Disponível", completed: false },
    ];

    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [scrollProgress, setScrollProgress] = useState(0);

    // Mock scroll handler
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground font-sans animate-fade-in relative overflow-hidden">
            
            {/* Reading Progress Bar (Top) */}
            <div className="h-1 bg-muted w-full fixed top-0 left-0 right-0 z-50">
                <div 
                    className="h-full bg-brand-gold transition-all duration-100 ease-out" 
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Navbar */}
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border h-16 flex-shrink-0">
                <div className="container max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                        >
                            <Icon name="arrow-left" size="size-4" />
                        </Button>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm leading-tight text-foreground">{book.title}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{book.author}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                         {/* Font Size Controls */}
                         <div className="hidden md:flex items-center gap-1 bg-muted/30 rounded-lg p-1 border border-border">
                            <button onClick={() => setFontSize('sm')} className={cn("w-8 h-8 flex items-center justify-center rounded text-xs font-serif hover:bg-background transition-colors", fontSize === 'sm' && "bg-background text-foreground shadow-sm font-bold")}>A</button>
                            <button onClick={() => setFontSize('md')} className={cn("w-8 h-8 flex items-center justify-center rounded text-sm font-serif hover:bg-background transition-colors", fontSize === 'md' && "bg-background text-foreground shadow-sm font-bold")}>A</button>
                            <button onClick={() => setFontSize('lg')} className={cn("w-8 h-8 flex items-center justify-center rounded text-lg font-serif hover:bg-background transition-colors", fontSize === 'lg' && "bg-background text-foreground shadow-sm font-bold")}>A</button>
                        </div>

                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Icon name="bookmark" size="size-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                
                {/* LEFT SIDEBAR: TOC */}
                <aside className="w-80 border-r border-border bg-card hidden lg:flex flex-col">
                    <div className="p-6">
                        <div className="aspect-[2/3] w-32 mx-auto rounded-lg shadow-lg overflow-hidden border border-white/10 mb-6 relative group">
                            <img src={book.cover} alt="Cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="text-center mb-6">
                            <Badge variant="outline" className="border-border text-muted-foreground bg-muted/30 mb-2">{book.category}</Badge>
                            <p className="text-xs text-muted-foreground font-serif">Tempo de leitura: {book.readTime}</p>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 px-4 pb-4">
                        <div className="space-y-1">
                            <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Capítulos</p>
                            {chapters.map((chapter, i) => (
                                <button 
                                    key={chapter.id}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-start gap-3 group",
                                        i === 1 ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    <span className={cn("mt-0.5 text-xs font-mono opacity-50 group-hover:opacity-100", i === 1 && "text-primary opacity-100")}>0{chapter.id}</span>
                                    <span className="leading-snug">{chapter.title}</span>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </aside>

                {/* MAIN CONTENT: SCROLLABLE TEXT */}
                <div className="flex-1 relative bg-background" onScroll={handleScroll} style={{ overflowY: 'auto' }}>
                    <div className="max-w-3xl mx-auto py-12 px-6 md:px-12">
                        
                        {/* Title Section */}
                        <div className="text-center mb-16 space-y-6">
                            <span className="text-sm font-bold text-primary tracking-widest uppercase">Capítulo 2</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                                Escolha: O Poder Invencível
                            </h1>
                            <div className="w-16 h-1 bg-border mx-auto rounded-full"></div>
                        </div>

                        {/* Article Body */}
                        <article className={cn(
                            "prose dark:prose-invert max-w-none text-foreground/90 font-serif leading-loose transition-all duration-300",
                            fontSize === 'sm' && "prose-base",
                            fontSize === 'md' && "prose-lg",
                            fontSize === 'lg' && "prose-xl"
                        )}>
                            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                                Temos perdido nossa capacidade de escolher. Aprendemos o desamparo. Nos esquecemos de que temos uma opção em praticamente tudo o que fazemos.
                            </p>
                            
                            <p>
                                O essencialismo não é sobre fazer mais coisas em menos tempo. Não é sobre fazer menos só por fazer menos. É sobre fazer apenas as coisas certas. É sobre investir seu tempo e energia no mais alto nível de contribuição possível.
                            </p>

                            <h3>A Realidade do Trade-off</h3>
                            <p>
                                Não podemos ter tudo e fazer tudo. Quando tentamos, fazemos trade-offs por padrão, não por design. Se não escolhermos onde focar nossas energias, outras pessoas escolherão por nós.
                            </p>
                            
                            <div className="my-10 p-8 bg-muted/20 border-l-4 border-brand-gold rounded-r-lg italic text-foreground/80">
                                "Se você não priorizar sua vida, alguém o fará."
                            </div>

                            <p>
                                A palavra prioridade veio para a língua inglesa no século 14. Era singular. Significava a primeira coisa ou a coisa anterior. Permaneceu singular pelos próximos quinhentos anos.
                            </p>
                            
                            <p>
                                Somente nos anos 1900 pluralizamos o termo e começamos a falar de "prioridades". Ilogicamente, raciocinamos que ao mudar a palavra poderíamos dobrar a realidade. De alguma forma, agora seríamos capazes de ter múltiplas "primeiras" coisas.
                            </p>

                            <h3>Menos, mas melhor</h3>
                            <p>
                                O caminho do essencialista é a busca incansável pelo menos, mas melhor. Não significa ocasionalmente dar um passo atrás. Significa disciplinar-se para buscar menos, filtrar o ruído e focar no essencial.
                            </p>

                            <ul>
                                <li><strong>Explore:</strong> Discernir o trivial vital dos muitos triviais.</li>
                                <li><strong>Elimine:</strong> Cortar o trivial.</li>
                                <li><strong>Execute:</strong> Remover obstáculos e fazer a execução sem esforço.</li>
                            </ul>

                            <p>
                                Lembre-se: o essencialismo não é uma coisa a mais que você faz. É uma maneira diferente de fazer tudo.
                            </p>
                        </article>

                        {/* Footer Actions */}
                        <div className="mt-20 pt-10 border-t border-border flex justify-between items-center">
                            <div className="text-left">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Anterior</p>
                                <h4 className="font-bold text-foreground">A Disciplina da Busca</h4>
                            </div>
                            <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90 h-12 px-8 rounded-full">
                                Próximo Capítulo <Icon name="arrow-right" />
                            </Button>
                        </div>
                        
                    </div>
                </div>

                {/* RIGHT SIDEBAR: Key Insights (Sticky) */}
                <aside className="w-80 border-l border-border bg-card hidden xl:block p-6 overflow-y-auto">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                        <Icon name="lightbulb" className="text-brand-gold" /> Key Insights
                    </h3>
                    
                    <div className="space-y-4">
                        <Card className="bg-background border-border shadow-sm">
                            <CardContent className="p-4">
                                <p className="text-sm font-serif italic text-foreground/80 mb-3">
                                    "Se você não priorizar sua vida, alguém o fará."
                                </p>
                                <div className="flex justify-end">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-brand-gold">
                                        <Icon name="share" size="size-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-brand-gold">
                                        <Icon name="copy" size="size-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-background border-border shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex gap-2 items-center mb-2">
                                    <Icon name="bookmark" type="solid" className="text-brand-gold" size="size-3" />
                                    <span className="text-xs font-bold text-foreground">Conceito Chave</span>
                                </div>
                                <p className="text-sm text-muted-foreground font-serif">
                                    A origem da palavra "prioridade" era singular. Tentar ter várias prioridades é uma ilusão moderna.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mt-8">
                            <h4 className="font-bold text-primary text-sm mb-2">Plano de Ação</h4>
                            <p className="text-xs text-muted-foreground mb-4">
                                Liste 3 atividades que você faz hoje apenas por obrigação social e planeje como eliminá-las.
                            </p>
                            <Button size="sm" variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 text-xs">
                                Abrir Workbook
                            </Button>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default LmsBookReadTemplate;
