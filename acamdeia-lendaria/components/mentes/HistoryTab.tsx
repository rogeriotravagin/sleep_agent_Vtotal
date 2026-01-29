
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

export interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  details?: string[];
  type: 'origin' | 'milestone' | 'pivot' | 'crisis' | 'learning';
}

interface HistoryTabProps {
  history: HistoryEvent[];
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Helper para obter cores baseadas no tipo (apenas para o marcador)
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'origin': return { bg: 'bg-zinc-600', border: 'border-zinc-600', label: 'Origem', icon: 'home' };
      case 'milestone': return { bg: 'bg-brand-gold', border: 'border-brand-gold', label: 'Conquista', icon: 'trophy' };
      case 'pivot': return { bg: 'bg-brand-cyan', border: 'border-brand-cyan', label: 'Mudança', icon: 'refresh' };
      case 'crisis': return { bg: 'bg-red-500', border: 'border-red-500', label: 'Crise', icon: 'exclamation-triangle' };
      case 'learning': return { bg: 'bg-purple-500', border: 'border-purple-500', label: 'Estudo', icon: 'book-open' };
      default: return { bg: 'bg-zinc-500', border: 'border-zinc-500', label: 'Evento', icon: 'circle' };
    }
  };

  // Agrupamento por ano preservando a ordem do array original
  // O Set remove duplicatas mantendo a ordem de inserção
  const uniqueYears: string[] = Array.from(new Set(history.map(h => h.year)));
  
  const groupedEvents = uniqueYears.reduce((acc, year: string) => {
    acc[year] = history.filter(h => h.year === year);
    return acc;
  }, {} as Record<string, HistoryEvent[]>);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in py-8">
      
      {/* Introduction Quote */}
      <div className="mb-16 text-center">
          <p className="text-xl font-serif italic text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              "A contínua morte de versões antigas e o renascimento em direção a um propósito maior."
          </p>
          <div className="w-12 h-px bg-zinc-800 mx-auto mt-8"></div>
          
          {/* LEGEND - Minimalist */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
             {['origin', 'milestone', 'pivot', 'crisis', 'learning'].map(type => {
                 const style = getTypeStyles(type);
                 return (
                     <div key={type} className="flex items-center gap-2">
                         <div className={cn("w-2 h-2 rounded-full", style.bg)}></div>
                         <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{style.label}</span>
                     </div>
                 )
             })}
          </div>
      </div>

      <div className="relative ml-4 md:ml-24 space-y-12 pb-12">
        
        {/* Continuous Line */}
        <div className="absolute left-[3px] md:-left-[21px] top-2 bottom-0 w-px bg-zinc-800 z-0"></div>

        {uniqueYears.map((year: string) => {
          const events = groupedEvents[year];
          
          return (
            <div key={year} className="relative">
                
                {/* Year Label (Sticky visual anchor) */}
                <div className="hidden md:block absolute -left-36 top-1 w-24 text-right">
                    <span className="text-sm font-bold font-mono text-zinc-500">{year}</span>
                </div>
                
                {/* Mobile Year Label */}
                <div className="md:hidden mb-4 pl-6 relative">
                    <div className="absolute left-[3px] top-2 w-1.5 h-1.5 bg-zinc-700 rounded-full -translate-x-1/2"></div>
                    <span className="text-xs font-bold font-mono text-zinc-500">{year}</span>
                </div>

                {/* Events for this Year */}
                <div className="space-y-6">
                    {events.map((event) => {
                        const style = getTypeStyles(event.type);
                        const isExpanded = expandedId === event.id;

                        return (
                            <div key={event.id} className="relative pl-6 md:pl-0 group">
                                {/* Semantic Dot (The "Ball") */}
                                <div 
                                    className={cn(
                                        "absolute left-[3px] md:-left-[21px] top-5 w-3 h-3 rounded-full border-2 border-[#050505] z-10 shadow-lg transition-transform duration-300 -translate-x-1/2",
                                        style.bg,
                                        isExpanded ? "scale-125" : "group-hover:scale-110"
                                    )}
                                ></div>

                                <Card 
                                    className={cn(
                                        "bg-[#0a0a0a] border border-white/5 transition-all duration-300 cursor-pointer overflow-hidden relative",
                                        "hover:border-white/10 hover:bg-zinc-900/30",
                                        isExpanded && "bg-zinc-900/40 border-white/10 ring-1 ring-white/5"
                                    )}
                                    onClick={() => toggleExpand(event.id)}
                                >
                                    {/* Subtle highlight based on type when expanded */}
                                    {isExpanded && (
                                        <div className={cn("absolute left-0 top-0 bottom-0 w-0.5", style.bg)}></div>
                                    )}

                                    <CardContent className="p-5">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        {/* Minimalist Icon - Always neutral */}
                                                        <Icon name={style.icon} size="size-3" className="text-zinc-600" />
                                                        
                                                        {/* Uniform Title Color */}
                                                        <h4 className={cn(
                                                            "text-base font-bold text-zinc-200 group-hover:text-white transition-colors"
                                                        )}>
                                                            {event.title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm text-zinc-500 font-serif leading-relaxed pl-6">
                                                        {event.description}
                                                    </p>
                                                </div>
                                                <div className="pt-1 text-zinc-700">
                                                    <Icon 
                                                        name="angle-small-down" 
                                                        className={cn("transition-transform duration-300", isExpanded && "rotate-180 text-zinc-500")} 
                                                        size="size-3"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Expanded Content */}
                                            <div 
                                                className={cn(
                                                    "grid transition-[grid-template-rows] duration-500 ease-in-out pl-6",
                                                    isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/5" : "grid-rows-[0fr] opacity-0"
                                                )}
                                            >
                                                <div className="overflow-hidden">
                                                    {event.details && event.details.length > 0 ? (
                                                        <ul className="space-y-3">
                                                            {event.details.map((detail, idx) => (
                                                                <li key={idx} className="text-sm text-zinc-400 font-serif flex items-start gap-3 leading-relaxed">
                                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-700 shrink-0"></span>
                                                                    <span dangerouslySetInnerHTML={{ 
                                                                        __html: detail.replace(/\[\[(.*?)\]\]/g, '<strong class="text-zinc-200 font-sans text-xs uppercase tracking-wide">$1</strong>') 
                                                                    }} />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-sm text-zinc-600 italic">Sem detalhes adicionais.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
          );
        })}
        
        {/* End Point */}
        <div className="relative pl-6 md:pl-0 pt-8">
            <div className="absolute left-[3px] md:-left-[21px] top-8 w-1.5 h-1.5 rounded-full bg-zinc-800 -translate-x-1/2"></div>
            <p className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest pl-1">Continuum</p>
        </div>

      </div>
    </div>
  );
};
