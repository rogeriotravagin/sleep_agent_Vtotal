
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface PrdStudioTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 
const STUDIO_ACCENT = "#E0F7FA"; // Light Teal/Cyan

const PrdStudioTemplate: React.FC<PrdStudioTemplateProps> = ({ onNavigate, currentSection }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState("");

  // --- Mock Data ---
  const stats = [
      { label: "Projetos Ativos", value: "8", trend: "+12%", trendDir: "up", icon: "folder", desc: "vs mês anterior" },
      { label: "Em Progresso", value: "3", trend: "2 novos", trendDir: "neutral", icon: "spinner", desc: "esta semana", alert: true },
      { label: "Taxa de Conclusão", value: "94%", trend: "+5%", trendDir: "up", icon: "check-circle", desc: "no prazo" },
      { label: "Exports Realizados", value: "42", trend: "+15%", trendDir: "up", icon: "rocket", desc: "vs mês anterior" },
  ];

  const pipeline = [
      { id: 'upload', label: "Upload", icon: "cloud-upload", count: 2, status: 'pending' },
      { id: 'brief', label: "Brief", icon: "document", count: 1, status: 'pending' },
      { id: 'prd', label: "PRD", icon: "list-check", count: 3, status: 'active' },
      { id: 'epics', label: "Épicos", icon: "flag", count: 2, status: 'pending' },
      { id: 'stories', label: "Stories", icon: "list", count: 1, status: 'pending' },
      { id: 'exported', label: "Exportado", icon: "rocket", count: 12, status: 'done' }
  ];

  const projects = [
      { id: 1, name: "CRM para Dentistas", type: "Projeto", status: "PRD", progress: 45, date: "Hoje", updatedBy: "Alan" },
      { id: 2, name: "Landing Black Friday", type: "Tarefa", status: "Exportado", progress: 100, date: "Ontem", updatedBy: "Sarah" },
      { id: 3, name: "App de Agendamento", type: "Projeto", status: "Stories", progress: 80, date: "Há 2 dias", updatedBy: "Marcos" },
      { id: 4, name: "Automação WhatsApp", type: "Tarefa", status: "Brief", progress: 100, date: "Há 3 dias", updatedBy: "Julia" },
      { id: 5, name: "Dashboard Financeiro", type: "Projeto", status: "Épicos", progress: 60, date: "Há 5 dias", updatedBy: "Alan" },
  ];

  const activities = [
      { action: "PRD concluído", target: "CRM para Dentistas", time: "2h atrás", user: "AN" },
      { action: "Novo projeto criado", target: "Dashboard Financeiro", time: "5h atrás", user: "JD" },
      { action: "Export Lovable", target: "Landing Black Friday", time: "1d atrás", user: "SL" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* --- TOP BAR (Custom for PRD Studio) --- */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
          <div className="container flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${STUDIO_TEAL}15`, borderColor: `${STUDIO_TEAL}30`, color: STUDIO_TEAL }}>
                      <Icon name="file-code" size="size-5" />
                  </div>
                  <div>
                      <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                          PRD <span className="font-light" style={{ color: STUDIO_TEAL }}>Studio</span>
                      </h1>
                      <p className="text-xs text-muted-foreground font-serif">Gestão de Especificações Técnicas</p>
                  </div>
              </div>

              <div className="flex items-center gap-4">
                  <nav className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border">
                      <Button variant="ghost" size="sm" className="h-8 bg-background text-foreground shadow-sm font-semibold" style={{ color: STUDIO_TEAL }}>Projetos</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">Pipeline</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">Métricas</Button>
                  </nav>
                  
                  <div className="h-6 w-px bg-border hidden md:block"></div>

                  <Button 
                    className="h-9 text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: STUDIO_TEAL, boxShadow: `0 10px 15px -3px ${STUDIO_TEAL}30` }}
                  >
                      <Icon name="plus" size="size-3" className="mr-2" /> Novo Projeto
                  </Button>
              </div>
          </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="container py-6 md:py-8 w-full space-y-8 flex-1">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                  <Card key={i} className="bg-card border-border shadow-sm hover:border-[var(--studio-teal)]/30 transition-all group relative overflow-hidden" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      <CardContent className="p-5 flex items-start justify-between relative z-10">
                          <div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                              <h3 className="text-3xl font-mono font-medium text-foreground">{stat.value}</h3>
                              <div className="flex items-center gap-1 mt-2">
                                  {stat.trendDir === 'up' && <Icon name="trend-up" className="text-green-500" size="size-3" />}
                                  {stat.trendDir === 'down' && <Icon name="trend-down" className="text-red-500" size="size-3" />}
                                  {stat.trendDir === 'neutral' && <Icon name="minus" className="text-muted-foreground" size="size-3" />}
                                  <span className={`text-[10px] font-bold ${stat.trendDir === 'up' ? 'text-green-600' : stat.trendDir === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                                      {stat.trend}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground font-serif ml-1">{stat.desc}</span>
                              </div>
                          </div>
                          <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors group-hover:text-white",
                              stat.alert ? "bg-red-500/10 text-red-500 group-hover:bg-red-500" : "bg-[var(--studio-teal)]/10 text-[var(--studio-teal)] group-hover:bg-[var(--studio-teal)]"
                          )} style={!stat.alert ? { '--studio-teal': STUDIO_TEAL } as React.CSSProperties : {}}>
                              <Icon name={stat.icon} size="size-5" />
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>

          {/* Pipeline */}
          <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto shadow-sm group hover:border-[var(--studio-teal)]/50 transition-colors cursor-pointer" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--studio-teal)] transition-colors">
                      <Icon name="network-cloud" size="size-4" /> Pipeline de Especificação
                  </h3>
                  <Badge variant="outline" className="border-border text-muted-foreground group-hover:text-[var(--studio-teal)] group-hover:border-[var(--studio-teal)] transition-colors">
                      Clique para Gerenciar <Icon name="arrow-right" size="size-3" className="ml-2" />
                  </Badge>
              </div>
              
              <div className="flex items-center justify-between min-w-[800px] relative">
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-0">
                      <div className="h-full w-[35%] transition-all duration-1000" style={{ backgroundColor: STUDIO_TEAL }}></div>
                  </div>
                  
                  {pipeline.map((step) => (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group/step">
                          <div 
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                step.status === 'active' 
                                    ? "bg-[var(--studio-teal)] text-white scale-110 shadow-lg ring-4 ring-[var(--studio-teal)]/20 border-[var(--studio-teal)]" 
                                    : step.status === 'done'
                                    ? "bg-card text-foreground border-[var(--studio-teal)]"
                                    : "bg-card border-border text-muted-foreground group-hover/step:text-foreground"
                            )}
                            style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                          >
                              {step.status === 'done' ? <Icon name="check" size="size-4" /> : <Icon name={step.icon} size="size-4" />}
                          </div>
                          <div className="text-center">
                              <p 
                                className={cn("text-xs font-bold uppercase tracking-wider mb-0.5", (step.status === 'active' || step.status === 'done') ? "text-[var(--studio-teal)]" : "text-muted-foreground")}
                                style={step.status === 'active' || step.status === 'done' ? { color: STUDIO_TEAL } : {}}
                              >
                                  {step.label}
                              </p>
                              <p className="text-sm font-mono text-muted-foreground">{step.count}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* Project List (3 Cols) */}
              <div className="xl:col-span-3 space-y-6">
                  
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-2 rounded-xl border border-border shadow-sm">
                      <div className="relative w-full sm:w-80">
                          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                          <Input 
                            placeholder="Buscar projetos..." 
                            className="pl-10 bg-muted/30 border-border text-sm h-10 focus:border-[var(--studio-teal)]/50 transition-colors"
                            style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto items-center">
                          <Select 
                              placeholder="Filtro"
                              options={[{label: 'Todos', value: 'all'}, {label: 'Em Progresso', value: 'active'}, {label: 'Exportados', value: 'exported'}, {label: 'Arquivados', value: 'archived'}]}
                              className="w-full sm:w-40 h-10 bg-muted/30 border-border"
                          />
                          <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
                          <div className="flex bg-muted/30 p-1 rounded-lg border border-border">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn("h-8 w-8", viewMode === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                                onClick={() => setViewMode('list')}
                              >
                                  <Icon name="list" size="size-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn("h-8 w-8", viewMode === 'grid' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                                onClick={() => setViewMode('grid')}
                              >
                                  <Icon name="grid" size="size-4" />
                              </Button>
                          </div>
                      </div>
                  </div>

                  {/* List Content */}
                  <div className={cn("transition-all duration-300", viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4" : "space-y-3")}>
                      {projects.map((proj) => (
                          <div 
                            key={proj.id} 
                            className={cn(
                                "bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-visible",
                                viewMode === 'list' ? "p-4 flex flex-col sm:flex-row items-center gap-6" : "p-6 flex flex-col gap-4"
                            )}
                            style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                          >
                              {/* Hover Border Effect */}
                              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--studio-teal)]/30 rounded-xl pointer-events-none transition-colors"></div>

                              {/* Icon Box */}
                              <div className={cn(
                                  "rounded-lg flex items-center justify-center transition-colors shrink-0 bg-muted/50 text-muted-foreground group-hover:bg-[var(--studio-teal)] group-hover:text-white",
                                  viewMode === 'list' ? "w-12 h-12" : "w-12 h-12"
                              )}>
                                  <Icon name={proj.type === 'Projeto' ? 'folder' : 'file'} size="size-5" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0 grid gap-1">
                                  <div className="flex items-center gap-2">
                                      <h4 className="text-base font-bold text-foreground group-hover:text-[var(--studio-teal)] transition-colors truncate">
                                          {proj.name}
                                      </h4>
                                      <Badge variant="outline" className={cn("text-[9px] h-4 px-1.5 border-border", proj.type === 'Projeto' ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500")}>
                                          {proj.type}
                                      </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-serif">
                                      <span className="flex items-center gap-1"><Icon name="user" size="size-3" /> {proj.updatedBy}</span>
                                      <span className="flex items-center gap-1"><Icon name="clock" size="size-3" /> {proj.date}</span>
                                  </div>
                              </div>

                              {/* Status & Progress */}
                              <div className={cn("flex flex-col gap-2", viewMode === 'list' ? "w-48" : "w-full border-t border-border pt-4")}>
                                  <div className="flex justify-between items-center text-xs">
                                      <span className="font-bold text-[var(--studio-teal)]">{proj.status}</span>
                                      <span className="text-muted-foreground font-mono">{proj.progress}%</span>
                                  </div>
                                  <Progress value={proj.progress} className="h-1.5 bg-muted" style={{ '--primary': STUDIO_TEAL } as React.CSSProperties} />
                              </div>

                              {/* Actions */}
                              <div className={cn(viewMode === 'list' ? "" : "absolute top-4 right-4")}>
                                  <DropdownMenu 
                                      align="right"
                                      trigger={
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                              <Icon name="menu-dots-vertical" size="size-4" />
                                          </Button>
                                      }
                                  >
                                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                      <DropdownMenuItem><Icon name="play" className="mr-2 h-4 w-4" /> Continuar</DropdownMenuItem>
                                      <DropdownMenuItem><Icon name="duplicate" className="mr-2 h-4 w-4" /> Duplicar</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem><Icon name="archive" className="mr-2 h-4 w-4" /> Arquivar</DropdownMenuItem>
                                      <DropdownMenuItem destructive><Icon name="trash" className="mr-2 h-4 w-4" /> Excluir</DropdownMenuItem>
                                  </DropdownMenu>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Sidebar (Activity) */}
              <div className="space-y-6">
                  <Card className="bg-card border-border shadow-sm h-full">
                      <CardContent className="p-5">
                          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Icon name="bell" size="size-4" /> Atividade Recente
                          </h3>
                          <div className="space-y-0 relative">
                              <div className="absolute left-3.5 top-2 bottom-6 w-px bg-border"></div>
                              {activities.map((act, i) => (
                                  <div key={i} className="flex gap-4 relative pb-6 last:pb-0 group">
                                      <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 z-10 text-[10px] font-bold text-muted-foreground group-hover:bg-[var(--studio-teal)] group-hover:text-white transition-colors" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                          {act.user}
                                      </div>
                                      <div className="flex-1 pt-0.5">
                                          <p className="text-xs text-foreground font-medium leading-snug">
                                              {act.action} <span className="text-muted-foreground font-normal">em</span> <span className="text-[var(--studio-teal)] font-bold">{act.target}</span>
                                          </p>
                                          <p className="text-[10px] text-muted-foreground font-mono mt-1">{act.time}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
              </div>

          </div>
      </main>
    </div>
  );
};

export default PrdStudioTemplate;