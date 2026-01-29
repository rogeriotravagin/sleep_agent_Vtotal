import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children, align = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div 
        onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
        }} 
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-56 rounded-xl border border-border bg-popover/95 backdrop-blur-md p-1 shadow-xl animate-accordion-down focus:outline-none ring-1 ring-black/5",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {React.Children.map(children, (child) => {
             // Pass close handler to children items
             if (React.isValidElement(child)) {
                 return React.cloneElement(child as React.ReactElement<any>, { onClick: (e: any) => {
                     if (e && e.stopPropagation) e.stopPropagation();
                     if((child.props as any).onClick) (child.props as any).onClick(e);
                     setIsOpen(false);
                 }});
             }
             return child;
          })}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; destructive?: boolean }
>(({ className, inset, destructive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 font-sans group",
      inset && "pl-8",
      destructive && "text-destructive hover:bg-destructive/10 hover:text-destructive",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border/50", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator };