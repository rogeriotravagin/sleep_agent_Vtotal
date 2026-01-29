
import React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Badge } from "./badge";

export interface PipelineStep {
  id: string | number;
  label: string;
  count: number | string;
  icon: string;
  status: 'active' | 'pending' | 'done';
  description?: string;
}

interface PipelineProps {
  steps: PipelineStep[];
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
  color?: string; // Theme color
  className?: string;
}

export const Pipeline: React.FC<PipelineProps> = ({ 
    steps, 
    title = "Pipeline", 
    actionLabel, 
    onAction, 
    color = "#C9B298", // Default Gold
    className 
}) => {
  return (
    <div 
        className={cn(
            "bg-card border border-border rounded-xl p-6 overflow-x-auto shadow-sm cursor-default hover:border-primary/50 transition-colors group", 
            className
        )}
        style={{ '--pipeline-color': color } as React.CSSProperties}
    >
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--pipeline-color)] transition-colors">
                <Icon name="network-cloud" size="size-4" /> {title}
            </h3>
            {actionLabel && (
                <Badge 
                    variant="outline" 
                    className="border-border text-muted-foreground hover:bg-muted cursor-pointer transition-colors"
                    onClick={onAction}
                >
                    {actionLabel} <Icon name="arrow-right" size="size-3" className="ml-2" />
                </Badge>
            )}
        </div>
        
        <div className="flex items-center justify-between min-w-[800px] relative pointer-events-none pb-2">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-0">
                {/* Active Progress Simulation (approx 40% for visual effect) */}
                <div className="h-full w-[40%] transition-all duration-1000 bg-[var(--pipeline-color)] opacity-50"></div>
            </div>
            
            {steps.map((step) => {
                const isActive = step.status === 'active';
                const isDone = step.status === 'done';

                return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group/step" title={step.description}>
                        <div 
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-card",
                            isActive 
                                ? "text-white scale-110 shadow-lg ring-4 ring-[var(--pipeline-color)]/20 bg-[var(--pipeline-color)] border-[var(--pipeline-color)]" 
                                : isDone
                                ? "text-[var(--pipeline-color)] border-[var(--pipeline-color)]"
                                : "border-border text-muted-foreground group-hover/step:text-foreground"
                        )}
                        >
                            {isDone ? <Icon name="check" size="size-4" /> : <Icon name={step.icon} size="size-4" />}
                        </div>
                        <div className="text-center">
                            <p 
                                className={cn(
                                    "text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors",
                                    isActive || isDone ? "text-[var(--pipeline-color)]" : "text-muted-foreground"
                                )}
                            >
                                {step.label}
                            </p>
                            <p className="text-sm font-mono text-muted-foreground">{step.count}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};
