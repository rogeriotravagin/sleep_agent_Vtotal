
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Select } from '../ui/select';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { Section } from '../../types'; 

interface ContentStudioTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const ContentStudioTemplate: React.FC<ContentStudioTemplateProps> = ({ onNavigate }) => {
  const STUDIO_ORANGE = "#F97316"; 
  const STUDIO_ACCENT = "#F2EBE4"; 

  const [filterChannel, setFilterChannel] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Posts Publicados", value: "42", icon: "rocket", trend: "+12%", trendDir: "up", desc: "este mês", sparkline: "0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0" },
    { label: "Alcance Total", value: "2.1M", icon: "eye", trend: "+25%", trendDir: "up", desc: "vs mês anterior", sparkline: "0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2" },
    { label: "Ideias no Backlog", value: "15", icon: "bulb", trend: "+4", trendDir: "neutral", desc: "novas ideias", sparkline: "0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15" },
    { label: "Viral Score Médio", value: "88", icon: "flame", trend: "+2.4", trendDir: "up", desc: "média ponderada", sparkline: "0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0" },
  ];

  const pipeline = [
    { id: 1, label: "Ideia", count: 8, icon: "bulb", status: 'active', desc: "Banco de Ideias" },
    { id: 2, label: "Roteiro", count: 4, icon: "document", status: 'pending', desc: "Em escrita" },
    { id: 3, label: "Produção", count: 2, icon: "video-camera", status: 'pending', desc: "Gravação" },
    { id: 4, label: "Edição", count: 3, icon: "scissors", status: 'pending', desc: "Pós-produção" },
    { id: 5, label: "Repurpose", count: 5, icon: "magic-wand", status: 'pending', desc: "IA Editor" },
    { id: 6, label: "Agendado", count: 7, icon: "calendar", status: 'pending', desc: "Fila de Postagem" },
    { id: 7, label: "Publicado", count: 42, icon: "check-circle", status: 'done', desc: "No ar" },
  ];

  const contentPieces = [
    { id: 1, title: "O Fim do Gestor Medíocre", format: "Carrossel", channel: "Instagram", status: "Agendado", date: "Amanhã 18:00", score: 94, author: "Alan Nicolas" },
    { id: 2, title: "5 Prompts para Vendas", format: "Thread", channel: "Twitter", status: "Publicado", date: "Hoje 09:00", score: 88, author: "José Carlos" },
    { id: 3, title: "Análise: GPT-5", format: "Vídeo Longo", channel: "YouTube", status: "Edição", date: "15/12", score: 92, author: "Alan Nicolas" },
    { id: 4, title: "Cortes: Podcast #42", format: "Reels", channel: "Instagram", status: "Repurpose", date: "16/12", score: 85, author: "Equipe" },
    { id: 5, title: "Newsletter Semanal", format: "Texto", channel: "Email", status: "Rascunho", date: "18/12", score: 90, author: "Alan Nicolas" },
    { id: 6, title: "Tutorial: Vibecoding", format: "Vídeo Curto", channel: "TikTok", status: "Ideia", date: "TBD", score: 0, author: "Adriano" },
  ];

  const activities = [
      { user: "AN", action: "aprovou", target: "Carrossel: Gestor", time: "10min atrás", icon: "check" },
      { user: "JA", action: "editou", target: "Thread: Prompts", time: "1h atrás", icon: "pencil" },
      { user: "EQ", action: "agendou", target: "Reels: Podcast", time: "3h atrás", icon: "calendar" },
  ];

  const channels = [
    { label: "Instagram", count: 18, percent: 45, icon: "instagram" },
    { label: "LinkedIn", count: 12, percent: 30, icon: "linkedin" },
    { label: "YouTube", count: 8, percent: 20, icon: "youtube" },
    { label: "Twitter/X", count: 4, percent: 10, icon: "twitter" },
  ];

  const filteredContent = contentPieces.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filterChannel || c.channel === filterChannel)
  );

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Publicado': return 'bg-green-500 text-white';
          case 'Agendado': return 'bg-blue-500 text-white';
          case 'Edição': return 'bg-orange-500 text-white';
          case 'Repurpose': return 'bg-purple-500 text-white';
          default: return 'bg-muted text-muted-foreground';
      }
  };

  const getFormatIcon = (format: string) => {
      switch(format) {
          case 'Carrossel': return 'picture';
          case 'Thread': return 'list';
          case 'Vídeo Longo': return 'video-camera';
          case 'Reels': return 'play';
          case 'Vídeo Curto': return 'play';
          case 'Texto': return 'document';
          default: return 'file';
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans animate-fade-in">
      
      {/* Top Bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
          <div className="container flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${STUDIO_ORANGE}15`, borderColor: `${STUDIO_ORANGE}30`, color: STUDIO_ORANGE }}>
                      <Icon name="pencil" size="size-5" />
                  </div>
                  <div>
                      <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                          Content <span className="font-light" style={{ color: STUDIO_ORANGE }}>Studio</span>
                      </h1>
                      <p className="text-xs text-muted-foreground font-serif">Fábrica de Conteúdo & Repurposing</p>
                  </div>
              </div>

              <div className="flex items-center gap-4">
                  <nav className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border">
                      <Button variant="ghost" size="sm" className="h-8 bg-background text-foreground shadow-sm font-semibold" style={{ color: STUDIO_ORANGE }}>Dashboard</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">Calendário</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">Analytics</Button>
                  </nav>
                  
                  <div className="h-6 w-px bg-border hidden md:block"></div>

                  <Button 
                    className="h-9 text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: STUDIO_ORANGE, boxShadow: `0 10px 15px -3px ${STUDIO_ORANGE}30` }}
                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_CONTENT_REPURPOSE)}
                  >
                      <Icon name="magic-wand" size="size-3" className="mr-2" /> Novo Repurpose
                  </Button>
              </div>
          </div>
      </header>

      <main className="flex-1 container py-6 md:py-8 w-full space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                  <Card key={i} className="bg-card border-border transition-all duration-300 group shadow-sm hover:shadow-md hover:border-[var(--color)]/50 relative overflow-hidden" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
                      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                              <path d={`M0,30 L${stat.sparkline} L100,30 Z`} fill={STUDIO_ORANGE} />
                          </svg>
                      </div>

                      <CardContent className="p-5 flex items-start justify-between relative z-10">
                          <div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                              <h3 className="text-3xl font-mono font-medium text-foreground">{stat.value}</h3>
                              <div className="flex items-center gap-1 mt-2">
                                  {stat.trendDir === 'up' && <Icon name="trend-up" className="text-green-500" size="size-3" />}
                                  <span className="text-[10px] font-bold text-green-600">{stat.trend}</span>
                                  <span className="text-[10px] text-muted-foreground font-serif ml-1">{stat.desc}</span>
                              </div>
                          </div>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color)]/10 text-[var(--color)] group-hover:bg-[var(--color)] group-hover:text-white transition-colors" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
                              <Icon name={stat.icon} size="size-5" />
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>

          {/* Pipeline */}
          <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto shadow-sm cursor-pointer hover:border-[var(--color)] transition-colors group" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--color)] transition-colors">
                      <Icon name="network-cloud" size="size-4" /> Esteira de Conteúdo
                  </h3>
                  <Badge variant="outline" className="border-border text-muted-foreground group-hover:text-[var(--color)] group-hover:border-[var(--color)] transition-colors">
                      Ver Kanban <Icon name="arrow-right" size="size-3" className="ml-2" />
                  </Badge>
              </div>
              
              <div className="flex items-center justify-between min-w-[800px] relative pointer-events-none">
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-0">
                      <div className="h-full w-[60%] transition-all duration-1000" style={{ backgroundColor: STUDIO_ORANGE }}></div>
                  </div>
                  
                  {pipeline.map((step) => (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group/step">
                          <div 
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                step.status === 'active' 
                                    ? "text-white scale-110 shadow-lg ring-4 ring-[var(--color)]/20 bg-[var(--color)] border-[var(--color)]" 
                                    : step.status === 'done'
                                    ? "bg-card text-foreground border-[var(--color)]"
                                    : "bg-card border-border text-muted-foreground group-hover/step:text-foreground"
                            )}
                            style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}
                          >
                              {step.status === 'done' ? <Icon name="check" size="size-4" /> : <Icon name={step.icon} size="size-4" />}
                          </div>
                          <div className="text-center">
                              <p 
                                className={cn("text-xs font-bold uppercase tracking-wider mb-0.5", (step.status === 'active' || step.status === 'done') ? "text-[var(--color)]" : "text-muted-foreground")}
                                style={step.status === 'active' || step.status === 'done' ? { color: STUDIO_ORANGE } : {}}
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
              
              {/* Content List (Left - 3 Cols) */}
              <div className="xl:col-span-3 space-y-6">
                  
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-2 rounded-xl border border-border shadow-sm">
                      <div className="relative w-full sm:w-80">
                          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                          <Input 
                            placeholder="Buscar conteúdo..." 
                            className="pl-10 bg-muted/30 border-border text-sm h-10 focus:border-[var(--color)]/50 transition-colors"
                            style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto items-center">
                          <Select 
                              placeholder="Canal"
                              options={[{label: 'Instagram', value: 'Instagram'}, {label: 'YouTube', value: 'YouTube'}, {label: 'Twitter', value: 'Twitter'}]}
                              className="w-full sm:w-32 h-10 bg-muted/30 border-border"
                              onValueChange={setFilterChannel}
                          />
                          <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
                          <div className="flex bg-muted/30 p-1 rounded-lg border border-border">
                              <Button variant="ghost" size="icon" className={cn("h-8 w-8", viewMode === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")} onClick={() => setViewMode('list')}><Icon name="list" size="size-4" /></Button>
                              <Button variant="ghost" size="icon" className={cn("h-8 w-8", viewMode === 'grid' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")} onClick={() => setViewMode('grid')}><Icon name="grid" size="size-4" /></Button>
                          </div>
                      </div>
                  </div>

                  {/* List / Grid */}
                  <div className={cn("transition-all duration-300", viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}>
                      {filteredContent.map((item) => (
                          <div 
                            key={item.id} 
                            className={cn(
                                "bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-visible",
                                viewMode === 'list' ? "p-4 flex flex-col sm:flex-row items-center gap-4" : "p-5 flex flex-col items-start gap-4"
                            )}
                            style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}
                          >
                              {/* Hover Effect */}
                              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color)]/30 rounded-xl pointer-events-none transition-colors"></div>

                              {/* Icon Box */}
                              <div className={cn(
                                  "rounded-lg flex items-center justify-center transition-colors shrink-0 bg-muted text-muted-foreground group-hover:bg-[var(--color)] group-hover:text-white",
                                  viewMode === 'list' ? "w-12 h-12" : "w-14 h-14 mb-2"
                              )}>
                                  <Icon name={getFormatIcon(item.format)} size="size-5" />
                              </div>

                              <div className="flex-1 min-w-0 w-full">
                                  <div className="flex justify-between items-start mb-1">
                                      <h4 className="text-base font-bold text-foreground group-hover:text-[var(--color)] transition-colors truncate">
                                          {item.title}
                                      </h4>
                                      {viewMode === 'grid' && (
                                           <Badge variant="outline" className={cn("text-[9px] h-5 border-0 font-bold", getStatusColor(item.status))}>
                                              {item.status}
                                          </Badge>
                                      )}
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-border bg-muted/30 text-muted-foreground">
                                          {item.channel}
                                      </Badge>
                                      <span className="text-[10px] text-muted-foreground">• {item.format}</span>
                                  </div>

                                  <div className="flex items-center justify-between border-t border-border pt-3 mt-2 w-full">
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-serif">
                                          <Icon name="user" size="size-3" /> {item.author}
                                      </div>
                                      <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                                          <Icon name="flame" size="size-3" /> {item.score}
                                      </div>
                                  </div>
                              </div>

                              {viewMode === 'list' && (
                                  <div className="flex flex-col items-end gap-2 min-w-[120px]">
                                      <Badge variant="outline" className={cn("text-[10px] h-5 border-0 font-bold w-fit", getStatusColor(item.status))}>
                                          {item.status}
                                      </Badge>
                                      <span className="text-[10px] text-muted-foreground font-mono">{item.date}</span>
                                  </div>
                              )}
                              
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <DropdownMenu align="right" trigger={<Button variant="ghost" size="icon" className="h-6 w-6"><Icon name="menu-dots-vertical" size="size-3" /></Button>}>
                                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_CONTENT_REPURPOSE)}><Icon name="pencil" className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                                      <DropdownMenuItem><Icon name="duplicate" className="mr-2 h-4 w-4" /> Duplicar</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem destructive><Icon name="trash" className="mr-2 h-4 w-4" /> Arquivar</DropdownMenuItem>
                                  </DropdownMenu>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                  <Card className="bg-card border-border shadow-sm">
                      <CardHeader className="pb-3 border-b border-border">
                          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <Icon name="bell" size="size-4" /> Atividade
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 px-4 pb-0">
                          <div className="space-y-0 relative">
                              <div className="absolute left-4 top-2 bottom-6 w-px bg-border"></div>
                              {activities.map((item, i) => (
                                  <div key={i} className="flex gap-4 relative pb-6 last:pb-4 group">
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm z-10 shrink-0 border border-white/10 bg-[var(--color)]/10 text-[var(--color)]" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
                                          <Icon name={item.icon} size="size-4" />
                                      </div>
                                      <div className="flex-1 min-w-0 pt-1">
                                          <p className="text-sm leading-snug">
                                              <span className="font-bold text-foreground">{item.user}</span> <span className="text-muted-foreground">{item.action}</span> <span className="font-medium text-foreground block truncate">{item.target}</span>
                                          </p>
                                          <span className="text-[10px] text-muted-foreground font-mono mt-1 block">{item.time}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>

                  <Card className="bg-card border-border shadow-sm">
                      <CardHeader className="pb-3 border-b border-border">
                          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <Icon name="share" size="size-4" /> Canais Ativos
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                          {channels.map((ch, i) => (
                              <div key={i} className="space-y-1.5">
                                  <div className="flex justify-between text-xs">
                                      <span className="text-foreground font-medium flex items-center gap-2">
                                          <Icon name={ch.icon} type="brands" size="size-3" className="text-muted-foreground" />
                                          {ch.label}
                                      </span>
                                      <span className="text-muted-foreground font-mono">{ch.count}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: `${ch.percent}%`, backgroundColor: STUDIO_ORANGE }}></div>
                                  </div>
                              </div>
                          ))}
                      </CardContent>
                  </Card>
              </div>

          </div>
      </main>
    </div>
  );
};

export default ContentStudioTemplate;
