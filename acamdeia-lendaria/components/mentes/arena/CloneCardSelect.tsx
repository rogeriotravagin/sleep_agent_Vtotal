
import React from 'react';
import { Clone } from './types';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface CloneCardSelectProps {
    clone: Clone;
    selected: boolean;
    onClick: () => void;
    compact?: boolean;
}

export const CloneCardSelect: React.FC<CloneCardSelectProps> = ({ clone, selected, onClick, compact = false }) => (
    <div 
        onClick={onClick}
        className={cn(
            "relative cursor-pointer transition-all duration-300 group overflow-hidden border",
            compact ? "p-3 rounded-lg flex items-center gap-3" : "p-4 rounded-xl flex flex-col items-center text-center gap-3",
            selected 
                ? "bg-brand-gold/10 border-brand-gold ring-1 ring-brand-gold shadow-[0_0_20px_-5px_rgba(201,178,152,0.3)]" 
                : "bg-card border-white/5 hover:border-white/20 hover:bg-white/5"
        )}
    >
        {selected && (
            <div className="absolute top-2 right-2 text-brand-gold animate-scale-in">
                <Icon name="check-circle" type="solid" size="size-4" />
            </div>
        )}
        
        <Avatar className={cn(
            "border-2 transition-transform duration-500", 
            selected ? "border-brand-gold scale-110" : "border-transparent group-hover:scale-105",
            compact ? "w-10 h-10" : "w-20 h-20"
        )}>
            {/* Fallback to initials if no image, using clone specific color for text */}
            <AvatarFallback className={cn("bg-zinc-900 font-black", clone.color, compact ? "text-xs" : "text-xl")}>
                {clone.avatar}
            </AvatarFallback>
        </Avatar>

        <div className={cn("flex-1 min-w-0", compact ? "text-left" : "text-center")}>
            <h4 className={cn("font-bold text-white truncate transition-colors", selected ? "text-brand-gold" : "group-hover:text-zinc-200")}>
                {clone.name}
            </h4>
            <p className="text-xs text-zinc-500 truncate font-serif">{clone.role}</p>
            
            {!compact && (
                <div className="flex justify-center gap-3 mt-3 text-[10px] font-mono text-zinc-600">
                    <span className="flex items-center gap-1" title="Win Rate">
                        <Icon name="trophy" size="size-3" className={selected ? "text-brand-gold" : ""} /> {clone.winRate}%
                    </span>
                    <span className="flex items-center gap-1" title="Fidelity Score">
                        <Icon name="brain" size="size-3" className={selected ? "text-brand-gold" : ""} /> {clone.fidelity}
                    </span>
                </div>
            )}
        </div>
    </div>
);
