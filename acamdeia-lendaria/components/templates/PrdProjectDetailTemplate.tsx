
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';

interface PrdProjectDetailTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

const PrdProjectDetailTemplate: React.FC<PrdProjectDetailTemplateProps> = ({ onNavigate, currentSection }) => {
  const { toast } = useToast();

  const handleDownloadZip = () => {
      toast({
          title: "Preparando Download...",
          description: "Compactando especificações, pesquisas e assets em docs.zip.",
      });

      // Simulate a download delay
      setTimeout(() => {
          // In a real app, this would fetch the zip blob
          const element = document.createElement("a");
          element.href = "data:text/plain;charset=utf-8,Simulação de arquivo ZIP com documentos do projeto.";
          element.download = "docs.zip";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

          toast({
              title: "Download Concluído",
              description: "O arquivo docs.zip foi baixado com sucesso.",
              variant: "success",
          });
      }, 1500);
  };

  const project = {
      title: "CRM para Dentistas",
      description: "Sistema completo de gestão de pacientes e agendamentos para clínicas odontológicas.",
      status: "Em Produção",
      progress: 67,
      created: "10/12/2024",
      updated: "Hoje às 14:32",
      epics: [
          {
              id: "E1",
              title: "FUNDAÇÃO E AUTENTICAÇÃO",
              completed: 3,
              total: 4,
              stories: [
                  { id: "1.1", title: "Configurar projeto Next.js + Supabase", status: "Concluído" },
                  { id: "1.2", title: "Implementar sistema de auth", status: "Concluído" },
                  { id: "1.3", title: "Criar modelo de dados inicial", status: "Concluído" },
                  { id: "1.4", title: "Setup de permissões por role", status: "Rascunho" },
              ]
          },
          {
              id: "E2",
              title: "GESTÃO DE PACIENTES",
              completed: 0,
              total: 5,
              stories: [
                  { id: "2.1", title: "Criar CRUD de pacientes", status: "Rascunho" },
                  { id: "2.2", title: "Implementar busca e filtros", status: "Rascunho" },
                  { id: "2.3", title: "Adicionar histórico de atendimentos", status: "Rascunho" },
                  { id: "2.4", title: "Upload de documentos do paciente", status: "Rascunho" },
                  { id: "2.5", title: "Exportar ficha em PDF", status: "Rascunho" },
              ]
          },
          {
              id: "E3",
              title: "AGENDAMENTO",
              completed: 0,
              total: 5,
              stories: []
          },
          {
              id: "E4",
              title: "FINANCEIRO E RELATÓRIOS",
              completed: 0,
              total: 4,
              stories: []
          }
      ]
  };

  const stats = [
      { label: "Épicos", value: "4", subtext: "4 pendentes" },
      { label: "Stories", value: "18", subtext: "3 concluídas" },
      { label: "Pesquisas", value: "5", subtext: "docs apoio" },
      { label: "Qualidade", value: "--", subtext: "sem score" },
  ];

  const pipelineSteps = [
      { label: "Upload", status: "done" },
      { label: "Brief", status: "done" },
      { label: "PRD", status: "done" },
      { label: "Épicos", status: "done" },
      { label: "Stories", status: "active" },
      { label: "Exportado", status: "pending" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* Top Bar matching PRD Studio */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
          <div className="container flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${STUDIO_TEAL}15`, borderColor: `${STUDIO_TEAL}30`, color: STUDIO_TEAL }}>
                  <Icon name="file-code" size="size-5" />
              </div>
              <div>
                  <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                      PRD <span className="font-light" style={{ color: STUDIO_TEAL }}>Studio</span>
                  </h1>
                  <p className="text-xs text-muted-foreground font-serif">Detalhes do Projeto</p>
              </div>
          </div>
      </header>

      <main className="container py-6 md:py-8 w-full space-y-8 flex-1">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}
            >
                Projetos
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span className="text-foreground font-medium truncate">{project.title}</span>
        </div>

        {/* --- HERO HEADER --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20 uppercase tracking-wide px-2 py-0.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span> {project.status}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{project.title}</h1>
                        <p className="text-muted-foreground font-serif max-w-2xl">{project.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            variant="outline" 
                            className="gap-2"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}
                        >
                            <Icon name="arrow-left" size="size-3" /> Voltar
                        </Button>
                        <Button className="gap-2 text-white shadow-lg" style={{ backgroundColor: STUDIO_TEAL }}>
                            <Icon name="play" size="size-3" /> Continuar Produção
                        </Button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <Card key={i} className="bg-card border border-border shadow-sm p-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">{stat.label}</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold font-mono" style={{ color: STUDIO_TEAL }}>{stat.value}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground">{stat.subtext}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Pipeline */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Pipeline de Produção</h3>
                        <span className="text-xs font-mono text-muted-foreground">{project.progress}% completo</span>
                    </div>
                    <div className="relative mb-6">
                        <Progress value={project.progress} className="h-1 bg-muted" style={{ '--primary': STUDIO_TEAL } as React.CSSProperties} />
                    </div>
                    <div className="flex justify-between items-center relative">
                        {pipelineSteps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 relative z-10 group">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors text-xs font-bold",
                                    step.status === 'done' ? "bg-card text-foreground border-[var(--studio-teal)]" :
                                    step.status === 'active' ? "bg-[var(--studio-teal)] text-white border-[var(--studio-teal)] shadow-lg ring-4 ring-[var(--studio-teal)]/20" :
                                    "bg-card border-border text-muted-foreground"
                                )} style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                    {step.status === 'done' ? <Icon name="check" size="size-3" /> : (i + 1)}
                                </div>
                                <span className={cn(
                                    "text-[10px] uppercase tracking-wider font-bold",
                                    step.status === 'active' ? "text-[var(--studio-teal)]" : "text-muted-foreground"
                                )} style={step.status === 'active' ? { color: STUDIO_TEAL } : {}}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Structure */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Estrutura do Projeto</h3>
                            <p className="text-xs text-muted-foreground">4 épicos · 18 stories</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2 text-[var(--studio-teal)]" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                            <Icon name="pencil" size="size-3" /> Editar
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Accordion type="multiple" defaultValue={["E1"]} className="space-y-4">
                            {project.epics.map((epic) => (
                                <AccordionItem key={epic.id} value={epic.id} className="border border-border rounded-xl bg-card overflow-hidden">
                                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Badge variant="outline" className="font-mono text-xs">{epic.id}</Badge>
                                            <span className="font-bold text-sm uppercase tracking-wide text-foreground">{epic.title}</span>
                                            <div className="ml-auto mr-4 flex items-center gap-4 text-xs text-muted-foreground font-normal">
                                                <span>{epic.total} stories</span>
                                                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full rounded-full" 
                                                        style={{ 
                                                            width: `${(epic.completed / epic.total) * 100}%`,
                                                            backgroundColor: epic.completed === epic.total ? '#10B981' : STUDIO_TEAL 
                                                        }}
                                                    ></div>
                                                </div>
                                                <span>{Math.round((epic.completed / epic.total) * 100)}%</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="border-t border-border bg-muted/10 p-0">
                                        <div className="divide-y divide-border/50">
                                            {epic.stories.length > 0 ? (
                                                epic.stories.map((story) => (
                                                    <div 
                                                        key={story.id} 
                                                        className="flex items-center justify-between p-3 pl-6 hover:bg-muted/20 transition-colors group cursor-pointer"
                                                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STORY_DETAIL)}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <span className="font-mono text-xs text-muted-foreground w-8">{story.id}</span>
                                                            <span className="text-sm font-medium text-foreground group-hover:text-[var(--studio-teal)] transition-colors" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                                                {story.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <Badge 
                                                                variant="outline" 
                                                                className={cn(
                                                                    "text-[10px] font-normal border-0",
                                                                    story.status === 'Concluído' ? "text-green-500 bg-green-500/10" : "text-muted-foreground bg-muted"
                                                                )}
                                                            >
                                                                {story.status}
                                                            </Badge>
                                                            <Icon name="angle-small-right" className="text-muted-foreground group-hover:text-foreground" size="size-3" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-xs text-muted-foreground italic">
                                                    Nenhuma história criada neste épico.
                                                </div>
                                            )}
                                            
                                            {/* Add Story Action */}
                                            <div className="p-2 flex justify-center">
                                                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-[var(--studio-teal)]" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                                    <Icon name="plus" size="size-3" className="mr-1" /> Adicionar Story
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <div className="w-full lg:w-80 space-y-6">
                
                {/* Quick Actions */}
                <Card className="border-border shadow-sm">
                    <CardHeader className="pb-3 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left">
                                <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center"><Icon name="edit" size="size-4" /></div>
                                <span>Editar Brief</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left">
                                <div className="w-8 h-8 rounded bg-purple-500/10 text-purple-500 flex items-center justify-center"><Icon name="search" size="size-4" /></div>
                                <span>Ver Pesquisas</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left">
                                <div className="w-8 h-8 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center"><Icon name="list" size="size-4" /></div>
                                <span>Editar PRD</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left">
                                <div className="w-8 h-8 rounded bg-green-500/10 text-green-500 flex items-center justify-center"><Icon name="check-circle" size="size-4" /></div>
                                <span>Validação de QA</span>
                            </button>
                            
                            {/* New Download Action */}
                            <button 
                                className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left group"
                                onClick={handleDownloadZip}
                            >
                                <div className="w-8 h-8 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Icon name="download" size="size-4" /></div>
                                <span className="group-hover:text-indigo-500 transition-colors">Baixar Docs (.zip)</span>
                            </button>

                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-sm text-left group">
                                <div className="w-8 h-8 rounded bg-[var(--studio-teal)]/10 text-[var(--studio-teal)] flex items-center justify-center" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}><Icon name="rocket" size="size-4" /></div>
                                <span className="font-bold group-hover:text-[var(--studio-teal)] transition-colors" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>Exportar Projeto</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="border-border shadow-sm bg-muted/10">
                    <CardHeader className="pb-3 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Informações</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500">Em Produção</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tipo</span>
                            <span className="font-medium">Projeto</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Criado em</span>
                            <span className="font-mono text-xs">{project.created}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Atualizado</span>
                            <span className="font-mono text-xs">{project.updated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Exports</span>
                            <span className="font-mono text-xs">0</span>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>

      </main>
    </div>
  );
};

export default PrdProjectDetailTemplate;
