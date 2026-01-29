
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';

interface PrdAnalysisTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Types ---
interface BlindSpot {
    id: string;
    category: 'tech' | 'market' | 'ux' | 'risk';
    title: string;
    description: string;
}

const PrdAnalysisTemplate: React.FC<PrdAnalysisTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [selectedBlindSpots, setSelectedBlindSpots] = useState<string[]>(['bs1', 'bs2', 'bs4']);

  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "active" }, // Sub-phase Analysis is part of Brief
      { id: "prd", label: "PRD", status: "pending" },
      { id: "epics", label: "Épicos", status: "pending" },
      { id: "stories", label: "Stories", status: "pending" },
      { id: "export", label: "Export", status: "pending" }
  ];

  const blindSpots: BlindSpot[] = [
      { id: 'bs1', category: 'tech', title: 'Integração com sistemas existentes', description: 'Como o CRM vai se conectar com softwares que a clínica já usa (ex: sistemas de imagem)?' },
      { id: 'bs2', category: 'risk', title: 'LGPD e dados sensíveis de saúde', description: 'Prontuários médicos exigem compliance específico e segurança reforçada.' },
      { id: 'bs3', category: 'market', title: 'Concorrência no mercado', description: 'Existem 5 CRMs líderes para dentistas. Qual seu diferencial competitivo?' },
      { id: 'bs4', category: 'ux', title: 'Experiência mobile', description: 'Dentistas usarão no celular entre atendimentos? A interface precisa ser touch-first.' },
  ];

  const toggleBlindSpot = (id: string) => {
      setSelectedBlindSpots(prev => 
          prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
  };

  const handleResearch = () => {
      toast({
          title: "Iniciando Pesquisa Profunda",
          description: `A IA está analisando os ${selectedBlindSpots.length} pontos selecionados.`,
          variant: "success"
      });
      // Navigate to next step (Brief Builder) simulated
      setTimeout(() => {
          if (onNavigate) onNavigate(Section.TEMPLATE_APP_PRD_STUDIO); // Fallback to Dashboard for demo
      }, 2000);
  };

  const getCategoryIcon = (cat: string) => {
      switch(cat) {
          case 'tech': return 'settings';
          case 'market': return 'chart-histogram';
          case 'ux': return 'palette';
          case 'risk': return 'exclamation-triangle';
          default: return 'circle';
      }
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
                      <span className="text-foreground font-medium">Análise Inicial</span>
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

      {/* Main Content */}
      <main className="flex-1 container py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT COLUMN (Main Analysis) - 3/5 width */}
          <div className="lg:col-span-3 space-y-8">
              
              {/* Classification Card */}
              <Card className="border-l-4 border-l-[var(--studio-teal)] bg-card shadow-md overflow-hidden relative" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                      <Icon name="folder-tree" className="text-[8rem] text-[var(--studio-teal)]" />
                  </div>
                  <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                          <div className="p-3 rounded-lg bg-[var(--studio-teal)]/10 text-[var(--studio-teal)]" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                              <Icon name="folder-tree" size="size-6" />
                          </div>
                          <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Classificação da IA</p>
                              <h2 className="text-2xl font-bold">Projeto Completo</h2>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p className="text-muted-foreground font-serif leading-relaxed">
                          Identificamos múltiplas funcionalidades interconectadas que exigem planejamento detalhado: gestão de pacientes, agendamentos, financeiro e relatórios. Isso excede o escopo de uma tarefa simples.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded w-fit">
                          <Icon name="arrow-right" size="size-3" /> Fluxo Sugerido: Brief → PRD → Épicos → Stories → Export
                      </div>
                      <div className="pt-2">
                          <Button variant="link" className="px-0 h-auto text-xs text-muted-foreground hover:text-foreground">
                              Discorda? Alterar classificação
                          </Button>
                      </div>
                  </CardContent>
              </Card>

              {/* Input Summary */}
              <Card>
                  <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-base">O que entendemos</CardTitle>
                          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                              <Icon name="pencil" size="size-3" /> Editar
                          </Button>
                      </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                      <ul className="space-y-2">
                          {[
                              "Sistema para clínicas odontológicas",
                              "Gestão de pacientes e prontuários",
                              "Agendamento de consultas",
                              "Controle financeiro básico"
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                  <Icon name="check" size="size-4" className="text-[var(--studio-teal)] mt-0.5 shrink-0" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>

              {/* Blind Spots (Core) */}
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <div>
                          <h3 className="text-lg font-bold">Pontos Cegos Identificados</h3>
                          <p className="text-xs text-muted-foreground">Aspectos importantes não mencionados no input original.</p>
                      </div>
                      <Badge variant="outline" className="bg-[var(--studio-teal)]/10 text-[var(--studio-teal)] border-[var(--studio-teal)]/20" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                          {selectedBlindSpots.length} de {blindSpots.length} selecionados
                      </Badge>
                  </div>

                  <div className="grid gap-3">
                      {blindSpots.map((bs) => (
                          <div 
                            key={bs.id} 
                            className={cn(
                                "border rounded-xl bg-card transition-all duration-200 group",
                                selectedBlindSpots.includes(bs.id) ? "border-[var(--studio-teal)] shadow-[0_0_10px_-5px_var(--studio-teal)]" : "border-border hover:border-border/80"
                            )}
                            style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                          >
                              <div className="flex items-start p-4 gap-4">
                                  <div className="pt-1">
                                      <Checkbox 
                                        checked={selectedBlindSpots.includes(bs.id)} 
                                        onCheckedChange={() => toggleBlindSpot(bs.id)}
                                      />
                                  </div>
                                  <div className="flex-1 space-y-1 cursor-pointer" onClick={() => toggleBlindSpot(bs.id)}>
                                      <div className="flex items-center gap-2 mb-1">
                                          <Icon name={getCategoryIcon(bs.category)} size="size-3" className="text-muted-foreground" />
                                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{bs.category}</span>
                                      </div>
                                      <h4 className="font-bold text-sm text-foreground group-hover:text-[var(--studio-teal)] transition-colors" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                          {bs.title}
                                      </h4>
                                      <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                                          {bs.description}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

          </div>

          {/* RIGHT COLUMN (Support) - 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Reflective Questions */}
              <Card className="bg-muted/10 border-dashed border-border">
                  <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                          <Icon name="bulb" className="text-yellow-500" /> Perguntas para Refletir
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <ul className="space-y-3">
                          {[
                              "Qual o tamanho da clínica ideal? 1 dentista ou rede?",
                              "O paciente terá acesso a algum portal?",
                              "Precisa de integração com convênios?",
                              "Relatórios para contador são necessários?"
                          ].map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground font-serif italic border-l-2 border-border pl-3">
                                  "{q}"
                              </li>
                          ))}
                      </ul>
                      <p className="text-xs text-muted-foreground pt-2">
                          *Não precisa responder agora. Essas questões guiarão a próxima etapa.
                      </p>
                  </CardContent>
              </Card>

              {/* Files */}
              <Card>
                  <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Referências Processadas</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded border border-border/50">
                          <div className="flex items-center gap-2">
                              <Icon name="file-pdf" className="text-red-500" size="size-4" />
                              <span className="truncate max-w-[150px]">briefing_inicial.pdf</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-0 flex items-center gap-1">
                              <Icon name="check" size="size-3" /> Analisado
                          </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded border border-border/50">
                          <div className="flex items-center gap-2">
                              <Icon name="file-audio" className="text-blue-500" size="size-4" />
                              <span className="truncate max-w-[150px]">audio_whatsapp.mp3</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-0 flex items-center gap-1">
                              <Icon name="check" size="size-3" /> Transcrito
                          </Badge>
                      </div>
                  </CardContent>
              </Card>

              {/* Education */}
              <Card className="bg-blue-500/5 border-blue-500/20">
                  <CardContent className="p-6 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                          <Icon name="book-alt" size="size-5" />
                      </div>
                      <div>
                          <h4 className="font-bold text-sm text-blue-500 mb-1">Por que isso importa?</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                              95% dos projetos de IA falham por input incompleto. Explorar pontos cegos agora evita alucinações e retrabalho na fase de desenvolvimento.
                          </p>
                      </div>
                  </CardContent>
              </Card>

          </div>

      </main>

      {/* Sticky Footer */}
      <footer className="border-t border-border bg-card p-4 md:p-6 sticky bottom-0 z-40 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          <div className="container max-w-7xl mx-auto flex justify-between items-center">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_UPLOAD)}>
                  <Icon name="arrow-left" size="size-4" /> Voltar ao Upload
              </Button>
              <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground hidden sm:inline-block">
                      A IA vai gerar pesquisas sobre os {selectedBlindSpots.length} pontos selecionados
                  </span>
                  <Button 
                    size="lg" 
                    className="shadow-lg hover:opacity-90 transition-opacity font-bold text-white gap-2"
                    style={{ backgroundColor: STUDIO_TEAL }}
                    onClick={handleResearch}
                  >
                      Pesquisar Pontos Selecionados <Icon name="arrow-right" size="size-4" />
                  </Button>
              </div>
          </div>
      </footer>

    </div>
  );
};

export default PrdAnalysisTemplate;
