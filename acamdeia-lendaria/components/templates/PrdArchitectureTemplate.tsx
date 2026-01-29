
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { CodeBlock } from '../ui/code-block';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Section } from '../../types';
import { cn } from '../../lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { useToast } from '../../hooks/use-toast';
import JSZip from 'jszip';

interface PrdArchitectureTemplateProps {
    onNavigate: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

const PrdArchitectureTemplate: React.FC<PrdArchitectureTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [isZipping, setIsZipping] = useState(false);

  // --- CLIENT SIDE ZIP GENERATION ---
  const handleDownloadSource = async () => {
      setIsZipping(true);
      toast({
          title: "Gerando pacote...",
          description: "Preparando arquivos...",
      });

      try {
          const zip = new JSZip();
          
          // NOTE: import.meta.glob is not supported in all client environments at runtime.
          // Removed dynamic source bundling to prevent runtime errors.
          
          // 3. Adicionar README
          zip.file("README_PRD.md", `# PRD Studio Module (Starter Kit)

Este pacote contém a estrutura básica de documentação.

## Nota
A funcionalidade de download do código fonte completo requer um ambiente de build compatível com Vite (import.meta.glob).
Para acessar o código completo, clone o repositório.
`);

          // 4. Gerar o Blob e Download
          const content = await zip.generateAsync({ type: "blob" });
          
          // Criar link de download temporário
          const url = window.URL.createObjectURL(content);
          const link = document.createElement('a');
          link.href = url;
          link.download = "prd-studio-starter.zip";
          document.body.appendChild(link);
          link.click();
          
          // Limpeza
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          toast({
              title: "Download Concluído",
              description: "Arquivo salvo com sucesso.",
              variant: "success",
          });

      } catch (error) {
          console.error("Erro ao gerar zip:", error);
          toast({
              title: "Erro no Download",
              description: "Falha ao gerar arquivo ZIP.",
              variant: "destructive",
          });
      } finally {
          setIsZipping(false);
      }
  };
  
  const screens = [
      { id: 'dashboard', name: 'Dashboard', route: Section.TEMPLATE_APP_PRD_STUDIO, desc: 'Visão geral do portfólio de projetos e status do pipeline.', icon: 'layout-fluid' },
      { id: 'upload', name: 'Upload & Chat', route: Section.TEMPLATE_APP_PRD_UPLOAD, desc: 'Entrada de dados inicial e refinamento via chat.', icon: 'cloud-upload' },
      { id: 'analysis', name: 'Análise Inicial', route: Section.TEMPLATE_APP_PRD_ANALYSIS, desc: 'A IA identifica pontos cegos na ideia.', icon: 'search' },
      { id: 'research', name: 'Pesquisas', route: Section.TEMPLATE_APP_PRD_RESEARCH, desc: 'Execução de pesquisas profundas para resolver pontos cegos.', icon: 'globe' },
      { id: 'brief', name: 'Brief Builder', route: Section.TEMPLATE_APP_PRD_BRIEF, desc: 'Consolidação da ideia em documento estruturado.', icon: 'file-text' },
      { id: 'spec', name: 'Especificação (PRD)', route: Section.TEMPLATE_APP_PRD_SPEC, desc: 'Validação de requisitos funcionais e técnicos.', icon: 'list-check' },
      { id: 'plan', name: 'Plano (Épicos)', route: Section.TEMPLATE_APP_PRD_PLAN, desc: 'Quebra do PRD em Épicos e Histórias.', icon: 'layers' },
      { id: 'export', name: 'Exportação', route: Section.TEMPLATE_APP_PRD_EXPORT, desc: 'Entrega do prompt final para codificação.', icon: 'rocket' },
  ];

  const dataModel = `
// Estrutura Principal de Dados

type Project = {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'completed';
  pipelineStep: 'upload' | 'brief' | 'prd' | 'plan' | 'export';
  files: File[];
  brief: {
    problem: string;
    solution: string;
    scopeIn: string;
    scopeOut: string;
  };
  requirements: Requirement[];
  epics: Epic[];
}

type Requirement = {
  id: string;
  text: string;
  category: 'Must Have' | 'Should Have' | 'Nice to Have';
  status: 'pending' | 'approved' | 'rejected';
}

type Epic = {
  id: string;
  title: string;
  stories: Story[];
}

type Story = {
  id: string;
  title: string;
  description: string;
  criteria: string[]; // Acceptance Criteria
  techNotes: string;
  points: number;
}
`;

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground relative pb-20">
      
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border mb-8">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
              <Icon name="file-code" className="text-[12rem] text-[var(--studio-teal)] rotate-12" />
          </div>
          <div className="relative z-10 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-[var(--studio-teal)]/50 text-[var(--studio-teal)] bg-[var(--studio-teal)]/5" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                      AI Architect Module
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">v2.0</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
                PRD <span style={{ color: STUDIO_TEAL }}>Studio</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  O sistema operacional para transformar ideias vagas em especificações técnicas robustas prontas para desenvolvimento.
              </p>
              
              <div className="pt-4">
                  <Button 
                    onClick={handleDownloadSource} 
                    className="gap-2 bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 disabled:opacity-50"
                    disabled={isZipping}
                  >
                      {isZipping ? <Icon name="spinner" className="animate-spin" /> : <Icon name="download" />}
                      {isZipping ? "Gerando ZIP..." : "Baixar Starter Kit (ZIP)"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                      Gera um pacote com a estrutura de documentação.
                  </p>
              </div>
          </div>
      </div>

      <Tabs defaultValue="screens" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
              <TabsTrigger value="screens" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-6 py-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                  <Icon name="grid" className="mr-2 size-4" /> Mapa de Telas
              </TabsTrigger>
              <TabsTrigger value="flow" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-6 py-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                  <Icon name="network-cloud" className="mr-2 size-4" /> Fluxo Lógico
              </TabsTrigger>
              <TabsTrigger value="data" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)] px-6 py-3" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                  <Icon name="database" className="mr-2 size-4" /> Modelo de Dados
              </TabsTrigger>
          </TabsList>

          {/* --- TAB: SCREENS --- */}
          <TabsContent value="screens" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {screens.map((screen) => (
                      <Card 
                        key={screen.id} 
                        className="group hover:border-[var(--studio-teal)]/50 transition-all cursor-pointer relative overflow-hidden"
                        style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                        onClick={() => onNavigate(screen.route)}
                      >
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <Icon name={screen.icon} size="size-8" />
                          </div>
                          <CardHeader>
                              <CardTitle className="text-lg group-hover:text-[var(--studio-teal)] transition-colors" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                  {screen.name}
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                                  {screen.desc}
                              </p>
                              <div className="mt-4 flex items-center text-xs font-bold text-[var(--studio-teal)] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: STUDIO_TEAL }}>
                                  Ver Template <Icon name="arrow-right" className="ml-1 size-3" />
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </TabsContent>

          {/* --- TAB: FLOW --- */}
          <TabsContent value="flow" className="animate-fade-in">
              <Card className="bg-card border-border p-8 overflow-x-auto">
                  <div className="min-w-[800px] flex items-center justify-between relative">
                      {/* Background Line */}
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-0"></div>
                      
                      {[
                          { label: "Ideação", desc: "Upload & Chat" },
                          { label: "Refinamento", desc: "Análise & Pesquisa" },
                          { label: "Estruturação", desc: "Brief Builder" },
                          { label: "Especificação", desc: "PRD & Tech Stack" },
                          { label: "Planejamento", desc: "Épicos & Stories" },
                          { label: "Entrega", desc: "Export Prompt" },
                      ].map((step, i) => (
                          <div key={i} className="relative z-10 flex flex-col items-center gap-4 text-center group">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-card font-bold text-sm shadow-sm group-hover:border-[var(--studio-teal)] group-hover:text-[var(--studio-teal)] transition-colors"
                                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                              >
                                  {i + 1}
                              </div>
                              <div>
                                  <h4 className="text-sm font-bold uppercase tracking-wider">{step.label}</h4>
                                  <p className="text-xs text-muted-foreground font-serif">{step.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  <div className="mt-12 p-6 bg-muted/10 rounded-xl border border-dashed border-border">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                          <Icon name="info" size="size-4" /> Lógica de Negócio
                      </h4>
                      <ul className="space-y-2 text-sm text-foreground/80 font-serif list-disc pl-4">
                          <li>O usuário pode iniciar um projeto como <strong>Tarefa</strong> (atalho direto para Export) ou <strong>Projeto Completo</strong>.</li>
                          <li>A fase de <strong>Pesquisa</strong> gera prompts para IAs externas (Claude/Gemini) para aprofundar pontos cegos.</li>
                          <li>A <strong>Validação de Requisitos</strong> usa o sistema "1-2-3" (Aprovar, Editar, Rejeitar) para garantir controle humano.</li>
                          <li>A exportação final gera um <strong>Meta-Prompt</strong> otimizado para agentes de codificação (Lovable/Cursor).</li>
                      </ul>
                  </div>
              </Card>
          </TabsContent>

          {/* --- TAB: DATA MODEL --- */}
          <TabsContent value="data" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                      <h3 className="text-xl font-bold">Entidades Principais</h3>
                      <p className="text-muted-foreground font-serif">
                          O sistema opera sobre um objeto <code>Project</code> mestre que evolui conforme avança no pipeline.
                      </p>
                      <CodeBlock language="tsx" title="types/prd.ts">
                          {dataModel}
                      </CodeBlock>
                  </div>
                  
                  <div className="space-y-6">
                       <Card>
                           <CardHeader>
                               <CardTitle className="text-base">Componentes Chave</CardTitle>
                               <CardDescription>Blocos de UI reutilizáveis neste módulo.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-4">
                               <div className="flex items-center gap-3 p-3 border border-border rounded-lg" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                   <Icon name="list-check" size="size-5" className="text-[var(--studio-teal)]" />
                                   <div>
                                       <p className="font-bold text-sm">System 1-2-3 Card</p>
                                       <p className="text-xs text-muted-foreground">Card de requisito com ações rápidas de validação.</p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-3 p-3 border border-border rounded-lg" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                   <Icon name="message-square" size="size-5" className="text-[var(--studio-teal)]" />
                                   <div>
                                       <p className="font-bold text-sm">Autosize Chat Input</p>
                                       <p className="text-xs text-muted-foreground">Entrada de texto expansiva para prompts longos.</p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-3 p-3 border border-border rounded-lg" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                   <Icon name="layers" size="size-5" className="text-[var(--studio-teal)]" />
                                   <div>
                                       <p className="font-bold text-sm">Accordion Pipeline</p>
                                       <p className="text-xs text-muted-foreground">Visualização hierárquica de Épicos e Stories.</p>
                                   </div>
                               </div>
                           </CardContent>
                       </Card>

                       <Card className="bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]/20" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                           <CardHeader>
                               <CardTitle className="text-base text-[var(--studio-teal)]" style={{ color: STUDIO_TEAL }}>Diretrizes de UX</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <ul className="space-y-2 text-sm text-foreground/80 font-serif list-disc pl-4">
                                   <li><strong>Densidade:</strong> Alta. O usuário é técnico (PM/Founder).</li>
                                   <li><strong>Cor:</strong> Teal (#00C7BE) para ações primárias e highlights.</li>
                                   <li><strong>Feedback:</strong> Toasts para todas as ações de geração de IA.</li>
                               </ul>
                           </CardContent>
                       </Card>
                  </div>
              </div>
          </TabsContent>

      </Tabs>

    </div>
  );
};

export default PrdArchitectureTemplate;
