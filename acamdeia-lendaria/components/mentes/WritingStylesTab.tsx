
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

interface WritingStylesTabProps {
  profile: any;
}

// Componente Equalizador Visual
const VoiceEqualizer = ({ label, value, leftLabel, rightLabel, color = "bg-brand-cyan" }: { label: string, value: number, leftLabel: string, rightLabel: string, color?: string }) => (
    <div className="space-y-2 group">
        <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors">
            <span>{leftLabel}</span>
            <span className="text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">{label}</span>
            <span>{rightLabel}</span>
        </div>
        <div className="h-10 flex items-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => {
                const isActive = (i / 20) * 100 < value;
                return (
                    <div 
                        key={i} 
                        className={cn(
                            "flex-1 rounded-sm transition-all duration-300",
                            isActive ? color : "bg-zinc-800",
                            isActive ? "h-6 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.2)]" : "h-2 opacity-30"
                        )}
                    />
                );
            })}
        </div>
    </div>
);

// Componente de Bloco de Análise (Raio-X)
const AnalysisBlock = ({ type, description, color }: { type: string, description: string, color: string }) => (
    <div className={cn("p-3 rounded-lg border-l-2 bg-zinc-900/50 border-white/5 hover:bg-zinc-900 transition-colors", color)}>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">{type}</p>
        <p className="text-xs text-zinc-400 font-serif leading-snug">{description}</p>
    </div>
);

export const WritingStylesTab: React.FC<WritingStylesTabProps> = ({ profile }) => {
  const [activeChannel, setActiveChannel] = useState("twitter");
  const [rewriteState, setRewriteState] = useState<'idle' | 'processing' | 'done'>('idle');

  // Simulação de reescrita
  const handleRewrite = () => {
      setRewriteState('processing');
      setTimeout(() => setRewriteState('done'), 1500);
  };

  return (
    <div className="space-y-12 animate-fade-in">
        
        {/* --- SEÇÃO 1: DNA DA VOZ (EQUALIZADOR) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-[#0a0a0a] border-white/10 lg:col-span-2 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none"></div>
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="settings-sliders" className="text-brand-cyan" /> Painel de Controle Vocal
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <VoiceEqualizer label="Tom" value={profile.voiceDNA.tone} leftLabel="Brincalhão" rightLabel="Sério" color="bg-indigo-500" />
                    <VoiceEqualizer label="Formalidade" value={profile.voiceDNA.formality} leftLabel="Casual" rightLabel="Corporativo" color="bg-blue-500" />
                    <VoiceEqualizer label="Agressividade" value={profile.voiceDNA.aggression} leftLabel="Passivo" rightLabel="Provocativo" color="bg-red-500" />
                    <VoiceEqualizer label="Densidade" value={profile.voiceDNA.length} leftLabel="Conciso" rightLabel="Detalhado" color="bg-emerald-500" />
                    
                    <div className="pt-4 flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2 py-1">Palavras-Chave:</span>
                        {profile.voiceDNA.keywords.map((kw: string, i: number) => (
                            <Badge key={i} variant="outline" className="bg-zinc-900/50 text-zinc-300 border-zinc-700 hover:text-white hover:border-brand-cyan transition-colors">
                                {kw}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Framework Card */}
            <Card className="bg-[#0a0a0a] border-white/10 flex flex-col">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="book-open" className="text-brand-gold" /> Frameworks Ativos
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <div className="divide-y divide-white/5">
                        <div className="p-5 hover:bg-white/5 transition-colors cursor-help group">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-zinc-200 text-sm group-hover:text-brand-gold transition-colors">Polarização Estratégica</h4>
                                <Icon name="lightning" className="text-zinc-600 group-hover:text-brand-gold" size="size-4" />
                            </div>
                            <p className="text-xs text-zinc-500 font-serif">"Nós vs Eles". Cria um inimigo comum para gerar identificação tribal imediata.</p>
                        </div>
                        <div className="p-5 hover:bg-white/5 transition-colors cursor-help group">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-zinc-200 text-sm group-hover:text-brand-gold transition-colors">Golden Circle Invertido</h4>
                                <Icon name="refresh" className="text-zinc-600 group-hover:text-brand-gold" size="size-4" />
                            </div>
                            <p className="text-xs text-zinc-500 font-serif">Começa pelo "Não" (O que não fazer) para depois apresentar a solução proprietária.</p>
                        </div>
                        <div className="p-5 hover:bg-white/5 transition-colors cursor-help group">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-zinc-200 text-sm group-hover:text-brand-gold transition-colors">Analogia Visual</h4>
                                <Icon name="eye" className="text-zinc-600 group-hover:text-brand-gold" size="size-4" />
                            </div>
                            <p className="text-xs text-zinc-500 font-serif">Simplificação de conceitos complexos usando metáforas físicas (ex: Arquitetura, Guerra).</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* --- SEÇÃO 2: LABORATÓRIO DE ANATOMIA (RAIO-X) --- */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Icon name="microscope" className="text-purple-400" /> Anatomia do Copy
                </h3>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">Engenharia Reversa</Badge>
            </div>

            <Tabs value={activeChannel} onValueChange={setActiveChannel} className="w-full">
                <TabsList className="bg-[#0f0f0f] border border-white/10 p-1 w-full justify-start rounded-lg mb-6">
                    <TabsTrigger value="twitter" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Twitter / X</TabsTrigger>
                    <TabsTrigger value="linkedin" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">LinkedIn</TabsTrigger>
                    <TabsTrigger value="newsletter" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Newsletter</TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Content Preview */}
                    <div className="lg:col-span-7">
                        <Card className="bg-[#0a0a0a] border-white/10 h-full">
                            <CardHeader className="border-b border-white/5 pb-4 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8 border border-white/10">
                                        <AvatarImage src={profile.avatar} />
                                        <AvatarFallback>AN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-white">{profile.name}</p>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{activeChannel === 'twitter' ? 'Thread' : activeChannel === 'linkedin' ? 'Post' : 'Email'}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Icon name="copy" size="size-4" /></Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-base text-zinc-300 font-serif leading-relaxed whitespace-pre-wrap">
                                    {profile.writingSamples[activeChannel].content}
                                </p>
                            </CardContent>
                            <div className="border-t border-white/5 p-4 bg-white/[0.02]">
                                <div className="flex gap-6 text-zinc-600 text-xs font-mono">
                                    <span className="flex items-center gap-1.5"><Icon name="eye" size="size-3" /> 12.4k Views</span>
                                    <span className="flex items-center gap-1.5"><Icon name="heart" size="size-3" /> 4.8% Engajamento</span>
                                    <span className="flex items-center gap-1.5"><Icon name="share" size="size-3" /> 240 Shares</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: X-Ray Analysis */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-2">
                            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Framework Utilizado</h4>
                            <p className="text-sm text-white font-medium">{profile.writingSamples[activeChannel].framework}</p>
                        </div>
                        
                        <div className="space-y-3 relative">
                            {/* Connector Line Visual (Abstract) */}
                            <div className="absolute left-[-20px] top-4 bottom-4 w-px bg-white/10 hidden lg:block"></div>
                            
                            {profile.writingSamples[activeChannel].analysis.map((item: any, i: number) => (
                                <div key={i} className="relative group">
                                    {/* Dot Connector */}
                                    <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-brand-cyan group-hover:border-brand-cyan transition-colors hidden lg:block"></div>
                                    
                                    <AnalysisBlock 
                                        type={item.type} 
                                        description={item.text} 
                                        color={i === 0 ? "border-red-500/50 text-red-100" : i === profile.writingSamples[activeChannel].analysis.length - 1 ? "border-green-500/50 text-green-100" : "border-zinc-700 text-zinc-300"} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>

        {/* --- SEÇÃO 3: SIMULADOR DE REESCRITA (BEFORE/AFTER) --- */}
        <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Icon name="refresh" className="text-brand-cyan" /> Transformador de Estilo
                </h3>
                <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white text-xs">
                    <Icon name="history" className="mr-2 size-3" /> Ver Histórico
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Input: Mediocre */}
                <Card className="bg-zinc-900/30 border-dashed border-zinc-800">
                    <CardHeader className="pb-2">
                        <Badge variant="outline" className="w-fit border-red-500/30 text-red-500 bg-red-500/5">Input: Texto Comum</Badge>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-zinc-500 font-serif italic text-sm leading-relaxed">
                            "Hoje em dia é muito importante usar inteligência artificial para melhorar os processos da empresa. Quem não usa pode ficar para trás no mercado. É bom automatizar coisas chatas para ter mais tempo livre."
                        </p>
                    </CardContent>
                </Card>

                {/* Arrow Action */}
                <div className="md:hidden flex justify-center py-2">
                    <Icon name="arrow-down" className="text-zinc-600 animate-bounce" />
                </div>

                {/* Output: Legendary */}
                <Card className={cn("border transition-all duration-500 relative overflow-hidden", rewriteState === 'done' ? "bg-brand-cyan/5 border-brand-cyan/30" : "bg-[#0a0a0a] border-white/10")}>
                    {rewriteState === 'processing' && (
                        <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
                            <Icon name="loader" className="animate-spin text-brand-cyan" size="size-8" />
                            <span className="text-xs font-mono text-brand-cyan animate-pulse">Aplicando Framework Mental...</span>
                        </div>
                    )}
                    
                    <CardHeader className="pb-2 flex flex-row justify-between items-center">
                        <Badge variant="outline" className="w-fit border-brand-cyan/30 text-brand-cyan bg-brand-cyan/5">Output: Estilo Lendário</Badge>
                        {rewriteState === 'idle' && (
                            <Button size="sm" onClick={handleRewrite} className="h-7 text-xs bg-white text-black hover:bg-zinc-200">
                                <Icon name="magic-wand" className="mr-2 size-3" /> Reescrever
                            </Button>
                        )}
                        {rewriteState === 'done' && (
                            <Button size="sm" variant="ghost" onClick={() => setRewriteState('idle')} className="h-7 text-xs text-zinc-500">
                                <Icon name="undo" className="mr-2 size-3" /> Resetar
                            </Button>
                        )}
                    </CardHeader>
                    
                    <CardContent className="p-6">
                         {rewriteState !== 'done' ? (
                            <div className="h-20 flex items-center justify-center text-zinc-700 text-sm">
                                Aguardando processamento...
                            </div>
                         ) : (
                            <div className="animate-fade-in">
                                <p className="text-zinc-200 font-serif text-sm leading-relaxed whitespace-pre-wrap">
                                    "O mercado não perdoa a lentidão.
                                    
                                    Enquanto você hesita em adotar IA, seu concorrente já automatizou o operacional e está focado na estratégia.
                                    
                                    Não é sobre 'ficar para trás'. É sobre se tornar irrelevante.
                                    
                                    Automatize o tédio. Escale a genialidade."
                                </p>
                                <div className="mt-4 pt-4 border-t border-brand-cyan/10 flex gap-2">
                                    <Badge variant="secondary" className="bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 text-[9px]">Mais Agressivo</Badge>
                                    <Badge variant="secondary" className="bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 text-[9px]">Frases Curtas</Badge>
                                    <Badge variant="secondary" className="bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 text-[9px]">Urgência</Badge>
                                </div>
                            </div>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
};
