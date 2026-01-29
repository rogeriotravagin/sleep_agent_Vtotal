
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { Section } from '../../types';
import { Symbol } from '../ui/symbol';
import { Separator } from '../ui/separator';

const CommunityMessagesTemplate: React.FC<{ onNavigate?: (s: Section) => void }> = ({ onNavigate }) => {
  const [activeChat, setActiveChat] = useState("mercedes");
  const [activeProfileTab, setActiveProfileTab] = useState("about");

  const chats = [
    { id: 'agent', name: "Agente da Co...", sub: "Olá, Lendário! 👋 Sou o seu Gua...", time: "Dec 20, 2025", agent: true },
    { id: 'tais', name: "Tais Helena Pelliz...", sub: "Pela startse ja vejo 2030!!", time: "7h", unread: true },
    { id: 'jose', name: "JOSE ARLINDO D...", sub: "Obrigado pela oportunidade e...", time: "3d", unread: false, avatar: "https://i.pravatar.cc/100?u=jose" },
    { id: 'mercedes', name: "Mercedes Dias b...", sub: "Obrigada pela mensagem, Alan....", time: "4d", unread: true, avatar: "https://i.pravatar.cc/100?u=mercedes" },
    { id: 'emily', name: "Emily Susan da S...", sub: "❤️❤️🤩", time: "6d", unread: true },
    { id: 'leandro', name: "Leandro Ribeiro ...", sub: "Alan Feliz Natal também, Muito...", time: "7d", unread: true },
    { id: 'elias', name: "Elias Silvestre Fio...", sub: "❤️", time: "Jan 2", unread: true },
    { id: 'jaya', name: "Jaya Roberta Fer...", sub: "😍 Feliz Natal Alan! E feliz 2026!", time: "Jan 2", unread: true },
  ];

  return (
    <div className="flex h-screen bg-[#111111] text-[#FAFAFA] font-sans animate-fade-in overflow-hidden relative">
      
      {/* --- COLUMN 1: DIRECT MESSAGES SIDEBAR --- */}
      <aside className="w-[300px] border-r border-white/5 bg-[#18181B] flex flex-col shrink-0 z-20">
          <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white tracking-tight">Direct Messages</h2>
                  <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"><Icon name="check" size="size-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"><Icon name="plus" size="size-3" /></Button>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-white/5 pb-2">
                  <button className="hover:text-white">Inbox</button>
                  <button className="text-white border-b-2 border-primary pb-2 -mb-[10px] flex items-center gap-1.5">
                    Unread <Badge className="bg-zinc-700 text-zinc-300 h-4 px-1.5 text-[9px] border-none">32</Badge>
                  </button>
                  <button className="hover:text-white flex items-center gap-1"><Icon name="sparkles" size="size-2" /> Agents</button>
              </div>

              <div className="relative group pt-2">
                  <Icon name="search" className="absolute left-3 top-[60%] -translate-y-1/2 text-zinc-600" size="size-3" />
                  <Input 
                      placeholder="Search for a name" 
                      className="bg-[#27272A] border-none h-9 pl-9 rounded-md text-xs placeholder:text-zinc-500" 
                  />
              </div>
          </div>

          <ScrollArea className="flex-1">
              <div className="flex flex-col">
                  {chats.map(chat => (
                      <button
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={cn(
                            "px-4 py-3 flex gap-3 transition-all relative group border-l-2 border-transparent",
                            activeChat === chat.id ? "bg-[#27272A] border-primary" : "hover:bg-white/[0.02]"
                        )}
                      >
                        <div className="relative shrink-0">
                            <Avatar className={cn("w-10 h-10 border border-white/5", chat.agent && "border-indigo-500/50")}>
                                {chat.avatar ? <AvatarImage src={chat.avatar} /> : null}
                                <AvatarFallback className="bg-zinc-800 text-[10px] font-bold">
                                    {chat.agent ? <Symbol name="infinity" className="text-indigo-400 text-xl" /> : chat.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            {chat.unread && (
                                <div className="absolute top-0 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-[#18181B]"></div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex justify-between items-center mb-0.5">
                                <h4 className={cn("text-[13px] font-bold truncate", chat.unread ? "text-white" : "text-zinc-400")}>
                                    {chat.agent && <Icon name="bolt" size="size-2" className="text-indigo-400 mr-1" />}
                                    {chat.name}
                                </h4>
                                <span className="text-[10px] text-zinc-500">{chat.time}</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 truncate">{chat.sub}</p>
                        </div>
                      </button>
                  ))}
              </div>
          </ScrollArea>
      </aside>

      {/* --- COLUMN 2: ACTIVE CONVERSATION --- */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#111111] z-10">
          <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white truncate">
                    {chats.find(c => c.id === activeChat)?.name}
                  </h2>
                  <Icon name="angle-small-down" size="size-4" className="text-zinc-500" />
              </div>
              <div className="flex gap-4">
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white"><Icon name="search" /></Button>
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white"><Icon name="sign-out-alt" /></Button>
              </div>
          </header>

          <ScrollArea className="flex-1 px-8 py-6">
              <div className="max-w-3xl mx-auto space-y-10 pb-20">
                  {/* Previous Message Preview */}
                  <div className="text-zinc-400 text-sm font-serif leading-relaxed space-y-4 mb-12">
                      <p>Você já está vendo. <strong className="text-white">Agora é seguir.</strong></p>
                      <p className="font-bold text-white">Feliz Natal, lendário.</p>
                      <p className="font-bold text-white">Bem-vindo ao ano que muda tudo.</p>
                      <p>Nós estamos prontos. Espero que você esteja também.</p>
                      <div className="pt-4">
                          <p>Abraços,</p>
                          <p>Alan Nicolas</p>
                          <p className="font-bold text-white">CEO, Academia Lendária</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                          <Badge variant="outline" className="bg-zinc-800 border-none text-zinc-300 gap-1.5 h-6"><Icon name="heart" type="solid" className="text-red-500" size="size-3" /> 1</Badge>
                          <Badge variant="outline" className="bg-zinc-800 border-none text-zinc-300 h-6"><Icon name="smile" size="size-3" /></Badge>
                      </div>
                  </div>

                  {/* NEW Separator */}
                  <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-red-500/30"></div>
                      </div>
                      <div className="relative bg-[#111111] px-4 flex items-center gap-3">
                          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">JAN 06</span>
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">NEW</span>
                      </div>
                  </div>

                  {/* Incoming Message */}
                  <div className="flex gap-4 group">
                      <Avatar className="w-9 h-9 border border-white/5">
                          <AvatarImage src={chats.find(c => c.id === activeChat)?.avatar} />
                          <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{chats.find(c => c.id === activeChat)?.name}</span>
                              <span className="text-[10px] text-zinc-600 font-mono uppercase">12:59 PM</span>
                          </div>
                          <div className="text-sm text-zinc-300 leading-relaxed font-serif">
                              {activeChat === 'mercedes' ? (
                                  <div className="space-y-4">
                                      <p>Obrigada pela mensagem, Alan.</p>
                                      <p>2025 mudou muita coisa internamente, principalmente a forma de olhar para IA, negócios e decisões.</p>
                                      <p>Estar por perto, prestando atenção, realmente mudou o jogo total.</p>
                                      <p>Que 2026 seja menos ruído e mais ação, como você disse. TAMO junto!!!!</p>
                                      <p>Seguimos.</p>
                                  </div>
                              ) : (
                                  <p>Mensagem do contato selecionado...</p>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </ScrollArea>

          {/* Footer Input matching Print */}
          <div className="p-6 bg-[#111111] border-t border-white/5">
              <div className="max-w-3xl mx-auto">
                  <div className="bg-[#18181B] rounded-xl border border-white/10 p-3 shadow-xl focus-within:border-primary/50 transition-all">
                      <Input 
                        placeholder="Type a message..." 
                        className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-zinc-600 px-2 h-8"
                      />
                      <div className="flex justify-between items-center mt-2 px-2">
                          <div className="flex gap-3 text-zinc-500">
                              <button className="hover:text-white"><Icon name="picture" size="size-4" /></button>
                              <button className="hover:text-white"><Icon name="smile" size="size-4" /></button>
                              <button className="hover:text-white"><Icon name="hashtag" size="size-4" /></button>
                              <button className="hover:text-white"><Icon name="at" size="size-4" /></button>
                              <button className="hover:text-white font-black text-xs">GIF</button>
                              <button className="hover:text-white"><Icon name="clip" size="size-4" /></button>
                              <button className="hover:text-white"><Icon name="microphone" size="size-4" /></button>
                          </div>
                          <button className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                              <Icon name="arrow-small-up" size="size-5" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </main>

      {/* --- COLUMN 3: PROFILE DOSSIER --- */}
      <aside className="w-[320px] border-l border-white/5 bg-[#18181B] flex flex-col shrink-0 z-20 overflow-y-auto custom-scrollbar">
          <div className="p-6 pb-0">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Profile</h2>
            
            <div className="flex flex-col items-center text-center space-y-6">
                <Avatar className="w-24 h-24 border-4 border-zinc-800 shadow-2xl">
                    <AvatarImage src={chats.find(c => c.id === activeChat)?.avatar} />
                    <AvatarFallback className="bg-zinc-800 text-2xl font-black text-primary">M</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4 w-full">
                    <h3 className="text-lg font-black leading-tight uppercase px-4">
                        {chats.find(c => c.id === activeChat)?.name}
                    </h3>
                    <div className="flex justify-center gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-zinc-300"><Icon name="pencil" size="size-3" /></Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-zinc-300"><Icon name="link" size="size-3" /></Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-zinc-300"><Icon name="menu-dots" size="size-3" /></Button>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-8">
            <Tabs value={activeProfileTab} onValueChange={setActiveProfileTab} className="w-full">
                <TabsList className="bg-transparent border-b border-white/5 w-full justify-start p-0 h-auto gap-4 px-6 rounded-none">
                    <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">About</TabsTrigger>
                    <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">Posts</TabsTrigger>
                    <TabsTrigger value="comments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">Comments</TabsTrigger>
                    <TabsTrigger value="spaces" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-white px-0 pb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">Spaces</TabsTrigger>
                </TabsList>

                <div className="p-6">
                    <TabsContent value="about" className="space-y-8 animate-fade-in">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 text-xs text-zinc-400">
                                <p className="flex items-center gap-2"><Icon name="envelope" size="size-3" className="text-zinc-600" /> mercedesdias@me.com</p>
                                <p className="flex items-center gap-2"><Icon name="calendar" size="size-3" className="text-zinc-600" /> Member since June 7, 2024</p>
                                <p className="flex items-center gap-2"><Icon name="clock" size="size-3" className="text-zinc-600" /> Last seen 3 days ago</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Activity score</h4>
                            <div className="flex items-center gap-3 bg-zinc-900/50 p-2 pr-4 rounded-full w-fit border border-white/5">
                                <div className="w-8 h-8 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-[10px] font-black text-amber-500">
                                    <Icon name="frown" size="size-4" />
                                </div>
                                <span className="text-xs font-bold text-zinc-400">6.28</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Tags</h4>
                            <Badge variant="outline" className="bg-zinc-800 border-none p-1.5"><Icon name="robot" size="size-3" /></Badge>
                        </div>

                        <div className="space-y-2">
                             <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Headline</h4>
                             <p className="text-xs text-zinc-500 font-serif italic">Empty</p>
                        </div>

                        <div className="space-y-2">
                             <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Bio</h4>
                             <p className="text-xs text-zinc-500 font-serif italic">Empty</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="spaces" className="space-y-6 animate-fade-in">
                        {[
                            { id: 1, name: "NEW - Claude Code", count: "6355 members", icon: "sparkles", color: "text-brand-yellow" },
                            { id: 2, name: "88 Lendários", count: "239 members", icon: "user", color: "text-zinc-500" },
                            { id: 3, name: "Clone IA Express", count: "6389 members", icon: "robot", color: "text-zinc-500" },
                            { id: 4, name: "Jornada Lendária | QUIZ", count: "9008 members", icon: "list-check", color: "text-zinc-500" },
                            { id: 5, name: "Primeiros Passos", count: "6203 members", icon: "sign-in-alt", color: "text-zinc-500" },
                        ].map((space) => (
                            <div key={space.id} className="flex items-center gap-4 group cursor-pointer">
                                <div className={cn("w-10 h-10 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all", space.color)}>
                                    <Icon name={space.icon} size="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors truncate">{space.name}</h4>
                                    <p className="text-[10px] text-zinc-600">{space.count}</p>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </div>
            </Tabs>
          </div>
      </aside>

      {/* Floating Chat Bubble Toggle Placeholder */}
      <div className="fixed bottom-10 right-10 z-50">
          <div className="w-14 h-14 rounded-full bg-[#E4E4E7] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#C9B298] flex items-center justify-center">
                  <Icon name="comment" className="text-white" size="size-5" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default CommunityMessagesTemplate;
