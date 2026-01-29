
import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Separator } from '../ui/separator';
import { Spotlight } from '../ui/spotlight';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  online: boolean;
  score: number;
  xp: string;
  joinedDate: string;
  level: number;
  rank: string;
  badges: string[];
  headline: string;
  bio: string;
}

const membersData: Member[] = [
  { 
    id: '4', 
    name: "ALAN NICOLAS", 
    email: "alan@lendaria.com", 
    role: "FOUNDER & ARCHITECT", 
    avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj", 
    online: true, 
    score: 9.99, 
    xp: "1.2M",
    joinedDate: "JAN 2020", 
    level: 99, 
    rank: "ARQUITETO SUPREMO", 
    badges: ["infinity", "bolt", "star"],
    headline: "Imortalizando legados através de sistemas e IA.",
    bio: "Visionário focado em produtividade extrema e arquitetura de negócios exponenciais."
  },
  { 
    id: '2', 
    name: "JOSE ARLINDO DE SOUSA JR", 
    email: "jose@lendaria.com", 
    role: "AI SPECIALIST", 
    avatar: "https://i.pravatar.cc/150?u=jose", 
    online: true, 
    score: 9.66, 
    xp: "850K",
    joinedDate: "FEB 2024", 
    level: 42, 
    rank: "LENDÁRIO I MESTRE", 
    badges: ["microchip", "terminal"],
    headline: "Analista de Experiência Educacional [IA]",
    bio: "Engenheiro de Prompts com foco em transformar conceitos em aplicações práticas."
  },
  { 
    id: '1', 
    name: "MERCEDES DIAS BEZERRA", 
    email: "mercedes@me.com", 
    role: "STRATEGIST", 
    avatar: "https://i.pravatar.cc/150?u=mercedes", 
    online: false, 
    score: 6.28, 
    xp: "320K",
    joinedDate: "JUN 2024", 
    level: 15, 
    rank: "LENDÁRIO I", 
    badges: ["palette"],
    headline: "Estrategista de IA & Negócios",
    bio: "Focada em escalar operações através de agentes autônomos."
  },
  { 
    id: '3', 
    name: "DAY CAVALCANTI", 
    email: "day@lendaria.com", 
    role: "COMMUNITY LEAD", 
    avatar: "https://i.pravatar.cc/150?u=day", 
    online: true, 
    score: 8.42, 
    xp: "540K",
    joinedDate: "JAN 2024", 
    level: 28, 
    rank: "LENDÁRIO II", 
    badges: ["users-alt"],
    headline: "Construindo o maior hub de IA da AL.",
    bio: "Especialista em engajamento e cultura sistêmica."
  },
];

const LmsMembersTemplate: React.FC<{ onNavigate?: (s: Section) => void }> = ({ onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState<Member>(membersData[0]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return membersData.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeFilter === 'online') return matchesSearch && m.online;
      return matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="flex h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in overflow-hidden relative">
      
      {/* Cinematic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* --- COLUMN 1: HUD & LIST --- */}
      <main className="flex-1 flex flex-col overflow-hidden z-10 border-r border-white/5 relative bg-black/40 backdrop-blur-sm">
          {/* Header OS Control */}
          <header className="h-28 border-b border-white/5 flex flex-col justify-center px-12 space-y-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary shadow-glow">
                          <Icon name="users-alt" size="size-5" />
                      </div>
                      <div>
                          <h1 className="text-xl font-black tracking-tighter uppercase">DIRETÓRIO <span className="text-zinc-600">LENDÁRIO</span></h1>
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">9.240 Agentes Sincronizados</p>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                      <div className="relative group">
                          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size="size-3" />
                          <Input 
                            placeholder="BUSCAR DNA..." 
                            className="bg-white/[0.02] border-white/5 h-10 pl-10 w-72 rounded-full text-[10px] font-black uppercase tracking-widest focus:border-primary/40 transition-all placeholder:text-zinc-800" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                      <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white"><Icon name="settings-sliders" /></Button>
                  </div>
              </div>

              {/* HUD Filters */}
              <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={cn("transition-all flex items-center gap-2", activeFilter === 'all' ? "text-primary border-b border-primary pb-1" : "hover:text-zinc-300")}
                  >
                    Todos <span className="opacity-30 font-mono">01</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('friends')}
                    className={cn("transition-all flex items-center gap-2", activeFilter === 'friends' ? "text-primary border-b border-primary pb-1" : "hover:text-zinc-300")}
                  >
                    Meus Amigos <span className="opacity-30 font-mono">02</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('online')}
                    className={cn("transition-all flex items-center gap-2", activeFilter === 'online' ? "text-primary border-b border-primary pb-1" : "hover:text-zinc-300")}
                  >
                    Online Agora <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  </button>
              </div>
          </header>

          <ScrollArea className="flex-1">
              <div className="p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredMembers.map((member) => (
                          <Spotlight 
                            key={member.id}
                            className={cn(
                                "relative p-8 rounded-[2.5rem] border transition-all duration-700 group cursor-pointer",
                                selectedMember.id === member.id 
                                  ? "bg-white/[0.03] border-primary/40 shadow-[0_30px_60px_rgba(0,0,0,0.5)]" 
                                  : "bg-[#080808] border-white/5 hover:border-white/10"
                            )}
                            color="rgba(201, 178, 152, 0.08)"
                            onClick={() => setSelectedMember(member)}
                          >
                            <div className="space-y-6 relative z-10">
                                {/* Rank & XP Header */}
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <Badge variant="outline" className="text-[8px] font-black border-white/5 text-zinc-500 tracking-widest px-3 py-0.5">
                                            LVL {member.level}
                                        </Badge>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">{member.rank}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">XP SCORE</p>
                                        <p className="text-xs font-black font-mono text-zinc-300">{member.xp}</p>
                                    </div>
                                </div>

                                {/* Avatar Artifact */}
                                <div className="flex flex-col items-center py-4">
                                    <div className="relative">
                                        <div className={cn(
                                            "absolute inset-[-6px] rounded-full border-2 transition-all duration-1000",
                                            member.online ? "border-green-500/20 animate-pulse scale-105" : "border-white/5 opacity-0"
                                        )}></div>
                                        <Avatar className={cn(
                                            "w-24 h-24 border-4 border-[#050505] shadow-2xl transition-all duration-700 group-hover:scale-105",
                                            !member.online && "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                                        )}>
                                            <AvatarImage src={member.avatar} className="object-cover" />
                                            <AvatarFallback className="bg-zinc-900 text-primary font-black">{member.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h4 className="mt-6 font-black text-lg text-white group-hover:text-primary transition-colors tracking-tight uppercase">{member.name}</h4>
                                    <p className="text-[10px] font-medium text-zinc-500 italic font-serif mt-1">"{member.headline}"</p>
                                </div>

                                {/* Traits / Badges */}
                                <div className="flex justify-center gap-2 pt-4 border-t border-white/5">
                                    {member.badges.map((badge, idx) => (
                                        <div key={idx} className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-all">
                                            <Icon name={badge} size="size-4" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Background Number Visual */}
                            <div className="absolute -bottom-4 -right-4 opacity-[0.02] text-9xl font-black italic pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                0{member.id}
                            </div>
                          </Spotlight>
                      ))}
                  </div>
              </div>
          </ScrollArea>
      </main>

      {/* --- COLUMN 2: MEMBER DOSSIER --- */}
      <aside className="w-[420px] bg-[#080808] flex flex-col shrink-0 z-20 overflow-y-auto custom-scrollbar shadow-[-20px_0_50px_rgba(0,0,0,0.5)] relative">
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

          <div className="p-12 pb-0 relative z-10">
            <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em]">DNA REPORT</span>
                <Symbol name="infinity" className="text-zinc-800 text-xl" />
            </div>
            
            <div className="flex flex-col items-center text-center space-y-10">
                <div className="relative">
                    <div className={cn("absolute inset-[-12px] rounded-full border-2 transition-all duration-1000 animate-spin-slow", selectedMember.online ? "border-primary/20" : "border-white/5")}></div>
                    <Avatar className="w-40 h-40 border-[6px] border-[#050505] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative z-10">
                        <AvatarImage src={selectedMember.avatar} className="grayscale hover:grayscale-0 transition-all duration-1000" />
                        <AvatarFallback className="bg-zinc-900 text-3xl font-black text-primary">{selectedMember.name[0]}</AvatarFallback>
                    </Avatar>
                </div>
                
                <div className="space-y-6 w-full">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-black leading-[0.8] uppercase tracking-tighter text-white">
                            {selectedMember.name}
                        </h3>
                        <p className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">{selectedMember.role}</p>
                    </div>
                    
                    <div className="flex justify-center gap-4 pt-4">
                        <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl">Mensagem</Button>
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5 text-zinc-400"><Icon name="menu-dots" size="size-5" /></Button>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-16 relative z-10">
            <Tabs defaultValue="dossier" className="w-full">
                <TabsList className="bg-transparent border-b border-white/5 w-full justify-start p-0 h-auto gap-10 px-12 rounded-none">
                    <TabsTrigger value="dossier" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Dossier</TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Activity</TabsTrigger>
                    <TabsTrigger value="assets" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Assets</TabsTrigger>
                </TabsList>

                <div className="p-12 pt-10">
                    <TabsContent value="dossier" className="space-y-12 animate-fade-in">
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center space-y-1">
                                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Sincronia IA</p>
                                <p className="text-2xl font-black text-white font-mono">98.2%</p>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center space-y-1">
                                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Ponto Focal</p>
                                <p className="text-2xl font-black text-white font-mono">EXEC</p>
                            </div>
                        </div>

                        <section className="space-y-4">
                             <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.5em] flex items-center gap-3">
                                <Icon name="bolt" size="size-3" /> Core Vision
                             </h4>
                             <p className="text-xl font-bold text-white leading-tight">{selectedMember.headline}</p>
                        </section>

                        <section className="space-y-4">
                             <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] flex items-center gap-3">
                                <Icon name="align-left" size="size-3" /> Bio Extraída
                             </h4>
                             <p className="text-sm text-zinc-500 font-serif italic leading-relaxed">
                                 "{selectedMember.bio}"
                             </p>
                        </section>

                        <section className="space-y-6 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">Activity Score</h4>
                                <span className="font-mono text-xs text-green-500">{selectedMember.score}/10</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary shadow-glow transition-all duration-1000" style={{ width: `${selectedMember.score * 10}%` }}></div>
                            </div>
                            <p className="text-[8px] text-zinc-700 uppercase tracking-widest text-center italic">Monitoramento neural ativo via Gemini 2.5</p>
                        </section>
                    </TabsContent>

                    <TabsContent value="assets" className="space-y-6 animate-fade-in">
                        {[
                            { id: 1, name: "Masterclass: Escala 10x", count: "1.2k views", icon: "play", type: "VIDEO" },
                            { id: 2, name: "Protocolo de Prompting", count: "850 downloads", icon: "document", type: "SYSTEM" },
                            { id: 3, name: "Mindset Lendário v2", count: "420 alunos", icon: "brain", type: "BOOK" },
                        ].map((asset) => (
                            <div key={asset.id} className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors border border-white/5 shadow-xl">
                                    <Icon name={asset.icon} size="size-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <Badge variant="outline" className="text-[7px] font-black border-white/10 text-zinc-700 mb-1">{asset.type}</Badge>
                                    <h4 className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors truncate">{asset.name}</h4>
                                    <p className="text-[9px] text-zinc-600 uppercase font-mono mt-1">{asset.count}</p>
                                </div>
                                <Icon name="angle-small-right" className="text-zinc-800 group-hover:text-primary transition-all" />
                            </div>
                        ))}
                    </TabsContent>
                </div>
            </Tabs>
          </div>
      </aside>

      {/* Floating Action Button (Neural Toggle) */}
      <div className="fixed bottom-12 right-12 z-50 group">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse-slow"></div>
          <button className="w-16 h-16 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative z-10 border-4 border-black group-hover:rotate-12">
              <Icon name="brain" size="size-7" />
          </button>
      </div>

    </div>
  );
};

export default LmsMembersTemplate;
