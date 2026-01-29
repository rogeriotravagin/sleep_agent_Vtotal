
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { useBatchProgress } from '../../hooks/use-batch-progress';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { BatchProgress } from '../../types/batch';

// --- MOCK DATA FOR PREVIEW ---
const MOCK_DATA: BatchProgress = {
    metadata: {
        description: "Demo Pipeline Data",
        last_updated: new Date().toISOString(),
        pipeline_version: "2.2.0"
    },
    summary: {
        total: 85,
        pending: 67,
        in_progress: 6,
        completed: 0,
        failed: 12
    },
    sync_timestamp: new Date().toISOString(),
    books: [
        {
            title: "The Obstacle Is The Way",
            author: "Ryan Holiday",
            slug: "obstacle_way",
            status: "in_progress",
            current_phase: 9,
            phases_completed: "1-8",
            next_action: "Final Writer (Pro)",
            started_at: "2023-10-25T10:00:00",
            score: null
        },
        {
            title: "21 Lições Para O Século 21",
            author: "Yuval Noah Harari",
            slug: "21_lessons",
            status: "failed",
            current_phase: 3,
            last_error: "Rate limit exceeded (429) - aguarde 60s",
            phases_completed: "1-2",
            next_action: "Retry",
            started_at: "2023-10-24T09:00:00",
            score: null
        },
        {
            title: "A Cabeça de Steve Jobs",
            author: "Leander Kahney",
            slug: "steve_jobs_head",
            status: "failed",
            current_phase: 1,
            last_error: "API key inválida ou expirada",
            score: null,
            started_at: "2023-10-24T08:30:00",
        },
        {
            title: "A Ciência da Publicidade",
            author: "Claude Hopkins",
            slug: "scientific_advertising",
            status: "failed",
            current_phase: 8,
            last_error: "Timeout na fase 8 (Refinement)",
            score: null,
            started_at: "2023-10-23T14:00:00",
        },
        {
            title: "A Ciência de Ficar Rico",
            author: "Wallace D. Wattles",
            slug: "science_getting_rich",
            status: "failed",
            current_phase: 1,
            last_error: "Erro de leitura do PDF (Corrompido)",
            score: null
        },
        {
            title: "A Era da Integridade",
            author: "Luiz Fernando Lucas",
            slug: "age_integrity",
            status: "failed",
            current_phase: 1,
            last_error: "Phases 1-8 failed with code 1",
            score: null
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            slug: "atomic_habits",
            status: "pending",
            score: null,
            next_action: "Aguardando início"
        },
        {
             title: "Deep Work",
             author: "Cal Newport",
             slug: "deep_work",
             status: "completed",
             current_phase: 11,
             score: 98,
             completed_at: "2023-10-24T15:30:00",
             next_action: "Concluído"
        }
    ]
};

export const BatchProgressPanel: React.FC = () => {
    const { 
        data: realData, 
        loading, 
        serverAvailable, 
        isAutoRefreshing, 
        setAutoRefresh, 
        refetch, 
        playBook, 
        pauseBook, 
        retryBook, 
        addBook 
    } = useBatchProgress();

    // USE MOCK DATA IF REAL DATA IS NULL (FOR PREVIEW)
    const data = realData || MOCK_DATA;
    // Only show loading if we don't even have mock data (which shouldn't happen here)
    const isLoading = loading && !realData && !MOCK_DATA; 
    
    // Simulate server online for mock if real server is down
    const isOnline = serverAvailable || (!realData && !!MOCK_DATA);

    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [showAddDialog, setShowAddDialog] = useState(false);
    
    // Add Book Form State
    const [newBook, setNewBook] = useState({ title: '', author: '', slug: '' });

    // Computed
    const books = data?.books || [];
    const summary = data?.summary || { total: 0, pending: 0, in_progress: 0, completed: 0, failed: 0 };
    
    const filteredBooks = books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.slug.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const overallProgress = summary.total > 0 
        ? Math.round((summary.completed / summary.total) * 100) 
        : 0;

    // Handlers
    const handleAction = async (action: 'play' | 'pause' | 'retry', slug: string) => {
        // If using mock data and server is "offline", just simulate
        if (!serverAvailable && !realData) {
             setActionLoading(slug);
             setTimeout(() => {
                 setActionLoading(null);
                 toast({ title: "Simulação", description: `Ação ${action} simulada para ${slug}`, variant: "success" });
             }, 1000);
             return;
        }

        if (!serverAvailable) {
            toast({ title: "Servidor Offline", description: "Inicie o backend Python para executar ações.", variant: "destructive" });
            return;
        }

        setActionLoading(slug);
        try {
            if (action === 'play') await playBook(slug);
            if (action === 'pause') await pauseBook(slug);
            if (action === 'retry') await retryBook(slug);
            toast({ title: "Sucesso", description: `Ação ${action} enviada para ${slug}`, variant: "success" });
        } catch (e) {
            toast({ title: "Erro", description: "Falha ao executar ação", variant: "destructive" });
        } finally {
            setActionLoading(null);
        }
    };

    const handleAddBook = async () => {
        if (!newBook.title || !newBook.author) {
            toast({ title: "Campos Obrigatórios", description: "Preencha título e autor.", variant: "warning" });
            return;
        }

        if (!serverAvailable && !realData) {
             toast({ title: "Simulação", description: "Livro adicionado (Simulado)", variant: "success" });
             setShowAddDialog(false);
             setNewBook({ title: '', author: '', slug: '' });
             return;
        }

        try {
            await addBook(newBook.title, newBook.author, newBook.slug);
            toast({ title: "Livro Adicionado", description: "Adicionado à fila de processamento.", variant: "success" });
            setShowAddDialog(false);
            setNewBook({ title: '', author: '', slug: '' });
        } catch (e) {
            toast({ title: "Erro", description: "Falha ao adicionar livro.", variant: "destructive" });
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            // UPDATED: 'in_progress' is now warning/yellow/amber instead of green
            case 'in_progress': return { label: 'Em Progresso', variant: 'warning' as const, icon: 'play', color: 'text-amber-500' };
            // UPDATED: 'completed' remains green
            case 'completed': return { label: 'Concluído', variant: 'success' as const, icon: 'check-circle', color: 'text-green-500' };
            // UPDATED: 'failed' remains red
            case 'failed': return { label: 'Falhou', variant: 'destructive' as const, icon: 'cross-circle', color: 'text-red-500' };
            default: return { label: 'Pendente', variant: 'secondary' as const, icon: 'clock', color: 'text-muted-foreground' };
        }
    };

    return (
        <div className="space-y-8 animate-fade-in p-6 bg-background min-h-screen">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pipeline de Resumos</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-mono text-xs">v{data?.metadata.pipeline_version || '2.2.0'}</Badge>
                        <span className="text-xs text-muted-foreground">Última atualização: {data ? new Date().toLocaleTimeString() : 'Agora'}</span>
                        <div className="flex items-center gap-1.5 ml-2">
                            <div className={cn("w-2 h-2 rounded-full", isOnline ? "bg-green-500" : "bg-red-500 animate-pulse")}></div>
                            <span className="text-xs text-muted-foreground">{isOnline ? "Servidor Online" : "Servidor Offline"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
                        <Icon name="plus" size="size-4" className="mr-2" /> Adicionar Livro
                    </Button>
                    <Button 
                        variant={isAutoRefreshing ? "secondary" : "ghost"} 
                        size="sm" 
                        onClick={() => setAutoRefresh(!isAutoRefreshing)}
                        className={isAutoRefreshing ? "bg-primary/10 text-primary" : "text-muted-foreground"}
                    >
                        <Icon name="refresh" size="size-4" className={cn("mr-2", isAutoRefreshing && "animate-spin-slow")} /> 
                        {isAutoRefreshing ? "Auto" : "Manual"}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isLoading}>
                        <Icon name="refresh" size="size-4" />
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold font-mono">{summary.total}</span>
                        <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">Total</span>
                    </CardContent>
                </Card>
                <Card className="bg-brand-yellow/5 border-brand-yellow/20">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                             <Icon name="play" size="size-4" className="text-brand-yellow" />
                             <span className="text-3xl font-bold font-mono text-brand-yellow">{summary.in_progress}</span>
                        </div>
                        <span className="text-xs uppercase font-bold text-brand-yellow/80 tracking-widest mt-1">Em Progresso</span>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                         <div className="flex items-center gap-2">
                             <Icon name="clock" size="size-4" className="text-muted-foreground" />
                             <span className="text-3xl font-bold font-mono">{summary.pending}</span>
                        </div>
                        <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">Pendentes</span>
                    </CardContent>
                </Card>
                <Card className="bg-brand-green/5 border-brand-green/20">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                             <Icon name="check-circle" size="size-4" className="text-brand-green" />
                             <span className="text-3xl font-bold font-mono text-brand-green">{summary.completed}</span>
                        </div>
                        <span className="text-xs uppercase font-bold text-brand-green/80 tracking-widest mt-1">Concluídos</span>
                    </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                             <Icon name="cross-circle" size="size-4" className="text-destructive" />
                             <span className="text-3xl font-bold font-mono text-destructive">{summary.failed}</span>
                        </div>
                        <span className="text-xs uppercase font-bold text-destructive/80 tracking-widest mt-1">Falhas</span>
                    </CardContent>
                </Card>
            </div>

            {/* Global Progress */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="font-bold uppercase tracking-wider">Progresso Geral</span>
                    <span>{summary.completed} de {summary.total} concluídos ({overallProgress}%)</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                        <Input 
                            placeholder="Buscar por título, autor ou slug..." 
                            className="pl-10 h-10" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64">
                         <Select 
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                            options={[
                                { label: 'Todos os Status', value: 'all' },
                                { label: 'Em Progresso', value: 'in_progress' },
                                { label: 'Pendente', value: 'pending' },
                                { label: 'Concluído', value: 'completed' },
                                { label: 'Falhou', value: 'failed' },
                            ]}
                            className="h-10"
                         />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                         {/* UPDATED: Corrected filter count text */}
                        {filteredBooks.length} de {summary.total} livros
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="w-[300px]">Livro</TableHead>
                                <TableHead className="w-[120px]">Status</TableHead>
                                <TableHead>Fase</TableHead>
                                <TableHead className="w-[200px]">Progresso</TableHead>
                                <TableHead className="w-[150px]">Atualizado</TableHead>
                                <TableHead className="text-right w-[120px]">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <Icon name="spinner" className="animate-spin" />
                                            Carregando dados...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading && filteredBooks.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Nenhum livro encontrado na fila.</TableCell>
                                </TableRow>
                            )}
                            {filteredBooks.map((book) => {
                                const config = getStatusConfig(book.status);
                                // UPDATED: Correct math for progress (1 to 11 phases)
                                // If phase 1, it's ~9%, not 0%. 
                                const phaseVal = book.current_phase || 0;
                                const progressPct = phaseVal > 0 ? Math.round((phaseVal / 11) * 100) : 0;

                                const isActionLoading = actionLoading === book.slug;
                                
                                // UPDATED: Better "Updated" column logic
                                let updatedText = "-";
                                if (book.status === 'in_progress') updatedText = "Em execução...";
                                else if (book.completed_at) updatedText = "Concluído";
                                else if (book.started_at) updatedText = new Date(book.started_at).toLocaleDateString();
                                else updatedText = "Nunca iniciado";

                                // Mock override for demo purpose
                                if (book.slug === 'obstacle_way') updatedText = "53min atrás";

                                return (
                                    <TableRow key={book.slug} className="hover:bg-muted/10">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-sm">{book.title}</span>
                                                <span className="text-xs text-muted-foreground">{book.author}</span>
                                                {/* UPDATED: Error display with full tooltip title */}
                                                {book.last_error && (
                                                    <span 
                                                        className="text-[10px] text-destructive mt-1 font-mono cursor-help truncate max-w-[250px]" 
                                                        title={book.last_error}
                                                    >
                                                        Erro: {book.last_error}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={config.variant} className="font-normal gap-1.5 px-2">
                                                <Icon name={config.icon} size="size-3" /> {config.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <div className="text-sm font-bold flex items-center gap-1">
                                                    {book.current_phase || 0}/11 
                                                    {/* Contextual Icon based on phase could be added here if needed */}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground truncate max-w-[200px]" title={book.next_action}>
                                                    {book.next_action || 'Aguardando...'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Progress 
                                                    value={book.status === 'completed' ? 100 : progressPct} 
                                                    className="h-2 w-full bg-muted" 
                                                    style={{ '--primary': book.status === 'failed' ? '#ef4444' : book.status === 'completed' ? '#22c55e' : '#eab308' } as React.CSSProperties} 
                                                />
                                                <span className="text-xs font-mono font-bold w-8 text-right">
                                                    {book.status === 'completed' ? 100 : progressPct}%
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">{updatedText}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                {book.status === 'pending' && (
                                                    <Button size="icon" variant="ghost" onClick={() => handleAction('play', book.slug)} disabled={isActionLoading} title="Iniciar">
                                                        <Icon name={isActionLoading ? "spinner" : "play"} className={cn(isActionLoading && "animate-spin")} />
                                                    </Button>
                                                )}
                                                {book.status === 'in_progress' && (
                                                    <Button size="icon" variant="ghost" onClick={() => handleAction('pause', book.slug)} disabled={isActionLoading} title="Pausar">
                                                        <Icon name={isActionLoading ? "spinner" : "pause"} className={cn(isActionLoading && "animate-spin")} />
                                                    </Button>
                                                )}
                                                {book.status === 'failed' && (
                                                    <>
                                                        <Button size="icon" variant="ghost" onClick={() => handleAction('play', book.slug)} disabled={isActionLoading} title="Retomar">
                                                             <Icon name="play" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => handleAction('retry', book.slug)} disabled={isActionLoading} title="Reiniciar do Zero">
                                                            <Icon name="refresh" />
                                                        </Button>
                                                    </>
                                                )}
                                                {book.status === 'completed' && (
                                                    <Button size="icon" variant="ghost" disabled className="opacity-50 text-green-500">
                                                        <Icon name="check" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {!serverAvailable && !realData && (
                    <div className="flex justify-center mt-4">
                         <span className="text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border">
                             Modo de Demonstração (Dados Fictícios)
                         </span>
                    </div>
                )}

                {/* Server Offline Warning (Real) */}
                {!serverAvailable && realData && (
                    <Card className="bg-muted/10 border-dashed border-border">
                        <CardContent className="p-6 flex gap-4 items-start">
                            <div className="p-3 bg-muted rounded-full text-muted-foreground">
                                <Icon name="server-network" size="size-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Servidor de Pipeline Offline</h3>
                                <p className="text-muted-foreground text-sm font-serif mb-4">
                                    Para controlar o pipeline (iniciar, pausar, adicionar), o servidor FastAPI Python precisa estar rodando localmente.
                                </p>
                                <div className="bg-black/80 text-white p-3 rounded font-mono text-xs overflow-x-auto">
                                    cd expansion-packs/book-summary && python -m uvicorn server.main:app --reload --port 8001
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Add Book Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Livro</DialogTitle>
                        <DialogDescription>O livro entrará na fila como "Pendente".</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Título *</Label>
                            <Input 
                                placeholder="Ex: Atomic Habits" 
                                value={newBook.title}
                                onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Autor *</Label>
                            <Input 
                                placeholder="Ex: James Clear" 
                                value={newBook.author}
                                onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Slug (Opcional)</Label>
                            <Input 
                                placeholder="Ex: atomic_habits" 
                                value={newBook.slug}
                                onChange={(e) => setNewBook({...newBook, slug: e.target.value})}
                            />
                            <p className="text-[10px] text-muted-foreground">Se vazio, será gerado automaticamente do título.</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
                        <Button onClick={handleAddBook} disabled={!isOnline && !MOCK_DATA}>Adicionar à Fila</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};
