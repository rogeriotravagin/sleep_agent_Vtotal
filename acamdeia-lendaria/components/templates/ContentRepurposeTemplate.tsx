
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Slider } from '../ui/slider';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { useClipboard } from '../../hooks/use-clipboard';
import { Section } from '../../types';

// --- Theme Constants ---
const STUDIO_ORANGE = "#F97316";

interface ContentRepurposeTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

const ContentRepurposeTemplate: React.FC<ContentRepurposeTemplateProps> = ({ onNavigate }) => {
    const { toast } = useToast();
    const { copyToClipboard } = useClipboard();
    const [isGenerating, setIsGenerating] = useState(false);
    const [activePlatform, setActivePlatform] = useState("instagram");
    const [inputText, setInputText] = useState("");
    
    // Config State
    const [tone, setTone] = useState("rebelde");
    const [length, setLength] = useState(50); // slider
    
    const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

    // Mock Generated Content
    const generatedContent = {
        instagram: {
            title: "Carrossel: O Fim do Gestor Medíocre",
            slides: [
                "Capa: 80% dos profissionais estão perdendo tempo. Você é um deles?",
                "Slide 1: A verdade brutal: IA não vai te substituir. Alguém usando IA vai.",
                "Slide 2: O erro #1: Tentar competir com robôs em tarefas operacionais.",
                "Slide 3: A solução: O 'Segundo Cérebro'. Delegue o 'como', foque no 'o quê'.",
                "Slide 4: Resultado real: Margem de lucro +40% em 3 meses.",
                "Chamada: Comente 'LENDARIO' para receber o guia."
            ],
            score: 94
        },
        twitter: {
            thread: [
                "1/5 🧵 O erro mais caro que vejo profissionais sêniores cometendo hoje:\n\nIgnorar que a IA já mudou o jogo.\n\nNão é futuro. É agora. E está custando sua relevância. 👇",
                "2/5 A maioria usa o ChatGPT como um Google melhorado.\n\nIsso é como usar uma Ferrari para ir à padaria.\n\nO segredo está nos Agentes Autônomos.",
                "3/5 Imagine ter um estagiário sênior que trabalha 24/7, não reclama e custa $20/mês.\n\nIsso é o que um agente bem configurado faz.",
                "4/5 Pare de tentar ser mais rápido que a máquina. Seja mais estratégico.\n\nA máquina executa. Você orquestra.",
                "5/5 Quer o prompt exato que eu uso para clonar minha gestão?\n\nDeixei no link da bio. É grátis (por enquanto)."
            ],
            score: 88
        },
        linkedin: {
            text: `O paradoxo da produtividade moderna.
            
            Sinto que estamos todos correndo mais rápido, mas chegando no mesmo lugar.
            
            Conversei com um CEO ontem que estava orgulhoso de responder 100 emails por dia.
            
            Eu perguntei: "Quantos desses emails geraram receita?"
            
            Silêncio.
            
            A armadilha da ocupação é viciante. Sentir-se útil é uma droga poderosa.
            
            Mas na era da IA, execução braçal é commodity. O valor migrou para a curadoria, a estratégia e a empatia.
            
            Se o seu trabalho pode ser resumido em um checklist, ele será automatizado.
            
            A pergunta não é "se", mas "quando".
            
            Você está se preparando para ser o piloto ou o passageiro?
            
            #Lideranca #AI #FuturoDoTrabalho #Produtividade`,
            score: 91
        }
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            toast({ title: "Conteúdo Gerado!", description: "3 formatos criados com sucesso.", variant: "success" });
        }, 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground pb-20">
            
            {/* --- TOP BAR --- */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${STUDIO_ORANGE}15`, borderColor: `${STUDIO_ORANGE}30`, color: STUDIO_ORANGE }}>
                            <Icon name="pencil" size="size-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                                Content <span className="font-light" style={{ color: STUDIO_ORANGE }}>Studio</span>
                            </h1>
                            <p className="text-xs text-muted-foreground font-serif">Repurposing Engine</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_CONTENT_STUDIO)}>
                            <Icon name="arrow-left" size="size-3" className="mr-2" /> Voltar ao Dashboard
                        </Button>
                        <div className="h-8 w-px bg-border mx-1"></div>
                        <Button size="sm" className="gap-2 text-white" style={{ backgroundColor: STUDIO_ORANGE }} onClick={handleGenerate}>
                            <Icon name="magic-wand" size="size-3" /> Gerar Tudo
                        </Button>
                    </div>
                </div>
            </header>

            {/* --- MAIN LAYOUT --- */}
            <main className="flex-1 container py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[calc(100vh-80px)]">
                
                {/* LEFT: SOURCE INPUT (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    <Card className="flex-1 flex flex-col border-border shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Icon name="file-import" /> Fonte Original
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="h-20 flex flex-col gap-2 border-dashed border-2 hover:border-[var(--color)] hover:bg-[var(--color)]/5" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
                                    <Icon name="video-camera" size="size-6" className="opacity-50" />
                                    <span className="text-xs">Upload Vídeo</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col gap-2 border-dashed border-2 hover:border-[var(--color)] hover:bg-[var(--color)]/5" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>
                                    <Icon name="link" size="size-6" className="opacity-50" />
                                    <span className="text-xs">Colar URL</span>
                                </Button>
                            </div>
                            
                            <div className="relative flex-1">
                                <AutosizeTextarea 
                                    className="w-full h-full min-h-[300px] resize-none bg-muted/20 border-border p-4 text-sm font-serif leading-relaxed focus:border-[var(--color)]"
                                    placeholder="Ou cole seu texto/roteiro aqui..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}
                                />
                                <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border">
                                    {inputText.length} chars
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Config */}
                    <Card className="border-border">
                        <CardHeader className="pb-3 border-b border-border/50">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Icon name="settings-sliders" /> Refinaria IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>Tom de Voz</span>
                                    <span style={{ color: STUDIO_ORANGE }}>{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {['sábio', 'rebelde', 'mentor'].map(t => (
                                        <button 
                                            key={t}
                                            onClick={() => setTone(t)}
                                            className={cn(
                                                "px-2 py-1.5 rounded border text-xs transition-all capitalize",
                                                tone === t 
                                                    ? "bg-[var(--color)] text-white border-[var(--color)]" 
                                                    : "bg-background border-border hover:bg-muted"
                                            )}
                                            style={tone === t ? { '--color': STUDIO_ORANGE } as React.CSSProperties : {}}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>Densidade</span>
                                    <span>{length}%</span>
                                </div>
                                <Slider 
                                    value={length} 
                                    onChange={(e) => setLength(parseInt(e.target.value))} 
                                    className="accent-[var(--color)]" 
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground">
                                    <span>Conciso</span>
                                    <span>Detalhado</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: OUTPUT PREVIEW (8 cols) */}
                <div className="lg:col-span-8 h-full flex flex-col">
                    <Tabs value={activePlatform} onValueChange={setActivePlatform} className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <TabsList className="bg-muted/50 p-1 h-auto">
                                <TabsTrigger value="instagram" className="px-4 py-2 gap-2 data-[state=active]:text-[#E1306C]"><Icon name="instagram" type="brands" size="size-4" /> Instagram</TabsTrigger>
                                <TabsTrigger value="twitter" className="px-4 py-2 gap-2 data-[state=active]:text-[#1DA1F2]"><Icon name="twitter" type="brands" size="size-4" /> Threads/X</TabsTrigger>
                                <TabsTrigger value="linkedin" className="px-4 py-2 gap-2 data-[state=active]:text-[#0077B5]"><Icon name="linkedin" type="brands" size="size-4" /> LinkedIn</TabsTrigger>
                            </TabsList>
                            
                            {/* Viral Score Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border shadow-sm">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Viral Score</span>
                                <div className="flex items-center gap-1">
                                    <Icon name="flame" className="text-orange-500" size="size-4" />
                                    <span className="font-mono font-bold text-sm">
                                        {activePlatform === 'instagram' ? generatedContent.instagram.score : 
                                         activePlatform === 'twitter' ? generatedContent.twitter.score : 
                                         generatedContent.linkedin.score}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* PREVIEW AREA */}
                        <Card className="flex-1 border-border bg-muted/10 relative overflow-hidden flex flex-col">
                            {/* Mobile Mockup Wrapper */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto custom-scrollbar">
                                
                                {/* INSTAGRAM PREVIEW */}
                                {activePlatform === 'instagram' && (
                                    <div className="w-[320px] bg-background rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col shrink-0">
                                        {/* Header */}
                                        <div className="p-3 flex items-center justify-between border-b border-border/50">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-6 h-6"><AvatarImage src={alanAvatar} /></Avatar>
                                                <span className="text-xs font-bold">academialendaria</span>
                                            </div>
                                            <Icon name="menu-dots" size="size-3" />
                                        </div>
                                        {/* Content - Carousel Slide 1 */}
                                        <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-black text-white p-6 flex flex-col justify-center items-center text-center relative group">
                                            <div className="absolute top-4 right-4 opacity-50"><Icon name="copy" size="size-4" /></div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--color)]" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}>Arrasta pro lado</p>
                                            <h3 className="text-2xl font-black font-sans leading-tight">O Fim do Gestor Medíocre</h3>
                                            <div className="w-12 h-1 bg-[var(--color)] my-6" style={{ '--color': STUDIO_ORANGE } as React.CSSProperties}></div>
                                            <p className="text-sm font-serif opacity-80">Por que 80% do mercado vai desaparecer em 2026.</p>
                                            
                                            {/* Navigation Dots */}
                                            <div className="absolute bottom-4 flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                                            </div>
                                        </div>
                                        {/* Action Bar */}
                                        <div className="p-3">
                                            <div className="flex justify-between mb-2">
                                                <div className="flex gap-3 text-lg">
                                                    <Icon name="heart" /> <Icon name="comment" /> <Icon name="paper-plane" />
                                                </div>
                                                <Icon name="bookmark" />
                                            </div>
                                            <p className="text-xs"><span className="font-bold">academialendaria</span> {generatedContent.instagram.slides[0]}</p>
                                        </div>
                                    </div>
                                )}

                                {/* TWITTER PREVIEW */}
                                {activePlatform === 'twitter' && (
                                    <div className="w-[400px] bg-background rounded-xl border border-border shadow-2xl p-4 space-y-4">
                                        {generatedContent.twitter.thread.map((tweet, i) => (
                                            <div key={i} className="flex gap-3 relative">
                                                {i < generatedContent.twitter.thread.length - 1 && (
                                                    <div className="absolute left-5 top-12 bottom-[-16px] w-0.5 bg-border"></div>
                                                )}
                                                <Avatar className="w-10 h-10 shrink-0"><AvatarImage src={alanAvatar} /></Avatar>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-bold text-sm">Alan Nicolas</span>
                                                        <span className="text-muted-foreground text-xs">@alannicolas</span>
                                                    </div>
                                                    <p className="text-sm whitespace-pre-wrap">{tweet}</p>
                                                    <div className="flex gap-6 text-muted-foreground pt-2">
                                                        <Icon name="comment" size="size-3" />
                                                        <Icon name="refresh" size="size-3" />
                                                        <Icon name="heart" size="size-3" />
                                                        <Icon name="stats" size="size-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* LINKEDIN PREVIEW */}
                                {activePlatform === 'linkedin' && (
                                    <div className="w-[400px] bg-background rounded-xl border border-border shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-border/50 flex gap-3">
                                            <Avatar className="w-10 h-10"><AvatarImage src={alanAvatar} /></Avatar>
                                            <div>
                                                <p className="font-bold text-sm">Alan Nicolas</p>
                                                <p className="text-xs text-muted-foreground">Founder @ Academia Lendária • 2h</p>
                                            </div>
                                        </div>
                                        <div className="p-4 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                                            {generatedContent.linkedin.text}
                                        </div>
                                        {/* Fake Image/Asset */}
                                        <div className="bg-muted aspect-video flex items-center justify-center text-muted-foreground border-y border-border">
                                            <Icon name="picture" size="size-8" className="opacity-20" />
                                        </div>
                                        <div className="p-2 border-t border-border/50 flex justify-between px-4">
                                            <button className="flex items-center gap-1 text-xs text-muted-foreground font-bold hover:bg-muted p-2 rounded"><Icon name="thumbs-up" size="size-4" /> Gostei</button>
                                            <button className="flex items-center gap-1 text-xs text-muted-foreground font-bold hover:bg-muted p-2 rounded"><Icon name="comment" size="size-4" /> Comentar</button>
                                            <button className="flex items-center gap-1 text-xs text-muted-foreground font-bold hover:bg-muted p-2 rounded"><Icon name="share" size="size-4" /> Compartilhar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Copy Controls */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <Button size="sm" className="shadow-lg" onClick={() => {
                                    const content = activePlatform === 'instagram' ? generatedContent.instagram.slides.join('\n') :
                                                   activePlatform === 'twitter' ? generatedContent.twitter.thread.join('\n\n') :
                                                   generatedContent.linkedin.text;
                                    copyToClipboard(content);
                                    toast({ title: "Copiado!", variant: "success" });
                                }}>
                                    <Icon name="copy" className="mr-2 size-3" /> Copiar Texto
                                </Button>
                            </div>
                        </Card>
                    </Tabs>
                </div>
            </main>

        </div>
    );
};

export default ContentRepurposeTemplate;
