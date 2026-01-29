import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Section } from '../../types';

interface PersonasTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const PersonasTemplate: React.FC<PersonasTemplateProps> = ({ onNavigate, currentSection }) => {
  const STUDIO_PRIMARY = "#538096";
  const STUDIO_GOLD = "#C9B298";

  const personas = [
      {
          id: 1,
          name: "João, o Executivo Ocupado",
          role: "Gestor Comercial",
          age: 42,
          avatar: "https://i.pravatar.cc/150?u=joao",
          painPoints: ["Falta de tempo", "Equipe desmotivada", "Processos manuais"],
          desires: ["Automatizar rotinas", "Escalar resultados", "Ter mais liberdade"],
          alignment: 95,
          courses: ["Liderança 4.0", "Vibecoding"]
      },
      {
          id: 2,
          name: "Ana, a Transição de Carreira",
          role: "Ex-Advogada",
          age: 35,
          avatar: "https://i.pravatar.cc/150?u=ana",
          painPoints: ["Medo de tecnologia", "Insegurança financeira", "Síndrome do impostor"],
          desires: ["Trabalho remoto", "Criatividade", "Impacto social"],
          alignment: 88,
          courses: ["Prompt Engineering", "Didática Lendária"]
      },
      {
          id: 3,
          name: "Lucas, o Empreendedor Solo",
          role: "Consultor",
          age: 28,
          avatar: "https://i.pravatar.cc/150?u=lucas",
          painPoints: ["Sobrecarga operacional", "Vendas inconsistentes", "Isolamento"],
          desires: ["Produtividade extrema", "Funil automático", "Networking"],
          alignment: 75,
          courses: ["Vibecoding"]
      }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* Shared TopBar */}
      {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}

      <main className="container py-6 md:py-8 w-full space-y-8 flex-1">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    Gerenciador de Personas
                </h1>
                <p className="text-muted-foreground text-sm font-serif mt-1">
                    Defina e refine o público-alvo dos seus produtos educacionais.
                </p>
            </div>
            <Button className="gap-2 text-white shadow-md" style={{ backgroundColor: STUDIO_PRIMARY }}>
                <Icon name="user-add" size="size-4" /> Criar Persona com IA
            </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Persona Cards */}
            {personas.map((persona) => (
                <Card key={persona.id} className="overflow-hidden border-border group hover:border-[var(--studio-primary)]/50 transition-all duration-300" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                    
                    {/* Header Image/Avatar */}
                    <div className="h-24 bg-gradient-to-r from-[var(--studio-primary)] to-[var(--studio-primary)]/80 relative" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                        <div className="absolute -bottom-8 left-6">
                            <Avatar className="w-16 h-16 border-4 border-card shadow-lg">
                                <AvatarImage src={persona.avatar} />
                                <AvatarFallback>{persona.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[10px] font-bold uppercase tracking-wider">
                            ICP Score: {persona.alignment}%
                        </div>
                    </div>

                    <CardContent className="pt-10 px-6 pb-6 space-y-6">
                        
                        {/* Basic Info */}
                        <div>
                            <h3 className="font-bold text-lg leading-tight mb-1">{persona.name}</h3>
                            <p className="text-sm text-muted-foreground font-serif">{persona.role}, {persona.age} anos</p>
                        </div>

                        {/* Psychographics */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-destructive uppercase tracking-wide">
                                    <Icon name="arrow-down" size="size-3" /> Dores & Medos
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {persona.painPoints.map((pain, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] font-normal border-destructive/20 text-destructive bg-destructive/5">{pain}</Badge>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-green-600 uppercase tracking-wide">
                                    <Icon name="arrow-up" size="size-3" /> Desejos & Sonhos
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {persona.desires.map((desire, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] font-normal border-green-500/20 text-green-600 bg-green-500/5">{desire}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Courses */}
                        <div>
                            <p className="text-xs text-muted-foreground font-bold uppercase mb-2">Cursos Recomendados</p>
                            <div className="space-y-2">
                                {persona.courses.map((course, i) => (
                                    <div 
                                        key={i} 
                                        className="flex items-center gap-2 text-sm text-foreground/80 bg-muted/30 p-2 rounded-lg"
                                        style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}
                                    >
                                        <Icon name="graduation-cap" size="size-3" className="text-[var(--studio-primary)]" />
                                        {course}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button variant="outline" className="w-full text-xs h-9">Ver Detalhes Completos</Button>
                        </div>

                    </CardContent>
                </Card>
            ))}

            {/* Add New Placeholder */}
            <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 text-center hover:bg-muted/10 transition-colors cursor-pointer group min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-[var(--studio-primary)]/10 group-hover:text-[var(--studio-primary)] transition-colors" style={{ '--studio-primary': STUDIO_PRIMARY } as React.CSSProperties}>
                    <Icon name="plus" size="size-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Nova Persona</h3>
                <p className="text-sm text-muted-foreground font-serif max-w-xs mx-auto">
                    Adicione um novo perfil de cliente ideal manualmente ou importe de uma pesquisa.
                </p>
            </div>

        </div>

      </main>
    </div>
  );
};

export default PersonasTemplate;