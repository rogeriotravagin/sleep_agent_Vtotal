
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
// Add missing CardHeader and CardTitle imports
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useToast } from '../../hooks/use-toast';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Symbol } from '../ui/symbol';

interface Highlight {
    id: string;
    text: string;
    date: string;
    location: string;
    note?: string;
    isEditingNote?: boolean;
}

const LmsBookHighlightsTemplate: React.FC<{ onNavigate?: (s: Section) => void }> = ({ onNavigate }) => {
    const { toast } = useToast();
    
    const book = {
        title: "Stillness Is The Key",
        author: "Ryan Holiday",
        cover: "https://m.media-amazon.com/images/I/41k-j6pxC6L._SY445_SX342_.jpg",
        category: "FILOSOFIA ESTOICA",
        totalHighlights: 12
    };

    const [highlights, setHighlights] = useState<Highlight[]>([
        { 
            id: '1', 
            text: "A quietude mental é a capacidade de ver o 'tabuleiro de xadrez' da vida com clareza, sem a névoa da ansiedade, do ego ou da informação excessiva. É o domínio sobre o pensamento, a capacidade de pensar antes de reagir.",
            date: "03 JAN 2026",
            location: "Cap. 2 • Pág 42",
            note: "Conceito vital para tomada de decisão sob pressão. Relacionar com o framework de 'Deep Work' do Cal Newport."
        },
        { 
            id: '2', 
            text: "O mundo está em guerra por sua atenção. Onde você a coloca é onde você vive.",
            date: "03 JAN 2026",
            location: "Cap. 1 • Pág 15",
            note: ""
        }
    ]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copiado para o Segundo Cérebro", variant: "success" });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in pb-40 overflow-x-hidden selection:bg-primary/30">
            
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

            {/* Smart Navigation */}
            <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-3xl border-b border-white/5 h-20">
                <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-500 hover:text-white gap-4 pl-0 font-black uppercase tracking-[0.4em] text-[9px]"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_MY_BOOKS)}
                    >
                        <Icon name="arrow-left" size="size-3" /> Meus Livros
                    </Button>
                    
                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-6 mr-2">
                             <Symbol name="infinity" className="text-primary" /> Lendária Vault
                         </div>
                         <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                            <Icon name="download" />
                         </Button>
                    </div>
                </div>
            </nav>

            {/* --- HEADER: ARTIFACT DOSSIER --- */}
            <header className="container max-w-7xl mx-auto px-8 pt-16 pb-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.6em] text-[10px] font-black px-6 py-2 rounded-full">
                                {book.category}
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-white">
                                {book.title.split('Is')[0]} <br/>
                                <span className="text-zinc-600 italic font-serif font-light tracking-normal">Is The Key</span>
                            </h1>
                            <p className="text-2xl font-serif italic text-zinc-400 opacity-80 pt-2">Por {book.author}</p>
                        </div>
                    </div>
                    
                    {/* Book Metadata Badge */}
                    <div className="lg:col-span-4 flex justify-end">
                        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] flex gap-12 shadow-2xl backdrop-blur-xl">
                            <div className="text-center space-y-1">
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Highlights</span>
                                <p className="text-2xl font-black font-mono text-primary">{book.totalHighlights}</p>
                            </div>
                            <div className="w-px h-10 bg-white/5"></div>
                            <div className="text-center space-y-1">
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Sincronia</span>
                                <p className="text-2xl font-black font-mono text-white">98%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Separator className="container max-w-7xl mx-auto bg-white/5" />

            {/* --- MAIN CONTENT: THE ARTIFACTS --- */}
            <main className="container max-w-7xl mx-auto px-8 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Highlights Stream */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-500">Fluxo de Insights</h2>
                        <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white" onClick={() => handleCopy("All Highlights")}>
                            <Icon name="copy" className="mr-2" size="size-3" /> Copiar Todos
                        </Button>
                    </div>

                    <div className="space-y-16">
                        {highlights.map((h, i) => (
                            <div key={h.id} className="animate-fade-in group" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className="space-y-8">
                                    {/* The Highlight Card (Luxury 2.0) */}
                                    <div className="relative">
                                        {/* Golden Indicator */}
                                        <div className="absolute -left-8 top-2 bottom-2 w-1 bg-primary/20 rounded-full group-hover:bg-primary transition-colors duration-700"></div>
                                        
                                        <div className="space-y-6">
                                            {/* Meta Row */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-mono font-bold text-zinc-600 tracking-widest uppercase">
                                                    {h.location} • {h.date}
                                                </span>
                                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <button className="text-zinc-600 hover:text-primary transition-colors" title="Exportar">
                                                        <Icon name="rocket" size="size-3" />
                                                    </button>
                                                    <button className="text-zinc-600 hover:text-primary transition-colors" onClick={() => handleCopy(h.text)} title="Copiar">
                                                        <Icon name="copy" size="size-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Scientific Reading Container (max-w-65ch) */}
                                            <p className="text-2xl md:text-3xl font-serif text-zinc-200 leading-[1.6] max-w-[65ch] italic">
                                                "{h.text}"
                                            </p>

                                            {/* Note Section (High Contrast Difference) */}
                                            {h.note && (
                                                <div className="pl-8 border-l border-white/5 space-y-3">
                                                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">Sua Nota</span>
                                                    <p className="text-base text-zinc-500 font-sans leading-relaxed max-w-[60ch]">
                                                        {h.note}
                                                    </p>
                                                </div>
                                            )}

                                            {!h.note && (
                                                <button className="text-[10px] font-black text-zinc-700 uppercase tracking-widest hover:text-primary transition-colors pl-8">
                                                    + Adicionar Reflexão
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Separator className="bg-white/5" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-20 text-center">
                        <Button variant="outline" className="rounded-full border-white/10 text-zinc-500 hover:text-white px-12 h-14 text-[10px] font-black uppercase tracking-widest">
                            Carregar histórico completo
                        </Button>
                    </div>
                </div>

                {/* Right Sidebar: Context & IA (4 cols) */}
                <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit">
                    
                    {/* Immersive Book Mini-Display */}
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-card border border-white/5 p-1 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                        <img src={book.cover} className="w-full aspect-[2/3] object-cover rounded-[2.2rem] opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000" />
                        
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <Button className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] h-14 rounded-2xl shadow-2xl" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_READ)}>
                                Continuar Lendo
                            </Button>
                        </div>
                    </div>

                    {/* AI CO-PILOT CARD */}
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <CardHeader className="pb-0 pt-8 px-8">
                            <div className="flex items-center gap-3 text-primary">
                                <Icon name="sparkles" size="size-5" />
                                <CardTitle className="text-xs font-black uppercase tracking-[0.3em]">AI Insights</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <p className="text-sm text-zinc-400 font-serif leading-relaxed italic">
                                "Baseado em seus destaques, você está focado em <strong>Sistemas de Atenção</strong>. Gostaria que eu criasse um resumo executivo conectando essas ideias ao seu projeto atual?"
                            </p>
                            <Button className="w-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black font-bold h-12 rounded-xl text-xs transition-all">
                                Gerar Síntese Lendária
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Navigation Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 text-center space-y-2 hover:bg-white/[0.03] transition-colors cursor-pointer">
                            <Icon name="bookmark" size="size-5" className="mx-auto text-zinc-600" />
                            <span className="text-[8px] font-black uppercase text-zinc-500 block tracking-widest">Marcadores</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 text-center space-y-2 hover:bg-white/[0.03] transition-colors cursor-pointer">
                            <Icon name="share" size="size-5" className="mx-auto text-zinc-600" />
                            <span className="text-[8px] font-black uppercase text-zinc-500 block tracking-widest">Exportar</span>
                        </div>
                    </div>
                </aside>

            </main>
        </div>
    );
};

export default LmsBookHighlightsTemplate;
