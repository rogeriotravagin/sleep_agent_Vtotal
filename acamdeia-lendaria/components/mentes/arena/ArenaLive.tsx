
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { ScrollArea } from '../../ui/scroll-area';
import { Input } from '../../ui/input';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { ChatMessage } from './ChatMessage';
import { cn } from '../../../lib/utils';
import { CLONES, FRAMEWORKS } from './data';
import { DebateConfig, HistoryItem } from './types';
import { useToast } from '../../../hooks/use-toast';
import { Dialog, DialogContent } from '../../ui/dialog';

interface ArenaLiveProps {
    config: DebateConfig;
    onExit: () => void;
}

export const ArenaLive: React.FC<ArenaLiveProps> = ({ config, onExit }) => {
    const { toast } = useToast();
    
    // Live State
    const [currentRound, setCurrentRound] = useState(1);
    const [turnIndex, setTurnIndex] = useState<0 | 1>(0);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamedText, setStreamedText] = useState("");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [pollVotes, setPollVotes] = useState({ c1: 50, c2: 50 }); // Tug of War starts equal
    const [userVoted, setUserVoted] = useState(false);
    const [debateFinished, setDebateFinished] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const processingRef = useRef(false);

    // Helpers
    const c1 = CLONES.find(c => c.id === config.clone1Id);
    const c2 = CLONES.find(c => c.id === config.clone2Id);
    const frameworkData = FRAMEWORKS.find(f => f.id === config.frameworkId);
    const maxRounds = frameworkData?.rounds || 5;

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, streamedText]);

    // --- GEMINI CORE ---
    const runDebateTurn = async () => {
        if (processingRef.current || debateFinished || !c1 || !c2) return;
        
        processingRef.current = true;
        setIsStreaming(true);
        setStreamedText("");

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const activeClone = turnIndex === 0 ? c1 : c2;
            const opponentClone = turnIndex === 0 ? c2 : c1;

            const conversationContext = history.map(h => `${h.speaker.name}: ${h.text}`).join("\n\n");

            const prompt = `
                Você está participando de um debate ao vivo.
                
                SUA IDENTIDADE:
                Nome: ${activeClone.name}
                Personalidade/Diretrizes: ${activeClone.personality}
                
                O CONTEXTO:
                Tópico do Debate: "${config.topic}"
                Framework: ${frameworkData?.name}
                Round Atual: ${currentRound} de ${maxRounds}
                
                SEU OPONENTE:
                Nome: ${opponentClone.name}
                
                HISTÓRICO DO DEBATE ATÉ AGORA:
                ${conversationContext}
                
                SUA MISSÃO AGORA:
                Responda ao seu oponente (ou inicie o argumento se for o primeiro turno).
                Mantenha-se estritamente no personagem. Use os maneirismos, vocabulário e visão de mundo de ${activeClone.name}.
                Seja incisivo, inteligente e persuasivo.
                Responda em PORTUGUÊS.
                Mantenha a resposta concisa (máximo 3 parágrafos curtos) para manter o dinamismo.
            `;

            const response = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { temperature: 0.8 }
            });

            let fullResponse = "";
            for await (const chunk of response) {
                if (chunk.text) {
                    fullResponse += chunk.text;
                    setStreamedText(prev => prev + chunk.text);
                }
            }

            setHistory(prev => [...prev, { 
                round: currentRound, 
                speaker: activeClone, 
                text: fullResponse 
            }]);
            
            setStreamedText("");
            setIsStreaming(false);
            processingRef.current = false;

            // Random Vote Swing (Simulation)
            if (!debateFinished) {
                const swing = Math.floor(Math.random() * 5) - 2; // -2 to +2
                setPollVotes(prev => {
                    let newC1 = prev.c1 + (turnIndex === 0 ? swing : -swing);
                    // Clamp
                    newC1 = Math.max(10, Math.min(90, newC1));
                    return { c1: newC1, c2: 100 - newC1 };
                });
            }

            // Next Turn Logic
            if (turnIndex === 0) {
                setTurnIndex(1);
            } else {
                if (currentRound < maxRounds) {
                    setTurnIndex(0);
                    setCurrentRound(prev => prev + 1);
                } else {
                    setDebateFinished(true);
                }
            }

        } catch (error) {
            console.error("Gemini Error:", error);
            toast({ title: "Erro na IA", description: "Falha ao gerar resposta.", variant: "destructive" });
            setIsStreaming(false);
            processingRef.current = false;
        }
    };

    // Auto-trigger
    useEffect(() => {
        if (!isStreaming && !debateFinished) {
            const timer = setTimeout(() => {
                runDebateTurn();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isStreaming, debateFinished, turnIndex, currentRound]);

    const handleVote = (clone: 'c1' | 'c2') => {
        if (userVoted) return;
        setUserVoted(true);
        setPollVotes(prev => ({
            c1: clone === 'c1' ? prev.c1 + 5 : prev.c1 - 5,
            c2: clone === 'c2' ? prev.c2 + 5 : prev.c2 - 5
        }));
        toast({ title: "Voto Registrado", variant: "success" });
    };

    if (!c1 || !c2) return <div>Erro ao carregar clones.</div>;

    const activeSpeaker = isStreaming ? (turnIndex === 0 ? c1 : c2) : null;
    const winner = pollVotes.c1 > pollVotes.c2 ? c1 : c2;

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in relative">
            
            {/* Top Bar: Battle HUD */}
            <div className="bg-[#050505] border-b border-white/10 p-4 flex flex-col gap-4">
                {/* Header Info */}
                <div className="flex justify-between items-center px-2">
                     <Button variant="ghost" size="sm" onClick={onExit} className="text-zinc-500 hover:text-white text-xs">
                        <Icon name="arrow-left" className="mr-2" /> Sair
                    </Button>
                    <div className="text-center">
                        <h2 className="font-bold text-white text-sm md:text-base">{config.topic}</h2>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{frameworkData?.name} • Round {currentRound}/{maxRounds}</span>
                    </div>
                     <Badge variant={debateFinished ? "secondary" : "destructive"} className={cn("animate-pulse", debateFinished && "animate-none")}>
                        {debateFinished ? "FINALIZADO" : "AO VIVO"}
                    </Badge>
                </div>

                {/* Health Bar / Vote Tug of War */}
                <div className="relative h-8 w-full max-w-4xl mx-auto bg-zinc-900 rounded-full overflow-hidden border border-white/10 shadow-inner flex items-center">
                    {/* Left Bar */}
                    <div 
                        className="h-full bg-brand-cyan transition-all duration-1000 ease-in-out flex items-center justify-start pl-3 relative"
                        style={{ width: `${pollVotes.c1}%` }}
                    >
                        <span className="text-[10px] font-black text-black z-10">{c1.name} {Math.round(pollVotes.c1)}%</span>
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                    
                    {/* Right Bar */}
                    <div 
                        className="h-full bg-red-500 transition-all duration-1000 ease-in-out flex items-center justify-end pr-3 relative"
                        style={{ width: `${pollVotes.c2}%` }}
                    >
                         <span className="text-[10px] font-black text-white z-10">{Math.round(pollVotes.c2)}% {c2.name}</span>
                         {/* Shimmer */}
                         <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                    
                    {/* Center Marker */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/50 -translate-x-1/2 z-20"></div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Chat Transcript Area */}
                <div className="flex-1 bg-[#0a0a0a] relative flex flex-col">
                    <ScrollArea className="flex-1 px-4 md:px-8 py-6">
                        <div className="max-w-3xl mx-auto space-y-12 pb-24">
                            
                            {history.map((turn, i) => {
                                const isLeft = turn.speaker.id === c1.id;
                                return (
                                    <div key={i} className={cn("flex gap-4 animate-fade-in group", isLeft ? "flex-row" : "flex-row-reverse")}>
                                        <Avatar className={cn(
                                            "w-12 h-12 border-2 shrink-0 transition-transform group-hover:scale-110",
                                            isLeft ? "border-brand-cyan" : "border-red-500"
                                        )}>
                                            <AvatarFallback className="bg-zinc-900 font-bold text-white">{turn.speaker.avatar}</AvatarFallback>
                                        </Avatar>
                                        
                                        <div className={cn("max-w-[85%]")}>
                                            <div className={cn("flex items-center gap-2 mb-2", isLeft ? "flex-row" : "flex-row-reverse")}>
                                                <span className={cn("font-bold text-sm", isLeft ? "text-brand-cyan" : "text-red-500")}>
                                                    {turn.speaker.name}
                                                </span>
                                                <span className="text-[10px] text-zinc-600 font-mono">Turno {i+1}</span>
                                            </div>
                                            <div className={cn(
                                                "p-4 md:p-6 rounded-2xl text-zinc-300 font-serif text-base md:text-lg leading-relaxed shadow-md border",
                                                isLeft ? "bg-zinc-900/50 border-white/5 rounded-tl-none" : "bg-zinc-900/50 border-white/5 rounded-tr-none text-right"
                                            )}>
                                                {turn.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Active Streaming Bubble */}
                            {isStreaming && activeSpeaker && (
                                <div className={cn("flex gap-4", activeSpeaker.id === c1.id ? "flex-row" : "flex-row-reverse")}>
                                     <Avatar className={cn(
                                            "w-12 h-12 border-2 shrink-0 animate-pulse",
                                            activeSpeaker.id === c1.id ? "border-brand-cyan" : "border-red-500"
                                        )}>
                                        <AvatarFallback className="bg-zinc-900 font-bold text-white">{activeSpeaker.avatar}</AvatarFallback>
                                    </Avatar>
                                    
                                    <div className={cn("max-w-[85%]")}>
                                        <div className={cn("flex items-center gap-2 mb-2", activeSpeaker.id === c1.id ? "flex-row" : "flex-row-reverse")}>
                                             <span className={cn("font-bold text-sm", activeSpeaker.id === c1.id ? "text-brand-cyan" : "text-red-500")}>
                                                {activeSpeaker.name}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 font-mono animate-pulse">Argumentando...</span>
                                        </div>
                                        <div className={cn(
                                                "p-4 md:p-6 rounded-2xl text-white font-serif text-base md:text-lg leading-relaxed shadow-lg border border-brand-gold/20 bg-gradient-to-b from-zinc-900 to-zinc-950",
                                                activeSpeaker.id === c1.id ? "rounded-tl-none" : "rounded-tr-none text-right"
                                            )}>
                                            {streamedText}<span className="inline-block w-2 h-5 bg-brand-gold ml-1 animate-blink align-middle"></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>
                    
                    {/* Voting Overlay (Bottom) */}
                    {!debateFinished && !userVoted && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                            <Button 
                                onClick={() => handleVote('c1')}
                                className="bg-zinc-900 border border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan hover:text-black font-bold uppercase tracking-wider shadow-lg"
                            >
                                Apoiar {c1.name}
                            </Button>
                            <Button 
                                onClick={() => handleVote('c2')}
                                className="bg-zinc-900 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase tracking-wider shadow-lg"
                            >
                                Apoiar {c2.name}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Sidebar (Community) - Hidden on Mobile */}
                <div className="w-80 hidden lg:flex flex-col border-l border-white/10 bg-[#050505]">
                    <div className="p-3 border-b border-white/10 flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Chat da Comunidade</span>
                        <Badge variant="outline" className="text-[9px] border-zinc-800 text-green-500">234 online</Badge>
                    </div>
                    <ScrollArea className="flex-1 p-3">
                        <div className="space-y-3">
                            <ChatMessage user="CryptoKing" text="Elon está destruindo nesse round!" time="14:02" />
                            <ChatMessage user="Sarah_AI" text="O argumento sobre segurança do Sam é muito sólido." time="14:03" />
                            <ChatMessage user="Dev_Junior" text="Alguém mais notou a referência ao paper de 2019?" time="14:03" />
                            <ChatMessage user="Anon" text="Team Open Source sempre!" time="14:04" />
                            <ChatMessage user="Mod_Bot" text="Votação para o próximo round aberta." time="14:05" />
                            <div ref={chatEndRef} />
                        </div>
                    </ScrollArea>
                    <div className="p-3 border-t border-white/10">
                        <Input placeholder="Comente algo..." className="bg-zinc-900 border-zinc-800 h-9 text-xs" />
                    </div>
                </div>
            </div>

            {/* Victory Modal Overlay */}
            {debateFinished && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                    <div className="bg-[#0a0a0a] border border-brand-gold rounded-2xl p-12 text-center max-w-lg shadow-[0_0_100px_-20px_rgba(201,178,152,0.3)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">VENCEDOR</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
                            
                            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-brand-gold shadow-2xl">
                                <AvatarFallback className={cn("bg-zinc-800 text-3xl font-black", winner.color)}>{winner.avatar}</AvatarFallback>
                            </Avatar>
                            
                            <h3 className="text-2xl font-bold text-brand-gold mb-2">{winner.name}</h3>
                            <p className="text-zinc-400 font-serif mb-8">Dominou o debate com {Math.max(pollVotes.c1, pollVotes.c2)}% da preferência popular.</p>
                            
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={onExit}>Sair</Button>
                                <Button className="bg-brand-gold text-black hover:bg-white" onClick={() => window.location.reload()}>Novo Debate</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
