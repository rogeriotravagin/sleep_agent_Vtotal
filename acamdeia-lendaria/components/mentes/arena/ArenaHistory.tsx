
import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { CLONES } from './data';
import { cn } from '../../../lib/utils';
import { Clone } from './types';

interface ArenaHistoryProps {
    onBack: () => void;
}

// Mock Data for a finished debate
const DEBATE_DATA = {
    id: "debate-101",
    date: "14 Out, 2025",
    topic: "A busca pela felicidade impede a construção de riqueza?",
    winnerId: 'naval',
    votes: { c1: 35, c2: 65 }, // Elon (35) vs Naval (65)
    rounds: 5,
    summary: "Um embate fascinante entre a visão utilitária de Musk e a filosofia de Naval. Naval dominou ao redefinir riqueza como liberdade, desarmando a lógica de 'trabalho duro' de Musk.",
    transcript: [
        { round: 1, speakerId: 'elon', text: "A felicidade é irrelevante se não garantirmos a persistência da consciência. Riqueza é apenas combustível para expandir a luz da consciência para as estrelas. Buscar felicidade pessoal é um bug evolutivo." },
        { round: 1, speakerId: 'naval', text: "Essa é uma armadilha. Se você não é feliz enquanto constrói, não será feliz quando chegar a Marte. Riqueza é ter ativos que ganham enquanto você dorme, para que você possa ser livre. Liberdade é a base da felicidade." },
        { round: 2, speakerId: 'elon', text: "Liberdade sem propósito é entropia. O propósito requer dor. Eu não busco conforto, busco resolver problemas de física e engenharia. Riqueza é alocação de recursos para resolver problemas." },
        { round: 2, speakerId: 'naval', text: "Resolver problemas é divertido se for sua 'brincadeira'. Se for 'dor', você vai perder para quem está se divertindo. A riqueza compra de volta seu tempo, não sua validação." },
        { round: 3, speakerId: 'elon', text: "Se todos pensassem assim, ainda estaríamos nas cavernas meditando. O progresso exige sacrifício extremo." },
        { round: 3, speakerId: 'naval', text: "O progresso vem da alavancagem (código, mídia, capital), não do sofrimento. Um monge feliz é mais rico que um bilionário ansioso." },
    ],
    highlights: [
        { type: "Critical Hit", text: "Um monge feliz é mais rico que um bilionário ansioso.", speakerId: 'naval' },
        { type: "Fallacy", text: "Falso dilema: Felicidade vs Progresso.", speakerId: 'elon' }
    ]
};

export const ArenaHistory: React.FC<ArenaHistoryProps> = ({ onBack }) => {
    const c1 = CLONES.find(c => c.id === 'elon') as Clone;
    const c2 = CLONES.find(c => c.id === 'naval') as Clone;
    const winner = CLONES.find(c => c.id === DEBATE_DATA.winnerId) as Clone;

    return (
        <div className="flex flex-col h-full animate-fade-in space-y-6 pb-12">
            
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onBack} className="text-zinc-400 hover:text-white">
                    <Icon name="arrow-left" className="mr-2" /> Voltar ao Lobby
                </Button>
                <div className="h-6 w-px bg-white/10"></div>
                <div>
                    <h2 className="text-lg font-bold text-white">{DEBATE_DATA.topic}</h2>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Finalizado em {DEBATE_DATA.date}</p>
                </div>
            </div>

            {/* Winner Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-brand-gold/30 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_-20px_rgba(201,178,152,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="flex items-center gap-6 z-10">
                    <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-brand-gold shadow-xl">
                            <AvatarFallback className={cn("bg-zinc-900 text-2xl font-black", winner.color)}>{winner.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-3 -right-3 bg-brand-gold text-black p-2 rounded-full shadow-lg animate-bounce">
                            <Icon name="crown" type="solid" size="size-5" />
                        </div>
                    </div>
                    <div>
                        <Badge className="bg-brand-gold text-black hover:bg-brand-gold mb-2">VENCEDOR</Badge>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tight">{winner.name}</h1>
                        <p className="text-brand-gold font-serif text-lg">Dominou o debate com {Math.max(DEBATE_DATA.votes.c1, DEBATE_DATA.votes.c2)}% dos votos</p>
                    </div>
                </div>

                {/* Scoreboard */}
                <div className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-xl border border-white/5 z-10">
                    <div className="text-center">
                        <Avatar className="w-10 h-10 border border-white/10 mx-auto mb-1 opacity-50 grayscale">
                            <AvatarFallback>{c1.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-xl font-mono font-bold text-zinc-500">{DEBATE_DATA.votes.c1}%</span>
                    </div>
                    <div className="h-12 w-px bg-white/10"></div>
                    <div className="text-center">
                        <Avatar className="w-12 h-12 border-2 border-brand-gold mx-auto mb-1">
                            <AvatarFallback>{c2.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-2xl font-mono font-bold text-brand-gold">{DEBATE_DATA.votes.c2}%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Transcript */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Icon name="comment-alt-middle" /> Transcrição Completa
                        </h3>
                        <Badge variant="outline" className="border-white/10 text-zinc-500">
                            {DEBATE_DATA.transcript.length} turnos
                        </Badge>
                    </div>

                    <Card className="bg-[#0a0a0a] border-white/10">
                        <ScrollArea className="h-[600px] p-6">
                            <div className="space-y-8">
                                {DEBATE_DATA.transcript.map((turn, i) => {
                                    const speaker = turn.speakerId === c1.id ? c1 : c2;
                                    const isWinner = speaker.id === winner.id;
                                    
                                    return (
                                        <div key={i} className="flex gap-4">
                                            <Avatar className={cn("w-10 h-10 border shrink-0 mt-1", isWinner ? "border-brand-gold" : "border-white/10")}>
                                                <AvatarFallback className="bg-zinc-900 text-xs font-bold text-zinc-400">{speaker.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className={cn("font-bold text-sm", isWinner ? "text-brand-gold" : "text-zinc-400")}>
                                                        {speaker.name}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-600 font-mono">Round {turn.round}</span>
                                                </div>
                                                <p className="text-zinc-300 font-serif leading-relaxed text-sm bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                                                    {turn.text}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    </Card>
                </div>

                {/* Right: Analysis */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* AI Analysis */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                <Icon name="sparkles" /> Análise da IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {DEBATE_DATA.summary}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Highlights */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Destaques</h4>
                        
                        {DEBATE_DATA.highlights.map((high, i) => {
                            const speaker = high.speakerId === c1.id ? c1 : c2;
                            return (
                                <div key={i} className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", high.type === 'Critical Hit' ? "bg-green-500" : "bg-red-500")}></div>
                                    <div className="flex justify-between items-start mb-2 pl-2">
                                        <Badge variant="outline" className={cn("text-[9px] h-5", high.type === 'Critical Hit' ? "text-green-500 border-green-500/30 bg-green-500/10" : "text-red-500 border-red-500/30 bg-red-500/10")}>
                                            {high.type}
                                        </Badge>
                                        <span className="text-[10px] font-bold text-zinc-500">{speaker.name}</span>
                                    </div>
                                    <p className="text-xs text-zinc-300 pl-2 font-serif italic">"{high.text}"</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats */}
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardHeader className="pb-2">
                             <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">Métricas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400">Coerência Lógica</span>
                                    <span className="text-white font-mono">9.8/10</span>
                                </div>
                                <Progress value={98} className="h-1.5 bg-zinc-800" style={{'--primary': '#C9B298'} as React.CSSProperties} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400">Engajamento da Audiência</span>
                                    <span className="text-white font-mono">4.2k Votos</span>
                                </div>
                                <Progress value={85} className="h-1.5 bg-zinc-800" style={{'--primary': '#32ADE6'} as React.CSSProperties} />
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full bg-white text-black hover:bg-zinc-200" onClick={onBack}>
                        Iniciar Novo Debate
                    </Button>

                </div>
            </div>
        </div>
    );
};
