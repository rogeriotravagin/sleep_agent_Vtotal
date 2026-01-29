
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MetricCard } from '../ui/metric-card';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';

// --- Types ---
interface GroupData {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'critical' | 'neutral';
  members: number;
  activity: number[]; // Sparkline data
  lastTopic: string;
  sentiment: number; // 0-100
  notifications: number;
}

// --- Mock Data ---
const groupsData: GroupData[] = [
  { id: '1', name: "Chat Geral #3", status: 'neutral', members: 450, activity: [20, 30, 25, 40, 30, 20], lastTopic: "Dúvidas sobre app de vestuário", sentiment: 50, notifications: 0 },
  { id: '2', name: "Chat Geral #4", status: 'neutral', members: 320, activity: [10, 15, 10, 20, 15, 10], lastTopic: "Links de ferramentas compartilhados", sentiment: 55, notifications: 0 },
  { id: '3', name: "Chat: Founders Lendários", status: 'warning', members: 85, activity: [50, 80, 70, 90, 85, 95], lastTopic: "Debate sobre Pitches e Incubadoras", sentiment: 35, notifications: 12 },
  { id: '4', name: "Clube do Livro Lendário", status: 'active', members: 210, activity: [30, 40, 45, 50, 60, 55], lastTopic: "Agradecimentos e menções", sentiment: 88, notifications: 2 },
  { id: '5', name: "Clube Lendário: 100M", status: 'neutral', members: 120, activity: [40, 40, 40, 40, 40, 40], lastTopic: "Apresentações visuais", sentiment: 60, notifications: 0 },
  { id: '6', name: "Comunidade Lendár[IA]", status: 'active', members: 3500, activity: [80, 90, 95, 100, 90, 85], lastTopic: "Live especial de Natal", sentiment: 92, notifications: 5 },
  { id: '7', name: "Formação CHAT GERAL", status: 'warning', members: 800, activity: [40, 30, 20, 10, 50, 60], lastTopic: "Acesso a ferramentas", sentiment: 45, notifications: 1 },
  { id: '8', name: "Formação Lendár[I.A] | Geral", status: 'neutral', members: 1240, activity: [50, 50, 55, 60, 55, 50], lastTopic: "Networking geral", sentiment: 58, notifications: 0 },
];

// --- Components ---

const StatusDot = ({ status }: { status: GroupData['status'] }) => {
    const colors = {
        active: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
        warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        critical: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
        neutral: "bg-zinc-500",
    };
    return <div className={cn("w-2 h-2 rounded-full", colors[status])} />;
};

const GroupCard: React.FC<{ group: GroupData }> = ({ group }) => {
    const sentimentColor = group.sentiment > 70 ? "text-green-500" : group.sentiment < 40 ? "text-red-500" : "text-amber-500";
    
    return (
        <Card className="group relative overflow-hidden border-border/60 hover:border-brand-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card/50 backdrop-blur-sm">
            {/* Sparkline Background */}
            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                    <path d={`M0,20 L${group.activity.map((v, i) => `${i * 20},${20 - (v / 100) * 15}`).join(' L')} L100,20 Z`} fill="currentColor" className="text-foreground" />
                </svg>
            </div>

            <CardContent className="p-5 space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <StatusDot status={group.status} />
                            <h4 className="font-bold text-sm text-foreground truncate max-w-[180px]" title={group.name}>{group.name}</h4>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                            <Icon name="users-alt" size="size-3" /> {group.members} membros
                        </p>
                    </div>
                    {group.notifications > 0 && (
                        <Badge className="bg-brand-gold text-black h-5 px-1.5 text-[10px] font-bold">
                            {group.notifications}
                        </Badge>
                    )}
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-serif line-clamp-2 h-8 leading-snug">
                        "{group.lastTopic}"
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <Icon name="heart" size="size-3" /> 
                        <span className={sentimentColor}>{group.sentiment}%</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="arrow-right" size="size-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const GroupDashboardTemplate: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState("");

  const filteredGroups = groupsData.filter(g => 
    (filterStatus === 'all' || g.status === filterStatus) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#050505] text-foreground font-sans animate-fade-in overflow-hidden">
      
      {/* --- LEFT CONTEXT SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-white/5">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Navegação</h2>
              <nav className="space-y-1">
                  <Button variant="secondary" className="w-full justify-start gap-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 font-bold">
                      <Icon name="grid" size="size-4" /> Visão Geral
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                      <Icon name="exclamation-triangle" size="size-4" /> Alertas Críticos <Badge variant="destructive" className="ml-auto h-4 px-1 text-[9px]">3</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                      <Icon name="users" size="size-4" /> Membros VIP
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                      <Icon name="chart-line" size="size-4" /> Analytics
                  </Button>
              </nav>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Grupos Pinados</h2>
              <div className="space-y-2">
                  {groupsData.slice(0,4).map(g => (
                      <div key={g.id} className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors">
                          <StatusDot status={g.status} />
                          <span className="truncate">{g.name}</span>
                      </div>
                  ))}
              </div>
          </div>

          <div className="p-4 border-t border-white/5">
               <div className="bg-gradient-to-br from-brand-gold/10 to-transparent p-3 rounded-xl border border-brand-gold/20">
                   <div className="flex items-center gap-2 text-brand-gold mb-1">
                       <Icon name="sparkles" size="size-4" />
                       <span className="text-xs font-bold uppercase">Insight IA</span>
                   </div>
                   <p className="text-[10px] text-zinc-400 font-serif leading-relaxed">
                       O engajamento no "Clube do Livro" subiu 15% após a última menção.
                   </p>
               </div>
          </div>
      </aside>

      {/* --- MAIN CANVAS --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/50 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold tracking-tight">Dashboard de Comunidades</h1>
                  <Badge variant="outline" className="border-white/10 text-zinc-500 bg-white/5">
                      Atualizado agora
                  </Badge>
              </div>
              <div className="flex items-center gap-3">
                  <div className="relative w-64 hidden md:block">
                      <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                      <Input 
                        className="h-9 pl-9 bg-muted/20 border-white/5 text-xs focus:border-brand-gold/50 rounded-full" 
                        placeholder="Buscar grupo ou tópico..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                  </div>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white">
                      <Icon name="calendar" className="mr-2 size-3" /> Out 2025
                  </Button>
                  <Button size="sm" className="bg-brand-gold text-black hover:bg-brand-gold/90 font-bold">
                      <Icon name="download" className="mr-2 size-3" /> Exportar
                  </Button>
              </div>
          </header>

          <ScrollArea className="flex-1 p-6 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-8">
                  
                  {/* KPIS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard 
                        label="Total Grupos" 
                        value="25" 
                        icon="apps" 
                        trend="+2" 
                        trendDirection="up" 
                        className="bg-[#0f0f10] border-white/5"
                      />
                      <MetricCard 
                        label="Sentimento Positivo" 
                        value="16" 
                        icon="smile" 
                        trend="+12%" 
                        trendDirection="up" 
                        color="#10B981" // Emerald
                        className="bg-[#0f0f10] border-white/5"
                      />
                      <MetricCard 
                        label="Alertas Críticos" 
                        value="3" 
                        icon="exclamation-triangle" 
                        trend="Atenção" 
                        trendDirection="down" 
                        color="#EF4444" // Red
                        className="bg-[#0f0f10] border-white/5"
                      />
                      <MetricCard 
                        label="Neutros/Mistos" 
                        value="9" 
                        icon="minus-circle" 
                        trend="Estável" 
                        trendDirection="neutral" 
                        color="#F59E0B" // Amber
                        className="bg-[#0f0f10] border-white/5"
                      />
                  </div>

                  {/* AI INSIGHT BAR (Replaces simple alert) */}
                  <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/40 to-transparent p-1">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
                                  <Icon name="bell" size="size-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-white text-sm">3 Grupos com picos de reclamação</h4>
                                  <p className="text-xs text-red-200/70 font-serif">Detectamos palavras-chave: "reembolso", "acesso negado", "suporte".</p>
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-8 text-xs">Ignorar</Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white border-none h-8 text-xs font-bold shadow-lg shadow-red-900/20">
                                  Ver Análise IA <Icon name="arrow-right" size="size-3" className="ml-2" />
                              </Button>
                          </div>
                      </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <Icon name="layers" className="text-brand-gold" /> Todos os Grupos
                          </h3>
                          <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setFilterStatus('all')}
                                className={cn("text-xs h-7", filterStatus === 'all' ? "bg-white text-black" : "text-zinc-500")}
                              >
                                  Todos
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setFilterStatus('active')}
                                className={cn("text-xs h-7", filterStatus === 'active' ? "bg-green-500 text-white" : "text-zinc-500")}
                              >
                                  Positivos
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setFilterStatus('warning')}
                                className={cn("text-xs h-7", filterStatus === 'warning' ? "bg-amber-500 text-black" : "text-zinc-500")}
                              >
                                  Atenção
                              </Button>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {filteredGroups.map(group => (
                              <GroupCard key={group.id} group={group} />
                          ))}
                      </div>
                  </div>

              </div>
          </ScrollArea>
      </div>

    </div>
  );
};

export default GroupDashboardTemplate;
