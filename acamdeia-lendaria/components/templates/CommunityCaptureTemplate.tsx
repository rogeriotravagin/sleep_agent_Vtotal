
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const CommunityCaptureTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30 relative">
      
      {/* Immersive Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]"></div>
      </div>
      
      {/* Header HUD */}
      <header className="sticky top-0 z-50 bg-transparent backdrop-blur-xl border-b border-white/5 h-20">
          <div className="container max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer group">
                  <Symbol name="infinity" className="text-white text-2xl group-hover:scale-110 transition-transform" />
                  <span className="font-black text-[10px] uppercase tracking-[0.4em] text-white">Academia Lendária</span>
              </div>
              <Badge variant="outline" className="text-zinc-500 border-white/10 uppercase tracking-[0.4em] text-[8px] font-black px-4 py-1.5 rounded-full hidden sm:block">
                  DOSSIER GRATUITO
              </Badge>
          </div>
      </header>

      {/* Main Content Split */}
      <main className="flex-1 container max-w-7xl mx-auto px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
          
          {/* Left: Copy & Narrative */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
              <div className="space-y-8">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.6em] text-[10px] font-black px-6 py-2 rounded-full">
                      PROTOCOLO 2026
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                      O Segundo <br/>
                      <span className="text-zinc-600 italic font-serif font-light tracking-normal">Cérebro.</span>
                  </h1>
                  
                  <p className="text-2xl md:text-3xl font-serif font-light text-zinc-400 leading-relaxed max-w-2xl border-l-2 border-primary/20 pl-10 italic">
                      "Como profissionais experientes estão usando IA para resgatar 15h por semana e focar apenas no que é vital."
                  </p>
              </div>

              {/* Creator Note Card */}
              <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-[12rem] pointer-events-none group-hover:scale-110 transition-transform duration-[3000ms]">
                      <Icon name="brain" />
                  </div>
                  <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 border border-primary/30">
                              <AvatarImage src={alanAvatar} className="grayscale" />
                              <AvatarFallback>AN</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">NOTA DO FUNDADOR</p>
                              <p className="text-lg font-bold text-white tracking-tight">Alan Nicolas</p>
                          </div>
                      </div>
                      <p className="text-lg text-zinc-500 font-serif leading-relaxed italic">
                          "O erro de 95% dos líderes é tentar aprender IA como uma ferramenta isolada. Eu vou te ensinar a integrá-la à sua própria biologia cognitiva."
                      </p>
                  </div>
              </div>

              {/* The "What's Inside" Exhibition */}
              <div className="space-y-10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600 border-b border-white/5 pb-4">CONTEÚDO DO DOSSIER</h4>
                  <div className="grid gap-8">
                      {[
                          { t: "O LOOP DA EXECUÇÃO", d: "Por que saber muito está te impedindo de realizar e como quebrar esse ciclo." },
                          { t: "ARQUITETURA DE AGENTES", d: "Como clonar sua tomada de decisão em processos autônomos." },
                          { t: "ZONA DE GENIALIDADE", d: "O checklist definitivo para identificar onde sua experiência gera mais ROI." }
                      ].map((item, i) => (
                          <div key={i} className="flex gap-8 group">
                              <span className="text-4xl font-black text-white/5 font-sans italic transition-colors group-hover:text-primary/20">0{i+1}</span>
                              <div className="space-y-2">
                                  <h5 className="font-black text-xs uppercase tracking-[0.3em] text-zinc-300">{item.t}</h5>
                                  <p className="text-base text-zinc-500 font-serif leading-snug">{item.d}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right: The Artifact Display (3D Book + Form) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-12 order-1 lg:order-2">
              
              {/* 3D Luxury Artifact */}
              <div className="relative group perspective-1000 hidden md:block w-full max-w-[320px]">
                  <div className="absolute inset-10 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative aspect-[3/4] rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-10 overflow-hidden transform rotate-y-[-10deg] transition-all duration-1000 group-hover:rotate-y-0 group-hover:-translate-y-4">
                      <div className="absolute top-8 right-8">
                          <Symbol name="infinity" className="text-primary text-3xl opacity-50" />
                      </div>
                      <div className="text-center space-y-4 relative z-10">
                          <h3 className="text-3xl font-black font-sans uppercase tracking-tighter leading-none text-white">SEGUNDO<br/><span className="text-primary">CÉREBRO</span></h3>
                          <Separator className="w-10 mx-auto bg-primary/30" />
                          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">Framework Oficial v2.0</p>
                      </div>
                  </div>
              </div>

              {/* Capture Card */}
              <Card className="w-full bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                  <CardContent className="p-0 space-y-8">
                      <div className="text-center space-y-2">
                          <h3 className="text-2xl font-bold tracking-tight">Baixe Gratuitamente</h3>
                          <p className="text-xs text-zinc-500 font-black uppercase tracking-widest">Protocolo de Elite</p>
                      </div>
                      
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                          <div className="space-y-1.5">
                              <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-1">Seu Nome</Label>
                              <Input placeholder="COMO DEVEMOS TE CHAMAR?" className="h-14 bg-white/[0.01] border-white/5 text-xs font-bold uppercase tracking-widest placeholder:text-zinc-800 focus:border-primary/50 rounded-xl" />
                          </div>
                          <div className="space-y-1.5">
                              <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-1">Melhor Email</Label>
                              <Input type="email" placeholder="ONDE ENVIAR O ACESSO?" className="h-14 bg-white/[0.01] border-white/5 text-xs font-bold uppercase tracking-widest placeholder:text-zinc-800 focus:border-primary/50 rounded-xl" />
                          </div>
                          <Button className="w-full h-16 bg-foreground text-background font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                              Quero o Dossier <Icon name="arrow-right" className="ml-3" />
                          </Button>
                      </form>
                      
                      <p className="text-[8px] text-center text-zinc-700 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Icon name="lock" size="size-3" /> Conexão Criptografada • Zero Spam
                      </p>
                  </CardContent>
              </Card>
          </div>
      </main>

      {/* Social Proof Footer */}
      <footer className="bg-transparent border-t border-white/5 py-16 relative z-10">
          <div className="container max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center">
              <div className="space-y-1">
                  <p className="text-3xl font-black font-mono text-white tracking-tighter">20.000+</p>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">MEMBROS FORMADOS</p>
              </div>
              <div className="w-px h-10 bg-white/5 hidden md:block"></div>
              <div className="space-y-1">
                  <p className="text-3xl font-black font-mono text-white tracking-tighter">40+</p>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">PAÍSES ATIVOS</p>
              </div>
              <div className="w-px h-10 bg-white/5 hidden md:block"></div>
              <div className="space-y-1">
                  <p className="text-3xl font-black font-mono text-primary tracking-tighter">98%</p>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">RETENÇÃO COGNITIVA</p>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default CommunityCaptureTemplate;
