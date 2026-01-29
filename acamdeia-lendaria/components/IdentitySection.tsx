
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const ToneSlider: React.FC<{ left: string; right: string; value: number; description: string }> = ({ left, right, value, description }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
      <span>{left}</span>
      <span>{right}</span>
    </div>
    <div className="relative h-1 bg-muted rounded-full">
      <div 
        className="absolute top-1/2 w-4 h-4 bg-primary rounded-full shadow-lg -mt-2 transform -translate-x-1/2 border-2 border-background"
        style={{ left: `${(value / 10) * 100}%` }}
      />
      <div 
        className="absolute top-0 bottom-0 left-0 bg-primary/30"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
    <p className="text-[10px] text-muted-foreground/60 text-center font-serif italic">{description}</p>
  </div>
);

const IdentitySection: React.FC = () => {
  return (
    <div className="space-y-24 animate-fade-in pb-32 selection:bg-primary/30">
      
      {/* HEADER LUXURY */}
      <div className="relative overflow-hidden rounded-luxury bg-[#050505] p-12 md:p-24 border border-white/5 shadow-2xl">
         <div className="absolute inset-0 bg-luxury-vignette opacity-50"></div>
         <div className="flex items-center justify-between mb-8 relative z-10">
            <Badge variant="outline" className="bg-white/5 border-primary/20 text-primary">FIVU v2.0</Badge>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.5em]">Corpus: 15.832 palavras</span>
         </div>
         <h2 className="text-4xl md:text-8xl font-sans font-bold mb-6 tracking-tighter text-white leading-none relative z-10">
            Identidade <br/><span className="text-primary italic font-serif font-light">Universal</span>.
         </h2>
         <p className="font-serif text-xl md:text-3xl text-zinc-500 max-w-3xl leading-relaxed relative z-10 italic">
            "Não apontamos o caminho; nós o pavimentamos com clareza, verdade e sistemas lendários."
         </p>
         
         <div className="flex flex-col sm:flex-row gap-8 mt-16 relative z-10">
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                 <Icon name="user" className="text-primary" /> Founder: Alan Nicolas
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                 <Icon name="calendar" className="text-primary" /> Est. 2020
             </div>
         </div>
         <Icon name="fingerprint" className="absolute -right-20 -bottom-20 text-[25rem] text-primary/5 rotate-12" />
      </div>

      {/* --- MARKETING AUTÊNTICO --- */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20">Filosofia Central</Badge>
            <h3 className="text-3xl md:text-5xl font-sans font-bold">Marketing Autêntico</h3>
            <p className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto">"O único tipo de marketing que não reserva um lugar para você no inferno."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border group hover:border-primary/20">
                <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Icon name="eye" size="size-5" />
                    </div>
                    <CardTitle className="text-xl">Transparência Radical</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground font-serif text-base italic">"A verdade é a estratégia de longo prazo mais eficiente. Se não pode ser dito publicamente, não deve ser feito privadamente."</p>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-border group hover:border-primary/20">
                <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Icon name="target" size="size-5" />
                    </div>
                    <CardTitle className="text-xl">Valor Acima de Venda</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground font-serif text-base italic">"A venda é o subproduto de um valor tão imenso que o preço se torna irrelevante. Educar é o novo vender."</p>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-border group hover:border-primary/20">
                <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Icon name="sparkles" size="size-5" />
                    </div>
                    <CardTitle className="text-xl">Mecanismo Único</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground font-serif text-base italic">"Não competimos por preço. Competimos por sistema. O mecanismo é o que torna o resultado previsível e inegociável."</p>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* --- LENDÁRIO VS MEDIÓCRE --- */}
      <section className="py-24 bg-muted/20 rounded-luxury border border-border">
          <div className="container max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div className="space-y-8">
                      <h3 className="text-4xl md:text-6xl font-bold tracking-tight">O Padrão <span className="text-primary italic font-serif">Lendário</span>.</h3>
                      <div className="space-y-6">
                          <div className="flex gap-6 items-start">
                              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 border border-green-500/20">✓</div>
                              <p className="text-lg text-foreground font-serif italic">"Lendários usam IA a cada 30 minutos. Não como muleta, mas como extensão de sua genialidade."</p>
                          </div>
                          <div className="flex gap-6 items-start">
                              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 border border-green-500/20">✓</div>
                              <p className="text-lg text-foreground font-serif italic">"Lendários buscam o essencialismo. Menos, mas muito melhor."</p>
                          </div>
                      </div>
                  </div>

                  <div className="space-y-8 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                      <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-600">A Inércia <span className="text-zinc-400 italic font-serif">Medíocre</span>.</h3>
                      <div className="space-y-6">
                          <div className="flex gap-6 items-start">
                              <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-700">✕</div>
                              <p className="text-lg text-zinc-600 font-serif italic">"Medíocres culpam as ferramentas. Reclamam da IA enquanto são atropelados por ela."</p>
                          </div>
                          <div className="flex gap-6 items-start">
                              <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-700">✕</div>
                              <p className="text-lg text-zinc-600 font-serif italic">"Medíocres buscam a ocupação. Sentir-se útil através do suor braçal irrelevante."</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- VOZ & TOM --- */}
      <section className="space-y-12">
        <h3 className="text-2xl font-sans font-bold flex items-center gap-4">
            <Icon name="megaphone" className="text-primary" /> Matriz de Comunicação
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 p-12 bg-card rounded-luxury border border-border shadow-xl">
                 <h4 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-4">DNA da Voz</h4>
                 <ToneSlider left="Divertido" right="Sério" value={4} description="Sério com brilho, nunca chato." />
                 <ToneSlider left="Casual" right="Formal" value={3} description="Profissional acessível." />
                 <ToneSlider left="Humilde" right="Arrogante" value={6} description="Confiança fundamentada em dados." />
                 <ToneSlider left="Teórico" right="Pragmático" value={9} description="Foco total na execução." />
            </div>

            <div className="space-y-8">
                <Card className="bg-[#050505] border-primary/20 border-2">
                    <CardHeader>
                        <CardTitle className="text-primary">O Grito de Guerra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                            CONSTRUINDO O <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-gold italic font-serif font-light">INFINITO</span>, HOJE.
                        </p>
                    </CardContent>
                </Card>

                <div className="p-8 border border-border border-dashed rounded-luxury">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Vocabulário Proprietário</h5>
                    <div className="flex flex-wrap gap-3">
                        {["Mecanismo Único", "Segundo Cérebro", "Zona de Genialidade", "Antifragilidade", "Skin in the Game", "Lendário"].map(word => (
                            <Badge key={word} variant="outline" className="rounded-full px-6 py-2 border-primary/20 text-foreground">{word}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default IdentitySection;
