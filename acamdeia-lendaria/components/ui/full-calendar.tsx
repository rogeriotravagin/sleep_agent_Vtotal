
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';
import { Button } from './button';
import { Badge } from './badge';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date; // Simple date handling
  type?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral';
}

interface FullCalendarProps {
  events?: CalendarEvent[];
  className?: string;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
}

export const FullCalendar: React.FC<FullCalendarProps> = ({ 
    events = [], 
    className,
    onEventClick,
    onDateClick 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay(); // 0 Sunday

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getEventsForDay = (day: number) => {
    return events.filter(e => 
      e.date.getDate() === day && 
      e.date.getMonth() === month && 
      e.date.getFullYear() === year
    );
  };

  const isToday = (day: number) => {
      const today = new Date();
      return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Grid Generation
  const blanks = Array.from({ length: startDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getTypeStyle = (type: string = 'neutral') => {
      switch(type) {
          case 'primary': return "bg-primary/20 text-primary border-primary/30";
          case 'success': return "bg-green-500/10 text-green-600 border-green-500/20";
          case 'warning': return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
          case 'destructive': return "bg-red-500/10 text-red-600 border-red-500/20";
          default: return "bg-muted text-muted-foreground border-border";
      }
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]", className)}>
      
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/5">
         <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold font-sans flex gap-2 items-baseline">
                 {monthNames[month]} <span className="text-sm font-normal text-muted-foreground">{year}</span>
             </h2>
             <div className="flex bg-background border border-border rounded-md p-0.5">
                 <button onClick={prevMonth} className="p-1 hover:bg-muted rounded"><Icon name="angle-left" size="size-4" /></button>
                 <button onClick={nextMonth} className="p-1 hover:bg-muted rounded"><Icon name="angle-right" size="size-4" /></button>
             </div>
         </div>
         <Button variant="outline" size="sm" onClick={goToday}>Hoje</Button>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/20">
          {weekDays.map(d => (
              <div key={d} className="py-2 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {d}
              </div>
          ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-border gap-[1px]">
          {/* Empty Slots */}
          {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="bg-card/50 min-h-[100px]"></div>
          ))}

          {/* Days */}
          {days.map(day => {
              const dayEvents = getEventsForDay(day);
              const todayClass = isToday(day) ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground";

              return (
                  <div 
                    key={day} 
                    className={cn(
                        "bg-card p-2 min-h-[120px] hover:bg-muted/10 transition-colors group relative cursor-pointer",
                    )}
                    onClick={() => onDateClick?.(new Date(year, month, day))}
                  >
                      <div className="flex justify-between items-start mb-2">
                          <span className={cn(
                              "w-7 h-7 flex items-center justify-center rounded-full text-sm",
                              todayClass
                          )}>
                              {day}
                          </span>
                          {/* Add Icon on Hover */}
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
                              <Icon name="plus" size="size-3" />
                          </button>
                      </div>

                      <div className="space-y-1">
                          {dayEvents.map(event => (
                              <div 
                                key={event.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick?.(event);
                                }}
                                className={cn(
                                    "text-[10px] px-2 py-1 rounded border truncate font-medium cursor-pointer hover:opacity-80 transition-opacity",
                                    getTypeStyle(event.type)
                                )}
                              >
                                  {event.title}
                              </div>
                          ))}
                          {dayEvents.length > 3 && (
                               <div className="text-[9px] text-muted-foreground pl-1 font-medium">
                                   + {dayEvents.length - 3} mais
                               </div>
                          )}
                      </div>
                  </div>
              );
          })}
      </div>
    </div>
  );
};
