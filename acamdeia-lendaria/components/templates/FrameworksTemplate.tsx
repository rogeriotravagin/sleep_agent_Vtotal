import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';

interface FrameworksTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const FrameworksTemplate: React.FC<FrameworksTemplateProps> = ({ onNavigate, currentSection }) => {
  const STUDIO_PRIMARY = "#538096";
  const STUDIO_ACCENT = "#F2EBE4";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
      { id: "all", label: "Todos" },
      { id: "copy", label: "Copywriting" },
      { id: "pedagogy", label: "Didática" },
      { id: "business", label: "Negócios" },
      { id: "productivity", label: "Produtividade" },
  ];

  const frameworks = [
      {
          id: "aida",
          title: "AIDA",
          category: "copy",
          description: "Atenção, Interesse, Desejo, Ação. O clássico funil de conversão para qualquer comunicação persuasiva.",
          tags: ["Marketing", "Vendas"],
          complexity: "Baixa",
          usage: 1240
      },
      {
          id: "bloom",
          title: "Taxonomia de Bloom",
          category: "pedagogy",
          description: "Hierarquia de objetivos educacionais: Lembrar, Entender, Aplicar, Analisar, Avaliar e Criar.",
          tags: ["Educação", "Planejamento"],
          complexity: "Média",
          usage: 850
      },
      {
          id: "golden-circle",
          title: "Golden Circle",
          category: "business",
          description: "Comece pelo 'Porquê'. Estruture sua narrativa de marca do centro para fora (Why -> How -> What).",
          tags: ["Liderança", "Branding"],
          complexity: "Baixa",
          usage: 2100
      },
      {
          id: "hero-journey",
          title: "Jornada do Herói",
          category: "copy",
          description: "Estrutura narrativa mítica de Joseph Campbell. Ideal para storytelling e construção de marca pessoal.",
          tags: ["Storytelling", "Roteiro"],
          complexity: "Alta",
          usage: 980
      },
      {
          id: "eisenhower",
          title: "Matriz de Eisenhower",
          category: "productivity",
          description: "Priorização de tarefas baseada em Urgência vs Importância. Decida o que fazer, delegar ou eliminar.",
          tags: ["Gestão", "Tempo"],
          complexity: "Baixa",
          usage: 3400
      },
      {
          id: "scamper",
          title: "SCAMPER",
          category: "business",
          description: "Técnica de ideação: Substituir, Combinar, Adaptar, Modificar, Propor outro uso, Eliminar, Reorganizar.",
          tags: ["Criatividade", "Inovação"],
          complexity: "Média",
          usage: 620
      },
      {
          id: "4ps",
          title: "4 Ps do Marketing",
          category: "business",
          description: "Produto, Preço, Praça e Promoção. Os pilares fundamentais para qualquer estratégia de mercado.",
          tags: ["Marketing", "Estratégia"],
          complexity: "Média",
          usage: 1800
      },
      {
          id: "feynman",
          title: "Técnica Feynman",
          category: "pedagogy",
          description: "Aprenda qualquer coisa ensinando-a de forma simples. Identifique lacunas no seu conhecimento.",
          tags: ["Aprendizado", "Ensino"],
          complexity: "Baixa",
          usage: 1500
      }
  ];

  const filteredFrameworks = frameworks.filter(f => {
      const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      <main className="container py-6 md:py-8 w-full space-y-8 flex-1">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    Biblioteca de Frameworks
                </h1>
                <p className="text-muted-foreground text-sm font-serif mt-1">
                    Modelos mentais e estruturas validadas para acelerar sua criação.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 border-dashed border-border">
                    <Icon name="plus" size="size-3" /> Sugerir Novo
                </Button>
            </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="relative w-full md:w-96">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                <Input 
                    placeholder="Buscar frameworks..." 
                    className="pl-10 bg-muted/30 border-transparent hover:border-border focus:border-[var(--studio-primary)]"
                    style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                    <TabsList className="bg-transparent h-auto p-0 gap-2">
                        {categories.map(cat => (
                            <TabsTrigger 
                                key={cat.id} 
                                value={cat.id}
                                className={cn(
                                    "rounded-full border border-border px-4 py-1.5 text-xs data-[state=active]:bg-[var(--studio-primary)] data-[state=active]:text-white data-[state=active]:border-transparent transition-all",
                                    selectedCategory !== cat.id && "hover:bg-muted"
                                )}
                                style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                            >
                                {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFrameworks.map((fw) => (
                <Card 
                    key={fw.id} 
                    className="group hover:shadow-lg transition-all duration-300 border-border cursor-pointer relative overflow-hidden bg-card"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--studio-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}></div>
                    
                    <CardHeader className="pb-3 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--studio-accent)] text-[var(--studio-primary)] group-hover:scale-110 transition-transform"
                                style={{ '--studio-primary': STUDIO_PRIMARY, '--studio-accent': STUDIO_ACCENT } as React.CSSProperties}
                            >
                                <Icon name={fw.category === 'copy' ? 'edit' : fw.category === 'business' ? 'briefcase' : fw.category === 'pedagogy' ? 'graduation-cap' : 'rocket'} size="size-5" />
                            </div>
                            <Badge variant="secondary" className="text-[10px] font-normal">{fw.complexity}</Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-[var(--studio-primary)] transition-colors" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                            {fw.title}
                        </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 relative z-10">
                        <p className="text-xs text-muted-foreground font-serif leading-relaxed line-clamp-3">
                            {fw.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                            {fw.tags.map(tag => (
                                <span key={tag} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border/50">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Icon name="users" size="size-3" /> {fw.usage} usos
                            </span>
                            <Button size="sm" variant="ghost" className="h-7 text-xs hover:bg-[var(--studio-primary)]/10 hover:text-[var(--studio-primary)]" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                                Usar Modelo <Icon name="arrow-right" size="size-3" className="ml-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </main>
    </div>
  );
};

export default FrameworksTemplate;