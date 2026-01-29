
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AvatarGroup } from './ui/avatar-group'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from './ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ScrollArea } from './ui/scroll-area';
import { Spotlight } from './ui/spotlight';
// Layout Primitives
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter } from './ui/sidebar-primitive';
import { FullCalendar } from './ui/full-calendar';
// Consolidated Primitives (NEW)
import { MetricCard } from './ui/metric-card';
import { ChatMessage } from './ui/chat-message';
import { Timeline } from './ui/timeline';
import { EmptyState } from './ui/empty-state';

const ComponentSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* HERO SECTION EXAMPLE */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white shadow-2xl">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
         {/* Gradient Gradient to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
         
         <div className="relative p-6 md:p-12 lg:p-24 flex flex-col items-center text-center space-y-8 z-10">
            <Badge variant="outline" className="text-primary-foreground border-primary/50 bg-primary/20 backdrop-blur-md px-4 py-1.5 animate-fade-in">
                <Symbol name="star" className="mr-2" />
                Academia Lendária v4.1
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-white max-w-4xl drop-shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
                Crie o <span className="text-gradient-brand">Lendário</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 font-serif max-w-2xl leading-relaxed drop-shadow-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                Um ecossistema de design feito para escalar com elegância, precisão e performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button size="lg" className="text-lg h-14 px-8 shadow-xl shadow-primary/10 w-full sm:w-auto">
                    Começar Agora
                </Button>
                {/* Fixed Button: Added bg-transparent to override light mode default, and hover:bg-white hover:text-black for contrast */}
                <Button size="lg" variant="outline" className="bg-transparent text-lg h-14 px-8 border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                    <Icon name="play" className="mr-2" /> Demo
                </Button>
            </div>
         </div>
      </section>

      {/* --- CONSOLIDATED BUSINESS COMPONENTES --- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
             <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
                <Icon name="briefcase" className="text-primary" /> Componentes de Negócio (Consolidados)
            </h3>
             <Badge variant="secondary">Prontos para Uso</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Metric Cards */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Metric Cards</h4>
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard 
                        label="Receita Total" 
                        value="R$ 14.200" 
                        icon="coins" 
                        trend="+12%" 
                        trendDirection="up" 
                        color="#C9B298"
                    />
                    <MetricCard 
                        label="Churn Rate" 
                        value="2.4%" 
                        icon="user-delete" 
                        trend="-0.5%" 
                        trendDirection="up" 
                        color="#EF4444"
                    />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Chat Bubbles</h4>
                <div className="border border-border rounded-xl p-6 bg-muted/10 space-y-4">
                    <ChatMessage role="user" content="Qual a melhor estratégia para escalar?" timestamp="14:30" />
                    <ChatMessage role="assistant" content="Foque em sistemas, não em esforço. Use a regra 80/20." timestamp="14:31" />
                    <ChatMessage role="assistant" content="" isTyping={true} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
            
            {/* Timeline */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Timeline</h4>
                <div className="border border-border rounded-xl p-6 bg-card">
                    <Timeline items={[
                        { title: "Projeto Iniciado", date: "2 dias atrás", description: "Configuração inicial do repositório.", status: "success", icon: "check" },
                        { title: "Design System", date: "Ontem", description: "Definição de tokens e cores.", status: "active", icon: "palette" },
                        { title: "Aprovação", date: "Hoje", description: "Revisão final pendente.", status: "warning", icon: "clock" },
                    ]} />
                </div>
            </div>

            {/* Empty State */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Empty State</h4>
                <EmptyState 
                    title="Nenhum Projeto"
                    description="Você ainda não criou nenhum projeto. Comece agora para organizar suas ideias."
                    action={<Button><Icon name="plus" className="mr-2" /> Novo Projeto</Button>}
                />
            </div>
        </div>
      </section>

      {/* --- NEW COMPONENTS SHOWCASE: LAYOUT & SCHEDULE --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="flex items-center justify-between border-b border-border pb-4">
             <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
                <Icon name="layout-fluid" className="text-primary" /> Primitivos de Layout
            </h3>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* 1. SIDEBAR PRIMITIVE DEMO */}
            <Card className="overflow-hidden border-border bg-muted/10">
                <CardHeader>
                    <CardTitle>Sidebar Composable</CardTitle>
                    <CardDescription>Primitivo flexível para criar layouts internos de SaaS.</CardDescription>
                </CardHeader>
                <div className="h-[400px] border-t border-border relative">
                    <SidebarProvider defaultExpanded={true}>
                        <div className="flex h-full w-full bg-background">
                            <Sidebar className="border-r border-border">
                                <SidebarHeader className="text-primary font-bold">
                                    <Icon name="rocket" size="size-6" className="mr-2" /> App
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarGroup label="Geral">
                                        <SidebarItem icon="home" active>Dashboard</SidebarItem>
                                        <SidebarItem icon="users-alt">Equipe</SidebarItem>
                                    </SidebarGroup>
                                    <SidebarGroup label="Projetos">
                                        <SidebarItem icon="folder" badge="3">Ativos</SidebarItem>
                                        <SidebarItem icon="archive">Arquivados</SidebarItem>
                                    </SidebarGroup>
                                </SidebarContent>
                                <SidebarFooter>
                                    <div className="flex items-center gap-3">
                                        <Avatar size="sm"><AvatarFallback>AN</AvatarFallback></Avatar>
                                        <div className="text-xs">
                                            <p className="font-bold">Alan Nicolas</p>
                                            <p className="text-muted-foreground">Pro Plan</p>
                                        </div>
                                    </div>
                                </SidebarFooter>
                            </Sidebar>
                            <div className="flex-1 p-6 bg-muted/5">
                                <div className="h-full border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
                                    Conteúdo Principal
                                </div>
                            </div>
                        </div>
                    </SidebarProvider>
                </div>
            </Card>

            {/* 2. FULL CALENDAR DEMO */}
            <Card className="overflow-hidden border-border bg-muted/10">
                <CardHeader>
                    <CardTitle>Full Calendar</CardTitle>
                    <CardDescription>Grade de agendamento completa para dashboards.</CardDescription>
                </CardHeader>
                <div className="h-[400px] border-t border-border p-4 bg-background overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <FullCalendar 
                            events={[
                                { id: '1', title: 'Lançamento', date: new Date(), type: 'primary' },
                                { id: '2', title: 'Reunião', date: new Date(new Date().setDate(new Date().getDate() + 2)), type: 'neutral' },
                                { id: '3', title: 'Prazo Final', date: new Date(new Date().setDate(new Date().getDate() + 5)), type: 'destructive' },
                            ]}
                            className="border-0 shadow-none"
                        />
                    </div>
                </div>
            </Card>

        </div>
      </section>

      {/* --- NEW LEGENDARY SHOWCASE --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="diamond" className="text-primary" /> Elementos "Lendários" (Spotlight & Liquid)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Estes componentes carregam a assinatura visual da marca: profundidade, interação e textura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Spotlight Card 1 */}
            <Spotlight className="rounded-xl border border-border bg-card shadow-sm h-full">
                <div className="p-8 flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="microchip" size="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">IA Generativa</h4>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                            Mova o mouse sobre este card. O efeito "Spotlight" revela uma luz sutil, criando a sensação de que a interface está viva e atenta.
                        </p>
                    </div>
                    <Button variant="link" className="mt-auto px-0 justify-start">Explorar <Icon name="arrow-right" className="ml-2" size="size-3" /></Button>
                </div>
            </Spotlight>

            {/* Spotlight Card 2 */}
            <Spotlight className="rounded-xl border border-border bg-card shadow-sm h-full" color="rgba(0, 199, 190, 0.15)">
                <div className="p-8 flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                        <Icon name="magic-wand" size="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">Interface Líquida</h4>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                            Transições que fluem como água. O sistema reage organicamente a cada interação do usuário.
                        </p>
                    </div>
                    <Button variant="link" className="mt-auto px-0 justify-start">Ver Demo <Icon name="arrow-right" className="ml-2" size="size-3" /></Button>
                </div>
            </Spotlight>

            {/* Spotlight Card 3 */}
            <Spotlight className="rounded-xl border border-border bg-card shadow-sm h-full" color="rgba(168, 85, 247, 0.15)">
                <div className="p-8 flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <Icon name="layers" size="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">Arquitetura Escalar</h4>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                            Componentes construídos para crescer. De um MVP a um SaaS enterprise sem refatoração.
                        </p>
                    </div>
                    <Button variant="link" className="mt-auto px-0 justify-start">Ler Docs <Icon name="arrow-right" className="ml-2" size="size-3" /></Button>
                </div>
            </Spotlight>

        </div>
      </section>

    </div>
  );
};

export default ComponentSection;
