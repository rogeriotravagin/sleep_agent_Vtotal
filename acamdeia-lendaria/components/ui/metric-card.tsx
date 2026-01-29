
import React from "react";
import { Card, CardContent } from "./card";
import { Icon } from "./icon";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  description?: string;
  className?: string;
  color?: string; // Optional override color (hex or class logic)
  sparklineData?: string; // SVG path data for sparkline
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendDirection = "neutral",
  description,
  className,
  color,
  sparklineData
}) => {
  
  // Determine trend color
  const trendColor = 
    trendDirection === "up" ? "text-green-500" : 
    trendDirection === "down" ? "text-red-500" : 
    "text-muted-foreground";

  const trendIcon = 
    trendDirection === "up" ? "trend-up" : 
    trendDirection === "down" ? "trend-down" : 
    "minus";

  return (
    <Card className={cn("overflow-hidden relative group hover:shadow-md transition-all", className)}>
      
      {/* Optional Sparkline Background */}
      {sparklineData && (
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                  <path d={`M0,30 L${sparklineData} L100,30 Z`} fill={color || "currentColor"} />
              </svg>
          </div>
      )}

      <CardContent className="p-6 flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <h3 className="text-3xl font-mono font-bold text-foreground tracking-tight">
            {value}
          </h3>
          
          {(trend || description) && (
            <div className="flex items-center gap-2 mt-2">
              {trend && (
                <span className={cn("text-xs font-bold flex items-center gap-1", trendColor)}>
                  <Icon name={trendIcon} size="size-3" /> {trend}
                </span>
              )}
              {description && (
                <span className="text-[10px] text-muted-foreground font-serif truncate max-w-[120px]">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        <div 
            className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                color ? "" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            )}
            style={color ? { backgroundColor: `${color}20`, color: color } : {}}
        >
          <Icon name={icon} size="size-5" />
        </div>
      </CardContent>
      
      {/* Decorative Bottom Line (only if no sparkline to avoid visual clutter) */}
      {!sparklineData && (
        <div 
            className={cn("absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity", color ? "" : "bg-primary")}
            style={color ? { backgroundColor: color } : {}}
        />
      )}
    </Card>
  );
};
