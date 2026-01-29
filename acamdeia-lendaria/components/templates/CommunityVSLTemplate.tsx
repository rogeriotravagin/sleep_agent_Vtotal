import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

// FIX: Added onNavigate to props interface
interface CommunityVSLTemplateProps {
  onNavigate?: (section: Section) => void;
}

const CommunityVSLTemplate: React.FC<CommunityVSLTemplateProps> = ({ onNavigate }) => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30 selection:text-black">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] bg-red-600/5 blur-[150px] rounded-full opacity-50" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-8 text-center z-10 space-y-16">
          <div className="max-w-6xl mx-auto space-y-12">
              
              <div className="space-y-8">
                  <Badge variant="outline" className="text-red-500 border-red-500/30 bg-red-500/5 uppercase tracking-[0.8em] text-[10px] font-black px-10 py-3 rounded-full animate-pulse">
                      CONTEÚDO SENSÍVEL
                  </Badge>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                      A Experiência <br/>
                      <span className="text-zinc-700 italic font-serif font-light tracking-normal">Ou a Irrelevância.</span>
                  </h1>
                  <p className="text-2xl md:text-3xl font-serif font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed italic opacity-80">
                      "Assista e descubra por que 80% dos profissionais sêniores estão perdendo a corrida para jovens de 25 anos com acesso à IA."
                  </p>
              </div>

              {/* Cinematic Video Player */}
              <div className="max-w-5xl mx-auto relative group perspective-1000">
                  <div className="absolute inset-20 bg-red-600/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="aspect-video bg-black rounded-[3rem] border border-white/5 shadow-[0_60px_120px_rgba(0,0,0,0.9)] overflow-hidden group cursor-pointer ring-1 ring-white/5 transform transition-all duration-1000 group-hover:-translate-y-4">
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform border border-white/20 shadow-2xl">
                              <Icon name="play" className="text-white text-3xl" type="solid" />
                          </div>
                      </div>
                      
                      {/* Thumbnail Placeholder */}
                      <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
                          
                          {/* Fake Abstract Visuals */}
                          <div className="relative z-10 flex flex-col items-center">
                              <Symbol name="infinity" className="text-[15rem] text-white/5 animate-spin-slow" />
                          </div>
                      </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="mt-8 flex items-center justify-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Transmissão Ativa • 98% de Retenção</span>
                  </div>
              </div>
          </div>
      </section>

      {/* --- TIMESTAMPS: O ROTEIRO DO DESPERTAR --- */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 z-10 relative">
          <div className="container max-w-3xl mx-auto px-8 space-y-12">
              <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em] text-center">ANATOMIA DA REVELAÇÃO</h3>
              <div className="space-y-6">
                  {[
                      { time: "00:00", text: "O fim do trabalho braçal intelectual: por que diplomas não bastam mais." },
                      { time: "03:42", text: "O 'Segundo Cérebro': o sistema que Alan Nicolas usou para gerir R$200M+." },
                      { time: "08:15", text: "A 'Fórmula da Escala Solitária': como produzir por 10 pessoas sendo apenas uma." },
                      { time: "12:50", text: "O convite para o Hall das Lendas: como entrar no ecossistema." }
                  ].map((item, i) => (
                      <div key={i} className="flex gap-8 p-6 rounded-2xl hover:bg-white/[0.03] transition-all cursor-default group border border-transparent hover:border-white/5">
                          <span className="font-mono text-primary font-black text-lg group-hover:scale-110 transition-transform">{item.time}</span>
                          <p className="text-lg text-zinc-400 font-serif italic group-hover:text-zinc-200 transition-colors leading-snug">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- AUTHORITY: THE ARCHITECT --- */}
      <section className="py-48 container max-w-5xl mx-auto px-8 z-10 relative">
          <div className="text-center space-y-16">
                <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"></div>
                        <Avatar className="w-32 h-32 border-4 border-[#0a0a0a] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000">
                            <AvatarImage src={alanAvatar} />
                            <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-4xl font-black tracking-tighter text-white">Alan Nicolas</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Founder & System Architect</p>
                    </div>
                </div>
                <p className="text-3xl font-serif font-light text-zinc-400 italic leading-relaxed max-w-3xl mx-auto opacity-90">
                    "Não vou te ensinar a usar ferramentas. Vou te ensinar a pensar com uma clareza que tornará qualquer ferramenta sua escrava, não sua distração."
                </p>
                <div className="flex justify-center gap-12 pt-8">
                    {[
                        { label: "ALUNOS", value: "20k+" },
                        { label: "FATURAMENTO", value: "R$200M+" },
                        { label: "PAÍSES", value: "40+" }
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl font-black font-mono tracking-tighter text-white">{s.value}</p>
                            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
          </div>
      </section>

      {/* --- FINAL ACTION: THE DOOR --- */}
      <section className="py-64 text-center z-10 relative">
          <div className="max-w-4xl mx-auto space-y-12 px-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white">
                Pronto para sair <br/>
                <span className="text-zinc-600 italic font-serif font-light tracking-normal">do loop?</span>
              </h2>
              
              <div className="flex justify-center pt-8">
                <Button 
                    className="h-24 px-24 rounded-[3rem] bg-white text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-[0_40px_100px_rgba(255,255,255,0.1)] active:scale-95 group relative overflow-hidden border-none"
                    onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)}
                >
                    <span className="relative z-10">Conhecer a Comunidade</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </Button>
              </div>

              <div className="flex justify-center gap-8 pt-12 opacity-30">
                  <Symbol name="star" /> <Symbol name="star" /> <Symbol name="star" />
              </div>
          </div>
      </section>

      {/* Global Minimal Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
    </div>
  );
};

export default CommunityVSLTemplate;