
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { CodeBlock } from '../ui/code-block';
import { useClipboard } from '../../hooks/use-clipboard';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/utils';
import { Section } from '../../types';

interface PrdStoryDetailTemplateProps {
    onNavigate?: (section: Section) => void;
    currentSection?: Section;
}

// --- Constants ---
const STUDIO_TEAL = "#00C7BE"; 

const PrdStoryDetailTemplate: React.FC<PrdStoryDetailTemplateProps> = ({ onNavigate, currentSection }) => {
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const [story, setStory] = useState({
      id: "1.4",
      title: "Setup de permissões por role",
      description: "Como um administrador do sistema, eu quero definir permissões granulares para diferentes papéis (Admin, Dentista, Secretária) para garantir a segurança dos dados dos pacientes.",
      acceptanceCriteria: [
          "Criar tabela 'roles' e 'permissions' no banco de dados.",
          "Implementar middleware de verificação de role nas rotas protegidas.",
          "Apenas Admins podem criar ou deletar usuários.",
          "Secretárias têm acesso apenas a leitura na ficha financeira.",
      ],
      techNotes: `// Middleware Example
export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Forbidden');
  }
  next();
};`,
      status: "Rascunho",
      priority: "Alta",
      points: 5,
      assignee: "Alan Nicolas",
      epic: "Fundação e Autenticação"
  });

  const handleCopyStory = () => {
      const content = `Story ${story.id}: ${story.title}
      
${story.description}

Acceptance Criteria:
${story.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}

Tech Notes:
${story.techNotes}
      `;
      
      copyToClipboard(content);
      toast({
          title: "Story Copiada",
          description: "Conteúdo copiado para a área de transferência.",
          variant: "success",
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in text-foreground">
      
      {/* Top Bar matching PRD Studio */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4">
          <div className="container flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${STUDIO_TEAL}15`, borderColor: `${STUDIO_TEAL}30`, color: STUDIO_TEAL }}>
                  <Icon name="file-code" size="size-5" />
              </div>
              <div>
                  <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
                      PRD <span className="font-light" style={{ color: STUDIO_TEAL }}>Studio</span>
                  </h1>
                  <p className="text-xs text-muted-foreground font-serif">Editor de História</p>
              </div>
          </div>
      </header>

      <main className="container py-6 md:py-8 w-full space-y-8 flex-1">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_STUDIO)}
            >
                Projetos
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_PROJECT_DETAIL)}
            >
                CRM Dentistas
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span 
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => onNavigate && onNavigate(Section.TEMPLATE_APP_PRD_PROJECT_DETAIL)}
            >
                {story.epic}
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span className="text-foreground font-medium truncate">{story.id}</span>
        </div>

        {/* --- HEADER ACTIONS --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center font-mono font-bold text-muted-foreground border border-border">
                    {story.id}
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{story.title}</h1>
                <Badge variant="outline" className="border-dashed">{story.status}</Badge>
            </div>
            
            <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={handleCopyStory}>
                    <Icon name="copy" size="size-4" /> Copiar
                </Button>
                <Button className="gap-2 text-white" style={{ backgroundColor: STUDIO_TEAL }}>
                    <Icon name="check" size="size-4" /> Salvar
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- LEFT COLUMN: CONTENT (2/3) --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Description */}
                <Card>
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Icon name="document" className="text-muted-foreground" size="size-4" /> Descrição da História
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <AutosizeTextarea 
                            className="text-base font-serif leading-relaxed min-h-[120px] bg-transparent border-none focus:ring-0 px-0 resize-none"
                            value={story.description}
                            onChange={(e) => setStory({...story, description: e.target.value})}
                        />
                    </CardContent>
                </Card>

                {/* Acceptance Criteria */}
                <Card>
                    <CardHeader className="pb-3 border-b border-border/50">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Icon name="list-check" className="text-muted-foreground" size="size-4" /> Critérios de Aceite
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                                <Icon name="plus" size="size-3" /> Adicionar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        {story.acceptanceCriteria.map((ac, i) => (
                            <div key={i} className="flex gap-3 items-start group">
                                <div className="mt-1 w-4 h-4 border border-border rounded flex items-center justify-center cursor-pointer hover:border-[var(--studio-teal)]" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}></div>
                                <Input 
                                    className="flex-1 h-auto py-1 px-2 border-transparent hover:border-border focus:border-border bg-transparent text-sm"
                                    value={ac}
                                    onChange={(e) => {
                                        const newAc = [...story.acceptanceCriteria];
                                        newAc[i] = e.target.value;
                                        setStory({...story, acceptanceCriteria: newAc});
                                    }}
                                />
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon name="cross" size="size-3" className="text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tech Notes */}
                <Card>
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Icon name="code-simple" className="text-muted-foreground" size="size-4" /> Notas Técnicas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CodeBlock language="tsx" className="my-0">
                            {story.techNotes}
                        </CodeBlock>
                    </CardContent>
                </Card>

            </div>

            {/* --- RIGHT COLUMN: METADATA (1/3) --- */}
            <div className="space-y-6">
                
                <Card>
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Propriedades</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        <div className="grid gap-1">
                            <label className="text-xs font-medium text-muted-foreground">Status</label>
                            <Select 
                                value={story.status}
                                options={[
                                    { label: 'Rascunho', value: 'Rascunho' },
                                    { label: 'Aprovado', value: 'Aprovado' },
                                    { label: 'Em Desenv.', value: 'Em Desenv.' },
                                    { label: 'Concluído', value: 'Concluído' }
                                ]}
                                className="h-9"
                            />
                        </div>
                        
                        <div className="grid gap-1">
                            <label className="text-xs font-medium text-muted-foreground">Prioridade</label>
                            <Select 
                                value={story.priority}
                                options={[
                                    { label: 'Alta', value: 'Alta' },
                                    { label: 'Média', value: 'Média' },
                                    { label: 'Baixa', value: 'Baixa' }
                                ]}
                                className="h-9"
                            />
                        </div>

                        <div className="grid gap-1">
                            <label className="text-xs font-medium text-muted-foreground">Estimativa (Pontos)</label>
                            <Input type="number" value={story.points} className="h-9" />
                        </div>

                        <div className="grid gap-1">
                            <label className="text-xs font-medium text-muted-foreground">Responsável</label>
                            <div className="flex items-center gap-2 p-2 border border-border rounded-md bg-muted/20">
                                <div className="w-5 h-5 rounded-full bg-[var(--studio-teal)] flex items-center justify-center text-[10px] font-bold text-white" style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}>
                                    AN
                                </div>
                                <span className="text-sm">{story.assignee}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/10 border-dashed border-border">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 py-8">
                        <Icon name="figma" type="brands" className="text-muted-foreground/50 text-3xl" />
                        <p className="text-sm font-medium text-muted-foreground">Nenhum design vinculado</p>
                        <Button variant="outline" size="sm" className="h-8 text-xs">Vincular Frame</Button>
                    </CardContent>
                </Card>

                <div className="text-xs text-muted-foreground text-center">
                    Criado em 10/12/2024 • ID: {story.id}
                </div>

            </div>

        </div>

      </main>
    </div>
  );
};

export default PrdStoryDetailTemplate;
