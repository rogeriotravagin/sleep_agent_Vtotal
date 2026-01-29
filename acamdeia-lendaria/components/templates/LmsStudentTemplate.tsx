
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Textarea } from '../ui/textarea';

interface LmsStudentTemplateProps {
    onNavigate?: (section: Section) => void;
}

type LessonType = 'video' | 'text' | 'quiz';

interface Lesson {
    id: string;
    title: string;
    duration: string;
    status: 'completed' | 'current' | 'locked';
    type: LessonType;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

const LmsStudentTemplate: React.FC<LmsStudentTemplateProps> = ({ onNavigate }) => {
    // --- Mock Data Enhanced ---
    const courseData = {
        title: "Vibecoding - Apps Sem Código",
        progress: 8, // Percentage
        completedCount: 1,
        totalCount: 12,
        modules: [
            {
                id: 'm1',
                title: "Fundamentos e Onboarding",
                lessons: [
                    { id: 'l1', title: "Além da Venda: O Caminho para se Tornar um Profissional de IA", duration: "10:05", status: 'completed', type: 'video' },
                    { id: 'l2', title: "Fidelização Imediata e Duradoura", duration: "15:20", status: 'current', type: 'video' },
                    { id: 'l3', title: "Prática - Simulação de Kickoff", duration: "12:10", status: 'locked', type: 'text' },
                ]
            },
            {
                id: 'm2',
                title: "Estratégias de Entrega",
                lessons: [
                    { id: 'l4', title: "Entrega Estratégica: One-off ou Contínua", duration: "25:00", status: 'locked', type: 'video' },
                    { id: 'l5', title: "Prática - Simulador de Entregas", duration: "10 min", status: 'locked', type: 'text' },
                    { id: 'l6', title: "Gamificação - Simulador de Entregas", duration: "32:10", status: 'locked', type: 'video' },
                ]
            },
             {
                id: 'm3',
                title: "Gestão e Planejamento",
                lessons: [
                    { id: 'l7', title: "Gestão de Expectativa", duration: "25:00", status: 'locked', type: 'video' },
                    { id: 'l8', title: "Cronograma Infalível", duration: "10 min", status: 'locked', type: 'text' },
                ]
            },
            {
                id: 'm4',
                title: "Apresentação e Crescimento",
                lessons: [
                    { id: 'l9', title: "Pitch de Vendas", duration: "25:00", status: 'locked', type: 'video' },
                ]
            },
        ] as Module[]
    };

    // State for Active Lesson (Mocked switching logic)
    const [activeLessonId, setActiveLessonId] = useState('l2'); // Default to the 'current' one
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    
    // New Interaction States
    const [isFavorited, setIsFavorited] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Find active lesson data
    const getActiveLessonData = () => {
        for (const mod of courseData.modules) {
            const lesson = mod.lessons.find(l => l.id === activeLessonId);
            if (lesson) return { ...lesson, moduleTitle: mod.title };
        }
        // Fallback
        return { 
            id: 'l2', title: "Fidelização Imediata e Duradoura", duration: "15:20", status: 'current', type: 'video' as LessonType, moduleTitle: "Fundamentos e Onboarding" 
        };
    };

    const activeLesson = getActiveLessonData();

    // Mock Content based on type
    const renderContent = () => {
        if (activeLesson.type === 'video') {
            return (
                <div className="w-full space-y-6">
                    {/* Video Container (16:9 Aspect Ratio) - Kept dark for cinema feel */}
                    <div className="relative w-full aspect-video bg-[#050505] group rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        {/* Placeholder Error State (Matching Image) or Video */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                             <div className="text-zinc-600 mb-4">
                                <Icon name="exclamation-triangle" size="size-8" />
                             </div>
                             <p className="text-zinc-500 font-medium">Um erro foi detectado (Código 4).</p>
                             <p className="text-zinc-400 font-bold text-lg mt-2">Este vídeo está sendo processado e ficará disponível em breve.</p>
                        </div>

                        {/* Hover Controls (Fake) */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end px-6 pb-6">
                            <div className="w-full flex items-center gap-6 text-white">
                                <Icon name="play" type="solid" className="cursor-pointer hover:text-primary" />
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group/timeline">
                                    <div className="h-full w-[0%] bg-primary group-hover/timeline:bg-white transition-colors"></div>
                                </div>
                                <span className="text-xs font-mono font-medium">00:00 / {activeLesson.duration}</span>
                                <Icon name="volume" className="cursor-pointer hover:text-white" />
                                <Icon name="settings" className="cursor-pointer hover:text-white" />
                                <Icon name="expand" className="cursor-pointer hover:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Lesson Title & Breadcrumb (Mobile/Tablet view mainly, or desktop header) */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                            <span>{activeLesson.moduleTitle}</span>
                            <Icon name="angle-small-right" size="size-3" />
                            <span>Aula {activeLesson.id.replace('l','')}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{activeLesson.title}</h1>
                    </div>
                </div>
            );
        }

        if (activeLesson.type === 'text') {
            return (
                <div className="w-full max-w-3xl mx-auto bg-[#111] border border-white/5 rounded-xl p-8 md:p-12 shadow-sm">
                    <div className="prose dark:prose-invert prose-lg max-w-none text-zinc-300">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Leitura Obrigatória</span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-white">{activeLesson.title}</h1>
                        <p className="leading-relaxed text-lg mb-6">
                            Conteúdo textual da aula. Aqui você encontra os fundamentos teóricos e links de apoio.
                        </p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex h-screen bg-[#050505] text-[#FAFAFA] font-sans overflow-hidden">
            
            {/* --- MAIN CONTENT (PLAYER) --- */}
            <div className="flex-1 flex flex-col h-full relative z-0">
                
                {/* Top Navigation */}
                <header className="h-16 border-b border-white/5 bg-[#050505] shrink-0 flex items-center justify-between px-6 z-20">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-zinc-400 hover:text-white"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_DETAIL)}
                        >
                            <Icon name="arrow-left" size="size-4" />
                        </Button>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{courseData.title}</span>
                            <span className="text-xs text-zinc-300 font-medium truncate max-w-[300px]">{activeLesson.title}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <Button variant="ghost" className="text-zinc-500 hover:text-white text-xs gap-2">
                             <Icon name="expand" size="size-3" /> Modo Foco
                         </Button>
                    </div>
                </header>

                {/* Content Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505]">
                    <div className={cn("mx-auto w-full p-6 md:p-12 max-w-6xl")}>
                        
                        {/* Dynamic Content Renderer */}
                        {renderContent()}

                        {/* Footer / Context (Below Content) */}
                        <div className="mt-12 space-y-8">
                            
                            {/* Lesson Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8">
                                <div className="flex gap-3">
                                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5 gap-2 h-12 px-6 rounded-lg bg-transparent">
                                        <Icon name="angle-left" size="size-4" /> Anterior
                                    </Button>
                                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5 gap-2 h-12 px-6 rounded-lg bg-transparent">
                                        Próxima <Icon name="angle-right" size="size-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                        <span>Avalie:</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Icon
                                                        name="star"
                                                        type={(hoverRating || rating) >= star ? "solid" : "regular"}
                                                        className={cn(
                                                            "w-4 h-4 transition-colors",
                                                            (hoverRating || rating) >= star ? "text-primary" : "text-zinc-700"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button 
                                        variant="ghost" 
                                        className={cn(
                                            "gap-2 hover:bg-white/5 transition-colors", 
                                            isFavorited ? "text-red-500" : "text-zinc-500 hover:text-red-400"
                                        )}
                                        onClick={() => setIsFavorited(!isFavorited)}
                                    >
                                        <Icon name="heart" type={isFavorited ? "solid" : "regular"} size="size-4" />
                                        {isFavorited ? "Favorito" : "Favoritar"}
                                    </Button>

                                    <Button className="bg-green-600 text-white hover:bg-green-500 font-bold gap-2 h-12 px-8 rounded-lg shadow-lg">
                                        <Icon name="check-circle" size="size-4" /> 
                                        Concluída
                                    </Button>
                                </div>
                            </div>

                            {/* Additional Context Tabs */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="bg-transparent p-0 border-b border-white/5 w-full justify-start gap-8 h-auto rounded-none">
                                    <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-zinc-500 hover:text-white data-[state=active]:border-primary data-[state=active]:text-white bg-transparent">
                                        Visão Geral
                                    </TabsTrigger>
                                    <TabsTrigger value="comments" className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-zinc-500 hover:text-white data-[state=active]:border-primary data-[state=active]:text-white bg-transparent">
                                        Comentários (4)
                                    </TabsTrigger>
                                </TabsList>

                                <div className="pt-8 min-h-[200px]">
                                    <TabsContent value="overview" className="animate-fade-in">
                                        <p className="text-zinc-400 font-serif leading-relaxed max-w-3xl">
                                            Nesta aula, exploramos as estratégias fundamentais para não apenas vender, mas criar um relacionamento duradouro com o cliente. Discutiremos a diferença entre uma transação única e o LTV (Lifetime Value).
                                        </p>
                                    </TabsContent>
                                    <TabsContent value="comments" className="animate-fade-in">
                                        <p className="text-zinc-500 italic">Carregando comentários...</p>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDEBAR (PROGRESS) --- */}
            <aside 
                className={cn(
                    "w-[400px] border-l border-white/5 bg-[#111] flex flex-col transition-all duration-300 z-10",
                    !sidebarOpen && "hidden"
                )}
            >
                {/* Progress Header */}
                <div className="p-6 border-b border-white/5 bg-[#111]">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Seu Progresso</h3>
                    <div className="flex items-end justify-between mb-2">
                        <span className="text-3xl font-black text-white">{courseData.progress}%</span>
                        <span className="text-xs text-zinc-500 font-mono">{courseData.completedCount}/{courseData.totalCount} Aulas</span>
                    </div>
                    <Progress value={courseData.progress} className="h-1 bg-zinc-800" style={{ '--primary': '#ffffff' } as React.CSSProperties} />
                </div>

                {/* Modules List */}
                <ScrollArea className="flex-1">
                    <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full">
                        {courseData.modules.map((module) => (
                            <AccordionItem key={module.id} value={module.id} className="border-b border-white/5 last:border-0">
                                <AccordionTrigger className="px-6 py-5 hover:bg-white/5 hover:no-underline text-left group transition-colors">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{module.title}</p>
                                        <p className="text-[10px] text-zinc-600 font-normal mt-1">{module.lessons.length} aulas</p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="flex flex-col relative">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-[31px] top-0 bottom-0 w-px bg-white/10 z-0"></div>

                                        {module.lessons.map((lesson) => {
                                            const isCompleted = lesson.status === 'completed';
                                            const isCurrent = lesson.status === 'current';
                                            const isLocked = lesson.status === 'locked';

                                            return (
                                                <button 
                                                    key={lesson.id}
                                                    onClick={() => !isLocked && setActiveLessonId(lesson.id)}
                                                    className={cn(
                                                        "relative w-full flex items-start gap-4 p-4 pl-6 text-left transition-colors group z-10",
                                                        isCurrent ? "bg-white/[0.03]" : "hover:bg-white/[0.02]",
                                                        isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                                    )}
                                                >
                                                    {/* Status Icon */}
                                                    <div className={cn(
                                                        "relative z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 bg-[#111] transition-all mt-0.5",
                                                        isCompleted ? "border-green-500 text-green-500" :
                                                        isCurrent ? "border-primary text-primary" :
                                                        "border-zinc-700 text-zinc-700"
                                                    )}>
                                                        {isCompleted && <Icon name="check" size="size-2" className="font-bold" />}
                                                        {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
                                                        {isLocked && <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>}
                                                    </div>

                                                    <div className="flex-1 min-w-0 pt-0.5">
                                                        <p className={cn(
                                                            "text-xs font-medium leading-snug transition-colors",
                                                            isCompleted ? "text-zinc-500" :
                                                            isCurrent ? "text-white font-bold" :
                                                            "text-zinc-400"
                                                        )}>
                                                            {lesson.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1.5 text-zinc-600">
                                                            {lesson.type === 'video' ? <Icon name="play" size="size-3" /> : <Icon name="file-text" size="size-3" />}
                                                            <span className="text-[10px] font-mono">{lesson.duration}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </ScrollArea>
            </aside>

        </div>
    );
};

export default LmsStudentTemplate;
