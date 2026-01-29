
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { CodeBlock } from './ui/code-block';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './ui/table';

const LovableGuideSection: React.FC = () => {
  const systemPrompt = `Você é um Engenheiro de UI/UX sênior especializado no Design System da Academia Lendária. Sua missão é construir interfaces de luxo minimalista seguindo estas regras rígidas:

1. PALETA E REGRA DOS 8%: Use exclusivamente tokens semânticos. A cor primária (hsl(var(--primary))) deve ocupar no máximo 8% da tela. Fundos devem ser bg-background ou bg-card.
2. TIPOGRAFIA DUAL: 
   - Títulos e Controles de UI: 'Inter' (font-sans) com tracking-tight e semibold/bold.
   - Corpo de Texto e Descrições: 'Source Serif 4' (font-serif) com leading-relaxed.
3. COMPONENTES PROPRIETÁRIOS:
   - Ícones: SEMPRE use o componente <Icon name="nome-do-icone" />. Não importe Lucide diretamente.
   - Utilidades: Use sempre a função 'cn()' de '@/lib/utils' para combinar classes.
4. ESTÉTICA: Bordas sutis (border-border), arredondamento padrão 'rounded-xl', sombras leves 'shadow-sm'. Arredondamento de botões e inputs: 'rounded-md'.
5. DARK MODE: Todo componente deve ser agnóstico ao tema, usando variáveis CSS nativas.

Não invente cores hexadecimais. Use apenas o que está definido no arquivo de tokens/CSS do sistema.`;

  const migrationPrompt = `Atue como um especialista em Refatoração de Design. Pegue o código desta página e aplique o "Legendary Skinning" seguindo este checklist:

1. BOTÕES: Troque botões genéricos (azuis, roxos, etc) por <Button variant="default"> (Dourado/Principal) ou <Button variant="outline">.
2. TIPOGRAFIA: Force títulos para font-sans font-bold e parágrafos para font-serif text-muted-foreground.
3. ÍCONES: Substitua todos os ícones externos (Lucide, Heroicons) pelo nosso componente <Icon name="..." /> mantendo a semântica.
4. CONTAINERS: Ajuste cards para 'rounded-xl border border-border bg-card shadow-sm'.
5. BACKGROUND: Garanta que a cor de fundo da página seja 'bg-background'.
6. ESPAÇAMENTO: Use 'gap-4', 'gap-8' ou múltiplos de 4.

Mantenha a lógica de negócio, apenas eleve o design para o padrão de luxo da Academia Lendária.`;

  const newFeaturePrompt = `Crie um novo componente de [NOME DO COMPONENTE] para o sistema da Academia Lendária.

REQUISITOS ESTRUTURAIS:
- Use <Card> para o container principal.
- Título em font-sans (Inter) Bold.
- Descrição em font-serif (Source Serif 4) com cor text-muted-foreground.
- Use <Icon /> para representar visualmente a função.
- Se houver lista, use o componente <ListItem> ou o estilo de lista do design system.

REGRAS DE ESTILO:
- Siga a regra de 8% de cor (Dourado apenas em destaques).
- Background do card: bg-card.
- Borda: border-border.
- Rounding: rounded-xl.

Retorne o código React completo com TypeScript e Tailwind CSS.`;

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-foreground text-background p-8 md:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Icon name="magic-wand" className="text-[15rem] rotate-12" />
          </div>
          <div className="relative z-10 space-y-6">
              <Badge className="bg-primary text-primary-foreground border-none">AI-First Engineering</Badge>
              <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-4xl">
                Guia Lovable: <span className="text-primary">Migração Turbo</span>.
              </h1>
              <p className="font-serif text-xl text-zinc-400 max-w-2xl leading-relaxed">
                  Copie e cole estes prompts para treinar a IA a construir interfaces idênticas à Academia Lendária em segundos.
              </p>
          </div>
      </div>

      <Tabs defaultValue="prompts" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="prompts" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3 font-bold">
                <Icon name="copy" className="mr-2 size-4" /> Prompts Mestres
            </TabsTrigger>
            <TabsTrigger value="mapping" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="cube" className="mr-2 size-4" /> Mapeamento de UI
            </TabsTrigger>
            <TabsTrigger value="checklist" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="list-check" className="mr-2 size-4" /> Checklist de Validação
            </TabsTrigger>
        </TabsList>

        {/* --- ABA: PROMPTS --- */}
        <TabsContent value="prompts" className="space-y-12 animate-fade-in">
            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="terminal" className="text-primary" /> 1. Contexto de Sistema (Calibração Inicial)
                </h3>
                <p className="text-muted-foreground text-sm font-serif">Cole nas "Custom Instructions" ou no primeiro prompt do chat para definir as regras do jogo.</p>
                <CodeBlock title="System Prompt" language="text">
                    {systemPrompt}
                </CodeBlock>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="refresh" className="text-primary" /> 2. Refatoração de Layout (Skinning)
                </h3>
                <p className="text-muted-foreground text-sm font-serif">Use para transformar uma tela genérica ou código copiado no padrão Lendário.</p>
                <CodeBlock title="Migration Prompt" language="text">
                    {migrationPrompt}
                </CodeBlock>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="plus" className="text-primary" /> 3. Criação de Nova Tela/Componente
                </h3>
                <p className="text-muted-foreground text-sm font-serif">Use para gerar novas funcionalidades do zero mantendo a consistência.</p>
                <CodeBlock title="New Feature Prompt" language="text">
                    {newFeaturePrompt}
                </CodeBlock>
            </section>

            <Alert className="bg-primary/5 border-primary/20">
                <Icon name="rocket" className="text-primary" />
                <AlertTitle>Dica Prática</AlertTitle>
                <AlertDescription>
                    No Lovable, salve o Prompt 1 (System) nas configurações do projeto. Assim, cada modificação que você pedir já virá com a tipografia e cores corretas por padrão.
                </AlertDescription>
            </Alert>
        </TabsContent>

        {/* --- ABA: MAPPING --- */}
        <TabsContent value="mapping" className="space-y-8 animate-fade-in">
             <Card>
                <CardHeader>
                    <CardTitle>Dicionário de Tradução de UI</CardTitle>
                    <CardDescription>Como a IA deve mapear elementos genéricos para o nosso sistema.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead>Se for um...</TableHead>
                                    <TableHead>Transforme em...</TableHead>
                                    <TableHead className="text-right">Classes Tailwind Chave</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Botão Principal</TableCell>
                                    <TableCell><code className="text-primary font-bold">variant="default"</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">bg-primary text-black rounded-md</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Card/Container</TableCell>
                                    <TableCell><code className="font-bold">rounded-xl shadow-sm border</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">bg-card border-border</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Título Principal</TableCell>
                                    <TableCell><code className="font-bold">font-sans tracking-tight</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">text-foreground font-bold</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Texto de Apoio</TableCell>
                                    <TableCell><code className="font-bold italic">font-serif leading-relaxed</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">text-muted-foreground</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Ícone</TableCell>
                                    <TableCell><code className="text-primary font-bold">{'<Icon name="..." />'}</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">fi-rr-* (Regular Rounded)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Input / Campo</TableCell>
                                    <TableCell><code className="font-bold">rounded-md bg-muted/20</code></TableCell>
                                    <TableCell className="text-right font-mono text-xs">border-input focus:ring-primary</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
             </Card>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card className="bg-brand-green/5 border-brand-green/20">
                    <CardHeader>
                        <CardTitle className="text-brand-green flex items-center gap-2"><Icon name="check" /> Regras Inegociáveis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm font-serif">
                        <p>✓ <strong>Dualidade Fontes:</strong> Jamais use Serif em botões. Jamais use Sans em parágrafos longos.</p>
                        <p>✓ <strong>Bordas:</strong> Sempre 1px, cor <code>border-border</code>. Evite bordas coloridas.</p>
                        <p>✓ <strong>Gaps:</strong> Use a escala de 8px (gap-2, gap-4, gap-8).</p>
                        <p>✓ <strong>Sombras:</strong> Use apenas <code>shadow-sm</code>. Design luxuoso é "flat but deep".</p>
                    </CardContent>
                 </Card>
                 <Card className="bg-destructive/5 border-destructive/20">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2"><Icon name="cross" /> Pecados de Design</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm font-serif">
                        <p>✕ <strong>Cores Vivas:</strong> Nunca use fundos coloridos (ex: bg-blue-500) fora de pequenos badges.</p>
                        <p>✕ <strong>Rounding Extremo:</strong> Botões não são pílulas (rounded-full), são <code>rounded-md</code>.</p>
                        <p>✕ <strong>Lucide Icons:</strong> Não deixe a IA importar Lucide-react. O sistema usa <code>Icon</code>.</p>
                    </CardContent>
                 </Card>
             </div>
        </TabsContent>

        {/* --- ABA: CHECKLIST --- */}
        <TabsContent value="checklist" className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="list-check" size="size-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Checklist de "Lendarização"</h3>
                        <p className="text-muted-foreground font-serif">Antes de dar o deploy, verifique se a IA respeitou:</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { step: "01", title: "Tipografia Dual", desc: "Títulos estão em font-sans? Parágrafos estão em font-serif?" },
                        { step: "02", title: "Paleta Semântica", desc: "Existem hexadecimais soltos no código (ex: #ffffff)? Substitua por tokens (ex: bg-background)." },
                        { step: "03", title: "Regra dos 8%", desc: "O Dourado está aparecendo apenas em pontos focais? Remova excessos." },
                        { step: "04", title: "Ícones Unificados", desc: "Todos os ícones usam o componente <Icon />? Sem SVGs inline ou Lucide." },
                        { step: "05", title: "Radios de Canto", desc: "Containers são rounded-xl e controles são rounded-md?" },
                        { step: "06", title: "Utilitário cn()", desc: "As classes Tailwind estão sendo combinadas usando a função cn()?" },
                        { step: "07", title: "Contraste Dark Mode", desc: "Alterne o tema. O texto continua legível? Os fundos mudaram para preto profundo?" },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 p-6 border border-border rounded-2xl bg-card hover:border-primary/50 transition-colors group">
                            <span className="text-3xl font-black text-muted-foreground group-hover:text-primary transition-colors">{item.step}</span>
                            <div>
                                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                <p className="text-muted-foreground font-serif text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LovableGuideSection;
