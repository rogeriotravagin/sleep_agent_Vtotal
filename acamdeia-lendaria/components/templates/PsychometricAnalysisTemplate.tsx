import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Symbol } from '../ui/symbol';
import { Button } from '../ui/button';
import { RadarChart, RadarPoint } from '../ui/radar-chart'; // Import Radar Chart

// --- DATA ---
const profiles = [
    {
        id: "mark",
        name: "Mark Manson",
        role: "The Philosopher",
        color: "text-brand-orange",
        bg: "bg-brand-orange/10",
        border: "border-brand-orange/20",
        barColor: "#F97316", // Tailwind Orange-500
        avatar: "MM",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mark_Manson_-_2016.jpg/640px-Mark_Manson_-_2016.jpg", // Wiki Commons
        disc: { d: 85, i: 80, s: 25, c: 55, pattern: "Persuasor (DI)" },
        enneagram: { type: "8w7", name: "Challenger / Enthusiast", instinct: "SO/SX/SP" },
        mbti: { type: "ENTP", name: "Debater", stack: ["Ne", "Ti", "Fe", "Si"] },
        big5: { open: 92, cons: 65, extra: 78, agree: 35, neuro: 45 },
        darkTriad: { narc: 5.0, mach: 4.0, psych: 2.5 },
        iq: "125-135",
        superpower: "Traduzir complexidade em simplicidade vulgar memorável",
        kryptonite: "Impaciência com processos lentos e burocracia"
    },
    {
        id: "naval",
        name: "Naval Ravikant",
        role: "The Sage",
        color: "text-brand-indigo",
        bg: "bg-brand-indigo/10",
        border: "border-brand-indigo/20",
        barColor: "#6366F1", // Tailwind Indigo-500
        avatar: "NR",
        image: "https://pbs.twimg.com/profile_images/1256841238298292232/ycq9qpeU_400x400.jpg", // Twitter Profile
        disc: { d: 85, i: 55, s: 25, c: 65, pattern: "Desenvolvedor Criativo (DI/DC)" },
        enneagram: { type: "5w4", name: "Investigator / Individualist", instinct: "SP/SX/SO" },
        mbti: { type: "INTJ", name: "Architect", stack: ["Ni", "Te", "Fi", "Se"] },
        big5: { open: 92, cons: 75, extra: 35, agree: 45, neuro: 25 },
        darkTriad: { narc: 3.5, mach: 4.0, psych: 2.0 },
        iq: "130-145",
        superpower: "Síntese de complexidade em simplicidade (Tweets/Aforismos)",
        kryptonite: "Impaciência com ineficiência e desperdício de tempo"
    },
    {
        id: "jobs",
        name: "Steve Jobs",
        role: "The Visionary",
        color: "text-foreground", // Black/White
        bg: "bg-zinc-500/10",
        border: "border-zinc-500/20",
        barColor: "#71717A", // Zinc-500
        avatar: "SJ",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
        disc: { d: 85, i: 90, s: 15, c: 0, pattern: "Persuasor Inspirador (DI)" },
        enneagram: { type: "7w8", name: "Enthusiast / Challenger", instinct: "SP/SO/SX" },
        mbti: { type: "INTJ", name: "Architect", stack: ["Ni", "Te", "Fi", "Se"] },
        big5: { open: 99, cons: 45, extra: 60, agree: 15, neuro: 70 },
        darkTriad: { narc: 5.8, mach: 5.5, psych: 3.2 },
        iq: "140-160",
        superpower: "Reality Distortion Field (fazer outros acreditarem no impossível)",
        kryptonite: "Incapacidade de aceitar mediocridade (perfeccionismo tóxico)"
    }
];

// --- HELPER FUNCTIONS FOR RADAR ---
const getBigFiveRadarData = (p: typeof profiles[0]): RadarPoint[] => [
    { label: "O", value: p.big5.open },
    { label: "C", value: p.big5.cons },
    { label: "E", value: p.big5.extra },
    { label: "A", value: p.big5.agree },
    { label: "N", value: p.big5.neuro }
];

const getDiscRadarData = (p: typeof profiles[0]): RadarPoint[] => [
    { label: "D", value: p.disc.d },
    { label: "I", value: p.disc.i },
    { label: "S", value: p.disc.s },
    { label: "C", value: p.disc.c }
];

// --- HELPER COMPONENTS ---

const ProfileHeader: React.FC<{ profile: typeof profiles[0] }> = ({ profile }) => (
    <div className={cn("p-6 rounded-xl border flex flex-col items-center text-center gap-4 transition-all hover:scale-[1.02]", profile.bg, profile.border)}>
        <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
            <AvatarImage src={profile.image} className="object-cover" />
            <AvatarFallback className={cn("font-bold text-xl", profile.color)}>{profile.avatar}</AvatarFallback>
        </Avatar>
        <div>
            <h3 className="font-bold text-xl font-sans">{profile.name}</h3>
            <Badge variant="outline" className={cn("mt-2 border-opacity-50", profile.color, profile.border)}>
                {profile.role}
            </Badge>
        </div>
        <div className="w-full pt-4 border-t border-background/20 space-y-3">
             <div className="text-xs">
                 <span className="font-bold uppercase tracking-wider opacity-70 block mb-1">Superpower</span>
                 <p className="font-serif italic leading-tight">{profile.superpower}</p>
             </div>
             <div className="text-xs">
                 <span className="font-bold uppercase tracking-wider opacity-70 block mb-1">Kryptonite</span>
                 <p className="font-serif italic leading-tight text-muted-foreground">{profile.kryptonite}</p>
             </div>
        </div>
    </div>
);

const ComparisonRow = ({ label, profiles, renderValue }: { label: string, profiles: any[], renderValue: (p: any) => React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b border-border/50 items-center last:border-0">
        <div className="font-bold text-sm text-muted-foreground uppercase tracking-wider md:col-span-1 flex items-center gap-2">
            <Icon name="arrow-right" size="size-3" className="opacity-50" /> {label}
        </div>
        {profiles.map((p) => (
            <div key={p.id} className="md:col-span-1">
                {renderValue(p)}
            </div>
        ))}
    </div>
);

const ProgressBar = ({ value, color, label }: { value: number, color: string, label?: string }) => (
    <div className="w-full">
        <div className="flex justify-between text-xs mb-1 font-mono">
            <span>{label}</span>
            <span className="font-bold">{value}/100</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
                className="h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${value}%`, backgroundColor: color }}
            ></div>
        </div>
    </div>
);

// --- CONTENT BLOCKS (Reusable for Tabs & List) ---

const DiscContent = () => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>DISC - Comportamento Observável</CardTitle>
                <Badge variant="outline">Radar View</Badge>
            </div>
        </CardHeader>
        <CardContent>
            {/* Visual Charts Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {profiles.map(p => (
                    <div key={p.id} className="flex flex-col items-center">
                        <RadarChart data={getDiscRadarData(p)} width={140} height={140} color={p.barColor} />
                        <span className="text-xs font-bold mt-2 text-muted-foreground">{p.name}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <ComparisonRow 
                label="Padrão" 
                profiles={profiles} 
                renderValue={(p) => <Badge variant="secondary" className="font-bold">{p.disc.pattern}</Badge>} 
                />
                <ComparisonRow 
                label="Dominância (D)" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.disc.d} color="#EF4444" />} 
                />
                <ComparisonRow 
                label="Influência (I)" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.disc.i} color="#EAB308" />} 
                />
                <ComparisonRow 
                label="Estabilidade (S)" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.disc.s} color="#22C55E" />} 
                />
                <ComparisonRow 
                label="Conformidade (C)" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.disc.c} color="#3B82F6" />} 
                />
            </div>
        </CardContent>
    </Card>
);

const EnneagramContent = () => (
    <Card>
        <CardHeader><CardTitle>Eneagrama - Motivações Core</CardTitle></CardHeader>
        <CardContent>
            <div className="space-y-2">
                <ComparisonRow 
                label="Tipo Principal" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold font-mono text-primary">{p.enneagram.type}</span>
                        <span className="text-xs text-muted-foreground">{p.enneagram.name}</span>
                    </div>
                )} 
                />
                <ComparisonRow 
                label="Instinto" 
                profiles={profiles} 
                renderValue={(p) => <Badge variant="outline" className="font-mono">{p.enneagram.instinct}</Badge>} 
                />
            </div>
        </CardContent>
    </Card>
);

const MbtiContent = () => (
    <Card>
        <CardHeader><CardTitle>MBTI - Processamento Cognitivo</CardTitle></CardHeader>
        <CardContent>
            <div className="space-y-2">
                <ComparisonRow 
                label="Tipo" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold font-mono tracking-wider">{p.mbti.type}</span>
                        <span className="text-xs text-muted-foreground">{p.mbti.name}</span>
                    </div>
                )} 
                />
                <ComparisonRow 
                label="Stack Cognitivo" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex gap-2">
                        {p.mbti.stack.map((fn: string, i: number) => (
                            <Badge key={i} variant="secondary" className={cn(
                                "text-xs font-mono",
                                i === 0 && "bg-primary/20 text-primary border-primary/20"
                            )}>{fn}</Badge>
                        ))}
                    </div>
                )} 
                />
            </div>
        </CardContent>
    </Card>
);

const StratumContent = () => (
    <Card>
        <CardHeader><CardTitle>Estrato Cognitivo (Jaques)</CardTitle></CardHeader>
        <CardContent>
             <div className="space-y-2">
                <ComparisonRow 
                    label="Nível" 
                    profiles={profiles} 
                    renderValue={(p) => {
                        let level = "IV-V";
                        if (p.id === 'naval' || p.id === 'jobs') level = "VI-VII";
                        return <Badge variant="outline" className="font-mono">{level}</Badge>;
                    }} 
                />
                <ComparisonRow 
                    label="Horizonte Temporal" 
                    profiles={profiles} 
                    renderValue={(p) => {
                        let horizon = "2-10 anos";
                        if (p.id === 'naval' || p.id === 'jobs') horizon = "10-50 anos";
                        return <span className="text-sm font-bold">{horizon}</span>;
                    }} 
                />
                 <ComparisonRow 
                    label="Processamento" 
                    profiles={profiles} 
                    renderValue={(p) => {
                        let type = "Parallel";
                        if (p.id === 'naval') type = "Systematic";
                        if (p.id === 'jobs') type = "Systematic/Parallel";
                        return <span className="text-xs text-muted-foreground uppercase">{type}</span>;
                    }} 
                />
            </div>
        </CardContent>
    </Card>
);

const BigFiveContent = () => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Big Five (OCEAN)</CardTitle>
                <Badge variant="outline">Radar View</Badge>
            </div>
        </CardHeader>
        <CardContent>
            {/* Visual Charts Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {profiles.map(p => (
                    <div key={p.id} className="flex flex-col items-center">
                        <RadarChart data={getBigFiveRadarData(p)} width={140} height={140} color={p.barColor} />
                        <span className="text-xs font-bold mt-2 text-muted-foreground">{p.name}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <ComparisonRow 
                label="Abertura (Openness)" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.big5.open} color={p.barColor} />} 
                />
                <ComparisonRow 
                label="Conscienciosidade" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.big5.cons} color={p.barColor} />} 
                />
                <ComparisonRow 
                label="Extroversão" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.big5.extra} color={p.barColor} />} 
                />
                <ComparisonRow 
                label="Agradabilidade" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.big5.agree} color={p.barColor} />} 
                />
                <ComparisonRow 
                label="Neuroticismo" 
                profiles={profiles} 
                renderValue={(p) => <ProgressBar value={p.big5.neuro} color={p.barColor} />} 
                />
            </div>
        </CardContent>
    </Card>
);

const DarkTriadContent = () => (
    <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
                <Icon name="skull" /> Dark Triad
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <ComparisonRow 
                label="Narcisismo" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-destructive/20">
                            <div className="h-full bg-destructive" style={{ width: `${(p.darkTriad.narc / 7) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-destructive">{p.darkTriad.narc}/7</span>
                    </div>
                )} 
                />
                <ComparisonRow 
                label="Maquiavelismo" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-destructive/20">
                            <div className="h-full bg-destructive" style={{ width: `${(p.darkTriad.mach / 7) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-destructive">{p.darkTriad.mach}/7</span>
                    </div>
                )} 
                />
                <ComparisonRow 
                label="Psicopatia" 
                profiles={profiles} 
                renderValue={(p) => (
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-destructive/20">
                            <div className="h-full bg-destructive" style={{ width: `${(p.darkTriad.psych / 7) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-destructive">{p.darkTriad.psych}/7</span>
                    </div>
                )} 
                />
            </div>
        </CardContent>
    </Card>
);

const PsychometricAnalysisTemplate: React.FC = () => {
  const [viewMode, setViewMode] = useState<'tabs' | 'list'>('tabs');

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in pb-20">
      
      {/* HEADER */}
      <header className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4 text-center space-y-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest px-4 py-1">
                  High-Level Analysis
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Matriz <span className="text-primary">Psicométrica</span>
              </h1>
              <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto mb-8">
                  Análise comparativa profunda dos modelos mentais, motivações e comportamentos de três mentes lendárias.
              </p>
              
              {/* VIEW SWITCHER */}
              <div className="flex justify-center gap-2 p-1 bg-muted/50 rounded-lg w-fit mx-auto">
                  <Button 
                    size="sm" 
                    variant={viewMode === 'tabs' ? 'default' : 'ghost'} 
                    onClick={() => setViewMode('tabs')}
                    className="gap-2"
                  >
                      <Icon name="tabs" size="size-4" /> Abas (Focado)
                  </Button>
                  <Button 
                    size="sm" 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    onClick={() => setViewMode('list')}
                    className="gap-2"
                  >
                      <Icon name="list" size="size-4" /> Lista (Relatório)
                  </Button>
              </div>
          </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12">
          
          {/* 1. PROFILE OVERVIEW (Always Visible) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {profiles.map(p => <ProfileHeader key={p.id} profile={p} />)}
          </div>

          {/* 2. DATA DISPLAY */}
          {viewMode === 'tabs' ? (
              <Tabs defaultValue="disc" className="w-full">
                  <div className="flex justify-center mb-8">
                      <TabsList className="bg-muted/50 p-1 h-auto flex-wrap justify-center gap-2">
                          <TabsTrigger value="disc" className="px-6 py-2">DISC</TabsTrigger>
                          <TabsTrigger value="enneagram" className="px-6 py-2">Eneagrama</TabsTrigger>
                          <TabsTrigger value="mbti" className="px-6 py-2">MBTI</TabsTrigger>
                          <TabsTrigger value="stratum" className="px-6 py-2">Estrato</TabsTrigger>
                          <TabsTrigger value="big5" className="px-6 py-2">Big Five</TabsTrigger>
                          <TabsTrigger value="dark" className="px-6 py-2 text-destructive font-bold bg-destructive/5">Dark Triad</TabsTrigger>
                      </TabsList>
                  </div>

                  <TabsContent value="disc" className="space-y-6 animate-fade-in"><DiscContent /></TabsContent>
                  <TabsContent value="enneagram" className="space-y-6 animate-fade-in"><EnneagramContent /></TabsContent>
                  <TabsContent value="mbti" className="space-y-6 animate-fade-in"><MbtiContent /></TabsContent>
                  <TabsContent value="stratum" className="space-y-6 animate-fade-in"><StratumContent /></TabsContent>
                  <TabsContent value="big5" className="space-y-6 animate-fade-in"><BigFiveContent /></TabsContent>
                  <TabsContent value="dark" className="space-y-6 animate-fade-in"><DarkTriadContent /></TabsContent>
              </Tabs>
          ) : (
              <div className="space-y-12 animate-fade-in">
                  <DiscContent />
                  <EnneagramContent />
                  <MbtiContent />
                  <StratumContent />
                  <BigFiveContent />
                  <DarkTriadContent />
              </div>
          )}

      </main>
    </div>
  );
};

export default PsychometricAnalysisTemplate;