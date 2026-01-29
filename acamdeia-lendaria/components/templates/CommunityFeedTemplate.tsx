
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface CommunityFeedTemplateProps {
  onNavigate?: (s: Section) => void;
}

const CommunityFeedTemplate: React.FC<CommunityFeedTemplateProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("todos");
  const [activeSpace, setActiveSpace] = useState("feed");

  const spaces = [
    { id: 'feed', label: 'FEED PRINCIPAL', icon: 'apps', count: null },
    { id: 'duvidas', label: 'DÚVIDAS TÉCNICAS', icon: 'interrogation', count: 633 },
    { id: 'clube', label: 'CLUBE DO LIVRO', icon: 'book-open', count: 525 },
    { id: 'lab', label: 'LABORATÓRIO IA', icon: 'microchip', count: 741 },
    { id: 'startup', label: 'STARTUP SHOWCASE', icon: 'rocket', count: 5 },
    { id: 'hubs', label: 'HUBS LENDÁRIOS', icon: 'network-cloud', count: 55 },
  ];

  const posts = [
    {
      id: 1,
      type: 'MASTERCLASS',
      title: 'Vendi e agora? Arquitetura de entrega para contratos de 6 dígitos',
      author: 'Gabriel Marcondes',
      date: '12 MAR • 08:00',
      description: 'Como implementar o serviço e definir prazos de entregas sem sacrificar sua sanidade operacional.',
      avatar: 'https://i.pravatar.cc/100?u=gabriel',
      highlight: true
    },
    {
      id: 2,
      type: 'EVENTO',
      title: 'Hackathon Lendário #05: Do Espectador ao Protagonista',
      author: 'Alan Nicolas',
      date: '06 MAR • 17:00',
      description: '80% de vocês valorizam "Cases Aplicados". Este evento é sobre construir soluções reais em 3 dias.',
      avatar: 'https://github.com/shadcn.png',
      highlight: false
    }
  ];

  return (
    <div className="flex h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in overflow-hidden relative selection:bg-primary/30">
      
      {/* Immersive Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]"></div>
      </div>

      {/* --- LEFT SIDEBAR: ESPAÇOS (GALLERY STYLE) --- */}
      <aside className="w-80 border-r border-white/5 bg-[#050505]/40 backdrop-blur-3xl flex flex-col shrink-0 z-20">
          <div className="p-10 pb-6 flex items-center gap-3">
              <Symbol name="infinity" className="text-primary text-2xl" />
              <h2 className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">Espaços</h2>
          </div>
          
          <ScrollArea className="flex-1 px-6">
              <div className="space-y-2">
                  {spaces.map(space => (
                      <button
                        key={space.id}
                        onClick={() => setActiveSpace(space.id)}
                        className={cn(
                            "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                            activeSpace === space.id 
                                ? "bg-white/[0.03] border border-white/10 shadow-2xl" 
                                : "text-zinc-500 hover:text-zinc-200 border border-transparent"
                        )}
                      >
                        {activeSpace === space.id && (
                            <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-full"></div>
                        )}
                        <div className="flex items-center gap-4">
                            <Icon 
                                name={space.icon} 
                                size="size-4" 
                                className={cn("transition-colors duration-500", activeSpace === space.id ? "text-primary" : "text-zinc-700 group-hover:text-zinc-400")} 
                            />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] truncate">{space.label}</span>
                        </div>
                        {space.count && (
                            <span className="text-[9px] font-mono opacity-30 group-hover:opacity-60 transition-opacity">{space.count}</span>
                        )}
                      </button>
                  ))}
              </div>
          </ScrollArea>
          
          <div className="p-8 border-t border-white/5">
              <Button variant="ghost" className="w-full justify-start gap-4 text-zinc-500 hover:text-white h-12 rounded-xl text-[9px] font-black uppercase tracking-[0.3em]">
                  <Icon name="calendar" size="size-3" />
                  Agenda Global
              </Button>
          </div>
      </aside>

      {/* --- MAIN FEED CANVAS --- */}
      <main className="flex-1 flex flex-col overflow-hidden z-10">
          
          {/* Header Stats & Filter */}
          <div className="p-10 pb-0 shrink-0">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                  <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">COMUNIDADE LENDÁRIA</p>
                      <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Feed do <span className="text-zinc-600 italic font-serif font-light">Membro.</span></h1>
                  </div>
                  
                  {/* Metric Capsules */}
                  <div className="flex gap-4">
                      {[
                          { l: "Membros", v: "9.044" },
                          { l: "Atividade", v: "88%" }
                      ].map((m, i) => (
                          <div key={i} className="px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center">
                              <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">{m.l}</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{m.v}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Enhanced Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-transparent border-b border-white/5 w-full justify-start p-0 h-auto rounded-none gap-10">
                      <TabsTrigger value="todos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white bg-transparent px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">TODOS</TabsTrigger>
                      <TabsTrigger value="eventos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white bg-transparent px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">AULAS AO VIVO</TabsTrigger>
                      <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white bg-transparent px-0 pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">DISCUSSÕES</TabsTrigger>
                  </TabsList>
              </Tabs>
          </div>

          <ScrollArea className="flex-1 p-10 pt-8">
              <div className="max-w-4xl space-y-12 pb-40">
                  {posts.map((post) => (
                      <Card 
                        key={post.id} 
                        className={cn(
                            "bg-[#080808]/40 backdrop-blur-3xl border-white/5 hover:border-primary/20 transition-all duration-700 group cursor-pointer rounded-[2.5rem] overflow-hidden",
                            post.highlight && "ring-1 ring-primary/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                        )}
                        onClick={() => onNavigate?.(Section.TEMPLATE_LMS_BOOK_CLUB_POST)}
                      >
                          <CardContent className="p-10 space-y-8 relative">
                              {/* Background Design Element */}
                              <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-[15rem] text-primary group-hover:scale-110 transition-transform duration-[3000ms] pointer-events-none">
                                  <Icon name="bookmark" />
                              </div>

                              <div className="flex justify-between items-start relative z-10">
                                  <div className="space-y-6">
                                      <div className="flex items-center gap-4">
                                          <Badge className="bg-primary text-black font-black text-[8px] uppercase tracking-widest px-4 py-1.5 rounded-full border-none">
                                              {post.type}
                                          </Badge>
                                          <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
                                              {post.date}
                                          </span>
                                      </div>
                                      <h3 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tighter group-hover:text-primary transition-colors">
                                          {post.title}
                                      </h3>
                                      <p className="text-xl text-zinc-500 font-serif leading-relaxed italic max-w-2xl">
                                          "{post.description}"
                                      </p>
                                  </div>
                                  
                                  <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-700 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                      <Icon name="angle-small-right" size="size-6" />
                                  </div>
                              </div>

                              <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                                  <div className="flex items-center gap-4 group/author">
                                      <Avatar className="h-10 w-10 border-2 border-white/5 grayscale group-hover/author:grayscale-0 transition-all duration-700">
                                          <AvatarImage src={post.avatar} />
                                          <AvatarFallback>U</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] block mb-1">Autor</span>
                                          <span className="text-sm font-bold text-zinc-300 group-hover/author:text-white transition-colors">
                                              {post.author}
                                          </span>
                                      </div>
                                  </div>
                                  
                                  <div className="flex gap-10">
                                      <div className="flex flex-col items-end">
                                          <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest mb-1">PRESENÇA</span>
                                          <div className="flex items-center gap-2 text-primary">
                                              <Icon name="video-camera" size="size-3" />
                                              <span className="text-[10px] font-bold font-mono">VIRTUAL</span>
                                          </div>
                                      </div>
                                      <div className="flex flex-col items-end">
                                          <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest mb-1">CONFIRMADOS</span>
                                          <div className="flex items-center gap-2 text-zinc-400">
                                              <Icon name="users" size="size-3" />
                                              <span className="text-[10px] font-bold font-mono">154</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}

                  <div className="py-20 text-center">
                      <Button variant="ghost" className="text-zinc-700 hover:text-primary font-black uppercase tracking-[0.6em] text-[10px] transition-all">
                          Arquivos Antigos <Icon name="angle-small-down" className="ml-4" />
                      </Button>
                  </div>
              </div>
          </ScrollArea>
      </main>

      {/* --- RIGHT SIDEBAR: INTELLIGENCE PANEL --- */}
      <aside className="w-96 border-l border-white/5 bg-[#050505]/40 backdrop-blur-3xl p-10 hidden xl:flex flex-col gap-12 z-20 overflow-y-auto">
          
          {/* Write Prompt Area */}
          <div className="space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600">O Cérebro da Tribo</h4>
              <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-dashed border-white/10 text-center space-y-6 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 mx-auto flex items-center justify-center text-zinc-700 group-hover:text-primary transition-all duration-500 shadow-xl border border-white/5">
                      <Icon name="pencil" size="size-5" />
                  </div>
                  <p className="text-sm text-zinc-500 font-serif italic">Inicie uma nova linha de pensamento...</p>
              </div>
          </div>

          {/* Honor Code (Luxury 2.0 Style) */}
          <Card className="bg-primary/5 border-primary/20 rounded-[2.5rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,178,152,0.1),transparent_70%)]"></div>
              <CardContent className="p-8 space-y-6 relative z-10">
                  <div className="flex items-center gap-3 text-primary">
                      <Icon name="shield-check" size="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Código de Honra</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-serif leading-relaxed italic opacity-80">
                      "Aqui, o valor é medido pela densidade do insight e pelo skin in the game. Evite o ruído. Contribua com a clareza."
                  </p>
                  <Separator className="bg-primary/20" />
                  <Button variant="link" className="px-0 h-auto text-[9px] font-black uppercase tracking-widest text-primary hover:text-white">Ler Manifesto</Button>
              </CardContent>
          </Card>

          {/* Members Online Exhibit */}
          <div className="space-y-8">
              <div className="flex items-center justify-between">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600">Mentes Ativas</h4>
                  <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">92 online</Badge>
              </div>
              <div className="grid grid-cols-5 gap-4">
                  {[1,2,3,4,5,6,7,8,9,10].map(i => (
                      <Avatar key={i} className="h-12 w-12 border-2 border-white/5 grayscale hover:grayscale-0 cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-1">
                          <AvatarImage src={`https://i.pravatar.cc/100?u=${i+20}`} />
                          <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                  ))}
              </div>
          </div>

      </aside>

      {/* Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
    </div>
  );
};

export default CommunityFeedTemplate;
