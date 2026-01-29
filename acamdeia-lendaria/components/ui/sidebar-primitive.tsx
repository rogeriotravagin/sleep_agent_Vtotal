
import React, { createContext, useContext, useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Button } from "./button";
import { Sheet } from "./sheet";

// --- Context ---
interface SidebarContextValue {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

// --- Provider ---
export const SidebarProvider: React.FC<{ children: React.ReactNode; defaultExpanded?: boolean }> = ({ 
    children, 
    defaultExpanded = true 
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => setExpanded(prev => !prev), []);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, toggle, mobileOpen, setMobileOpen }}>
      <div className="flex h-full w-full overflow-hidden bg-background">
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

// --- Sidebar Root ---
export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const { expanded, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
          expanded ? "w-64" : "w-16",
          className
        )}
        {...props}
      >
        {children}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="left">
        <div className="h-full bg-card p-4 w-64">
           {children}
        </div>
      </Sheet>
    </>
  );
};

// --- Sub-components ---
export const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const { expanded } = useSidebar();
  return (
    <div className={cn("flex items-center h-16 px-4 border-b border-border", expanded ? "justify-between" : "justify-center", className)} {...props}>
      {expanded ? children : <div className="w-8 h-8 flex items-center justify-center">{/* Icon only view handled by children usually */}</div>}
       {/* If children has generic content, we might need to conditionally render based on expanded state in the parent usage */}
       {expanded && children} 
    </div>
  );
};

export const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("flex-1 overflow-y-auto custom-scrollbar py-4", className)} {...props}>
    {children}
  </div>
);

export const SidebarFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("p-4 border-t border-border", className)} {...props}>
    {children}
  </div>
);

export const SidebarGroup: React.FC<React.HTMLAttributes<HTMLDivElement> & { label?: string }> = ({ className, label, children, ...props }) => {
  const { expanded } = useSidebar();
  return (
    <div className={cn("mb-6 px-2", className)} {...props}>
      {label && expanded && (
        <h4 className="mb-2 px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider transition-opacity duration-200">
          {label}
        </h4>
      )}
      {label && !expanded && (
         <div className="h-4 border-b border-border mb-2 mx-2"></div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  active?: boolean;
  badge?: string | number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ className, icon, children, active, badge, ...props }) => {
  const { expanded } = useSidebar();

  return (
    <button
      className={cn(
        "group flex w-full items-center rounded-lg p-2 text-sm font-medium transition-colors relative",
        active 
            ? "bg-primary/10 text-primary hover:bg-primary/15" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        !expanded && "justify-center",
        className
      )}
      title={!expanded && typeof children === 'string' ? children : undefined}
      {...props}
    >
      <Icon name={icon} size="size-5" className={cn("shrink-0", active && "text-primary")} />
      
      {expanded && (
        <span className="ml-3 flex-1 text-left truncate animate-fade-in">{children}</span>
      )}

      {expanded && badge && (
        <span className={cn(
            "ml-auto text-xs py-0.5 px-2 rounded-full",
            active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
            {badge}
        </span>
      )}
      
      {!expanded && badge && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full ring-2 ring-card"></div>
      )}
    </button>
  );
};

export const SidebarTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  const { toggle, setMobileOpen } = useSidebar();
  
  return (
    <>
        {/* Desktop Trigger */}
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggle} 
            className={cn("hidden md:flex text-muted-foreground hover:text-foreground", className)} 
            {...props}
        >
            <Icon name="menu-burger" size="size-4" />
        </Button>
        {/* Mobile Trigger */}
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileOpen(true)} 
            className={cn("md:hidden text-muted-foreground hover:text-foreground", className)} 
            {...props}
        >
            <Icon name="menu-burger" size="size-4" />
        </Button>
    </>
  );
};
