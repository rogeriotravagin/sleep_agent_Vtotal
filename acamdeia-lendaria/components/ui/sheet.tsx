import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children, side = "right", className }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle animation timing
  React.useEffect(() => {
    if (open) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isMounted) return null;
  if (!isVisible && !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => onOpenChange(false)}
      />
      
      {/* Panel */}
      <div 
        className={cn(
            "fixed inset-y-0 z-50 h-full w-3/4 border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm flex flex-col",
            side === "right" ? "right-0 border-l" : "left-0 border-r",
            open 
                ? "translate-x-0" 
                : side === "right" ? "translate-x-full" : "-translate-x-full",
            className
        )}
      >
        <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-50"
        >
            <Icon name="cross" size="size-4" />
            <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left mb-6", className)} {...props} />
);

const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-6 border-t border-border", className)} {...props} />
);

const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold font-sans text-foreground", className)} {...props} />
);

const SheetDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground font-serif", className)} {...props} />
);

export { Sheet, SheetHeader, SheetFooter, SheetTitle, SheetDescription };