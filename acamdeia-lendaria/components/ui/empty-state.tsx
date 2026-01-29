
import React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "box-open",
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-xl border-2 border-dashed border-border bg-muted/5 min-h-[300px]",
        className
    )}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
        <Icon name={icon} size="size-8" className="opacity-50" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-serif max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
          <div className="mt-2">
              {action}
          </div>
      )}
    </div>
  );
};
