
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { CodeBlock } from '../ui/code-block';
import { useClipboard } from '../../hooks/use-clipboard';

interface PrdExportTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

const PrdExportTemplate: React.FC<PrdExportTemplateProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  const [selectedFormat, setSelectedFormat] = useState<'lovable' | 'cursor' | 'claude' | 'generic'>('lovable');

  const steps = [
      { id: "upload", label: "Upload", status: "done" },
      { id: "brief", label: "Brief", status: "done" },
      { id: "prd", label: "PRD", status: "done" },
      { id: "epics", label: "Épicos", status: "done" },
      { id: "stories", label: "Stories", status: "done" },
      { id: "export", label: "Export", status: "active" }
  ];

  const formats = {
      lovable: {
          title: "Lovable / GPT Engineer",
          icon: "magic-wand",
          desc: "Otimizado para Knowledge Base + Prompt Inicial.",
          content: `[KNOWLEDGE BASE]
# Project Context
Building a CRM for Dental Clinics focusing on patient management and scheduling.

# Tech Stack
- Frontend: React + Vite + Tailwind
- Backend: Supabase
- Auth: Supabase Auth

[INITIAL PROMPT]
I want to build the "CRM Dentistas" project.
Use the context provided in the knowledge base.

Start by implementing Epic 1: FUNDAÇÃO E AUTENTICAÇÃO.
First task: Configurar ambiente Next.js + Supabase.

Please allow me to review the structure before generating code.`
      },
      cursor: {
          title: "Cursor (.cursorrules)",
          icon: "terminal",
          desc: "Regras de projeto e contexto para o editor.",
          content: `# Cursor Rules

## Project Context
CRM for Dental Clinics. 

## Style Guide
- Use 'Inter' font.
- Primary color is Teal (#00C7BE).
- Use shadcn/ui components.

## Architecture
- Use Supabase for backend.
- RLS enabled on all tables.

## Workflow
- Always start responses by stating which Epic/Story you are working on.
- Ask for confirmation before deleting files.`
      },
      claude: {
          title: "Claude Code (CLI)",
          icon: "brain-circuit",
          desc: "Markdown estruturado para injetar contexto.",
          content: `# CLAUDE.md

## Commands
- Run dev: \`npm run dev\`
- Build: \`npm run build\`
- Test: \`npm test\`

## Project Structure
- /components: UI components
- /lib: Utilities
- /app: Next.js pages

## Current Focus
Epic 1: Foundation.
Story 1.1: Environment Setup.`
      },
      generic: {
          title: "Documentação Padrão",
          icon: "file-text",
          desc: "PRD completo em Markdown para qualquer uso.",
          content: `# PRD: CRM Dentistas

## 1. Visão Geral
...

## 2. Requisitos Funcionais
...

## 3. Épicos e Stories
...`
      }
  };

  const handleCopy = () => {
      copyToClipboard(formats[selectedFormat].content);
      toast({ title: "Copiado!", description: "Prompt pronto para colar na ferramenta.", variant: "success" });
  };

  const handleDownloadZip = () => {
      toast({ title: "Baixando...", description: "Gerando arquivo ZIP com todos os formatos." });
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
                      <span className="text-foreground font-medium">Exportação</span>
                  </div>
                  <Badge variant="success" className="w-fit bg-green-500/10 text-green-500 border-green-500/20">
                      Projeto Pronto
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
      <main className="flex-1 container py-8 max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-2">Seu Kit de Execução está pronto</h1>
              <p className="text-muted-foreground font-serif">
                  Escolha sua ferramenta de IA preferida e copie o prompt otimizado.
              </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Selector */}
              <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Destino</h3>
                  
                  {(Object.keys(formats) as Array<keyof typeof formats>).map((key) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedFormat(key)}
                        className={cn(
                            "p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4",
                            selectedFormat === key 
                                ? "border-[var(--studio-teal)] bg-[var(--studio-teal)]/5 shadow-md" 
                                : "border-border bg-card hover:border-border/80"
                        )}
                        style={selectedFormat === key ? { '--studio-teal': STUDIO_TEAL } as React.CSSProperties : {}}
                      >
                          <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              selectedFormat === key ? "bg-[var(--studio-teal)] text-white" : "bg-muted text-muted-foreground"
                          )}>
                              <Icon name={formats[key].icon} size="size-5" />
                          </div>
                          <div>
                              <h4 className="font-bold text-sm">{formats[key].title}</h4>
                              <p className="text-xs text-muted-foreground">{formats[key].desc}</p>
                          </div>
                      </div>
                  ))}

                  <div className="pt-6">
                      <Button variant="outline" className="w-full h-12 gap-2 border-dashed" onClick={handleDownloadZip}>
                          <Icon name="download" /> Baixar Tudo (.zip)
                      </Button>
                  </div>
              </div>

              {/* Right: Preview */}
              <div className="lg:col-span-8">
                  <Card className="h-full flex flex-col overflow-hidden border-border shadow-lg">
                      <div className="bg-muted/30 border-b border-border p-4 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                              <Icon name="file-code" className="text-muted-foreground" size="size-4" />
                              <span className="text-sm font-mono font-bold">prompt_output.md</span>
                          </div>
                          <Button size="sm" onClick={handleCopy} className="gap-2 text-white" style={{ backgroundColor: STUDIO_TEAL }}>
                              <Icon name="copy" size="size-3" /> Copiar Prompt
                          </Button>
                      </div>
                      <div className="flex-1 bg-[#1e1e1e] p-0 overflow-hidden">
                          <ScrollArea className="h-[500px] w-full">
                              <CodeBlock language="text" className="border-0 my-0 bg-transparent rounded-none shadow-none">
                                  {formats[selectedFormat].content}
                              </CodeBlock>
                          </ScrollArea>
                      </div>
                  </Card>
              </div>

          </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border p-6 text-center mt-auto">
          <Button variant="ghost" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}>
              Voltar ao Dashboard
          </Button>
      </footer>

    </div>
  );
};

export default PrdExportTemplate;
