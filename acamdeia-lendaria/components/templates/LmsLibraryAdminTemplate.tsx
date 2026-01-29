
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { FileUpload } from '../ui/file-upload';
import { Select } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { Section } from '../../types';

// --- Types ---
interface Book {
    id: string;
    originalTitle: string;
    author: string;
    category: string;
    collections: string[];
    languages: {
        pt: boolean;
        en: boolean;
        es: boolean;
    };
    status: 'published' | 'draft' | 'archived';
    cover: string;
    updated: string;
    views: string;
    isbn?: string;
    year?: string;
    pages?: number;
    readingTime?: string;
}

// --- Mock Data ---
const initialBooks: Book[] = [
    { 
        id: '1', 
        originalTitle: "The Psychology of Money", 
        author: "Morgan Housel", 
        status: "published", 
        category: "Finanças", 
        collections: ["Mentes Brilhantes"],
        languages: { pt: true, en: true, es: false },
        cover: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=400&auto=format&fit=crop", 
        updated: "24 Out, 2025", 
        views: "1.2k",
        isbn: "978-0593191743",
        year: "2020",
        pages: 256,
        readingTime: "18"
    },
    { 
        id: '2', 
        originalTitle: "Atomic Habits", 
        author: "James Clear", 
        status: "published", 
        category: "Produtividade", 
        collections: ["Habilidades Core"],
        languages: { pt: true, en: true, es: true },
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop", 
        updated: "Ontem", 
        views: "3.5k" 
    },
    { 
        id: '3', 
        originalTitle: "Supremacy", 
        author: "Parmy Olson", 
        status: "draft", 
        category: "Tecnologia", 
        collections: ["Era da IA"],
        languages: { pt: true, en: true, es: false },
        cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop", 
        updated: "3 dias atrás", 
        views: "0" 
    },
];

interface LmsLibraryAdminTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsLibraryAdminTemplate: React.FC<LmsLibraryAdminTemplateProps> = ({ onNavigate }) => {
    const { toast } = useToast();
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeLangTab, setActiveLangTab] = useState('pt');
    const [editorPreview, setEditorPreview] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const STUDIO_PRIMARY = "#538096";

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === initialBooks.length) setSelectedIds([]);
        else setSelectedIds(initialBooks.map(b => b.id));
    };

    const handleSave = () => {
        toast({
            title: "Acervo Atualizado",
            description: "As alterações foram salvas com sucesso.",
            variant: "success"
        });
        setView('list');
    };

    const handleSyncMetadata = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            toast({
                title: "Metadados Atualizados",
                description: "Dados sincronizados com Google Books.",
                variant: "success"
            });
        }, 1500);
    };

    const LanguageIcons = ({ langs }: { langs: Book['languages'] }) => (
        <div className="flex gap-1.5 items-center">
            <Badge variant="outline" className={cn("text-[9px] px-1 py-0 h-4 border-border", !langs.pt && "opacity-20 grayscale")}>PT</Badge>
            <Badge variant="outline" className={cn("text-[9px] px-1 py-0 h-4 border-border", !langs.en && "opacity-20 grayscale")}>EN</Badge>
            <Badge variant="outline" className={cn("text-[9px] px-1 py-0 h-4 border-border", !langs.es && "opacity-20 grayscale")}>ES</Badge>
        </div>
    );

    const LanguageEditorFields = ({ langCode, label }: { langCode: string, label: string }) => (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1">Título da Versão ({label}) <span className="text-brand-red">*</span></Label>
                        <Input placeholder={`Título em ${label}`} />
                    </div>
                    <div className="space-y-2">
                        <Label>Slug da URL</Label>
                        <div className="flex">
                            <span className="bg-muted border border-r-0 px-3 flex items-center rounded-l-md text-xs font-mono text-muted-foreground">/{langCode}/</span>
                            <Input className="rounded-l-none font-mono text-xs" placeholder="url_do_livro" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Resumo Editorial</Label>
                        <AutosizeTextarea placeholder={`Breve descrição para o catálogo em ${label}...`} className="min-h-[80px]" />
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-bold">Conteúdo do Resumo (Markdown) <span className="text-brand-red">*</span></Label>
                        <div className="flex bg-muted/50 p-0.5 rounded-lg">
                            <Button 
                                size="sm" 
                                variant={!editorPreview ? 'secondary' : 'ghost'} 
                                className="h-7 text-[10px] font-bold uppercase"
                                onClick={() => setEditorPreview(false)}
                            >
                                Editor
                            </Button>
                            <Button 
                                size="sm" 
                                variant={editorPreview ? 'secondary' : 'ghost'} 
                                className="h-7 text-[10px] font-bold uppercase"
                                onClick={() => setEditorPreview(true)}
                            >
                                Preview
                            </Button>
                        </div>
                    </div>
                    {!editorPreview ? (
                        <Textarea 
                            className="min-h-[400px] font-mono text-sm leading-relaxed bg-muted/5 border-border" 
                            placeholder="# Introdução..." 
                        />
                    ) : (
                        <div className="min-h-[400px] p-6 border border-border rounded-md prose dark:prose-invert max-w-none font-serif">
                            <p className="text-muted-foreground italic">Nada para visualizar ainda.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in flex flex-col relative">
            
            {/* Header Dinâmico */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 shrink-0">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {view === 'editor' && (
                            <Button variant="ghost" size="icon" onClick={() => setView('list')}>
                                <Icon name="arrow-left" />
                            </Button>
                        )}
                        <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                             <Icon name="settings-sliders" className="text-brand-gold" /> 
                             {view === 'list' ? "Gestão de Acervo" : "Editor de Livro"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                         {view === 'list' ? (
                             <div className="flex gap-2">
                                 <Button variant="outline" className="gap-2 hidden sm:flex border-dashed">
                                     <Icon name="layers" size="size-3" /> Coleções
                                 </Button>
                                 <Button className="gap-2 bg-brand-gold text-black hover:bg-brand-gold/90 font-bold" onClick={() => setView('editor')}>
                                     <Icon name="plus" size="size-3" /> Novo Livro
                                 </Button>
                             </div>
                         ) : (
                             <div className="flex gap-2">
                                 <Button variant="ghost" onClick={() => setView('list')}>Cancelar</Button>
                                 <Button className="bg-brand-gold text-black hover:bg-brand-gold/90 font-bold gap-2" onClick={handleSave}>
                                     <Icon name="check" size="size-3" /> Salvar Alterações
                                 </Button>
                             </div>
                         )}
                    </div>
                </div>
            </header>

            <main className="flex-1 container max-w-7xl mx-auto px-6 py-8 pb-32">
                
                {view === 'list' && (
                    <div className="space-y-8 animate-fade-in">
                        
                        {/* 1. Quick Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-card/50 border-border">
                                <CardContent className="p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total de Livros</p>
                                        <h3 className="text-2xl font-mono font-bold">124</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                                        <Icon name="book" size="size-5" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border">
                                <CardContent className="p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Publicados</p>
                                        <h3 className="text-2xl font-mono font-bold text-brand-green">89</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center">
                                        <Icon name="check-circle" size="size-5" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border">
                                <CardContent className="p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Rascunhos</p>
                                        <h3 className="text-2xl font-mono font-bold text-brand-orange">12</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                                        <Icon name="pencil" size="size-5" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border">
                                <CardContent className="p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Arquivados</p>
                                        <h3 className="text-2xl font-mono font-bold text-zinc-500">23</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-zinc-500/10 text-zinc-500 flex items-center justify-center">
                                        <Icon name="archive" size="size-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 2. Toolbar */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-3 rounded-xl border border-border shadow-sm">
                            <div className="relative w-full md:w-96">
                                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                                <Input 
                                    placeholder="Buscar por título ou autor..." 
                                    className="pl-10 h-10 bg-muted/20 border-transparent focus:border-brand-gold/50" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Select 
                                    placeholder="Filtrar Categoria"
                                    options={[{label: "Todas", value: "all"}, {label: "Finanças", value: "fin"}, {label: "Produtividade", value: "prod"}]}
                                    className="w-full md:w-40 h-10"
                                />
                                
                                <Separator orientation="vertical" className="h-8 hidden md:block" />
                                
                                <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className={cn("h-8 w-8 transition-all", layoutMode === 'grid' ? "bg-background text-brand-gold shadow-sm" : "text-muted-foreground")}
                                        onClick={() => setLayoutMode('grid')}
                                    >
                                        <Icon name="grid" size="size-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className={cn("h-8 w-8 transition-all", layoutMode === 'list' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                                        onClick={() => setLayoutMode('list')}
                                    >
                                        <Icon name="list" size="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 3. Main Data Area */}
                        {layoutMode === 'list' ? (
                            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm animate-fade-in relative">
                                <Table>
                                    <TableHeader className="bg-muted/40">
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox 
                                                    checked={selectedIds.length === initialBooks.length}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead className="w-[80px]">Capa</TableHead>
                                            <TableHead>Título & Autor</TableHead>
                                            <TableHead>Categoria</TableHead>
                                            <TableHead>Idiomas</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Views</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialBooks.map((book) => (
                                            <TableRow key={book.id} className={cn("hover:bg-muted/20 transition-colors group", selectedIds.includes(book.id) && "bg-brand-gold/5")}>
                                                <TableCell>
                                                    <Checkbox 
                                                        checked={selectedIds.includes(book.id)}
                                                        onCheckedChange={() => toggleSelect(book.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="w-10 h-14 bg-muted rounded border border-border overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                                                        <img src={book.cover} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-foreground hover:text-brand-gold cursor-pointer transition-colors" onClick={() => setView('editor')}>{book.originalTitle}</span>
                                                        <span className="text-xs text-muted-foreground font-serif">{book.author}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider">{book.category}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <LanguageIcons langs={book.languages} />
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant={book.status === 'published' ? 'success' : book.status === 'draft' ? 'warning' : 'secondary'}
                                                        className="text-[9px] uppercase font-bold"
                                                    >
                                                        {book.status === 'published' ? 'No Ar' : book.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right font-mono text-xs">
                                                    {book.views}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu 
                                                        align="right"
                                                        trigger={
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Icon name="menu-dots-vertical" />
                                                            </Button>
                                                        }
                                                    >
                                                        <DropdownMenuItem onClick={() => setView('editor')}><Icon name="pencil" className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                                                        <DropdownMenuItem><Icon name="eye" className="mr-2 h-4 w-4" /> Ver no Site</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem destructive><Icon name="trash" className="mr-2 h-4 w-4" /> Excluir</DropdownMenuItem>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
                                {initialBooks.map((book) => (
                                    <Card key={book.id} className={cn("group overflow-hidden border-border hover:border-brand-gold/50 transition-all hover:shadow-lg cursor-pointer flex flex-col", selectedIds.includes(book.id) && "ring-2 ring-brand-gold")} onClick={() => setView('editor')}>
                                        <div className="aspect-[2/3] bg-muted relative overflow-hidden">
                                            <img src={book.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                            <div className="absolute top-2 left-2">
                                                <Checkbox 
                                                    checked={selectedIds.includes(book.id)}
                                                    onCheckedChange={() => toggleSelect(book.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                            <div className="absolute top-2 right-2">
                                                <Badge variant={book.status === 'published' ? 'success' : 'warning'} className="shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity uppercase text-[9px]">
                                                    {book.status}
                                                </Badge>
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" className="bg-brand-gold text-black font-bold h-8">Editar</Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-4 space-y-1 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{book.category}</p>
                                                <LanguageIcons langs={book.languages} />
                                            </div>
                                            <h4 className="font-bold text-sm leading-tight line-clamp-2 mt-1">{book.originalTitle}</h4>
                                            <p className="text-xs text-muted-foreground font-serif mt-auto pt-2">{book.author}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- EDITOR VIEW --- */}
                {view === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                        <div className="lg:col-span-8 space-y-6">
                            
                            {/* General Info */}
                            <Card className="border-border">
                                <CardHeader className="pb-3 border-b border-border/50">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Icon name="info" size="size-4" className="text-primary" /> Informações Gerais
                                    </CardTitle>
                                    <CardDescription>Dados compartilhados entre todas as versões.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-1 text-xs font-bold uppercase text-muted-foreground tracking-widest">Título Original <span className="text-brand-red">*</span></Label>
                                            <Input placeholder="The Psychology of Money" defaultValue={initialBooks[0].originalTitle} />
                                            <p className="text-[10px] text-muted-foreground">Vincula traduções automaticamente.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-1 text-xs font-bold uppercase text-muted-foreground tracking-widest">Autor <span className="text-brand-red">*</span></Label>
                                            <div className="relative">
                                                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                                                <Input className="pl-10" placeholder="Buscar ou adicionar autor..." defaultValue={initialBooks[0].author} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Categorias</Label>
                                            <div className="flex flex-wrap gap-2 p-2 border border-input rounded-md bg-muted/10 min-h-10">
                                                <Badge variant="secondary" className="gap-1">Finanças <Icon name="cross" size="size-2" /></Badge>
                                                <Badge variant="secondary" className="gap-1">Mindset <Icon name="cross" size="size-2" /></Badge>
                                                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] uppercase font-bold text-primary">+ Novo</Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Coleções</Label>
                                            <div className="flex flex-wrap gap-2 p-2 border border-input rounded-md bg-muted/10 min-h-10">
                                                <Badge variant="outline" className="gap-1 border-brand-gold/30 text-brand-gold bg-brand-gold/5 font-bold">Mentes Brilhantes <Icon name="cross" size="size-2" /></Badge>
                                                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] uppercase font-bold text-primary">+ Nova</Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Language Selection Tabs */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Conteúdo Traduzido</h3>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-bold text-primary uppercase">+ Idioma</Button>
                                </div>
                                
                                <Tabs value={activeLangTab} onValueChange={setActiveLangTab} className="w-full">
                                    <TabsList className="bg-muted/50 p-1 rounded-xl h-12 w-full justify-start gap-2 mb-6">
                                        <TabsTrigger value="pt" className="px-6 flex gap-2 items-center data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                            <span>🇧🇷</span> Português <Icon name="check-circle" size="size-3" className="text-brand-green" />
                                        </TabsTrigger>
                                        <TabsTrigger value="en" className="px-6 flex gap-2 items-center data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                            <span>🇺🇸</span> English <Icon name="check-circle" size="size-3" className="text-brand-green" />
                                        </TabsTrigger>
                                        <TabsTrigger value="es" className="px-6 flex gap-2 items-center data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                            <span>🇪🇸</span> Español <div className="w-2 h-2 rounded-full bg-muted border border-border"></div>
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="pt" className="animate-fade-in">
                                        <LanguageEditorFields langCode="pt" label="Português" />
                                    </TabsContent>
                                    <TabsContent value="en" className="animate-fade-in">
                                        <LanguageEditorFields langCode="en" label="English" />
                                    </TabsContent>
                                    <TabsContent value="es" className="animate-fade-in">
                                        <LanguageEditorFields langCode="es" label="Español" />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        {/* --- SIDEBAR EDITOR --- */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            <Card className="border-border">
                                <CardHeader className="pb-3 border-b border-border/50">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="picture" size="size-4" /> Capa do Livro (2:3)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="space-y-4">
                                        <div className="aspect-[2/3] w-full max-w-[180px] mx-auto bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden group">
                                            {initialBooks[0].cover ? (
                                                <>
                                                    <img src={initialBooks[0].cover} className="w-full h-full object-cover transition-all group-hover:blur-sm" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Button size="sm" variant="secondary" className="font-bold">Alterar</Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <Icon name="cloud-upload" size="size-8" className="text-muted-foreground mx-auto mb-2" />
                                                    <p className="text-[10px] text-muted-foreground font-bold">400x600px recomendado</p>
                                                </div>
                                            )}
                                        </div>
                                        <FileUpload className="h-10 min-h-0" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-muted/5">
                                <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="database" size="size-4" /> Metadados Técnicos
                                    </CardTitle>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 text-primary hover:bg-primary/10" 
                                        onClick={handleSyncMetadata}
                                        disabled={isSyncing}
                                    >
                                        <Icon name="refresh" size="size-3" className={cn(isSyncing && "animate-spin")} />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-4 grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">ISBN-13</Label>
                                        <div className="bg-muted px-2 py-1.5 rounded text-xs font-mono border border-border/50 text-foreground/70">{initialBooks[0].isbn}</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Ano Lançamento</Label>
                                        <div className="bg-muted px-2 py-1.5 rounded text-xs font-mono border border-border/50 text-foreground/70">{initialBooks[0].year}</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Páginas</Label>
                                        <div className="bg-muted px-2 py-1.5 rounded text-xs font-mono border border-border/50 text-foreground/70">{initialBooks[0].pages}</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Tempo Lida</Label>
                                        <div className="bg-muted px-2 py-1.5 rounded text-xs font-mono border border-border/50 text-foreground/70">{initialBooks[0].readingTime} min</div>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-4 py-2 border-t border-border/50 justify-center">
                                    <p className="text-[9px] text-muted-foreground italic">Puxado automaticamente do Google Books.</p>
                                </CardFooter>
                            </Card>

                            <Card className="border-border">
                                <CardHeader className="pb-3 border-b border-border/50">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="headphones" size="size-4" /> Audiobook (Narração IA)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div className="rounded-xl border-2 border-dashed border-border p-6 bg-muted/20 flex flex-col items-center justify-center text-center gap-4 group hover:border-primary/50 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <Icon name="cloud-upload" size="size-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold">Enviar arquivo de áudio</p>
                                            <p className="text-[10px] text-muted-foreground">MP3 ou WAV (max 100MB)</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">Procurar Arquivo</Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Ou URL Externa</Label>
                                        <div className="relative">
                                            <Icon name="link" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-3" />
                                            <Input className="pl-9 h-8 text-xs bg-muted/20" placeholder="https://cdn.provider.com/audio.mp3" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border">
                                <CardHeader className="pb-3 border-b border-border/50">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Configurações Finais</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Status: No Ar</Label>
                                            <p className="text-[10px] text-muted-foreground font-serif italic">Visível para assinantes.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Destaque</Label>
                                            <p className="text-[10px] text-muted-foreground font-serif italic">Exibir no topo.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Audiobook Ativo</Label>
                                            <p className="text-[10px] text-muted-foreground font-serif italic">Player IA ativo.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/10 border-t border-border p-4">
                                    <Button variant="destructive" className="w-full h-9 text-xs font-bold gap-2 shadow-sm">
                                        <Icon name="trash" size="size-3" /> Excluir do Acervo
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            {/* --- BARRA DE AÇÕES EM LOTE --- */}
            {view === 'list' && selectedIds.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-in-right">
                    <div className="bg-foreground text-background rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl ring-4 ring-primary/20">
                        <div className="flex items-center gap-3 pr-6 border-r border-background/20">
                            <Badge className="bg-brand-gold text-black font-bold h-6 w-6 rounded-full flex items-center justify-center p-0">{selectedIds.length}</Badge>
                            <span className="text-sm font-bold uppercase tracking-widest">Selecionados</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-9 text-background hover:bg-background/10 font-bold gap-2">
                                <Icon name="check-circle" size="size-4" /> Publicar
                            </Button>
                            <Button size="sm" variant="ghost" className="h-9 text-background hover:bg-background/10 font-bold gap-2">
                                <Icon name="archive" size="size-4" /> Arquivar
                            </Button>
                            <Button size="sm" variant="ghost" className="h-9 text-brand-red hover:bg-brand-red/10 font-bold gap-2">
                                <Icon name="trash" size="size-4" /> Excluir
                            </Button>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-background/50 hover:text-background"
                            onClick={() => setSelectedIds([])}
                        >
                            <Icon name="cross" size="size-3" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LmsLibraryAdminTemplate;
