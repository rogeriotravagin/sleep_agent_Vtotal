
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';

interface CommunityEventsTemplateProps {
  onNavigate?: (section: Section) => void;
}

const CommunityEventsTemplate: React.FC<CommunityEventsTemplateProps> = ({ onNavigate }) => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Masterclass: O Fim do Gestor Medíocre",
      host: "Alan Nicolas",
      date: "24 OUT",
      time: "20:00",
      type: "AO VIVO",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
      attendees: 1240,
      featured: true
    },
    {
      id: 2,
      title: "Workshop: Automação de PRD com Gemini 2.5",
      host: "José Carlos Amorim",
      date: "28 OUT",
      time: "15:00",
      type: "TÉCNICO",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
      attendees: 850,
      featured: false
    },
    {
      id: 3,
      title: "Clube do Livro: Antifragilidade (C2)",
      host: "Day Cavalcanti",
      date: "02 NOV",
      time: "19:00",
      type: "ESTUDO",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068",
      attendees: 420,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30 relative">
      
      {/* Immersive Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]"></div>
      </div>

      {/* --- MAIN HEADER: EDITORIAL STYLE --- */}
      <header className="container max-w-7xl mx-auto px-8 pt-24 pb-16 relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.8em] text-[10px] font-black px-8 py-2 rounded-full">
                      AGENDA LENDÁRIA
                  </Badge>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                      Os Próximos <br/>
                      <span className="text-zinc-600 italic font-serif font-light tracking-normal">Rituais.</span>
                  </h1>
              </div>
              <div className="flex gap-4">
                  <Button variant="outline" className="rounded-2xl border-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] h-14 px-10 hover:bg-white/5">
                      <Icon name="calendar" className="mr-3" /> Sincronizar Google
                  </Button>
                  <Button className="rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] h-14 px-10 shadow-xl hover:bg-zinc-200">
                      Sugerir Evento
                  </Button>
              </div>
          </div>
      </header>

      <main className="container max-w-7xl mx-auto px-8 relative z-10 space-y-32 pb-40">
          
          {/* --- FEATURED EVENT: THE MAIN RITUAL --- */}
          <section>
              <Card className="bg-[#080808]/40 backdrop-blur-3xl border-white/5 rounded-[3.5rem] overflow-hidden group cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,178,152,0.05),transparent_70%)] pointer-events-none"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-7 relative aspect-video lg:aspect-auto">
                          <img src={upcomingEvents[0].image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[2000ms] group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                          
                          {/* Countdown Artifact */}
                          <div className="absolute bottom-10 left-10 flex gap-6">
                              <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-center w-20">
                                  <p className="text-3xl font-black font-mono">02</p>
                                  <p className="text-[7px] font-black uppercase tracking-widest text-zinc-500">Dias</p>
                              </div>
                              <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-center w-20">
                                  <p className="text-3xl font-black font-mono">14</p>
                                  <p className="text-[7px] font-black uppercase tracking-widest text-zinc-500">Horas</p>
                              </div>
                          </div>
                      </div>
                      
                      <div className="lg:col-span-5 p-12 lg:p-20 space-y-10 flex flex-col justify-center">
                          <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                  <Badge className="bg-red-500 text-white font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full border-none">PREMIUM AO VIVO</Badge>
                                  <span className="text-[10px] font-mono font-bold text-zinc-500">HOJE ÀS {upcomingEvents[0].time}</span>
                              </div>
                              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                                  {upcomingEvents[0].title}
                              </h3>
                              <p className="text-xl text-zinc-500 font-serif italic leading-relaxed">
                                  "Um mergulho profundo na arquitetura de escala solitária usando as novas capacidades do GPT-o1."
                              </p>
                          </div>

                          <div className="flex items-center justify-between pt-10 border-t border-white/5">
                              <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12 border-2 border-primary/30">
                                      <AvatarImage src="https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj" />
                                      <AvatarFallback>AN</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] block mb-0.5">Facilitador</span>
                                      <span className="text-base font-bold text-white tracking-tight">{upcomingEvents[0].host}</span>
                                  </div>
                              </div>
                              <Button className="h-16 px-12 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-glow">
                                  GARANTIR VAGA
                              </Button>
                          </div>
                      </div>
                  </div>
              </Card>
          </section>

          {/* --- CALENDAR GRID & TIMELINE --- */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Left: Minimalist HUD Calendar */}
              <div className="lg:col-span-4 space-y-10">
                  <div className="space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">Calendário de Outubro</h4>
                      <p className="text-sm font-serif italic text-zinc-500">Visualize a densidade de conhecimento do mês.</p>
                  </div>

                  <Card className="bg-transparent border-white/5 p-8 rounded-[2.5rem] bg-white/[0.01]">
                      <div className="grid grid-cols-7 gap-4 mb-8 text-center">
                          {['D','S','T','Q','Q','S','S'].map(d => (
                              <span key={d} className="text-[9px] font-black text-zinc-700 tracking-widest">{d}</span>
                          ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                          {[...Array(31)].map((_, i) => {
                              const day = i + 1;
                              const hasEvent = day === 24 || day === 28;
                              return (
                                  <div 
                                    key={day} 
                                    className={cn(
                                        "aspect-square rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 cursor-pointer relative",
                                        hasEvent ? "bg-primary text-black font-black shadow-glow" : "text-zinc-600 hover:bg-white/5 hover:text-white"
                                    )}
                                  >
                                      {day}
                                      {hasEvent && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border border-primary animate-ping" />}
                                  </div>
                              );
                          })}
                      </div>
                  </Card>

                  <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                          <Icon name="marker" size="size-3" /> Frequência de Tribo
                      </p>
                      <p className="text-sm text-zinc-400 font-serif leading-relaxed italic">
                        "Eventos ao vivo geram 4x mais retenção do que aulas gravadas. Estar presente é o seu primeiro diferencial."
                      </p>
                  </div>
              </div>

              {/* Right: Chronological Timeline */}
              <div className="lg:col-span-8 space-y-12">
                  <div className="space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">Timeline de Eventos</h4>
                      <div className="h-px bg-white/5 w-full"></div>
                  </div>

                  <div className="space-y-16">
                      {upcomingEvents.slice(1).map((event, i) => (
                          <div key={event.id} className="flex gap-12 group items-start animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                              {/* Date Artifact */}
                              <div className="text-center w-20 shrink-0 space-y-2 pt-2">
                                  <span className="text-4xl font-black font-sans tracking-tighter text-white group-hover:text-primary transition-colors">
                                      {event.date.split(' ')[0]}
                                  </span>
                                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                      {event.date.split(' ')[1]}
                                  </span>
                              </div>

                              {/* Event Info */}
                              <div className="flex-1 space-y-6">
                                  <div className="flex items-center gap-4">
                                      <Badge variant="outline" className="border-white/10 text-zinc-500 text-[8px] px-3 py-1 font-black">{event.type}</Badge>
                                      <span className="text-[10px] font-mono text-zinc-600">{event.time} UTC-3</span>
                                  </div>
                                  <h5 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors cursor-pointer">
                                      {event.title}
                                  </h5>
                                  <div className="flex items-center gap-6">
                                      <div className="flex items-center gap-2">
                                          <Avatar className="h-6 w-6 grayscale">
                                              <AvatarFallback className="bg-zinc-800 text-[8px] font-bold">JC</AvatarFallback>
                                          </Avatar>
                                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{event.host}</span>
                                      </div>
                                      <span className="text-[10px] font-mono text-zinc-600 flex items-center gap-1">
                                          <Icon name="users" size="size-3" /> {event.attendees} membros
                                      </span>
                                  </div>
                              </div>

                              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-white/5 hover:bg-white/5">
                                      <Icon name="angle-small-right" />
                                  </Button>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="py-20 flex justify-center">
                      <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-primary transition-all">
                          Carregar Agenda Completa <Icon name="angle-small-down" className="ml-4" />
                      </Button>
                  </div>
              </div>

          </section>

      </main>

      {/* Background Minimal Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
    </div>
  );
};

export default CommunityEventsTemplate;
