
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import { CodeBlock } from '../ui/code-block';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { useClipboard } from '../../hooks/use-clipboard';

interface PrdResearchTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

// --- Types ---
interface ResearchItem {
    id: string;
    blindSpotTitle: string;
    category: 'tech' | 'market' | 'ux' | 'risk';
    tool: 'gemini' | 'claude' | 'chatgpt' | 'grok';
    toolReason: string;
    prompt: string;
}

const PrdResearchTemplate: React.FC<PrdResearchTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  
  // Mock Data from previous step
  const researchItems: ResearchItem[] = [
      {
          id: 'res1',
          blindSpotTitle: "Integração com sistemas existentes",
          category: 'tech',
          tool: 'gemini',
          toolReason: "Melhor para: Análise técnica de integrações e APIs, com acesso ao Google Search.",
          prompt: `TÓPICO: "Estratégias de Integração de CRM Odontológico com Sistemas Legados de Clínicas (2024-2025)"

CONTEXTO: Estou desenvolvendo um CRM para clínicas odontológicas e preciso entender como integrar com softwares existentes (gestão financeira, prontuário eletrônico, agendamento) sem fricção para o usuário.

ESCOPO:
1. PADRÕES DE MERCADO: APIs e protocolos comuns em softwares odontológicos no Brasil
2. CASOS DE SUCESSO: CRMs que resolveram integração bem
3. DESAFIOS TÉCNICOS: Principais barreiras e soluções
4. ESTRATÉGIA MVP: Integrações essenciais vs. nice-to-have

REQUISITOS:
- Foco no mercado brasileiro
- Soluções para pequenas/médias clínicas
- Abordagens low-code quando possível

RESULTADOS ESPERADOS:
- Lista de softwares mais usados em clínicas BR
- Mapa de integrações prioritárias
- Estimativa de complexidade técnica`
      },
      {
          id: 'res2',
          blindSpotTitle: "LGPD e dados sensíveis de saúde",
          category: 'risk',
          tool: 'claude',
          toolReason: "Melhor para: Análise jurídica, compliance detalhado e documentação complexa.",
          prompt: `TÓPICO: "Requisitos de LGPD para SaaS de Saúde (Prontuários Odontológicos)"

CONTEXTO: Construindo um SaaS que armazena dados de pacientes (anamnese, raio-x, dados financeiros). Preciso blindar a aplicação juridicamente.

ESCOPO:
1. CHECKLIST DE DADOS SENSÍVEIS: O que é considerado dado sensível neste nicho.
2. ARQUITETURA DE DADOS: Padrões de criptografia exigidos (em repouso e trânsito).
3. CONSENTIMENTO: Modelos de UX para coleta de consentimento do paciente.
4. RESPONSABILIDADE: Onde termina a responsabilidade da clínica e começa a do SaaS.

REQUISITOS:
- Baseado na LGPD (Lei Geral de Proteção de Dados - Brasil)
- Exemplos de termos de uso de concorrentes (Clínica nas Nuvens, Simples Dental)

RESULTADOS ESPERADOS:
- Checklist de conformidade técnica
- Requisitos para MVP`
      },
      {
          id: 'res3',
          blindSpotTitle: "Experiência mobile para dentistas",
          category: 'ux',
          tool: 'chatgpt',
          toolReason: "Melhor para: UX research, comportamento de usuário e ideação de interfaces.",
          prompt: `TÓPICO: "Mobile UX para Dentistas: Uso durante o atendimento"

CONTEXTO: Dentistas usam luvas e têm pouco tempo entre pacientes. O app mobile precisa ser operável em condições específicas.

ESCOPO:
1. CONTEXTO DE USO: Como/quando o dentista usa o celular no consultório?
2. INTERFACE TOUCH-FREE: Viabilidade de comandos de voz ou gestos.
3. INFORMAÇÃO CRÍTICA: O que precisa estar na "primeira tela" (agenda, ficha rápida).
4. ERGONOMIA DIGITAL: Botões grandes, alto contraste.

RESULTADOS ESPERADOS:
- 5 Princípios de Design para Apps Médicos
- Benchmark de apps de saúde com melhor avaliação na App Store
- Ideias de funcionalidades "Quick Action"`
      }
  ];

  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "active" },
      { id: "prd", label: "PRD", status: "pending" },
      { id: "epics", label: "Épicos", status: "pending" },
      { id: "stories", label: "Stories", status: "pending" },
      { id: "export", label: "Export", status: "pending" }
  ];

  const toggleCompleted = (id: string) => {
      setCompletedIds(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
  };

  const handleCopyPrompt = (text: string) => {
      copyToClipboard(text);
      toast({
          title: "Prompt Copiado!",
          description: "Cole na ferramenta recomendada para iniciar a pesquisa.",
          variant: "success"
      });
  };

  const getToolConfig = (tool: string) => {
      switch(tool) {
          case 'gemini': return { 
              name: 'Gemini Deep Research', 
              color: 'text-emerald-500', 
              bg: 'bg-emerald-500/10', 
              border: 'border-emerald-500/20',
              icon: 'google'
          };
          case 'claude': return { 
              name: 'Claude', 
              color: 'text-purple-500', 
              bg: 'bg-purple-500/10', 
              border: 'border-purple-500/20',
              icon: 'brain' // No claude icon yet
          };
          case 'chatgpt': return { 
              name: 'ChatGPT Deep Research', 
              color: 'text-blue-500', 
              bg: 'bg-blue-500/10', 
              border: 'border-blue-500/20',
              icon: 'microchip' 
          };
          case 'grok': return { 
              name: 'Grok', 
              color: 'text-orange-500', 
              bg: 'bg-orange-500/10', 
              border: 'border-orange-500/20',
              icon: 'twitter'
          };
          default: return { name: 'AI', color: 'text-foreground', bg: 'bg-muted', border: 'border-border', icon: 'sparkles' };
      }
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
                      <span className="text-foreground font-medium">Pesquisas</span>
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
      <main className="flex-1 container py-8 max-w-5xl mx-auto space-y-8">
          
          {/* Title & Banner */}
          <div className="space-y-6">
              <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Pesquisas Recomendadas</h1>
                  <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                      Geramos prompts otimizados para cada ponto cego. Execute nas ferramentas sugeridas e volte com seus insights.
                  </p>
              </div>

              <Alert variant="warning" className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30">
                  <Icon name="exclamation-triangle" className="h-4 w-4" />
                  <AlertTitle className="ml-2 font-bold">IMPORTANTE</AlertTitle>
                  <AlertDescription className="ml-2">
                      Leia os resultados completos das pesquisas. Não peça resumos curtos. Insights valiosos que só VOCÊ reconheceria se perdem em resumos automáticos.
                  </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-sm">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Progresso</span>
                  <div className="flex-1 mx-4 max-w-md">
                      <div className="flex justify-between text-xs mb-1">
                          <span>{completedIds.length} de {researchItems.length} pesquisas concluídas</span>
                          <span>{Math.round((completedIds.length / researchItems.length) * 100)}%</span>
                      </div>
                      <Progress value={(completedIds.length / researchItems.length) * 100} className="h-2" style={{ '--primary': STUDIO_TEAL } as React.CSSProperties} />
                  </div>
              </div>
          </div>

          {/* Research List */}
          <div className="space-y-6">
              <Accordion type="multiple" defaultValue={['res1']} className="space-y-6">
                  {researchItems.map((item) => {
                      const toolConfig = getToolConfig(item.tool);
                      const isCompleted = completedIds.includes(item.id);

                      return (
                          <AccordionItem 
                            key={item.id} 
                            value={item.id} 
                            className={cn(
                                "border rounded-xl bg-card overflow-hidden transition-all duration-300",
                                isCompleted ? "border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.05)]" : "border-border shadow-sm hover:border-border/80"
                            )}
                          >
                              <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                                  <div className="flex items-center gap-4 flex-1 text-left">
                                      <div className={cn(
                                          "w-10 h-10 rounded-lg flex items-center justify-center border",
                                          isCompleted ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted border-border text-muted-foreground"
                                      )}>
                                          <Icon name={getCategoryIcon(item.category)} size="size-5" />
                                      </div>
                                      <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{item.category}</Badge>
                                              {isCompleted && <Badge variant="success" className="text-[10px] h-5 px-1.5">Concluída</Badge>}
                                          </div>
                                          <h4 className={cn("font-bold text-lg", isCompleted ? "text-muted-foreground line-through decoration-border" : "text-foreground")}>
                                              {item.blindSpotTitle}
                                          </h4>
                                      </div>
                                  </div>
                              </AccordionTrigger>
                              
                              <AccordionContent className="border-t border-border p-6 bg-muted/5">
                                  <div className="space-y-6">
                                      
                                      {/* Tool Recommendation */}
                                      <div className={cn("p-4 rounded-lg border flex flex-col sm:flex-row gap-4 items-start sm:items-center", toolConfig.bg, toolConfig.border)}>
                                          <div className={cn("flex items-center gap-2 font-bold whitespace-nowrap", toolConfig.color)}>
                                              <Icon name={toolConfig.icon} />
                                              {toolConfig.name}
                                          </div>
                                          <div className="h-4 w-px bg-border hidden sm:block"></div>
                                          <p className="text-sm text-foreground/80">{item.toolReason}</p>
                                      </div>

                                      {/* Prompt Block */}
                                      <div className="relative group">
                                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Button size="sm" variant="secondary" onClick={() => handleCopyPrompt(item.prompt)} className="shadow-md gap-2">
                                                  <Icon name="copy" size="size-3" /> Copiar Prompt
                                              </Button>
                                          </div>
                                          <CodeBlock language="text" className="text-xs md:text-sm font-mono leading-relaxed my-0 shadow-inner max-h-[400px] overflow-y-auto">
                                              {item.prompt}
                                          </CodeBlock>
                                      </div>

                                      {/* Action Footer */}
                                      <div className="flex items-center justify-between pt-2">
                                          <p className="text-xs text-muted-foreground font-serif hidden sm:block">
                                              Alternativas: Claude (Profundidade), Grok (Dados Recentes)
                                          </p>
                                          <div className="flex items-center gap-3">
                                              <label htmlFor={`check-${item.id}`} className="text-sm font-medium cursor-pointer select-none">
                                                  Marcar como concluída
                                              </label>
                                              <Checkbox 
                                                  id={`check-${item.id}`} 
                                                  checked={isCompleted} 
                                                  onCheckedChange={() => toggleCompleted(item.id)}
                                                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                              />
                                          </div>
                                      </div>

                                  </div>
                              </AccordionContent>
                          </AccordionItem>
                      );
                  })}
              </Accordion>
          </div>
          
          {/* Tool Legend (Optional/Footer) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              {[
                  { name: "Gemini", color: "bg-emerald-500", desc: "Técnico & APIs" },
                  { name: "Claude", color: "bg-purple-500", desc: "Jurídico & Texto" },
                  { name: "ChatGPT", color: "bg-blue-500", desc: "UX & Ideação" },
                  { name: "Grok", color: "bg-orange-500", desc: "Tempo Real" },
              ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={cn("w-2 h-2 rounded-full", t.color)}></div>
                      <span className="font-bold text-foreground">{t.name}:</span> {t.desc}
                  </div>
              ))}
          </div>

      </main>

      {/* Sticky Footer */}
      <footer className="border-t border-border bg-card p-4 md:p-6 sticky bottom-0 z-40 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          <div className="container max-w-5xl mx-auto flex justify-between items-center">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_ANALYSIS)}>
                  <Icon name="arrow-left" size="size-4" /> Voltar
              </Button>
              <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground hidden sm:inline-block">
                      Após executar as pesquisas, estruture seu brief
                  </span>
                  <Button 
                    size="lg" 
                    className={cn(
                        "shadow-lg transition-all font-bold text-white gap-2",
                        completedIds.length > 0 ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: STUDIO_TEAL }}
                    disabled={completedIds.length === 0}
                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_BRIEF)} // Navigate to New Brief Builder
                  >
                      Estruturar Brief <Icon name="arrow-right" size="size-4" />
                  </Button>
              </div>
          </div>
      </footer>

    </div>
  );
};

export default PrdResearchTemplate;
