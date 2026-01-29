import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Symbol } from '../ui/symbol';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Spotlight } from '../ui/spotlight';
// FIX: Added missing imports for cn and Section
import { cn } from '../../lib/utils';
import { Section } from '../../types';

// FIX: Added onNavigate to props interface
interface CommunitySalesTemplateProps {
  onNavigate?: (section: Section) => void;
}

const CommunitySalesTemplate: React.FC<CommunitySalesTemplateProps> = ({ onNavigate }) => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans animate-fade-in pb-40 overflow-x-hidden selection:bg-primary/30">
      
      {/* Immersive Atmospheric Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[70vh] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-48 px-8 border-b border-white/5 z-10">
          <div className="container max-w-7xl mx-auto text-center space-y-16">
              {/* Promise Badge */}
              <div className="flex justify-center">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-8 py-2 rounded-full uppercase tracking-[0.6em] text-[10px] font-black">
                    VANTAGEM COMPETITIVA 2026
                </Badge>
              </div>

              {/* Headline */}
              <div className="space-y-10">
                  <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] text-white">
                      Sua Experiência <br/>
                      <span className="text-zinc-600 italic font-serif font-light tracking-normal">Multiplicada.</span>
                  </h1>
                  <p className="text-2xl md:text-3xl font-serif font-light text-zinc-400 leading-relaxed max-w-3xl mx-auto italic opacity-80">
                    "O ecossistema que 20.000+ profissionais usaram para transformar décadas de bagagem em um legado imortal potencializado por IA."
                  </p>
              </div>

              {/* Immersive Video Artifact */}
              <div className="max-w-5xl mx-auto relative group perspective-1000">
                  <div className="absolute inset-20 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group cursor-pointer overflow-hidden ring-1 ring-white/5 transform transition-all duration-1000 group-hover:-translate-y-4">
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-2xl">
                              <Icon name="play" className="text-3xl" type="solid" />
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Masterclass" />
                  </div>
              </div>

              {/* HUD CTA */}
              <div className="pt-12 flex flex-col items-center gap-6">
                  <Button 
                    size="lg" 
                    className="h-20 px-20 rounded-[2.5rem] bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-[0_30px_80px_rgba(201,178,152,0.3)] active:scale-95 group overflow-hidden relative border-none"
                    onClick={() => onNavigate?.(Section.TEMPLATE_LMS_MY_BOOKS)}
                  >
                      <span className="relative z-10">Tornar-se Lendário</span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                  </Button>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.5em]">
                      GARANTIA DE 30 DIAS • ACESSO IMEDIATO
                  </p>
              </div>
          </div>
      </section>

      {/* --- DIAGNOSIS: O PADRÃO DA ELITE --- */}
      <section className="py-40 container max-w-6xl mx-auto px-8 space-y-24 z-10 relative">
          <div className="text-center space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">A FRONTEIRA DO CONHECIMENTO</h2>
              <p className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white">Você está operando <br/><span className="text-primary italic font-serif font-light tracking-normal">abaixo do potencial?</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                  "Já comprou dezenas de cursos, mas nenhum gerou resultado consistente.",
                  "Começa projetos empolgado, mas os abandona antes da tração real.",
                  "Sente que o tempo está passando e você ainda não construiu nada próprio.",
                  "Tem medo real de ser substituído por alguém 20 anos mais novo usando IA."
              ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                      <span className="text-5xl font-black text-white/5 font-sans italic transition-colors group-hover:text-primary/20">0{i+1}</span>
                      <p className="text-xl text-zinc-500 font-serif leading-relaxed italic group-hover:text-zinc-300 transition-colors">
                          "{item}"
                      </p>
                  </div>
              ))}
          </div>
      </section>

      {/* --- STATS: O DOSSIER --- */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 z-10 relative">
          <div className="container max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  {[
                      { l: "TEMPO PERDIDO", v: "80%", c: "text-red-500" },
                      { l: "BURN OUT RISK", v: "60%", c: "text-orange-500" },
                      { l: "RENDA ESTAGNADA", v: "55%", c: "text-zinc-500" },
                      { l: "REVOLUÇÃO IA", v: "2026", c: "text-primary" }
                  ].map((stat, i) => (
                      <div key={i} className="space-y-2">
                          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">{stat.l}</p>
                          <p className={cn("text-5xl font-black font-mono tracking-tighter", stat.c)}>{stat.v}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- AUTHORITY: SYNTHETIC MIND PROFILE --- */}
      <section className="py-48 container max-w-5xl mx-auto px-8 z-10 relative">
          <div className="group bg-gradient-to-br from-zinc-900/40 to-black border border-white/5 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-[25rem] text-primary group-hover:scale-110 transition-transform duration-[4000ms] pointer-events-none">
                    <Icon name="brain" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center md:items-start">
                    <div className="shrink-0 text-center space-y-6">
                        <Avatar className="w-48 h-48 border-4 border-[#0a0a0a] shadow-2xl ring-2 ring-primary/20">
                            <AvatarImage src={alanAvatar} className="grayscale hover:grayscale-0 transition-all duration-1000" />
                            <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-primary text-black font-black text-[9px] uppercase tracking-[0.5em] py-3 px-8 rounded-full border-none">FOUNDER</Badge>
                    </div>
                    
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <h4 className="text-5xl font-black tracking-tighter text-white">Alan Nicolas</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">O Arquiteto de Sistemas</p>
                        </div>

                        <div className="max-w-[50ch] space-y-6">
                            <p className="text-2xl font-serif leading-[1.6] text-zinc-300 font-light italic">
                                "Não sou um guru de palco. Sou um engenheiro de produtividade que faturou R$200M+ e formou 20.000 alunos. Minha missão é simples: tornar você imbatível usando a tecnologia como extensão da sua alma."
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div>
                                    <p className="text-3xl font-black font-mono tracking-tighter text-white">R$ 200M</p>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">FATURADOS</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black font-mono tracking-tighter text-white">98%</p>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">RETENÇÃO IA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </section>

      {/* --- THE MODULES: CATÁLOGO DE POTÊNCIA --- */}
      <section className="py-32 container max-w-7xl mx-auto px-8 space-y-24 z-10 relative">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">A GRADE CURRICULAR</h2>
              <p className="text-xs font-mono text-primary font-bold">8 STUDIOS DISPONÍVEIS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                  { i: "brain", t: "Fluência em IA", d: "Domine os fundamentos que 99% ignora. Aprenda a programar o mundo sem código." },
                  { i: "layers", t: "Segundo Cérebro", d: "O sistema de organização definitiva que libera sua mente do tédio operacional." },
                  { i: "rocket", t: "Máquina de Vendas", d: "Configure agentes que prospectam, qualificam e vendem enquanto você dorme." },
                  { i: "target", t: "Zona de Genialidade", d: "Encontre seu ponto de maior impacto e delegue todo o resto para a IA." },
                  { i: "mask", t: "Clones de Voz", d: "Multiplique sua presença digital sem sacrificar sua sanidade ou autenticidade." },
                  { i: "shield-check", t: "Mentalidade Lendária", d: "O software mental necessário para prosperar no caos tecnológico de 2026." }
              ].map((mod, i) => (
                  <Spotlight key={i} className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 space-y-8 hover:bg-white/[0.03] transition-all duration-700 cursor-pointer group">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 border border-white/5">
                          <Icon name={mod.i} size="size-7" />
                      </div>
                      <div className="space-y-4">
                          <h4 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">{mod.t}</h4>
                          <p className="text-base text-zinc-500 font-serif leading-relaxed italic">{mod.d}</p>
                      </div>
                  </Spotlight>
              ))}
          </div>
      </section>

      {/* --- PRICING: O INVESTIMENTO NO LEGADO --- */}
      <section className="py-64 container max-w-4xl mx-auto px-8 text-center space-y-16 z-10 relative">
          <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-[0.8em] text-[10px] font-black px-10 py-3 rounded-full">
                  CONVITE ÚNICO
              </Badge>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-white">
                O Futuro <br/>
                <span className="text-zinc-600 italic font-serif font-light tracking-normal">Não Espera.</span>
              </h2>
          </div>

          <Card className="bg-white/[0.02] border-2 border-primary rounded-[3.5rem] p-16 md:p-24 shadow-[0_50px_100px_rgba(201,178,152,0.15)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,178,152,0.1),transparent_70%)]"></div>
               <div className="relative z-10 space-y-12">
                   <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">VALOR DE ADESÃO</p>
                       <div className="flex items-baseline justify-center gap-2">
                           <span className="text-2xl font-light text-zinc-600">12X R$</span>
                           <span className="text-8xl md:text-9xl font-black tracking-tighter text-white">98</span>
                       </div>
                       <p className="text-sm text-zinc-500 font-serif italic">Ou R$ 997 à vista pelo legado eterno.</p>
                   </div>
                   
                   <Button className="h-24 px-24 rounded-full bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-[0_30px_80px_rgba(201,178,152,0.3)] active:scale-95">
                        ENTRAR NA COMUNIDADE
                   </Button>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">
                        <span className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest"><Icon name="shield-check" size="size-3" /> 30 Dias Garantia</span>
                        <span className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest"><Icon name="microchip" size="size-3" /> 9 IAs Premium</span>
                        <span className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest"><Icon name="lock" size="size-3" /> Pagamento Seguro</span>
                   </div>
               </div>
          </Card>
      </section>

      {/* Global Minimal Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
    </div>
  );
};

export default CommunitySalesTemplate;