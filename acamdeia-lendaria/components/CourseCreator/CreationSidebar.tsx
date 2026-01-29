
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Progress } from '../ui/progress';
import { CourseData, Project, SectionStatus } from '../../types/project-creator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface CreationSidebarProps {
  project: Project;
  onEditSection: (sectionId: keyof CourseData) => void;
  className?: string;
  totalProgress: number;
  onSaveProject: () => void;
}

const ProgressDots = ({ filled }: { filled: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <div 
                key={i}
                className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    i <= filled ? "bg-[var(--studio-color)]" : "bg-muted-foreground/20"
                )}
            />
        ))}
    </div>
);

export const CreationSidebar: React.FC<CreationSidebarProps> = ({ 
  project, 
  onEditSection, 
  className,
  totalProgress,
  onSaveProject
}) => {
  const STUDIO_COLOR = "#538096"; // Petrol Blue

  // Helper to calculate filled status (0-5) based on content length
  const getStatus = (content: string): number => {
      if (!content) return 0;
      if (content.length < 20) return 1;
      if (content.length < 50) return 3;
      return 5;
  };

  // Check if a section is locked based on previous section completion
  const isLocked = (content: string) => !content || content.length < 5;

  const structureSections: SectionStatus[] = [
      { id: 'brief', label: 'Brief', filled: getStatus(project.data.brief), locked: false, subLabel: '8 seções' },
      { id: 'briefValidation', label: 'Validação Brief', filled: getStatus(project.data.briefValidation), locked: isLocked(project.data.brief), subLabel: 'QA Checkpoint' },
      { id: 'research', label: 'Pesquisa de Mercado', filled: getStatus(project.data.research), locked: isLocked(project.data.briefValidation), subLabel: '4 relatórios' },
      { id: 'briefRefinement', label: 'Reformulação do Brief', filled: getStatus(project.data.briefRefinement), locked: isLocked(project.data.research), subLabel: 'Integração' },
      { id: 'refinementValidation', label: 'Validação Reformulado', filled: getStatus(project.data.refinementValidation), locked: isLocked(project.data.briefRefinement), subLabel: 'QA Checkpoint' },
      { id: 'curriculum', label: 'Currículo', filled: getStatus(project.data.curriculum), locked: isLocked(project.data.refinementValidation), subLabel: 'Estrutura' },
      { id: 'curriculumApproval', label: 'Aprovação Currículo', filled: getStatus(project.data.curriculumApproval), locked: isLocked(project.data.curriculum), subLabel: 'Checkpoint' },
  ];

  const productionSections: SectionStatus[] = [
      { id: 'modules', label: 'Módulos', filled: getStatus(project.data.modules), locked: isLocked(project.data.curriculumApproval), subLabel: 'Estrutura final' },
      { id: 'lessons', label: 'Aulas', filled: getStatus(project.data.lessons), locked: isLocked(project.data.modules), subLabel: 'Conteúdo' },
      { id: 'assessments', label: 'Assessments', filled: getStatus(project.data.assessments), locked: isLocked(project.data.lessons), subLabel: 'Quizzes' },
      { id: 'reports', label: 'Validação de Qualidade', filled: getStatus(project.data.reports), locked: isLocked(project.data.lessons), subLabel: 'QA Final' },
  ];

  const finalizationSections: SectionStatus[] = [
      { id: 'finalReview', label: 'Revisão Final', filled: getStatus(project.data.finalReview), locked: isLocked(project.data.reports), subLabel: 'Beta test' },
      { id: 'publication', label: 'Publicação', filled: getStatus(project.data.publication), locked: isLocked(project.data.finalReview), subLabel: 'Concluir' },
  ];

  const renderSectionItem = (section: SectionStatus) => (
      <div 
          key={section.id} 
          className={cn(
              "flex items-center justify-between px-4 py-3 transition-colors group relative border-l-2",
              section.locked 
                  ? "opacity-50 cursor-not-allowed bg-muted/20 border-transparent" 
                  : "hover:bg-muted/30 cursor-pointer border-transparent hover:border-[var(--studio-color)]"
          )}
          style={!section.locked ? { '--studio-color': STUDIO_COLOR } as React.CSSProperties : {}}
          onClick={() => !section.locked && onEditSection(section.id)}
      >
          <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                  {section.locked ? (
                      <Icon name="lock" size="size-3" className="text-muted-foreground shrink-0" />
                  ) : section.filled === 5 ? (
                      <Icon name="check-circle" size="size-3" className="text-green-500 shrink-0" />
                  ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                  )}
                  <span className={cn("text-xs font-medium truncate", section.filled === 5 ? "text-foreground" : "text-muted-foreground")}>
                      {section.label}
                  </span>
              </div>
              {section.subLabel && (
                  <span className="text-[10px] text-muted-foreground ml-5 truncate opacity-70">
                      {section.subLabel}
                  </span>
              )}
          </div>
          
          {!section.locked && (
              <div className="flex items-center gap-2 ml-2">
                  <ProgressDots filled={section.filled} />
              </div>
          )}
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-card border-r border-border" style={{ '--studio-color': STUDIO_COLOR } as React.CSSProperties}>
        
        {/* Project Header */}
        <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs uppercase tracking-wider font-bold">
                <Icon name="graduation-cap" size="size-3" /> Novo Curso
            </div>
            <div className="flex items-center justify-between group">
                <h2 className="text-lg font-bold text-foreground truncate">{project.name}</h2>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="pencil" size="size-3" />
                </Button>
            </div>
            <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span>{Math.round(totalProgress)}%</span>
                </div>
                <Progress value={totalProgress} className="h-1.5 bg-muted" style={{ '--primary': STUDIO_COLOR } as React.CSSProperties} />
            </div>
        </div>

        {/* Sections Tree */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <Accordion type="multiple" defaultValue={["structure"]} className="space-y-2">
                
                {/* Phase 1: Structuring */}
                <AccordionItem value="structure" className="border border-border rounded-lg bg-background overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[var(--studio-color)]/10 text-[var(--studio-color)] flex items-center justify-center">
                                <Icon name="clipboard-list-check" size="size-3" />
                            </div>
                            <span className="font-bold text-sm">Estruturação</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-t border-border">
                        <div className="flex flex-col divide-y divide-border/50">
                            {structureSections.map(renderSectionItem)}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Phase 2: Production */}
                <AccordionItem value="production" className="border border-border rounded-lg bg-background overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[var(--studio-color)]/10 text-[var(--studio-color)] flex items-center justify-center">
                                <Icon name="box-open" size="size-3" />
                            </div>
                            <span className="font-bold text-sm">Produção</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-t border-border">
                        <div className="flex flex-col divide-y divide-border/50">
                            {productionSections.map(renderSectionItem)}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Phase 3: Finalization */}
                <AccordionItem value="finalization" className="border border-border rounded-lg bg-background overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[var(--studio-color)]/10 text-[var(--studio-color)] flex items-center justify-center">
                                <Icon name="rocket" size="size-3" />
                            </div>
                            <span className="font-bold text-sm">Finalização</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-t border-border">
                        <div className="flex flex-col divide-y divide-border/50">
                            {finalizationSections.map(renderSectionItem)}
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/10">
            <Button variant="outline" className="w-full justify-between group" onClick={onSaveProject}>
                <span className="flex items-center gap-2">
                    <Icon name="disk" size="size-4" /> Salvar Projeto
                </span>
                <span className="text-[10px] text-muted-foreground">Rascunho</span>
            </Button>
        </div>

    </div>
  );
};
