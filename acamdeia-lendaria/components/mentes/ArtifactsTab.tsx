
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { CodeBlock } from '../ui/code-block';

interface ArtifactsTabProps {
  profile: any;
  systemPromptCode: string;
}

export const ArtifactsTab: React.FC<ArtifactsTabProps> = ({ profile, systemPromptCode }) => {
  return (
    <div className="space-y-8 animate-fade-in">
                  
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size="size-4" />
                <Input placeholder="Buscar artefatos..." className="pl-10 bg-[#0a0a0a] border-white/10 focus:border-brand-cyan text-sm" />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 h-9 text-xs">
                    <Icon name="filter" className="mr-2 size-3" /> Filtrar
                </Button>
                <Button className="bg-brand-cyan text-black hover:bg-brand-cyan/90 h-9 text-xs font-bold">
                    <Icon name="cloud-upload" className="mr-2 size-3" /> Upload
                </Button>
            </div>
        </div>

        {/* System Prompt (Highlighted) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 bg-[#0a0a0a] border-brand-cyan/30 shadow-[0_0_30px_-10px_rgba(50,173,230,0.1)]">
                <CardHeader className="border-b border-white/5 pb-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                            <Icon name="terminal" size="size-5" />
                        </div>
                        <div>
                            <CardTitle className="text-base text-white">System Prompt (Master)</CardTitle>
                            <CardDescription className="text-xs font-mono text-zinc-500">v4.1 • Última edição: Hoje, 14:30</CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Icon name="pencil" size="size-4" /></Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white"><Icon name="copy" size="size-4" /></Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <CodeBlock language="bash" className="rounded-none border-0 bg-[#050505] text-xs leading-relaxed max-h-[300px] overflow-y-auto m-0">
                        {systemPromptCode}
                    </CodeBlock>
                </CardContent>
            </Card>

            {/* Quick Stats / Knowledge Health */}
            <div className="space-y-6">
                <Card className="bg-[#0a0a0a] border-white/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <Icon name="database" className="text-brand-gold" /> Base de Conhecimento
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-400">Total de Tokens</span>
                            <span className="text-white font-mono font-bold">1.2M</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-zinc-500">
                                <span>Capacidade Vetorial</span>
                                <span>45%</span>
                            </div>
                            <Progress value={45} className="h-1.5 bg-zinc-900" style={{'--primary': '#C9B298'} as React.CSSProperties} />
                        </div>
                        <Separator className="bg-white/5" />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-zinc-900/50 rounded border border-white/5 text-center">
                                <Icon name="file-pdf" className="mx-auto mb-1 text-red-400" size="size-4" />
                                <span className="text-xs text-zinc-400">12 PDFs</span>
                            </div>
                            <div className="p-3 bg-zinc-900/50 rounded border border-white/5 text-center">
                                <Icon name="file-code" className="mx-auto mb-1 text-yellow-400" size="size-4" />
                                <span className="text-xs text-zinc-400">5 JSONs</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Artifacts Grid */}
        <div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Icon name="folder-open" /> Arquivos Sincronizados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.artifacts.map((file: any, i: number) => (
                    <div key={i} className="group p-4 rounded-xl border border-white/5 bg-[#0a0a0a] hover:border-white/10 hover:bg-[#0f0f0f] transition-all cursor-pointer relative overflow-hidden">
                        <div className="flex items-start justify-between mb-3">
                            <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center text-lg border",
                                file.type === 'system' ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20" :
                                file.type === 'knowledge' ? "bg-brand-gold/10 text-brand-gold border-brand-gold/20" :
                                file.type === 'audio' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                "bg-zinc-800 text-zinc-400 border-zinc-700"
                            )}>
                                <Icon name={
                                    file.type === 'system' ? 'terminal' :
                                    file.type === 'knowledge' ? 'book-alt' :
                                    file.type === 'audio' ? 'microphone' :
                                    'database'
                                } size="size-5" />
                            </div>
                            <Badge variant="secondary" className="bg-zinc-900 text-zinc-500 border-zinc-800 font-mono text-[9px]">{file.type.toUpperCase()}</Badge>
                        </div>
                        
                        <h4 className="font-bold text-sm text-zinc-200 group-hover:text-white truncate pr-4">{file.name}</h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 font-mono">
                            <span>{file.size}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                            <span>{file.updated}</span>
                        </div>

                        <div className="flex gap-1 mt-4">
                            {file.tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">{tag}</span>
                            ))}
                        </div>

                        {/* Hover Action */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icon name="menu-dots" className="text-zinc-400 hover:text-white" size="size-4" />
                        </div>
                    </div>
                ))}
                
                {/* Add New Placeholder */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/10 bg-transparent hover:bg-white/5 transition-all cursor-pointer text-zinc-500 hover:text-brand-cyan group">
                    <Icon name="cloud-upload" size="size-8" className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-bold uppercase tracking-wider">Adicionar Arquivo</span>
                </div>
            </div>
        </div>

    </div>
  );
};
