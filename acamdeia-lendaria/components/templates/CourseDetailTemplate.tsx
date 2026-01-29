import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Switch } from '../ui/switch';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';

interface CourseDetailTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const CourseDetailTemplate: React.FC<CourseDetailTemplateProps> = ({ onNavigate, currentSection }) => {
  // Theme Constants matching the User Request (Beige + Petrol Blue)
  const STUDIO_PRIMARY = "#538096"; // Petrol Blue
  const STUDIO_ACCENT = "#F2EBE4"; // Beige
  const STUDIO_GOLD = "#C9B298";   // Secondary Accent

  // Enriched Mock Data
  const course = {
      title: "Vibecoding - Apps Sem Código",
      description: "Aprenda a construir aplicações web completas usando ferramentas No-Code e inteligência artificial.",
      author: "Alan Nicolas",
      status: "published",
      healthScore: 92,
      metrics: {
          students: 1240,
          completionRate: 68,
          nps: 4.9,
          avgTime: "5h 40m"
      },
      modules: [
          { 
              id: "m1", 
              title: "Módulo 1: Fundamentos & Lógica", 
              duration: "45 min total",
              dropOffRisk: false,
              lessons: [
                  { 
                      id: "l1", 
                      title: "O que é No-Code?", 
                      duration: "10:05", 
                      type: "video", 
                      status: "published", 
                      bloom: "Remember", 
                      retention: 98,
                      hasQuiz: true 
                  },
                  { 
                      id: "l2", 
                      title: "Configurando o Ambiente", 
                      duration: "08:30", 
                      type: "video", 
                      status: "published", 
                      bloom: "Apply", 
                      retention: 92,
                      hasMaterial: true
                  },
                  { 
                      id: "l3", 
                      title: "Material de Apoio: Glossário", 
                      duration: "5 min", 
                      type: "text", 
                      status: "published", 
                      bloom: "Understand", 
                      retention: 85
                  }
              ]
          },
          { 
              id: "m2", 
              title: "Módulo 2: Banco de Dados Relacional", 
              duration: "2h 10min total",
              dropOffRisk: true, // Insight Alert Trigger
              lessons: [
                  { 
                      id: "l4", 
                      title: "Estrutura de Dados", 
                      duration: "15:20", 
                      type: "video", 
                      status: "review", 
                      bloom: "Analyze", 
                      retention: 45, // Low retention
                      hasQuiz: false
                  },
                  { 
                      id: "l5", 
                      title: "Relacionamentos (1:N, N:N)", 
                      duration: "12:10", 
                      type: "video", 
                      status: "draft", 
                      bloom: "Analyze", 
                      retention: 0 
                  }
              ]
          }
      ]
  };

  const students = [
      { name: "Mariana Costa", email: "mariana@example.com", progress: 85, lastAccess: "2h atrás", status: "active", avatar: "https://i.pravatar.cc/150?u=mc" },
      { name: "João Pedro", email: "joao@example.com", progress: 42, lastAccess: "1 dia atrás", status: "at_risk", avatar: "https://i.pravatar.cc/150?u=jp" },
      { name: "Lucas Silva", email: "lucas@example.com", progress: 100, lastAccess: "3 dias atrás", status: "completed", avatar: "https://i.pravatar.cc/150?u=ls" },
      { name: "Ana Beatriz", email: "ana@example.com", progress: 12, lastAccess: "15 dias atrás", status: "inactive", avatar: "https://i.pravatar.cc/150?u=ab" },
      { name: "Carlos Eduardo", email: "carlos@example.com", progress: 68, lastAccess: "5h atrás", status: "active", avatar: "https://i.pravatar.cc/150?u=ce" },
  ];

  // Helper for the "Technical Tag" look from the image
  const TaxonomyBadge = ({ level }: { level: string }) => (
      <span 
        className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
      >
          {level}
      </span>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans animate-fade-in bg-background">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      <main className="flex-1 container py-6 md:py-8 w-full space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}
            >
                Studio
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}
            >
                Cursos
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span className="text-foreground font-medium truncate">{course.title}</span>
        </div>

        {/* --- HERO HEADER --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Cover Image */}
            <div className="w-full lg:w-64 aspect-video lg:aspect-square bg-muted rounded-xl overflow-hidden border border-border shadow-sm shrink-0 relative group">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 z-10">
                    <Button variant="secondary" size="sm" className="h-8 text-xs font-bold">Alterar Capa</Button>
                </div>
                {/* Placeholder Art */}
                <div className="w-full h-full bg-[#1A1F2C] flex items-center justify-center text-slate-700 relative">
                    <Icon name="picture" size="size-8" />
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: STUDIO_PRIMARY }}></div>
                </div>
            </div>

            {/* Info & KPIs */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
                
                {/* Title Row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20 uppercase tracking-wide px-2 py-0.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Publicado
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono">v1.2 (Atualizado hoje)</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{course.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Criado por</span>
                            <span className="font-bold text-foreground border-b border-dashed border-muted-foreground/50 pb-0.5 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                                {course.author}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 text-xs h-9"><Icon name="share" size="size-3" /> Share</Button>
                    </div>
                </div>

                {/* KPI Cards - High Contrast Dark Mode Style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-card border border-border rounded-xl shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Health Score</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold font-mono" style={{ color: STUDIO_PRIMARY }}>{course.healthScore}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[var(--studio-primary)] to-transparent w-full opacity-50" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}></div>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Conclusão</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold font-mono" style={{ color: STUDIO_ACCENT }}>{course.metrics.completionRate}%</span>
                            <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-1.5 rounded">+2%</span>
                        </div>
                    </div>

                    <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">NPS</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold font-mono" style={{ color: STUDIO_GOLD }}>{course.metrics.nps}</span>
                            <div className="flex text-[8px] gap-0.5" style={{ color: STUDIO_GOLD }}>
                                <Icon name="star" type="solid" />
                                <Icon name="star" type="solid" />
                                <Icon name="star" type="solid" />
                                <Icon name="star" type="solid" />
                                <Icon name="star" type="solid" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Alunos</p>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-mono text-foreground">{course.metrics.students}</span>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-muted border-2 border-card"></div>
                                <div className="w-6 h-6 rounded-full bg-muted-foreground border-2 border-card"></div>
                                <div className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: STUDIO_PRIMARY }}>+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- INSIGHT ALERT (Dark Theme Adjusted) --- */}
        {course.modules.some(m => m.dropOffRisk) && (
            <div className="border-l-4 rounded-r-lg p-4 flex items-start gap-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)', borderColor: '#F97316' }}>
                <div className="p-2 rounded-full bg-orange-500/10 text-orange-500 shrink-0">
                    <Icon name="exclamation-triangle" size="size-4" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-orange-500 mb-1">Atenção Pedagógica</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        O <strong className="text-foreground">Módulo 2</strong> apresenta uma taxa de abandono <strong>40% acima da média</strong>. Considere revisar a aula "Estrutura de Dados" ou adicionar um quiz de fixação.
                    </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto border-orange-500/30 text-orange-500 hover:bg-orange-500/10">
                    Ver Análise
                </Button>
            </div>
        )}

        {/* --- MAIN TABS --- */}
        <Tabs defaultValue="curriculum" className="w-full">
            <div className="border-b border-border mb-8">
                <TabsList className="bg-transparent h-auto p-0 gap-8 w-full justify-start overflow-x-auto">
                    <TabsTrigger 
                        value="curriculum" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-primary)] data-[state=active]:text-[var(--studio-primary)] px-0 pb-4 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                    >
                        Currículo & Conteúdo
                    </TabsTrigger>
                    <TabsTrigger 
                        value="students" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-primary)] data-[state=active]:text-[var(--studio-primary)] px-0 pb-4 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                    >
                        Alunos & Progresso
                    </TabsTrigger>
                    <TabsTrigger 
                        value="analytics" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-primary)] data-[state=active]:text-[var(--studio-primary)] px-0 pb-4 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                    >
                        Analytics Detalhado
                    </TabsTrigger>
                    <TabsTrigger 
                        value="settings" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-primary)] data-[state=active]:text-[var(--studio-primary)] px-0 pb-4 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                    >
                        Configurações
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* TAB: CURRICULUM */}
            <TabsContent value="curriculum" className="space-y-8 animate-fade-in">
                
                {/* Curriculum Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold">Estrutura do Curso</h3>
                        <div className="flex items-center gap-3 text-xs font-mono pl-4 border-l border-border h-4">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Publicado</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Revisão</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Rascunho</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Icon name="sort-alt" size="size-3" /> Reordenar
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2 border-dashed border-muted-foreground/30 hover:border-[var(--studio-primary)] hover:text-[var(--studio-primary)]"
                            style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                        >
                            <Icon name="plus" size="size-3" /> Adicionar Módulo
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {course.modules.map((module, i) => (
                        <div key={module.id} className="border border-border rounded-xl overflow-hidden bg-card/30">
                            {/* Module Header */}
                            <div className="flex items-center justify-between p-4 bg-card border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground">
                                        <Icon name="menu-dots-vertical" size="size-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground">{module.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-[10px] h-5 font-mono px-1.5">{module.lessons.length} aulas</Badge>
                                            {module.dropOffRisk && <Badge variant="warning" className="text-[10px] h-5 bg-orange-500/10 text-orange-500 border-orange-500/20">Risco de Abandono</Badge>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-muted-foreground hidden sm:block">{module.duration}</span>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Icon name="pencil" size="size-3" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Icon name="plus" size="size-3" /></Button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Icon name="angle-small-down" /></Button>
                                </div>
                            </div>

                            {/* Lessons List */}
                            <div className="divide-y divide-border/50">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center gap-4 p-3 pl-4 hover:bg-muted/10 transition-colors group">
                                        
                                        {/* Drag Handle */}
                                        <div className="cursor-grab text-muted-foreground/20 hover:text-muted-foreground transition-colors">
                                            <Icon name="menu-dots-vertical" size="size-3" />
                                        </div>

                                        {/* Icon Type */}
                                        <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center shrink-0">
                                            <Icon 
                                                name={lesson.type === 'video' ? 'video-camera' : 'document'} 
                                                size="size-3" 
                                                className={lesson.type === 'video' ? 'text-blue-400' : 'text-orange-400'}
                                            />
                                        </div>

                                        {/* Title & Tags */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span 
                                                    className="text-sm font-medium text-foreground truncate cursor-pointer hover:text-[var(--studio-primary)] transition-colors"
                                                    style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                                                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_LESSON_EDITOR)}
                                                >
                                                    {lesson.title}
                                                </span>
                                                <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    {lesson.hasQuiz && (
                                                        <div title="Quiz">
                                                            <Icon name="list-check" size="size-3" className="text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    {lesson.hasMaterial && (
                                                        <div title="Anexo">
                                                            <Icon name="clip" size="size-3" className="text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TaxonomyBadge level={lesson.bloom} />
                                                <span className="text-[10px] font-mono bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground border border-border/50">{lesson.duration}</span>
                                            </div>
                                        </div>

                                        {/* Retention Bar (The "Visual Hook") */}
                                        <div className="w-32 hidden md:flex flex-col gap-1 pr-4">
                                            <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
                                                <span>Retenção</span>
                                                <span>{lesson.retention}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ 
                                                        width: `${lesson.retention}%`, 
                                                        backgroundColor: lesson.retention < 50 ? STUDIO_GOLD : STUDIO_PRIMARY 
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Status Dot */}
                                        <div className="pr-4 flex items-center justify-end w-8">
                                            <div 
                                                className={cn("w-2 h-2 rounded-full", 
                                                    lesson.status === 'published' ? "bg-green-500" : 
                                                    lesson.status === 'review' ? "bg-yellow-500" : "bg-muted-foreground"
                                                )}
                                                title={lesson.status}
                                            ></div>
                                        </div>

                                        {/* Actions (Hidden until hover) */}
                                        <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7"><Icon name="pencil" size="size-3" /></Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7"><Icon name="plus" size="size-3" /></Button>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Add Lesson Button */}
                                <div 
                                    className="p-2 flex items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors group/add"
                                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_LESSON_EDITOR)}
                                >
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground group-hover/add:text-[var(--studio-primary)] transition-colors" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                                        <Icon name="plus" size="size-3" /> Adicionar Aula ao Módulo
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>

            {/* TAB: STUDENTS */}
            <TabsContent value="students" className="animate-fade-in space-y-6">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-2 rounded-xl border border-border">
                    <div className="relative w-full md:w-80">
                        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                        <Input placeholder="Buscar por nome ou email..." className="pl-10 h-9" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Select 
                            placeholder="Status" 
                            options={[{label: "Ativo", value: "active"}, {label: "Risco", value: "risk"}, {label: "Completo", value: "completed"}]}
                            className="h-9 w-32"
                        />
                        <Select 
                            placeholder="Progresso" 
                            options={[{label: "0-25%", value: "q1"}, {label: "25-50%", value: "q2"}, {label: "75%+", value: "q4"}]}
                            className="h-9 w-32"
                        />
                        <Button variant="outline" className="h-9 gap-2"><Icon name="download" size="size-3" /> Exportar</Button>
                    </div>
                </div>

                {/* Students Table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead>Aluno</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progresso</TableHead>
                                <TableHead>Último Acesso</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student, i) => (
                                <TableRow key={i} className="hover:bg-muted/20">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={student.avatar} />
                                                <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-sm text-foreground">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {student.status === 'active' && <Badge variant="active" className="h-5 text-[10px]">Ativo</Badge>}
                                        {student.status === 'at_risk' && <Badge variant="warning" className="h-5 text-[10px]">Em Risco</Badge>}
                                        {student.status === 'completed' && <Badge variant="success" className="h-5 text-[10px]">Concluído</Badge>}
                                        {student.status === 'inactive' && <Badge variant="inactive" className="h-5 text-[10px]">Inativo</Badge>}
                                    </TableCell>
                                    <TableCell className="w-1/4">
                                        <div className="flex items-center gap-2">
                                            <Progress value={student.progress} className={cn("h-2", 
                                                student.progress === 100 ? "bg-green-200" : ""
                                            )} />
                                            <span className="text-xs font-mono font-bold w-8 text-right">{student.progress}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground font-mono text-xs">
                                        {student.lastAccess}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Icon name="envelope" size="size-3" /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Icon name="user" size="size-3" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>

            {/* TAB: ANALYTICS */}
            <TabsContent value="analytics" className="animate-fade-in space-y-8">
                
                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground font-medium">Receita Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">R$ 142.890</div>
                            <p className="text-xs text-green-500 mt-1 flex items-center gap-1"><Icon name="trend-up" size="size-3" /> +12% este mês</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground font-medium">Tempo Médio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">5h 40m</div>
                            <p className="text-xs text-muted-foreground mt-1">por aluno (curso completo)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground font-medium">Engajamento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">68%</div>
                            <p className="text-xs text-muted-foreground mt-1">taxa de conclusão média</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground font-medium">Avaliação</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono text-brand-yellow">4.9/5.0</div>
                            <p className="text-xs text-muted-foreground mt-1">baseado em 154 reviews</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Retention Curve */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Curva de Retenção</CardTitle>
                            <CardDescription>Onde os alunos estão parando.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 text-xs font-bold text-muted-foreground">M1</span>
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '98%', backgroundColor: STUDIO_PRIMARY }}></div>
                                    </div>
                                    <span className="text-xs font-mono font-bold">98%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-8 text-xs font-bold text-muted-foreground">M2</span>
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '85%', backgroundColor: `${STUDIO_PRIMARY}CC` }}></div>
                                    </div>
                                    <span className="text-xs font-mono font-bold">85%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-8 text-xs font-bold text-muted-foreground">M3</span>
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '60%', backgroundColor: `${STUDIO_PRIMARY}99` }}></div>
                                    </div>
                                    <span className="text-xs font-mono font-bold">60%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-8 text-xs font-bold text-muted-foreground">M4</span>
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '45%', backgroundColor: STUDIO_GOLD }}></div>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-destructive" style={{ color: STUDIO_GOLD }}>45%</span>
                                </div>
                            </div>
                            <Alert variant="warning" className="mt-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200">
                                <Icon name="exclamation" className="h-4 w-4" />
                                <AlertTitle className="text-xs">Queda Acentuada no Módulo 4</AlertTitle>
                                <AlertDescription className="text-xs">
                                    40% dos alunos desistem após a aula "Configuração de API". Considere simplificar.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    {/* Popular Lessons */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Aulas Mais Populares</CardTitle>
                            <CardDescription>Baseado em replays e tempo assistido.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { title: "O que é No-Code?", views: "1.2k", score: 98 },
                                    { title: "Estrutura de Dados", views: "980", score: 95 },
                                    { title: "Automação com Make", views: "850", score: 92 },
                                    { title: "Publicando seu App", views: "720", score: 88 }
                                ].map((lesson, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${STUDIO_PRIMARY}15`, color: STUDIO_PRIMARY }}>
                                                {i+1}
                                            </div>
                                            <span className="text-sm font-medium">{lesson.title}</span>
                                        </div>
                                        <div className="flex gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Icon name="eye" size="size-3" /> {lesson.views}</span>
                                            <span className="font-bold" style={{ color: STUDIO_PRIMARY }}>{lesson.score}pts</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* TAB: SETTINGS */}
            <TabsContent value="settings" className="animate-fade-in max-w-4xl mx-auto w-full space-y-8">
                
                {/* General Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Curso</CardTitle>
                        <CardDescription>Detalhes públicos visíveis na página de vendas.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Título do Curso</Label>
                                <Input defaultValue={course.title} />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <div className="flex">
                                    <span className="bg-muted px-3 py-2 text-sm text-muted-foreground border border-r-0 border-input rounded-l-md flex items-center">
                                        academialendaria.com/curso/
                                    </span>
                                    <Input className="rounded-l-none" defaultValue="vibecoding-no-code" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Descrição Curta</Label>
                                <Textarea className="h-20" defaultValue={course.description} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Access */}
                <Card>
                    <CardHeader>
                        <CardTitle>Acesso & Precificação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Matrículas Abertas</Label>
                                <p className="text-xs text-muted-foreground">Permitir que novos alunos comprem este curso.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Preço (BRL)</Label>
                                <Input type="number" defaultValue="997.00" />
                            </div>
                            <div className="space-y-2">
                                <Label>Preço Promocional</Label>
                                <Input type="number" placeholder="Opcional" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/30">
                    <CardHeader>
                        <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                        <CardDescription>Ações irreversíveis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                            <div className="space-y-1">
                                <p className="font-bold text-sm text-destructive">Arquivar Curso</p>
                                <p className="text-xs text-muted-foreground">O curso ficará oculto para novos alunos, mas acessível para atuais.</p>
                            </div>
                            <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">Arquivar</Button>
                        </div>
                    </CardContent>
                </Card>

            </TabsContent>
        </Tabs>

      </main>
    </div>
  );
};

export default CourseDetailTemplate;