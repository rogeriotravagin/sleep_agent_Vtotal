
import React from 'react';
import { cn } from '../../lib/utils';

export interface RadarPoint {
  label: string;
  value: number;
  fullMark?: number;
}

interface RadarChartProps {
  data: RadarPoint[];
  width?: number;
  height?: number;
  className?: string;
  color?: string; // Hex or Tailwind class logic
  showLabels?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({ 
  data, 
  width = 200, 
  height = 200, 
  className,
  color = "currentColor",
  showLabels = true
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - (showLabels ? 30 : 10); // Padding for labels
  const levels = 4; // Number of concentric grids

  // Helper to convert polar to cartesian
  const getCoordinates = (value: number, index: number, max: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  // Generate Polygon Points
  const polygonPoints = data.map((point, i) => {
    const max = point.fullMark || 100;
    const { x, y } = getCoordinates(point.value, i, max);
    return `${x},${y}`;
  }).join(' ');

  // Generate Grid Lines
  const gridLines = Array.from({ length: levels }).map((_, levelIndex) => {
    const levelFactor = (levelIndex + 1) / levels;
    const points = data.map((point, i) => {
      const max = point.fullMark || 100;
      const { x, y } = getCoordinates(max * levelFactor, i, max);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Background Grid (Concentric Polygons) */}
        {gridLines.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1 + (i * 0.05)}
            strokeWidth="1"
            className="text-muted-foreground"
          />
        ))}

        {/* Axes (Spokes) */}
        {data.map((point, i) => {
          const max = point.fullMark || 100;
          const { x, y } = getCoordinates(max, i, max);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
              className="text-muted-foreground"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
          className="drop-shadow-sm transition-all duration-500 ease-out"
        />

        {/* Data Points (Dots) */}
        {data.map((point, i) => {
          const max = point.fullMark || 100;
          const { x, y } = getCoordinates(point.value, i, max);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              className="transition-all duration-500 ease-out"
            />
          );
        })}

        {/* Labels */}
        {showLabels && data.map((point, i) => {
          const max = point.fullMark || 100;
          const { x, y } = getCoordinates(max + (max * 0.15), i, max); // Push labels out by 15%
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-sans font-bold fill-muted-foreground uppercase tracking-wider"
            >
              {point.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
