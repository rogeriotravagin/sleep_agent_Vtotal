
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Symbol } from '../ui/symbol';

const CommunityAdvertorialTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="w-full bg-[#FCFAF7] text-[#1A1A1A] animate-fade-in pb-40 font-serif selection:bg-primary/30 selection:text-black">
      
      {/* Minimal Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

      {/* --- TOP BAR (The High-End Registry) --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-black/5 h-20">
          <div className="container max-w-7xl mx-auto px-10 h-full flex items-center justify-between">
              <div className="flex items-center gap-6">
                  <span className="font-sans font-black text-xl md:text-2xl tracking-tighter flex items-center gap-3">
                      <Symbol name="infinity" className="text-[#C9B298]" />
                      THE <span className="text-[#C9B298]">LEGENDARY</span> REPORT
                  </span>
                  <Separator orientation="vertical" className="h-6 bg-black/5 hidden md:block" />
                  <span className="text-[8px] font-black font-sans uppercase tracking-[0.4em] text-zinc-400 hidden lg:block mt-1">DOSSIER TÉCNICO • 2026</span>
              </div>
              
              <div className="flex items-center gap-10">
                  <nav className="hidden md:flex gap-8 text-[9px] font-black font-sans uppercase tracking-[0.3em] text-zinc-400">
                      <span className="text-black border-b border-black pb-1">Análise</span>
                      <span className="hover:text-black cursor-pointer transition-colors">Estratégia</span>
                      <span className="hover:text-black cursor-pointer transition-colors">Sistema</span>
                  </nav>
                  <Button size="sm" className="bg-black text-white hover:bg-zinc-800 rounded-full h-10 px-8 text-[9px] font-black uppercase tracking-widest shadow-xl">Assinar</Button>
              </div>
          </div>
      </header>

      <main className="container max-w-6xl mx-auto px-10 py-32 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* --- MAIN COLUMN --- */}
              <article className="lg:col-span-8 space-y-20">
                  
                  {/* Article Header */}
                  <header className="space-y-12">
                      <div className="space-y-4">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.8em] text-[9px] font-black px-8 py-2 rounded-full">
                            REPORTE DE MERCADO
                        </Badge>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-black">
                           A Morte da <br/>
                           <span className="text-zinc-300 italic font-serif font-light tracking-normal">Ocupação.</span>
                        </h1>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl text-zinc-500 font-serif font-light leading-relaxed border-l-2 border-primary/20 pl-10 italic max-w-2xl">
                          "Por que profissionais experientes estão falhando em 2026 mesmo trabalhando 12 horas por dia — e o sistema que separa o suor do resultado."
                      </h2>
                      
                      <div className="flex items-center justify-between py-10 border-y border-black/5">
                          <div className="flex items-center gap-6">
                              <Avatar className="w-14 h-14 border-2 border-white shadow-xl">
                                  <AvatarImage src={alanAvatar} className="grayscale" />
                                  <AvatarFallback>AN</AvatarFallback>
                              </Avatar>
                              <div>
                                  <p className="text-[10px] font-black font-sans uppercase tracking-[0.4em] text-primary">REDAÇÃO</p>
                                  <p className="text-lg font-bold font-sans tracking-tight">Investigação Lendária</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <Button variant="ghost" size="icon" className="rounded-full bg-black/5 hover:bg-black/10"><Icon name="linkedin" type="brands" /></Button>
                              <Button variant="ghost" size="icon" className="rounded-full bg-black/5 hover:bg-black/10"><Icon name="share" /></Button>
                          </div>
                      </div>
                  </header>

                  {/* High Resolution Artwork */}
                  <figure className="relative group">
                      <div className="absolute inset-10 bg-primary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      <div className="aspect-[16/9] w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 relative z-10 transition-transform duration-1000 group-hover:-translate-y-2">
                          <img 
                            src="https://images.unsplash.com/photo-1504384308090-c54be3852f9d?q=80&w=2070&auto=format&fit=crop" 
                            alt="The Crisis" 
                            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <figcaption className="text-[9px] font-black font-sans uppercase tracking-[0.4em] text-zinc-400 mt-6 text-center italic">
                          ARQUIVO 042 — O COLAPSO DOS SISTEMAS REATIVOS.
                      </figcaption>
                  </figure>

                  {/* Body Copy - Scientific Typography (max-w-65ch) */}
                  <div className="prose max-w-[65ch] font-serif text-xl leading-[1.7] text-zinc-800 space-y-12 mx-auto">
                      <p className="first-letter:text-9xl first-letter:font-black first-letter:text-primary first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-3 first-letter:font-sans">
                          A verdade é desconfortável: sua experiência acumulada não é um escudo contra a obsolescência. Em 2026, ter 20 anos de carreira e não dominar sistemas de IA é como ser um cavaleiro medieval assistindo à invenção da pólvora.
                      </p>
                      
                      <p>
                          O mercado saturou-se de "fazedores". A execução braçal tornou-se uma commodity barata. Hoje, o valor migrou inteiramente para a arquitetura, para o design de processos e para a curadoria de inteligência.
                      </p>

                      <div className="my-24 p-12 bg-white border border-black/5 rounded-[3rem] shadow-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-[15rem] pointer-events-none group-hover:scale-110 transition-transform duration-[3000ms]">
                            <Icon name="stats" />
                         </div>
                         <h4 className="text-[10px] font-black font-sans uppercase tracking-[0.6em] text-primary mb-10">DADOS DE CAMPO</h4>
                         <div className="grid grid-cols-2 gap-10">
                            <div>
                                <span className="text-5xl font-black font-sans tracking-tighter">80%</span>
                                <p className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-500 mt-2">DO TEMPO GASTO EM REAÇÃO</p>
                            </div>
                            <div>
                                <span className="text-5xl font-black font-sans tracking-tighter text-red-600">65%</span>
                                <p className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-500 mt-2"> BURN OUT EM LÍDERES 40+</p>
                            </div>
                         </div>
                      </div>

                      <h3 className="text-4xl font-black font-sans tracking-tighter text-black mt-24 mb-10">O Segundo Cérebro.</h3>
                      
                      <p>
                          Alan Nicolas, fundador da Academia Lendária, defende que a única saída é a construção de um ecossistema cognitivo externo. Não se trata de delegar para outras pessoas — isso é caro e ineficiente. Trata-se de delegar para sistemas.
                      </p>

                      <blockquote className="my-20 pl-12 border-l-2 border-primary py-4 italic text-3xl font-light text-zinc-500 leading-tight">
                        "Liderança não é suar. É decidir com precisão cirúrgica."
                      </blockquote>

                      <p>
                          Aqueles que adotaram o framework de três camadas — Identidade, Sistema e Automação — viram suas margens de lucro líquido subirem em média 40% em menos de um semestre. Eles não contrataram mais; eles orquestraram melhor.
                      </p>
                  </div>

                  {/* Action Card Section */}
                  <div className="pt-20">
                    <Card className="bg-black text-white rounded-[3.5rem] p-16 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,178,152,0.1),transparent_70%)]"></div>
                        <div className="relative z-10 text-center space-y-12">
                            <div className="space-y-6">
                                <Badge className="bg-primary text-black font-black uppercase tracking-[0.5em] text-[9px] px-8 py-2 rounded-full mx-auto border-none">O CONVITE</Badge>
                                <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Mude seu Sistema. <br/><span className="text-zinc-500 italic font-serif font-light tracking-normal">Mude seu Destino.</span></h3>
                            </div>
                            <p className="text-xl text-zinc-400 font-serif leading-relaxed max-w-xl mx-auto italic">
                                Junte-se à elite que está reconstruindo as regras do jogo. A Comunidade Lendária está com acessos limitados para a próxima coorte.
                            </p>
                            <Button className="h-20 px-20 rounded-full bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-glow active:scale-95 border-none">
                                ACESSAR O PORTAL
                            </Button>
                        </div>
                    </Card>
                  </div>
              </article>

              {/* --- SIDEBAR COLUMN (The Fileshelf) --- */}
              <aside className="lg:col-span-4 space-y-20">
                  <div className="sticky top-32 space-y-20">
                      
                      {/* Related Dossiers */}
                      <div className="space-y-10">
                          <h5 className="text-[10px] font-black font-sans uppercase tracking-[0.6em] text-zinc-400 border-b border-black/5 pb-4">ARQUIVOS RELACIONADOS</h5>
                          <div className="space-y-12">
                              {[
                                  { t: "A Anatomia da Decisão", d: "Como IAs de alta performance analisam cenários de risco.", c: "IA & RISCO" },
                                  { t: "O Custo do Silêncio", d: "Por que a falta de comunicação sistêmica mata o lucro.", c: "CULTURA" },
                                  { t: "Humanos Exponenciais", d: "O novo perfil do gestor que o mercado busca.", c: "LIDERANÇA" }
                              ].map((item, i) => (
                                  <div key={i} className="group cursor-pointer space-y-4">
                                      <p className="text-[8px] font-black font-sans text-primary uppercase tracking-widest">{item.c}</p>
                                      <h6 className="text-xl font-bold font-sans tracking-tight group-hover:text-primary transition-colors">{item.t}</h6>
                                      <p className="text-sm text-zinc-500 font-serif leading-relaxed italic">{item.d}</p>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Author Card (Side) */}
                      <div className="bg-white border border-black/5 p-10 rounded-[3rem] shadow-xl space-y-8 relative overflow-hidden group">
                           <Icon name="shield-check" className="absolute -right-4 -bottom-4 text-9xl text-primary opacity-[0.03] group-hover:scale-110 transition-transform duration-[3000ms]" />
                           <Avatar className="w-20 h-20 border-4 border-white shadow-2xl">
                               <AvatarImage src={alanAvatar} className="grayscale" />
                               <AvatarFallback>AN</AvatarFallback>
                           </Avatar>
                           <div className="space-y-2">
                               <h5 className="text-2xl font-black tracking-tighter">Alan Nicolas</h5>
                               <p className="text-[9px] font-black font-sans text-primary uppercase tracking-[0.4em]">SYSTEMS DESIGNER</p>
                           </div>
                           <p className="text-sm text-zinc-500 font-serif leading-relaxed italic opacity-80">
                               Fundador do movimento Vida Lendária. Ajuda profissionais a recuperarem a soberania do próprio tempo.
                           </p>
                           <Button variant="outline" className="w-full rounded-2xl border-black/10 text-black font-black uppercase text-[9px] tracking-[0.3em] h-12">VER PERFIL</Button>
                      </div>

                      {/* Final Micro-Note */}
                      <div className="text-center space-y-4 px-10">
                          <Symbol name="infinity" className="text-zinc-200 text-5xl" />
                          <p className="text-[8px] font-black font-sans text-zinc-400 uppercase tracking-[0.4em]">IMORTALIZE SEU LEGADO</p>
                      </div>

                  </div>
              </aside>

          </div>
      </main>

      {/* Global Minimal Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-[60]"></div>
    </div>
  );
};

export default CommunityAdvertorialTemplate;
