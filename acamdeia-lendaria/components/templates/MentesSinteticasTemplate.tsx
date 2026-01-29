
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

// Import Modular Tabs
import { OverviewTab } from '../mentes/OverviewTab';
import { PsychometricsTab } from '../mentes/PsychometricsTab';
import { WritingStylesTab } from '../mentes/WritingStylesTab';
import { ArtifactsTab } from '../mentes/ArtifactsTab';
import { HistoryTab } from '../mentes/HistoryTab';
import { CloneArenaTab } from '../mentes/CloneArenaTab'; 
import { MindsGallery } from '../mentes/MindsGallery';
import { MINDS } from '../mentes/data';

interface MentesSinteticasTemplateProps {
    onNavigate?: (section: Section) => void;
    initialTab?: string;
}

// Full Profile Mock Data Enhancer (Merges basic data with detailed mock data)
const getFullProfile = (id: string) => {
    const base = MINDS.find(m => m.id === id) || MINDS[0]; // Default to Alan if not found
    
    // Static Extended Data (In a real app this would come from DB)
    // Using Alan's detailed data as template for structure
    return {
        ...base,
        sources: 500,
        created: "Simulação Ativa",
        bigFive: {
            openness: 92,
            conscientiousness: base.stats.conformity + 10,
            extraversion: base.stats.influence,
            agreeableness: base.stats.stability,
            neuroticism: 35
        },
        discBars: base.stats,
        psychometrics: {
            ...base.psychometrics,
            mbti: { code: base.psychometrics.mbti, name: "Cognitive Type", color: "text-purple-400" },
            enneagram: { code: base.psychometrics.enneagram, name: "Core Motivation", variant: "SP/SX", color: "text-blue-400" },
            disc: { code: base.psychometrics.disc, name: "Behavioral Style", color: "text-red-400" },
            stratum: { code: "V", name: "Pensamento Sistêmico", color: "text-brand-gold" },
        },
        behaviors: [
            "Questiona o status quo com base em primeiros princípios",
            "Extrema curiosidade combinada com pragmatismo de execução",
            "Tolerância zero para ineficiência e 'teatro corporativo'",
            "Alterna entre visão filosófica (Why) e detalhe técnico (How)",
            "Valoriza a autonomia e o 'skin in the game'"
        ],
        superpowers: [
            "Zona de Genialidade: Visão Estratégica",
            "Antifragilidade: Beneficiar-se do caos",
            "Síntese: Simplificação de complexidade"
        ],
        kryptonite: [
            "Rotinas monótonas",
            "Interações superficiais",
            "Burocracia"
        ],
        motivation: {
            desire: "Impacto e Legado",
            fear: "Estagnação e Irrelevância"
        },
        voiceDNA: {
            tone: 85,
            formality: 30,
            aggression: 65,
            length: 40,
            keywords: ["Sistema", "Lendário", "Escala", "Legado", "Verdade", "Ruído"]
        },
        writingSamples: {
            twitter: {
                framework: "Contrarian Insight",
                content: `A maioria está tentando ser mais rápida que a IA.\n\nErro crasso.\n\nO jogo não é velocidade. É direção.\n\nEnquanto você corre, eu construo o sistema que corre por mim.`,
                analysis: [
                    { type: "Hook", text: "Desafia uma crença comum." },
                    { type: "Reframing", text: "Muda o foco de Operador para Arquiteto." },
                ]
            },
            linkedin: {
                framework: "Storytelling",
                content: `Hoje, vejo líderes experientes caindo na armadilha da ocupação.\n\nSeu valor não é medido pelo seu suor, mas pela qualidade das suas decisões.`,
                analysis: [
                    { type: "Lição", text: "Suor vs Decisão." }
                ]
            },
            newsletter: {
                framework: "Deep Dive",
                subject: "A arte de morrer",
                content: `Para crescer, você precisa matar quem você é hoje.`,
                analysis: [
                    { type: "Profundidade", text: "Uso de conceitos filosóficos." }
                ]
            }
        },
        artifacts: [
            { name: "Podcast Archive", type: "knowledge", size: "23 Episodes", updated: "2023", tags: ["Audio"] },
            { name: "Frameworks PDF", type: "system", size: "PDF", updated: "2024", tags: ["Produtividade"] },
        ],
        history: [] // Keeping empty for non-Alan profiles for simplicity in this demo
    };
};

// Reuse Alan's history for the demo if ID is Alan
import { HistoryEvent } from '../mentes/HistoryTab';
const alanHistory: HistoryEvent[] = [
    { id: '1990', year: "1990", title: "O Início", description: "Nascimento em 24/03/1990.", type: "origin", details: ["Nascido em Porto Alegre/RS."] },
    { id: '2014', year: "2014", title: "O Despertar", description: "Leitura de 4H Work Week.", type: "pivot", details: ["Mudança de mindset sobre trabalho."] },
    { id: '2018', year: "2018", title: "Primeiro Milhão", description: "Conquista material.", type: "milestone", details: ["Atingiu 1 milhão de reais na conta."] },
    { id: '2020', year: "2020", title: "Vida Lendária", description: "Nascimento do projeto.", type: "pivot", details: ["Início oficial do projeto."] },
];


const MentesSinteticasTemplate: React.FC<MentesSinteticasTemplateProps> = ({ onNavigate, initialTab }) => {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [currentView, setCurrentView] = useState<'gallery' | 'profile' | 'arena'>('gallery');
  const [selectedMindId, setSelectedMindId] = useState<string | null>(null);

  // Check for initialTab prop to switch view
  useEffect(() => {
    if (initialTab === 'arena') {
        setCurrentView('arena');
    }
  }, [initialTab]);

  const handleMindSelect = (id: string) => {
      setSelectedMindId(id);
      setCurrentView('profile');
      setActiveTab('overview');
  };

  const currentProfile = selectedMindId ? getFullProfile(selectedMindId) : getFullProfile('alan');
  
  // Inject history only for Alan in this demo
  if (selectedMindId === 'alan') {
      currentProfile.history = alanHistory as any;
  }

  // System Prompt Mock
  const systemPromptCode = `
# IDENTITY
You are ${currentProfile.name}. ${currentProfile.description}

# CORE PARAMETERS
Tone: ${currentProfile.voiceDNA.tone > 50 ? "Serious" : "Playful"}
Formality: ${currentProfile.voiceDNA.formality > 50 ? "Formal" : "Casual"}
  `.trim();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] font-sans animate-fade-in text-white selection:bg-brand-gold/30 selection:text-white">
      
      {/* --- Top Bar --- */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-50 h-16 flex items-center">
          <div className="container px-4 flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer" onClick={() => setCurrentView('gallery')}>
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                          <Icon name="brain" size="size-4" />
                      </div>
                      <div className="flex flex-col leading-none">
                          <span className="font-bold text-white tracking-tight text-sm uppercase">Mentes Sintéticas</span>
                          <span className="text-[10px] text-zinc-500 font-mono">COGNITIVE CORE</span>
                      </div>
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-4"></div>
                  
                  {/* MAIN NAVIGATION TABS */}
                  <nav className="hidden md:flex items-center gap-1">
                      <button 
                        onClick={() => setCurrentView('gallery')}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                            currentView === 'gallery' 
                                ? "bg-white text-black font-bold" 
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon name="grid" size="size-3" /> Galeria
                      </button>
                      <button 
                        onClick={() => {
                            if (!selectedMindId) setSelectedMindId('alan'); // Default to Alan
                            setCurrentView('profile');
                        }}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                            currentView === 'profile' 
                                ? "bg-white text-black font-bold" 
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon name="user" size="size-3" /> Perfil
                      </button>
                      <button 
                        onClick={() => setCurrentView('arena')}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                            currentView === 'arena' 
                                ? "bg-brand-gold text-black font-bold" 
                                : "text-zinc-400 hover:text-brand-gold hover:bg-brand-gold/10"
                        )}
                      >
                        <Icon name="sword" size="size-3" /> Clone Arena
                      </button>
                  </nav>
              </div>

              <div className="flex items-center gap-4">
                  <Badge variant="outline" className="border-brand-gold/20 text-brand-gold bg-brand-gold/5 hidden sm:flex">
                      System Active
                  </Badge>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                      <Icon name="user" size="size-4" />
                  </div>
              </div>
          </div>
      </header>

      <main className="flex-1 container px-4 py-8 max-w-7xl mx-auto space-y-8">
          
          {currentView === 'gallery' && (
              <MindsGallery onSelectMind={handleMindSelect} />
          )}

          {currentView === 'profile' && (
              <>
                {/* --- Breadcrumb --- */}
                <div className="text-sm text-zinc-500 flex items-center gap-2">
                    <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView('gallery')}>Galeria</span>
                    <Icon name="angle-small-right" size="size-3" />
                    <span className="text-white font-bold">{currentProfile.name}</span>
                </div>

                {/* --- HERO PROFILE --- */}
                <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className={cn("w-32 h-32 rounded-2xl border-2 shadow-[0_0_30px_rgba(201,178,152,0.2)] overflow-hidden shrink-0 group", currentProfile.color.replace('text-', 'border-'))}>
                            <Avatar className="w-full h-full rounded-none group-hover:scale-105 transition-transform duration-500">
                                <AvatarImage src={currentProfile.avatar} className="object-cover" />
                                <AvatarFallback className="bg-zinc-800 text-brand-gold text-2xl font-bold rounded-none">AI</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-4xl font-bold text-white tracking-tight">{currentProfile.name}</h1>
                                        <Badge className="bg-zinc-800 text-white border border-zinc-700 font-bold px-2 py-0.5 text-xs rounded-sm">
                                            {currentProfile.tier}
                                        </Badge>
                                    </div>
                                    <p className="text-lg text-zinc-400 font-serif max-w-2xl">{currentProfile.description}</p>
                                </div>
                                
                                <div className="flex gap-3">
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 h-10 px-6">
                                        <Icon name="settings" size="size-4" /> Config
                                    </Button>
                                    <Button className="bg-white text-black hover:bg-zinc-200 gap-2 font-bold h-10 px-6 shadow-lg">
                                        <Icon name="comment-alt" size="size-4" /> Conversar
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 pt-2">
                                <div className="flex items-center gap-2">
                                    <Icon name="chart-pie" className={currentProfile.color} size="size-4" /> APEX: <span className="text-white font-bold">{currentProfile.score}</span>
                                </div>
                                <div className="h-4 w-px bg-white/10"></div>
                                <div className="flex items-center gap-2">
                                    <Icon name="book-alt" className="text-zinc-600" size="size-4" /> Fontes: <span className="text-white font-bold">{currentProfile.sources}</span>
                                </div>
                                <div className="h-4 w-px bg-white/10"></div>
                                <div className="flex items-center gap-2">
                                    <Icon name="calendar" className="text-zinc-600" size="size-4" /> Status: <span className="text-white font-bold">{currentProfile.created}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TABS --- */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-white/10 mb-8">
                        <TabsList className="bg-transparent h-auto p-0 gap-8 w-full justify-start overflow-x-auto">
                            {[
                                {id: 'overview', label: 'Visão Geral'},
                                {id: 'psychometrics', label: 'Matriz Psicométrica'},
                                {id: 'writing', label: 'Modos de Escrita'},
                                {id: 'history', label: 'História'},
                                {id: 'artifacts', label: 'Artefatos'},
                            ].map((tab) => (
                                <TabsTrigger 
                                  key={tab.id}
                                  value={tab.id} 
                                  className={cn(
                                      "rounded-none border-b-2 border-transparent px-0 pb-4 text-sm font-medium text-zinc-500 hover:text-white transition-all data-[state=active]:border-brand-gold data-[state=active]:text-brand-gold whitespace-nowrap",
                                  )}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Content Areas */}
                    <TabsContent value="overview">
                        <OverviewTab profile={currentProfile} />
                    </TabsContent>
                    
                    <TabsContent value="psychometrics">
                        <PsychometricsTab profile={currentProfile} />
                    </TabsContent>

                    <TabsContent value="writing">
                        <WritingStylesTab profile={currentProfile} />
                    </TabsContent>

                    <TabsContent value="history">
                        {currentProfile.history && currentProfile.history.length > 0 ? (
                            <HistoryTab history={currentProfile.history} />
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
                                <Icon name="clock" className="text-zinc-600 mx-auto mb-4" size="size-8" />
                                <p className="text-zinc-400">Timeline histórica não disponível para esta simulação.</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="artifacts">
                        <ArtifactsTab profile={currentProfile} systemPromptCode={systemPromptCode} />
                    </TabsContent>
                </Tabs>
              </>
          )}

          {currentView === 'arena' && (
              <CloneArenaTab />
          )}

      </main>
    </div>
  );
};

export default MentesSinteticasTemplate;
