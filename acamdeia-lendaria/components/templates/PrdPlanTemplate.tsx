
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';

interface PrdPlanTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Types ---
interface Story {
    id: string;
    title: string;
    verb: string;
    complexity: 'P' | 'M' | 'G';
    criteria: number; // Count
}

interface Epic {
    id: string;
    title: string;
    objective: string;
    status: 'draft' | 'generated' | 'validated';
    stories: Story[];
}

const PrdPlanTemplate: React.FC<PrdPlanTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Steps Visualization
  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "done" },
      { id: "prd", label: "PRD", status: "done" },
      { id: "epics", label: "Épicos", status: "active" },
      { id: "stories", label: "Stories", status: "active" },
      { id: "export", label: "Export", status: "pending" }
  ];

  const [epics, setEpics] = useState<Epic[]>([
      {
          id: "E1",
          title: "FUNDAÇÃO E AUTENTICAÇÃO",
          objective: "Estabelecer base segura para o sistema.",
          status: 'generated',
          stories: [
              { id: "1.1", title: "Configurar ambiente Next.js + Supabase", verb: "Configurar", complexity: "M", criteria: 3 },
              { id: "1.2", title: "Implementar login social Google", verb: "Implementar", complexity: "M", criteria: 2 },
              { id: "1.3", title: "Criar sistema de Roles (RBAC)", verb: "Criar", complexity: "G", criteria: 4 },
          ]
      },
      {
          id: "E2",
          title: "GESTÃO DE PACIENTES",
          objective: "CRUD completo de dados sensíveis.",
          status: 'generated',
          stories: [
              { id: "2.1", title: "Desenvolver formulário de cadastro", verb: "Desenvolver", complexity: "M", criteria: 5 },
              { id: "2.2", title: "Listar pacientes com busca e filtro", verb: "Listar", complexity: "P", criteria: 2 },
          ]
      },
       {
          id: "E3",
          title: "AGENDAMENTO INTELIGENTE",
          objective: "Sistema de calendário com conflitos.",
          status: 'generated',
          stories: [
              { id: "3.1", title: "Criar componente de Calendário", verb: "Criar", complexity: "G", criteria: 6 },
          ]
      }
  ]);

  const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
          setIsGenerating(false);
          setHasGenerated(true);
          toast({
              title: "Plano Gerado",
              description: "Épicos e Stories criados com base no PRD.",
              variant: "success",
          });
      }, 2500);
  };

  const handleValidate = () => {
      toast({
          title: "Plano Aprovado",
          description: "Avançando para exportação...",
          variant: "success",
      });
      setTimeout(() => {
          if (onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_EXPORT);
      }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground relative">
      
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="hover:text-foreground cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}>Projetos</span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="text-foreground font-medium">Plano de Execução</span>
                  </div>
                  <Badge variant="outline" className="w-fit border-[var(--studio-teal)]/30 text-[var(--studio-teal)] bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      40% Humano · 60% IA
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
                                    ? "border-[var(--studio-teal)] bg-[var(--studio-teal)] text-white shadow-lg" 
                                    : step.status === 'done'
                                    ? "bg-card border-[var(--studio-teal)] text-[var(--studio-teal)]"
                                    : "border-border bg-card text-muted-foreground"
                            )}
                            style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                          >
                              {step.status === 'done' ? <Icon name="check" size="size-3" /> : (i + 1)}
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

      {/* Main Content */}
      <main className="flex-1 container py-8 max-w-5xl mx-auto space-y-8">
          
          {/* Intro */}
          <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">Arquitetura de Execução</h1>
              <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                  A IA transformou seu PRD em marcos (Épicos) e tarefas (Stories). Valide a lógica antes de exportar para garantir que o "Puxadinho" vire "Mansão".
              </p>
          </div>

          {!hasGenerated && !isGenerating && (
              <Card className="border-dashed border-2 py-16 flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 bg-[var(--studio-teal)]/10 rounded-full flex items-center justify-center text-[var(--studio-teal)]" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      <Icon name="layers" size="size-10" />
                  </div>
                  <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold">Pronto para gerar o plano</h3>
                      <p className="text-muted-foreground text-sm">Baseado nas especificações técnicas aprovadas.</p>
                  </div>
                  <Button size="lg" onClick={handleGenerate} className="gap-2 shadow-lg text-white" style={{ backgroundColor: STUDIO_TEAL }}>
                      <Icon name="sparkles" /> Gerar Épicos e Stories
                  </Button>
              </Card>
          )}

          {isGenerating && (
              <div className="py-16 flex flex-col items-center justify-center gap-6 animate-pulse">
                  <span style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      <Icon name="brain-circuit" size="size-10" className="text-[var(--studio-teal)] animate-spin-slow" />
                  </span>
                  <p className="text-muted-foreground font-mono">Quebrando PRD em tarefas atômicas...</p>
              </div>
          )}

          {hasGenerated && (
              <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Epics List */}
                  <div className="space-y-4">
                      {epics.map((epic, index) => (
                          <Accordion type="single" collapsible key={epic.id} className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
                              <AccordionItem value={epic.id} className="border-0">
                                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                                      <div className="flex items-center gap-4 flex-1 text-left">
                                          <div className="flex flex-col items-center justify-center w-12 h-12 bg-muted rounded-lg border border-border">
                                              <span className="text-[10px] uppercase text-muted-foreground font-bold">Épico</span>
                                              <span className="text-lg font-bold font-mono">{index + 1}</span>
                                          </div>
                                          <div className="flex-1">
                                              <h4 className="font-bold text-base text-foreground">{epic.title}</h4>
                                              <p className="text-sm text-muted-foreground font-serif">{epic.objective}</p>
                                          </div>
                                          <Badge variant="outline" className="mr-4">
                                              {epic.stories.length} stories
                                          </Badge>
                                      </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="bg-muted/5 border-t border-border px-0 pb-0">
                                      <div className="divide-y divide-border/50">
                                          {epic.stories.map((story) => (
                                              <div key={story.id} className="flex items-center gap-4 p-4 pl-8 hover:bg-muted/20 transition-colors group">
                                                  <div className="w-16 font-mono text-xs text-muted-foreground">{story.id}</div>
                                                  <div className="flex-1">
                                                      <div className="flex items-center gap-2">
                                                          <Badge variant="secondary" className="text-[9px] h-4 px-1">{story.verb}</Badge>
                                                          <span className="text-sm font-medium">{story.title.replace(story.verb, '').trim()}</span>
                                                      </div>
                                                  </div>
                                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                      <span title="Complexidade">Comp: <strong>{story.complexity}</strong></span>
                                                      <span title="Critérios de Aceite"><Icon name="list-check" size="size-3" className="inline mr-1" /> {story.criteria}</span>
                                                  </div>
                                                  <div className="w-8 opacity-0 group-hover:opacity-100">
                                                      <Button variant="ghost" size="icon" className="h-6 w-6"><Icon name="pencil" size="size-3" /></Button>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                      <div className="p-2 border-t border-border/50 text-center">
                                          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                                              <Icon name="plus" size="size-3" /> Adicionar Story Manual
                                          </Button>
                                      </div>
                                  </AccordionContent>
                              </AccordionItem>
                          </Accordion>
                      ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-8 border-t border-border sticky bottom-0 bg-background/95 backdrop-blur py-4 z-10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="check-circle" className="text-green-500" size="size-4" />
                          <span>QA Automático: Verbos de ação validados.</span>
                      </div>
                      <div className="flex gap-4">
                          <Button variant="outline" onClick={() => toast({ title: "Regenerando...", description: "Ajustando granularidade das stories." })}>
                              Refinar com IA
                          </Button>
                          <Button 
                            size="lg" 
                            onClick={handleValidate} 
                            className="shadow-lg text-white font-bold px-8"
                            style={{ backgroundColor: STUDIO_TEAL }}
                          >
                              Aprovar e Exportar <Icon name="arrow-right" className="ml-2" />
                          </Button>
                      </div>
                  </div>
              </div>
          )}

      </main>

    </div>
  );
};

export default PrdPlanTemplate;
