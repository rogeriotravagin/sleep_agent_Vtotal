
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Separator } from '../ui/separator';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface BookSalesPageTemplateProps {
  onNavigate?: (section: Section) => void;
}

const BookSalesPageTemplate: React.FC<BookSalesPageTemplateProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const books = [
    { title: "Atomic Habits", author: "James Clear", color: "bg-[#F4F1EA]", rotation: "-6deg" },
    { title: "How to Win Friends", author: "Dale Carnegie", color: "bg-[#B41E24]", rotation: "4deg" },
    { title: "Principles", author: "Ray Dalio", color: "bg-white", rotation: "-3deg" },
    { title: "Deep Work", author: "Cal Newport", color: "bg-[#FDFDFD]", rotation: "2deg" },
    { title: "7 Habits", author: "Stephen Covey", color: "bg-[#3D5288]", rotation: "-5deg" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", color: "bg-[#F9F6F0]", rotation: "3deg" },
    { title: "48 Laws of Power", author: "Robert Greene", color: "bg-[#002D62]", rotation: "-4deg" },
    { title: "The Desire Map", author: "Danielle LaPorte", color: "bg-[#F3E5D8]", rotation: "6deg" },
    { title: "Sapiens", author: "Yuval Noah Harari", color: "bg-[#F4EFE6]", rotation: "-2deg" },
    { title: "Meditations", author: "Marcus Aurelius", color: "bg-black", rotation: "5deg" },
    { title: "Subtle Art", author: "Mark Manson", color: "bg-[#FF4F00]", rotation: "-3deg" },
    { title: "Psychology of Money", author: "Morgan Housel", color: "bg-white", rotation: "4deg" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans animate-fade-in overflow-x-hidden selection:bg-brand-gold/30 selection:text-black">
      
      {/* --- PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/5 z-[110]">
        <div 
          className="h-full bg-brand-gold transition-all duration-150 ease-out shadow-[0_0_10px_rgba(201,178,152,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-white/60 backdrop-blur-2xl border-b border-black/5 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate?.(Section.CONCEPT)}>
          <Symbol name="infinity" className="text-black text-2xl group-hover:scale-110 transition-transform" />
          <span className="font-black text-[10px] uppercase tracking-[0.4em] hidden sm:block">Reconstruído</span>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <a href="#diferencial" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors">Diferencial</a>
          <a href="#metodo" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors">Método</a>
          <a href="#precos" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors">Planos</a>
        </div>
        <Button 
          className="bg-black text-white rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
          onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)}
        >
          Acessar Vault
        </Button>
      </nav>

      <main>
        {/* --- HERO SECTION: NO OMBRO DE LENDÁRIOS --- */}
        <section className="relative pt-32 pb-24 md:pt-56 md:pb-48 overflow-hidden border-b border-black/5">
          <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-brand-gold/5 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              
              {/* Copy Side */}
              <div className="lg:col-span-6 space-y-12 text-left">
                <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.6em] text-[9px] font-black px-6 py-2 rounded-full">
                    A maior destilaria intelectual
                  </Badge>
                  <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.85] text-black">
                    No ombro de <br/>
                    <span className="text-zinc-300 italic font-serif font-light tracking-normal">lendários.</span>
                  </h1>
                </div>
                
                <p className="text-2xl md:text-3xl font-serif font-light text-zinc-500 leading-relaxed max-w-xl border-l-2 border-brand-gold/30 pl-8">
                  Décadas de sabedoria, atualizadas para 2026 e <br/>
                  <span className="text-black font-bold not-italic">prontas em 30 minutos.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-4 items-start">
                   <Button 
                    className="h-20 px-16 rounded-[2rem] bg-[#3B82F6] text-white font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-[0_20px_50px_rgba(59,130,246,0.3)] active:scale-95 border-none relative overflow-hidden group"
                    onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)}
                   >
                     <span className="relative z-10">Cadastre-se grátis</span>
                     <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                   </Button>
                   <div className="flex items-center gap-4 py-4 px-6">
                      <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <Avatar key={i} className="border-4 border-white w-10 h-10 shadow-lg">
                            <AvatarImage src={`https://i.pravatar.cc/100?u=${i+10}`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <span className="text-black font-black">+20k membros</span> ativos
                      </p>
                   </div>
                </div>
              </div>

              {/* Visual Side: The Book Grid inspired by Shortform/Blinkist */}
              <div className="lg:col-span-6 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#FFCC00] rounded-full -z-10 opacity-90 shadow-2xl animate-pulse-slow"></div>
                 
                 <div className="grid grid-cols-3 gap-4 md:gap-8 transform rotate-[-5deg] scale-100 md:scale-110">
                    {books.map((book, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "aspect-[2/3] rounded-xl shadow-2xl border border-black/5 overflow-hidden transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:z-20 p-3 md:p-5 flex flex-col justify-between group",
                          book.color,
                          i % 2 === 0 ? "mt-12" : "mt-0"
                        )}
                        style={{ transform: `rotate(${book.rotation})` }}
                      >
                         <div className="space-y-2">
                            <p className={cn("text-[7px] md:text-[9px] font-black uppercase tracking-widest opacity-60", book.color === 'bg-black' ? 'text-white' : 'text-black')}>
                               {book.author}
                            </p>
                            <Separator className={cn("bg-black/10", book.color === 'bg-black' && "bg-white/20")} />
                         </div>
                         <h4 className={cn("text-[10px] md:text-xl font-bold leading-tight uppercase tracking-tighter line-clamp-4", book.color === 'bg-black' ? 'text-white' : 'text-black')}>
                            {book.title}
                         </h4>
                         <div className="flex justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                             <Symbol name="infinity" className={cn("text-sm md:text-2xl", book.color === 'bg-black' ? 'text-white' : 'text-black')} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- POSITIONING: DESTILADO PARA HOJE --- */}
        <section id="diferencial" className="py-32 px-6 bg-white">
          <div className="container max-w-6xl mx-auto space-y-24">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Diferenciador Central</h2>
              <p className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-black">
                Resumos congelam livros no passado. <br/>
                <span className="text-zinc-300 italic font-serif font-light">Nós destilamos para hoje.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Não comprimimos", value: "Reconstruímos", desc: "Não cortamos páginas; reorganizamos conceitos para aplicação imediata.", icon: "layers" },
                { title: "Não aceitamos", value: "Questionamos", desc: "Todo autor tem vieses. Nós trazemos contra-argumentos de 10+ fontes.", icon: "search" },
                { title: "Não congelamos", value: "Atualizamos", desc: "Conectamos sabedoria antiga com as ferramentas de IA de 2026.", icon: "refresh" },
                { title: "Não informamos", value: "Preparamos", desc: "O output não é conhecimento, é a sua próxima grande decisão.", icon: "target" },
              ].map((item, i) => (
                <Card key={i} className="border-none bg-zinc-50 p-10 rounded-[2.5rem] group hover:bg-[#F2EFE9] transition-all hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon name={item.icon} size="size-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{item.title}</p>
                  <h3 className="text-2xl font-bold mb-4">{item.value}</h3>
                  <p className="text-sm text-zinc-500 font-serif leading-relaxed italic">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- METHOD: O PROCESSO DE 4 CAMADAS --- */}
        <section id="metodo" className="py-32 px-6 bg-[#050505] text-white rounded-[4rem] mx-4 my-12">
            <div className="container max-w-6xl mx-auto space-y-24">
                <div className="text-center space-y-8">
                    <Badge className="bg-primary text-black hover:bg-primary font-black px-8 py-2 rounded-full uppercase tracking-widest text-[10px]">O Sistema Operacional da Mente</Badge>
                    <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-none">
                        4 camadas de <br/>
                        <span className="text-zinc-500 italic font-serif font-light">transformação.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 hidden md:block -z-0"></div>
                    {[
                        { step: "01", title: "Extração", desc: "21 categorias de captura exaustiva: de mecanismos ocultos a anti-padrões fatais." },
                        { step: "02", title: "Crítica", desc: "Vieses do autor, contra-argumentos obrigatórios e limitações de contexto." },
                        { step: "03", title: "Ação", desc: "Exercícios de OUTPUT (o que você produz) e INSIGHT (o que você descobre)." },
                        { step: "04", title: "Expansão", desc: "8 famílias de Viral Quotes categorizadas por gatilhos psicológicos." },
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 space-y-8 text-center group">
                            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto group-hover:border-primary transition-all duration-700 shadow-2xl relative">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="text-2xl font-black font-mono text-zinc-600 group-hover:text-primary transition-colors relative z-10">{item.step}</span>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-sm text-zinc-500 font-serif leading-relaxed px-4 italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-20 text-center">
                    <p className="text-zinc-500 font-serif text-xl italic max-w-2xl mx-auto">
                        "O livro é a matéria-prima. O Reconstruído é a ferramenta que transforma essa matéria em realidade."
                    </p>
                </div>
            </div>
        </section>

        {/* --- COMPARISON: TABLE --- */}
        <section className="py-32 px-6">
          <div className="container max-w-5xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400">Benchmarking de Inteligência</h2>
              <p className="text-4xl font-bold">Por que somos a única escolha para a Elite.</p>
            </div>
            
            <div className="overflow-x-auto rounded-[2.5rem] border border-black/5 bg-white shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="py-10 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-400">Capacidade</th>
                    <th className="py-10 px-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Resumos Comuns</th>
                    <th className="py-10 px-6 text-[10px] font-black uppercase tracking-widest text-primary text-center">Reconstruído</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    { label: "Profundidade", common: "Superficial", ours: "Exaustiva (21 Categorias)" },
                    { label: "Pensamento Crítico", common: "Zero", ours: "Obrigatório (Vieses/Contra-args)" },
                    { label: "Fricção Pedagógica", common: "Passiva", ours: "Ativa (Exercícios de Output)" },
                    { label: "Validação Externa", common: "Nenhuma", ours: "10+ Fontes Cruzadas" },
                    { label: "Modos de Consumo", common: "Estático", ours: "3 Modos (2/30/60 min)" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-zinc-50 transition-colors">
                      <td className="py-8 px-10 text-sm font-bold">{row.label}</td>
                      <td className="py-8 px-6 text-center text-xs text-zinc-400 font-serif italic">{row.common}</td>
                      <td className="py-8 px-6 text-center text-sm font-black text-black">{row.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- PRICING: INVESTIMENTO NO LEGADO --- */}
        <section id="precos" className="py-48 px-6 bg-[#FDFCFB] relative overflow-hidden">
          <div className="container max-w-5xl mx-auto text-center space-y-24 relative z-10">
            <div className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Investimento no seu Legado</h2>
              <p className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-none">Escolha como <br/><span className="text-primary italic font-serif font-light tracking-normal">quer crescer.</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Plan 1 */}
              <Card className="rounded-[3rem] border border-black/5 p-16 space-y-12 bg-white hover:border-black/10 transition-all hover:shadow-xl">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">EXPLORADOR</p>
                    <h3 className="text-5xl font-black">Grátis</h3>
                    <p className="text-xs text-zinc-400 font-serif italic">Para quem está descobrindo o topo.</p>
                  </div>
                  <Separator className="bg-black/5" />
                  <ul className="space-y-5 text-left">
                    {["1 Reconstrução completa/mês", "Modo 2min de todos os livros", "Viral Quotes ilimitadas"].map(item => (
                      <li key={item} className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                        <Icon name="check" className="text-zinc-300" size="size-3" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full h-16 rounded-2xl border-black/10 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50">
                      Começar Agora
                  </Button>
              </Card>

              {/* Plan 2 */}
              <Card className="rounded-[3rem] border-2 border-primary p-2 shadow-2xl relative group transform hover:scale-[1.02] transition-all duration-700">
                  <div className="absolute top-0 right-16 bg-primary text-black px-8 py-3 rounded-b-2xl text-[9px] font-black uppercase tracking-widest z-10">MELHOR VALOR</div>
                  <div className="bg-[#050505] text-white rounded-[2.8rem] p-16 space-y-12 h-full flex flex-col">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">LEGENDÁRIO PREMIUM</p>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-lg font-light text-zinc-500 mr-2">R$</span>
                            <span className="text-8xl font-black tracking-tighter">29</span>
                            <span className="text-lg font-light text-zinc-500 ml-2">/mês</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-serif italic">Ou R$ 249 cobrados anualmente.</p>
                    </div>
                    <Separator className="bg-white/10" />
                    <ul className="space-y-5 text-left flex-1">
                        {["Acesso ilimitado ao acervo", "Download em PDF de alta resolução", "Acesso aos 3 modos de leitura", "Workbooks de Output & Insight"].map(item => (
                          <li key={item} className="flex items-center gap-4 text-xs font-bold text-zinc-300">
                              <Icon name="check" className="text-primary" size="size-3" /> {item}
                          </li>
                        ))}
                    </ul>
                    <Button 
                      className="w-full h-20 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_50px_rgba(201,178,152,0.4)] hover:bg-white transition-all active:scale-95"
                      onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)}
                    >
                        Tornar-se Lendário
                    </Button>
                  </div>
              </Card>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA: TAGLINE --- */}
        <section className="py-48 px-6 text-center space-y-16">
            <div className="flex justify-center gap-6 text-primary opacity-30">
                <Symbol name="star" /> <Symbol name="star" /> <Symbol name="star" />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[0.8] max-w-4xl mx-auto">
                  Pare de acumular resumos. <br/>
                  <span className="text-zinc-300 italic font-serif font-light tracking-normal">Comece a ser lendário.</span>
              </h2>
              <p className="text-2xl text-zinc-500 font-serif max-w-xl mx-auto italic">
                  Absorva o conteúdo de lendas. Torne-se lendário.
              </p>
            </div>
            <div className="pt-8">
                <Button 
                  className="h-24 px-24 rounded-full bg-black text-white font-black uppercase tracking-[0.4em] text-[11px] hover:scale-105 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.2)] active:scale-95 group overflow-hidden border-none"
                  onClick={() => onNavigate?.(Section.TEMPLATE_LMS_LIBRARY)}
                >
                    <span className="relative z-10">Iniciar Jornada</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Button>
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-24 px-6 border-t border-black/5 bg-white text-center space-y-16">
            <div className="flex flex-col items-center gap-6">
              <Symbol name="infinity" className="text-zinc-200 text-8xl" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">The Legends & Co. / 2026</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              <a href="#" className="hover:text-black transition-colors">Termos</a>
              <a href="#" className="hover:text-black transition-colors">Privacidade</a>
              <a href="#" className="hover:text-black transition-colors">Manifesto</a>
              <a href="#" className="hover:text-black transition-colors">Suporte</a>
            </div>
        </footer>
      </main>

      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
    </div>
  );
};

export default BookSalesPageTemplate;
