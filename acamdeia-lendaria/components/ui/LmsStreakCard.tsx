
import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface DayActivity {
  label: string;
  isActive: boolean;
  isToday?: boolean;
}

interface LmsStreakCardProps {
  count: number;
  days: DayActivity[];
  className?: string;
}

export const LmsStreakCard: React.FC<LmsStreakCardProps> = ({ count, days, className }) => {
  return (
    <div className={cn(
        "bg-card border border-border rounded-[3rem] p-10 shadow-xl relative overflow-hidden transition-all duration-700 hover:shadow-2xl",
        className
    )}>
        {/* Camada Atmosférica (Glow de Fundo) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,178,152,0.05),transparent_60%)] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-10">
            {/* Topo: Contador e Ícone de Energia */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h3 className="text-7xl font-black font-sans text-foreground tracking-tighter leading-none">
                        {count}
                    </h3>
                    <p className="text-[9px] font-black text-brand-orange uppercase tracking-[0.5em] ml-1">
                        Dias de Ofensiva
                    </p>
                </div>
                
                {/* Ícone com Glow Pulsante */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-brand-orange/20 blur-[30px] rounded-full animate-pulse-slow"></div>
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange border border-brand-orange/20 shadow-[0_0_40px_rgba(255,149,0,0.15)] relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon name="flame" type="solid" size="size-8" />
                    </div>
                </div>
            </div>

            {/* Calendário Semanal (HUD de Atividade) */}
            <div className="flex justify-between items-center bg-muted/20 p-8 rounded-[2rem] border border-border/50 backdrop-blur-sm">
                {days.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group/day">
                        <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest transition-colors duration-500",
                            day.isToday ? "text-brand-orange" : "text-muted-foreground/40 group-hover/day:text-muted-foreground"
                        )}>
                            {day.label}
                        </span>
                        
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                            day.isActive 
                                ? "bg-brand-orange text-white shadow-[0_0_25px_rgba(255,149,0,0.3)] scale-110" 
                                : "bg-muted/50 text-muted-foreground/20",
                            day.isToday && !day.isActive && "ring-1 ring-brand-orange ring-offset-4 ring-offset-card"
                        )}>
                            {day.isActive ? (
                                <Icon name="check" size="size-3" className="font-black animate-scale-in" />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Rodapé: Micro-copy Motivacional */}
            <div className="flex justify-center pt-2">
                <p className="text-[10px] text-muted-foreground/40 font-serif italic flex items-center gap-2">
                    <Icon name="info" size="size-3" /> 
                    Você está superando 92% dos alunos esta semana.
                </p>
            </div>
        </div>
    </div>
  );
};
