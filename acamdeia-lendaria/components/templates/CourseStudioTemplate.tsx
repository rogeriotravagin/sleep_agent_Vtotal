
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Select } from '../ui/select';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { Section } from '../../types'; 
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
// New Components
import { MetricCard } from '../ui/metric-card';
import { Pipeline, PipelineStep } from '../ui/pipeline';
import { Timeline } from '../ui/timeline';

interface CourseStudioTemplateProps {
    onNavigate: (section: Section) => void;
    currentSection: Section;
}

const CourseStudioTemplate: React.FC<CourseStudioTemplateProps> = ({ onNavigate, currentSection }) => {
  const STUDIO_PRIMARY = "#538096";
  const STUDIO_ACCENT = "#F2EBE4";
  const GOLD_LINK = "#C9B298";

  const [filterProfessor, setFilterProfessor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const pipelineSteps: PipelineStep[] = [
    { id: 1, label: "Briefing", count: 8, icon: "file-edit", status: 'active', description: "Definição de escopo" },
    { id: 2, label: "Pesquisa", count: 3, icon: "search", status: 'pending', description: "Coleta de referências" },
    { id: 3, label: "Currículo", count: 1, icon: "list", status: 'pending', description: "Estrutura de módulos" },
    { id: 4, label: "Geração", count: 2, icon: "magic-wand", status: 'pending', description: "Criação com IA" },
    { id: 5, label: "Validação", count: 0, icon: "check-circle", status: 'pending', description: "Revisão técnica" },
    { id: 6, label: "Produção", count: 4, icon: "video-camera", status: 'pending', description: "Gravação/Edição" },
    { id: 7, label: "Publicado", count: 12, icon: "rocket", status: 'done', description: "Disponível na plataforma" },
  ];

  const courses = [
    { id: 1, title: "Vibecoding - Apps Sem Código", category: "Dev No-Code", author: "Alan Nicolas", modules: 3, lessons: 7, status: "Completo", date: "10/12/2025", icon: "magic-wand", formats: ['video', 'quiz'] },
    { id: 2, title: "Claude Code Expert", category: "IA Generativa", author: "José Carlos Amorim", modules: 3, lessons: 11, status: "Completo", date: "10/12/2025", icon: "terminal", formats: ['video', 'code'] },
    { id: 3, title: "Prompt Engineering", category: "IA Generativa", author: "José Carlos Amorim", modules: 4, lessons: 12, status: "Em Produção", progress: 65, date: "10/12/2025", icon: "comment-code", formats: ['video', 'text'] },
    { id: 4, title: "Meu Clone IA - Ganhe Tempo", category: "Produtividade", author: "Alan Nicolas", modules: 3, lessons: 10, status: "Completo", date: "10/12/2025", icon: "fingerprint", formats: ['video'] },
    { id: 5, title: "Didática Lendária", category: "Soft Skills", author: "Adriano de Marqui", modules: 7, lessons: 35, status: "Completo", date: "10/12/2025", icon: "presentation", formats: ['video', 'text', 'quiz'] },
    { id: 6, title: "Supabase do Zero", category: "Backend", author: "Alan Nicolas", modules: 13, lessons: 59, status: "Completo", date: "10/12/2025", icon: "database", formats: ['video', 'code'] },
  ];

  const filteredCourses = filterProfessor 
    ? courses.filter(c => c.author === filterProfessor) 
    : courses;

  const CourseActionsMenu = () => (
    <DropdownMenu 
        align="right"
        trigger={
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[state=open]:bg-muted data-[state=open]:text-foreground"
            >
                <Icon name="menu-dots-vertical" size="size-4" />
            </Button>
        }
    >
        <DropdownMenuLabel>Ações do Curso</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <Icon name="pencil" className="mr-2 h-4 w-4 opacity-70" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Icon name="duplicate" className="mr-2 h-4 w-4 opacity-70" /> Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Icon name="eye" className="mr-2 h-4 w-4 opacity-70" /> Preview
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
            <Icon name="trash" className="mr-2 h-4 w-4" /> Arquivar
        </DropdownMenuItem>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in flex flex-col">
      
      {/* Shared TopBar */}
      <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />

      <main className="flex-1 container py-6 md:py-8 w-full space-y-8">
          
          {/* Stats Row with Consolidated MetricCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                label="Cursos Ativos" value="8" icon="graduation-cap" trend="+12%" trendDirection="up" description="vs mês anterior" color={STUDIO_PRIMARY} 
                sparklineData="0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0"
              />
              <MetricCard 
                label="Total de Lições" value="161" icon="document" trend="+5" trendDirection="up" description="novas esta semana" color={STUDIO_PRIMARY}
                sparklineData="0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2"
              />
              <MetricCard 
                label="Horas de Conteúdo" value="28.8h" icon="clock" trend="0%" trendDirection="neutral" description="atualizado hoje" color={STUDIO_PRIMARY}
                sparklineData="0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15"
              />
              <MetricCard 
                label="Alunos Impactados" value="3.2k" icon="users-alt" trend="+15%" trendDirection="up" description="vs mês anterior" color={STUDIO_PRIMARY}
                sparklineData="0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0"
              />
          </div>

          {/* Pipeline Component */}
          <Pipeline 
            steps={pipelineSteps} 
            title="Pipeline de Produção" 
            color={STUDIO_PRIMARY}
            actionLabel="Gerenciar"
            onAction={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PIPELINE)}
          />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* Course List (Left - 3 Cols) */}
              <div className="xl:col-span-3 space-y-6">
                  
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-2 rounded-xl border border-border shadow-sm">
                      <div className="relative w-full sm:w-80">
                          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                          <Input placeholder="Buscar cursos..." className="pl-10 bg-muted/30 border-border text-sm h-10 focus:border-[var(--studio-primary)]/50 transition-colors" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties} />
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto items-center">
                          {filterProfessor && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setFilterProfessor(null)}
                                className="h-8 text-xs text-muted-foreground hover:text-destructive"
                              >
                                  <Icon name="cross" size="size-3" className="mr-1" /> Limpar Filtro
                              </Button>
                          )}
                          <Select 
                              placeholder="Todos"
                              options={[{label: 'Recentes', value: 'recent'}, {label: 'Antigos', value: 'old'}]}
                              className="w-full sm:w-32 h-10 bg-muted/30 border-border"
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

                  {/* List / Grid Container */}
                  <div className={cn("transition-all duration-300", viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}>
                      {filteredCourses.length > 0 ? (
                          filteredCourses.map((course) => (
                              <div 
                                key={course.id} 
                                className={cn(
                                    "bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-visible",
                                    viewMode === 'list' ? "p-4 flex flex-col sm:flex-row items-center gap-4" : "p-5 flex flex-col items-start gap-4"
                                )}
                                style={{ '--studio-primary': STUDIO_PRIMARY, '--studio-accent': STUDIO_ACCENT } as React.CSSProperties}
                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_DETAIL)}
                              >
                                  {/* Hover Border Effect */}
                                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--studio-primary)]/30 rounded-xl pointer-events-none transition-colors"></div>

                                  {/* Icon Box */}
                                  <div className={cn(
                                      "rounded-lg flex items-center justify-center transition-colors shrink-0 bg-[var(--studio-accent)] text-[var(--studio-primary)] group-hover:bg-[var(--studio-primary)] group-hover:text-white",
                                      viewMode === 'list' ? "w-12 h-12" : "w-14 h-14 mb-2"
                                  )}>
                                      <Icon name={course.icon} size="size-5" />
                                  </div>

                                  {/* Info */}
                                  <div className={cn("flex-1 min-w-0", viewMode === 'grid' && "w-full")}>
                                      <div className={cn("flex gap-2 mb-1", viewMode === 'list' ? "items-center justify-center sm:justify-start" : "items-center justify-between")}>
                                          <h4 
                                            className="text-base font-bold text-foreground group-hover:text-[var(--studio-primary)] transition-colors truncate"
                                          >
                                              {course.title}
                                          </h4>
                                          {viewMode === 'grid' && (
                                              <div className="relative z-20">
                                                  <CourseActionsMenu />
                                              </div>
                                          )}
                                      </div>
                                      
                                      <div className={cn("flex items-center gap-2 mb-2", viewMode === 'list' ? "justify-center sm:justify-start" : "")}>
                                          <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-[var(--studio-primary)]/30 text-[var(--studio-primary)] bg-[var(--studio-primary)]/5">
                                              {course.category}
                                          </Badge>
                                          {course.formats && course.formats.map(f => (
                                              <div key={f} className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                                  <Icon name={f === 'video' ? 'video-camera' : f === 'code' ? 'code-simple' : f === 'quiz' ? 'list-check' : 'document'} size="size-3" />
                                              </div>
                                          ))}
                                      </div>

                                      <div className={cn(
                                          "flex items-center gap-4 text-xs text-muted-foreground font-serif",
                                          viewMode === 'list' ? "flex-wrap justify-center sm:justify-start" : "flex-col items-start gap-2 border-t border-border pt-3 mt-3 w-full"
                                      )}>
                                          <a 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setFilterProfessor(course.author);
                                            }}
                                            className="flex items-center gap-1.5 hover:underline transition-colors font-medium"
                                            style={{ color: GOLD_LINK }}
                                          >
                                              <Icon name="user" size="size-3" /> {course.author}
                                          </a>
                                          <div className="flex items-center gap-4">
                                              <span className="flex items-center gap-1.5"><Icon name="layers" size="size-3" /> {course.modules} mód</span>
                                              <span className="flex items-center gap-1.5"><Icon name="document" size="size-3" /> {course.lessons} aulas</span>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Status & Date */}
                                  <div className={cn(
                                      "flex gap-1",
                                      viewMode === 'list' ? "flex-col items-center sm:items-end min-w-[140px]" : "w-full items-center justify-between border-t border-border pt-3 mt-auto"
                                  )}>
                                      {course.status === 'Em Produção' ? (
                                          <div className={cn("space-y-1", viewMode === 'list' ? "w-32" : "flex-1 mr-4")}>
                                              <div className="flex justify-between text-[10px] uppercase font-bold" style={{ color: STUDIO_PRIMARY }}>
                                                  <span>Produzindo</span>
                                                  <span>{course.progress}%</span>
                                              </div>
                                              <Progress 
                                                value={course.progress} 
                                                className="h-1.5 bg-muted" 
                                                style={{ '--primary': STUDIO_PRIMARY } as React.CSSProperties}
                                              />
                                          </div>
                                      ) : (
                                          <Badge variant="outline" className="border-green-500/30 text-green-600 bg-green-500/10 text-[10px] uppercase tracking-wider px-2 py-0.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                                              {course.status}
                                          </Badge>
                                      )}
                                      <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                                          <Icon name="calendar" size="size-3" /> {course.date}
                                      </span>
                                  </div>

                                  {/* Actions Dropdown (List View Only) */}
                                  {viewMode === 'list' && (
                                      <div className="relative z-20">
                                          <CourseActionsMenu />
                                      </div>
                                  )}
                              </div>
                          ))
                      ) : (
                          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/10 col-span-full">
                              <p className="text-muted-foreground text-sm">Nenhum curso encontrado para este filtro.</p>
                              <Button variant="link" onClick={() => setFilterProfessor(null)} className="mt-2 text-[var(--studio-primary)]" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>Limpar Filtros</Button>
                          </div>
                      )}
                  </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-24 h-fit">
                  <Card className="bg-card border-border shadow-sm">
                      <CardHeader className="pb-3 border-b border-border">
                          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <Icon name="bell" size="size-4" /> Atividade Recente
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 px-4 pb-0">
                          {/* Consolidated Timeline Component */}
                          <Timeline 
                            items={[
                                { title: "Alan editou Vibecoding", date: "2min atrás", icon: "pencil", status: "active" },
                                { title: "José criou Módulo 2", date: "15min atrás", icon: "plus", status: "default" },
                                { title: "Adriano publicou Didática", date: "1h atrás", icon: "rocket", status: "success" },
                            ]}
                          />
                      </CardContent>
                  </Card>
              </div>
          </div>
      </main>
    </div>
  );
};

export default CourseStudioTemplate;
