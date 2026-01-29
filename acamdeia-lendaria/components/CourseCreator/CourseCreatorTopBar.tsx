import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface CourseCreatorTopBarProps {
    currentSection: Section;
    onNavigate: (section: Section) => void;
}

export const CourseCreatorTopBar: React.FC<CourseCreatorTopBarProps> = ({ currentSection, onNavigate }) => {
    // Shared Styling Constants for this App Module
    const STUDIO_PRIMARY = "#538096";
    const STUDIO_ACCENT = "#F2EBE4";

    const isActive = (section: Section) => currentSection === section;

    return (
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
          <div className="container flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Logo / Brand Area */}
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: STUDIO_ACCENT, borderColor: `${STUDIO_PRIMARY}30`, color: STUDIO_PRIMARY }}>
                      <Icon name="graduation-cap" size="size-5" />
                  </div>
                  <div>
                      <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                          Course Creator <span className="font-light" style={{ color: STUDIO_PRIMARY }}>Studio</span>
                      </h1>
                      <p className="text-xs text-muted-foreground font-serif">Gestão de Conteúdo Educacional</p>
                  </div>
              </div>

              {/* Navigation & Actions */}
              <div className="flex items-center gap-4">
                  <nav className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                            "h-8", 
                            isActive(Section.TEMPLATE_APP_COURSE_STUDIO) 
                                ? "bg-background text-foreground shadow-sm font-semibold" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        style={isActive(Section.TEMPLATE_APP_COURSE_STUDIO) ? { color: STUDIO_PRIMARY } : {}}
                        onClick={() => onNavigate(Section.TEMPLATE_APP_COURSE_STUDIO)}
                      >
                        Cursos
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                            "h-8",
                            isActive(Section.TEMPLATE_APP_PIPELINE)
                                ? "bg-background text-foreground shadow-sm font-semibold" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        style={isActive(Section.TEMPLATE_APP_PIPELINE) ? { color: STUDIO_PRIMARY } : {}}
                        onClick={() => onNavigate(Section.TEMPLATE_APP_PIPELINE)}
                      >
                        Pipeline
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                            "h-8",
                            isActive(Section.TEMPLATE_APP_FRAMEWORKS)
                                ? "bg-background text-foreground shadow-sm font-semibold" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        style={isActive(Section.TEMPLATE_APP_FRAMEWORKS) ? { color: STUDIO_PRIMARY } : {}}
                        onClick={() => onNavigate(Section.TEMPLATE_APP_FRAMEWORKS)}
                      >
                        Frameworks
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                            "h-8",
                            isActive(Section.TEMPLATE_APP_PERSONAS)
                                ? "bg-background text-foreground shadow-sm font-semibold" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        style={isActive(Section.TEMPLATE_APP_PERSONAS) ? { color: STUDIO_PRIMARY } : {}}
                        onClick={() => onNavigate(Section.TEMPLATE_APP_PERSONAS)}
                      >
                        Personas
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-muted-foreground hover:text-foreground cursor-not-allowed opacity-50"
                        title="Em Breve"
                      >
                        Performance
                      </Button>
                  </nav>
                  
                  <div className="h-6 w-px bg-border hidden md:block"></div>

                  <Button 
                    className="h-9 text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: STUDIO_PRIMARY, boxShadow: `0 10px 15px -3px ${STUDIO_PRIMARY}30` }}
                    onClick={() => onNavigate(Section.TEMPLATE_APP_NEW_COURSE)} // Navigate to New Course Wizard
                  >
                      <Icon name="plus" size="size-3" className="mr-2" /> Novo Curso
                  </Button>
              </div>
          </div>
      </header>
    );
};