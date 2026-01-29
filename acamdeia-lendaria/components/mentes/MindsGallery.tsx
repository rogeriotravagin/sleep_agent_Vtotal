
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { MINDS, MindProfile } from './data';

interface MindsGalleryProps {
    onSelectMind: (id: string) => void;
}

export const MindsGallery: React.FC<MindsGalleryProps> = ({ onSelectMind }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            
            {/* Hero Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Galeria Neural</h2>
                    <p className="text-zinc-400 font-serif max-w-xl">
                        Acesse a consciência digital de grandes mentes. Estude seus modelos mentais, dialogue ou coloque-os para debater na Arena.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10">
                        <Icon name="filter" className="mr-2 size-4" /> Filtrar
                    </Button>
                    <Button className="bg-brand-gold text-black hover:bg-brand-gold/90 font-bold">
                        <Icon name="plus" className="mr-2 size-4" /> Criar Clone
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MINDS.map((mind) => (
                    <Card 
                        key={mind.id} 
                        className="group bg-[#0a0a0a] border-white/10 hover:border-brand-gold/50 transition-all duration-300 cursor-pointer overflow-hidden relative hover:-translate-y-1 hover:shadow-2xl"
                        onClick={() => onSelectMind(mind.id)}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        {/* Top Bar */}
                        <div className="p-4 flex justify-between items-start relative z-10">
                            <Badge variant="outline" className="bg-zinc-900/50 border-white/10 text-[10px] uppercase tracking-wider backdrop-blur-sm">
                                {mind.tier}
                            </Badge>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700">
                                    <Icon name="expand" size="size-3" />
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-6 pt-2 flex flex-col items-center text-center relative z-10">
                            {/* Avatar with Ring */}
                            <div className="w-24 h-24 rounded-full p-1 border border-white/10 group-hover:border-brand-gold/50 transition-colors mb-4 relative">
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={mind.avatar} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    <AvatarFallback>{mind.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                {/* Status Dot */}
                                <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a0a0a] animate-pulse"></div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{mind.name}</h3>
                            <p className={cn("text-xs font-bold uppercase tracking-wider mb-4", mind.color)}>{mind.role}</p>

                            <p className="text-xs text-zinc-500 font-serif line-clamp-2 mb-6 h-8">
                                {mind.description}
                            </p>

                            {/* Psychometrics Mini-Bar */}
                            <div className="w-full grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">MBTI</span>
                                    <span className="text-xs text-zinc-300 font-mono">{mind.psychometrics.mbti}</span>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/5">
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">ENEAG.</span>
                                    <span className="text-xs text-zinc-300 font-mono">{mind.psychometrics.enneagram}</span>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/5">
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">DISC</span>
                                    <span className="text-xs text-zinc-300 font-mono">{mind.psychometrics.disc}</span>
                                </div>
                            </div>
                        </CardContent>
                        
                        {/* Footer Action */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Card>
                ))}

                {/* Add New Slot */}
                <Card className="bg-transparent border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group min-h-[350px]">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all">
                        <Icon name="plus" size="size-6" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-sm font-bold text-zinc-400 group-hover:text-white">Treinar Nova Mente</h3>
                        <p className="text-xs text-zinc-600 font-serif mt-1">Upload de livros, áudios e textos</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
