
import React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Badge } from "./badge";
import { ScrollArea } from "./scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { AvatarGroup } from "./avatar-group";

// --- KANBAN BOARD WRAPPER ---
export const KanbanBoard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={cn("flex-1 overflow-x-auto pb-4", className)} {...props}>
      <div className="flex gap-6 min-w-full h-full p-1">
        {children}
      </div>
    </div>
  );
};

// --- KANBAN COLUMN ---
interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    count?: number;
    color?: string; // Header accent color
    onAdd?: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
    title, 
    count, 
    color, 
    onAdd,
    className, 
    children, 
    ...props 
}) => {
  return (
    <div className={cn("min-w-[320px] w-[320px] flex flex-col h-full rounded-xl bg-muted/5 border border-border/40", className)} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-4 shrink-0 mb-1 border-b border-border/30 bg-card/40 rounded-t-xl">
            <div className="flex items-center gap-2">
                {color && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>}
                <span className="font-bold text-sm text-foreground uppercase tracking-wider">{title}</span>
                {count !== undefined && (
                    <span className="text-[10px] text-muted-foreground font-mono bg-muted/80 px-2 py-0.5 rounded-full">{count}</span>
                )}
            </div>
            <div className="flex gap-1 opacity-50 hover:opacity-100 transition-opacity">
                {onAdd && (
                    <button onClick={onAdd} className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors">
                        <Icon name="plus" size="size-3" />
                    </button>
                )}
                <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors">
                    <Icon name="menu-dots" size="size-3" />
                </button>
            </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-3 pb-3">
            <div className="space-y-3 pt-2">
                {children}
            </div>
        </ScrollArea>
    </div>
  );
};

// --- KANBAN CARD ---
interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    tag?: string;
    priority?: 'low' | 'medium' | 'high';
    members?: { name: string; avatar?: string; fallback: string }[];
    image?: string;
    metrics?: { comments?: number; attachments?: number };
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ 
    title, 
    tag, 
    priority = 'low', 
    members, 
    image, 
    metrics,
    className, 
    ...props 
}) => {
    
    const priorityColors = {
        low: "bg-blue-500",
        medium: "bg-yellow-500",
        high: "bg-red-500"
    };

    return (
        <div 
            className={cn(
                "bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing group relative", 
                className
            )} 
            {...props}
        >
             {/* Priority Indicator */}
             <div className={cn("absolute left-0 top-4 bottom-4 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity", priorityColors[priority])}></div>

             {/* Header: Tag & Priority Dot */}
             <div className="flex justify-between items-start mb-3">
                  {tag && (
                      <Badge variant="secondary" className="text-[9px] font-normal px-2 py-0.5 border border-border bg-muted/50">
                          {tag}
                      </Badge>
                  )}
                  <div className={cn("w-1.5 h-1.5 rounded-full", priorityColors[priority])} title={`Prioridade: ${priority}`} />
             </div>

             {/* Optional Image */}
             {image && (
                 <div className="mb-3 rounded-lg overflow-hidden h-32 w-full relative">
                      <img src={image} className="w-full h-full object-cover" alt="Cover" />
                 </div>
             )}

             {/* Title */}
             <h4 className="text-sm font-semibold text-foreground mb-4 leading-relaxed line-clamp-2">
                 {title}
             </h4>

             {/* Footer */}
             <div className="flex items-center justify-between pt-3 border-t border-border/50">
                 {/* Members */}
                 <div className="flex">
                    {members && members.length > 0 && (
                        <AvatarGroup limit={3} size="sm" className="-space-x-2">
                            {members.map((m, i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-card">
                                    <AvatarImage src={m.avatar} />
                                    <AvatarFallback className="text-[8px] bg-muted">{m.fallback}</AvatarFallback>
                                </Avatar>
                            ))}
                        </AvatarGroup>
                    )}
                 </div>

                 {/* Metrics */}
                 <div className="flex items-center gap-3 text-muted-foreground text-[10px]">
                     {metrics?.attachments !== undefined && (
                         <span className="flex items-center gap-1 hover:text-foreground"><Icon name="clip" size="size-3" /> {metrics.attachments}</span>
                     )}
                     {metrics?.comments !== undefined && (
                         <span className="flex items-center gap-1 hover:text-foreground"><Icon name="comment-alt" size="size-3" /> {metrics.comments}</span>
                     )}
                 </div>
             </div>
        </div>
    );
};
