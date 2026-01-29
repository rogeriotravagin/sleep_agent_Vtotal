
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Separator } from '../ui/separator';

interface Author {
    id: string;
    name: string;
    role: string;
    category: string;
    booksCount: number;
    rating: number;
    image: string;
    verified: boolean;
    initial: string;
}

const LmsAuthorsTemplate: React.FC<{ onNavigate?: (s: Section) => void }> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState("A");

    const authors: Author[] = [
        { id: 'an', name: "Alan Nicolas", role: "FUNDADOR & ESTRATEGISTA", category: "NEGÓCIOS", booksCount: 12, rating: 4.9, image: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj", verified: true, initial: "A" },
        { id: 'rh', name: "Ryan Holiday", role: "FILÓSOFO ESTOICO", category: "FILOSOFIA", booksCount: 8, rating: 4.8, image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&auto=format&fit=crop", verified: true, initial: "R" },
        { id: 'jc', name: "James Clear", role: "MESTRE EM HÁBITOS", category: "PRODUTIVIDADE", booksCount: 4, rating: 5.0, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", verified: true, initial: "J" },
        { id: 'po', name: "Parmy Olson", role: "INVESTIGADORA TECH", category: "TECNOLOGIA", booksCount: 3, rating: 4.7, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", verified: true, initial: "P" },
        { id: 'rg', name: "Robert Greene", role: "ESTRATEGISTA DE PODER", category: "PSICOLOGIA", booksCount: 15, rating: 4.9, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", verified: true, initial: "R" },
    ];

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const filteredAuthors = authors.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-32 selection:bg-primary/30">
            
            {/* Header Glassmorphism Adaptive */}
            <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-3xl border-b border-border h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
                            <Symbol name="infinity" className="text-foreground text-2xl group-hover:scale-110 transition-transform" />
                            <span className="font-black text-[10px] uppercase tracking-[0.4em] text-foreground">Academia Lendária</span>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8">
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Explorar</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_AUTHORS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Autores</button>
                            <button onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Meus Livros</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="relative group hidden md:block">
                            <Icon name="search" className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size="size-3" />
                            <Input 
                                placeholder="BUSCAR MENTOR..." 
                                className="pl-8 h-10 w-64 bg-transparent border-none text-[9px] uppercase font-black tracking-[0.2em] focus:ring-0 rounded-none border-b border-border/50 focus:border-primary/40 transition-all" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Avatar className="h-9 w-9 border border-border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-8 py-20 space-y-32">
                
                {/* Hero Minimalista */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.4em] text-[9px] font-black px-6 py-2 rounded-full">
                        Curadoria de Mentes
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tighter leading-none">
                        Autores <br/><span className="text-muted-foreground font-serif italic font-light tracking-normal">& Mentores.</span>
                    </h1>
                    <p className="text-muted-foreground font-serif text-xl leading-relaxed italic opacity-80">
                        "Caminhe entre gigantes e herde a visão daqueles que moldaram o mundo."
                    </p>
                </div>

                {/* Alphabet Navigation (Floating Style) - Adaptive */}
                <div className="sticky top-24 z-40 flex justify-center">
                    <div className="flex bg-card/60 backdrop-blur-2xl rounded-full border border-border p-2 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                        {alphabet.map(letter => (
                            <button
                                key={letter}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-500",
                                    selectedLetter === letter
                                        ? "bg-foreground text-background shadow-xl scale-110"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setSelectedLetter(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Authors Gallery Grid */}
                <section className="space-y-24">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24">
                        {filteredAuthors.map((author) => (
                            <div 
                                key={author.id} 
                                className="group relative flex flex-col items-center text-center space-y-8 cursor-pointer perspective-1000"
                                onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)}
                            >
                                {/* Author Portrait with Adaptive Halo */}
                                <div className="relative w-40 h-40 md:w-48 md:h-48 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4">
                                    {/* Adaptive Halo Effect */}
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/10 group-hover:border-primary/40 transition-all z-10 p-2 bg-background">
                                        <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                            <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Verified Badge */}
                                    {author.verified && (
                                        <div className="absolute bottom-2 right-2 z-20 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center border-4 border-background shadow-lg scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                            <Icon name="badge-check" type="solid" size="size-3" />
                                        </div>
                                    )}
                                </div>

                                {/* Typography Refined */}
                                <div className="space-y-3 z-10">
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground transition-colors group-hover:text-primary">
                                        {author.role}
                                    </p>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {author.name}
                                    </h3>
                                    
                                    <Separator className="w-8 mx-auto bg-border group-hover:w-16 transition-all" />

                                    {/* Stats Row */}
                                    <div className="flex items-center justify-center gap-6 pt-2">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-mono font-bold text-muted-foreground">{author.booksCount}</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Obras</span>
                                        </div>
                                        <div className="w-px h-6 bg-border/50"></div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-brand-gold">
                                                {author.rating} <Icon name="star" type="solid" size="size-2" />
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Rating</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating View Button */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                                    <Button variant="ghost" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
                                        Explorar Acervo <Icon name="arrow-right" className="ml-2" size="size-2.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Decor Gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default LmsAuthorsTemplate;
