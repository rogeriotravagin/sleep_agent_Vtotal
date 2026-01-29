
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Rating } from '../ui/rating';
import { Symbol } from '../ui/symbol';

interface LmsBookOverviewTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsBookOverviewTemplate: React.FC<LmsBookOverviewTemplateProps> = ({ onNavigate }) => {
    
    const bookData = {
        title: "The Atomic Habits Workbook",
        subtitle: "Simple Exercises for Building the Life You Want",
        author: "James Clear",
        authorFollowers: "15.1k",
        authorBooks: 80,
        cover: "https://m.media-amazon.com/images/I/81Ykq87N65L._SY466_.jpg", 
        rating: 4.62,
        ratingsCount: 47,
        reviewsCount: 6,
        pages: 288,
        publishedDate: "December 9, 2025",
        edition: "Kindle Edition",
        currentlyReading: 281,
        wantToRead: 434,
        description: "An interactive guide to building good habits and breaking bad ones, based on the 25-million copy #1 New York Times bestseller Atomic Habits. This workbook provides a structured way to implement the principles of habit formation in your daily life.",
        genres: ["Self Help", "Productivity", "Nonfiction", "Psychology"],
        aboutAuthor: {
            name: "James Clear",
            avatar: "https://jamesclear.com/wp-content/uploads/2023/11/james-clear-headshot.png",
            bio: "James Clear is the author of the #1 New York Times bestseller Atomic Habits. His work has been featured in the New York Times, Time magazine, and the Wall Street Journal."
        }
    };

    const [userRating, setUserRating] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-32 selection:bg-primary/30">
            
            {/* Header Adaptive Glassmorphism */}
            <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-3xl border-b border-border h-20 transition-all duration-300">
                <div className="container max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground gap-3 pl-0 font-black uppercase tracking-[0.3em] text-[9px]"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                    >
                        <Icon name="arrow-left" size="size-3" /> Explorar Acervo
                    </Button>
                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Icon name="share" size="size-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    
                    {/* --- COLUNA ESQUERDA: CAPA & CTAs --- */}
                    <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                        <div className="space-y-10">
                            {/* Book Cover com Sombra de Luxo */}
                            <div className="w-full aspect-[2/3] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] overflow-hidden border border-border/40 relative group bg-muted transition-transform duration-700 hover:scale-[1.02]">
                                <img src={bookData.cover} alt={bookData.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* CTAs Luxury Layout */}
                            <div className="flex flex-col gap-4">
                                <div className="flex">
                                    <Button 
                                        className="flex-1 bg-foreground text-background hover:opacity-90 font-black uppercase tracking-[0.2em] text-[10px] h-14 rounded-2xl rounded-r-none border-r border-background/10"
                                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}
                                    >
                                        Quero Ler
                                    </Button>
                                    <Button className="bg-foreground text-background hover:opacity-90 w-14 h-14 rounded-2xl rounded-l-none border-l border-background/10">
                                        <Icon name="angle-small-down" />
                                    </Button>
                                </div>
                                <div className="flex">
                                    <Button variant="outline" className="flex-1 border-border font-black uppercase tracking-[0.2em] text-[10px] h-14 rounded-2xl rounded-r-none border-r-0">
                                        Kindle $16.99
                                    </Button>
                                    <Button variant="outline" className="border-border w-14 h-14 rounded-2xl rounded-l-none">
                                        <Icon name="angle-small-down" />
                                    </Button>
                                </div>
                            </div>

                            {/* User Interaction Rating */}
                            <div className="text-center space-y-4 py-8 bg-muted/20 rounded-[2rem] border border-border/50">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Avalie esta obra</p>
                                <div className="flex justify-center">
                                    <Rating value={userRating} onValueChange={setUserRating} className="gap-3" />
                                </div>
                                <p className="text-[10px] text-muted-foreground italic font-serif opacity-60">Sua opinião molda o acervo</p>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUNA DIREITA: INFO & SOCIAL --- */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        <div className="space-y-8">
                            {/* Title & Subtitle */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.5em] text-[9px] font-black px-4 py-1.5 rounded-full">
                                        ESSENCIAL
                                    </Badge>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter leading-[0.9]">
                                    {bookData.title}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl text-muted-foreground font-serif italic hover:text-primary transition-colors cursor-pointer">{bookData.author}</span>
                                    <Symbol name="star" className="text-brand-gold text-lg animate-pulse" />
                                </div>
                            </div>

                            {/* Global Rating Data */}
                            <div className="flex items-center gap-6">
                                <div className="flex text-brand-gold gap-1">
                                    {[1,2,3,4,5].map(i => <Icon key={i} name="star" type="solid" size="size-4" />)}
                                </div>
                                <div className="text-2xl font-black font-sans">{bookData.rating}</div>
                                <div className="h-4 w-px bg-border"></div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    {bookData.ratingsCount} Ratings • {bookData.reviewsCount} Reviews
                                </div>
                            </div>

                            <p className="text-2xl font-serif font-light italic text-foreground/80 leading-relaxed max-w-2xl border-l-2 border-primary/20 pl-8">
                                "{bookData.subtitle}"
                            </p>

                            <div className="prose dark:prose-invert max-w-none text-muted-foreground font-serif leading-[1.8] text-xl opacity-90">
                                <p>{bookData.description}</p>
                                <Button variant="link" className="px-0 h-auto font-black uppercase tracking-[0.3em] text-[9px] text-foreground gap-3 mt-4">
                                    Ler descrição completa <Icon name="angle-small-down" size="size-3" />
                                </Button>
                            </div>

                            {/* Genres Tags Luxury */}
                            <div className="flex flex-wrap gap-3 pt-6">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mr-4 mt-2">Gêneros:</span>
                                {bookData.genres.map(genre => (
                                    <Badge key={genre} variant="secondary" className="rounded-xl px-5 py-2 text-[10px] bg-muted/40 hover:bg-muted font-bold tracking-wider transition-all border border-transparent hover:border-border cursor-pointer">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>

                            {/* Technical Metadata */}
                            <div className="pt-10 flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-t border-border/50">
                                <span>{bookData.pages} páginas</span>
                                <span>{bookData.edition}</span>
                                <span>Publicado em {bookData.publishedDate}</span>
                            </div>
                        </div>

                        <Separator className="bg-border/40" />

                        {/* --- SOCIAL PROOF: WHO IS READING --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="flex -space-x-4">
                                    {[1,2,3,4].map(i => (
                                        <Avatar key={i} className="border-4 border-background ring-2 ring-transparent group-hover:ring-primary/30 transition-all w-12 h-12 shadow-lg">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=reader${i}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <p className="text-sm font-serif text-muted-foreground leading-snug">
                                    <strong className="text-foreground block text-lg mb-0.5">{bookData.currentlyReading} membros</strong> lendo no momento
                                </p>
                            </div>
                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="flex -space-x-4">
                                    {[4,5,6,7].map(i => (
                                        <Avatar key={i} className="border-4 border-background ring-2 ring-transparent group-hover:ring-primary/30 transition-all w-12 h-12 shadow-lg">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=want${i}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <p className="text-sm font-serif text-muted-foreground leading-snug">
                                    <strong className="text-foreground block text-lg mb-0.5">{bookData.wantToRead} membros</strong> na lista de desejos
                                </p>
                            </div>
                        </div>

                        <Separator className="bg-border/40" />

                        {/* --- ABOUT THE AUTHOR SECTION (VERIFIED LOOK) --- */}
                        <section className="space-y-12 pt-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">Sobre o Autor</h3>
                            
                            <div className="flex flex-col md:flex-row gap-12 items-start bg-card/40 border border-border/50 p-10 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-[12rem] pointer-events-none group-hover:scale-110 transition-transform">
                                    <Icon name="user" />
                                </div>

                                <div className="relative shrink-0">
                                    <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                                        <AvatarImage src={bookData.aboutAuthor.avatar} className="grayscale hover:grayscale-0 transition-all duration-700" />
                                        <AvatarFallback>JC</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-background p-1.5 rounded-full shadow-xl border-4 border-background">
                                        <Icon name="badge-check" type="solid" size="size-4" />
                                    </div>
                                </div>
                                
                                <div className="flex-1 space-y-6 relative z-10">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                        <div>
                                            <h4 className="text-3xl font-bold tracking-tight text-foreground">
                                                {bookData.aboutAuthor.name}
                                            </h4>
                                            <div className="flex gap-4 mt-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                                <span>{bookData.authorBooks} Obras</span>
                                                <span className="text-muted-foreground/30">•</span>
                                                <span>{bookData.authorFollowers} Seguidores</span>
                                            </div>
                                        </div>
                                        <Button 
                                            variant={isFollowed ? "outline" : "default"} 
                                            className={cn(
                                                "rounded-full px-10 font-black uppercase text-[10px] tracking-[0.3em] h-12 shadow-xl transition-all hover:scale-105 active:scale-95", 
                                                !isFollowed ? "bg-foreground text-background hover:bg-foreground/90" : "border-border text-foreground hover:bg-muted"
                                            )}
                                            onClick={() => setIsFollowed(!isFollowed)}
                                        >
                                            {isFollowed ? 'Seguindo' : 'Seguir Autor'}
                                        </Button>
                                    </div>

                                    <div className="font-serif text-muted-foreground leading-relaxed text-lg max-w-xl">
                                        <p>{bookData.aboutAuthor.bio}</p>
                                        <Button variant="link" className="px-0 h-auto font-black uppercase tracking-[0.3em] text-[9px] text-foreground gap-3 mt-6">
                                            Ver biografia completa <Icon name="angle-small-down" size="size-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default LmsBookOverviewTemplate;
