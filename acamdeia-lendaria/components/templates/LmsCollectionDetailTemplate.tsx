
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Symbol } from '../ui/symbol';

interface LmsCollectionDetailTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsCollectionDetailTemplate: React.FC<LmsCollectionDetailTemplateProps> = ({ onNavigate }) => {
    
    const collection = {
        title: "Arquitetura da Mente Exponencial",
        subtitle: "A fundação para quem constrói sistemas de escala global.",
        curator: {
            name: "Alan Nicolas",
            role: "Founder & System Architect",
            avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj"
        },
        description: "Esta curadoria não foca em táticas passageiras. O objetivo aqui é o Deep Work, a engenharia de hábitos e a compreensão profunda de como sistemas moldam comportamentos. Se você deseja sair do operacional, este é o seu mapa.",
        stats: {
            books: 4,
            duration: "1h 54m",
            sync: 96
        },
        books: [
            {
                id: 'b1',
                title: "Atomic Habits",
                author: "James Clear",
                category: "SISTEMAS",
                cover: "https://m.media-amazon.com/images/I/81Ykq87N65L._SY466_.jpg",
                duration: "18 min",
                completed: true,
                insight: "O sucesso é o subproduto de sistemas, não de metas."
            },
            {
                id: 'b2',
                title: "Deep Work",
                author: "Cal Newport",
                category: "PRODUTIVIDADE",
                cover: "https://m.media-amazon.com/images/I/417767S87uL._SY445_SX342_.jpg",
                duration: "22 min",
                completed: false,
                insight: "A capacidade de focar é o novo superpoder da economia."
            },
            {
                id: 'b3',
                title: "Stillness Is The Key",
                author: "Ryan Holiday",
                category: "FILOSOFIA",
                cover: "https://m.media-amazon.com/images/I/41k-j6pxC6L._SY445_SX342_.jpg",
                duration: "15 min",
                completed: false,
                insight: "Decisões lendárias nascem do silêncio, não do barulho."
            },
            {
                id: 'b4',
                title: "The 48 Laws of Power",
                author: "Robert Greene",
                category: "ESTRATÉGIA",
                cover: "https://m.media-amazon.com/images/I/71aLultW5EL._SY466_.jpg",
                duration: "59 min",
                completed: false,
                insight: "Poder é a maestria sobre as leis invisíveis do comportamento humano."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in pb-40 overflow-x-hidden selection:bg-primary/30">
            
            {/* Backdrop Imersivo */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03]"></div>
            </div>

            {/* Header HUD Style */}
            <header className="sticky top-0 z-50 bg-transparent backdrop-blur-3xl border-b border-white/5 h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-500 hover:text-white gap-4 pl-0 font-black uppercase tracking-[0.4em] text-[9px]"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                    >
                        <Icon name="arrow-left" size="size-3" /> Biblioteca
                    </Button>
                    
                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-6 mr-2">
                             <Symbol name="infinity" className="text-primary" /> Lendária Vault
                         </div>
                         <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                            <Icon name="share" />
                         </Button>
                    </div>
                </div>
            </header>

            <main className="relative z-10">
                {/* --- HERO: COLLECTION MANIFESTO --- */}
                <section className="container max-w-7xl mx-auto px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        
                        {/* Visual Artifact (Stack) */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative group perspective-1000 w-full max-w-[320px]">
                                <div className="absolute inset-10 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                
                                {/* 3D Stack Mockup */}
                                <div className="relative aspect-[3/4] rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.7)] flex items-center justify-center p-10 overflow-hidden transform rotate-y-[-10deg] transition-all duration-1000 group-hover:rotate-y-0 group-hover:-translate-y-4">
                                     {/* Stack Visual Layers */}
                                     <div className="absolute top-0 right-0 w-full h-full bg-white/5 translate-x-3 translate-y-3 rounded-[2.5rem] -z-10 border border-white/5"></div>
                                     <div className="absolute top-0 right-0 w-full h-full bg-white/5 translate-x-6 translate-y-6 rounded-[2.5rem] -z-20 border border-white/5"></div>
                                     
                                     <div className="text-center space-y-6">
                                         <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 shadow-glow">
                                             <Icon name="layers" size="size-7" />
                                         </div>
                                         <h3 className="text-2xl font-bold font-sans tracking-tight leading-tight uppercase px-4">{collection.title}</h3>
                                         <Separator className="w-12 mx-auto bg-primary/30" />
                                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Curadoria v4.1</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Manifesto Info */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.6em] text-[10px] font-black">
                                    COLEÇÃO TEMÁTICA
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white">
                                    {collection.title.split(' ')[0]} <br/>
                                    <span className="text-zinc-600 italic font-serif font-light tracking-normal">{collection.title.split(' ').slice(1).join(' ')}</span>
                                </h1>
                                <p className="text-2xl font-serif font-light italic text-zinc-400 leading-snug border-l-2 border-primary/20 pl-8">
                                    "{collection.subtitle}"
                                </p>
                            </div>

                            <div className="max-w-[65ch]">
                                <p className="text-lg text-zinc-500 font-serif leading-relaxed italic">
                                    {collection.description}
                                </p>
                            </div>

                            {/* Curator Section */}
                            <div className="flex items-center gap-6 pt-4">
                                <Avatar className="w-14 h-14 border-2 border-primary shadow-xl">
                                    <AvatarImage src={collection.curator.avatar} className="grayscale hover:grayscale-0 transition-all duration-700" />
                                    <AvatarFallback>AN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1">Curado por</p>
                                    <p className="text-lg font-bold text-white">{collection.curator.name}</p>
                                    <p className="text-[10px] text-zinc-600 font-mono">{collection.curator.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- METADATA DOSSIER BAR --- */}
                <div className="container max-w-7xl mx-auto px-8 mb-32">
                    <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center shadow-2xl">
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">VOLUME COLETIVO</p>
                            <p className="text-2xl font-black font-mono tracking-tighter text-white">{collection.stats.books} OBRAS</p>
                        </div>
                        <div className="space-y-2 border-x border-white/5">
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">TEMPO DE IMERSÃO</p>
                            <p className="text-2xl font-black font-mono tracking-tighter text-white">{collection.stats.duration}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">SYNC SCORE MÉDIO</p>
                            <p className="text-2xl font-black font-mono tracking-tighter text-primary">{collection.stats.sync}%</p>
                        </div>
                    </div>
                </div>

                {/* --- THE GALLERY: EXHIBITION MODE --- */}
                <section className="container max-w-7xl mx-auto px-8 space-y-24">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">A Trilha de Conhecimento</h2>
                        <Button variant="outline" className="rounded-full border-white/10 text-zinc-500 hover:text-white h-10 px-6 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                             Salvar Coleção <Icon name="plus" className="ml-2" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
                        {collection.books.map((book, i) => (
                            <div key={book.id} className="group flex flex-col md:flex-row gap-10 items-start animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                                
                                {/* Artwork Frame */}
                                <div className="relative shrink-0 perspective-1000 cursor-pointer" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_OVERVIEW)}>
                                    <div className="absolute inset-4 bg-primary/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    <div className="w-40 md:w-48 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative z-10 transition-all duration-1000 group-hover:-translate-y-4 group-hover:scale-[1.02] bg-zinc-900">
                                        <img src={book.cover} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        {book.completed && (
                                            <div className="absolute top-3 right-3 bg-green-500 text-black p-1.5 rounded-full shadow-lg z-20 animate-scale-in">
                                                <Icon name="check" size="size-3" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Order Number Marker */}
                                    <div className="absolute -left-4 -top-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black text-xs z-30 shadow-2xl border border-white/10">
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Curated Context */}
                                <div className="flex-1 space-y-6 py-2">
                                    <div className="space-y-3">
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">{book.category}</p>
                                        <h3 className="text-3xl font-bold text-white leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_OVERVIEW)}>
                                            {book.title}
                                        </h3>
                                        <p className="text-base text-zinc-500 font-serif italic opacity-70">por {book.author}</p>
                                    </div>

                                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-3 relative group/card hover:bg-white/[0.03] transition-colors">
                                        <Icon name="quote-right" className="absolute top-4 right-4 text-primary/10 text-3xl" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700">Insight Vital</span>
                                        <p className="text-sm text-zinc-400 font-serif italic leading-relaxed pr-6">
                                            "{book.insight}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-8 pt-4">
                                        <Button 
                                            size="sm" 
                                            className="h-12 px-10 rounded-xl bg-foreground text-background font-black text-[9px] uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                                            onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_READ)}
                                        >
                                            Iniciar Estudo
                                        </Button>
                                        <span className="text-[10px] font-mono font-bold text-zinc-600 flex items-center gap-2">
                                            <Icon name="clock" size="size-3" /> {book.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FOOTER: PROGRESSION --- */}
                <footer className="container max-w-4xl mx-auto px-8 pt-64 pb-48 text-center space-y-12 relative">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent"></div>
                    
                    <div className="space-y-6">
                        <Badge variant="outline" className="text-zinc-600 border-white/10 uppercase tracking-[0.8em] text-[10px] font-black px-8 py-2 rounded-full">
                            COMPROMISSO LENDÁRIO
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-light font-serif italic text-white leading-tight">
                            Domine o <span className="text-primary font-bold not-italic">Sistema</span>.<br/>Imortalize seu <span className="text-primary font-bold not-italic">Legado</span>.
                        </h2>
                    </div>

                    <div className="flex justify-center pt-8">
                        <Button className="h-20 px-16 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-[0_30px_80px_rgba(201,178,152,0.3)] active:scale-95">
                            Concluir Curadoria
                        </Button>
                    </div>
                </footer>
            </main>

            {/* Global Minimal Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
        </div>
    );
};

export default LmsCollectionDetailTemplate;
