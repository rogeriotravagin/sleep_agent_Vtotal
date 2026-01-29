import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { cn } from '../../lib/utils';
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

// --- DATA STRUCTURES ---

interface Studio {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  tagline: string;
  products: string[];
  description?: string;
  stats?: { label: string; value: string }[];
}

const studios: Studio[] = [
  {
    id: 'learn',
    name: 'Learn Studio',
    icon: 'graduation-cap',
    color: '#3B82F6',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
    tagline: 'Transformar a jornada educacional com IA',
    products: ['Course Builder', 'Challenge Hub', 'Program Manager', 'Student Journey'],
    description: "O coração educacional da Academia. Utiliza IA para personalizar trilhas de aprendizado, gerenciar coortes e garantir que nenhum aluno fique para trás. A tecnologia aqui não substitui o professor, ela o torna onipresente.",
    stats: [{ label: "Alunos Ativos", value: "12.4k" }, { label: "Conclusão", value: "88%" }, { label: "NPS", value: "92" }]
  },
  {
    id: 'clone',
    name: 'Clone Studio',
    icon: 'mask',
    color: '#A855F7',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-500',
    tagline: 'Escalar a presença sem perder autenticidade',
    products: ['Voice Cloner', 'Humanizer', 'Identity Vault', 'Clone API'],
    description: "Onde a mágica da identidade acontece. Preservamos a essência, tom de voz e visão de mundo do especialista, permitindo que ele esteja em múltiplos lugares ao mesmo tempo sem perder a alma.",
    stats: [{ label: "Clones Ativos", value: "4" }, { label: "Interações", value: "45k" }, { label: "Economia", value: "120h/mês" }]
  },
  {
    id: 'brand',
    name: 'Brand Studio',
    icon: 'palette',
    color: '#EC4899',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    text: 'text-pink-500',
    tagline: 'Marca consistente - do conceito ao pixel',
    products: ['Branding OS', 'Design System', 'Hall da Fama', 'Media Hub'],
    description: "O guardião da estética e da narrativa. Garante que cada pixel, cada cor e cada fonte comuniquem os valores da Academia Lendária com consistência militar e beleza artística.",
    stats: [{ label: "Assets", value: "2.3k" }, { label: "Consistency", value: "99.9%" }]
  },
  {
    id: 'content',
    name: 'Content Studio',
    icon: 'pencil',
    color: '#F97316',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-500',
    tagline: 'De uma ideia a mil peças de conteúdo',
    products: ['Content Ops', 'Video Ops', 'Social Ops', 'Newsletter Ops'],
    description: "Uma linha de montagem criativa potencializada por IA. Transformamos insights brutos em múltiplos formatos de conteúdo otimizados para cada canal, mantendo a relevância e a frequência.",
    stats: [{ label: "Posts/Mês", value: "450" }, { label: "Alcance", value: "2.1M" }]
  },
  {
    id: 'marketing',
    name: 'Marketing Studio',
    icon: 'chart-histogram',
    color: '#22C55E',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-500',
    tagline: 'Tráfego inteligente, cada real otimizado',
    products: ['Ads Factory', 'Ads Dashboard', 'Intelligence Hub', 'Landing Pages'],
    description: "O motor de crescimento. Focado em aquisição de leads qualificados com o menor custo possível, utilizando inteligência de dados para prever tendências e ajustar campanhas em tempo real.",
    stats: [{ label: "ROAS", value: "4.5x" }, { label: "Leads/Dia", value: "350" }]
  },
  {
    id: 'sales',
    name: 'Sales Studio',
    icon: 'coins',
    color: '#EAB308',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-500',
    tagline: 'Da primeira call ao cliente fiel',
    products: ['Sales AI', 'Launch Manager', 'CRM Intelligence', 'Churn Predictor'],
    description: "Onde a conversa vira conversão. Ferramentas que empoderam o time comercial com contexto, automação de follow-up e inteligência para fechar mais negócios com menos esforço.",
    stats: [{ label: "Conv. Rate", value: "18%" }, { label: "LTV", value: "R$ 2.4k" }]
  },
  {
    id: 'people',
    name: 'People Studio',
    icon: 'users-alt',
    color: '#06B6D4',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-500',
    tagline: 'Pessoas - cultura, comunicação, crescimento',
    products: ['Comms Central', 'Sistema Nexial', 'Onboarding Hub', 'Performance Hub'],
    description: "O sistema operacional da cultura. Conecta pessoas, alinha propósitos e garante que o time cresça na mesma velocidade que a empresa, com saúde mental e alta performance.",
    stats: [{ label: "eNPS", value: "85" }, { label: "Retenção", value: "95%" }]
  },
  {
    id: 'ops',
    name: 'Ops Studio',
    icon: 'settings-sliders',
    color: '#64748B',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    text: 'text-slate-500',
    tagline: 'A fundação invisível que sustenta tudo',
    products: ['LLM Manager', 'Data Lake', 'Security Hub', 'Integration Hub'],
    description: "A espinha dorsal tecnológica. Integrações, segurança de dados e a orquestração dos modelos de IA (LLMs) que alimentam todos os outros studios.",
    stats: [{ label: "Uptime", value: "99.99%" }, { label: "API Calls", value: "1.2M" }]
  }
];

// Componente Interno da Roda (agora interativo)
const StudioWheel = ({ 
    hoveredId, 
    setHoveredId,
    onStudioClick 
}: { 
    hoveredId: string | null; 
    setHoveredId: (id: string | null) => void;
    onStudioClick: (id: string) => void;
}) => {
    // Configuration
    const centerX = 300;
    const centerY = 300;
    const innerRadius = 120;
    const outerRadius = 240;

    const getPos = (angleDeg: number, radius: number) => {
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        return {
            x: centerX + radius * Math.cos(angleRad),
            y: centerY + radius * Math.sin(angleRad)
        };
    };

    const innerNodes = [
        { id: 'ops', label: 'OPS', angle: 0, color: '#64748B', icon: 'settings-sliders' }, 
        { id: 'brand', label: 'BRAND', angle: 90, color: '#EC4899', icon: 'palette' }, 
        { id: 'people', label: 'PEOPLE', angle: 180, color: '#06B6D4', icon: 'users-alt' }, 
        { id: 'clone', label: 'CLONE', angle: 270, color: '#A855F7', icon: 'mask' }, 
    ];

    const outerNodes = [
        { id: 'content', label: 'CONTENT', angle: 45, color: '#F97316', icon: 'pencil' },
        { id: 'marketing', label: 'MARKETING', angle: 135, color: '#22C55E', icon: 'chart-histogram' },
        { id: 'sales', label: 'SALES', angle: 225, color: '#EAB308', icon: 'coins' },
        { id: 'learn', label: 'LEARN', angle: 315, color: '#3B82F6', icon: 'graduation-cap' },
    ];

    return (
        <div className="relative w-full aspect-square md:aspect-[16/9] max-w-4xl mx-auto flex items-center justify-center bg-[#0F172A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none"></div>
            
            <svg viewBox="0 0 600 600" className="w-full h-full max-h-[600px] drop-shadow-2xl select-none">
                
                {/* Connecting Lines */}
                <path d="M 300,300 m -240,0 a 240,240 0 1,1 480,0 a 240,240 0 1,1 -480,0" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 4" />

                {innerNodes.map((node, i) => {
                    const pos = getPos(node.angle, innerRadius);
                    return <line key={`conn-in-${i}`} x1={centerX} y1={centerY} x2={pos.x} y2={pos.y} stroke={node.color} strokeOpacity="0.3" strokeWidth="2" />;
                })}

                {/* Center Hub */}
                <circle cx={centerX} cy={centerY} r="60" fill="#1E293B" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" />
                <foreignObject x={centerX - 50} y={centerY - 50} width="100" height="100">
                    <div className="w-full h-full flex flex-col items-center justify-center text-center pointer-events-none">
                        <Symbol name="infinity" className="text-4xl text-white mb-1" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">LendariaOS</span>
                    </div>
                </foreignObject>

                {/* Inner Nodes */}
                {innerNodes.map((node) => {
                    const pos = getPos(node.angle, innerRadius);
                    const isHovered = hoveredId === node.id;
                    const isDimmed = hoveredId && !isHovered;

                    return (
                        <g 
                            key={node.id} 
                            onClick={() => onStudioClick(node.id)}
                            onMouseEnter={() => setHoveredId(node.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{ cursor: 'pointer', opacity: isDimmed ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
                        >
                            <circle cx={pos.x} cy={pos.y} r={isHovered ? 45 : 35} fill="#1E293B" stroke={node.color} strokeWidth={isHovered ? 4 : 3} className="transition-all duration-300 ease-out" />
                            <foreignObject x={pos.x - 20} y={pos.y - 20} width="40" height="40">
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <Icon name={node.icon} size="size-5" />
                                </div>
                            </foreignObject>
                            <text x={pos.x} y={pos.y + (isHovered ? 60 : 50)} textAnchor="middle" fill={node.color} fontSize="12" fontWeight="bold" letterSpacing="1">{node.label}</text>
                        </g>
                    );
                })}

                {/* Outer Nodes */}
                {outerNodes.map((node) => {
                    const pos = getPos(node.angle, outerRadius);
                    const isHovered = hoveredId === node.id;
                    const isDimmed = hoveredId && !isHovered;

                    return (
                        <g 
                            key={node.id}
                            onClick={() => onStudioClick(node.id)}
                            onMouseEnter={() => setHoveredId(node.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{ cursor: 'pointer', opacity: isDimmed ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
                        >
                            <line x1={centerX} y1={centerY} x2={pos.x} y2={pos.y} stroke={node.color} strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 2" />
                            <circle cx={pos.x} cy={pos.y} r={isHovered ? 55 : 45} fill="#1E293B" stroke={node.color} strokeWidth={isHovered ? 5 : 4} className="transition-all duration-300 ease-out" />
                            <foreignObject x={pos.x - 25} y={pos.y - 25} width="50" height="50">
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <Icon name={node.icon} size="size-7" />
                                </div>
                            </foreignObject>
                            <text x={pos.x} y={pos.y + (isHovered ? 75 : 65)} textAnchor="middle" fill={node.color} fontSize="14" fontWeight="bold" letterSpacing="1">{node.label}</text>
                        </g>
                    );
                })}
            </svg>

            <div className="absolute bottom-4 right-6 text-right">
                <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Interactive • Click to Explore</p>
            </div>
        </div>
    );
}

const LendariaOsPage: React.FC = () => {
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);
  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(null);

  const selectedStudio = studios.find(s => s.id === selectedStudioId);

  return (
    <div className="space-y-16 animate-fade-in pb-20 font-sans">
      
      {/* --- HERO / OS HEADER --- */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] border border-white/10 text-white p-8 md:p-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <Badge variant="outline" className="border-white/20 text-white bg-white/5 uppercase tracking-[0.2em] px-4 py-1.5 text-xs font-bold">
                  Sistema Operacional v1.0
              </Badge>
              <div className="flex items-center gap-3">
                  <Symbol name="infinity" className="text-4xl md:text-6xl text-white" />
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">LendariaOS</h1>
              </div>
              <p className="text-xl text-slate-400 max-w-2xl font-serif">
                  A arquitetura integrada de 8 Studios que transforma caos operacional em escala previsível e legado imortal.
              </p>
          </div>
      </div>

      {/* --- INTERACTIVE WHEEL --- */}
      <section>
          <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Icon name="aperture" className="text-primary" /> Mandala dos Studios
              </h3>
              <Badge variant="outline" className="text-xs">Interactive View</Badge>
          </div>
          <StudioWheel 
            hoveredId={hoveredStudio} 
            setHoveredId={setHoveredStudio}
            onStudioClick={setSelectedStudioId}
          />
      </section>

      {/* --- FLOW DIAGRAM --- */}
      <section>
          <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Icon name="network-cloud" className="text-primary" /> Fluxo de Valor
              </h3>
              <Badge variant="outline" className="text-xs">Process View</Badge>
          </div>

          <div className="bg-[#0F172A] border border-white/10 rounded-xl p-8 md:p-12 overflow-x-auto relative">
              <div className="min-w-[800px] flex flex-col gap-16 relative z-10">
                  
                  {/* Top Layer: Client Journey */}
                  <div className="flex justify-between items-center relative">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-blue-500/20 -z-10"></div>
                      
                      {/* Marketing */}
                      <div className={cn("bg-[#1E293B] border border-green-500/30 p-4 rounded-xl flex items-center gap-4 w-64 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'marketing' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('marketing')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('marketing')}>
                          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500"><Icon name="chart-histogram" /></div>
                          <div>
                              <p className="text-xs text-green-500 font-bold uppercase tracking-wider">Atrai</p>
                              <p className="font-bold text-white">Marketing Studio</p>
                          </div>
                      </div>

                      <Icon name="arrow-right" className="text-slate-600" />

                      {/* Sales */}
                      <div className={cn("bg-[#1E293B] border border-yellow-500/30 p-4 rounded-xl flex items-center gap-4 w-64 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'sales' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('sales')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('sales')}>
                          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500"><Icon name="coins" /></div>
                          <div>
                              <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider">Converte</p>
                              <p className="font-bold text-white">Sales Studio</p>
                          </div>
                      </div>

                      <Icon name="arrow-right" className="text-slate-600" />

                      {/* Learn */}
                      <div className={cn("bg-[#1E293B] border border-blue-500/30 p-4 rounded-xl flex items-center gap-4 w-64 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'learn' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('learn')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('learn')}>
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><Icon name="graduation-cap" /></div>
                          <div>
                              <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Entrega</p>
                              <p className="font-bold text-white">Learn Studio</p>
                          </div>
                      </div>
                  </div>

                  {/* Middle Connector: People */}
                  <div className="flex justify-center relative">
                      <div className="absolute top-[-32px] bottom-[-32px] w-0.5 bg-gradient-to-b from-slate-700 via-cyan-500/50 to-slate-700 -z-10"></div>
                      <div className={cn("bg-[#1E293B] border border-cyan-500/50 p-6 rounded-2xl flex flex-col items-center gap-3 w-48 text-center shadow-xl z-20 transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'people' ? 'opacity-30' : 'opacity-100 scale-110')} onMouseEnter={() => setHoveredStudio('people')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('people')}>
                          <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-xl"><Icon name="users-alt" /></div>
                          <div>
                              <p className="font-bold text-white text-lg">People Studio</p>
                              <p className="text-xs text-cyan-400">Cultura que une</p>
                          </div>
                      </div>
                  </div>

                  {/* Bottom Layer: Internal Engine */}
                  <div className="flex justify-between items-center relative">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-500/20 via-purple-500/20 to-orange-500/20 -z-10"></div>

                      {/* Ops */}
                      <div className={cn("bg-[#1E293B] border border-slate-500/30 p-4 rounded-xl flex items-center gap-4 w-56 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'ops' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('ops')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('ops')}>
                          <div className="w-10 h-10 rounded-lg bg-slate-500/10 flex items-center justify-center text-slate-500"><Icon name="settings-sliders" /></div>
                          <div>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sustenta</p>
                              <p className="font-bold text-white text-sm">Ops Studio</p>
                          </div>
                      </div>

                      <Icon name="angle-small-right" className="text-slate-700" />

                      {/* Clone */}
                      <div className={cn("bg-[#1E293B] border border-purple-500/30 p-4 rounded-xl flex items-center gap-4 w-56 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'clone' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('clone')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('clone')}>
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500"><Icon name="mask" /></div>
                          <div>
                              <p className="text-xs text-purple-500 font-bold uppercase tracking-wider">Define</p>
                              <p className="font-bold text-white text-sm">Clone Studio</p>
                          </div>
                      </div>

                      <Icon name="angle-small-right" className="text-slate-700" />

                      {/* Brand */}
                      <div className={cn("bg-[#1E293B] border border-pink-500/30 p-4 rounded-xl flex items-center gap-4 w-56 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'brand' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('brand')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('brand')}>
                          <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500"><Icon name="palette" /></div>
                          <div>
                              <p className="text-xs text-pink-500 font-bold uppercase tracking-wider">Padroniza</p>
                              <p className="font-bold text-white text-sm">Brand Studio</p>
                          </div>
                      </div>

                      <Icon name="angle-small-right" className="text-slate-700" />

                      {/* Content */}
                      <div className={cn("bg-[#1E293B] border border-orange-500/30 p-4 rounded-xl flex items-center gap-4 w-56 shadow-lg transition-all duration-300 cursor-pointer", hoveredStudio && hoveredStudio !== 'content' ? 'opacity-30' : 'opacity-100 scale-105')} onMouseEnter={() => setHoveredStudio('content')} onMouseLeave={() => setHoveredStudio(null)} onClick={() => setSelectedStudioId('content')}>
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500"><Icon name="pencil" /></div>
                          <div>
                              <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">Produz</p>
                              <p className="font-bold text-white text-sm">Content Studio</p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- GRID OF STUDIOS (PROMPT 2) --- */}
      <section>
          <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Icon name="apps" className="text-primary" /> Catálogo de Produtos
              </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studios.map((studio) => (
                  <Card 
                    key={studio.id} 
                    className={cn(
                        "bg-[#1E293B] border-opacity-20 transition-all duration-500 group overflow-hidden shadow-lg cursor-pointer", 
                        studio.border,
                        hoveredStudio && hoveredStudio !== studio.id ? 'opacity-40 grayscale' : 'opacity-100 hover:shadow-2xl hover:scale-[1.02]'
                    )}
                    onMouseEnter={() => setHoveredStudio(studio.id)}
                    onMouseLeave={() => setHoveredStudio(null)}
                    onClick={() => setSelectedStudioId(studio.id)}
                  >
                      {/* Header with Color */}
                      <div className={cn("h-1 w-full transition-all duration-500 group-hover:h-2", studio.bg.replace('/10', '/50'))}></div>
                      <CardHeader className="pb-3 pt-6">
                          <div className="flex justify-between items-start">
                              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform duration-300", studio.bg, studio.text)}>
                                  <Icon name={studio.icon} />
                              </div>
                              <Icon name="arrow-up-right" className={cn("opacity-0 group-hover:opacity-100 transition-opacity", studio.text)} />
                          </div>
                          <CardTitle className="text-white text-lg">{studio.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-slate-400 font-serif leading-relaxed mb-6 h-10 line-clamp-2">
                              {studio.tagline}
                          </p>
                          <div className="space-y-3 pt-4 border-t border-white/5">
                              {studio.products.map((prod, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 group/item hover:text-white transition-colors">
                                      <div className={cn("w-1.5 h-1.5 rounded-full transition-transform group-hover/item:scale-150", studio.text.replace('text-', 'bg-'))}></div>
                                      {prod}
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </section>

      {/* --- STUDIO DETAIL SHEET --- */}
      <Sheet 
        open={!!selectedStudio} 
        onOpenChange={(open) => !open && setSelectedStudioId(null)}
        className="bg-[#0F172A] border-l border-white/10 text-white w-full sm:max-w-md p-0 overflow-hidden"
      >
          {selectedStudio && (
              <div className="h-full flex flex-col">
                  <div className={cn("h-32 w-full flex items-end p-6 relative overflow-hidden", selectedStudio.bg.replace('/10', '/20'))}>
                      <div className={cn("absolute top-0 right-0 p-8 opacity-10 text-[8rem]", selectedStudio.text)}>
                          <Icon name={selectedStudio.icon} />
                      </div>
                      <div className="relative z-10 flex items-center gap-4">
                          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-xl", selectedStudio.bg.replace('/10', ''), selectedStudio.text.replace('text-', 'text-white'))}>
                              <Icon name={selectedStudio.icon} />
                          </div>
                          <div>
                              <SheetTitle className="text-2xl font-bold text-white">{selectedStudio.name}</SheetTitle>
                              <p className="text-xs text-white/60 font-mono uppercase tracking-wider">LendariaOS Module</p>
                          </div>
                      </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-6">
                      <div className="space-y-8">
                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Propósito</h4>
                              <p className="text-lg font-serif text-slate-300 leading-relaxed">
                                  {selectedStudio.description}
                              </p>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                              {selectedStudio.stats?.map((stat, i) => (
                                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                                      <p className={cn("text-xl font-bold", selectedStudio.text)}>{stat.value}</p>
                                      <p className="text-[10px] text-slate-400 uppercase">{stat.label}</p>
                                  </div>
                              ))}
                          </div>

                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Produtos Instalados</h4>
                              <div className="space-y-3">
                                  {selectedStudio.products.map((prod, i) => (
                                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group">
                                          <div className="flex items-center gap-3">
                                              <div className={cn("w-2 h-2 rounded-full", selectedStudio.text.replace('text-', 'bg-'))}></div>
                                              <span className="font-medium text-slate-200 group-hover:text-white">{prod}</span>
                                          </div>
                                          <Icon name="angle-small-right" className="text-slate-500 group-hover:text-white" />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </ScrollArea>

                  <div className="p-6 border-t border-white/10 bg-[#0F172A]">
                      <Button className={cn("w-full font-bold", selectedStudio.text.replace('text-', 'bg-'), "text-white hover:opacity-90")}>
                          Acessar {selectedStudio.name}
                      </Button>
                  </div>
              </div>
          )}
      </Sheet>

    </div>
  );
};

export default LendariaOsPage;