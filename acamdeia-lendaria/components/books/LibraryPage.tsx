
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Sheet, SheetTitle, SheetDescription } from '../ui/sheet';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Symbol } from '../ui/symbol';

interface LibraryPageProps {
    onNavigate?: (section: Section) => void;
}

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    coverImage: string;
    summary: string;
    isAudio?: boolean;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate }) => {
    
    const popularBooks: Book[] = [
        { id: 'pb1', title: "Atomic Habits", author: "James Clear", category: "PRODUTIVIDADE", coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop", summary: "Mudanças pequenas, resultados notáveis." },
        { id: 'pb2', title: "The 5 Types of Wealth", author: "Sahil Bloom", category: "ESTRATÉGIA", coverImage: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300&auto=format&fit=crop", summary: "Riqueza além do dinheiro." },
        { id: 'pb3', title: "The 48 Laws of Power", author: "Robert Greene", category: "COMUNICAÇÃO", coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop", summary: "Manipulação e poder." },
        { id: 'pb4', title: "Think Faster, Talk Smarter", author: "Matt Abrahams", category: "LIDERANÇA", coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop", summary: "Comunicação assertiva." },
        { id: 'pb5', title: "Deep Work", author: "Cal Newport", category: "FOCO", coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=300&auto=format&fit=crop", summary: "Foco em um mundo distraído." },
    ];

    const categories = ["Todos", "Negócios", "Filosofia", "Tecnologia", "Vendas", "Liderança"];
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-32 selection:bg-primary/30">
            
            {/* Header Adaptive Glassmorphism */}
            <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-3xl border-b border-border h-20 transition-all duration-500">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
                            <Symbol name="infinity" className="text-foreground text-2xl group-hover:scale-110 transition-transform" />
                            <span className="font-black text-[10px] uppercase tracking-[0.4em] text-foreground">Academia Lendária</span>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8">
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground border-b-2 border-primary pb-1">Explorar</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_AUTHORS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Autores</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Meus Livros</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="relative group hidden md:block">
                            <Icon name="search" className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size="size-3" />
                            <Input 
                                placeholder="BUSCAR..." 
                                className="pl-8 h-10 w-48 bg-transparent border-none text-[10px] uppercase font-black tracking-widest focus:ring-0 rounded-none border-b border-border/50 focus:border-primary/40 transition-all" 
                            />
                        </div>
                        <Avatar className="h-9 w-9 border border-border shadow-sm">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-8 py-16 space-y-32">
                
                {/* Hero Minimalista - Adaptive Background */}
                <div className="relative rounded-[3rem] overflow-hidden bg-card border border-border p-12 md:p-24 shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.05),transparent_70%)]"></div>
                    <div className="relative z-10 max-w-3xl space-y-10">
                        <div className="space-y-6">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.4em] text-[9px] font-black px-5 py-2 rounded-full">
                                Curadoria Exclusiva
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tighter leading-[0.9]">
                                Expanda sua <br/><span className="text-muted-foreground font-serif italic font-light tracking-normal">Consciência.</span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground font-serif text-2xl leading-relaxed max-w-xl opacity-80">
                            Onde a sabedoria secular encontra a potência da IA. Explore o topo da produção intelectual.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <Button className="bg-foreground text-background hover:opacity-90 font-black uppercase tracking-[0.3em] text-[10px] h-16 px-12 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}>
                                Continuar Leitura
                            </Button>
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted font-black uppercase tracking-[0.3em] text-[10px] h-16 px-12 rounded-2xl" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)}>
                                Ver Minha Lista
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none text-foreground">
                        <Icon name="book-open" className="text-[35rem] rotate-12" />
                    </div>
                </div>

                {/* Filtros Flutuantes Adaptive */}
                <div className="flex justify-center">
                    <div className="flex bg-card/60 backdrop-blur-2xl rounded-full border border-border p-2 shadow-2xl">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={cn(
                                    "px-10 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-700",
                                    selectedCategory === cat
                                        ? "bg-foreground text-background shadow-xl scale-105"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de Livros "Art Gallery" - Adaptive */}
                <section className="space-y-16">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Lançamentos Recentes</h2>
                        <div className="h-px w-32 bg-border"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16">
                        {popularBooks.map((book) => (
                            <div 
                                key={book.id} 
                                className="group space-y-8 cursor-pointer text-center"
                                onClick={() => setSelectedBook(book)}
                            >
                                {/* Capa com Aura e Efeito de Elevação */}
                                <div className="relative aspect-[2/3] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-6">
                                    {/* Adaptive Ambient Glow */}
                                    <div className="absolute inset-8 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-border/10 z-10 transition-all group-hover:border-primary/40 bg-card">
                                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    </div>

                                    {/* Botão de Ação Rápida Flutuante */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center shadow-2xl border border-border">
                                            <Icon name="play" size="size-3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Tipografia Minimalista */}
                                <div className="space-y-3 px-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground transition-colors group-hover:text-primary">
                                        {book.category}
                                    </p>
                                    <h4 className="font-bold text-foreground text-lg leading-tight transition-all group-hover:text-primary">
                                        {book.title}
                                    </h4>
                                    <p className="text-[11px] text-muted-foreground font-serif italic opacity-70">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Book Detail - Full Height Slide Out Adaptive */}
            <Sheet open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
                <div className="w-full sm:max-w-lg bg-background border-l border-border p-0 overflow-y-auto h-full flex flex-col animate-slide-in-right shadow-2xl">
                    {selectedBook && (
                        <>
                            <div className="h-[40vh] w-full relative overflow-hidden flex items-center justify-center pt-20">
                                <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-150" style={{ backgroundImage: `url(${selectedBook.coverImage})` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                                
                                <div className="relative z-10 w-44 aspect-[2/3] rounded-xl shadow-2xl overflow-hidden border border-border/20 animate-fade-in bg-card">
                                    <img src={selectedBook.coverImage} className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>

                            <div className="p-12 space-y-12 flex-1">
                                <div className="text-center space-y-4">
                                    <Badge className="bg-primary/5 text-primary border-primary/20 uppercase tracking-[0.4em] text-[9px] font-black rounded-full px-6">
                                        {selectedBook.category}
                                    </Badge>
                                    <h2 className="text-4xl font-bold tracking-tight text-foreground">{selectedBook.title}</h2>
                                    <p className="text-muted-foreground font-serif italic text-xl">{selectedBook.author}</p>
                                </div>

                                <div className="flex gap-4">
                                    <Button className="flex-1 h-16 bg-foreground text-background hover:opacity-90 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-lg" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_SUMMARY)}>
                                        <Icon name="play" className="mr-3" size="size-4" /> Ler Resumo
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-border hover:bg-muted text-foreground">
                                        <Icon name="bookmark" size="size-5" />
                                    </Button>
                                </div>

                                <Separator className="bg-border/50" />

                                <div className="space-y-8 text-center md:text-left">
                                    <p className="text-muted-foreground font-serif text-xl leading-relaxed italic px-4 opacity-90">
                                        "{selectedBook.summary}"
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">Tempo Estimado</p>
                                            <p className="text-base font-bold text-foreground">18 MINUTOS</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">Formato</p>
                                            <p className="text-base font-bold text-foreground">ÁUDIO + TEXTO</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-12 pt-0">
                                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-[9px] font-black uppercase tracking-[0.5em] transition-all" onClick={() => setSelectedBook(null)}>
                                    Recuar Detalhes
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Sheet>

        </div>
    );
};

export default LibraryPage;
