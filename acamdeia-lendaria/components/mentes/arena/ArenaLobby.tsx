
import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { CLONES } from './data';
import { cn } from '../../../lib/utils';

interface ArenaLobbyProps {
    onCreateClick: () => void;
    onHistoryClick?: () => void;
}

export const ArenaLobby: React.FC<ArenaLobbyProps> = ({ onCreateClick, onHistoryClick }) => {
    return (
        <div className="space-y-12 animate-fade-in">
            
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[400px] flex flex-col items-center justify-center text-center p-8 group">
                {/* Background Video/Image Placeholder */}
                <div className="absolute inset-0 bg-[#050505]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,178,152,0.15),transparent_70%)] opacity-50"></div>
                    <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Sistema Operacional Online</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                        CLONE <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-[#8D7556]">ARENA</span>
                    </h1>

                    <p className="text-xl text-zinc-400 font-serif max-w-xl mx-auto leading-relaxed">
                        O coliseu digital onde IAs debatem o futuro da humanidade.
                        Escolha seus campeões. Defina o tema. Assista a história.
                    </p>

                    <div className="pt-4">
                        <Button 
                            size="lg" 
                            className="h-16 px-12 text-lg font-black uppercase tracking-widest bg-brand-gold text-black hover:bg-brand-gold/90 shadow-[0_0_40px_-10px_rgba(201,178,152,0.5)] transition-transform hover:scale-105" 
                            onClick={onCreateClick}
                        >
                            <Icon name="sword" className="mr-3" /> Iniciar Batalha
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Recent Battles / History */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Icon name="time-past" className="text-zinc-500" /> Batalhas Recentes
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-white">Ver todas</Button>
                    </div>
                    
                    <div className="grid gap-6">
                        {/* Featured History Item - Clickable */}
                        <div 
                            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-all cursor-pointer overflow-hidden"
                            onClick={onHistoryClick}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Icon name="arrow-right" className="text-white" />
                            </div>
                            
                            <div className="flex justify-between items-start mb-6">
                                <Badge variant="outline" className="border-brand-gold/30 text-brand-gold bg-brand-gold/5">FINALIZADO</Badge>
                                <span className="text-xs font-mono text-zinc-500">14 Out, 2025</span>
                            </div>

                            <div className="flex items-center justify-between gap-8 mb-8">
                                {/* Clone 1 */}
                                <div className="text-center flex-1 opacity-50 grayscale group-hover:grayscale-0 transition-all">
                                    <Avatar className="w-16 h-16 border-2 border-brand-cyan mx-auto mb-3">
                                        <AvatarFallback>EM</AvatarFallback>
                                    </Avatar>
                                    <h4 className="font-bold text-white text-sm">Elon Musk</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">35% Votos</p>
                                </div>

                                {/* VS */}
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-black text-zinc-700 italic">VS</span>
                                </div>

                                {/* Clone 2 (Winner) */}
                                <div className="text-center flex-1">
                                    <div className="relative inline-block">
                                        <Avatar className="w-16 h-16 border-2 border-brand-gold mx-auto mb-3 shadow-[0_0_20px_rgba(201,178,152,0.3)]">
                                            <AvatarFallback>NR</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -top-2 -right-2 bg-brand-gold text-black rounded-full p-1 shadow-sm">
                                            <Icon name="crown" size="size-3" />
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-brand-gold text-sm">Naval Ravikant</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">65% Votos</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white text-center font-serif italic opacity-90 group-hover:text-brand-gold transition-colors">
                                "A busca pela felicidade impede a construção de riqueza?"
                            </h3>
                            
                            <div className="mt-6 flex justify-center">
                                <span className="text-xs text-zinc-500 flex items-center gap-2 group-hover:text-white transition-colors">
                                    <Icon name="eye" size="size-3" /> Ver Análise e Transcrição
                                </span>
                            </div>
                        </div>

                        {/* Smaller History Item */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0a0a0a] hover:bg-white/5 transition-colors cursor-pointer group">
                             <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    <Avatar className="w-10 h-10 border-2 border-[#0a0a0a]"><AvatarFallback>SA</AvatarFallback></Avatar>
                                    <Avatar className="w-10 h-10 border-2 border-[#0a0a0a]"><AvatarFallback>NT</AvatarFallback></Avatar>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-200 group-hover:text-white">Sam Altman vs Nassim Taleb</p>
                                    <p className="text-xs text-zinc-500">"Riscos da IA: Cisne Negro ou Evolução?"</p>
                                </div>
                             </div>
                             <Badge variant="secondary" className="bg-zinc-900 text-zinc-500">Taleb Venceu</Badge>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Icon name="trophy" className="text-brand-gold" /> Ranking
                        </h3>
                    </div>

                    <Card className="bg-[#0a0a0a] border-white/10 overflow-hidden">
                        <CardContent className="p-0">
                            {CLONES.sort((a,b) => b.winRate - a.winRate).slice(0, 5).map((clone, i) => (
                                <div key={clone.id} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                    <div className={cn(
                                        "w-8 h-8 flex items-center justify-center font-black text-sm rounded-lg",
                                        i === 0 ? "bg-brand-gold text-black" : 
                                        i === 1 ? "bg-zinc-300 text-black" : 
                                        i === 2 ? "bg-amber-700 text-white" : "bg-zinc-900 text-zinc-500"
                                    )}>
                                        {i+1}
                                    </div>
                                    
                                    <Avatar className="w-10 h-10 border border-white/10 group-hover:border-white/30 transition-colors">
                                        <AvatarFallback className={cn("bg-zinc-900 text-xs font-bold", clone.color)}>{clone.avatar}</AvatarFallback>
                                    </Avatar>
                                    
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{clone.name}</p>
                                        <p className="text-[10px] text-zinc-500 truncate">{clone.role}</p>
                                    </div>
                                    
                                    <div className="text-right">
                                        <span className="block text-sm font-mono font-bold text-brand-gold">{clone.winRate}%</span>
                                        <span className="text-[9px] text-zinc-600 uppercase">Win Rate</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 text-center">
                        <p className="text-xs text-zinc-400 font-serif">
                            "A excelência não é um ato, mas um hábito."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
