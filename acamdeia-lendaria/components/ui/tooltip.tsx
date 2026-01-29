import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

// Simple context just to act as a Provider wrapper conceptually, 
// though for this lightweight version we might not strictly need global state.
const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <div className="relative inline-block group">{children}</div>;
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, className, asChild, ...props }) => {
  return (
    <div className={cn("inline-block cursor-help", className)} {...props}>
      {children}
    </div>
  );
};

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
}

const TooltipContent: React.FC<TooltipContentProps> = ({ children, className, side = "top", ...props }) => {
  return (
    <div
      className={cn(
        "absolute z-50 px-3 py-1.5 text-xs rounded-md shadow-md animate-fade-in pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-foreground text-background font-sans font-semibold whitespace-nowrap",
        // Positioning logic
        side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
        side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
        side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
        side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
        className
      )}
      {...props}
    >
      {children}
      {/* Arrow */}
      {side === "top" && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-foreground"></div>
      )}
      {side === "bottom" && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-foreground"></div>
      )}
    </div>
  );
};

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
