import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { cn } from '../../lib/utils';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';

interface ProductionPipelineTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Types ---
interface Task {
    id: string;
    title: string;
    course: string;
    assignee: { name: string; avatar: string; initials: string };
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    aiConfidence?: number;
    thumbnail?: string; // New: Image for video tasks
    type: 'video' | 'text' | 'quiz' | 'planning';
}

interface Column {
    id: string;
    title: string;
    color: string; // Hex for column header
    tasks: Task[];
}

const ProductionPipelineTemplate: React.FC<ProductionPipelineTemplateProps> = ({ onNavigate, currentSection }) => {
  // Shared Styling Constants
  const STUDIO_PRIMARY = "#538096"; 
  const STUDIO_ACCENT = "#F2EBE4"; 
  const STUDIO_GOLD = "#C9B298";   

  const [searchQuery, setSearchQuery] = useState("");

  // Metrics Data
  const metrics = [
      { label: "Capacidade", value: "82%", trend: "+ Otimizado", trendDir: "up", icon: "cpu" },
      { label: "Gargalo", value: "Edição", trend: "+2 dias atraso", trendDir: "down", icon: "video-camera", alert: true }, 
      { label: "Velocidade", value: "4.2d", trend: "-0.5d (IA)", trendDir: "up", icon: "time-fast" },
      { label: "Próxima Entrega", value: "14h", trend: "No Prazo", trendDir: "neutral", icon: "check-circle" }, 
  ];

  // Enhanced Mock Kanban Data
  const columns: Column[] = [
      {
          id: 'briefing',
          title: 'Briefing (IA)',
          color: '#A1A1AA', // Zinc
          tasks: [
              { id: 't1', title: 'Definição de Persona: CTOs', course: 'Liderança Tech', assignee: { name: 'Alan Nicolas', avatar: '', initials: 'AN' }, dueDate: '20 Out', priority: 'medium', tags: ['Planejamento'], aiConfidence: 95, type: 'planning' },
              { id: 't2', title: 'Estrutura de Módulos', course: 'Liderança 4.0', assignee: { name: 'Maria Silva', avatar: '', initials: 'MS' }, dueDate: '22 Out', priority: 'high', tags: ['Conteúdo'], aiConfidence: 88, type: 'text' }
          ]
      },
      {
          id: 'scripting',
          title: 'Roteirização',
          color: '#60A5FA', // Blue
          tasks: [
              { id: 't3', title: 'Roteiro Aula 1-3: Hooks', course: 'Prompt Engineering', assignee: { name: 'José Carlos', avatar: '', initials: 'JC' }, dueDate: '18 Out', priority: 'high', tags: ['Escrita'], aiConfidence: 92, type: 'text' },
          ]
      },
      {
          id: 'production',
          title: 'Gravação & Edição',
          color: STUDIO_PRIMARY, // Petrol Blue (Active)
          tasks: [
              { id: 't4', title: 'Módulo 2: Setup', course: 'Vibecoding', assignee: { name: 'Equipe Video', avatar: '', initials: 'EV' }, dueDate: 'Hoje', priority: 'high', tags: ['Estúdio'], aiConfidence: 75, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=200&auto=format&fit=crop' },
              { id: 't5', title: 'Aula Bônus: Automação', course: 'Vibecoding', assignee: { name: 'Editor 01', avatar: '', initials: 'E1' }, dueDate: 'Amanhã', priority: 'medium', tags: ['Edição'], aiConfidence: 85, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=200&auto=format&fit=crop' }
          ]
      },
      {
          id: 'review',
          title: 'Validação',
          color: '#F59E0B', // Amber
          tasks: [
              { id: 't6', title: 'Revisão Técnica Mód 1', course: 'Supabase do Zero', assignee: { name: 'Tech Lead', avatar: '', initials: 'TL' }, dueDate: 'Ontem', priority: 'low', tags: ['QA'], aiConfidence: 99, type: 'text' }
          ]
      },
      {
          id: 'published',
          title: 'Publicado',
          color: '#10B981', // Emerald
          tasks: [
              { id: 't7', title: 'Lançamento Beta', course: 'Didática Lendária', assignee: { name: 'Adriano', avatar: '', initials: 'AM' }, dueDate: '10 Out', priority: 'medium', tags: ['Launch'], aiConfidence: 100, type: 'planning' }
          ]
      }
  ];

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case 'high': return STUDIO_GOLD;
          case 'medium': return STUDIO_PRIMARY;
          case 'low': return '#71717A';
          default: return '#71717A';
      }
  };

  const getIconForType = (type: string) => {
      switch(type) {
          case 'video': return 'video-camera';
          case 'text': return 'document';
          case 'quiz': return 'list-check';
          case 'planning': return 'brain';
          default: return 'circle';
      }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      {/* Main Content */}
      <main className="container py-6 md:py-8 w-full space-y-6 flex-1 flex flex-col">
        
        {/* --- COMMAND CENTER HEADER --- */}
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Pipeline de Produção
                        <Badge variant="outline" className="border-[var(--studio-primary)] text-[var(--studio-primary)]" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                            Live Sync
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground text-sm font-serif mt-1">
                        Gerencie o fluxo de criação do roteiro ao upload.
                    </p>
                </div>
                
                {/* Metrics Compact */}
                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {metrics.map((m, i) => (
                        <div key={i} className="bg-card border border-border rounded-lg p-3 min-w-[140px] flex items-center gap-3 shadow-sm">
                            <div className={cn("w-8 h-8 rounded-md flex items-center justify-center bg-muted", m.alert && "bg-red-500/10 text-red-500")}>
                                <Icon name={m.icon} size="size-4" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">{m.label}</p>
                                <p className="text-sm font-mono font-bold">{m.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ADVANCED TOOLBAR --- */}
            <div className="bg-card border border-border rounded-xl p-2 flex flex-col md:flex-row gap-2 shadow-sm sticky top-[72px] z-30">
                <div className="relative flex-1">
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                    <Input 
                        placeholder="Buscar tarefas, cursos ou responsáveis..." 
                        className="pl-10 bg-muted/20 border-transparent hover:border-border focus:border-[var(--studio-primary)]"
                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="h-10 w-px bg-border hidden md:block mx-1"></div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    <Select 
                        placeholder="Responsável"
                        options={[{label: 'Alan Nicolas', value: 'an'}, {label: 'Equipe Vídeo', value: 'ev'}]}
                        className="w-36 bg-muted/20 border-transparent"
                    />
                    <Select 
                        placeholder="Curso"
                        options={[{label: 'Vibecoding', value: 'vc'}, {label: 'Liderança', value: 'ld'}]}
                        className="w-36 bg-muted/20 border-transparent"
                    />
                    <Button variant="outline" size="icon" className="shrink-0 border-dashed border-border" title="Filtros Avançados">
                        <Icon name="filter" size="size-4" />
                    </Button>
                    <Button 
                        className="shrink-0 gap-2 text-white shadow-md"
                        style={{ backgroundColor: STUDIO_PRIMARY }}
                    >
                        <Icon name="plus" size="size-4" /> Nova Tarefa
                    </Button>
                </div>
            </div>
        </div>

        {/* --- KANBAN BOARD --- */}
        <section className="flex-1 min-h-[600px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-[1400px] h-full items-stretch">
                    {columns.map((col) => (
                        <div key={col.id} className="flex-1 min-w-[300px] flex flex-col h-full rounded-xl bg-muted/5 border border-border/40 group/col hover:border-border/80 transition-colors">
                            
                            {/* Column Header */}
                            <div className="p-3 bg-card/50 backdrop-blur-sm rounded-t-xl border-b border-border/40 sticky top-0 z-10">
                                <div className="h-1 w-full rounded-full mb-3" style={{ backgroundColor: col.color }}></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-xs text-foreground uppercase tracking-wider flex items-center gap-2">
                                        {col.title}
                                    </span>
                                    <Badge variant="secondary" className="font-mono text-[10px] h-5 bg-muted border border-border text-muted-foreground">{col.tasks.length}</Badge>
                                </div>
                            </div>

                            {/* Cards Area */}
                            <ScrollArea className="flex-1 p-2">
                                <div className="space-y-3">
                                    {col.tasks
                                        .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.course.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((task) => (
                                        <Card 
                                            key={task.id} 
                                            className="p-3 hover:shadow-lg transition-all cursor-grab active:cursor-grabbing border-border bg-card group relative hover:-translate-y-1 duration-300"
                                            style={{ borderLeft: `3px solid ${getPriorityColor(task.priority)}` }}
                                        >
                                            {/* Course Label */}
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Badge variant="outline" className="text-[9px] h-4 px-1 border-border text-muted-foreground bg-muted/30">
                                                        {task.course}
                                                    </Badge>
                                                </div>
                                                {task.aiConfidence && task.aiConfidence < 90 && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" title="Atenção Necessária"></div>
                                                )}
                                            </div>

                                            {/* Thumbnail (If Video) */}
                                            {task.thumbnail && (
                                                <div className="relative aspect-video w-full rounded-md overflow-hidden mb-3 bg-black group-hover:shadow-md transition-shadow">
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                                    <img src={task.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-1 right-1 z-20 bg-black/60 text-white text-[9px] px-1 rounded font-mono">
                                                        Video
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Title */}
                                            <div className="flex items-start gap-2 mb-3">
                                                <div className="mt-0.5 text-muted-foreground">
                                                    <Icon name={getIconForType(task.type)} size="size-3" />
                                                </div>
                                                <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-[var(--studio-primary)] transition-colors" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                                                    {task.title}
                                                </h4>
                                            </div>
                                            
                                            {/* Footer: Meta & Assignee */}
                                            <div className="flex items-center justify-between pt-2 border-t border-border/30">
                                                <div className="flex gap-1.5 items-center">
                                                    <Icon name="calendar" size="size-3" className="text-muted-foreground/60" />
                                                    <span className={cn("text-[10px] font-mono", task.dueDate === 'Hoje' || task.dueDate === 'Ontem' ? "text-orange-500 font-bold" : "text-muted-foreground")}>
                                                        {task.dueDate}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    {task.aiConfidence && task.aiConfidence > 90 && (
                                                        <div className="flex items-center gap-1 text-[9px] text-[var(--studio-primary)] font-bold bg-[var(--studio-primary)]/10 px-1.5 py-0.5 rounded" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                                                            <Icon name="sparkles" size="size-3" /> IA
                                                        </div>
                                                    )}
                                                    <div 
                                                        className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center text-[9px] font-bold text-muted-foreground uppercase"
                                                        title={task.assignee.name}
                                                    >
                                                        {task.assignee.initials}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                    
                                    {/* Quick Add Placeholder (Ghost Card) */}
                                    <div className="border border-dashed border-border rounded-xl p-3 flex items-center justify-center gap-2 text-muted-foreground/50 hover:text-[var(--studio-primary)] hover:border-[var(--studio-primary)]/50 hover:bg-[var(--studio-primary)]/5 cursor-pointer transition-all h-20" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                                        <Icon name="plus" size="size-4" />
                                        <span className="text-xs font-medium">Adicionar</span>
                                    </div>

                                    {/* AI Suggestion (Ghost Card) - Example */}
                                    {col.id === 'briefing' && (
                                        <div className="relative overflow-hidden border border-purple-500/20 bg-purple-500/5 rounded-xl p-3 cursor-pointer group hover:bg-purple-500/10 transition-colors">
                                            <div className="absolute top-0 right-0 p-1 opacity-50 group-hover:opacity-100">
                                                <Icon name="sparkles" className="text-purple-500" size="size-3" />
                                            </div>
                                            <p className="text-[10px] text-purple-600 font-bold mb-1 uppercase tracking-wider">Sugestão da IA</p>
                                            <p className="text-xs text-foreground/80 font-medium leading-snug">
                                                Criar aula "Glossário de Termos" para reduzir dúvidas no Módulo 1.
                                            </p>
                                            <Button size="sm" variant="ghost" className="h-6 text-[10px] mt-2 w-full text-purple-600 hover:text-purple-700 hover:bg-purple-500/10">Aprovar Sugestão</Button>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};

export default ProductionPipelineTemplate;