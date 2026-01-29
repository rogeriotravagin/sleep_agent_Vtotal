
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { CodeBlock } from '../ui/code-block';

interface PrdBriefTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Mock Data ---
const originalInput = "Preciso de um CRM para clínicas odontológicas que tenha agenda, prontuário e financeiro.";
const researchInsights = [
    "Integração com sistemas legados (raio-x) é um grande diferencial.",
    "A maior dor é a gestão de retornos (pacientes que somem).",
    "Dentistas usam muito o celular entre atendimentos - mobile first é crucial."
];

const PrdBriefTemplate: React.FC<PrdBriefTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Form States
  const [problem, setProblem] = useState("Clínicas perdem 30% da receita por falta de gestão de retorno de pacientes e dependem de sistemas arcaicos que não conversam entre si.");
  const [solution, setSolution] = useState("Um CRM mobile-first focado em automação de retornos via WhatsApp e integração simples com softwares de imagem.");
  const [differentials, setDifferentials] = useState("1. Foco total em Mobile (dentista não senta no PC)\n2. Automação de 'Recall' inteligente\n3. UX simplificada (menos cliques)");
  const [scopeIn, setScopeIn] = useState("- Agenda Inteligente\n- Prontuário Digital com upload de imagens\n- Módulo Financeiro Básico\n- Disparador de WhatsApp");
  const [scopeOut, setScopeOut] = useState("- Emissão de Notas Fiscais (NFS-e)\n- Estoque avançado\n- Telemedicina");
  const [metrics, setMetrics] = useState("- Redução de faltas em 20%\n- Aumento de retornos em 15%\n- Tempo de agendamento < 30s");

  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "active" }, 
      { id: "prd", label: "PRD", status: "pending" },
      { id: "epics", label: "Épicos", status: "pending" },
      { id: "stories", label: "Stories", status: "pending" },
      { id: "export", label: "Export", status: "pending" }
  ];

  const generateMarkdown = () => {
      return `# Project Brief

## Problema
${problem}

## Solução Proposta
${solution}

## Diferenciais
${differentials}

## Escopo (In)
${scopeIn}

## Escopo (Out)
${scopeOut}

## Métricas de Sucesso
${metrics}
`;
  };

  const handleDownload = () => {
      const element = document.createElement("a");
      const file = new Blob([generateMarkdown()], {type: 'text/markdown'});
      element.href = URL.createObjectURL(file);
      element.download = "brief.md";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
          title: "Download Iniciado",
          description: "O arquivo brief.md foi salvo.",
          variant: "success"
      });
  };

  const handleTaskSelection = () => {
      setShowTaskDialog(true);
  };

  const confirmTaskExport = () => {
      setShowTaskDialog(false);
      // In a real app, this would trigger the export flow directly
      toast({
          title: "Fluxo de Tarefa Iniciado",
          description: "Redirecionando para exportação...",
      });
      setTimeout(() => {
        if(onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_STUDIO); // Simulating export end
      }, 1000);
  };

  const handleProjectSelection = () => {
      toast({
          title: "Fluxo de Projeto Definido",
          description: "Avançando para o detalhamento técnico (PRD).",
          variant: "success"
      });
      if(onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_PROJECT_DETAIL); // Or specific PRD Wizard step
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
                      <span className="hover:text-foreground cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_UPLOAD)}>Novo Projeto</span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="text-foreground font-medium">Brief Builder</span>
                  </div>
                  <Badge variant="outline" className="w-fit border-[var(--studio-teal)]/30 text-[var(--studio-teal)] bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      90% Você · 10% IA
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

      {/* Main Content Split View */}
      <main className="flex-1 container py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CONTEXT (Sticky) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Contexto & Insights</h2>
                  <p className="text-sm text-muted-foreground font-serif">
                      A base de informações que a IA usou para estruturar o brief ao lado.
                  </p>
              </div>

              <Card className="bg-muted/10 border-dashed border-border">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Icon name="cloud-upload" size="size-4" /> Input Original
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm font-serif italic text-foreground/80">"{originalInput}"</p>
                  </CardContent>
              </Card>

              <Card className="bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]/20" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                  <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--studio-teal)] flex items-center gap-2" style={{ color: STUDIO_TEAL }}>
                          <Icon name="lightbulb-on" size="size-4" /> Insights (WOWs)
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      {researchInsights.map((insight, i) => (
                          <div key={i} className="flex gap-3 items-start text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--studio-teal)] mt-1.5 shrink-0" style={{ backgroundColor: STUDIO_TEAL }}></div>
                              <p className="text-foreground/90 leading-snug">{insight}</p>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-600 text-xs font-medium flex gap-3">
                  <Icon name="info" size="size-4" className="shrink-0 mt-0.5" />
                  <p>Lembre-se: O Brief é o contrato entre sua visão e a execução técnica. Seja específico.</p>
              </div>
          </aside>

          {/* RIGHT: THE BRIEF (Editable) */}
          <div className="lg:col-span-8 space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
                  <div className="flex items-center gap-4">
                      <h1 className="text-3xl font-bold">Seu Brief Estruturado</h1>
                      <Badge variant="outline" className="gap-2 text-[var(--studio-teal)] border-[var(--studio-teal)]/20 bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          <Icon name="sparkles" size="size-3" /> IA Generated
                      </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                       <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
                          <button 
                              onClick={() => setViewMode('edit')}
                              className={cn(
                                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                  viewMode === 'edit' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                              )}
                          >
                              Editor
                          </button>
                          <button 
                              onClick={() => setViewMode('preview')}
                              className={cn(
                                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                  viewMode === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                              )}
                          >
                              Markdown
                          </button>
                       </div>
                       <Button variant="outline" size="icon" onClick={handleDownload} title="Baixar .md">
                           <Icon name="download" size="size-4" />
                       </Button>
                  </div>
              </div>

              {viewMode === 'edit' ? (
                /* Editable Sections */
                <div className="space-y-8 animate-fade-in">
                    
                    {/* Problem & Solution */}
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                               <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Super Problema</label>
                               <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 opacity-50 hover:opacity-100"><Icon name="refresh" size="size-3" /> Regenerar</Button>
                            </div>
                            <AutosizeTextarea 
                                className="text-base font-serif leading-relaxed bg-card"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                            />
                        </div>
                        
                        <div className="space-y-2">
                             <div className="flex justify-between items-center">
                               <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Solução Proposta</label>
                               <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 opacity-50 hover:opacity-100"><Icon name="refresh" size="size-3" /> Regenerar</Button>
                            </div>
                            <AutosizeTextarea 
                                className="text-base font-serif leading-relaxed bg-card"
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Differentials */}
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Diferenciais Críticos</label>
                             <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 opacity-50 hover:opacity-100"><Icon name="refresh" size="size-3" /> Regenerar</Button>
                         </div>
                         <AutosizeTextarea 
                             className="text-sm font-mono leading-relaxed bg-card border-l-4 border-[var(--studio-teal)]"
                             style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                             value={differentials}
                             onChange={(e) => setDifferentials(e.target.value)}
                         />
                    </div>

                    {/* Scope */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-wider text-green-600 flex items-center gap-2"><Icon name="check-circle" size="size-4" /> Escopo - O que FAZ</label>
                             <AutosizeTextarea 
                                 className="text-sm bg-green-500/5 border-green-500/20 min-h-[150px]"
                                 value={scopeIn}
                                 onChange={(e) => setScopeIn(e.target.value)}
                             />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-wider text-destructive flex items-center gap-2"><Icon name="cross-circle" size="size-4" /> Escopo - O que NÃO FAZ</label>
                             <AutosizeTextarea 
                                 className="text-sm bg-destructive/5 border-destructive/20 min-h-[150px]"
                                 value={scopeOut}
                                 onChange={(e) => setScopeOut(e.target.value)}
                             />
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                         <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Métricas de Sucesso</label>
                         <AutosizeTextarea 
                             className="text-sm bg-card"
                             value={metrics}
                             onChange={(e) => setMetrics(e.target.value)}
                         />
                    </div>

                </div>
              ) : (
                /* Preview Section */
                <div className="animate-fade-in">
                    <Card className="border border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border py-3">
                            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                <Icon name="file-code" size="size-3" /> brief.md
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CodeBlock language="text" className="border-0 shadow-none my-0 rounded-none bg-card text-foreground">
                                {generateMarkdown()}
                            </CodeBlock>
                        </CardContent>
                    </Card>
                </div>
              )}

              {/* --- DECISOR: TASK vs PROJECT --- */}
              <div className="pt-12 mt-12 border-t border-border">
                  <h3 className="text-2xl font-bold text-center mb-8">Decisão Estratégica: O que estamos construindo?</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                      {/* Task Card */}
                      <div 
                        onClick={handleTaskSelection}
                        className="group border-2 border-border hover:border-muted-foreground/50 rounded-2xl p-8 cursor-pointer transition-all hover:bg-card relative overflow-hidden"
                      >
                          <div className="mb-6 w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              <Icon name="check" />
                          </div>
                          <h4 className="text-2xl font-bold mb-2">É uma TAREFA</h4>
                          <p className="text-muted-foreground font-serif mb-6">
                              Uma ação macro com resultado verificável e isolado.
                              <br/><span className="text-xs opacity-70">(Ex: Landing page, Automação simples, Chatbot básico)</span>
                          </p>
                          <Badge variant="outline" className="bg-muted text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                              Fluxo Rápido: ~30 min
                          </Badge>
                      </div>

                      {/* Project Card */}
                      <div 
                        onClick={handleProjectSelection}
                        className="group border-2 border-[var(--studio-teal)] bg-[var(--studio-teal)]/5 rounded-2xl p-8 cursor-pointer transition-all hover:bg-[var(--studio-teal)]/10 relative overflow-hidden shadow-lg shadow-[var(--studio-teal)]/10"
                        style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                      >
                          <div className="absolute top-4 right-4 text-[var(--studio-teal)] animate-pulse" style={{ color: STUDIO_TEAL }}>
                              <Icon name="star" type="solid" />
                          </div>
                          <div className="mb-6 w-16 h-16 rounded-full bg-[var(--studio-teal)] text-white flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" style={{ backgroundColor: STUDIO_TEAL }}>
                              <Icon name="layers" />
                          </div>
                          <h4 className="text-2xl font-bold mb-2 text-foreground">É um PROJETO</h4>
                          <p className="text-muted-foreground font-serif mb-6">
                              Múltiplas ações interconectadas, banco de dados ou sistemas.
                              <br/><span className="text-xs opacity-70">(Ex: CRM, SaaS, App Multi-tela)</span>
                          </p>
                          <Badge className="bg-[var(--studio-teal)] text-white hover:opacity-90" style={{ backgroundColor: STUDIO_TEAL }}>
                              Fluxo Completo: Detalhar PRD →
                          </Badge>
                      </div>
                  </div>
              </div>

          </div>

      </main>

      {/* Task Export Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Confirmar Fluxo de Tarefa</DialogTitle>
                  <DialogDescription>
                      Como isso é uma tarefa única, vamos pular as etapas de PRD, Épicos e Stories e ir direto para a exportação do prompt de execução.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <Icon name="rocket" className="text-primary size-8" />
                      <div>
                          <p className="font-bold text-sm">Próximo Passo: Exportar</p>
                          <p className="text-xs text-muted-foreground">Gerar prompt otimizado para Lovable/Cursor.</p>
                      </div>
                  </div>
              </div>
              <DialogFooter>
                  <Button variant="ghost" onClick={() => setShowTaskDialog(false)}>Voltar</Button>
                  <Button onClick={confirmTaskExport}>Ir para Exportação</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

    </div>
  );
};

export default PrdBriefTemplate;
