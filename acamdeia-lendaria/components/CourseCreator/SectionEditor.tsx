
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { CourseData } from '../../types/project-creator';
import { Icon } from '../ui/icon';
import { Toggle } from '../ui/toggle';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface SectionEditorProps {
    sectionId: keyof CourseData;
    initialValue: string;
    onSave: (value: string) => void;
    onCancel: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ 
    sectionId, 
    initialValue, 
    onSave,
    onCancel
}) => {
    const [value, setValue] = useState(initialValue);
    const STUDIO_COLOR = "#538096";

    // Update local state when prop changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSave = () => {
        onSave(value);
    };

    const getLabel = (id: string) => {
        switch(id) {
            case 'brief': return { title: 'Brief do Curso', desc: 'Promessa, Público-Alvo e Diferencial Único.' };
            case 'curriculum': return { title: 'Currículo (Ementa)', desc: 'Estrutura macro do método e jornada do aluno.' };
            case 'research': return { title: 'Pesquisas', desc: 'Dores, desejos e análise de concorrentes.' };
            case 'reports': return { title: 'Relatórios', desc: 'Plano de ação e viabilidade.' };
            case 'modules': return { title: 'Módulos', desc: 'Quebra detalhada dos módulos e seus objetivos.' };
            case 'lessons': return { title: 'Aulas', desc: 'Roteiros e tópicos de cada aula.' };
            case 'briefValidation': return { title: 'Validação do Brief', desc: 'Resultados do QA do Briefing.' };
            case 'refinementValidation': return { title: 'Validação do Refinamento', desc: 'Resultados do QA pós-pesquisa.' };
            case 'publication': return { title: 'Publicação', desc: 'Detalhes finais de lançamento e distribuição.' };
            default: return { title: 'Editar Seção', desc: 'Edite o conteúdo abaixo.' };
        }
    };

    const info = getLabel(sectionId);

    // Is this a specialized "Publication" section that needs a specific "Conclude" button?
    const isPublication = sectionId === 'publication';

    return (
        <div className="flex flex-col h-full bg-background animate-fade-in relative">
            
            {/* Header Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onCancel} className="text-muted-foreground hover:text-foreground">
                        <Icon name="arrow-left" size="size-4" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            {info.title}
                        </h2>
                        <p className="text-xs text-muted-foreground font-serif">{info.desc}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="ghost" onClick={onCancel} className="text-xs">
                        Voltar ao Chat
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        style={{ backgroundColor: STUDIO_COLOR }} 
                        className="text-white shadow-md gap-2"
                    >
                        <Icon name={isPublication ? "rocket" : "check"} size="size-3" />
                        {isPublication ? "Concluir Projeto" : "Salvar Alterações"}
                    </Button>
                </div>
            </div>

            {/* WYSIWYG Toolbar */}
            <div className="px-4 py-2 border-b border-border bg-muted/20 flex gap-2 overflow-x-auto items-center">
                <div className="flex gap-1 border-r border-border pr-2 mr-2">
                    <Toggle size="sm" className="h-8 w-8"><Icon name="bold" size="size-3" /></Toggle>
                    <Toggle size="sm" className="h-8 w-8"><Icon name="italic" size="size-3" /></Toggle>
                    <Toggle size="sm" className="h-8 w-8"><Icon name="underline" size="size-3" /></Toggle>
                </div>
                <div className="flex gap-1 border-r border-border pr-2 mr-2">
                    <Toggle size="sm" className="h-8 w-8"><Icon name="list" size="size-3" /></Toggle>
                    <Toggle size="sm" className="h-8 w-8"><Icon name="list-check" size="size-3" /></Toggle>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="link" size="size-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="image" size="size-3" /></Button>
                </div>
                
                <div className="ml-auto text-xs text-muted-foreground font-mono">
                    Markdown Supported
                </div>
            </div>

            {/* Editor Area */}
            <ScrollArea className="flex-1 bg-card">
                <div className="max-w-3xl mx-auto py-8 px-8">
                     <AutosizeTextarea 
                        className="min-h-[500px] w-full text-base font-serif leading-relaxed bg-transparent border-none focus:ring-0 resize-none p-0 placeholder:text-muted-foreground/30"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Comece a escrever ou colar seu conteúdo aqui..."
                        autoFocus
                    />
                </div>
            </ScrollArea>
            
            {/* AI Helper Floating Button */}
            <div className="absolute bottom-6 right-6">
                <Button 
                    className="rounded-full h-10 px-4 shadow-lg border border-primary/20 text-xs font-bold gap-2 bg-background hover:bg-muted text-foreground"
                >
                    <Icon name="sparkles" className="text-[var(--studio-color)]" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties} /> 
                    Refinar com IA
                </Button>
            </div>
        </div>
    );
};
