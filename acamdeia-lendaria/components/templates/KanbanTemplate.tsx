
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AvatarGroup } from '../ui/avatar-group';
import { KanbanBoard, KanbanColumn, KanbanCard } from '../ui/kanban';

const KanbanTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Projetos</span>
                  <Icon name="angle-small-right" size="size-3" />
                  <span className="text-foreground">Lançamento Q4</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                  Board de Tarefas
                  <Badge variant="outline" className="font-normal text-xs">Sprint 42</Badge>
              </h1>
          </div>
          
          <div className="flex items-center gap-4">
              <AvatarGroup limit={3} size="sm">
                  <Avatar>
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>TR</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>+2</AvatarFallback></Avatar>
              </AvatarGroup>
              <div className="h-8 w-px bg-border mx-2"></div>
              <Button variant="outline" size="icon"><Icon name="filter" /></Button>
              <Button className="gap-2 shadow-md shadow-primary/20">
                  <Icon name="plus" size="size-4" /> Nova Tarefa
              </Button>
          </div>
      </header>

      {/* --- KANBAN BOARD IMPLEMENTATION --- */}
      <KanbanBoard>
          
          {/* Column 1: Backlog */}
          <KanbanColumn title="Backlog" count={4} color="#A1A1AA">
              <KanbanCard 
                  title="Pesquisa de Keywords" 
                  tag="Marketing" 
                  priority="low" 
                  members={[{ name: "Alan", fallback: "AN" }]} 
              />
              <KanbanCard 
                  title="Definir Paleta de Cores" 
                  tag="Design" 
                  priority="medium" 
                  members={[{ name: "Julia", fallback: "JD" }]} 
              />
              <KanbanCard 
                  title="Escrever Copy da LP" 
                  tag="Copywriting" 
                  priority="high" 
                  members={[{ name: "Alan", fallback: "AN" }, { name: "Julia", fallback: "JD" }]} 
                  metrics={{ comments: 4, attachments: 2 }}
              />
              <KanbanCard 
                  title="Configurar DNS" 
                  tag="Dev" 
                  priority="high" 
                  members={[{ name: "Tech", fallback: "TR" }]} 
              />
          </KanbanColumn>

          {/* Column 2: Doing */}
          <KanbanColumn title="Em Produção" count={2} color="#60A5FA" onAdd={() => {}}>
              <KanbanCard 
                  title="Criar wireframes do Dashboard" 
                  tag="Design" 
                  priority="high" 
                  members={[{ name: "Julia", fallback: "JD" }]} 
                  image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop"
                  metrics={{ comments: 1 }}
              />
              <KanbanCard 
                  title="Integração com Stripe" 
                  tag="Dev" 
                  priority="medium" 
                  members={[{ name: "Tech", fallback: "TR" }]} 
              />
          </KanbanColumn>

          {/* Column 3: Review */}
          <KanbanColumn title="Revisão" count={1} color="#F59E0B">
              <KanbanCard 
                  title="Vídeo de Vendas (V1)" 
                  tag="Video" 
                  priority="high" 
                  members={[{ name: "Alan", fallback: "AN" }]} 
                  metrics={{ comments: 12 }}
              />
          </KanbanColumn>

          {/* Column 4: Done */}
          <KanbanColumn title="Concluído" count={3} color="#10B981">
              <KanbanCard 
                  title="Setup Inicial do Repo" 
                  tag="Dev" 
                  priority="medium" 
                  members={[{ name: "Tech", fallback: "TR" }]} 
              />
              <KanbanCard 
                  title="Briefing com Cliente" 
                  tag="Gestão" 
                  priority="medium" 
                  members={[{ name: "Alan", fallback: "AN" }]} 
              />
              <KanbanCard 
                  title="Compra de Domínio" 
                  tag="Infra" 
                  priority="low" 
                  members={[{ name: "Tech", fallback: "TR" }]} 
              />
          </KanbanColumn>
      </KanbanBoard>
    </div>
  );
};

export default KanbanTemplate;
