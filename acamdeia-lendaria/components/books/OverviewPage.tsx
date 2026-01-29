
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Card, CardContent } from '../ui/card';

interface OverviewPageProps {
    onNavigate?: (section: Section) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
    
    // --- Dados Mockados ---
    const book = {
        title: "Supremacy",
        subtitle: "AI, ChatGPT, and the Race that Will Change the World",
        author: "Parmy Olson",
        cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop", 
        duration: "26 mins",
        keyIdeas: 8,
        rating: 4.8,
        ratingsCount: 124,
        category: "Tecnologia & Futuro",
        summary: "Supremacy (2024) leva você para dentro da corrida de alto risco para construir a Inteligência Artificial Geral. De inovações revolucionárias aos perigos ocultos dos monopólios de IA, você verá como a busca por máquinas mais inteligentes pode remodelar o mundo – para melhor ou para pior.",
        aboutAuthor: {
            name: "Parmy Olson",
            role: "Jornalista de Tecnologia",
            avatar: "https://i.pravatar.cc/150?u=parmy",
            bio: "Jornalista e autora britânico-americana, conhecida por seu trabalho cobrindo tecnologia e seu impacto na sociedade. Escreveu para Forbes, The Financial Times e Bloomberg."
        },
        tags: ["Inovação", "Ética", "Big Tech", "Geopolítica"],
        whatYouLearn: [
            "Os bastidores da criação do ChatGPT e a guerra corporativa.",
            "Como a OpenAI passou de laboratório sem fins lucrativos para gigante tech.",
            "Os riscos éticos ignorados na corrida pela AGI.",
            "O futuro do trabalho e da criatividade humana."
        ],
        relatedBooks: [
            { id: 1, title: "Empire of AI", author: "Karen Hao", category: "Tecnologia", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=300&auto=format&fit=crop" },
            { id: 2, title: "The AI-fication", author: "Huy Nguyen", category: "Inovação", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=300&auto=format&fit=crop" },
            { id: 3, title: "Vibe Coding", author: "Steve Yegge", category: "Dev", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop" }
        ]
    };

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-background text-foreground font-sans animate-fade-in pb-20">
            
            {/* Navbar Simplificada */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16">
                <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        className="text-muted-foreground hover:text-foreground gap-2 pl-0"
                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
                    >
                        <Icon name="arrow-left" size="size-4" /> Voltar
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Icon name="share" /></Button>
                        <Button variant="ghost" size="icon"><Icon name="bookmark" /></Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl mx-auto px-6 py-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* --- COLUNA ESQUERDA (Capa & Ações) --- */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
                        {/* Capa com Sombra Suave */}
                        <div className="w-full aspect-[2/3] rounded-xl shadow-2xl overflow-hidden border border-border/50 relative group bg-muted">
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>

                        {/* Botões Principais */}
                        <div className="flex flex-col gap-3">
                            <Button 
                                size="lg" 
                                className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 font-bold h-12 text-base shadow-lg shadow-brand-gold/10"
                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}
                            >
                                <Icon name="book-open" className="mr-2" /> Ler Resumo
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="w-full border-border hover:bg-muted font-bold h-12"
                                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_SUMMARY)}
                            >
                                <Icon name="headphones" className="mr-2" /> Ouvir Áudio
                            </Button>
                        </div>

                        {/* Metadados */}
                        <Card className="border-border bg-card shadow-sm">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
                                    <span className="text-muted-foreground flex items-center gap-2"><Icon name="clock" size="size-3" /> Tempo</span>
                                    <span className="font-bold">{book.duration}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
                                    <span className="text-muted-foreground flex items-center gap-2"><Icon name="bulb" size="size-3" /> Ideias</span>
                                    <span className="font-bold">{book.keyIdeas}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Icon name="star" size="size-3" /> Avaliação</span>
                                    <span className="font-bold text-brand-gold flex items-center gap-1">
                                        {book.rating} <span className="text-muted-foreground font-normal">({book.ratingsCount})</span>
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --- COLUNA DIREITA (Conteúdo) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Cabeçalho do Livro */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-brand-gold border-brand-gold/30 bg-brand-gold/5 uppercase tracking-widest text-[10px]">
                                    {book.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Lançamento</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.1]">
                                {book.title}
                            </h1>
                            
                            <p className="text-xl text-muted-foreground font-light leading-relaxed">
                                {book.subtitle}
                            </p>
                            
                            <div className="flex items-center gap-3 pt-2">
                                <Avatar className="h-8 w-8 border border-border">
                                    <AvatarImage src={book.aboutAuthor.avatar} />
                                    <AvatarFallback>PO</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground leading-none">{book.author}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{book.aboutAuthor.role}</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Abas de Conteúdo */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 mb-6 gap-6 overflow-x-auto h-auto">
                                <TabsTrigger 
                                    value="overview" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-bold text-muted-foreground hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent transition-all"
                                >
                                    Visão Geral
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="learning" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-bold text-muted-foreground hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent transition-all"
                                >
                                    O que você vai aprender
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="author" 
                                    className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-bold text-muted-foreground hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground bg-transparent transition-all"
                                >
                                    Sobre o Autor
                                </TabsTrigger>
                            </TabsList>

                            {/* Conteúdo das Abas */}
                            <div className="min-h-[200px]">
                                <TabsContent value="overview" className="space-y-6 animate-fade-in">
                                    <div className="prose dark:prose-invert max-w-none text-muted-foreground font-serif leading-relaxed">
                                        <p>{book.summary}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {book.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:text-foreground cursor-pointer px-3 py-1 font-normal">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="learning" className="space-y-4 animate-fade-in">
                                    <div className="grid gap-3">
                                        {book.whatYouLearn.map((item, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                                                    <Icon name="check" size="size-3" />
                                                </div>
                                                <span className="text-foreground/90 text-sm font-medium leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="author" className="space-y-6 animate-fade-in">
                                    <div className="bg-card border border-border rounded-xl p-6 flex gap-6 items-start">
                                        <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
                                            <AvatarImage src={book.aboutAuthor.avatar} />
                                            <AvatarFallback>PO</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-lg">{book.aboutAuthor.name}</h4>
                                            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                                                {book.aboutAuthor.bio}
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>

                        <Separator />

                        {/* Relacionados (Grid Vertical) */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold font-sans">Você também pode gostar</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {book.relatedBooks.map((related) => (
                                    <div 
                                        key={related.id} 
                                        className="group cursor-pointer flex flex-col gap-3"
                                        onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_OVERVIEW)}
                                    >
                                        <div className="aspect-[2/3] rounded-lg overflow-hidden border border-border relative shadow-sm group-hover:shadow-md transition-all">
                                            <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{related.category}</p>
                                            <h4 className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">{related.title}</h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">{related.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default OverviewPage;
