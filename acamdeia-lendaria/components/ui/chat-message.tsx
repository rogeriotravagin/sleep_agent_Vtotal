
import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Icon } from "./icon";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: React.ReactNode; // Can be string or JSX
  avatar?: string; // URL or Initials
  timestamp?: string;
  isTyping?: boolean;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  avatar,
  timestamp,
  isTyping,
  className
}) => {
  const isUser = role === "user";
  const isSystem = role === "system";

  if (isSystem) {
    return (
        <div className={cn("flex justify-center my-4", className)}>
            <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full uppercase tracking-wider">
                {content}
            </span>
        </div>
    );
  }

  return (
    <div className={cn("flex gap-4 w-full animate-fade-in", isUser ? "flex-row-reverse" : "flex-row", className)}>
      {/* Avatar */}
      <Avatar className={cn(
          "w-8 h-8 mt-1 border", 
          isUser ? "border-border" : "border-primary/30 bg-primary/5 text-primary"
      )}>
        {avatar && avatar.includes("http") ? (
             <AvatarImage src={avatar} />
        ) : (
            <AvatarFallback className={isUser ? "" : "bg-transparent"}>
                {avatar || (isUser ? "U" : <Icon name="sparkles" size="size-4" />)}
            </AvatarFallback>
        )}
      </Avatar>

      {/* Bubble */}
      <div className={cn(
        "max-w-[85%] rounded-2xl p-4 text-sm shadow-sm leading-relaxed whitespace-pre-wrap font-serif",
        isUser 
            ? "bg-muted text-foreground rounded-tr-sm" 
            : "bg-card border border-border text-foreground rounded-tl-sm"
      )}>
        {isTyping ? (
             <div className="flex items-center gap-1 h-5">
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
            </div>
        ) : (
            content
        )}
        
        {timestamp && (
            <div className={cn("text-[10px] opacity-50 mt-2 font-sans font-medium text-right")}>
                {timestamp}
            </div>
        )}
      </div>
    </div>
  );
};
