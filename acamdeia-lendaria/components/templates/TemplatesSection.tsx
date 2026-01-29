
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Toggle } from '../ui/toggle';
import { StreamingText } from '../ui/streaming-text';

const TemplatesSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Templates & Layouts</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Composições completas demonstrando a aplicação real do Design System.
        </p>
      </div>

      <Tabs defaultValue="auth" className="w-full">
        <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-muted/50 p-1 rounded-lg h-auto">
                <TabsTrigger value="auth" className="px-4 py-2">Autenticação</TabsTrigger>
                <TabsTrigger value="chat" className="px-4 py-2">Interface Chat (Lendário GPT)</TabsTrigger>
            </TabsList>
        </div>

        {/* --- AUTHENTICATION TEMPLATE --- */}
        <TabsContent value="auth">
            <div className="relative flex flex-col items-center justify-center min-h-[700px] w-full bg-[#050505] rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                
                {/* Visual Background Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
                    
                    {/* Logo Section */}
                    <div className="mb-10 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <Symbol name="infinity" className="text-white text-6xl relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    </div>

                    {/* Login Card */}
                    <Card className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <CardHeader className="space-y-1 pb-8">
                            <CardTitle className="text-2xl font-bold tracking-tight text-center">Acesse sua conta</CardTitle>
                            <CardDescription className="text-center text-muted-foreground/60 text-xs uppercase tracking-widest font-bold">Lendária [IA] OS</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Email</Label>
                                <div className="relative group/input">
                                    <Icon name="envelope" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within/input:text-primary transition-colors" size="size-4" />
                                    <Input 
                                        id="email" 
                                        placeholder="seu@email.com" 
                                        type="email" 
                                        className="pl-10 h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-1">
                                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Senha</Label>
                                    <button className="text-[10px] font-bold text-muted-foreground/50 hover:text-primary transition-colors uppercase tracking-wider">Esqueci minha senha</button>
                                </div>
                                <div className="relative group/input">
                                    <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within/input:text-primary transition-colors" size="size-4" />
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all font-sans"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-foreground transition-colors">
                                        <Icon name="eye" size="size-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all active:scale-[0.98] group relative overflow-hidden"
                            >
                                <span className="relative z-10">Entrar</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                            </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pb-8">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium">
                                <span>Não tem uma conta?</span>
                                <button className="text-primary font-bold hover:underline underline-offset-4">Criar conta</button>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* System Info */}
                    <div className="mt-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
                        <span>Secured by Neural Vault</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                        <span>v4.1.0</span>
                    </div>
                </div>
            </div>
        </TabsContent>

        {/* --- CHAT INTERFACE TEMPLATE --- */}
        <TabsContent value="chat">
            <div className="border border-border rounded-xl overflow-hidden shadow-2xl h-[700px] w-full bg-background flex">
                
                {/* Sidebar (Chat History) */}
                <div className="w-64 bg-muted/20 border-r border-border hidden md:flex flex-col">
                    <div className="p-4 border-b border-border">
                        <Button className="w-full justify-start gap-2" variant="outline">
                            <Icon name="plus" size="size-4" /> Novo Chat
                        </Button>
                    </div>
                    
                    <ScrollArea className="flex-1 px-3 py-4">
                        <div className="space-y-6">
                            <div>
                                <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Hoje</h4>
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal truncate bg-accent/50 text-accent-foreground">
                                        Estratégia de Marketing Q3
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                                        Ideias para Youtube
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Ontem</h4>
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                                        Revisão de Copy de Vendas
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                                        Análise de Dados CSV
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                                        Tradução PT-EN
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-3">
                            <Avatar size="sm">
                                <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold truncate">Alan Nicolas</span>
                                <span className="text-xs text-muted-foreground truncate">Pro Plan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-card">
                    {/* Header */}
                    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <span className="font-bold font-sans">Lendário GPT 4.0</span>
                            <Badge variant="outline" className="text-[10px] h-5 border-primary/50 text-primary bg-primary/5">Beta</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Icon name="share" /></Button>
                            <Button variant="ghost" size="icon"><Icon name="settings" /></Button>
                        </div>
                    </header>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-6">
                        <div className="max-w-3xl mx-auto space-y-8">
                            
                            {/* User Message */}
                            <div className="flex gap-4 flex-row-reverse">
                                <Avatar className="h-8 w-8 mt-1">
                                    <AvatarFallback>AN</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted text-foreground px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                                    <p className="text-sm">Crie uma estrutura de landing page focada em conversão para um curso de IA Generativa.</p>
                                </div>
                            </div>

                            {/* AI Message */}
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 border border-primary/20">
                                    <Symbol name="infinity" className="text-sm" />
                                </div>
                                <div className="space-y-4 max-w-[90%]">
                                    <div className="prose dark:prose-invert text-sm font-serif leading-relaxed text-muted-foreground">
                                        <div className="mb-4">
                                            <StreamingText 
                                                text="Com certeza. Para uma landing page de alta conversão no nicho de IA, precisamos focar em autoridade e clareza. Aqui está uma estrutura sugerida:" 
                                                speed={15}
                                            />
                                        </div>
                                        
                                        <div className="my-4 border border-border rounded-lg overflow-hidden bg-background">
                                            <div className="bg-muted/50 px-4 py-2 border-b border-border text-xs font-mono font-bold text-muted-foreground">
                                                Estrutura da LP
                                            </div>
                                            <div className="p-4 space-y-2 text-xs font-mono">
                                                <p>1. HERO SECTION: Headline Forte + VSL + CTA</p>
                                                <p>2. PROBLEMA: "Você vai ser substituído?"</p>
                                                <p>3. SOLUÇÃO: O método "Lendário AI"</p>
                                                <p>4. AUTORIDADE: Quem é o professor?</p>
                                                <p>5. PROVA SOCIAL: Depoimentos</p>
                                                <p>6. GARANTIA & FAQ</p>
                                            </div>
                                        </div>

                                        <p>Gostaria que eu detalhasse a copy da Hero Section?</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8 text-xs"><Icon name="copy" className="mr-2 size-3" /> Copiar</Button>
                                        <Button variant="outline" size="sm" className="h-8 text-xs"><Icon name="refresh" className="mr-2 size-3" /> Regenerar</Button>
                                    </div>
                                </div>
                            </div>

                             {/* User Message 2 */}
                             <div className="flex gap-4 flex-row-reverse">
                                <Avatar className="h-8 w-8 mt-1">
                                    <AvatarFallback>AN</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted text-foreground px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                                    <p className="text-sm">Sim, por favor. Use um tom "Rebelde" e inspirador.</p>
                                </div>
                            </div>

                             {/* AI Thinking */}
                             <div className="flex gap-4 opacity-70">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 border border-primary/20">
                                    <Symbol name="infinity" className="text-sm animate-pulse" />
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>

                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border bg-background">
                        <div className="max-w-3xl mx-auto relative">
                            <div className="absolute left-3 top-3 flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <Icon name="clip" />
                                </Button>
                            </div>
                            <textarea 
                                className="w-full bg-muted/30 border border-input rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all resize-none min-h-[50px] max-h-[200px]"
                                placeholder="Envie uma mensagem para a IA..."
                                rows={1}
                            />
                            <div className="absolute right-2 top-2">
                                <Button size="icon" className="h-8 w-8 rounded-lg">
                                    <Icon name="arrow-right" size="size-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-center text-[10px] text-muted-foreground mt-2 opacity-70">
                            A IA pode cometer erros. Considere verificar informações importantes.
                        </p>
                    </div>
                </div>
            </div>
        </TabsContent>
      </Tabs>

      {/* --- EXTRAS: TOGGLE & SEPARATOR SHOWCASE --- */}
      <section className="space-y-8 border-t border-border pt-12">
          <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            Componentes Utilitários
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card>
                  <CardHeader>
                      <CardTitle>Toggle & Formatting</CardTitle>
                      <CardDescription>Botões de estado para editores ou filtros.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4">
                      <div className="flex gap-1 border border-border rounded-md p-1">
                          <Toggle aria-label="Toggle bold">
                              <Icon name="bold" size="size-4" />
                          </Toggle>
                          <Toggle aria-label="Toggle italic">
                              <Icon name="italic" size="size-4" />
                          </Toggle>
                          <Toggle aria-label="Toggle underline">
                              <Icon name="underline" size="size-4" />
                          </Toggle>
                      </div>
                      <div className="flex gap-2">
                          <Toggle variant="outline" aria-label="Toggle bookmark">
                              <Icon name="bookmark" className="mr-2 size-4" /> Salvar
                          </Toggle>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Separators</CardTitle>
                      <CardDescription>Divisores de conteúdo semânticos.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="space-y-1">
                          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                          <p className="text-sm text-muted-foreground">
                              An open-source UI component library.
                          </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex h-5 items-center space-x-4 text-sm">
                          <div>Blog</div>
                          <Separator orientation="vertical" />
                          <div>Docs</div>
                          <Separator orientation="vertical" />
                          <div>Source</div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </section>

    </div>
  );
};

export default TemplatesSection;
