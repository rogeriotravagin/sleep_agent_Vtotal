
import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface ActivityHeatmapProps {
  data: number[]; // Array of values (0-100) representing activity intensity
  labels?: string[]; // Optional labels for days
  className?: string;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ 
  data, 
  labels, 
  className 
}) => {
  const max = Math.max(...data);

  return (
    <div className={cn("w-full", className)}>
        <div className="flex items-end gap-1 h-32 w-full justify-between">
            {data.map((value, i) => {
                const heightPercentage = max > 0 ? (value / max) * 100 : 0;
                // Min height for visibility
                const displayHeight = Math.max(heightPercentage, 5); 
                
                return (
                    <div key={i} className="flex-1 flex flex-col justify-end group relative">
                         {/* Tooltip */}
                         <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-10 border border-border">
                             {value} XP
                         </div>
                         
                         {/* Bar */}
                         <div 
                            className={cn(
                                "w-full rounded-t-sm transition-all duration-300",
                                value === 0 ? "bg-muted/30" : "bg-muted hover:bg-primary/80"
                            )}
                            style={{ 
                                height: `${displayHeight}%`,
                                // Highlight top performers
                                backgroundColor: value > (max * 0.8) ? 'var(--primary)' : undefined 
                            }}
                         ></div>
                    </div>
                );
            })}
        </div>
        {labels && (
            <div className="flex justify-between mt-2 text-[9px] text-muted-foreground uppercase font-bold">
                {labels.map((label, i) => (
                    <span key={i}>{label}</span>
                ))}
            </div>
        )}
    </div>
  );
};
