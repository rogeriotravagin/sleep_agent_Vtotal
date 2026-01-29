
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Symbol } from '../ui/symbol';
import { useToast } from '../../hooks/use-toast';

const LmsCertificateTemplate: React.FC = () => {
    const { toast } = useToast();

    const certData = {
        student: "Alan Nicolas",
        course: "Dominando o Super Agentes",
        completionDate: "11 de janeiro de 2026",
        verifiedAt: "11 de janeiro de 2026 às 20:19",
        certNumber: "CERT-876FEBF4",
    };

    const handleDownload = () => {
        toast({
            title: "Gerando PDF...",
            description: "Seu certificado está sendo preparado para download.",
            variant: "default"
        });
        setTimeout(() => {
            toast({
                title: "Download Concluído",
                description: "Arquivo salvo com sucesso.",
                variant: "success"
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-[#FAFAFA] font-sans animate-fade-in flex flex-col items-center justify-center p-6 selection:bg-primary/30 overflow-y-auto">
            
            {/* Logo da Academia Lendária */}
            <div className="flex items-center gap-3 mb-12 animate-fade-in">
                <Symbol name="infinity" className="text-white text-3xl" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Academia Lendária</h2>
            </div>

            <div className="w-full max-w-2xl space-y-6">
                
                {/* --- CARD SUPERIOR: STATUS VERIFICADO --- */}
                <Card className="bg-[#0A0F0A] border-green-500/10 rounded-[2.5rem] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_70%)] pointer-events-none"></div>
                    <CardContent className="p-12 flex flex-col items-center text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-[-12px] rounded-full border-2 border-green-500/10 animate-pulse"></div>
                            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <Icon name="check" size="size-8" className="animate-scale-in" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500">Certificado Verificado</h3>
                            <p className="text-sm text-zinc-500 font-serif italic">Este certificado é autêntico</p>
                        </div>
                    </CardContent>
                </Card>

                {/* --- CARD PRINCIPAL: DETALHES --- */}
                <Card className="bg-[#080808] border-white/5 rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-[15rem] pointer-events-none group-hover:scale-110 transition-transform">
                        <Icon name="medal" />
                    </div>
                    
                    <CardContent className="p-12 md:p-20 space-y-16 relative z-10 text-center">
                        
                        {/* Seção Aluno */}
                        <div className="space-y-2">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Aluno</span>
                            <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">{certData.student}</h4>
                        </div>

                        {/* Seção Curso */}
                        <div className="space-y-2">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Curso</span>
                            <h4 className="text-2xl md:text-3xl font-bold font-serif italic text-brand-gold">{certData.course}</h4>
                        </div>

                        {/* Seção Data */}
                        <div className="space-y-2">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Data de Conclusão</span>
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">{certData.completionDate}</h4>
                        </div>

                        <Separator className="bg-white/5" />

                        {/* Seção QR Code & ID */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-2 text-center md:text-left flex-1">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Número do Certificado</span>
                                <p className="text-sm font-mono font-bold text-zinc-400 tracking-widest">{certData.certNumber}</p>
                            </div>

                            {/* Placeholder QR Code */}
                            <div className="p-3 bg-white rounded-2xl shadow-2xl relative group cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-24 h-24 bg-white flex flex-col gap-1 items-center justify-center overflow-hidden">
                                    {/* Mock QR Code Pattern */}
                                    <div className="grid grid-cols-5 gap-1 w-full h-full opacity-90">
                                        {[...Array(25)].map((_, i) => (
                                            <div key={i} className={cn("rounded-sm", Math.random() > 0.5 ? "bg-black" : "bg-white")}></div>
                                        ))}
                                    </div>
                                    <Symbol name="infinity" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-2xl bg-white p-1 rounded-full border-2 border-black" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rodapé de Ações */}
                <div className="flex flex-col items-center gap-8 pt-8 pb-12">
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                        Verificado em {certData.verifiedAt}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <Button 
                            variant="ghost" 
                            className="flex-1 h-14 rounded-2xl border border-white/5 text-zinc-500 hover:text-white gap-3 font-black uppercase text-[10px] tracking-[0.2em]"
                            onClick={() => window.history.back()}
                        >
                            <Icon name="arrow-left" size="size-3" /> Voltar
                        </Button>
                        <Button 
                            className="flex-[2] h-14 rounded-2xl bg-primary text-black font-black uppercase text-[10px] tracking-[0.3em] shadow-glow relative overflow-hidden group"
                            onClick={handleDownload}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <Icon name="download" size="size-4" /> Download PDF
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                        </Button>
                    </div>

                    <button className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] hover:text-primary transition-colors">
                        CONHECER A ACADEMIA LENDÁRIA
                    </button>
                </div>
            </div>

            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[200]"></div>
        </div>
    );
};

export default LmsCertificateTemplate;
