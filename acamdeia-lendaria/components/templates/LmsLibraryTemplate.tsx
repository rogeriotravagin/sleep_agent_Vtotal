
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

interface LmsLibraryTemplateProps {
    onNavigate?: (section: Section) => void;
}

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    coverColor?: string; 
    coverImage?: string;
    summary: string;
    tags: string[];
    isAudio?: boolean;
}

const LmsLibraryTemplate: React.FC<LmsLibraryTemplateProps> = ({ onNavigate }) => {
    
    // --- Mock Data: New Releases (Destaques Grandes) ---
    const newReleases = [
        {
            id: 'nr1',
            title: "Badass Habits",
            author: "Jen Sincero",
            category: "Produtividade",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
            bg: "bg-[#2D2436]", // Dark Purple tone
            accent: "text-purple-400"
        },
        {
            id: 'nr2',
            title: "Superbloom",
            author: "Nicholas Carr",
            category: "Sociedade",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop",
            bg: "bg-[#1F1A18]", // Dark Brown tone
            accent: "text-orange-400"
        }
    ];

    // --- Mock Data: Popular Books (Carrossel) ---
    const popularBooks: Book[] = [
        { id: 'pb1', title: "Atomic Habits", author: "James Clear", category: "Motivação", coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop", summary: "Mudanças pequenas, resultados notáveis.", tags: [], isAudio: true },
        { id: 'pb2', title: "The 5 Types of Wealth", author: "Sahil Bloom", category: "Saúde", coverImage: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300&auto=format&fit=crop", summary: "Riqueza além do dinheiro.", tags: [], isAudio: true },
        { id: 'pb3', title: "The 48 Laws of Power", author: "Robert Greene", category: "Comunicação", coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop", summary: "Manipulação e poder.", tags: [], isAudio: true },
        { id: 'pb4', title: "Think Faster, Talk Smarter", author: "Matt Abrahams", category: "Comunicação", coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop", summary: "Comunicação assertiva.", tags: [], isAudio: true },
        { id: 'pb5', title: "Deep Work", author: "Cal Newport", category: "Produtividade", coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=300&auto=format&fit=crop", summary: "Foco em um mundo distraído.", tags: [], isAudio: true },
    ];

    // --- Mock Data: Collections ---
    const collections = [
        { id: 'c1', title: "Como ser Feliz", books: 9, color: "bg-yellow-500", icon: "smile" },
        { id: 'c2', title: "Exercício e Cérebro", books: 6, color: "bg-orange-500", icon: "running" },
        { id: 'c3', title: "Sucesso e Mentalidade", books: 5, color: "bg-brand-gold", icon: "trophy" },
    ];

    // --- Mock Data: Categories ---
    const categories = [
        "Todos", "Negócios", "Filosofia", "Tecnologia", "Biografias", "Psicologia", "Vendas", "Marketing", "Ficção Científica"
    ];

    // --- Mock Data: General Library (Existing) ---
    const generalBooks: Book[] = [
        { id: '1', title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", category: "Filosofia", coverColor: "bg-amber-600", summary: "Uma exploração profunda sobre como a consciência e a inteligência emergem de sistemas formais.", tags: ["Complexidade", "IA"], isAudio: false },
        { id: '6', title: "Sintaxe da Linguagem Visual", author: "Donis A. Dondis", category: "Design", coverColor: "bg-cyan-600", summary: "O guia clássico para a alfabetização visual.", tags: ["Design", "Visual"], isAudio: false },
        { id: '7', title: "Zero to One", author: "Peter Thiel", category: "Negócios", coverColor: "bg-blue-600", summary: "Notas sobre startups e como construir o futuro.", tags: ["Startups", "Vendas"], isAudio: true },
        { id: '8', title: "Sapiens", author: "Yuval Noah Harari", category: "História", coverColor: "bg-yellow-600", summary: "Uma breve história da humanidade.", tags: ["Antropologia", "Sociedade"], isAudio: true },
    ];

    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20">
            
            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border h-16 transition-all duration-300">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground md:hidden"
                        >
                            <Icon name="menu-burger" size="size-4" />
                        </Button>
                        <span className="font-bold text-lg tracking-tight flex items-center gap-2">
                            <Icon name="book-open" className="text-brand-gold" /> Biblioteca
                        </span>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium text-muted-foreground">
                            <a href="#" className="text-foreground font-bold border-b-2 border-foreground h-16 flex items-center">Explorar</a>
                            <a href="#" className="hover:text-foreground transition-colors">Meus Livros</a>
                            <a href="#" className="hover:text-foreground transition-colors">Audiobooks</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64 hidden md:block">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                            <Input 
                                placeholder="Título, autor ou ISBN..." 
                                className="pl-9 h-9 bg-muted/30 border-border text-xs focus:border-brand-gold/50 rounded-full" 
                            />
                        </div>
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-6 py-8 space-y-12">
                
                {/* --- HERO SECTION --- */}
                <div className="relative rounded-2xl overflow-hidden bg-[#050505] border border-white/10 p-8 md:p-12 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    <div className="relative z-10 max-w-2xl space-y-6">
                        <Badge variant="outline" className="text-brand-gold border-brand-gold/30 bg-brand-gold/5 uppercase tracking-widest text-[10px]">
                            Biblioteca Lendária
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">
                            Expanda sua <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Consciência.</span>
                        </h1>
                        <p className="text-zinc-400 font-serif text-lg leading-relaxed">
                            Uma curadoria dos livros mais transformadores sobre negócios, filosofia e tecnologia.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Button className="bg-brand-gold text-black hover:bg-brand-gold/90 font-bold" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}>
                                <Icon name="book-open" className="mr-2" /> Continuar Lendo
                            </Button>
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                Ver Minha Lista
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- CATEGORIES --- */}
                <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-foreground text-background border-foreground font-bold"
                                    : "bg-card text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                            )}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- SECTION 1: NEW RELEASES --- */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold font-sans">Lançamentos</h2>
                        <Button size="sm" variant="secondary" className="rounded-full text-xs font-bold bg-brand-gold text-black hover:bg-brand-gold/90 h-7 px-4">
                            Ver todos <Icon name="angle-small-right" className="ml-1" />
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newReleases.map((book) => (
                            <div key={book.id} className={cn("rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:scale-[1.01] transition-transform shadow-lg", book.bg)}>
                                <div className="h-40 w-28 rounded-lg shadow-2xl shrink-0 overflow-hidden relative">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{book.category}</p>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white leading-tight">{book.title}</h3>
                                        <p className="text-sm text-zinc-400 font-serif mt-1">Por {book.author}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon name="check-circle" type="solid" className={cn("text-lg", book.accent)} />
                                        <Icon name="check-circle" type="solid" className={cn("text-lg", book.accent)} />
                                        <Icon name="check-circle" type="solid" className={cn("text-lg", book.accent)} />
                                        <Icon name="check-circle" type="solid" className={cn("text-lg", book.accent)} />
                                    </div>
                                    <p className={cn("text-xs font-bold", book.accent)}>Jen Sincero</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION 2: POPULAR BOOKS --- */}
                <section>
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold font-sans">Mais Populares</h2>
                        <Button size="sm" variant="outline" className="rounded-full text-xs font-bold h-7 px-4 border-muted-foreground/30 text-muted-foreground hover:text-foreground">
                            Ver todos <Icon name="angle-small-right" className="ml-1" />
                        </Button>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x -mx-6 px-6 md:mx-0 md:px-0">
                        {popularBooks.map((book) => (
                            <div 
                                key={book.id} 
                                className="min-w-[240px] bg-card border border-border/50 rounded-xl p-4 cursor-pointer hover:border-brand-gold/30 transition-colors group snap-start"
                                onClick={() => setSelectedBook(book)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    {book.isAudio && (
                                        <div className="p-1.5 rounded-full bg-muted/50 text-muted-foreground">
                                            <Icon name="headphones" size="size-3" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex justify-center mb-6 relative">
                                    <div className="w-32 h-48 rounded shadow-xl overflow-hidden relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Shadow for depth */}
                                    <div className="absolute bottom-0 w-28 h-4 bg-black/20 blur-lg rounded-full group-hover:w-24 group-hover:opacity-50 transition-all duration-300"></div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{book.category}</p>
                                    <h4 className="font-bold text-foreground text-base leading-tight truncate">{book.title}</h4>
                                    <p className="text-xs text-muted-foreground font-serif truncate">Por {book.author}</p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <Icon name="bookmark" className="text-muted-foreground hover:text-brand-gold transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION 3: COLLECTIONS --- */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold font-sans">Coleções</h2>
                        <Button size="sm" variant="outline" className="rounded-full text-xs font-bold h-7 px-4 border-muted-foreground/30 text-muted-foreground hover:text-foreground">
                            Ver todos <Icon name="angle-small-right" className="ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                            <div key={collection.id} className="bg-card border border-border/50 rounded-xl p-6 flex items-center gap-6 hover:bg-muted/10 transition-colors cursor-pointer group">
                                <div className="relative">
                                    {/* Stack Effect */}
                                    <div className="absolute top-0 right-0 w-20 h-24 bg-card border border-border rounded shadow-sm rotate-6 translate-x-2"></div>
                                    <div className="absolute top-0 right-0 w-20 h-24 bg-card border border-border rounded shadow-sm -rotate-3 translate-x-1"></div>
                                    {/* Main Cover */}
                                    <div className={cn("relative w-20 h-24 rounded flex items-center justify-center shadow-lg text-black", collection.color)}>
                                        <Icon name={collection.icon} size="size-8" />
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{collection.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{collection.books} livros</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION 4: GENERAL CATEGORIES --- */}
                <div className="pt-8 border-t border-border">
                    <h2 className="text-xl font-bold font-sans mb-6 text-muted-foreground">Todos os Livros</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {generalBooks
                            .filter(b => selectedCategory === "Todos" || b.category === selectedCategory)
                            .map((book) => (
                            <div 
                                key={book.id} 
                                className="group relative cursor-pointer"
                                onClick={() => setSelectedBook(book)}
                            >
                                <div className={cn(
                                    "aspect-[2/3] rounded-md shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl relative overflow-hidden",
                                    book.coverColor || "bg-zinc-700"
                                )}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>
                                    <div className="p-4 h-full flex flex-col justify-between relative z-10 bg-gradient-to-b from-transparent to-black/60">
                                        <div className="text-right"><Icon name="book" className="text-white/30" /></div>
                                        <div>
                                            <h4 className="font-serif font-bold text-white text-lg leading-tight line-clamp-3 mb-1 drop-shadow-md">{book.title}</h4>
                                            <p className="text-[10px] text-white/80 font-sans uppercase tracking-wider">{book.author}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Book Detail Sheet */}
            <Sheet open={!!selectedBook} onOpenChange={() => setSelectedBook(null)} className="w-full sm:max-w-md bg-card border-l border-border text-foreground p-0 overflow-y-auto">
                    {selectedBook && (
                        <>
                            <div className={cn("h-48 w-full relative bg-zinc-800")}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                {selectedBook.coverImage && <img src={selectedBook.coverImage} className="w-full h-full object-cover opacity-50" />}
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <Badge className="bg-white/20 text-white border-none hover:bg-white/30 mb-2 backdrop-blur-md">
                                        {selectedBook.category}
                                    </Badge>
                                    <SheetTitle className="text-3xl font-serif font-bold text-white leading-tight">
                                        {selectedBook.title}
                                    </SheetTitle>
                                    <p className="text-white/80 text-sm mt-1">por {selectedBook.author}</p>
                                </div>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
                                    onClick={() => setSelectedBook(null)}
                                >
                                    <Icon name="cross" />
                                </Button>
                            </div>

                            <div className="p-6 space-y-8">
                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-brand-gold text-black hover:bg-brand-gold/90 font-bold" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_SUMMARY)}>
                                        <Icon name="play" className="mr-2" size="size-4" /> Ler Resumo
                                    </Button>
                                    <Button variant="outline" size="icon" className="border-border hover:bg-muted text-foreground">
                                        <Icon name="plus" size="size-4" />
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <SheetDescription className="text-base text-muted-foreground font-serif leading-relaxed">
                                        {selectedBook.summary}
                                    </SheetDescription>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBook.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
            </Sheet>

        </div>
    );
};

export default LmsLibraryTemplate;
