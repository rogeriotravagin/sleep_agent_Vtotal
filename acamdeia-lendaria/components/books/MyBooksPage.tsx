
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserBook {
    id: string;
    title: string;
    author: string;
    cover: string;
    status: 'reading' | 'want_to_read' | 'read';
    isFavorite: boolean;
    progress: number;
}

const MOCK_BOOKS: UserBook[] = [
    {
        id: '1',
        title: "The Obstacle Is The Way",
        author: "Ryan Holiday",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
        status: 'reading',
        isFavorite: true,
        progress: 82,
    },
    {
        id: '2',
        title: "21 Lições Para O Século 21",
        author: "Yuval Noah Harari",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop",
        status: 'want_to_read',
        isFavorite: false,
        progress: 0,
    },
    {
        id: '3',
        title: "A Psicologia do Dinheiro",
        author: "Morgan Housel",
        cover: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=1000&auto=format&fit=crop",
        status: 'read',
        isFavorite: true,
        progress: 100,
    }
];

const MyBooksPage: React.FC<{ onNavigate?: (s: Section) => void }> = ({ onNavigate }) => {
    const { toast } = useToast();
    const [books, setBooks] = useState<UserBook[]>(MOCK_BOOKS);
    const [activeTab, setActiveTab] = useState("reading");

    const filteredBooks = books.filter(b => 
        (activeTab === 'favorites' ? b.isFavorite : b.status === activeTab)
    );

    const weekDays = [
        { label: 'D', active: true },
        { label: 'S', active: true },
        { label: 'T', active: true },
        { label: 'Q', active: true },
        { label: 'Q', active: true },
        { label: 'S', active: true },
        { label: 'S', active: false, today: true },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-32">
            
            {/* Header Adaptive Glassmorphism */}
            <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-3xl border-b border-border h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
                            <Symbol name="infinity" className="text-foreground text-2xl group-hover:scale-110 transition-transform" />
                            <span className="font-black text-[10px] uppercase tracking-[0.4em] text-foreground">Academia Lendária</span>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8">
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Explorar</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_AUTHORS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Autores</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground border-b-2 border-primary pb-1">Meus Livros</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-8">
                        <Avatar className="h-9 w-9 border border-border shadow-sm">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* Header Hero com Saudação Adaptive */}
            <section className="pt-24 pb-20 border-b border-border/50">
                <div className="container max-w-6xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                        
                        <div className="lg:col-span-7 space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-none">
                                    Bem-vindo,<br/>
                                    <span className="text-primary italic font-serif font-light tracking-normal">Alan Nicolas.</span>
                                </h1>
                                <p className="text-2xl text-muted-foreground font-serif leading-relaxed max-w-lg italic opacity-80">
                                    "O conhecimento é o único ativo que não pode ser confiscado."
                                </p>
                            </div>

                            <div className="flex gap-6">
                                <Button className="bg-foreground text-background hover:opacity-90 rounded-2xl px-12 h-16 font-black uppercase tracking-[0.3em] text-[10px] shadow-xl transition-transform hover:scale-105" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}>
                                    Continuar Lendo
                                </Button>
                                <Button variant="outline" className="rounded-2xl px-12 h-16 border-border text-foreground font-black uppercase tracking-[0.3em] text-[10px] hover:bg-muted" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}>
                                    Explorar Acervo
                                </Button>
                            </div>
                        </div>

                        {/* Streak Card Adaptive */}
                        <div className="lg:col-span-5">
                            <div className="bg-card border border-border rounded-[3rem] p-10 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary),0.05),transparent_60%)]"></div>
                                
                                <div className="relative z-10 space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <h3 className="text-6xl font-black font-sans text-foreground tracking-tighter">12</h3>
                                            <p className="text-[9px] font-black text-brand-orange uppercase tracking-[0.5em] ml-1">Dias de Ofensiva</p>
                                        </div>
                                        <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shadow-[0_0_40px_rgba(255,149,0,0.15)] animate-pulse">
                                            <Icon name="flame" type="solid" size="size-8" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center bg-muted/30 p-8 rounded-3xl border border-border/50">
                                        {weekDays.map((day, i) => (
                                            <div key={i} className="flex flex-col items-center gap-4">
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest",
                                                    day.today ? "text-brand-orange" : "text-muted-foreground/50"
                                                )}>
                                                    {day.label}
                                                </span>
                                                <div className={cn(
                                                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-1000",
                                                    day.active 
                                                        ? "bg-brand-orange text-white shadow-[0_0_25px_rgba(255,149,0,0.3)] scale-110" 
                                                        : "bg-muted text-muted-foreground/30",
                                                    day.today && !day.active && "ring-1 ring-brand-orange ring-offset-4 ring-offset-card"
                                                )}>
                                                    {day.active ? <Icon name="check" size="size-3" className="font-black" /> : <div className="w-1 h-1 rounded-full bg-current"></div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container max-w-6xl mx-auto px-8 space-y-20 mt-20">
                
                {/* Tabs Minimalistas Adaptive */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-transparent h-auto p-0 gap-16 justify-start border-b border-border w-full rounded-none pb-0">
                        {[
                            { id: 'reading', label: 'Atuais' },
                            { id: 'want_to_read', label: 'Desejos' },
                            { id: 'read', label: 'Arquivados' },
                            { id: 'favorites', label: 'Favoritos' }
                        ].map(tab => (
                            <TabsTrigger 
                                key={tab.id}
                                value={tab.id} 
                                className="rounded-none border-b-2 border-transparent px-0 pb-8 text-[10px] font-black text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent transition-all uppercase tracking-[0.4em] hover:text-foreground/70"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Grid com Whitespace e Foco Visual Adaptive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div key={book.id} className="group flex flex-col md:flex-row gap-12 items-start animate-fade-in">
                                {/* Capa de Luxo Adaptive */}
                                <div className="relative shrink-0 perspective-1000">
                                    <div 
                                        className="w-48 md:w-56 aspect-[2/3] rounded-2xl shadow-xl overflow-hidden border border-border relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-6 group-hover:shadow-primary/10 cursor-pointer bg-card"
                                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_OVERVIEW)}
                                    >
                                        <img src={book.cover} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={book.title} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => toast({title: "Favoritos atualizados"})}
                                        className={cn(
                                            "absolute -top-4 -right-4 w-12 h-12 rounded-full border border-border shadow-2xl flex items-center justify-center transition-all z-20 backdrop-blur-3xl",
                                            book.isFavorite ? "bg-primary text-primary-foreground border-primary" : "bg-card/60 text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        <Icon name="heart" type={book.isFavorite ? "solid" : "regular"} size="size-4" />
                                    </button>
                                </div>

                                {/* Info Refinada Adaptive */}
                                <div className="flex-1 py-4 space-y-8 w-full">
                                    <div className="space-y-3">
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
                                            {book.author}
                                        </p>
                                        <h3 className="text-4xl font-bold font-serif leading-[1.1] text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_OVERVIEW)}>
                                            {book.title}
                                        </h3>
                                    </div>

                                    {book.status === 'reading' && (
                                        <div className="space-y-4 max-w-[240px]">
                                            <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                                <span>Conclusão</span>
                                                <span className="font-mono text-muted-foreground opacity-60">{book.progress}%</span>
                                            </div>
                                            <div className="h-[2px] w-full bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-2000" style={{ width: `${book.progress}%` }}></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-10 pt-8 border-t border-border/50">
                                        <button 
                                            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
                                        >
                                            <Icon name="pencil" size="size-3" /> Notas
                                        </button>
                                        <Button 
                                            size="sm" 
                                            className="h-14 px-12 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}
                                        >
                                            {book.status === 'read' ? 'Revisar' : 'Continuar'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center space-y-6">
                            <Icon name="box-open" className="mx-auto text-muted-foreground opacity-20" size="size-12" />
                            <p className="text-muted-foreground font-serif italic text-xl">Nada por aqui ainda.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyBooksPage;
