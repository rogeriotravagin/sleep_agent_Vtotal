
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Section } from '../../types';
import { cn } from '../../lib/utils';

interface StandaloneLoginTemplateProps {
  onNavigate?: (s: Section) => void;
}

type AuthView = 'login' | 'register' | 'forgot-password';

const StandaloneLoginTemplate: React.FC<StandaloneLoginTemplateProps> = ({ onNavigate }) => {
  const [view, setView] = useState<AuthView>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth transition between forms
  const changeView = (newView: AuthView) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(newView);
      setIsTransitioning(false);
    }, 200);
  };

  const renderForm = () => {
    switch (view) {
      case 'register':
        return (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="reg-name" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Nome Completo</Label>
              <div className="relative group/input">
                <Icon name="user" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="reg-name" placeholder="ALAN NICOLAS" className="pl-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800 uppercase tracking-wider" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Email Profissional</Label>
              <div className="relative group/input">
                <Icon name="envelope" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="reg-email" type="email" placeholder="SEU@EMAIL.COM" className="pl-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800 uppercase tracking-wider" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-password" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Senha</Label>
              <div className="relative group/input">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="reg-password" type="password" placeholder="••••••••" className="pl-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800" />
              </div>
            </div>
            <Button className="w-full h-14 text-xs font-black uppercase tracking-[0.4em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/10 transition-all active:scale-[0.97] group relative overflow-hidden mt-4 rounded-xl">
              <span className="relative z-10">Criar Legado</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-[-20deg]"></div>
            </Button>
          </div>
        );

      case 'forgot-password':
        return (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="reset-email" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Email de Recuperação</Label>
              <div className="relative group/input">
                <Icon name="envelope" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="reset-email" type="email" placeholder="SEU@EMAIL.COM" className="pl-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800 uppercase tracking-wider" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground/50 font-serif leading-relaxed px-1 text-center">
                Enviaremos um link de autenticação biométrica para o seu endereço de e-mail seguro.
            </p>
            <Button className="w-full h-14 text-xs font-black uppercase tracking-[0.4em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/10 transition-all active:scale-[0.97] group relative overflow-hidden mt-4 rounded-xl">
              <span className="relative z-10">Restaurar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-[-20deg]"></div>
            </Button>
          </div>
        );

      default:
        return (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Email</Label>
              <div className="relative group/input">
                <Icon name="envelope" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="email" placeholder="SEU@EMAIL.COM" type="email" className="pl-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800 uppercase tracking-wider" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <Label htmlFor="password" className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Senha</Label>
                <button 
                  onClick={() => changeView('forgot-password')}
                  className="text-[9px] font-black text-muted-foreground/30 hover:text-primary transition-colors uppercase tracking-[0.2em]"
                >
                  Esqueci a Senha
                </button>
              </div>
              <div className="relative group/input">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" size="size-4" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-12 pr-12 h-14 bg-white/[0.01] border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-sans text-white text-sm placeholder:text-zinc-800" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/10 hover:text-foreground transition-colors">
                  <Icon name="eye" size="size-4" />
                </button>
              </div>
            </div>
            <Button className="w-full h-14 text-xs font-black uppercase tracking-[0.4em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/10 transition-all active:scale-[0.97] group relative overflow-hidden mt-4 rounded-xl">
              <span className="relative z-10">Entrar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-[-20deg]"></div>
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020202] overflow-hidden selection:bg-primary/30">
      
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
          
          {/* Logo Section */}
          <div className="mb-14 group cursor-pointer" onClick={() => onNavigate?.(Section.CONCEPT)}>
              <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <Symbol name="infinity" className="text-white text-8xl relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(201,178,152,0.4)]" />
              </div>
          </div>

          {/* Container Card with Double Border Effect */}
          <Card className="w-full bg-[#080808]/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[2.5rem] overflow-hidden flex flex-col relative">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <CardHeader className="space-y-1 pb-8 pt-12">
                  <div className={cn("transition-all duration-300 transform", isTransitioning ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0")}>
                      <CardTitle className="text-3xl font-black tracking-tight text-center text-white uppercase tracking-[0.05em]">
                        {view === 'login' && "Acesse Lendário"}
                        {view === 'register' && "Crie seu Legado"}
                        {view === 'forgot-password' && "Recuperação"}
                      </CardTitle>
                      <CardDescription className="text-center text-muted-foreground/30 text-[9px] uppercase tracking-[0.5em] font-black mt-2">Lendária [IA] OS</CardDescription>
                  </div>
              </CardHeader>
              
              <CardContent className={cn("px-10 flex-1 transition-all duration-300 transform", isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
                  {renderForm()}
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4 pb-12 pt-8">
                  <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300", isTransitioning ? "opacity-0" : "opacity-100")}>
                    {view === 'login' ? (
                      <>
                        <span className="text-muted-foreground/30">Novo aqui?</span>
                        <button onClick={() => changeView('register')} className="text-primary hover:text-primary-light transition-colors hover:underline underline-offset-4 decoration-primary/20">Criar conta</button>
                      </>
                    ) : (
                      <>
                        <span className="text-muted-foreground/30">Já é lendário?</span>
                        <button onClick={() => changeView('login')} className="text-primary hover:text-primary-light transition-colors hover:underline underline-offset-4 decoration-primary/20">Fazer login</button>
                      </>
                    )}
                  </div>
              </CardFooter>
          </Card>

          {/* Bottom Info */}
          <div className="mt-14 flex items-center gap-8 text-[8px] font-black uppercase tracking-[0.5em] text-zinc-800">
              <div className="flex items-center gap-2">
                  <Icon name="shield-check" size="size-3" className="opacity-20" />
                  <span>Secured by Neural Vault</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-900"></div>
              <span>v4.1.0</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-10 text-zinc-700 hover:text-zinc-400 gap-3 font-black uppercase tracking-[0.3em] text-[9px] transition-all hover:gap-5"
            onClick={() => onNavigate?.(Section.CONCEPT)}
          >
              <Icon name="arrow-left" size="size-3" /> Voltar ao Sistema
          </Button>
      </div>
    </div>
  );
};

export default StandaloneLoginTemplate;
