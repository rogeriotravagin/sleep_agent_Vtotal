
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { CodeBlock } from '../ui/code-block';
import { FileUpload } from '../ui/file-upload';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Input } from '../ui/input';

interface PrdSpecTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Types ---
interface Requirement {
    id: string;
    text: string;
    status: 'pending' | 'approved' | 'rejected' | 'edited';
    category: 'Must Have' | 'Should Have' | 'Nice to Have';
}

const PrdSpecTemplate: React.FC<PrdSpecTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("design");
  
  // Mock State for Requirements (System 1-2-3)
  const [requirements, setRequirements] = useState<Requirement[]>([
      { id: 'req1', text: "Login social com Google e Apple.", status: 'pending', category: 'Must Have' },
      { id: 'req2', text: "Dashboard inicial com métricas de vendas e gráficos de pizza.", status: 'pending', category: 'Must Have' },
      { id: 'req3', text: "Sistema de gamificação com badges para usuários.", status: 'pending', category: 'Nice to Have' },
      { id: 'req4', text: "Exportação de relatórios em PDF e CSV.", status: 'pending', category: 'Should Have' },
      { id: 'req5', text: "Modo escuro automático baseado no sistema.", status: 'pending', category: 'Should Have' }
  ]);

  const [techStack, setTechStack] = useState({
      frontend: "React + Vite + Tailwind",
      backend: "Supabase (Postgres + Auth)",
      ai: "OpenAI API (GPT-4o)",
      hosting: "Vercel"
  });

  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "done" },
      { id: "prd", label: "PRD", status: "active" },
      { id: "epics", label: "Épicos", status: "pending" },
      { id: "stories", label: "Stories", status: "pending" },
      { id: "export", label: "Export", status: "pending" }
  ];

  const handleRequirementAction = (id: string, action: 'approve' | 'reject') => {
      setRequirements(prev => prev.map(req => 
          req.id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
      ));
      
      const verb = action === 'approve' ? 'Aprovado' : 'Rejeitado';
      toast({ title: `${verb}`, variant: action === 'approve' ? 'success' : 'default' });
  };

  const pendingCount = requirements.filter(r => r.status === 'pending').length;
  const approvedCount = requirements.filter(r => r.status === 'approved').length;

  const handleFinish = () => {
      if (pendingCount > 0) {
          toast({ title: "Atenção", description: "Revise todos os requisitos antes de continuar.", variant: "warning" });
          return;
      }
      toast({ title: "PRD Concluído!", description: "Gerando Épicos e Stories...", variant: "success" });
      setTimeout(() => {
          if(onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_PLAN);
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
                      <span className="hover:text-foreground cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_BRIEF)}>Brief</span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="text-foreground font-medium">Especificação Técnica</span>
                  </div>
                  <Badge variant="outline" className="w-fit border-[var(--studio-teal)]/30 text-[var(--studio-teal)] bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      70% Você · 30% IA
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
      <main className="flex-1 container py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INTERACTIVE WIZARD */}
          <div className="lg:col-span-7 space-y-6">
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 border-b border-border gap-6">
                      <TabsTrigger value="design" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-0 pb-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          1. Design & UX
                      </TabsTrigger>
                      <TabsTrigger value="functional" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-0 pb-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          2. Funcionalidades
                      </TabsTrigger>
                      <TabsTrigger value="tech" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-0 pb-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          3. Tecnologia
                      </TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                      {/* --- TAB 1: DESIGN --- */}
                      <TabsContent value="design" className="space-y-8 animate-fade-in">
                          <div className="space-y-4">
                              <h3 className="text-xl font-bold">Identidade Visual & Fluxo</h3>
                              <p className="text-muted-foreground font-serif">
                                  A IA tende a criar designs genéricos. Use esta seção para definir a personalidade visual do seu produto.
                              </p>
                              
                              <div className="grid gap-6">
                                  <Card>
                                      <CardHeader>
                                          <CardTitle className="text-base">Referências Visuais</CardTitle>
                                          <CardDescription>Faça upload de prints de apps que você gosta.</CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                          <FileUpload className="h-32" />
                                      </CardContent>
                                  </Card>

                                  <div className="space-y-2">
                                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Perguntas Guiadas</h4>
                                      <div className="space-y-4">
                                          <div>
                                              <label className="text-sm font-medium mb-1 block">Quantas telas principais você imagina?</label>
                                              <Input placeholder="Ex: Dashboard, Lista de Clientes, Perfil..." />
                                          </div>
                                          <div>
                                              <label className="text-sm font-medium mb-1 block">Qual a "vibe" do design?</label>
                                              <AutosizeTextarea placeholder="Ex: Minimalista, Clean, Dark Mode, Corporativo, Colorido..." />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="flex justify-end pt-4">
                                  <Button onClick={() => setActiveTab('functional')}>
                                      Próximo: Funcionalidades <Icon name="arrow-right" className="ml-2" />
                                  </Button>
                              </div>
                          </div>
                      </TabsContent>

                      {/* --- TAB 2: FUNCTIONAL (1-2-3 SYSTEM) --- */}
                      <TabsContent value="functional" className="space-y-8 animate-fade-in">
                          <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                  <div>
                                      <h3 className="text-xl font-bold">Validação de Requisitos</h3>
                                      <p className="text-muted-foreground font-serif text-sm">
                                          O sistema "1-2-3": Aprove (✓), Edite (✎) ou Rejeite (✕) cada sugestão da IA.
                                      </p>
                                  </div>
                                  <Badge variant="outline" className="h-fit">
                                      {pendingCount} pendentes
                                  </Badge>
                              </div>

                              <div className="space-y-3">
                                  {requirements.map((req) => (
                                      <Card 
                                        key={req.id} 
                                        className={cn(
                                            "border transition-all duration-300",
                                            req.status === 'pending' ? "border-l-4 border-l-blue-500 shadow-sm" : 
                                            req.status === 'approved' ? "border-l-4 border-l-green-500 opacity-60 bg-muted/20" : 
                                            "border-l-4 border-l-red-500 opacity-40 bg-muted/20"
                                        )}
                                      >
                                          <CardContent className="p-4 flex gap-4 items-start">
                                              <div className="flex-1 space-y-1">
                                                  <div className="flex items-center gap-2 mb-1">
                                                      <Badge variant="secondary" className="text-[10px] h-5">{req.category}</Badge>
                                                      {req.status === 'approved' && <span className="text-xs text-green-600 font-bold flex items-center gap-1"><Icon name="check" size="size-3"/> Aprovado</span>}
                                                      {req.status === 'rejected' && <span className="text-xs text-red-600 font-bold flex items-center gap-1"><Icon name="cross" size="size-3"/> Rejeitado</span>}
                                                  </div>
                                                  <p className="text-sm font-medium leading-snug">{req.text}</p>
                                              </div>
                                              
                                              {req.status === 'pending' && (
                                                  <div className="flex gap-2 shrink-0">
                                                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => handleRequirementAction(req.id, 'approve')} title="Aprovar">
                                                          <Icon name="check" size="size-4" />
                                                      </Button>
                                                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Editar">
                                                          <Icon name="pencil" size="size-4" />
                                                      </Button>
                                                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100" onClick={() => handleRequirementAction(req.id, 'reject')} title="Rejeitar">
                                                          <Icon name="cross" size="size-4" />
                                                      </Button>
                                                  </div>
                                              )}
                                              {req.status !== 'pending' && (
                                                   <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={() => setRequirements(prev => prev.map(r => r.id === req.id ? {...r, status: 'pending'} : r))}>
                                                      <Icon name="undo" size="size-3" />
                                                  </Button>
                                              )}
                                          </CardContent>
                                      </Card>
                                  ))}
                              </div>

                              <div className="flex justify-end pt-4 gap-3">
                                  <Button variant="ghost" onClick={() => setActiveTab('design')}>Voltar</Button>
                                  <Button onClick={() => setActiveTab('tech')} disabled={pendingCount > 0}>
                                      Próximo: Tecnologia <Icon name="arrow-right" className="ml-2" />
                                  </Button>
                              </div>
                          </div>
                      </TabsContent>

                      {/* --- TAB 3: TECH STACK --- */}
                      <TabsContent value="tech" className="space-y-8 animate-fade-in">
                          <div className="space-y-6">
                              <h3 className="text-xl font-bold">Arquitetura Técnica</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card className="border-primary/20 bg-primary/5">
                                      <CardHeader className="pb-2">
                                          <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Sugestão da IA</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                          <div className="space-y-1">
                                              <label className="text-xs text-muted-foreground">Frontend</label>
                                              <Input value={techStack.frontend} onChange={(e) => setTechStack({...techStack, frontend: e.target.value})} className="bg-background" />
                                          </div>
                                          <div className="space-y-1">
                                              <label className="text-xs text-muted-foreground">Backend / BaaS</label>
                                              <Input value={techStack.backend} onChange={(e) => setTechStack({...techStack, backend: e.target.value})} className="bg-background" />
                                          </div>
                                          <div className="space-y-1">
                                              <label className="text-xs text-muted-foreground">AI Model</label>
                                              <Input value={techStack.ai} onChange={(e) => setTechStack({...techStack, ai: e.target.value})} className="bg-background" />
                                          </div>
                                      </CardContent>
                                  </Card>

                                  <Card>
                                      <CardHeader>
                                          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Limites de Escopo</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                          <AutosizeTextarea 
                                              className="min-h-[150px] text-sm"
                                              value="- Não teremos app nativo (apenas PWA)
- Sem suporte a múltiplos idiomas no MVP
- Pagamentos apenas via Stripe inicialmente"
                                          />
                                      </CardContent>
                                  </Card>
                              </div>

                              <div className="flex justify-end pt-8 gap-3 border-t border-border">
                                  <Button variant="ghost" onClick={() => setActiveTab('functional')}>Voltar</Button>
                                  <Button 
                                    size="lg" 
                                    className="px-8 font-bold text-white shadow-lg hover:opacity-90"
                                    style={{ backgroundColor: STUDIO_TEAL }}
                                    onClick={handleFinish}
                                  >
                                      Gerar Plano de Execução <Icon name="check-circle" className="ml-2" />
                                  </Button>
                              </div>
                          </div>
                      </TabsContent>
                  </div>
              </Tabs>

          </div>

          {/* RIGHT: LIVE PREVIEW (Sticky) */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 h-fit">
              <div className="bg-muted/30 border border-border rounded-xl overflow-hidden shadow-sm flex flex-col max-h-[80vh]">
                  <div className="p-3 bg-muted/50 border-b border-border flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Icon name="file-code" size="size-3" /> Live Preview (PRD.md)
                      </span>
                      <Badge variant="outline" className="text-[10px] bg-background">Auto-Save</Badge>
                  </div>
                  <ScrollArea className="flex-1 bg-card p-6">
                      <article className="prose dark:prose-invert prose-sm max-w-none font-mono text-xs leading-relaxed">
                          <h1># Especificação Técnica: CRM Dentistas</h1>
                          <p><strong>Status:</strong> Draft | <strong>Autor:</strong> Alan Nicolas</p>
                          <hr className="my-4 border-border" />
                          
                          <h3>1. Visão Geral</h3>
                          <p>Um sistema focado na gestão simples de pacientes...</p>

                          <h3>2. Requisitos Funcionais</h3>
                          <ul>
                              {requirements.filter(r => r.status === 'approved').map(r => (
                                  <li key={r.id}>[x] {r.text} <span className="text-muted-foreground">({r.category})</span></li>
                              ))}
                              {requirements.filter(r => r.status === 'pending').map(r => (
                                  <li key={r.id} className="opacity-50">[ ] {r.text}</li>
                              ))}
                          </ul>

                          <h3>3. Stack Tecnológico</h3>
                          <ul>
                              <li><strong>Front:</strong> {techStack.frontend}</li>
                              <li><strong>Back:</strong> {techStack.backend}</li>
                              <li><strong>AI:</strong> {techStack.ai}</li>
                          </ul>

                          <h3>4. Métricas de Sucesso</h3>
                          <p>...</p>
                      </article>
                  </ScrollArea>
                  <div className="p-3 border-t border-border bg-muted/10 text-center">
                      <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground h-8">
                          <Icon name="download" size="size-3" className="mr-2" /> Baixar Markdown
                      </Button>
                  </div>
              </div>
          </aside>

      </main>

    </div>
  );
};

export default PrdSpecTemplate;
