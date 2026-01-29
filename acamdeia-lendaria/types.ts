
export enum Section {
  CONCEPT = 'Conceito',
  LENDARIA_OS = 'LendariaOS (Arquitetura)',
  DOCS = 'Documentação',
  TOKENS = 'Tokens (Guia Técnico)',
  LOVABLE_GUIDE = 'Guia Lovable (Migração)',
  AI_MANUAL = 'Manual de Integração IA',
  IDENTITY = 'Identidade Verbal',
  LEGENDARY_VS_MEDIOCRE = 'Lendário vs Medíocre',
  COLORS = 'Cores & Temas',
  TYPOGRAPHY = 'Tipografia',
  SPACING = 'Espaçamentos',
  ICONS = 'Ícones',
  LISTS = 'Listas',
  GRAPHS = 'Grafos',
  CHARTS = 'Charts (Negócio)',
  MOTION = 'Motion & Animação',
  COMPONENTS = 'Componentes',
  ADVANCED = 'Interações Avançadas',
  FEEDBACK = 'Feedback & Overlays',
  STATES = 'Estados do Sistema',
  CARDS = 'Cards & Boxes',
  FORMS = 'Formulários',
  TABLES = 'Tabelas',
  TEMPLATES = 'Templates (App)',
  // Community Templates
  TEMPLATE_COMMUNITY_FEED = 'Template: Comunidade (Feed)',
  TEMPLATE_COMMUNITY_EVENTS = 'Template: Comunidade (Eventos)',
  TEMPLATE_COMMUNITY_RANKING = 'Template: Comunidade (Ranking)',
  TEMPLATE_COMMUNITY_MESSAGES = 'Template: Comunidade (Mensagens)',
  // App Templates
  TEMPLATE_APP_CMS = 'Template: CMS Dashboard',
  TEMPLATE_APP_KANBAN = 'Template: Kanban Board',
  TEMPLATE_APP_SETTINGS = 'Template: Configurações',
  TEMPLATE_APP_MENTES = 'Template: Mentes Sintéticas',
  TEMPLATE_APP_CLONE_ARENA = 'Template: Clone Arena',
  TEMPLATE_APP_COURSE_STUDIO = 'Template: Course Studio',
  TEMPLATE_APP_COURSE_DETAIL = 'Template: Course Detail',
  TEMPLATE_APP_NEW_COURSE = 'Template: New Course Wizard',
  TEMPLATE_APP_PROJECT_CREATOR = 'Template: Project Creator (Chat)',
  TEMPLATE_APP_LESSON_EDITOR = 'Template: Lesson Editor',
  TEMPLATE_APP_PIPELINE = 'Template: Production Pipeline',
  TEMPLATE_APP_FRAMEWORKS = 'Template: Frameworks Library',
  TEMPLATE_APP_PERSONAS = 'Template: Personas Manager',
  TEMPLATE_APP_PERSONAS_LIST = 'Template: Personas List',
  TEMPLATE_APP_PSYCHOMETRIC = 'Template: Psychometric Matrix',
  TEMPLATE_APP_PSYCHOMETRIC_UPLOAD = 'Template: Psychometric Upload (Initial)',
  TEMPLATE_APP_GROUP_DASHBOARD = 'Template: Dashboard de Grupos',
  TEMPLATE_APP_PRD_ARCH = 'Template: PRD Architecture',
  TEMPLATE_APP_PRD_STUDIO = 'Template: PRD Studio',
  TEMPLATE_APP_PRD_PROJECT_DETAIL = 'Template: PRD Project Detail',
  TEMPLATE_APP_PRD_STORY_DETAIL = 'Template: PRD Story Detail',
  TEMPLATE_APP_PRD_UPLOAD = 'Template: PRD Wizard Upload',
  TEMPLATE_APP_PRD_ANALYSIS = 'Template: PRD Analysis Result',
  TEMPLATE_APP_PRD_RESEARCH = 'Template: PRD Research Prompts',
  TEMPLATE_APP_PRD_BRIEF = 'Template: PRD Brief Builder',
  TEMPLATE_APP_PRD_SPEC = 'Template: PRD Specification Wizard',
  TEMPLATE_APP_PRD_PLAN = 'Template: PRD Epics & Stories',
  TEMPLATE_APP_PRD_EXPORT = 'Template: PRD Export',
  TEMPLATE_APP_CONTENT_STUDIO = 'Template: Content Studio',
  TEMPLATE_APP_CONTENT_REPURPOSE = 'Template: Content Repurpose',
  // LMS Student View
  TEMPLATE_LMS_GRID = 'Template: Área do Aluno (Grade)',
  TEMPLATE_LMS_DETAIL = 'Template: Área do Aluno (Detalhes)',
  TEMPLATE_LMS_STUDENT = 'Template: Área do Aluno (Player)',
  TEMPLATE_LMS_CERTIFICATE = 'Template: Certificado Verificado',
  TEMPLATE_LMS_PROFILE = 'Template: Perfil do Aluno', 
  TEMPLATE_LMS_MEMBERS = 'Template: Lendários (Membros)',
  TEMPLATE_LMS_LIBRARY = 'Template: Biblioteca (Livros)',
  TEMPLATE_LMS_MY_BOOKS = 'Template: Meus Livros',
  TEMPLATE_LMS_AUTHORS = 'Template: Autores & Mentores',
  TEMPLATE_LMS_ADMIN_LIBRARY = 'Template: Gestão de Acervo (CMS)',
  TEMPLATE_LMS_COLLECTION = 'Template: Detalhes da Coleção', 
  TEMPLATE_LMS_BOOK_OVERVIEW = 'Template: Livro Visão Geral',
  TEMPLATE_LMS_BOOK_OVERVIEW_V2 = 'Template: Livro Visão Geral (Luxo 2.0)',
  TEMPLATE_LMS_BOOK_SUMMARY = 'Template: Resumo de Livro (Áudio)', 
  TEMPLATE_LMS_BOOK_READ = 'Template: Leitura de Livro (Texto)',
  TEMPLATE_LMS_BOOK_READ_V2 = 'Template: Leitura de Livro (Luxo 2.0)',
  TEMPLATE_LMS_BOOK_HIGHLIGHTS = 'Template: Destaques do Livro',
  TEMPLATE_LMS_BOOK_WORKBOOK = 'Template: Workbook (Exercícios)',
  TEMPLATE_LMS_BOOK_CLUB = 'Template: Clube do Livro (Feed)', 
  TEMPLATE_LMS_BOOK_CLUB_POST = 'Template: Clube do Livro (Post)', 
  TEMPLATE_LMS_MATERIALS = 'Template: Materiais (Arquivos)', 
  TEMPLATE_LMS_TOOLS = 'Template: Ferramentas (Tech)',
  TEMPLATE_LMS_BOOK_SALES = 'Template: Vendas de Livros (SaaS)',
  // Podcast Templates
  TEMPLATE_LMS_PODCAST_EXPLORE = 'Template: Podcast Explore',
  TEMPLATE_LMS_PODCAST_DETAIL = 'Template: Podcast Detail',
  TEMPLATE_LMS_PODCAST_READ = 'Template: Podcast Reader (Resumo)',
  // Marketing Templates
  TEMPLATE_LANDING = 'Template: Landing Page',
  TEMPLATE_ADVERTORIAL = 'Template: Advertorial',
  TEMPLATE_SALES = 'Template: Sales Page',
  TEMPLATE_EBOOK = 'Template: Ebook',
  TEMPLATE_VSL = 'Template: VSL Page',
  TEMPLATE_WEBINAR = 'Template: Webinar Reg.',
  TEMPLATE_THANKYOU = 'Template: Thank You / Upsell',
  MARKETING_GUIDE = 'Guia: Copywriting Científico',
  // Community Templates
  TEMPLATE_COMMUNITY_EMAILS = 'Sequência de Emails',
  TEMPLATE_COMMUNITY_ADVERTORIAL = 'Advertorial (Comunidade)',
  TEMPLATE_COMMUNITY_SALES = 'Página de Vendas (Comunidade)',
  TEMPLATE_COMMUNITY_CAPTURE = 'Página de Captura (Comunidade)',
  TEMPLATE_COMMUNITY_VSL = 'Página VSL (Comunidade)',
  // Tools
  TEMPLATE_BATCH_PANEL = 'Template: Batch Progress (Pipeline)',
  // Auth Standalone
  TEMPLATE_LOGIN = 'Template: Login (Standalone)'
}

export interface ColorDefinition {
  name: string;
  hex: string;
  darkHex?: string;
  description?: string;
}

export interface TypeScale {
  label: string;
  size: string;
  px: number;
  weight: string;
}

export type Language = 'pt' | 'en' | 'es';
