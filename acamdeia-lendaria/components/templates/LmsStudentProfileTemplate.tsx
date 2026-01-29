
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface LmsStudentProfileTemplateProps {
  onNavigate?: (section: Section) => void;
}

const LmsStudentProfileTemplate: React.FC<LmsStudentProfileTemplateProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("about");

  const member = {
    name: "Lucas Charão",
    level: 7,
    title: "Lendário I Mestre",
    points: 560,
    nextLevelPoints: 888,
    email: "lucascharao1@hotmail.com",
    activityScore: 9.66,
    joinedDate: "February 6, 2024",
    lastSeen: "15 hours ago",
    headline: "Analista de Experiência Educacional[IA] da Academia Lendária",
    bio: "Engenheiro de Prompts com formação em TI com experiência prática no desenvolvimento e implementação de soluções em IA, destaco-me pela capacidade de transformar conceitos complexos em aplicações práticas e inovadoras.\n\nComo analista de Experiência Educacional[IA] da Academia Lendária, tenho o privilégio de formar a próxima geração de especialistas em IA, compartilhando conhecimentos práticos e teóricos que impulsionam a inovação tecnológica.",
    avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj", // Usando avatar do Alan para exemplo visual no print
    tags: [
      { label: "Time Lendário", icon: "sword", color: "bg-zinc-900" },
      { label: "Conselheiros Lendários", icon: "users-alt", color: "bg-zinc-900" },
      { label: "Lendário Mestre 1", icon: "star", color: "bg-indigo-600/30 text-indigo-400 border-indigo-500/20" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30">
      
      {/* Immersive Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-[50vw] h-[100vh] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[40vw] h-[80vh] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.02]"></div>
      </div>

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* --- LEFT COLUMN: IDENTITY SIDEBAR --- */}
              <aside className="lg:col-span-4 flex flex-col items-center text-center space-y-10 lg:sticky lg:top-32">
                  
                  {/* Avatar Artifact */}
                  <div className="relative group">
                      {/* Level Ring */}
                      <div className="absolute inset-[-8px] rounded-full border-2 border-indigo-500/30 animate-spin-slow"></div>
                      <div className="absolute inset-[-4px] rounded-full border border-primary/20"></div>
                      
                      <Avatar className="w-48 h-48 border-4 border-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10">
                          <AvatarImage src={member.avatar} className="grayscale hover:grayscale-0 transition-all duration-700" />
                          <AvatarFallback className="bg-zinc-900 text-3xl font-black">LC</AvatarFallback>
                      </Avatar>
                      
                      {/* Level Badge Flutuante */}
                      <div className="absolute bottom-2 right-2 z-20 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm border-4 border-[#050505] shadow-xl">
                          {member.level}
                      </div>
                  </div>

                  {/* Name & Basic Info */}
                  <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                          <h1 className="text-3xl font-black tracking-tighter uppercase">{member.name}</h1>
                          <Symbol name="infinity" className="text-zinc-600 text-xl" />
                      </div>
                      
                      <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                          <p className="flex items-center justify-center gap-2"><Icon name="clock" size="size-3" /> Last seen {member.lastSeen}</p>
                          <p className="flex items-center justify-center gap-2"><Icon name="calendar" size="size-3" /> Member since {member.joinedDate}</p>
                      </div>
                  </div>

                  {/* Secondary Badges */}
                  <div className="flex flex-wrap justify-center gap-2">
                      {member.tags.map((tag, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className={cn("px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border-white/5", tag.color)}
                          >
                            <Icon name={tag.icon} size="size-3" className="mr-2" /> {tag.label}
                          </Badge>
                      ))}
                  </div>

                  {/* Sidebar Actions */}
                  <div className="w-full pt-4 flex flex-col gap-3">
                      <Button className="w-full h-16 rounded-2xl bg-[#C9B298] text-black font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all shadow-xl">
                          Message
                      </Button>
                      <Button variant="ghost" size="icon" className="w-full h-12 rounded-2xl border border-white/5 text-zinc-600 hover:text-white">
                          <Icon name="menu-dots" />
                      </Button>
                  </div>
              </aside>

              {/* --- RIGHT COLUMN: LEGADO CANVAS --- */}
              <div className="lg:col-span-8 space-y-12">
                  
                  {/* HUD Navigation Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="bg-white/5 backdrop-blur-3xl p-1.5 rounded-full border border-white/5 justify-start gap-2 h-auto">
                          {[
                            { id: 'about', label: 'About', count: null },
                            { id: 'posts', label: 'Posts', count: 23 },
                            { id: 'comments', label: 'Comments', count: 151 },
                            { id: 'spaces', label: 'Spaces', count: 28 },
                            { id: 'rewards', label: 'Rewards', count: null }
                          ].map(tab => (
                            <TabsTrigger 
                                key={tab.id}
                                value={tab.id} 
                                className="rounded-full px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                            >
                                {tab.label} {tab.count && <span className="ml-1 opacity-40">{tab.count}</span>}
                            </TabsTrigger>
                          ))}
                      </TabsList>

                      {/* --- TAB: ABOUT (O Dossier) --- */}
                      <TabsContent value="about" className="mt-12 space-y-16 animate-fade-in">
                          
                          {/* Top Row: Rank & Score */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Level Progress Card */}
                              <Card className="bg-white/[0.02] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
                                  <div className="relative z-10 space-y-6">
                                      <div className="flex justify-between items-center">
                                          <Badge className="bg-indigo-600/20 text-indigo-400 border-indigo-500/30 px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase">
                                              <Icon name="trophy" size="size-3" className="mr-2" /> Rank atual
                                          </Badge>
                                          <p className="text-sm font-bold font-mono text-zinc-500">{member.points} points</p>
                                      </div>
                                      <h3 className="text-3xl font-black text-white tracking-tight uppercase italic">{member.title}</h3>
                                      <div className="space-y-2">
                                          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-600">
                                              <span>Progressão de Mestre</span>
                                              <span>{member.nextLevelPoints - member.points} to level up</span>
                                          </div>
                                          <Progress value={(member.points / member.nextLevelPoints) * 100} className="h-1 bg-white/5" style={{'--primary': '#6366F1'} as any} />
                                      </div>
                                  </div>
                              </Card>

                              {/* Activity Score Card */}
                              <Card className="bg-white/[0.02] border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center group">
                                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4">Activity Score</span>
                                  <div className="relative">
                                      <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
                                      <div className="relative w-24 h-24 rounded-full border-2 border-green-500/30 flex items-center justify-center text-3xl font-black font-mono text-green-500">
                                          {member.activityScore}
                                      </div>
                                  </div>
                              </Card>
                          </div>

                          {/* Personal Dossier Sections */}
                          <div className="space-y-12">
                              <section className="space-y-4">
                                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] border-b border-white/5 pb-4">Headline</h4>
                                  <p className="text-2xl font-bold text-white tracking-tight leading-tight">
                                      {member.headline}
                                  </p>
                              </section>

                              <section className="space-y-4">
                                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] border-b border-white/5 pb-4">Bio</h4>
                                  <div className="prose prose-invert max-w-none">
                                      <p className="text-xl font-serif text-zinc-400 leading-relaxed italic whitespace-pre-wrap opacity-90">
                                          "{member.bio}"
                                      </p>
                                  </div>
                              </section>

                              <section className="space-y-4">
                                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] border-b border-white/5 pb-4">Digital Footprint</h4>
                                  <div className="flex gap-4">
                                      <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/5 bg-white/[0.01] text-zinc-400 hover:text-white gap-3">
                                          <Icon name="globe" type="regular" /> Website
                                      </Button>
                                      <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/5 bg-white/[0.01] text-zinc-400 hover:text-white gap-3">
                                          <Icon name="linkedin" type="brands" /> Professional
                                      </Button>
                                  </div>
                              </section>
                          </div>
                      </TabsContent>

                      {/* --- TAB: POSTS (Mocked) --- */}
                      <TabsContent value="posts" className="mt-12 animate-fade-in space-y-8">
                         {[1, 2].map((i) => (
                             <Card key={i} className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer hover:border-primary/20 transition-all">
                                 <div className="aspect-video w-full bg-zinc-900 relative">
                                     <img src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop`} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                     <div className="absolute bottom-6 left-6">
                                         <Badge className="bg-primary text-black font-black text-[8px] uppercase tracking-widest">Masterclass</Badge>
                                     </div>
                                 </div>
                                 <CardContent className="p-8 space-y-4">
                                     <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">DEDO NA FERIDA: As oportunidades para 2026 começam AGORA!</h3>
                                     <p className="text-sm text-zinc-500 font-serif line-clamp-2 italic">"Fala pessoal! Vou falar uma coisa aqui que precisa ser dita... A gente tá vivendo um momento EXTRAORDINÁRIO pra quem trabalha com IA..."</p>
                                     <div className="flex items-center gap-4 pt-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                         <span>4 days ago</span>
                                         <span>•</span>
                                         <span>1,240 views</span>
                                     </div>
                                 </CardContent>
                             </Card>
                         ))}
                      </TabsContent>

                      {/* --- TAB: COMMENTS (Mocked) --- */}
                      <TabsContent value="comments" className="mt-12 animate-fade-in space-y-6">
                          {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors flex gap-6 group">
                                  <Avatar className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>LC</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-2">
                                      <div className="flex items-center gap-3">
                                          <span className="text-[9px] font-black uppercase text-zinc-500">Commented on <span className="text-zinc-300">Imersão Lendária</span></span>
                                          <span className="text-[9px] font-mono text-zinc-700">Jan 0{i}</span>
                                      </div>
                                      <p className="text-sm text-zinc-400 font-serif leading-relaxed italic group-hover:text-zinc-200 transition-colors">
                                          "Bora meu amigo!! Estaremos lá, juntos!! <span className="text-primary font-sans font-bold not-italic cursor-pointer">@AndersonBarbosa</span>"
                                      </p>
                                  </div>
                              </div>
                          ))}
                      </TabsContent>

                  </Tabs>
              </div>
          </div>
      </main>

      {/* Global Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
    </div>
  );
};

export default LmsStudentProfileTemplate;
