
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Spotlight } from '../ui/spotlight';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface CommunityRankingTemplateProps {
  onNavigate?: (section: Section) => void;
}

const CommunityRankingTemplate: React.FC<CommunityRankingTemplateProps> = ({ onNavigate }) => {
  const [activeSeason, setActiveSeason] = useState("Season 04");

  const podium = [
    { rank: 2, name: "Sarah Lima", xp: "12.450", streak: 42, avatar: "https://i.pravatar.cc/150?u=sarah", title: "ALQUIMISTA DE PROMPTS" },
    { rank: 1, name: "Alan Nicolas", xp: "18.900", streak: 124, avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj", title: "ARQUITETO SUPREMO" },
    { rank: 3, name: "Lucas Charão", xp: "10.120", streak: 15, avatar: "https://i.pravatar.cc/150?u=lucas", title: "MESTRE NEXIALISTA" },
  ];

  const leaders = [
    { rank: 4, name: "Pedro Alencar", xp: "9.850", streak: 8, badge: "Pioneiro", color: "text-blue-400" },
    { rank: 5, name: "Day Cavalcanti", xp: "9.200", streak: 31, badge: "Estrategista", color: "text-purple-400" },
    { rank: 6, name: "José Amorim", xp: "8.750", streak: 12, badge: "Dev Alpha", color: "text-emerald-400" },
    { rank: 7, name: "Marina Silva", xp: "7.900", streak: 5, badge: "Membro", color: "text-zinc-500" },
    { rank: 8, name: "Gabriel M.", xp: "7.450", streak: 22, badge: "Membro", color: "text-zinc-500" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30 relative">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-primary/5 blur-[150px] rounded-full opacity-50" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02]"></div>
      </div>

      {/* --- HEADER: PANTEÃO HUD --- */}
      <header className="container max-w-7xl mx-auto px-8 pt-24 pb-16 relative z-10 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.8em] text-[10px] font-black px-8 py-2 rounded-full">
                      HALL DA FAMA
                  </Badge>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                      Os Sábios do <br/>
                      <span className="text-zinc-600 italic font-serif font-light tracking-normal">Conselho.</span>
                  </h1>
              </div>
              
              <div className="flex bg-white/[0.03] border border-white/10 rounded-full p-1.5 backdrop-blur-3xl">
                  {["Season 03", "Season 04", "All Time"].map(s => (
                      <button 
                        key={s}
                        onClick={() => setActiveSeason(s)}
                        className={cn(
                            "px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                            activeSeason === s ? "bg-white text-black shadow-glow scale-105" : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                          {s}
                      </button>
                  ))}
              </div>
          </div>
      </header>

      <main className="container max-w-7xl mx-auto px-8 relative z-10 space-y-32 pb-40">
          
          {/* --- THE PODIUM: TRIAD OF EXCELLENCE --- */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end pt-12">
              {/* Silver (Rank 2) */}
              <div className="order-2 md:order-1 space-y-8 text-center group">
                  <div className="relative inline-block">
                      <div className="absolute inset-0 bg-zinc-400/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      <Avatar className="w-40 h-40 border-4 border-zinc-500 shadow-2xl relative z-10 transition-transform duration-1000 group-hover:-translate-y-4">
                          <AvatarImage src={podium[0].avatar} className="grayscale group-hover:grayscale-0 transition-all duration-1000" />
                          <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-500 text-black px-6 py-1.5 rounded-full font-black text-xs shadow-xl z-20">2º</div>
                  </div>
                  <div className="space-y-2">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">{podium[0].title}</p>
                      <h3 className="text-3xl font-bold text-white tracking-tighter">{podium[0].name}</h3>
                      <div className="flex justify-center gap-6 pt-4 border-t border-white/5 mt-4">
                          <div className="text-center">
                              <p className="text-[7px] font-black text-zinc-600 uppercase">XP TOTAL</p>
                              <p className="text-lg font-black font-mono text-zinc-300">{podium[0].xp}</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Gold (Rank 1) */}
              <div className="order-1 md:order-2 space-y-10 text-center group pb-12">
                  <div className="relative inline-block">
                      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
                      <Avatar className="w-56 h-56 border-4 border-primary shadow-[0_0_80px_rgba(201,178,152,0.3)] relative z-10 transition-transform duration-1000 group-hover:-translate-y-6">
                          <AvatarImage src={podium[1].avatar} className="grayscale group-hover:grayscale-0 transition-all duration-1000" />
                          <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center shadow-glow animate-bounce z-20 border-4 border-[#020202]">
                          <Icon name="crown" type="solid" size="size-7" />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-black px-10 py-2 rounded-full font-black text-sm shadow-glow z-20">1º</div>
                  </div>
                  <div className="space-y-3">
                      <p className="text-[9px] font-black text-primary uppercase tracking-[0.6em] animate-pulse">{podium[1].title}</p>
                      <h3 className="text-5xl font-black text-white tracking-tighter">{podium[1].name}</h3>
                      <div className="flex justify-center gap-10 pt-6 border-t border-white/5 mt-6">
                          <div className="text-center">
                              <p className="text-[7px] font-black text-zinc-600 uppercase">XP TOTAL</p>
                              <p className="text-3xl font-black font-mono text-primary">{podium[1].xp}</p>
                          </div>
                          <div className="text-center">
                              <p className="text-[7px] font-black text-zinc-600 uppercase">STREAK</p>
                              <p className="text-3xl font-black font-mono text-white">{podium[1].streak}d</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Bronze (Rank 3) */}
              <div className="order-3 space-y-8 text-center group">
                  <div className="relative inline-block">
                      <div className="absolute inset-0 bg-brand-gold/5 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      <Avatar className="w-40 h-40 border-4 border-[#8D7556] shadow-2xl relative z-10 transition-transform duration-1000 group-hover:-translate-y-4">
                          <AvatarImage src={podium[2].avatar} className="grayscale group-hover:grayscale-0 transition-all duration-1000" />
                          <AvatarFallback>LC</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#8D7556] text-black px-6 py-1.5 rounded-full font-black text-xs shadow-xl z-20">3º</div>
                  </div>
                  <div className="space-y-2">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">{podium[2].title}</p>
                      <h3 className="text-3xl font-bold text-white tracking-tighter">{podium[2].name}</h3>
                      <div className="flex justify-center gap-6 pt-4 border-t border-white/5 mt-4">
                          <div className="text-center">
                              <p className="text-[7px] font-black text-zinc-600 uppercase">XP TOTAL</p>
                              <p className="text-lg font-black font-mono text-zinc-300">{podium[2].xp}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* --- THE PANTEON LIST: HIGH DENSITY --- */}
          <section className="space-y-12">
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">Ascensão dos Membros</h2>
                  <div className="flex items-center gap-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                      <span>Filtrar por Skills</span>
                      <Icon name="angle-small-down" />
                  </div>
              </div>

              <div className="bg-[#080808]/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Table>
                      <TableHeader className="bg-white/[0.02]">
                          <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="w-[100px] text-center font-black text-[9px] uppercase tracking-widest text-zinc-600">Rank</TableHead>
                              <TableHead className="font-black text-[9px] uppercase tracking-widest text-zinc-600">Lendário</TableHead>
                              <TableHead className="font-black text-[9px] uppercase tracking-widest text-zinc-600">XP</TableHead>
                              <TableHead className="font-black text-[9px] uppercase tracking-widest text-zinc-600">Streak</TableHead>
                              <TableHead className="font-black text-[9px] uppercase tracking-widest text-zinc-600">Prestígio</TableHead>
                              <TableHead className="text-right w-[150px] pr-10 font-black text-[9px] uppercase tracking-widest text-zinc-600">Dossiê</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {leaders.map((m) => (
                              <TableRow key={m.rank} className="border-white/[0.02] hover:bg-white/[0.03] transition-colors group cursor-default h-20">
                                  <TableCell className="text-center font-mono font-bold text-zinc-500 group-hover:text-white transition-colors">
                                      {String(m.rank).padStart(2, '0')}
                                  </TableCell>
                                  <TableCell>
                                      <div className="flex items-center gap-4">
                                          <Avatar className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                                              <AvatarFallback className="text-[10px] font-bold bg-zinc-900">{m.name[0]}</AvatarFallback>
                                          </Avatar>
                                          <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{m.name}</span>
                                      </div>
                                  </TableCell>
                                  <TableCell className="font-mono text-zinc-400 group-hover:text-primary transition-colors">{m.xp}</TableCell>
                                  <TableCell>
                                      <div className="flex items-center gap-2">
                                          <Icon name="flame" className={cn("text-zinc-700 group-hover:text-brand-orange transition-colors", m.streak > 20 && "text-brand-orange")} size="size-3" />
                                          <span className="font-mono text-zinc-500 group-hover:text-zinc-300">{m.streak}d</span>
                                      </div>
                                  </TableCell>
                                  <TableCell>
                                      <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest border-white/5", m.color)}>
                                          {m.badge}
                                      </Badge>
                                  </TableCell>
                                  <TableCell className="text-right pr-10">
                                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/5 text-zinc-800 hover:text-white hover:border-white/20 transition-all group-hover:scale-110" onClick={() => onNavigate?.(Section.TEMPLATE_LMS_PROFILE)}>
                                          <Icon name="angle-small-right" size="size-5" />
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>

              <div className="pt-20 flex flex-col items-center gap-6">
                  <div className="w-px h-20 bg-gradient-to-b from-primary/30 to-transparent"></div>
                  <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-primary transition-all">
                      Carregar Lista Completa
                  </Button>
              </div>
          </section>

          {/* --- REWARDS EXHIBIT --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Spotlight 
                className="bg-primary/5 border border-primary/20 rounded-[3rem] p-12 space-y-8 relative overflow-hidden group"
                color="rgba(201, 178, 152, 0.15)"
              >
                  <div className="space-y-4">
                      <Badge className="bg-primary text-black font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full border-none">PRÓXIMO MARCO</Badge>
                      <h3 className="text-4xl font-black tracking-tight text-white leading-tight">Clube do 1 Milhão</h3>
                      <p className="text-lg text-zinc-500 font-serif italic leading-relaxed">
                        "O acesso exclusivo para quem atingiu o estrato lendário de execução e faturamento documentado."
                      </p>
                  </div>
                  <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                          <span>Seu Progresso</span>
                          <span className="text-primary">850.000 / 1.000.000 XP</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary shadow-glow transition-all duration-2000" style={{ width: '85%' }}></div>
                      </div>
                  </div>
                  <Button className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all">
                      Acessar Requisitos
                  </Button>
              </Spotlight>

              <Card className="bg-[#080808]/40 border-white/5 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center space-y-8 backdrop-blur-3xl">
                  <Symbol name="infinity" className="text-9xl text-white/5 absolute -top-10 -right-10 rotate-12" />
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 shadow-2xl group hover:border-primary transition-all duration-700">
                      <Icon name="medal" size="size-10" className="group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white">Prêmio Season 04</h4>
                      <p className="text-sm text-zinc-500 font-serif italic max-w-xs mx-auto leading-relaxed">
                          O Top 1 da temporada receberá uma Mentoria de Estratégia 1-on-1 com Alan Nicolas.
                      </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600">
                      <Icon name="clock" size="size-3" />
                      <span>EXPIRA EM 18 DIAS</span>
                  </div>
              </Card>
          </section>

      </main>

      {/* Global Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
    </div>
  );
};

export default CommunityRankingTemplate;
