
export interface MindProfile {
    id: string;
    name: string;
    role: string;
    tier: string;
    avatar: string;
    score: number;
    color: string;
    description: string;
    // Extended Data (Mocked for demo purposes to be shared structure)
    psychometrics: {
        mbti: string;
        enneagram: string;
        disc: string;
    };
    stats: {
        dominance: number;
        influence: number;
        stability: number;
        conformity: number;
    };
}

export const MINDS: MindProfile[] = [
    {
        id: "alan",
        name: "Alan Nicolas",
        role: "Arquiteto de Sistemas",
        tier: "TIER 1 (Founder)",
        avatar: "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj",
        score: 9.8,
        color: "text-brand-gold",
        description: "Fundador da Academia Lendária. Especialista em produtividade, sistemas cognitivos e escala de negócios via IA.",
        psychometrics: { mbti: "INTJ", enneagram: "5w4", disc: "Dc" },
        stats: { dominance: 90, influence: 40, stability: 20, conformity: 75 }
    },
    { 
        id: 'elon', 
        name: 'Elon Musk', 
        role: 'Engenheiro Visionário', 
        tier: "TIER S (Lenda)",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg", 
        score: 9.9,
        color: 'text-brand-cyan',
        description: "Focado em primeiros princípios, Marte e energia sustentável. Comunicação direta, técnica e por vezes abrupta.",
        psychometrics: { mbti: "INTJ", enneagram: "8w7", disc: "Di" },
        stats: { dominance: 95, influence: 60, stability: 10, conformity: 20 }
    },
    { 
        id: 'naval', 
        name: 'Naval Ravikant', 
        role: 'Filósofo Moderno', 
        tier: "TIER S (Lenda)",
        avatar: "https://pbs.twimg.com/profile_images/1256841238298292232/ycq9qpeU_400x400.jpg", 
        score: 9.7,
        color: 'text-brand-blue',
        description: "Investidor anjo e pensador. Focado em riqueza, felicidade e alavancagem sem permissão.",
        psychometrics: { mbti: "INTP", enneagram: "5w6", disc: "Sc" },
        stats: { dominance: 30, influence: 50, stability: 80, conformity: 60 }
    },
    { 
        id: 'sam', 
        name: 'Sam Altman', 
        role: 'Arquiteto de AGI', 
        tier: "TIER A (Líder)",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Sam_Altman_at_TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848833898122%29_%28cropped%29.jpg/800px-Sam_Altman_at_TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848833898122%29_%28cropped%29.jpg", 
        score: 9.5,
        color: 'text-green-500',
        description: "CEO da OpenAI. Focado em escala, futuro da humanidade e alinhamento de inteligência artificial.",
        psychometrics: { mbti: "ENTJ", enneagram: "3w4", disc: "Di" },
        stats: { dominance: 85, influence: 70, stability: 40, conformity: 50 }
    },
    { 
        id: 'jobs', 
        name: 'Steve Jobs', 
        role: 'Visionário de Produto', 
        tier: "TIER S (Lenda)",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg", 
        score: 9.9,
        color: 'text-zinc-400',
        description: "Fundador da Apple. Focado em design, perfeccionismo e distorção da realidade.",
        psychometrics: { mbti: "ENTJ", enneagram: "4w3", disc: "D" },
        stats: { dominance: 98, influence: 80, stability: 5, conformity: 10 }
    },
];
