
import React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

export interface TimelineItemProps {
  title: string;
  description?: string;
  date: string;
  icon?: string;
  status?: "default" | "active" | "success" | "warning";
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ 
    title, 
    description, 
    date, 
    icon = "circle", 
    status = "default",
    isLast 
}) => {
    
  const statusStyles = {
      default: "bg-muted text-muted-foreground border-border",
      active: "bg-primary/10 text-primary border-primary",
      success: "bg-green-500/10 text-green-500 border-green-500",
      warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500"
  };

  return (
    <div className="relative pl-8 pb-8 group">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border group-hover:bg-foreground/20 transition-colors" />
      )}
      
      {/* Icon Node */}
      <div className={cn(
          "absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-all",
          statusStyles[status]
      )}>
          <Icon name={icon} size="size-3" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground leading-none">{title}</h4>
            <span className="text-[10px] font-mono text-muted-foreground">{date}</span>
        </div>
        {description && (
            <p className="text-sm text-muted-foreground font-serif leading-snug">
                {description}
            </p>
        )}
      </div>
    </div>
  );
};

export const Timeline: React.FC<{ items: Omit<TimelineItemProps, 'isLast'>[], className?: string }> = ({ items, className }) => {
    return (
        <div className={cn("flex flex-col", className)}>
            {items.map((item, i) => (
                <TimelineItem 
                    key={i} 
                    {...item} 
                    isLast={i === items.length - 1} 
                />
            ))}
        </div>
    )
}
