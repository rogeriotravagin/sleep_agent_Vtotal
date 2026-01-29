
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useToast } from '../../hooks/use-toast';

interface LmsBookWorkbookTemplateProps {
    onNavigate?: (section: Section) => void;
}

const LmsBookWorkbookTemplate: React.FC<LmsBookWorkbookTemplateProps> = ({ onNavigate }) => {
    const { toast } = useToast();
    
    // --- Mock Data ---
    const book = {
        title: "Essencialismo",
        author: "Greg McKeown",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
        readTime: "15 min",
        category: "Produtividade",
        progress: 10,
    };

    // State for interactive inputs
    const [auditItems, setAuditItems] = useState([
        { id: 1, task: "Reunião de Status Semanal", importance: 3, essential: false },
        { id: 2, task: "Escrever Relatório Mensal", importance: 8, essential: true },
        { id: 3, task: "Checar emails a cada 10min", importance: 1, essential: false },
    ]);
    const [newItem, setNewItem] = useState("");

    const [ninetyRule, setNinetyRule] = useState({
        opportunity: "",
        score: 50,
        decision: ""
    });

    const [reflection, setReflection] = useState("");
    const [constraint, setConstraint] = useState("");

    const handleAddItem = () => {
        if (!newItem.trim()) return;
        setAuditItems([...auditItems, { id: Date.now(), task: newItem, importance: 5, essential: false }]);
        setNewItem("");
    };

    const handleSave = () => {
        toast({
            title: "Progresso Salvo",
            description: "Suas respostas foram gravadas no seu perfil.",
            variant: "success"
        });
    };

    const handleExport = () => {
        toast({
            title: "Exportando PDF...",
            description: "Seu workbook será baixado em instantes.",
        });
    };

    const calculateProgress = () => {
        let filled = 0;
        let total = 4; // 4 main interactive sections
        if (auditItems.length > 3) filled++;
        if (ninetyRule.opportunity && ninetyRule.decision) filled++;
        if (reflection.length > 20) filled++;
        if (constraint.length > 10) filled++;
        return (filled / total) * 100;
    }

    return (
        <div className="flex flex-col h-screen bg-background text-foreground font-sans animate-fade-in relative overflow-hidden">
            
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border h-16 flex-shrink-0">
                <div className="container max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_BOOK_READ)}
                        >
                            <Icon name="arrow-left" size="size-4" />
                        </Button>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm leading-tight text-foreground flex items-center gap-2">
                                <Icon name="file-edit" size="size-3" className="text-brand-gold" /> Workbook: {book.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Exercícios Práticos</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                         <div className="hidden md:flex flex-col items-end mr-4">
                             <span className="text-[10px] font-bold text-muted-foreground uppercase">Conclusão</span>
                             <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                                 <div className="h-full bg-brand-green rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
                             </div>
                         </div>
                         <Button variant="outline" size="sm" onClick={handleExport} className="hidden sm:flex">
                             <Icon name="download" size="size-3" className="mr-2" /> PDF
                         </Button>
                         <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 font-bold" onClick={handleSave}>
                             Salvar
                         </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                
                {/* LEFT SIDEBAR: Context & Book Ref */}
                <aside className="w-80 border-r border-border bg-card hidden lg:flex flex-col p-6 overflow-y-auto">
                    <div className="mb-8 text-center">
                        <div className="aspect-[2/3] w-32 mx-auto rounded-lg shadow-lg overflow-hidden border border-white/10 mb-4 relative group">
                            <img src={book.cover} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-serif font-bold text-lg">{book.title}</h3>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-muted/20 rounded-xl border border-border">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                                <Icon name="quote-right" size="size-3" /> Citação Chave
                            </h4>
                            <p className="font-serif italic text-sm text-muted-foreground leading-relaxed">
                                "Se você não priorizar sua vida, alguém o fará. Essencialismo não é sobre fazer mais coisas em menos tempo. É sobre fazer apenas as coisas certas."
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Conceitos Relacionados</h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-[10px]">Menos, mas melhor</Badge>
                                <Badge variant="secondary" className="text-[10px]">Trade-offs</Badge>
                                <Badge variant="secondary" className="text-[10px]">Poder do Não</Badge>
                                <Badge variant="secondary" className="text-[10px]">Sono</Badge>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT: Workspace */}
                <ScrollArea className="flex-1 bg-background/50">
                    <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 space-y-16">
                        
                        {/* Intro */}
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold">Oficina de Essencialismo</h1>
                            <p className="text-muted-foreground font-serif text-lg leading-relaxed max-w-2xl">
                                Este workbook foi desenhado para ajudá-lo a aplicar os princípios do livro na sua vida real. Não basta ler; é preciso eliminar o trivial para focar no vital.
                            </p>
                        </div>

                        <Separator />

                        {/* EXERCISE 1: The Audit */}
                        <section className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">1</div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold">Auditoria do Não-Essencial</h2>
                                    <p className="text-sm text-muted-foreground font-serif">Liste suas atividades atuais e avalie honestamente sua importância.</p>
                                </div>
                            </div>

                            <Card className="bg-card border-border">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        <div className="col-span-6">Atividade</div>
                                        <div className="col-span-4 text-center">Importância (0-10)</div>
                                        <div className="col-span-2 text-center">Essencial?</div>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {auditItems.map((item, i) => (
                                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                                                <div className="col-span-6 text-sm font-medium">{item.task}</div>
                                                <div className="col-span-4 px-4">
                                                    <Slider 
                                                        value={item.importance} 
                                                        max={10} 
                                                        step={1} 
                                                        className="cursor-pointer"
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            const newItems = [...auditItems];
                                                            newItems[i].importance = val;
                                                            setAuditItems(newItems);
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-span-2 flex justify-center">
                                                    <button 
                                                        onClick={() => {
                                                            const newItems = [...auditItems];
                                                            newItems[i].essential = !newItems[i].essential;
                                                            setAuditItems(newItems);
                                                        }}
                                                        className={cn(
                                                            "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                                                            item.essential ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground text-transparent"
                                                        )}
                                                    >
                                                        <Icon name="check" size="size-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-muted/10 flex gap-2">
                                        <Input 
                                            placeholder="Adicionar nova atividade..." 
                                            value={newItem}
                                            onChange={(e) => setNewItem(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                                            className="bg-background"
                                        />
                                        <Button variant="secondary" onClick={handleAddItem}><Icon name="plus" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* EXERCISE 2: The 90% Rule */}
                        <section className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">2</div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold">A Regra dos 90%</h2>
                                    <p className="text-sm text-muted-foreground font-serif">
                                        Pense em uma oportunidade ou convite atual. Avalie de 0 a 100. Se for menor que 90, a resposta deve ser NÃO (0).
                                    </p>
                                </div>
                            </div>

                            <Card className="bg-muted/5 border-dashed border-border p-6 md:p-8">
                                <div className="space-y-6 max-w-lg mx-auto">
                                    <div className="space-y-2">
                                        <Label>Qual é a oportunidade?</Label>
                                        <Input 
                                            placeholder="Ex: Convite para palestrar no evento X..." 
                                            value={ninetyRule.opportunity}
                                            onChange={(e) => setNinetyRule({...ninetyRule, opportunity: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label>Critério Rígido (0-100)</Label>
                                            <span className={cn(
                                                "text-lg font-bold font-mono",
                                                ninetyRule.score >= 90 ? "text-green-500" : "text-muted-foreground"
                                            )}>{ninetyRule.score}</span>
                                        </div>
                                        <Slider 
                                            value={ninetyRule.score}
                                            onChange={(e) => setNinetyRule({...ninetyRule, score: parseInt(e.target.value)})}
                                            max={100} 
                                            step={5}
                                            className="py-2"
                                        />
                                    </div>

                                    <div className="p-4 rounded-xl bg-background border border-border text-center">
                                        <p className="text-xs uppercase font-bold text-muted-foreground mb-2">Veredito Essencialista</p>
                                        <p className={cn(
                                            "text-2xl font-black",
                                            ninetyRule.score >= 90 ? "text-green-600" : "text-destructive"
                                        )}>
                                            {ninetyRule.score >= 90 ? "SIM ABSOLUTO" : "NÃO É ESSENCIAL"}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </section>

                        {/* EXERCISE 3: Reflection */}
                        <section className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">3</div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold">O Diário da Clareza</h2>
                                    <p className="text-sm text-muted-foreground font-serif">Reflexão profunda para eliminar a neblina mental.</p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <Label className="text-base">Se você só pudesse realizar UMA coisa hoje para sentir que o dia valeu a pena, qual seria?</Label>
                                    <AutosizeTextarea 
                                        className="min-h-[100px] bg-card border-border font-serif text-lg leading-relaxed p-4"
                                        placeholder="Escreva livremente..."
                                        value={reflection}
                                        onChange={(e) => setReflection(e.target.value)}
                                    />
                                </div>
                                
                                <div className="space-y-3">
                                    <Label className="text-base">Qual é o obstáculo ("o caminhante lento") que está impedindo seu progresso?</Label>
                                    <AutosizeTextarea 
                                        className="min-h-[100px] bg-card border-border font-serif text-lg leading-relaxed p-4"
                                        placeholder="Identifique a restrição..."
                                        value={constraint}
                                        onChange={(e) => setConstraint(e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Footer Action */}
                        <div className="pt-8 border-t border-border flex justify-end">
                            <Button size="lg" className="bg-primary text-primary-foreground font-bold shadow-lg" onClick={handleSave}>
                                Concluir Workbook <Icon name="check-circle" className="ml-2" />
                            </Button>
                        </div>

                    </div>
                </ScrollArea>

            </div>
        </div>
    );
};

export default LmsBookWorkbookTemplate;
