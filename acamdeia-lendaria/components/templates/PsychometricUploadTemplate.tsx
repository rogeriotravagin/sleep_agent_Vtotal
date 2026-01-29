import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';

// --- TYPES ---
interface ProfileData {
  id: string;
  name: string;
  disc?: {
    D: number;
    I: number;
    S: number;
    C: number;
    pattern?: string;
    pattern_name?: string;
  };
  enneagram?: {
    type?: string;
    type_name?: string;
    core_fear?: string;
    core_desire?: string;
    instinct_stack?: string;
    development_level?: string;
  };
  mbti?: {
    type?: string;
    E_percentage?: number;
    N_percentage?: number;
    T_percentage?: number;
    J_percentage?: number;
    dominant_function?: string;
    cognitive_stack?: {
        dominant?: {
            function?: string;
            name?: string;
        }
    }
  };
  cognitive_stratum?: {
    level?: string;
    level_name?: string;
    time_horizon?: string;
    processing_type?: string;
  };
  big_five?: {
    openness?: number | { total: number };
    conscientiousness?: number | { total: number };
    extraversion?: number | { total: number };
    agreeableness?: number | { total: number };
    neuroticism?: number | { total: number };
  };
  intelligence?: {
      iq_estimated?: string | { range: string };
      eq_estimated?: number | { total: number };
      dominant_intelligence?: string;
  };
  dark_triad?: {
      narcissism?: number | { score: number };
      machiavellianism?: number | { score: number };
      psychopathy?: number | { score: number };
  };
  unique_characteristics?: {
      work_hours_per_day?: string;
      work_hours_per_week?: string;
      superpower?: string | string[];
      kryptonite?: string | string[];
      main_focus?: string;
      statistical_rarity?: string;
  };
}

// --- UTILS ---
const getScoreClass = (value: number, max: number = 100) => {
  const percentage = (value / max) * 100;
  if (percentage >= 75) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-bold";
  if (percentage >= 40) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
};

const getBigFiveScore = (profile: ProfileData, trait: keyof NonNullable<ProfileData['big_five']>) => {
    const val = profile.big_five?.[trait];
    if (typeof val === 'object' && val !== null && 'total' in val) return val.total;
    if (typeof val === 'number') return val;
    return 0;
}

const getIQ = (profile: ProfileData) => {
    const val = profile.intelligence?.iq_estimated;
    if (typeof val === 'object' && val !== null && 'range' in val) return val.range;
    if (typeof val === 'string') return val;
    return '-';
}

const getDarkScore = (profile: ProfileData, trait: keyof NonNullable<ProfileData['dark_triad']>) => {
    const val = profile.dark_triad?.[trait];
    if (typeof val === 'object' && val !== null && 'score' in val) return val.score;
    if (typeof val === 'number') return val;
    return 0;
}


// --- MAIN COMPONENT ---
const PsychometricUploadTemplate: React.FC = () => {
  const [profiles, setProfiles] = useState<Record<string, ProfileData>>({});
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            addProfile(json);
            toast({
                title: "Arquivo Carregado",
                description: `Perfil extraído de ${file.name}`,
                variant: "success"
            });
          } catch (error) {
            toast({
                title: "Erro no Arquivo",
                description: `Não foi possível ler ${file.name}`,
                variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    });
  }, [toast]);

  const addProfile = (json: any) => {
    let profilesToAdd: ProfileData[] = [];
    
    // Logic to parse different JSON structures
    if (json.profiles && typeof json.profiles === 'object') {
        Object.keys(json.profiles).forEach(key => {
            const prof = json.profiles[key];
            prof.id = prof.id || key;
            profilesToAdd.push(prof);
        });
    } else if (json.profile) {
        profilesToAdd.push(json.profile);
    } else if (json.name) {
        profilesToAdd.push(json);
    }

    setProfiles(prev => {
        const next = { ...prev };
        profilesToAdd.forEach(p => {
            const id = p.id || p.name.toLowerCase().replace(/\s+/g, '_');
            next[id] = { ...p, id };
        });
        return next;
    });
  };

  const removeProfile = (id: string) => {
      setProfiles(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
      });
  };

  const clearAll = () => {
      if (confirm('Tem certeza que deseja limpar todos os perfis?')) {
          setProfiles({});
      }
  };

  const exportToCSV = () => {
      const profilesArray = Object.values(profiles) as ProfileData[];
      if (profilesArray.length === 0) return;
      
      let csv = 'Métrica,' + profilesArray.map(p => p.name).join(',') + '\n';
      // DISC
      csv += 'DISC D,' + profilesArray.map(p => p.disc?.D || '').join(',') + '\n';
      // ... Add more fields as needed for CSV export logic
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'perfis_psicometricos.csv';
      a.click();
  };

  const profilesArray = Object.values(profiles) as ProfileData[];
  const hasProfiles = profilesArray.length > 0;

  // --- RENDER HELPERS ---
  const MetricRow = ({ label, render }: { label: string, render: (p: ProfileData) => React.ReactNode }) => (
      <TableRow className="hover:bg-muted/10">
          <TableCell className="font-bold text-muted-foreground w-[200px] bg-muted/20">{label}</TableCell>
          {profilesArray.map(p => (
              <TableCell key={p.id} className="min-w-[150px]">
                  {render(p)}
              </TableCell>
          ))}
      </TableRow>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in pb-20">
      
      {/* Header */}
      <header className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4 text-center space-y-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest px-4 py-1">
                  Ferramenta de Análise
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Upload & Comparação <span className="text-primary">Dinâmica</span>
              </h1>
              <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
                  Carregue arquivos JSON para gerar tabelas comparativas instantâneas de perfis psicométricos.
              </p>
          </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">

          {/* UPLOAD SECTION */}
          <Card 
            className={cn(
                "border-2 border-dashed transition-all duration-300",
                isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-card",
                !hasProfiles && "py-12"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
            }}
          >
              <CardContent className={cn("flex flex-col items-center justify-center text-center", !hasProfiles ? "gap-6" : "gap-4 pt-6")}>
                  {!hasProfiles ? (
                      <>
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground animate-float">
                            <Icon name="cloud-upload" size="size-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Arraste seus arquivos JSON aqui</h3>
                            <p className="text-sm text-muted-foreground font-serif">Suporta múltiplos arquivos simultaneamente.</p>
                        </div>
                        <Button 
                            onClick={() => document.getElementById('file-upload')?.click()} 
                            size="lg" 
                            className="shadow-lg"
                        >
                            Selecionar Arquivos
                        </Button>
                      </>
                  ) : (
                      <div className="flex flex-col w-full gap-6">
                          <div className="flex flex-wrap gap-2 justify-center">
                              {profilesArray.map(p => (
                                  <Badge key={p.id} variant="secondary" className="px-3 py-1.5 text-sm gap-2 pl-4">
                                      {p.name}
                                      <button onClick={() => removeProfile(p.id)} className="hover:text-destructive transition-colors">
                                          <Icon name="cross" size="size-3" />
                                      </button>
                                  </Badge>
                              ))}
                              <Button variant="outline" size="sm" className="h-8 border-dashed" onClick={() => document.getElementById('file-upload')?.click()}>
                                  <Icon name="plus" size="size-3" className="mr-2" /> Adicionar
                              </Button>
                          </div>
                          <Separator />
                          <div className="flex justify-center gap-4">
                              <Button variant="outline" onClick={exportToCSV} className="gap-2">
                                  <Icon name="download" size="size-4" /> Exportar CSV
                              </Button>
                              <Button variant="destructive" onClick={clearAll} className="gap-2">
                                  <Icon name="trash" size="size-4" /> Limpar Tudo
                              </Button>
                          </div>
                      </div>
                  )}
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept=".json" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => handleFiles(e.target.files)} 
                  />
              </CardContent>
          </Card>

          {/* STATS SECTION */}
          {hasProfiles && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                  <Card className="bg-muted/20 border-primary/20">
                      <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold font-mono text-primary">{profilesArray.length}</div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Perfis Carregados</p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold font-mono">
                              {Math.round(profilesArray.reduce((sum, p) => sum + (p.disc?.D || 0), 0) / profilesArray.length)}
                          </div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Média Dominância (D)</p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold font-mono">
                              {Math.round(profilesArray.reduce((sum, p) => sum + getBigFiveScore(p, 'openness'), 0) / profilesArray.length)}
                          </div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Média Openness</p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold font-mono">
                              {Math.round(profilesArray.reduce((sum, p) => {
                                  const iq = getIQ(p);
                                  const match = iq.match(/\d+/);
                                  return sum + (match ? parseInt(match[0]) : 0);
                              }, 0) / profilesArray.length)}
                          </div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">QI Médio Estimado</p>
                      </CardContent>
                  </Card>
              </div>
          )}

          {/* TABLES */}
          {hasProfiles && (
            <div className="space-y-12 animate-fade-in">
                
                {/* DISC */}
                <Card>
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle>DISC - Comportamento Observável</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="D (Dominância)" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.disc?.D || 0))}>{p.disc?.D || '-'}/100</span>} />
                                <MetricRow label="I (Influência)" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.disc?.I || 0))}>{p.disc?.I || '-'}/100</span>} />
                                <MetricRow label="S (Estabilidade)" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.disc?.S || 0))}>{p.disc?.S || '-'}/100</span>} />
                                <MetricRow label="C (Conformidade)" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.disc?.C || 0))}>{p.disc?.C || '-'}/100</span>} />
                                <MetricRow label="Padrão DISC" render={(p) => <span className="font-bold">{p.disc?.pattern || '-'}</span>} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* ENNEAGRAM */}
                <Card>
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle>Eneagrama - Motivações Core</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="Tipo Principal" render={(p) => <span>{p.enneagram?.type || '-'} <span className="text-xs text-muted-foreground block">{p.enneagram?.type_name}</span></span>} />
                                <MetricRow label="Medo Fundamental" render={(p) => <span className="text-sm">{p.enneagram?.core_fear || '-'}</span>} />
                                <MetricRow label="Desejo Fundamental" render={(p) => <span className="text-sm">{p.enneagram?.core_desire || '-'}</span>} />
                                <MetricRow label="Instintos" render={(p) => <Badge variant="outline">{p.enneagram?.instinct_stack || '-'}</Badge>} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* MBTI */}
                <Card>
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle>MBTI - Processamento Cognitivo</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="Tipo" render={(p) => <span className="font-bold text-lg">{p.mbti?.type || '-'}</span>} />
                                <MetricRow label="E / I" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.mbti?.E_percentage || 0))}>{p.mbti?.E_percentage}% E</span>} />
                                <MetricRow label="S / N" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.mbti?.N_percentage || 0))}>{p.mbti?.N_percentage}% N</span>} />
                                <MetricRow label="T / F" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.mbti?.T_percentage || 0))}>{p.mbti?.T_percentage}% T</span>} />
                                <MetricRow label="J / P" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(p.mbti?.J_percentage || 0))}>{p.mbti?.J_percentage}% J</span>} />
                                <MetricRow label="Função Dominante" render={(p) => {
                                    const func = p.mbti?.cognitive_stack?.dominant?.function || p.mbti?.dominant_function || '-';
                                    const name = p.mbti?.cognitive_stack?.dominant?.name;
                                    return <span>{func} {name && <span className="text-xs text-muted-foreground block">({name})</span>}</span>;
                                }} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* BIG FIVE */}
                <Card>
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle>Big Five (OCEAN)</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="Openness" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(getBigFiveScore(p, 'openness')))}>{getBigFiveScore(p, 'openness')}/100</span>} />
                                <MetricRow label="Conscientiousness" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(getBigFiveScore(p, 'conscientiousness')))}>{getBigFiveScore(p, 'conscientiousness')}/100</span>} />
                                <MetricRow label="Extraversion" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(getBigFiveScore(p, 'extraversion')))}>{getBigFiveScore(p, 'extraversion')}/100</span>} />
                                <MetricRow label="Agreeableness" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(getBigFiveScore(p, 'agreeableness')))}>{getBigFiveScore(p, 'agreeableness')}/100</span>} />
                                <MetricRow label="Neuroticism" render={(p) => <span className={cn("px-2 py-1 rounded text-xs", getScoreClass(getBigFiveScore(p, 'neuroticism')))}>{getBigFiveScore(p, 'neuroticism')}/100</span>} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                 {/* DARK TRIAD */}
                 <Card className="border-destructive/20">
                    <CardHeader className="bg-destructive/5 border-b border-destructive/20">
                        <CardTitle className="text-destructive flex items-center gap-2"><Icon name="skull" /> Dark Triad</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="Narcisismo" render={(p) => <span className={cn("px-2 py-1 rounded text-xs font-bold", getScoreClass(getDarkScore(p, 'narcissism'), 7))}>{getDarkScore(p, 'narcissism')}/7</span>} />
                                <MetricRow label="Maquiavelismo" render={(p) => <span className={cn("px-2 py-1 rounded text-xs font-bold", getScoreClass(getDarkScore(p, 'machiavellianism'), 7))}>{getDarkScore(p, 'machiavellianism')}/7</span>} />
                                <MetricRow label="Psicopatia" render={(p) => <span className={cn("px-2 py-1 rounded text-xs font-bold", getScoreClass(getDarkScore(p, 'psychopathy'), 7))}>{getDarkScore(p, 'psychopathy')}/7</span>} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* UNIQUE CHARS */}
                <Card>
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle>Características Únicas</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Dimensão</TableHead>
                                    {profilesArray.map(p => <TableHead key={p.id} className="min-w-[150px] font-bold text-foreground">{p.name}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <MetricRow label="Horas de Trabalho" render={(p) => <span>{p.unique_characteristics?.work_hours_per_day || p.unique_characteristics?.work_hours_per_week || '-'}</span>} />
                                <MetricRow label="Superpoder" render={(p) => {
                                    const sp = p.unique_characteristics?.superpower;
                                    return <span className="text-sm font-medium text-primary">{Array.isArray(sp) ? sp[0] : sp || '-'}</span>;
                                }} />
                                <MetricRow label="Kryptonita" render={(p) => {
                                    const kp = p.unique_characteristics?.kryptonite;
                                    return <span className="text-sm text-muted-foreground">{Array.isArray(kp) ? kp[0] : kp || '-'}</span>;
                                }} />
                                <MetricRow label="Foco Principal" render={(p) => <span className="text-xs">{p.unique_characteristics?.main_focus || '-'}</span>} />
                            </TableBody>
                        </Table>
                    </div>
                </Card>

            </div>
          )}

      </main>
    </div>
  );
};

export default PsychometricUploadTemplate;