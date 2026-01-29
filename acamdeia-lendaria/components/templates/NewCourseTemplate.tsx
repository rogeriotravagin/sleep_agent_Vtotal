import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Stepper } from '../ui/stepper';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';
import { cn } from '../../lib/utils';

interface NewCourseTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const NewCourseTemplate: React.FC<NewCourseTemplateProps> = ({ onNavigate, currentSection }) => {
  // Removing hardcoded colors. Using system CSS variables via Tailwind classes.
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [structureGenerated, setStructureGenerated] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseAuthor, setCourseAuthor] = useState("an"); // Default to Alan
  
  // Simulated State for AI Icon
  const [generatedIcon, setGeneratedIcon] = useState("box");
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  // Trigger AI Icon Generation on Input Blur
  const handleTitleBlur = () => {
      if (!courseTitle.trim()) return;
      
      setIsIconAnimating(true);
      // Simulate AI analysis delay
      setTimeout(() => {
          const lowerTitle = courseTitle.toLowerCase();
          
          if (lowerTitle.includes("code") || lowerTitle.includes("dev") || lowerTitle.includes("program")) setGeneratedIcon("code-simple");
          else if (lowerTitle.includes("ia") || lowerTitle.includes("ai") || lowerTitle.includes("gpt")) setGeneratedIcon("microchip");
          else if (lowerTitle.includes("venda") || lowerTitle.includes("lucro") || lowerTitle.includes("finan")) setGeneratedIcon("coins");
          else if (lowerTitle.includes("marketing") || lowerTitle.includes("copy") || lowerTitle.includes("traffic")) setGeneratedIcon("megaphone");
          else if (lowerTitle.includes("video") || lowerTitle.includes("film") || lowerTitle.includes("edição")) setGeneratedIcon("video-camera");
          else if (lowerTitle.includes("design") || lowerTitle.includes("criat") || lowerTitle.includes("art")) setGeneratedIcon("palette");
          else if (lowerTitle.includes("gest") || lowerTitle.includes("lid")) setGeneratedIcon("briefcase");
          else setGeneratedIcon("graduation-cap");
          
          setIsIconAnimating(false);
      }, 1500);
  };

  const steps = [
      { id: 1, label: "Identidade", description: "Conceito & Visual" },
      { id: 2, label: "Estrutura", description: "Currículo IA" },
      { id: 3, label: "Revisão", description: "Publicação" },
  ];

  const handleNext = () => {
      if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
      }
  };

  const handleBack = () => {
      if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
      }
  };

  const handleGenerateStructure = () => {
      setIsGenerating(true);
      // Simulate AI delay
      setTimeout(() => {
          setIsGenerating(false);
          setStructureGenerated(true);
      }, 3000);
  };

  const getAuthorName = (id: string) => {
      switch(id) {
          case 'an': return 'Alan Nicolas';
          case 'jc': return 'José Carlos';
          case 'am': return 'Adriano Marqui';
          default: return 'Desconhecido';
      }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in pb-20">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      <main className="flex-1 container py-8 md:py-12 max-w-5xl mx-auto space-y-12">
          
          <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Novo Produto Digital</h1>
              <p className="text-muted-foreground font-serif max-w-lg">
                  Defina a base do seu curso e deixe a IA estruturar o caminho de aprendizado.
              </p>
          </div>

          <div className="max-w-3xl mx-auto w-full">
              <Stepper steps={steps} currentStep={currentStep} />
          </div>

          {/* --- STEP 1: IDENTITY --- */}
          {currentStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                  
                  {/* Left Column: Visual Identity (Icon) - 4 Cols */}
                  <div className="lg:col-span-4 space-y-6">
                      <Card className="h-full border-border bg-card overflow-hidden flex flex-col shadow-sm">
                          <div className="bg-muted/20 border-b border-border p-8 flex flex-col items-center justify-center flex-1 min-h-[240px] relative group">
                              {/* Texture Pattern */}
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
                              
                              <div className={cn(
                                  "w-32 h-32 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-all duration-500 relative z-10 border border-primary/20 bg-primary/10 text-primary",
                                  isIconAnimating ? "scale-90 opacity-50 blur-sm" : "scale-100 opacity-100"
                              )}>
                                  {isIconAnimating ? <Icon name="sparkles" className="animate-spin-slow" /> : <Icon name={generatedIcon} />}
                              </div>

                              <div className="absolute bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="outline" className="h-8 text-xs shadow-sm bg-background/80 backdrop-blur" onClick={handleTitleBlur}>
                                      <Icon name="refresh" className="mr-2" /> Regenerar
                                  </Button>
                              </div>
                          </div>
                          <CardContent className="p-6 space-y-4">
                              <div>
                                  <h4 className="font-bold text-sm">Ícone do Curso</h4>
                                  <p className="text-xs text-muted-foreground font-serif mt-1">
                                      {isIconAnimating ? "A IA está analisando seu título..." : "Gerado automaticamente pela IA com base no título e categoria."}
                                  </p>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className={cn("h-2 w-2 rounded-full", isIconAnimating ? "bg-primary animate-pulse" : "bg-primary")}></div>
                                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                      {isIconAnimating ? "Processando..." : "Identidade Sincronizada"}
                                  </span>
                              </div>
                          </CardContent>
                      </Card>
                  </div>

                  {/* Right Column: Details Form - 8 Cols */}
                  <div className="lg:col-span-8">
                      <Card className="border-border h-full shadow-sm">
                          <CardHeader>
                              <CardTitle>Informações Básicas</CardTitle>
                              <CardDescription>Dados essenciais para catalogação no Studio.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                              <div className="space-y-2">
                                  <Label>Título do Curso</Label>
                                  <Input 
                                    placeholder="Ex: Masterclass de Vendas B2B" 
                                    className="text-lg font-medium h-12 bg-muted/20" 
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    onBlur={handleTitleBlur}
                                    autoFocus
                                  />
                                  <p className="text-[10px] text-muted-foreground text-right">Dica: Deselecione para gerar o ícone.</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <Label>Categoria</Label>
                                      <Select 
                                          placeholder="Selecione..."
                                          options={[
                                              {label: "Tecnologia & Dev", value: "tech"},
                                              {label: "Negócios & Vendas", value: "biz"},
                                              {label: "Design & Criatividade", value: "design"},
                                              {label: "Marketing Digital", value: "mkt"},
                                              {label: "Produtividade", value: "prod"},
                                          ]}
                                          value={courseCategory}
                                          onValueChange={setCourseCategory}
                                          className="bg-muted/20"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <Label>Professor Principal</Label>
                                      <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Select 
                                                placeholder="Selecione..."
                                                options={[
                                                    {label: "Alan Nicolas", value: "an"},
                                                    {label: "José Carlos", value: "jc"},
                                                    {label: "Adriano Marqui", value: "am"},
                                                ]}
                                                value={courseAuthor}
                                                onValueChange={setCourseAuthor}
                                                className="bg-muted/20"
                                            />
                                        </div>
                                        <Button variant="outline" size="icon" title="Adicionar Novo Professor" className="shrink-0 aspect-square border-dashed">
                                            <Icon name="plus" size="size-4" />
                                        </Button>
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <Label>Descrição Curta (Meta)</Label>
                                  <Textarea 
                                    placeholder="Uma breve descrição que convence o aluno a clicar..." 
                                    className="h-28 resize-none text-sm leading-relaxed bg-muted/20" 
                                  />
                                  <div className="flex justify-between text-[10px] text-muted-foreground">
                                      <span>Ideal para SEO e vitrine.</span>
                                      <span>0/160</span>
                                  </div>
                              </div>
                          </CardContent>
                          <CardFooter className="justify-between border-t border-border py-4 bg-muted/5 mt-auto">
                              <Button variant="ghost" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}>Cancelar</Button>
                              <Button onClick={handleNext} className="px-8 shadow-md">
                                  Próximo Passo <Icon name="arrow-right" className="ml-2" />
                              </Button>
                          </CardFooter>
                      </Card>
                  </div>
              </div>
          )}

          {/* --- STEP 2: STRUCTURE (AI) --- */}
          {currentStep === 1 && (
              <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                  
                  {/* AI Input Card - Monochrome Style */}
                  <Card className="border border-primary/20 shadow-lg relative overflow-hidden bg-card text-foreground">
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                      
                      <CardHeader className="relative z-10 pb-2">
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 text-primary shadow-sm">
                                      <Icon name="sparkles" />
                                  </div>
                                  <div>
                                      <CardTitle className="text-xl">AI Architect</CardTitle>
                                      <CardDescription>Descreva o objetivo e deixe a IA criar a ementa.</CardDescription>
                                  </div>
                              </div>
                              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                                  Beta v2.0
                              </Badge>
                          </div>
                      </CardHeader>
                      <CardContent className="space-y-4 relative z-10">
                          <div className="relative group">
                              <AutosizeTextarea 
                                  placeholder="Ex: Crie um curso de Python para analistas financeiros focando em automação de planilhas Excel e relatórios PDF..." 
                                  className="min-h-[120px] bg-muted/30 border-border focus:border-primary/50 transition-all text-base p-5 pr-14 resize-none placeholder:text-muted-foreground/50 rounded-xl"
                                  value={aiPrompt}
                                  onChange={(e) => setAiPrompt(e.target.value)}
                              />
                              <div className="absolute bottom-3 right-3">
                                  <Button 
                                    size="icon" 
                                    className="h-10 w-10 rounded-lg transition-all shadow-md"
                                    onClick={handleGenerateStructure}
                                    disabled={!aiPrompt || isGenerating}
                                  >
                                      {isGenerating ? <Icon name="spinner" className="animate-spin" /> : <Icon name="magic-wand" />}
                                  </Button>
                              </div>
                          </div>
                          
                          {isGenerating && (
                              <div className="flex items-center gap-3 text-sm text-muted-foreground animate-pulse px-2">
                                  <Icon name="brain-circuit" className="text-primary" />
                                  <span>Analisando mercado e gerando módulos ideais...</span>
                              </div>
                          )}
                      </CardContent>
                  </Card>

                  {/* Generated Structure (or Manual Fallback) */}
                  {structureGenerated ? (
                      <div className="space-y-4 animate-fade-in-up">
                          <div className="flex justify-between items-center px-1">
                              <h3 className="text-lg font-bold flex items-center gap-2">
                                  <Icon name="list-check" className="text-muted-foreground" /> Estrutura Sugerida
                              </h3>
                              <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="h-8 text-xs"><Icon name="refresh" className="mr-1" /> Regenerar</Button>
                                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">Editar Manualmente</Button>
                              </div>
                          </div>

                          <div className="grid gap-4">
                              {[1, 2, 3, 4].map((mod) => (
                                  <Card key={mod} className="border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                      <div className="bg-muted/30 px-4 py-3 flex justify-between items-center border-b border-border/60">
                                          <div className="flex items-center gap-3">
                                              <div className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                  {mod}
                                              </div>
                                              <span className="font-bold text-sm text-foreground">Fundamentos Essenciais & Lógica</span>
                                          </div>
                                          <Badge variant="secondary" className="text-[10px] font-mono">3 Aulas • 45min</Badge>
                                      </div>
                                      <CardContent className="p-0">
                                          <div className="divide-y divide-border/30">
                                              {[1, 2, 3].map((lesson) => (
                                                  <div key={lesson} className="flex items-center gap-4 p-3 pl-6 hover:bg-muted/10 transition-colors group">
                                                      <Icon name="menu-dots-vertical" className="text-muted-foreground/20 group-hover:text-muted-foreground cursor-grab" size="size-3" />
                                                      <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                                                          <Icon name="video-camera" size="size-3" />
                                                      </div>
                                                      <div className="flex-1">
                                                          <p className="text-sm font-medium text-foreground">Introdução ao Conceito {mod}.{lesson}</p>
                                                          <p className="text-[10px] text-muted-foreground truncate max-w-md">Nesta aula vamos abordar os principais pilares...</p>
                                                      </div>
                                                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                          <Icon name="pencil" size="size-3" />
                                                      </Button>
                                                  </div>
                                              ))}
                                          </div>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div>

                          <div className="flex justify-between pt-8">
                              <Button variant="outline" onClick={handleBack} size="lg">Voltar</Button>
                              <Button onClick={handleNext} size="lg" className="px-8 shadow-lg">
                                  Confirmar Estrutura <Icon name="arrow-right" className="ml-2" />
                              </Button>
                          </div>
                      </div>
                  ) : (
                      !isGenerating && (
                        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-muted/5">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                                <Icon name="layout-fluid" size="size-8" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Estrutura Pendente</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto mb-6 text-sm">
                                Utilize a IA acima para gerar uma ementa completa ou comece do zero manualmente.
                            </p>
                            <Button variant="outline" onClick={() => setStructureGenerated(true)}>
                                Começar Manualmente
                            </Button>
                        </div>
                      )
                  )}
              </div>
          )}

          {/* --- STEP 3: REVIEW --- */}
          {currentStep === 2 && (
              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in">
                  
                  {/* Left: Preview (4 cols) */}
                  <div className="lg:col-span-4 space-y-6">
                      <Label className="text-muted-foreground uppercase tracking-widest text-xs font-bold pl-1">Preview do Card</Label>
                      
                      {/* Course Card Preview - Standard Style */}
                      <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-start gap-4 shadow-lg relative overflow-hidden group cursor-default">
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl pointer-events-none transition-colors"></div>

                          {/* Icon Box */}
                          <div className="w-14 h-14 mb-2 rounded-lg flex items-center justify-center transition-colors shrink-0 bg-primary/10 text-primary shadow-sm border border-primary/10">
                              <Icon name={generatedIcon} size="size-5" />
                          </div>

                          <div className="w-full">
                              <div className="flex gap-2 mb-1 justify-between items-start">
                                  <h4 className="text-base font-bold text-foreground line-clamp-2 leading-tight">{courseTitle || "Título do Curso"}</h4>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-3">
                                  <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-primary/30 text-primary bg-primary/5 uppercase">
                                      {courseCategory || "Geral"}
                                  </Badge>
                                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                      <Icon name="video-camera" size="size-3" />
                                  </div>
                              </div>

                              <div className="flex flex-col items-start gap-2 border-t border-border pt-3 mt-1 w-full">
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                                      <Icon name="user" size="size-3" /> {getAuthorName(courseAuthor)}
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-serif">
                                      <span className="flex items-center gap-1.5"><Icon name="layers" size="size-3" /> 4 mód</span>
                                      <span className="flex items-center gap-1.5"><Icon name="document" size="size-3" /> 12 aulas</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="bg-muted/10 p-4 rounded-lg border border-border text-xs text-muted-foreground font-serif text-center">
                          "O sucesso é a soma de pequenos esforços repetidos dia após dia."
                      </div>
                  </div>

                  {/* Right: Settings (8 cols) */}
                  <div className="lg:col-span-8">
                      <Card className="h-full border-border">
                          <CardHeader>
                              <CardTitle>Configurações Finais</CardTitle>
                              <CardDescription>Defina como seu produto será entregue.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-8">
                              
                              <div className="space-y-4">
                                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
                                      <div className="space-y-0.5">
                                          <Label className="text-base font-bold">Preço Padrão (BRL)</Label>
                                          <p className="text-xs text-muted-foreground font-serif">Valor cheio sem descontos.</p>
                                      </div>
                                      <div className="relative w-40">
                                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">R$</span>
                                          <Input type="number" className="pl-10 text-right font-mono font-bold" placeholder="0,00" />
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                                          <div className="space-y-0.5">
                                              <Label className="text-sm font-bold">Visibilidade</Label>
                                              <p className="text-[10px] text-muted-foreground">Publicar na vitrine?</p>
                                          </div>
                                          <Switch />
                                      </div>
                                      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                                          <div className="space-y-0.5">
                                              <Label className="text-sm font-bold">Certificado</Label>
                                              <p className="text-[10px] text-muted-foreground">Emitir ao concluir?</p>
                                          </div>
                                          <Switch defaultChecked />
                                      </div>
                                  </div>
                              </div>

                              <Separator />

                              <div className="space-y-2">
                                  <Label>Checklist de Lançamento</Label>
                                  <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Icon name="check-circle" className="text-green-500" size="size-4" /> Capa e Ícone definidos
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Icon name="check-circle" className="text-green-500" size="size-4" /> Estrutura de módulos criada
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Icon name="circle" className="text-muted-foreground" size="size-4" /> Conteúdo das aulas (Pendente)
                                      </div>
                                  </div>
                              </div>

                          </CardContent>
                          <CardFooter className="justify-between border-t border-border bg-muted/5 py-6 mt-auto">
                              <Button variant="outline" onClick={handleBack}>Voltar</Button>
                              <Button 
                                className="gap-2 text-primary-foreground shadow-lg px-8 h-12 text-base" 
                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}
                              >
                                  <Icon name="rocket" size="size-5" /> Criar Rascunho
                              </Button>
                          </CardFooter>
                      </Card>
                  </div>
              </div>
          )}

      </main>
    </div>
  );
};

export default NewCourseTemplate;