
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';

interface PrdUploadTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Types ---
interface Message {
    id: string;
    role: 'user' | 'assistant';
    type: 'text' | 'audio' | 'file';
    content?: string;
    fileName?: string;
    fileSize?: string;
    fileType?: string; // 'image' | 'doc'
    fileUrl?: string; // For images
    audioDuration?: string;
}

const PrdUploadTemplate: React.FC<PrdUploadTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // State for Chat History - Starts Empty for "Zero State" view
  const [messages, setMessages] = useState<Message[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  // Wizard Steps
  const steps = [
      { id: "upload", label: "Ideia", status: "active" },
      { id: "brief", label: "Brief", status: "pending" },
      { id: "prd", label: "PRD", status: "pending" },
      { id: "epics", label: "Épicos", status: "pending" },
      { id: "stories", label: "Stories", status: "pending" },
      { id: "export", label: "Export", status: "pending" }
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
      if (messages.length > 0 && scrollViewportRef.current) {
          scrollViewportRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
  }, [messages]);

  // Recording Timer
  useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (isRecording) {
          interval = setInterval(() => {
              setRecordingTime(prev => prev + 1);
          }, 1000);
      } else {
          setRecordingTime(0);
      }
      return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSendMessage = () => {
      if (!inputValue.trim() && !isRecording) return;

      const newUserMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          type: 'text',
          content: inputValue
      };

      // If it's the first message, add a system welcome message after user message
      if (messages.length === 0) {
          const systemWelcome: Message = {
              id: 'sys-welcome',
              role: 'assistant',
              type: 'text',
              content: "Perfeito. Já comecei a estruturar sua ideia. \n\nPode me dar mais detalhes sobre o público-alvo ou o problema principal que você quer resolver?"
          };
          setMessages([newUserMsg, systemWelcome]);
      } else {
          setMessages(prev => [...prev, newUserMsg]);
      }
      
      setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
      }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const isImage = file.type.startsWith('image/');
          
          const newMessage: Message = {
              id: Date.now().toString(),
              role: 'user',
              type: 'file',
              fileName: file.name,
              fileSize: `${(file.size / 1024).toFixed(1)} KB`,
              fileType: isImage ? 'image' : 'doc',
              fileUrl: isImage ? URL.createObjectURL(file) : undefined
          };

          // If first message is file
          if (messages.length === 0) {
             const systemWelcome: Message = {
                  id: 'sys-welcome',
                  role: 'assistant',
                  type: 'text',
                  content: "Recebi o arquivo. Estou analisando o conteúdo. Gostaria de adicionar algum contexto?"
              };
              setMessages([newMessage, systemWelcome]);
          } else {
              setMessages(prev => [...prev, newMessage]);
          }
          
          toast({ title: "Arquivo enviado", variant: "success" });
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleRecording = () => {
      if (isRecording) {
          // Stop Recording
          setIsRecording(false);
          const newMessage: Message = {
              id: Date.now().toString(),
              role: 'user',
              type: 'audio',
              audioDuration: formatTime(recordingTime)
          };
          
          if (messages.length === 0) {
              const systemWelcome: Message = {
                  id: 'sys-welcome',
                  role: 'assistant',
                  type: 'text',
                  content: "Áudio recebido e transcrito. Entendi o conceito principal."
              };
              setMessages([newMessage, systemWelcome]);
          } else {
              setMessages(prev => [...prev, newMessage]);
          }

          toast({ title: "Áudio gravado com sucesso", variant: "success" });
      } else {
          // Start Recording
          setIsRecording(true);
      }
  };

  const handleAnalyze = () => {
      setIsAnalyzing(true);
      // Simulate AI Processing
      setTimeout(() => {
          setIsAnalyzing(false);
          if (onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_PROJECT_DETAIL);
      }, 3000);
  };

  // State to toggle between Hero View (Zero State) and Chat View
  const hasStarted = messages.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground relative overflow-hidden">
      
      {/* Processing Overlay */}
      {isAnalyzing && (
          <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
              <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[var(--studio-teal)]/20 blur-xl rounded-full animate-pulse" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}></div>
                  <div className="relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center bg-card border border-[var(--studio-teal)]/30 shadow-2xl animate-bounce" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      <Icon name="brain-circuit" className="text-[var(--studio-teal)] animate-pulse" size="size-10" />
                  </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 animate-pulse">Gerando Especificação...</h2>
              <div className="h-1 w-64 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--studio-teal)] animate-[shimmer_2s_infinite]" style={{ width: '100%', '--studio-teal': STUDIO_TEAL } as React.CSSProperties}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">Transformando conversa em PRD</p>
          </div>
      )}

      {/* Header */}
      <header className={cn(
          "border-b border-border transition-all duration-500 z-40 sticky top-0",
          hasStarted ? "bg-card/50 backdrop-blur-sm" : "bg-transparent border-transparent"
      )}>
          <div className="container py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="hover:text-foreground cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}>Projetos</span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="text-foreground font-medium">Novo Projeto</span>
                  </div>
                  <Badge variant="outline" className="w-fit border-[var(--studio-teal)]/30 text-[var(--studio-teal)] bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      AI Architect v2.0
                  </Badge>
              </div>

              {/* Wizard Steps */}
              <div className="flex items-center justify-between relative max-w-3xl mx-auto">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10"></div>
                  {steps.map((step, i) => (
                      <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2 z-10 rounded-full">
                          <div 
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                                step.status === 'active' 
                                    ? "border-[var(--studio-teal)] bg-[var(--studio-teal)] text-white shadow-lg shadow-[var(--studio-teal)]/20" 
                                    : "border-border bg-card text-muted-foreground"
                            )}
                            style={step.status === 'active' ? { '--studio-teal': STUDIO_TEAL } as React.CSSProperties : {}}
                          >
                              {i + 1}
                          </div>
                          <span className={cn(
                              "text-[10px] font-bold uppercase tracking-wider hidden sm:block",
                              step.status === 'active' ? "text-[var(--studio-teal)]" : "text-muted-foreground"
                          )} style={step.status === 'active' ? { color: STUDIO_TEAL } : {}}>
                              {step.label}
                          </span>
                      </div>
                  ))}
              </div>
          </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col w-full relative">
          
          {!hasStarted ? (
              // --- ZERO STATE (HERO CENTERED INPUT) ---
              <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fade-in -mt-20">
                  <div className="w-full max-w-2xl space-y-8 text-center relative z-10">
                      
                      <div className="space-y-4">
                          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                              O que vamos <br/>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--studio-teal)] to-blue-500" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>construir hoje?</span>
                          </h1>
                          <p className="text-lg text-muted-foreground font-serif max-w-lg mx-auto">
                              Descreva sua ideia, cole um briefing ou grave um áudio. A IA estruturará seu projeto automaticamente.
                          </p>
                      </div>
                      
                      {/* Centered Input Box */}
                      <div className="relative bg-card border border-border rounded-2xl shadow-2xl shadow-black/5 focus-within:ring-2 focus-within:ring-[var(--studio-teal)] focus-within:border-[var(--studio-teal)] transition-all p-1 text-left group hover:border-[var(--studio-teal)]/50" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          <AutosizeTextarea 
                              placeholder="Ex: Quero um app de delivery para farmácias com rastreamento em tempo real..."
                              className="min-h-[120px] text-lg bg-transparent border-none focus:ring-0 resize-none p-5 placeholder:text-muted-foreground/40 leading-relaxed rounded-xl"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown} 
                              autoFocus
                          />
                          
                          <div className="flex justify-between items-center px-3 pb-3 pt-2">
                              <div className="flex gap-1">
                                  {/* Attachment / Voice Buttons */}
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg"
                                    onClick={() => fileInputRef.current?.click()}
                                    title="Anexar arquivo"
                                  >
                                      <Icon name="clip" size="size-4" />
                                  </Button>
                                  <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileSelect} 
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className={cn("h-9 w-9 rounded-lg transition-colors", isRecording ? "text-destructive bg-destructive/10 animate-pulse" : "text-muted-foreground hover:text-foreground")}
                                    onClick={toggleRecording}
                                    title="Gravar áudio"
                                  >
                                      <Icon name={isRecording ? "stop" : "microphone"} size="size-4" />
                                  </Button>
                              </div>
                              <Button 
                                   size="icon" 
                                   className="rounded-xl h-10 w-10 transition-all hover:scale-105 active:scale-95"
                                   style={{ backgroundColor: STUDIO_TEAL }}
                                   onClick={handleSendMessage}
                                   disabled={!inputValue.trim() && !isRecording}
                              >
                                  <Icon name="arrow-up" size="size-5" />
                              </Button>
                          </div>
                      </div>
                      
                      {/* Quick Prompts */}
                      <div className="flex flex-wrap justify-center gap-2 animate-fade-in delay-100">
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted py-1.5 px-3 text-xs font-normal border-dashed text-muted-foreground hover:text-foreground transition-colors" onClick={() => setInputValue("Criar um CRM para corretores de imóveis focando em...")}>CRM Imobiliário</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted py-1.5 px-3 text-xs font-normal border-dashed text-muted-foreground hover:text-foreground transition-colors" onClick={() => setInputValue("Landing Page de alta conversão para infoproduto de...")}>Landing Page</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted py-1.5 px-3 text-xs font-normal border-dashed text-muted-foreground hover:text-foreground transition-colors" onClick={() => setInputValue("App mobile de agendamento para clínicas de...")}>App de Clínica</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted py-1.5 px-3 text-xs font-normal border-dashed text-muted-foreground hover:text-foreground transition-colors" onClick={() => setInputValue("Dashboard financeiro para SaaS B2B com...")}>SaaS Dashboard</Badge>
                      </div>
                  </div>
                  
                  {/* Background Decoration */}
                  <div className="fixed bottom-0 w-full h-[40vh] bg-gradient-to-t from-background to-transparent pointer-events-none z-0"></div>
                  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--studio-teal)]/5 rounded-full blur-[120px] pointer-events-none -z-10" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}></div>
              </div>
          ) : (
              // --- CHAT INTERFACE VIEW (After Start) ---
              <>
                <div className="flex-1 overflow-hidden relative max-w-3xl mx-auto w-full">
                    <ScrollArea className="h-full p-4 md:p-6 pb-32">
                        <div className="space-y-8">
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={cn(
                                        "flex gap-4 animate-fade-in",
                                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    {/* Avatar */}
                                    <Avatar className={cn(
                                        "w-8 h-8 mt-1 border",
                                        msg.role === 'assistant' 
                                            ? "bg-[var(--studio-teal)]/10 border-[var(--studio-teal)]/20 text-[var(--studio-teal)]" 
                                            : "bg-muted border-border"
                                    )} style={msg.role === 'assistant' ? { '--studio-teal': STUDIO_TEAL } as React.CSSProperties : {}}>
                                        {msg.role === 'assistant' ? (
                                            <div className="flex items-center justify-center w-full h-full"><Icon name="sparkles" size="size-4" /></div>
                                        ) : (
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        )}
                                        <AvatarFallback>{msg.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                                    </Avatar>

                                    {/* Message Bubble */}
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl p-4 shadow-sm text-sm font-serif leading-relaxed whitespace-pre-wrap",
                                        msg.role === 'user' 
                                            ? "bg-muted text-foreground rounded-tr-sm" 
                                            : "bg-card border border-border rounded-tl-sm text-foreground"
                                    )}>
                                        
                                        {/* Text Content */}
                                        {msg.type === 'text' && msg.content}

                                        {/* Audio Content */}
                                        {msg.type === 'audio' && (
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <button className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                                                    <Icon name="play" size="size-3" className="fill-current text-foreground ml-0.5" />
                                                </button>
                                                <div className="h-1 flex-1 bg-foreground/10 rounded-full overflow-hidden">
                                                    <div className="h-full w-1/3 bg-foreground/50"></div>
                                                </div>
                                                <span className="text-xs font-mono text-muted-foreground">{msg.audioDuration}</span>
                                            </div>
                                        )}

                                        {/* File Content */}
                                        {msg.type === 'file' && (
                                            <div className="flex flex-col gap-2">
                                                {msg.fileType === 'image' && msg.fileUrl && (
                                                    <div className="rounded-lg overflow-hidden border border-border mb-2">
                                                        <img src={msg.fileUrl} alt="Preview" className="max-w-full h-auto max-h-48 object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-background rounded-lg border border-border">
                                                        <Icon name={msg.fileType === 'image' ? 'picture' : 'document'} size="size-4" className="text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground line-clamp-1">{msg.fileName}</p>
                                                        <p className="text-[10px] text-muted-foreground">{msg.fileSize}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={scrollViewportRef} className="h-4" />
                        </div>
                    </ScrollArea>
                </div>

                {/* Input Area (Sticky Bottom of container) */}
                <div className="p-4 bg-background border-t border-border mt-auto relative z-20 max-w-3xl mx-auto w-full">
                    {/* Recording Indicator */}
                    {isRecording && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-4 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-2 shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            Gravando {formatTime(recordingTime)}
                        </div>
                    )}

                    <div className="flex items-end gap-2 bg-card border border-input rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--studio-teal)] transition-all" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                        
                        {/* Attachments */}
                        <div className="flex items-center gap-1 pb-1 pl-1">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Icon name="clip" size="size-4" />
                            </Button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileSelect} 
                                accept="image/*,.pdf,.doc,.docx,.txt"
                            />
                            
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn("h-8 w-8 rounded-lg transition-colors", isRecording ? "text-destructive bg-destructive/10 hover:bg-destructive/20" : "text-muted-foreground hover:text-foreground")}
                                onClick={toggleRecording}
                            >
                                <Icon name={isRecording ? "stop" : "microphone"} size="size-4" />
                            </Button>
                        </div>

                        {/* Text Input */}
                        <AutosizeTextarea 
                            placeholder={isRecording ? "Gravando áudio..." : "Digite sua mensagem..."}
                            className="flex-1 min-h-[44px] max-h-[160px] bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-sm placeholder:text-muted-foreground/50 disabled:opacity-50"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isRecording}
                            autoFocus
                        />

                        {/* Send Button */}
                        <Button 
                            size="icon" 
                            className="h-9 w-9 mb-1 rounded-lg shrink-0 transition-transform active:scale-95 text-white"
                            style={{ backgroundColor: STUDIO_TEAL }}
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() && !isRecording}
                        >
                            <Icon name="arrow-up" size="size-4" />
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
                        Pressione Enter para enviar. Shift + Enter para quebra de linha.
                    </p>
                </div>
              </>
          )}

      </main>

      {/* Wizard Footer (Only visible when chat has started to allow progression) */}
      {hasStarted && (
          <footer className="border-t border-border bg-card p-4 md:p-6 sticky bottom-0 z-40 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
              <div className="container max-w-3xl mx-auto flex justify-between items-center">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}>
                      Cancelar
                  </Button>
                  <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground hidden sm:inline-block">
                          Pronto para processar
                      </span>
                      <Button 
                        size="lg" 
                        className="shadow-lg hover:opacity-90 transition-opacity font-bold text-white"
                        style={{ backgroundColor: STUDIO_TEAL }}
                        onClick={handleAnalyze}
                      >
                          Analisar com IA <Icon name="sparkles" className="ml-2" size="size-4" />
                      </Button>
                  </div>
              </div>
          </footer>
      )}

    </div>
  );
};

export default PrdUploadTemplate;
