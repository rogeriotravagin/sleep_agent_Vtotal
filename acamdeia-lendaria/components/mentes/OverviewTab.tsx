
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/progress';

interface OverviewTabProps {
  profile: any; // Tipagem idealmente seria importada de types
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Neural KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
              { label: "Janela de Contexto", value: "128k", icon: "database", color: "text-blue-400" },
              { label: "Base de Conhecimento", value: "Academia OS", icon: "book-alt", color: "text-brand-gold" },
              { label: "Velocidade de Resposta", value: "0.8s", icon: "lightning", color: "text-yellow-400" },
              { label: "Temperatura Criativa", value: "0.7", icon: "thermometer", color: "text-red-400" },
          ].map((stat, i) => (
              <Card key={i} className="bg-[#0a0a0a] border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                      <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">{stat.label}</p>
                          <p className="text-xl font-mono font-bold text-white">{stat.value}</p>
                      </div>
                      <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                          <Icon name={stat.icon} size="size-5" />
                      </div>
                  </CardContent>
              </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Cognitive Stack (Visualization) */}
          <Card className="lg:col-span-2 bg-[#0a0a0a] border-white/10">
              <CardHeader className="border-b border-white/5 pb-4">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                      <Icon name="layers" className="text-brand-cyan" /> Arquitetura Cognitiva
                  </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                  <div className="flex flex-col gap-4 relative">
                      {/* Connecting Line */}
                      <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-cyan/50 via-brand-gold/50 to-purple-500/50 -z-10"></div>

                      {/* Layer 1: Foundation */}
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10 shadow-xl">
                              <Icon name="microchip" className="text-zinc-500" size="size-6" />
                          </div>
                          <div className="flex-1 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex justify-between items-start mb-1">
                                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Camada 1: Fundação</span>
                                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">LLM Base</Badge>
                              </div>
                              <h4 className="text-white font-bold text-sm">GPT-4o (Fine-tuned)</h4>
                              <p className="text-xs text-zinc-400 mt-1 font-serif">Raciocínio lógico, gramática e conhecimento geral do mundo.</p>
                          </div>
                      </div>

                      {/* Layer 2: Knowledge */}
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 z-10 shadow-xl shadow-brand-gold/5">
                              <Icon name="database" className="text-brand-gold" size="size-6" />
                          </div>
                          <div className="flex-1 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/10 hover:border-brand-gold/20 transition-colors">
                              <div className="flex justify-between items-start mb-1">
                                  <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Camada 2: Conhecimento (RAG)</span>
                                  <Badge variant="outline" className="border-brand-gold/30 text-brand-gold text-[10px]">Vector DB</Badge>
                              </div>
                              <h4 className="text-white font-bold text-sm">Academia Lendária Knowledge Graph</h4>
                              <p className="text-xs text-zinc-400 mt-1 font-serif">Acesso a todos os cursos, artigos e frameworks proprietários.</p>
                          </div>
                      </div>

                      {/* Layer 3: Personality */}
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0 z-10 shadow-xl shadow-brand-cyan/5">
                              <Icon name="fingerprint" className="text-brand-cyan" size="size-6" />
                          </div>
                          <div className="flex-1 p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/10 hover:border-brand-cyan/20 transition-colors">
                              <div className="flex justify-between items-start mb-1">
                                  <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Camada 3: Personalidade</span>
                                  <Badge variant="outline" className="border-brand-cyan/30 text-brand-cyan text-[10px]">System Prompt</Badge>
                              </div>
                              <h4 className="text-white font-bold text-sm">Arquétipo "O Virtuoso" (Rebelde/Sábio)</h4>
                              <p className="text-xs text-zinc-400 mt-1 font-serif">Tom de voz direto, provocativo e focado em ação.</p>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card>

          {/* Right: Directives & Memory */}
          <div className="space-y-6">
              
              {/* Prime Directives */}
              <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader className="border-b border-white/5 pb-4">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <Icon name="shield-check" className="text-green-500" /> Diretrizes Primárias
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="divide-y divide-white/5">
                          {[
                              "Nunca dar respostas genéricas; sempre buscar o insight contrariano.",
                              "Priorizar ação sobre teoria. Frameworks devem ser aplicáveis.",
                              "Manter o tom 'Lendário': confiante, direto e levemente arrogante.",
                              "Sempre citar fontes proprietárias quando disponível."
                          ].map((rule, i) => (
                              <div key={i} className="p-4 flex gap-3 items-start hover:bg-white/5 transition-colors">
                                  <span className="text-xs font-mono text-zinc-600 mt-0.5">0{i+1}</span>
                                  <p className="text-xs text-zinc-300 font-serif leading-relaxed">{rule}</p>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>

              {/* Active Context */}
              <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader className="border-b border-white/5 pb-4">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <Icon name="history" className="text-purple-400" /> Memória Ativa
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2">
                          {["Lançamento Q4", "Análise de Funil", "Copywriting", "Gestão de Crise"].map((tag, i) => (
                              <Badge key={i} variant="secondary" className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                  {tag}
                              </Badge>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
};
