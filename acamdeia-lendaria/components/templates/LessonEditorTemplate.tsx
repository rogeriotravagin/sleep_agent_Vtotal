import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { FileUpload } from '../ui/file-upload';
import { Toggle } from '../ui/toggle';
import { cn } from '../../lib/utils';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';

interface LessonEditorTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const LessonEditorTemplate: React.FC<LessonEditorTemplateProps> = ({ onNavigate, currentSection }) => {
  const STUDIO_PRIMARY = "#538096"; // Slate Blue Theme

  // Mock Lesson Data
  const [lesson, setLesson] = useState({
      title: "Introdução ao No-Code e Lógica de Programação",
      slug: "introducao-no-code",
      status: "draft",
      videoUrl: "",
  });

  // Mock Markdown Content from DB
  const [markdownContent, setMarkdownContent] = useState(`
# O que é No-Code?

O movimento **No-Code** permite que pessoas criem softwares, sites e aplicativos sem escrever uma única linha de código tradicional.

## Principais Vantagens
1. **Velocidade:** Desenvolvimento até 10x mais rápido.
2. **Custo:** Redução drástica de orçamento inicial.
3. **Autonomia:** Não dependa de desenvolvedores para cada alteração.

> "A programação do futuro é não programar." - *Chris Wanstrath, CEO do GitHub*

### Ferramentas Populares
* Bubble
* Webflow
* FlutterFlow
* Make (Integromat)
  `);

  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write');

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in pb-20">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      {/* Editor Sub-Header (Sticky below main header) */}
      <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm">
          <div className="container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span 
                        className="hover:text-foreground cursor-pointer"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}
                      >
                        Vibecoding
                      </span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="hover:text-foreground cursor-pointer">Módulo 1</span>
                      <Icon name="angle-small-right" size="size-3" />
                      <span className="text-foreground font-medium">Aula 01</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight text-foreground truncate max-w-[300px] sm:max-w-md">
                        {lesson.title}
                    </h1>
                    <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wide border-yellow-500/50 text-yellow-600 bg-yellow-500/10">
                        Rascunho
                    </Badge>
                  </div>
              </div>
              <div className="flex gap-2">
                  <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground hidden sm:flex">
                      <Icon name="clock" size="size-4" /> Histórico
                  </Button>
                  <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
                  <Button variant="outline" className="gap-2 border-border hover:bg-muted">
                      Salvar Rascunho
                  </Button>
                  <Button className="gap-2 text-white shadow-lg shadow-[var(--studio-primary)]/20" style={{ backgroundColor: STUDIO_PRIMARY }}>
                      <Icon name="check" size="size-4" /> Publicar
                  </Button>
              </div>
          </div>
      </div>

      <div className="container py-6 md:py-8 grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* --- LEFT COLUMN: WYSIWYG EDITOR (3/4 width) --- */}
          <div className="xl:col-span-3 space-y-6">
              
              {/* Title & Slug Input */}
              <div className="grid gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="lesson-title" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Título da Aula</Label>
                      <Input 
                        id="lesson-title" 
                        value={lesson.title} 
                        onChange={(e) => setLesson({...lesson, title: e.target.value})}
                        className="text-2xl font-bold h-auto py-3 px-4 border-transparent hover:border-border focus:border-primary bg-transparent transition-all placeholder:text-muted-foreground/50"
                        placeholder="Digite o título da aula..."
                      />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="lesson-slug" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">URL Slug</Label>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm pl-4">
                          <span>academialendaria.com/curso/vibecoding/</span>
                          <Input 
                            id="lesson-slug" 
                            value={lesson.slug} 
                            onChange={(e) => setLesson({...lesson, slug: e.target.value})}
                            className="h-8 text-sm font-mono bg-muted/30 border-transparent hover:border-border focus:border-primary w-full max-w-md"
                          />
                      </div>
                  </div>
              </div>

              <Separator />

              {/* EDITOR CONTAINER */}
              <div className="border border-border rounded-xl bg-card shadow-sm flex flex-col min-h-[600px] relative overflow-hidden">
                  
                  {/* Toolbar */}
                  <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1 p-2 border-b border-border bg-card/95 backdrop-blur-sm">
                      
                      {/* Text Styles */}
                      <div className="flex items-center gap-0.5 border-r border-border pr-2 mr-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><span className="font-bold font-serif text-lg">H1</span></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><span className="font-bold font-serif text-base">H2</span></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><span className="font-bold font-serif text-sm">H3</span></Button>
                      </div>

                      {/* Formatting */}
                      <div className="flex items-center gap-0.5 border-r border-border pr-2 mr-2">
                          <Toggle size="sm" className="h-8 w-8"><Icon name="bold" size="size-3" /></Toggle>
                          <Toggle size="sm" className="h-8 w-8"><Icon name="italic" size="size-3" /></Toggle>
                          <Toggle size="sm" className="h-8 w-8"><Icon name="underline" size="size-3" /></Toggle>
                          <Toggle size="sm" className="h-8 w-8"><Icon name="strikethrough" size="size-3" /></Toggle>
                      </div>

                      {/* Lists & Alignment */}
                      <div className="flex items-center gap-0.5 border-r border-border pr-2 mr-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="list" size="size-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="list-check" size="size-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="quote-right" size="size-3" /></Button>
                      </div>

                      {/* Insert */}
                      <div className="flex items-center gap-0.5">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="link" size="size-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="picture" size="size-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="code-simple" size="size-3" /></Button>
                      </div>

                      <div className="ml-auto flex items-center gap-2">
                          <span className="text-xs text-muted-foreground hidden sm:inline-block">{markdownContent.length} caracteres</span>
                          <div className="flex bg-muted/50 p-0.5 rounded-lg">
                              <button 
                                onClick={() => setViewMode('write')}
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                    viewMode === 'write' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                  Editar
                              </button>
                              <button 
                                onClick={() => setViewMode('preview')}
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                    viewMode === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                  Visualizar
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Edit Area */}
                  {viewMode === 'write' ? (
                      <textarea 
                          value={markdownContent}
                          onChange={(e) => setMarkdownContent(e.target.value)}
                          className="flex-1 w-full resize-none p-8 md:p-12 outline-none bg-background text-foreground font-serif text-lg leading-relaxed selection:bg-primary/20"
                          placeholder="Comece a escrever sua aula lendária..."
                      />
                  ) : (
                      <div className="flex-1 w-full p-8 md:p-12 prose dark:prose-invert max-w-none font-serif">
                          {/* Simulated Markdown Rendering */}
                          {markdownContent.split('\n').map((line, i) => {
                              if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold font-sans mb-6">{line.replace('# ', '')}</h1>
                              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold font-sans mt-8 mb-4">{line.replace('## ', '')}</h2>
                              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold font-sans mt-6 mb-3">{line.replace('### ', '')}</h3>
                              if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">{line.replace('> ', '')}</blockquote>
                              if (line.trim().startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.replace('* ', '')}</li>
                              if (line.trim().startsWith('1. ')) return <li key={i} className="ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>
                              if (line.trim() === '') return <br key={i} />
                              return <p key={i} className="mb-4 text-lg leading-relaxed text-foreground/90">{line}</p>
                          })}
                      </div>
                  )}
                  
                  {/* Floating AI Helper */}
                  <div className="absolute bottom-6 right-6">
                      <Button className="rounded-full h-12 px-6 shadow-xl gap-2 animate-bounce hover:animate-none" style={{ backgroundColor: STUDIO_PRIMARY }}>
                          <Icon name="sparkles" /> AI Copilot
                      </Button>
                  </div>
              </div>
          </div>

          {/* --- RIGHT COLUMN: SETTINGS SIDEBAR (1/4 width) --- */}
          <div className="space-y-6">
              
              {/* Video Configuration (Primary Media) */}
              <Card className="border-l-4 border-l-primary shadow-md">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                          <Icon name="video-camera" className="text-primary" /> Vídeo Principal
                      </CardTitle>
                      <CardDescription>Link do vídeo (Youtube, Vimeo, Panda).</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="space-y-2">
                          <Label>URL do Vídeo</Label>
                          <div className="relative">
                              <Icon name="link" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                              <Input 
                                placeholder="https://..." 
                                className="pl-9" 
                                value={lesson.videoUrl}
                                onChange={(e) => setLesson({...lesson, videoUrl: e.target.value})}
                              />
                          </div>
                      </div>
                      
                      {lesson.videoUrl ? (
                          <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center relative overflow-hidden group">
                              <div className="absolute inset-0 flex items-center justify-center">
                                  <Icon name="play-circle" className="text-white opacity-80" size="size-8" />
                              </div>
                              <p className="text-xs text-white/50 absolute bottom-2">Preview do Player</p>
                          </div>
                      ) : (
                          <div className="aspect-video w-full bg-muted/30 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground gap-2">
                              <Icon name="film" size="size-6" className="opacity-20" />
                              <span className="text-xs">Nenhum vídeo vinculado</span>
                          </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                          <Label className="text-xs cursor-pointer">Autoplay</Label>
                          <Switch className="scale-75" />
                      </div>
                  </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                  <CardHeader className="pb-3">
                      <CardTitle className="text-base flex justify-between items-center">
                          Materiais de Apoio
                          <Button variant="ghost" size="icon" className="h-6 w-6"><Icon name="plus" size="size-3" /></Button>
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded bg-muted/30 border border-border group">
                          <div className="flex items-center gap-3">
                              <Icon name="file-pdf" className="text-red-500" />
                              <div className="flex flex-col">
                                  <span className="text-xs font-semibold">Slide_Deck_v1.pdf</span>
                                  <span className="text-[10px] text-muted-foreground">2.4 MB</span>
                              </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="trash" size="size-3" /></Button>
                      </div>
                      <FileUpload className="h-24 min-h-[auto]" maxSize={1024 * 1024 * 10} />
                  </CardContent>
              </Card>

              {/* Publishing Settings */}
              <Card>
                  <CardHeader className="pb-3">
                      <CardTitle className="text-base">Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                              <Label className="text-sm">Visibilidade</Label>
                              <p className="text-[10px] text-muted-foreground">Visível para alunos</p>
                          </div>
                          <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                              <Label className="text-sm">Preview Gratuito</Label>
                              <p className="text-[10px] text-muted-foreground">Acessível sem compra</p>
                          </div>
                          <Switch />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                          <Label className="text-sm">Duração Estimada (min)</Label>
                          <Input type="number" placeholder="0" className="bg-background h-8" />
                      </div>
                  </CardContent>
              </Card>

              {/* SEO Helper */}
              <Card className="bg-muted/10 border-dashed">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Icon name="search" /> SEO Preview
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                      <p className="text-sm font-bold text-blue-600 truncate">{lesson.title || "Título da Aula"}</p>
                      <p className="text-xs text-green-700 truncate">academialendaria.com/curso/{lesson.slug || "slug"}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                          {markdownContent.substring(0, 120).replace(/[#*_]/g, '')}...
                      </p>
                  </CardContent>
              </Card>

          </div>

      </div>

    </div>
  );
};

export default LessonEditorTemplate;