
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/progress';
import { RadarChart } from '../ui/radar-chart';

interface PsychometricsTabProps {
  profile: any;
}

export const PsychometricsTab: React.FC<PsychometricsTabProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-fade-in">
                  
        {/* --- ROW 1: ARCHETYPES + RADAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Archetypes */}
            <Card className="bg-[#0a0a0a] border-white/10 h-full">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="fingerprint" className="text-brand-cyan" /> Arquétipos Psicológicos
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-2 gap-6">
                    {/* MBTI */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">MBTI</span>
                        <div className="flex items-center gap-3">
                            <span className={cn("text-3xl font-black tracking-tighter", profile.psychometrics.mbti.color)}>
                                {profile.psychometrics.mbti.code}
                            </span>
                            <span className="text-sm text-zinc-400 font-serif">{profile.psychometrics.mbti.name}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                            {["Ti", "Se", "Ni", "Fe"].map(f => (
                                <span key={f} className={cn("text-[9px] px-1.5 py-0.5 rounded font-mono bg-purple-500/20 text-purple-400")}>{f}</span>
                            ))}
                        </div>
                    </div>

                    {/* Enneagram */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Eneagrama</span>
                        <div className="flex items-center gap-3">
                            <span className={cn("text-3xl font-black tracking-tighter", profile.psychometrics.enneagram.color)}>
                                {profile.psychometrics.enneagram.code}
                            </span>
                            <span className="text-sm text-zinc-400 font-serif">{profile.psychometrics.enneagram.name}</span>
                        </div>
                        <p className="text-xs text-zinc-500">Variante: {profile.psychometrics.enneagram.variant}</p>
                    </div>

                    {/* DISC */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">DISC</span>
                        <div className="flex flex-col gap-1">
                            <Badge variant="outline" className={cn("w-fit text-xl px-3 py-1 font-black rounded border-red-500/30 text-red-500 bg-red-500/10")}>
                                {profile.psychometrics.disc.code}
                            </Badge>
                            <span className="text-xs text-zinc-400 mt-1">{profile.psychometrics.disc.name}</span>
                        </div>
                    </div>

                    {/* Stratum */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Estrato Cognitivo</span>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xl font-mono font-bold px-3 py-1 border-brand-gold/30 text-brand-gold bg-brand-gold/5">
                                {profile.psychometrics.stratum.code}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Right: Big Five Radar */}
            <Card className="bg-[#0a0a0a] border-white/10 h-full flex flex-col">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="chart-pie" className="text-indigo-400" /> Big Five (OCEAN)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex items-center justify-center relative">
                    <RadarChart 
                        data={[
                            { label: "ABERTURA", value: profile.bigFive.openness },
                            { label: "CONSC.", value: profile.bigFive.conscientiousness },
                            { label: "EXTROV.", value: profile.bigFive.extraversion },
                            { label: "AMABIL.", value: profile.bigFive.agreeableness },
                            { label: "NEUROT.", value: profile.bigFive.neuroticism },
                        ]}
                        width={280}
                        height={280}
                        color="#6366F1" // Indigo
                        className="text-zinc-500"
                    />
                </CardContent>
            </Card>
        </div>

        {/* --- ROW 2: DISC DETAILS --- */}
        <Card className="bg-[#0a0a0a] border-white/10">
            <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="bar-chart-alt" /> DISC - Comportamento Observável
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                
                {/* Bars */}
                <div className="flex items-center gap-4 mb-8 text-xs font-bold font-mono">
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-red-500"><span>Dominância (D)</span> <span>{profile.discBars.dominance}%</span></div>
                        <Progress value={profile.discBars.dominance} className="h-2 bg-zinc-800" style={{'--primary': '#EF4444'} as React.CSSProperties} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-yellow-500"><span>Influência (I)</span> <span>{profile.discBars.influence}%</span></div>
                        <Progress value={profile.discBars.influence} className="h-2 bg-zinc-800" style={{'--primary': '#EAB308'} as React.CSSProperties} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-green-500"><span>Estabilidade (S)</span> <span>{profile.discBars.stability}%</span></div>
                        <Progress value={profile.discBars.stability} className="h-2 bg-zinc-800" style={{'--primary': '#10B981'} as React.CSSProperties} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-blue-500"><span>Conformidade (C)</span> <span>{profile.discBars.conformity}%</span></div>
                        <Progress value={profile.discBars.conformity} className="h-2 bg-zinc-800" style={{'--primary': '#3B82F6'} as React.CSSProperties} />
                    </div>
                </div>

                {/* Behaviors List */}
                <div className="space-y-3">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Comportamentos Específicos</span>
                    {profile.behaviors.map((behavior: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-serif">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 shrink-0"></div>
                            {behavior}
                        </div>
                    ))}
                </div>

            </CardContent>
        </Card>

        {/* --- ROW 3: BIG FIVE DETAILS + SUPERPOWERS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Big Five Breakdown */}
            <Card className="bg-[#0a0a0a] border-white/10">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400">Big Five - Detalhamento</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {[
                        { label: "Abertura (Openness)", val: 88, desc: "Curiosidade, criatividade, abertura a novas experiências", color: "#A855F7" },
                        { label: "Conscienciosidade", val: 82, desc: "Organização, disciplina, orientação a metas", color: "#3B82F6" },
                        { label: "Extroversão", val: 38, desc: "Sociabilidade, energia, assertividade", color: "#EAB308" },
                        { label: "Agradabilidade", val: 35, desc: "Cooperação, empatia, confiança", color: "#22C55E" },
                        { label: "Neuroticismo", val: 48, desc: "Sensibilidade emocional, ansiedade, reatividade", color: "#EF4444" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-white mb-1">
                                <span>{item.label}</span>
                                <span className="font-mono">{item.val}/100</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-1">
                                <div className="h-full rounded-full" style={{ width: `${item.val}%`, backgroundColor: item.color }}></div>
                            </div>
                            <p className="text-[10px] text-zinc-500">{item.desc}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Superpowers & Kryptonite */}
            <div className="space-y-8">
                
                {/* Superpowers */}
                <Card className="bg-[#0a0a0a] border-white/10">
                    <CardHeader className="border-b border-white/5 pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                            <Icon name="lightning" /> Superpoderes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {profile.superpowers.map((power: string, i: number) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-brand-gold/20">{i + 1}</div>
                                <p className="text-sm text-zinc-300 font-medium">{power}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Kryptonite */}
                <Card className="bg-red-950/10 border-red-500/20">
                    <CardHeader className="border-b border-red-500/10 pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                            <Icon name="shield-check" /> Kryptonita
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                        {profile.kryptonite.map((k: string, i: number) => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                                <p className="text-sm text-zinc-400">{k}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Motivation */}
                <Card className="bg-blue-950/10 border-blue-500/20">
                    <CardHeader className="border-b border-blue-500/10 pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                            <Icon name="bullseye" /> Motivação Central
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1 block">Desejo Central</span>
                            <p className="text-sm text-zinc-300">{profile.motivation.desire}</p>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1 block">Medo Central</span>
                            <p className="text-sm text-zinc-300">{profile.motivation.fear}</p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>
  );
};
