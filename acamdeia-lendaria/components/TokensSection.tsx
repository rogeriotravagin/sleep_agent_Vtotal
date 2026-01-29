
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { CodeBlock } from './ui/code-block';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const TokensSection: React.FC = () => {
  const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>('default');

  const luxuryPatterns = [
    { title: "Tipografia Dual High-End", desc: "Sans para UI e Headers. Serif para Body e Insights. Labels sempre em 9px Black Caps.", icon: "text" },
    { title: "Cards Floating Glass", desc: "Arredondamento de 2.5rem (luxury). Bordas sutis de 0.05 opacidade.", icon: "layers" },
    { title: "Aura de Prestígio", desc: "Utilize blur-xl com a cor primária em 10% de opacidade para criar profundidade no hover.", icon: "sparkles" },
    { title: "Levitação Orgânica", desc: "Elementos interativos devem subir suavemente (-2px a -4px) ao serem focados.", icon: "arrow-small-up" },
    { title: "Sombras de Profundidade", desc: "Evite sombras pretas pesadas. Use sombras amplas e suaves que simulam iluminação natural.", icon: "copy" },
    { title: "Hairline Progress", desc: "Barras de progresso e divisores nunca devem exceder 1px ou 2px de altura.", icon: "minus" },
    { title: "Botões Luxury", desc: "Altura de 14/16 (56px/64px). Tracking de 0.2em. Rounded 2xl.", icon: "mouse" },
    { title: "Tokens Semânticos", desc: "Abstração total de HEX. Use bg-background, bg-card, text-muted-foreground.", icon: "palette" },
    { title: "Espaçamento Generoso", desc: "O respiro é um ativo de luxo. Use p-8 e mb-16 como unidades básicas.", icon: "apps" },
    { title: "Micro-Interações Glow", desc: "Inputs e Toggles devem emitir um brilho sutil (glow) em estados ativos.", icon: "bolt" },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      
      {/* Header Luxury */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Icon name="palette" className="text-[15rem] -rotate-12" />
          </div>
          <div className="relative z-10 p-12 md:p-16 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-primary/50 text-primary">MASTER v4.1</Badge>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">The Luxury Framework</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tight max-w-4xl leading-none">
                Tokens & <br/><span className="text-primary italic font-serif font-light">Luxury Patterns</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  A definição matemática da estética lendária. Dez padrões que transformam software em uma experiência de alta costura.
              </p>
          </div>
      </div>

      <Tabs defaultValue="luxury" className="w-full">
        <TabsList className="mb-12 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="luxury" className="rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-8 py-4 font-bold">
                Luxury Patterns
            </TabsTrigger>
            <TabsTrigger value="principles" className="rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary px-8 py-4">
                Principles
            </TabsTrigger>
            <TabsTrigger value="foundation" className="rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary px-8 py-4">
                Colors
            </TabsTrigger>
        </TabsList>

        {/* --- ABA LUXURY PATTERNS --- */}
        <TabsContent value="luxury" className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {luxuryPatterns.map((pattern, i) => (
                    <Card key={i} className="group hover:border-primary/30 hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-6">
                             <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                <Icon name={pattern.icon} size="size-6" />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg">{pattern.title}</h3>
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Padrão {i+1}</p>
                             </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground font-serif leading-relaxed text-base italic">
                                "{pattern.desc}"
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>

        {/* --- CONTEUDO DAS OUTRAS ABAS (Mantido e Refinado) --- */}
        <TabsContent value="principles" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Ordem de Classes Tailwind</CardTitle>
                        <CardDescription>Convenção obrigatória para consistência.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {[
                                "1. Layout (display, position)",
                                "2. Sizing (w, h)",
                                "3. Spacing (p, m, gap)",
                                "4. Typography (font, text)",
                                "5. Colors (bg, text, border)",
                                "6. Borders (rounded)",
                                "7. Effects (shadow, opacity)",
                                "8. Transitions & Animation",
                                "9. States (hover, focus)",
                                "10. Responsive (sm:, lg:)"
                            ].map((rule, i) => (
                                <div key={i} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-2 last:border-0">
                                    {rule}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Utilitário cn()</CardTitle>
                        <CardDescription>Merge de classes obrigatório.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeBlock language="tsx" title="lib/utils.ts">
{`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                        </CodeBlock>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="foundation" className="space-y-8 animate-fade-in">
            <Card>
                <CardHeader>
                    <CardTitle>Cores & Pareamento</CardTitle>
                    <CardDescription>Sempre use o par Background + Foreground.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-2xl border border-border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead>Background Token</TableHead>
                                    <TableHead>Foreground</TableHead>
                                    <TableHead className="text-right">Visualização</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { bg: "bg-background", text: "text-foreground", label: "Page Base" },
                                    { bg: "bg-card", text: "text-card-foreground", label: "Luxury Card" },
                                    { bg: "bg-primary", text: "text-primary-foreground", label: "Primary Gold" },
                                    { bg: "bg-muted", text: "text-muted-foreground", label: "Neutral Area" },
                                ].map((pair, i) => (
                                    <TableRow key={i}>
                                        <TableCell><code className="bg-muted/50 px-2 py-1 rounded text-xs">{pair.bg}</code></TableCell>
                                        <TableCell><code className="bg-muted/50 px-2 py-1 rounded text-xs">{pair.text}</code></TableCell>
                                        <TableCell className="text-right">
                                            <div className={cn("inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-border/10", pair.bg, pair.text)}>
                                                {pair.label}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default TokensSection;
