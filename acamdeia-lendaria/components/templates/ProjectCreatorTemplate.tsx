
import React, { useState, useEffect } from 'react';
import { Project, Message, CourseData } from '../../types/project-creator';
import { ChatInterface } from '../CourseCreator/ChatInterface';
import { CreationSidebar } from '../CourseCreator/CreationSidebar';
import { SectionEditor } from '../CourseCreator/SectionEditor';
import { Section } from '../../types';
import { CourseCreatorTopBar } from '../CourseCreator/CourseCreatorTopBar';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';

interface ProjectCreatorTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const ProjectCreatorTemplate: React.FC<ProjectCreatorTemplateProps> = ({ onNavigate, currentSection }) => {
    const { toast } = useToast();
    
    // --- State ---
    const [project, setProject] = useState<Project>({
        id: 'new-course-1',
        name: 'Novo Curso',
        type: 'course',
        createdAt: new Date(),
        updatedAt: new Date(),
        currentPhase: 'ideation',
        data: {
            brief: '',
            briefValidation: '',
            research: '',
            briefRefinement: '',
            refinementValidation: '',
            curriculum: '',
            curriculumApproval: '',
            modules: '',
            lessons: '',
            assessments: '',
            reports: '',
            finalReview: '',
            publication: ''
        }
    });

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            role: 'assistant',
            content: "Olá! Sou seu Arquiteto de Cursos IA.\n\nVamos estruturar seu novo produto seguindo o fluxo Lendário. **Qual é o tema principal do curso que você quer criar?**",
            timestamp: new Date()
        }
    ]);

    const [isTyping, setIsTyping] = useState(false);
    
    // View Management
    const [viewMode, setViewMode] = useState<'chat' | 'editor'>('chat');
    const [activeSectionId, setActiveSectionId] = useState<keyof CourseData | null>(null);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    // --- Logic ---

    // Calculate total progress (0-100)
    const calculateProgress = () => {
        const fields = Object.values(project.data) as string[];
        const filledFields = fields.filter(f => f && f.length > 5).length;
        const totalFields = 13; // Total relevant fields in the workflow
        return Math.min(100, Math.round((filledFields / totalFields) * 100));
    };

    // Simulate AI Processing & Extraction for Course Fields
    const processInput = (text: string) => {
        setIsTyping(true);
        const lowerText = text.toLowerCase();
        
        // Mock extraction logic (In real app, this is LLM call)
        let extracted: Partial<CourseData> = {};
        let newName = project.name;
        let aiResponse = "";

        // Heuristics for demo
        if (messages.length === 1) {
            // First user response -> Infer Name & Brief
            if (lowerText.includes("curso")) newName = "Curso " + text.split(" ").slice(0, 3).join(" ");
            else newName = "Curso de " + text.split(" ").slice(0, 3).join(" ");
            
            extracted.brief = `Tema: ${text}\n`;
            aiResponse = `Entendi! Vamos criar o "${newName}".\n\nPara o **Briefing**, me conte: qual a promessa principal e quem é o público-alvo (ICP)?`;
        } else if (project.data.brief.length < 50 && (lowerText.includes("promessa") || lowerText.includes("para") || lowerText.length > 10)) {
            extracted.brief = project.data.brief + "\nPromessa/Público: " + text;
            aiResponse = "Ótimo. Isso define nosso norte. \n\nVou rodar a **Validação do Brief** agora. Enquanto isso, me diga: quais são os principais concorrentes que devemos analisar na **Pesquisa**?";
            extracted.briefValidation = "Brief Validado: Clareza Alta."; // Auto-validate for demo
        } else if (!project.data.research && (lowerText.includes("concorrente") || lowerText.includes("mercado") || lowerText.length > 10)) {
            extracted.research = text;
            aiResponse = "Pesquisa iniciada. \n\nCom base nisso, vamos para o **Currículo**. Você tem ideia dos módulos principais ou quer que eu sugira?";
            extracted.briefRefinement = "Brief refinado com dados de mercado."; // Auto-refine
            extracted.refinementValidation = "Refinamento Aprovado.";
        } else if (!project.data.curriculum) {
            extracted.curriculum = text;
            extracted.curriculumApproval = "Aprovado";
            aiResponse = "Currículo estruturado! \n\nAgora entrando em **Produção**. Vamos detalhar os **Módulos**. Qual o conteúdo chave do Módulo 1?";
        } else if (!project.data.modules) {
            extracted.modules = text;
            aiResponse = "Módulo 1 definido. \n\nE sobre as **Aulas**? Quais são os tópicos da aula 1.1?";
        } else {
             // General update or append
             if (lowerText.includes("aula")) extracted.lessons = (project.data.lessons || "") + "\n" + text;
             else if (lowerText.includes("quiz") || lowerText.includes("projeto")) extracted.assessments = text;
             else {
                 // Append to brief if generic
                 extracted.brief = project.data.brief + "\nNota: " + text;
             }
             aiResponse = "Anotado. Podemos avançar para a próxima etapa ou você quer refinar algo?";
        }

        // Apply updates after delay
        setTimeout(() => {
            if (Object.keys(extracted).length > 0) {
                setProject(prev => ({
                    ...prev,
                    name: newName !== project.name ? newName : prev.name,
                    data: { ...prev.data, ...extracted }
                }));
            }

            const aiMsg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            };
            
            // Add System message if data extracted
            if (Object.keys(extracted).length > 0) {
                const fieldsUpdated = Object.keys(extracted).join(", ");
                setMessages(prev => [
                    ...prev, 
                    { id: 'sys-' + Date.now(), role: 'system', content: `Atualizado: ${fieldsUpdated}`, timestamp: new Date() },
                    aiMsg
                ]);
            } else {
                 setMessages(prev => [...prev, aiMsg]);
            }

            setIsTyping(false);
        }, 1500); // 1.5s delay
    };

    const handleUserMessage = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        processInput(text);
    };

    const handleOpenEditor = (sectionId: keyof CourseData) => {
        setActiveSectionId(sectionId);
        setViewMode('editor');
    };

    const handleSaveEditor = (value: string) => {
        if (!activeSectionId) return;
        
        setProject(prev => ({
            ...prev,
            data: { ...prev.data, [activeSectionId]: value }
        }));

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'system',
            content: `Seção '${activeSectionId}' atualizada manualmente no editor.`,
            timestamp: new Date()
        }]);

        // If it's publication, show success message
        if (activeSectionId === 'publication') {
             toast({
                title: "Projeto Concluído!",
                description: "Seu curso está pronto para lançamento.",
                variant: "success"
             });
        } else {
             toast({
                title: "Alterações Salvas",
                description: "O conteúdo foi atualizado.",
                variant: "default"
             });
        }

        // Return to chat
        setViewMode('chat');
        setActiveSectionId(null);
    };

    const handleSaveProject = () => {
        toast({
            title: "Projeto Salvo",
            description: "O estado atual foi salvo com sucesso.",
            variant: "success"
        });
    };

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden animate-fade-in">
            
            {/* Nav */}
            {onNavigate && currentSection && <CourseCreatorTopBar currentSection={currentSection} onNavigate={onNavigate} />}
            
            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* Sidebar (Desktop: Fixed, Mobile: Toggleable) */}
                <div className={cn(
                    "absolute md:relative z-20 h-full transition-transform duration-300 transform",
                    showSidebarMobile ? "translate-x-0 w-80 shadow-2xl" : "-translate-x-full md:translate-x-0 md:w-80"
                )}>
                    <CreationSidebar 
                        project={project} 
                        onEditSection={handleOpenEditor}
                        totalProgress={calculateProgress()}
                        onSaveProject={handleSaveProject}
                        className="h-full w-full"
                    />
                    
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setShowSidebarMobile(false)}
                        className="md:hidden absolute top-4 right-4 p-2 bg-background/50 rounded-full text-foreground"
                    >
                        <Icon name="cross" size="size-4" />
                    </button>
                </div>

                {/* Mobile Toggle Overlay */}
                {showSidebarMobile && (
                    <div 
                        className="absolute inset-0 bg-black/50 z-10 md:hidden"
                        onClick={() => setShowSidebarMobile(false)}
                    />
                )}

                {/* Main Content Area (Switches between Chat and Editor) */}
                <div className="flex-1 flex flex-col relative w-full">
                    {/* Mobile Header Sidebar Toggle */}
                    <div className="md:hidden p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm">
                         <span className="font-bold text-sm">{project.name}</span>
                         <Button variant="ghost" size="sm" onClick={() => setShowSidebarMobile(true)}>
                             <Icon name="menu-burger" />
                         </Button>
                    </div>

                    {viewMode === 'chat' ? (
                        <ChatInterface 
                            messages={messages} 
                            isTyping={isTyping} 
                            onSendMessage={handleUserMessage}
                            className="flex-1"
                        />
                    ) : (
                        activeSectionId && (
                            <SectionEditor 
                                sectionId={activeSectionId}
                                initialValue={project.data[activeSectionId]}
                                onSave={handleSaveEditor}
                                onCancel={() => {
                                    setViewMode('chat');
                                    setActiveSectionId(null);
                                }}
                            />
                        )
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProjectCreatorTemplate;
