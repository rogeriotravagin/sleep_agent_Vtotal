
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Separator } from '../ui/separator';

interface LmsCourseDetailTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsCourseDetailTemplate: React.FC<LmsCourseDetailTemplateProps> = ({ onNavigate }) => {
    
    // Mock Data - Course
    const course = {
        title: "Vibecoding - Apps Sem Código",
        author: "Alan Nicolas",
        description: "Aprenda a construir aplicações web completas usando ferramentas No-Code e inteligência artificial. Do zero ao deploy em semanas, não meses.",
        progress: 35,
        totalLessons: 42,
        completedLessons: 12,
        rating: 4.9,
        students: 1240,
        lastUpdated: "Out 2025",
        cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        modules: [
            {
                id: 'm1',
                title: "Módulo 1: Fundamentos",
                duration: "1h 20m",
                lessons: [
                    { id: 'l1', title: "Boas Vindas & Mindset", duration: "10:05", status: 'completed' },
                    { id: 'l2', title: "O que é No-Code?", duration: "15:20", status: 'completed' },
                    { id: 'l3', title: "Configurando o Ambiente", duration: "12:10", status: 'completed' },
                ]
            },
            {
                id: 'm2',
                title: "Módulo 2: Banco de Dados",
                duration: "2h 15m",
                lessons: [
                    { id: 'l4', title: "Estrutura Relacional", duration: "25:00", status: 'in_progress' }, // Next lesson
                    { id: 'l5', title: "Tipos de Dados", duration: "18:45", status: 'locked' },
                    { id: 'l6', title: "Tabelas e Conexões", duration: "32:10", status: 'locked' },
                ]
            },
            {
                id: 'm3',
                title: "Módulo 3: Automações",
                duration: "3h 40m",
                lessons: [
                    { id: 'l7', title: "Lógica de Workflows", duration: "20:00", status: 'locked' },
                    { id: 'l8', title: "Integrando APIs", duration: "45:00", status: 'locked' },
                ]
            }
        ]
    };

    // Mock Data - Resources
    const resources = [
        { id: 1, title: "Slide Deck: Fundamentos No-Code", type: "PDF", size: "2.4 MB", icon: "file-pdf", color: "text-red-400" },
        { id: 2, title: "Comunidade Discord (Vibecoding)", type: "Link", size: "Externo", icon: "discord", color: "text-indigo-400" },
        { id: 3, title: "Template de Banco de Dados", type: "CSV", size: "15 KB", icon: "file-csv", color: "text-green-400" },
        { id: 4, title: "Checklist de Lançamento de App", type: "Notion", size: "Link", icon: "file-check", color: "text-foreground" },
        { id: 5, title: "Código Fonte: Aula 12", type: "ZIP", size: "120 MB", icon: "folder-zip", color: "text-yellow-400" },
    ];

    // Mock Data - Students
    const studentsList = [
        { id: 1, name: "Mariana Costa", email: "mariana@example.com", status: "active", progress: 85, lastAccess: "2h atrás", avatar: "https://i.pravatar.cc/150?u=mc" },
        { id: 2, name: "João Pedro", email: "joao@example.com", status: "risk", progress: 42, lastAccess: "1 dia atrás", avatar: "https://i.pravatar.cc/150?u=jp" },
        { id: 3, name: "Lucas Silva", email: "lucas@example.com", status: "completed", progress: 100, lastAccess: "3 dias atrás", avatar: "https://i.pravatar.cc/150?u=ls" },
        { id: 4, name: "Ana Beatriz", email: "ana@example.com", status: "inactive", progress: 12, lastAccess: "15 dias atrás", avatar: "https://i.pravatar.cc/150?u=ab" },
        { id: 5, name: "Carlos Eduardo", email: "carlos@example.com", status: "active", progress: 68, lastAccess: "5h atrás", avatar: "https://i.pravatar.cc/150?u=ce" },
        { id: 6, name: "Fernanda Lima", email: "fernanda@example.com", status: "active", progress: 55, lastAccess: "10h atrás", avatar: "https://i.pravatar.cc/150?u=fl" },
        { id: 7, name: "Roberto Dias", email: "roberto@example.com", status: "risk", progress: 30, lastAccess: "5 dias atrás", avatar: "https://i.pravatar.cc/150?u=rd" },
    ];

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'active': return { label: 'Online', class: 'bg-green-500/20 text-green-500 border-green-500/30' };
            case 'risk': return { label: 'Ausente', class: 'bg-orange-500/20 text-orange-500 border-orange-500/30' };
            case 'completed': return { label: 'Concluiu', class: 'bg-blue-500/20 text-blue-500 border-blue-500/30' };
            default: return { label: 'Offline', class: 'bg-zinc-500/20 text-zinc-500 border-zinc-500/30' };
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20">
            
            {/* Nav Back */}
            <div className="container max-w-7xl mx-auto px-6 py-6">
                <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-foreground pl-0 gap-2"
                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_GRID)}
                >
                    <Icon name="arrow-left" size="size-4" /> Voltar para Meus Cursos
                </Button>
            </div>

            <main className="container max-w-7xl mx-auto px-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Course Info */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Header */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{course.title}</h1>
                            <p className="text-xl text-muted-foreground font-serif leading-relaxed max-w-3xl">
                                {course.description}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>AN</AvatarFallback>
                                    </Avatar>
                                    <span className="text-foreground">{course.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="star" type="solid" className="text-brand-gold" size="size-3" />
                                    <span className="text-foreground font-bold">{course.rating}</span>
                                    <span>({course.students} alunos)</span>
                                </div>
                                <div>
                                    Atualizado em <span className="text-foreground">{course.lastUpdated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar (Large) */}
                        <div className="bg-card/50 border border-border rounded-xl p-6 space-y-3 shadow-sm">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Seu Progresso</p>
                                    <p className="text-2xl font-bold text-foreground">{course.progress}% <span className="text-sm font-normal text-muted-foreground">Concluído</span></p>
                                </div>
                                <Button 
                                    size="lg" 
                                    className="rounded-full px-8 font-bold bg-foreground text-background hover:bg-foreground/90"
                                    onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_STUDENT)}
                                >
                                    <Icon name="play" type="solid" className="mr-2" /> Continuar: Aula 4
                                </Button>
                            </div>
                            <Progress value={course.progress} className="h-2 bg-muted" style={{ '--primary': '#C9B298' } as React.CSSProperties} />
                            <p className="text-xs text-muted-foreground text-right">{course.completedLessons}/{course.totalLessons} Aulas finalizadas</p>
                        </div>

                        {/* Main Tabs System */}
                        <Tabs defaultValue="content" className="w-full mt-8">
                            <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 mb-6 gap-6 overflow-x-auto">
                                <TabsTrigger 
                                    value="content" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-muted-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent font-bold text-base transition-all"
                                >
                                    Conteúdo do Curso
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="resources" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-muted-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent font-bold text-base transition-all"
                                >
                                    Recursos ({resources.length})
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="students" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-muted-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent font-bold text-base transition-all"
                                >
                                    Alunos ({course.students})
                                </TabsTrigger>
                            </TabsList>

                            {/* TAB 1: CONTENT (SYLLABUS) */}
                            <TabsContent value="content" className="animate-fade-in space-y-6">
                                <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full space-y-4">
                                    {course.modules.map((module) => (
                                        <AccordionItem key={module.id} value={module.id} className="border border-border rounded-xl bg-card/30 overflow-hidden">
                                            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline">
                                                <div className="flex-1 text-left">
                                                    <p className="font-bold text-foreground text-base">{module.title}</p>
                                                    <p className="text-xs text-muted-foreground font-normal mt-1">{module.lessons.length} aulas • {module.duration}</p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-0 border-t border-border bg-muted/5">
                                                {module.lessons.map((lesson, idx) => (
                                                    <div 
                                                        key={lesson.id} 
                                                        className={cn(
                                                            "flex items-center gap-4 p-4 pl-6 border-b border-border last:border-0 transition-colors cursor-pointer group",
                                                            lesson.status === 'locked' ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50",
                                                            lesson.status === 'in_progress' ? "bg-brand-gold/5" : ""
                                                        )}
                                                        onClick={() => lesson.status !== 'locked' && onNavigate && onNavigate(Section.TEMPLATE_LMS_STUDENT)}
                                                    >
                                                        <div className="text-muted-foreground font-mono text-xs w-6">{idx + 1}</div>
                                                        <div className="flex-1">
                                                            <p className={cn("text-sm font-medium", lesson.status === 'in_progress' ? "text-brand-gold" : "text-foreground/80 group-hover:text-foreground")}>
                                                                {lesson.title}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-xs text-muted-foreground font-mono">{lesson.duration}</span>
                                                            {lesson.status === 'completed' && <Icon name="check-circle" type="solid" className="text-green-500" size="size-4" />}
                                                            {lesson.status === 'in_progress' && <Icon name="play-circle" type="solid" className="text-brand-gold" size="size-4" />}
                                                            {lesson.status === 'locked' && <Icon name="lock" className="text-muted-foreground" size="size-4" />}
                                                        </div>
                                                    </div>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>

                            {/* TAB 2: RESOURCES (NEW) */}
                            <TabsContent value="resources" className="animate-fade-in space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {resources.map((res) => (
                                        <div key={res.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:border-brand-gold/30 hover:bg-card transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                                                    <Icon name={res.icon} size="size-6" className={res.color} type={res.type === 'Link' ? 'brands' : 'regular'} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-foreground group-hover:text-brand-gold transition-colors">{res.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="text-[9px] h-4 bg-muted text-muted-foreground border-0">{res.type}</Badge>
                                                        <span className="text-[10px] text-muted-foreground font-mono">{res.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-brand-gold">
                                                    <Icon name={res.type === 'Link' ? 'external-link' : 'download'} size="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* TAB 3: STUDENTS LIST (Modified: Removed Export) */}
                            <TabsContent value="students" className="animate-fade-in space-y-6">
                                
                                {/* Filters Bar (Simplified for Students) */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20 p-3 rounded-xl border border-border">
                                    <div className="relative w-full">
                                        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                                        <Input 
                                            placeholder="Encontrar colega..." 
                                            className="pl-10 bg-background border-input text-sm h-10 focus:border-brand-gold/50" 
                                        />
                                    </div>
                                    {/* Removed Export Button and Status filter as it feels too "admin" */}
                                </div>

                                {/* Students Table */}
                                <div className="border border-border rounded-xl overflow-hidden bg-card">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border">
                                                <tr>
                                                    <th className="px-6 py-4 font-medium tracking-wider">Aluno</th>
                                                    <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                                                    <th className="px-6 py-4 font-medium tracking-wider">Progresso</th>
                                                    <th className="px-6 py-4 font-medium tracking-wider text-right">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {studentsList.map((student) => {
                                                    const statusInfo = getStatusStyle(student.status);
                                                    return (
                                                        <tr key={student.id} className="hover:bg-muted/30 transition-colors group">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar className="h-10 w-10 border border-border">
                                                                        <AvatarImage src={student.avatar} />
                                                                        <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-bold text-foreground group-hover:text-brand-gold transition-colors cursor-pointer">{student.name}</div>
                                                                        <div className="text-xs text-muted-foreground">Aluno</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Badge variant="outline" className={cn("text-[10px] uppercase font-bold border", statusInfo.class)}>
                                                                    {statusInfo.label}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 w-48">
                                                                <div className="flex items-center gap-3">
                                                                    <Progress value={student.progress} className="h-1.5 bg-muted" style={{ '--primary': student.progress === 100 ? '#3B82F6' : '#C9B298' } as React.CSSProperties} />
                                                                    <span className="text-xs font-mono font-bold text-muted-foreground w-8 text-right">{student.progress}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Enviar Mensagem">
                                                                        <Icon name="envelope" size="size-4" />
                                                                    </Button>
                                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Ver Perfil">
                                                                        <Icon name="user" size="size-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-4 border-t border-border bg-muted/10 text-center">
                                        <Button variant="link" className="text-muted-foreground hover:text-foreground text-xs">Carregar mais colegas</Button>
                                    </div>
                                </div>

                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* Right Column: Sidebar Info */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Cover Image Card */}
                        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl relative group">
                            <div className="aspect-[4/3] relative">
                                <img src={course.cover} alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <Badge className="bg-brand-gold text-black font-bold hover:bg-brand-gold mb-2">Dev No-Code</Badge>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_STUDENT)}>
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center pl-1 shadow-xl transform group-hover:scale-110 transition-transform">
                                        <Icon name="play" type="solid" className="text-black text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certificates & Badges */}
                        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                            <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">Certificado</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-muted rounded-lg border border-border flex items-center justify-center text-muted-foreground">
                                    <Icon name="badge-check" size="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Certificado de Conclusão</p>
                                    <p className="text-xs text-muted-foreground">Complete 100% do curso</p>
                                </div>
                            </div>
                        </div>

                        {/* Community */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-xl p-6 space-y-4">
                            <h4 className="font-bold text-sm text-brand-gold uppercase tracking-widest">Comunidade</h4>
                            <p className="text-sm text-muted-foreground">Tire dúvidas e faça networking com outros alunos no nosso Discord exclusivo.</p>
                            <Button variant="outline" className="w-full border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10">Acessar Comunidade</Button>
                        </div>

                        {/* Testimonials */}
                        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">Depoimentos</h4>
                                <div className="flex items-center gap-1 text-brand-gold text-xs font-bold">
                                    <Icon name="star" type="solid" size="size-3" /> 4.9
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Review 1 */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6 border border-border">
                                                <AvatarFallback className="bg-muted text-[9px]">SL</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs font-bold text-foreground">Sarah Lima</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">2d atrás</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-serif leading-relaxed">
                                        "O módulo de banco de dados finalmente fez a ficha cair. Já estou aplicando no meu projeto."
                                    </p>
                                    <div className="flex text-brand-gold gap-0.5">
                                        {[1,2,3,4,5].map(i => <Icon key={i} name="star" type="solid" size="size-3" />)}
                                    </div>
                                </div>
                                
                                <Separator className="bg-border" />

                                {/* Review 2 */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6 border border-border">
                                                <AvatarFallback className="bg-muted text-[9px]">MP</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs font-bold text-foreground">Marcos Paulo</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">1sem atrás</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-serif leading-relaxed">
                                        "A didática é direto ao ponto. Sem enrolação. O melhor investimento que fiz este ano."
                                    </p>
                                    <div className="flex text-brand-gold gap-0.5">
                                        {[1,2,3,4,5].map(i => <Icon key={i} name="star" type="solid" size="size-3" />)}
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground h-8 border border-border">
                                Ver todos os 154 depoimentos
                            </Button>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default LmsCourseDetailTemplate;
