
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Message } from '../../types/project-creator';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isTyping, 
  onSendMessage,
  className 
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const STUDIO_COLOR = "#538096"; // Petrol Blue for Course Studio

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background relative", className)}>
      
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isSystem = msg.role === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-4 animate-fade-in">
                <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                  <Icon name="sparkles" size="size-3" /> {msg.content}
                </span>
              </div>
            );
          }

          return (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-4 max-w-3xl animate-fade-in",
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <Avatar className={cn(
                "w-8 h-8 mt-1 border shadow-sm",
                isUser ? "border-border" : "border-[var(--studio-color)]/30 bg-[var(--studio-color)]/5 text-[var(--studio-color)]"
              )} style={!isUser ? { '--studio-color': STUDIO_COLOR } as React.CSSProperties : {}}>
                <AvatarFallback className={isUser ? "" : "bg-transparent"}>
                  {isUser ? "U" : <Icon name="bot" size="size-4" />}
                </AvatarFallback>
              </Avatar>

              <div className={cn(
                "rounded-2xl p-4 text-sm font-serif leading-relaxed shadow-sm",
                isUser 
                  ? "bg-primary/10 text-foreground rounded-tr-sm" 
                  : "bg-card border border-border text-foreground rounded-tl-sm"
              )}>
                 <div className="whitespace-pre-wrap">{msg.content}</div>
                 <div className="text-[10px] opacity-40 mt-2 font-sans text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
           <div className="flex gap-4 mr-auto animate-fade-in">
              <Avatar className="w-8 h-8 mt-1 border border-[var(--studio-color)]/30 bg-[var(--studio-color)]/5 text-[var(--studio-color)]" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}>
                <AvatarFallback className="bg-transparent"><Icon name="bot" size="size-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-12">
                  <span className="w-1.5 h-1.5 bg-[var(--studio-color)]/60 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}></span>
                  <span className="w-1.5 h-1.5 bg-[var(--studio-color)]/60 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}></span>
                  <span className="w-1.5 h-1.5 bg-[var(--studio-color)]/60 rounded-full animate-bounce" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}></span>
              </div>
           </div>
        )}
        
        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md sticky bottom-0 z-10">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-card border border-input rounded-xl p-2 shadow-lg ring-offset-background focus-within:ring-2 focus-within:ring-[var(--studio-color)] focus-within:ring-offset-2 transition-all" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}>
              
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg mb-0.5">
                  <Icon name="clip" size="size-4" />
              </Button>

              <AutosizeTextarea 
                  maxHeight={120}
                  placeholder="Descreva seu projeto..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-sm placeholder:text-muted-foreground/50"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  autoFocus
              />

              <Button 
                  size="icon" 
                  className={cn(
                      "h-9 w-9 rounded-lg shrink-0 transition-all mb-0.5",
                      inputValue.trim() ? "opacity-100" : "opacity-50"
                  )}
                  style={{ backgroundColor: STUDIO_COLOR }}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
              >
                  <Icon name="arrow-up" size="size-4" />
              </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2 font-mono">
              IA Architect v2.0 • Pressione Enter para enviar
          </p>
      </div>
    </div>
  );
};
