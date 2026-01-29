
import React, { useState } from 'react';
import { Section, Language } from '../types';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { cn } from '../lib/utils';
import { THEMES, ThemeName } from '../lib/theme';
import { Popover } from './ui/popover'; 
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

interface SidebarProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentThemeName: ThemeName;
  setThemeName: (t: ThemeName) => void;
  currentLanguage: Language;
  setLanguage: (l: Language) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
}

interface NavItem {
  key: string; 
  icon?: string; 
  section?: Section;
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
    currentSection, 
    setSection, 
    isDark, 
    toggleTheme, 
    isCollapsed, 
    toggleCollapse,
    currentThemeName,
    setThemeName,
    currentLanguage,
    setLanguage,
    isMobileOpen,
    closeMobileMenu
}) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['library_area', 'grp_podcasts', 'grp_books', 'course_creator', 'templates_app', 'prd_studio', 'content_studio', 'student_area', 'design_system_root', 'interface', 'verbal_identity']);

  const translations: Record<Language, Record<string, string>> = {
    pt: {
        'design_system_root': 'Design System',
        'overview': 'Visão Geral',
        'lendaria_os': 'LendariaOS (Arquitetura)',
        'verbal_identity': 'Identidade Verbal',
        'identity': 'Identidade',
        'legendary_vs_mediocre': 'Lendário vs Medíocre',
        'interface': 'Interface',
        'colors': 'Cores & Temas',
        'typography': 'Tipografia',
        'spacing': 'Espaçamentos',
        'icons': 'Ícones',
        'lists': 'Listas',
        'motion': 'Motion',
        'graphs': 'Grafos (Redes)',
        'charts': 'Charts (KPIs)',
        'components': 'Componentes',
        'advanced': 'Interações Avançadas',
        'feedback': 'Feedback',
        'states': 'Estados & Loading',
        'cards': 'Cards & Boxes',
        'forms': 'Formulários',
        'tables': 'Tabelas',
        'templates_root': 'Templates',
        'course_creator': 'Course Creator',
        'prd_studio': 'PRD Studio',
        'content_studio': 'Content Studio',
        'student_area': 'Área do Aluno (LMS)',
        'library_area': 'Biblioteca (Livros)', 
        'grp_books': 'Livros & Leitura',
        'grp_podcasts': 'Podcasts & Áudio',
        'grp_community': 'Comunidade',
        'grp_admin': 'Admin & Ferramentas',
        'tpl_lms_grid': 'Meus Cursos', 
        'tpl_lms_detail': 'Detalhes do Curso', 
        'tpl_lms_student': 'Player de Aula',
        'tpl_lms_cert': 'Certificado Verificado',
        'tpl_lms_profile': 'Meu Perfil', 
        'tpl_lms_members': 'Lendários', 
        'tpl_lms_library': 'Explorar Acervo',
        'tpl_lms_my_books': 'Meus Livros',
        'tpl_lms_authors': 'Autores', 
        'tpl_lms_admin_library': 'Gerenciar Acervo',
        'tpl_lms_collection': 'Detalhes da Coleção',
        'tpl_lms_book_overview': 'Livro: Visão Geral', 
        'tpl_lms_book_overview_v2': 'Livro: Visão Geral (V2)',
        'tpl_lms_book_summary': 'Resumo (Áudio)',
        'tpl_lms_book_read': 'Leitura (Texto)',
        'tpl_lms_book_read_v2': 'Leitura (Luxo 2.0)',
        'tpl_lms_book_highlights': 'Destaques do Livro',
        'tpl_lms_book_workbook': 'Workbook (Prática)', 
        'tpl_lms_book_club': 'Feed de Discussão', 
        'tpl_lms_book_club_post': 'Post Detalhado',
        'tpl_lms_materials': 'Materiais', 
        'tpl_lms_tools': 'Ferramentas',
        'tpl_lms_book_sales': 'Página de Vendas (Book)',
        'tpl_lms_podcast_explore': 'Explorar Podcasts',
        'tpl_lms_podcast_detail': 'Detalhes do Podcast',
        'tpl_lms_podcast_read': 'Leitura do Resumo',
        'templates_app': 'SaaS / App',
        'tpl_app_mentes': 'Mentes Sintéticas',
        'tpl_app_clone_arena': 'Clone Arena', 
        'tpl_app_cms': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Projetos',
        'tpl_app_settings': 'Configurações / Perfil',
        'tpl_app_group_dashboard': 'Dashboard de Grupos',
        'tpl_app_login': 'Login (Standalone)',
        'tpl_batch_panel': 'Pipeline de Resumos (Batch)', 
        'tpl_app_course_studio': 'Dashboard',
        'tpl_app_course_detail': 'Detalhes do Curso',
        'tpl_app_lesson_editor': 'Editor de Aulas', 
        'tpl_app_pipeline': 'Pipeline de Produção',
        'tpl_app_frameworks': 'Biblioteca de Frameworks',
        'tpl_app_personas': 'Gerenciador de Personas',
        'tpl_app_psychometric': 'Matriz Psicométrica',
        'tpl_app_psychometric_upload': 'Upload Psicometria',
        'tpl_app_project_creator': 'Criador com IA (Chat)', 
        'tpl_app_prd_arch': 'Arquitetura & Fluxo',
        'tpl_app_prd_studio': 'Dashboard',
        'tpl_app_prd_detail': 'Detalhes do Projeto',
        'tpl_app_prd_upload': 'Novo Projeto (Wizard)',
        'tpl_app_prd_analysis': 'Análise (Wizard)',
        'tpl_app_prd_research': 'Pesquisas (Wizard)',
        'tpl_app_prd_brief': 'Brief Builder (Wizard)',
        'tpl_app_prd_spec': 'Spec Wizard (PRD)',
        'tpl_app_prd_plan': 'Plan (Épicos)',
        'tpl_app_prd_export': 'Exportar',
        'tpl_app_prd_story': 'Detalhes da Story',
        'tpl_app_content_studio': 'Dashboard',
        'tpl_app_content_repurpose': 'Repurposing (Editor)',
        'marketing_kit': 'Marketing',
        'community_kit': 'Comunidade Lendária',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Página de Vendas',
        'tpl_ebook': 'Baixar Ebook',
        'tpl_vsl': 'Página VSL (Vídeo)',
        'tpl_webinar': 'Registro Webinário',
        'tpl_thankyou': 'Obrigado / Upsell',
        'tpl_emails': 'Sequência de Emails',
        'tpl_comm_adv': 'Advertorial',
        'tpl_comm_sales': 'Página de Vendas',
        'tpl_comm_capture': 'Página de Captura',
        'tpl_comm_vsl': 'Página VSL',
        'marketing_guide': 'Guia de Copywriting',
        'documentation': 'Documentação',
        'technical': 'Técnica',
        'tokens': 'Tokens (Guia)',
        'lovable_guide': 'Guia Lovable (IA)', 
        'ai_manual': 'Manual IA',
        'lang_select': 'Selecionar Idioma',
        'theme_select': 'Selecionar Color',
        'tpl_comm_feed': 'Espaços / Feed',
        'tpl_comm_events': 'Agenda de Eventos',
        'tpl_comm_ranking': 'Hall da Fama (Ranking)',
        'tpl_comm_messages': 'Mensagens & IA'
    },
    en: {
        'design_system_root': 'Design System',
        'overview': 'Overview',
        'lendaria_os': 'LendariaOS (Architecture)',
        'verbal_identity': 'Verbal Identity',
        'identity': 'Identity',
        'legendary_vs_mediocre': 'Legendary vs Mediocre',
        'interface': 'Interface',
        'colors': 'Colors & Themes',
        'typography': 'Typography',
        'spacing': 'Spacing',
        'icons': 'Icons',
        'lists': 'Lists',
        'motion': 'Motion',
        'graphs': 'Graphs (Network)',
        'charts': 'Charts (KPIs)',
        'components': 'Components',
        'advanced': 'Advanced Interactions',
        'feedback': 'Feedback',
        'states': 'States & Loading',
        'cards': 'Cards & Boxes',
        'forms': 'Forms',
        'tables': 'Tables',
        'templates_root': 'Templates',
        'course_creator': 'Course Creator',
        'prd_studio': 'PRD Studio',
        'content_studio': 'Content Studio',
        'student_area': 'Student Area (LMS)',
        'library_area': 'Library (Books)', 
        'grp_books': 'Books & Reading',
        'grp_podcasts': 'Podcasts & Audio',
        'grp_community': 'Community',
        'grp_admin': 'Admin & Tools',
        'tpl_lms_grid': 'My Courses', 
        'tpl_lms_detail': 'Course Details',
        'tpl_lms_student': 'Lesson Player',
        'tpl_lms_cert': 'Verified Certificate',
        'tpl_lms_profile': 'My Profile', 
        'tpl_lms_members': 'Legends', 
        'tpl_lms_library': 'Browse Library',
        'tpl_lms_my_books': 'My Books',
        'tpl_lms_authors': 'Authors',
        'tpl_lms_admin_library': 'Manage Library',
        'tpl_lms_collection': 'Collection Details',
        'tpl_lms_book_overview': 'Book Overview', 
        'tpl_lms_book_overview_v2': 'Book Overview (V2)',
        'tpl_lms_book_summary': 'Book Summary (Audio)',
        'tpl_lms_book_read': 'Book Reader (Text)',
        'tpl_lms_book_read_v2': 'Book Reader (Luxury 2.0)',
        'tpl_lms_book_highlights': 'Book Highlights',
        'tpl_lms_book_workbook': 'Workbook (Practice)',
        'tpl_lms_book_club': 'Discussion Feed',
        'tpl_lms_book_club_post': 'Detailed Post',
        'tpl_lms_materials': 'Materials', 
        'tpl_lms_tools': 'Tools Stack',
        'tpl_lms_book_sales': 'Book Sales Page',
        'tpl_lms_podcast_explore': 'Explore Podcasts',
        'tpl_lms_podcast_detail': 'Podcast Details',
        'tpl_lms_podcast_read': 'Read Summary',
        'templates_app': 'SaaS / App',
        'tpl_app_mentes': 'Synthetic Minds',
        'tpl_app_clone_arena': 'Clone Arena', 
        'tpl_app_cells': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Projects',
        'tpl_app_settings': 'Settings / Profile',
        'tpl_app_group_dashboard': 'Group Dashboard',
        'tpl_app_login': 'Login (Standalone)',
        'tpl_batch_panel': 'Summary Pipeline (Batch)', 
        'tpl_app_course_studio': 'Dashboard',
        'tpl_app_course_detail': 'Course Details',
        'tpl_app_lesson_editor': 'Lesson Editor',
        'tpl_app_pipeline': 'Production Pipeline',
        'tpl_app_frameworks': 'Frameworks Library',
        'tpl_app_personas': 'Personas Manager',
        'tpl_app_psychometric': 'Psychometric Matrix',
        'tpl_app_psychometric_upload': 'Psychometric Upload',
        'tpl_app_project_creator': 'AI Project Creator', 
        'tpl_app_prd_arch': 'Architecture & Flow',
        'tpl_app_prd_studio': 'Dashboard',
        'tpl_app_prd_detail': 'Project Details',
        'tpl_app_prd_upload': 'New Project (Wizard)',
        'tpl_app_prd_analysis': 'Analysis (Wizard)',
        'tpl_app_prd_research': 'Research (Wizard)',
        'tpl_app_prd_brief': 'Brief Builder (Wizard)',
        'tpl_app_prd_spec': 'Spec Wizard (PRD)',
        'tpl_app_prd_plan': 'Plan (Epics)',
        'tpl_app_prd_export': 'Export',
        'tpl_app_prd_story': 'Story Details',
        'tpl_app_content_studio': 'Dashboard',
        'tpl_app_content_repurpose': 'Repurposing (Editor)',
        'marketing_kit': 'Marketing',
        'community_kit': 'Legendary Community',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Sales Page',
        'tpl_ebook': 'Download Ebook',
        'tpl_vsl': 'VSL Page (Video)',
        'tpl_webinar': 'Webinar Reg.',
        'tpl_thankyou': 'Thank You / Upsell',
        'tpl_emails': 'Email Sequence',
        'tpl_comm_adv': 'Advertorial',
        'tpl_comm_sales': 'Sales Page',
        'tpl_comm_capture': 'Capture Page',
        'tpl_comm_vsl': 'VSL Page',
        'marketing_guide': 'Copywriting Guide',
        'documentation': 'Documentation',
        'technical': 'Technical',
        'tokens': 'Tokens (Guide)',
        'lovable_guide': 'Lovable Guide (AI)', 
        'ai_manual': 'AI Manual',
        'lang_select': 'Select Language',
        'theme_select': 'Select Color',
        'tpl_comm_feed': 'Spaces / Feed',
        'tpl_comm_events': 'Event Schedule',
        'tpl_comm_ranking': 'Hall of Fame',
        'tpl_comm_messages': 'Messages & AI'
    },
    es: {
        'design_system_root': 'Diseño del Sistema',
        'overview': 'Visión General',
        'lendaria_os': 'LendariaOS (Arquitetura)',
        'verbal_identity': 'Identidad Verbal',
        'identity': 'Identidad',
        'legendary_vs_mediocre': 'Legendario vs Mediocre',
        'interface': 'Interface',
        'colors': 'Colores y Temas',
        'typography': 'Tipografía',
        'spacing': 'Espaciado',
        'icons': 'Iconos',
        'lists': 'Listas',
        'motion': 'Movimiento',
        'graphs': 'Grafos (Redes)',
        'charts': 'Gráficos (KPIs)',
        'components': 'Componentes',
        'advanced': 'Interacciones Avançadas',
        'feedback': 'Feedback',
        'states': 'Estados y Carga',
        'cards': 'Tarjetas y Cajas',
        'forms': 'Formularios',
        'tables': 'Tablas',
        'templates_root': 'Plantillas',
        'course_creator': 'Creador de Cursos',
        'prd_studio': 'PRD Studio',
        'content_studio': 'Content Studio',
        'student_area': 'Área del Estudiante',
        'library_area': 'Biblioteca (Livros)', 
        'grp_books': 'Libros y Lectura',
        'grp_podcasts': 'Podcasts y Audio',
        'grp_community': 'Comunidad',
        'grp_admin': 'Administración',
        'tpl_lms_grid': 'Mis Cursos', 
        'tpl_lms_detail': 'Detalles del Curso', 
        'tpl_lms_student': 'Reproductor de Clases', 
        'tpl_lms_cert': 'Certificado Verificado',
        'tpl_lms_profile': 'Mi Perfil', 
        'tpl_lms_members': 'Legendarios', 
        'tpl_lms_library': 'Biblioteca',
        'tpl_lms_my_books': 'Mis Libros',
        'tpl_lms_authors': 'Autores',
        'tpl_lms_admin_library': 'Administrar Biblioteca',
        'tpl_lms_collection': 'Detalhes de Colección', 
        'tpl_lms_book_overview': 'Libro: Visión General', 
        'tpl_lms_book_overview_v2': 'Libro: Visión General (V2)',
        'tpl_lms_book_summary': 'Resumen (Audio)',
        'tpl_lms_book_read': 'Lectura (Texto)',
        'tpl_lms_book_read_v2': 'Lectura (Lujo 2.0)',
        'tpl_lms_book_highlights': 'Destaques del Libro',
        'tpl_lms_book_workbook': 'Workbook (Prática)',
        'tpl_lms_book_club': 'Club de Lectura',
        'tpl_lms_book_club_post': 'Club de Lectura (Post)',
        'tpl_lms_materials': 'Materiales', 
        'tpl_lms_tools': 'Herramientas',
        'tpl_lms_book_sales': 'Página de Ventas (Book)',
        'tpl_lms_podcast_explore': 'Explorar Podcasts',
        'tpl_lms_podcast_detail': 'Detalles del Podcast',
        'tpl_lms_podcast_read': 'Leer Resumen',
        'templates_app': 'SaaS / App',
        'tpl_app_mentes': 'Mentes Sintéticas',
        'tpl_app_clone_arena': 'Clone Arena', 
        'tpl_app_cells': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Projetos',
        'tpl_app_settings': 'Configuração / Perfil',
        'tpl_app_group_dashboard': 'Panel de Grupos',
        'tpl_app_login': 'Login (Standalone)',
        'tpl_batch_panel': 'Pipeline de Resúmenes (Batch)',
        'tpl_app_course_studio': 'Tablero',
        'tpl_app_course_detail': 'Detalles del Curso',
        'tpl_app_lesson_editor': 'Editor de Lecciones',
        'tpl_app_pipeline': 'Pipeline de Produção',
        'tpl_app_frameworks': 'Biblioteca de Frameworks',
        'tpl_app_personas': 'Gestor de Personas',
        'tpl_app_psychometric': 'Matriz Psicométrica',
        'tpl_app_psychometric_upload': 'Carga Psicométrica',
        'tpl_app_project_creator': 'Creador con IA', 
        'tpl_app_prd_arch': 'Arquitetura & Flujo',
        'tpl_app_prd_studio': 'Tablero',
        'tpl_app_prd_detail': 'Detalles del Projeto',
        'tpl_app_prd_upload': 'Nuevo Proyecto (Wizard)',
        'tpl_app_prd_analysis': 'Análisis (Wizard)',
        'tpl_app_prd_research': 'Investigación (Wizard)',
        'tpl_app_prd_brief': 'Generador de Brief (Wizard)',
        'tpl_app_prd_spec': 'Spec Wizard (PRD)',
        'tpl_app_prd_plan': 'Plan (Epics)',
        'tpl_app_prd_export': 'Exportar',
        'tpl_app_prd_story': 'Detalles de Historia',
        'tpl_app_content_studio': 'Tablero',
        'tpl_app_content_repurpose': 'Repurposing (Editor)',
        'marketing_kit': 'Marketing',
        'community_kit': 'Comunidade Legendária',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Página de Vendas',
        'tpl_ebook': 'Descargar Ebook',
        'tpl_vsl': 'Página VSL (Video)',
        'tpl_webinar': 'Registro Webinário',
        'tpl_thankyou': 'Gracias / Upsell',
        'tpl_emails': 'Secuencia de Correos',
        'tpl_comm_adv': 'Advertorial',
        'tpl_comm_sales': 'Página de Vendas',
        'tpl_comm_capture': 'Página de Captura',
        'tpl_comm_vsl': 'Página VSL',
        'marketing_guide': 'Guia de Copywriting',
        'documentation': 'Documentação',
        'technical': 'Técnica',
        'tokens': 'Tokens (Guía)',
        'lovable_guide': 'Guía Lovable (IA)', 
        'ai_manual': 'Manual IA',
        'lang_select': 'Seleccionar Idioma',
        'theme_select': 'Seleccionar Color',
        'tpl_comm_feed': 'Espacios / Feed',
        'tpl_comm_events': 'Agenda de Eventos',
        'tpl_comm_ranking': 'Hall de la Fama',
        'tpl_comm_messages': 'Mensajes & IA'
    }
  };

  const t = (key: string) => translations[currentLanguage][key] || key;

  // Hierarchical Navigation Structure
  const navStructure: NavItem[] = [
    {
        key: 'student_area',
        icon: 'play-circle',
        children: [
            { key: 'tpl_lms_grid', section: Section.TEMPLATE_LMS_GRID },
            { key: 'tpl_lms_profile', section: Section.TEMPLATE_LMS_PROFILE }, 
            { key: 'tpl_lms_members', section: Section.TEMPLATE_LMS_MEMBERS }, 
            { key: 'tpl_lms_detail', section: Section.TEMPLATE_LMS_DETAIL },
            { key: 'tpl_lms_student', section: Section.TEMPLATE_LMS_STUDENT },
            { key: 'tpl_lms_cert', section: Section.TEMPLATE_LMS_CERTIFICATE },
            { key: 'tpl_lms_materials', section: Section.TEMPLATE_LMS_MATERIALS }, 
            { key: 'tpl_lms_tools', section: Section.TEMPLATE_LMS_TOOLS }, 
        ]
    },
    {
        key: 'library_area',
        icon: 'book-open',
        children: [
            // Store / SaaS
            { key: 'tpl_lms_book_sales', section: Section.TEMPLATE_LMS_BOOK_SALES, icon: 'shopping-cart' },
            
            // Podcasts Group
            {
                key: 'grp_podcasts',
                icon: 'microphone',
                children: [
                    { key: 'tpl_lms_podcast_explore', section: Section.TEMPLATE_LMS_PODCAST_EXPLORE },
                    { key: 'tpl_lms_podcast_detail', section: Section.TEMPLATE_LMS_PODCAST_DETAIL },
                    { key: 'tpl_lms_podcast_read', section: Section.TEMPLATE_LMS_PODCAST_READ },
                ]
            },

            // Books Group
            {
                key: 'grp_books',
                icon: 'book',
                children: [
                    { key: 'tpl_lms_library', section: Section.TEMPLATE_LMS_LIBRARY },
                    { key: 'tpl_lms_my_books', section: Section.TEMPLATE_LMS_MY_BOOKS },
                    { key: 'tpl_lms_authors', section: Section.TEMPLATE_LMS_AUTHORS },
                    { key: 'tpl_lms_collection', section: Section.TEMPLATE_LMS_COLLECTION },
                    { key: 'tpl_lms_book_overview', section: Section.TEMPLATE_LMS_BOOK_OVERVIEW },
                    { key: 'tpl_lms_book_overview_v2', section: Section.TEMPLATE_LMS_BOOK_OVERVIEW_V2 },
                    { key: 'tpl_lms_book_summary', section: Section.TEMPLATE_LMS_BOOK_SUMMARY }, 
                    { key: 'tpl_lms_book_read', section: Section.TEMPLATE_LMS_BOOK_READ },
                    { key: 'tpl_lms_book_read_v2', section: Section.TEMPLATE_LMS_BOOK_READ_V2 },
                    { key: 'tpl_lms_book_highlights', section: Section.TEMPLATE_LMS_BOOK_HIGHLIGHTS },
                    { key: 'tpl_lms_book_workbook', section: Section.TEMPLATE_LMS_BOOK_WORKBOOK },
                ]
            },

            // Community Group
            {
                key: 'grp_community',
                icon: 'users-alt',
                children: [
                    { key: 'tpl_comm_feed', section: Section.TEMPLATE_COMMUNITY_FEED },
                    { key: 'tpl_comm_events', section: Section.TEMPLATE_COMMUNITY_EVENTS },
                    { key: 'tpl_comm_ranking', section: Section.TEMPLATE_COMMUNITY_RANKING },
                    { key: 'tpl_comm_messages', section: Section.TEMPLATE_COMMUNITY_MESSAGES },
                    { key: 'tpl_lms_book_club', section: Section.TEMPLATE_LMS_BOOK_CLUB },
                    { key: 'tpl_lms_book_club_post', section: Section.TEMPLATE_LMS_BOOK_CLUB_POST },
                ]
            },

            // Admin Group
            {
                key: 'grp_admin',
                icon: 'settings',
                children: [
                    { key: 'tpl_lms_admin_library', section: Section.TEMPLATE_LMS_ADMIN_LIBRARY },
                    { key: 'tpl_batch_panel', section: Section.TEMPLATE_BATCH_PANEL }, 
                ]
            }
        ]
    },
    {
        key: 'course_creator',
        icon: 'graduation-cap',
        children: [
            { key: 'tpl_app_project_creator', section: Section.TEMPLATE_APP_PROJECT_CREATOR }, 
            { key: 'tpl_app_course_studio', section: Section.TEMPLATE_APP_COURSE_STUDIO },
            { key: 'tpl_app_pipeline', section: Section.TEMPLATE_APP_PIPELINE }, 
            { key: 'tpl_app_frameworks', section: Section.TEMPLATE_APP_FRAMEWORKS }, 
            { key: 'tpl_app_personas', section: Section.TEMPLATE_APP_PERSONAS }, 
            { key: 'tpl_app_course_detail', section: Section.TEMPLATE_APP_COURSE_DETAIL }, 
            { key: 'tpl_app_lesson_editor', section: Section.TEMPLATE_APP_LESSON_EDITOR }, 
        ]
    },
    {
        key: 'prd_studio',
        icon: 'file-code',
        children: [
            { key: 'tpl_app_prd_arch', section: Section.TEMPLATE_APP_PRD_ARCH },
            { key: 'tpl_app_prd_studio', section: Section.TEMPLATE_APP_PRD_STUDIO },
            { key: 'tpl_app_prd_upload', section: Section.TEMPLATE_APP_PRD_UPLOAD },
            { key: 'tpl_app_prd_analysis', section: Section.TEMPLATE_APP_PRD_ANALYSIS },
            { key: 'tpl_app_prd_research', section: Section.TEMPLATE_APP_PRD_RESEARCH },
            { key: 'tpl_app_prd_brief', section: Section.TEMPLATE_APP_PRD_BRIEF },
            { key: 'tpl_app_prd_spec', section: Section.TEMPLATE_APP_PRD_SPEC },
            { key: 'tpl_app_prd_plan', section: Section.TEMPLATE_APP_PRD_PLAN },
            { key: 'tpl_app_prd_export', section: Section.TEMPLATE_APP_PRD_EXPORT },
            { key: 'tpl_app_prd_detail', section: Section.TEMPLATE_APP_PRD_PROJECT_DETAIL },
            { key: 'tpl_app_prd_story', section: Section.TEMPLATE_APP_PRD_STORY_DETAIL },
        ]
    },
    {
        key: 'content_studio',
        icon: 'pencil',
        children: [
            { key: 'tpl_app_content_studio', section: Section.TEMPLATE_APP_CONTENT_STUDIO },
            { key: 'tpl_app_content_repurpose', section: Section.TEMPLATE_APP_CONTENT_REPURPOSE },
        ]
    },
    {
        key: 'templates_app', 
        icon: 'browser', 
        children: [
            { key: 'tpl_app_login', section: Section.TEMPLATE_LOGIN },
            { key: 'tpl_app_group_dashboard', section: Section.TEMPLATE_APP_GROUP_DASHBOARD }, 
            { key: 'tpl_app_mentes', section: Section.TEMPLATE_APP_MENTES },
            { key: 'tpl_app_clone_arena', section: Section.TEMPLATE_APP_CLONE_ARENA },
            { key: 'tpl_app_psychometric', section: Section.TEMPLATE_APP_PSYCHOMETRIC },
            { key: 'tpl_app_psychometric_upload', section: Section.TEMPLATE_APP_PSYCHOMETRIC_UPLOAD },
            { key: 'tpl_app_cells', section: Section.TEMPLATE_APP_CMS },
            { key: 'tpl_app_kanban', section: Section.TEMPLATE_APP_KANBAN },
            { key: 'tpl_app_settings', section: Section.TEMPLATE_APP_SETTINGS },
        ]
    },
    {
        key: 'design_system_root',
        icon: 'layers',
        children: [
            { key: 'overview', icon: 'home', section: Section.CONCEPT },
            { key: 'lendaria_os', icon: 'network-cloud', section: Section.LENDARIA_OS },
            { 
                key: 'verbal_identity', 
                icon: 'fingerprint', 
                children: [
                    { key: 'identity', icon: 'fingerprint', section: Section.IDENTITY },
                    { key: 'legendary_vs_mediocre', icon: 'sword', section: Section.LEGENDARY_VS_MEDIOCRE },
                ]
            },
            { 
                key: 'interface', 
                icon: 'cube', 
                children: [
                    { key: 'colors', icon: 'palette', section: Section.COLORS },
                    { key: 'typography', icon: 'text', section: Section.TYPOGRAPHY },
                    { key: 'spacing', icon: 'apps', section: Section.SPACING },
                    { key: 'icons', icon: 'star', section: Section.ICONS },
                    { key: 'lists', icon: 'list-check', section: Section.LISTS },
                    { key: 'motion', icon: 'play', section: Section.MOTION },
                    { key: 'graphs', icon: 'network-cloud', section: Section.GRAPHS },
                    { key: 'charts', icon: 'chart-histogram', section: Section.CHARTS },
                    { key: 'components', icon: 'cube', section: Section.COMPONENTS },
                    { key: 'advanced', icon: 'cursor', section: Section.ADVANCED },
                    { key: 'feedback', icon: 'comment-alt-middle', section: Section.FEEDBACK },
                    { key: 'states', icon: 'spinner', section: Section.STATES },
                    { key: 'cards', icon: 'layout-fluid', section: Section.CARDS },
                    { key: 'forms', icon: 'file-edit', section: Section.FORMS },
                    { key: 'tables', icon: 'table', section: Section.TABLES },
                ]
            },
            {
                key: 'marketing_kit', 
                icon: 'megaphone',
                children: [
                    { key: 'marketing_guide', section: Section.MARKETING_GUIDE },
                    { key: 'tpl_landing', section: Section.TEMPLATE_LANDING },
                    { key: 'tpl_advertorial', section: Section.TEMPLATE_ADVERTORIAL },
                    { key: 'tpl_sales', section: Section.TEMPLATE_SALES },
                    { key: 'tpl_ebook', section: Section.TEMPLATE_EBOOK },
                    { key: 'tpl_vsl', section: Section.TEMPLATE_VSL },
                    { key: 'tpl_webinar', section: Section.TEMPLATE_WEBINAR },
                    { key: 'tpl_thankyou', section: Section.TEMPLATE_THANKYOU },
                ]
            },
            {
                key: 'community_kit', 
                icon: 'users-alt',
                children: [
                    { key: 'tpl_comm_capture', section: Section.TEMPLATE_COMMUNITY_CAPTURE },
                    { key: 'tpl_comm_adv', section: Section.TEMPLATE_COMMUNITY_ADVERTORIAL },
                    { key: 'tpl_comm_sales', section: Section.TEMPLATE_COMMUNITY_SALES },
                    { key: 'tpl_comm_vsl', section: Section.TEMPLATE_COMMUNITY_VSL },
                    { key: 'tpl_emails', section: Section.TEMPLATE_COMMUNITY_EMAILS },
                ]
            },
            { 
                key: 'documentation', 
                icon: 'book-alt', 
                children: [
                    { key: 'tokens', icon: 'palette', section: Section.TOKENS },
                    { key: 'lovable_guide', icon: 'magic-wand', section: Section.LOVABLE_GUIDE }, 
                    { key: 'technical', icon: 'file-code', section: Section.DOCS },
                    { key: 'ai_manual', icon: 'sparkles', section: Section.AI_MANUAL },
                ]
            },
        ]
    }
  ];

  const handleMenuClick = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.key);
    const isActive = item.section === currentSection;

    return (
      <div key={item.key} className="space-y-1">
        <button
          onClick={() => {
            if (hasChildren) {
              handleMenuClick(item.key);
            } else if (item.section) {
              setSection(item.section);
              closeMobileMenu();
            }
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left",
            depth > 0 ? "ml-4 text-xs" : "text-sm",
            isActive 
              ? "bg-primary/10 text-primary font-bold border border-primary/20" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            isCollapsed && depth === 0 && "justify-center px-0"
          )}
        >
          {item.icon && <Icon name={item.icon} size={depth > 0 ? "size-3" : "size-4"} className={cn(isActive && "text-primary")} />}
          {(!isCollapsed || depth > 0) && (
            <>
              <span className="flex-1 truncate">{t(item.key)}</span>
              {hasChildren && (
                <Icon 
                  name="angle-small-down" 
                  size="size-3" 
                  className={cn("transition-transform duration-200", isExpanded && "rotate-180")} 
                />
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && (!isCollapsed || depth > 0) && (
          <div className="space-y-1">
            {item.children?.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      <aside 
        className={cn(
          "fixed md:relative top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-50 flex flex-col",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header / Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border shrink-0">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setSection(Section.CONCEPT); closeMobileMenu(); }}>
            <Symbol name="infinity" className="text-primary text-2xl group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="font-black text-xs uppercase tracking-[0.3em] truncate text-foreground">Academia [IA]</span>}
          </div>
          <button onClick={toggleCollapse} className="hidden md:flex text-muted-foreground hover:text-foreground">
            <Icon name={isCollapsed ? "expand" : "compress"} size="size-4" />
          </button>
        </div>

        {/* Navigation Content */}
        <ScrollArea className="flex-1 px-3 py-6">
          <div className="space-y-4 pb-12">
            {navStructure.map(item => renderNavItem(item))}
          </div>
        </ScrollArea>

        {/* Footer / Controls */}
        <div className="p-4 border-t border-border bg-muted/20 space-y-4 shrink-0">
            {/* Theme & Language Selectors (Popovers if collapsed) */}
            <div className={cn("flex items-center justify-center gap-2", isCollapsed ? "flex-col" : "flex-row")}>
                 <Popover 
                    trigger={
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                            <span className="font-bold text-xs uppercase">{currentLanguage}</span>
                        </Button>
                    }
                    content={
                        <div className="p-1 space-y-1">
                            <p className="px-2 py-1 text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('lang_select')}</p>
                            <Separator className="mb-1" />
                            <button onClick={() => setLanguage('pt')} className={cn("w-full text-left px-3 py-2 rounded-md text-xs hover:bg-muted flex items-center justify-between", currentLanguage === 'pt' && "bg-primary/10 text-primary font-bold")}>
                                🇧🇷 Português {currentLanguage === 'pt' && <Icon name="check" size="size-3" />}
                            </button>
                            <button onClick={() => setLanguage('en')} className={cn("w-full text-left px-3 py-2 rounded-md text-xs hover:bg-muted flex items-center justify-between", currentLanguage === 'en' && "bg-primary/10 text-primary font-bold")}>
                                🇺🇸 English {currentLanguage === 'en' && <Icon name="check" size="size-3" />}
                            </button>
                            <button onClick={() => setLanguage('es')} className={cn("w-full text-left px-3 py-2 rounded-md text-xs hover:bg-muted flex items-center justify-between", currentLanguage === 'es' && "bg-primary/10 text-primary font-bold")}>
                                🇪🇸 Español {currentLanguage === 'es' && <Icon name="check" size="size-3" />}
                            </button>
                        </div>
                    }
                 />

                 <Popover 
                    trigger={
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: THEMES[currentThemeName].hex }}></div>
                        </Button>
                    }
                    content={
                        <ScrollArea className="max-h-64">
                            <div className="p-1 space-y-1">
                                <p className="px-2 py-1 text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('theme_select')}</p>
                                <Separator className="mb-1" />
                                {Object.entries(THEMES).map(([name, config]) => (
                                    <button 
                                        key={name}
                                        onClick={() => setThemeName(name as ThemeName)} 
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-md text-xs hover:bg-muted flex items-center gap-3",
                                            currentThemeName === name && "bg-primary/10 text-primary font-bold"
                                        )}
                                    >
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: config.hex }}></div>
                                        {config.label}
                                        {currentThemeName === name && <Icon name="check" size="size-2" className="ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    }
                 />

                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={toggleTheme}>
                    <Icon name={isDark ? "brightness" : "moon"} size="size-4" />
                </Button>
            </div>
            {!isCollapsed && (
                <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">
                    LEGENDARY v4.1
                </p>
            )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
