
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Section, Language } from './types';
import { ThemeName, THEMES } from './lib/theme';
import { Toaster } from './components/ui/toaster';
import { Icon } from './components/ui/icon';

// --- IMPORT SECTIONS ---
import IdentitySection from './components/IdentitySection';
import LegendaryVsMediocreSection from './components/LegendaryVsMediocreSection';
import ColorSection from './components/ColorSection';
import TypographySection from './components/TypographySection';
import SpacingSection from './components/SpacingSection';
import IconSection from './components/IconSection';
import ListSection from './components/ListSection';
import GraphSection from './components/GraphSection';
import MotionSection from './components/MotionSection';
import ComponentSection from './components/ComponentSection';
import AdvancedUISection from './components/AdvancedUISection';
import FeedbackSection from './components/FeedbackSection';
import StatesSection from './components/StatesSection';
import CardsSection from './components/CardsSection';
import FormSection from './components/FormSection';
import TableSection from './components/TableSection';
import ChartsSection from './components/ChartsSection';
import DocsSection from './components/DocsSection';
import TokensSection from './components/TokensSection';
import LovableGuideSection from './components/LovableGuideSection';
import AiManualSection from './components/AiManualSection';

// --- IMPORT TEMPLATES ---
import LandingPageTemplate from './components/templates/LandingPageTemplate';
import AdvertorialTemplate from './components/templates/AdvertorialTemplate';
import SalesPageTemplate from './components/templates/SalesPageTemplate';
import EbookTemplate from './components/templates/EbookTemplate';
import VSLTemplate from './components/templates/VSLTemplate';
import WebinarTemplate from './components/templates/WebinarTemplate';
import ThankYouTemplate from './components/templates/ThankYouTemplate';
import MarketingTemplatesPage from './components/templates/MarketingTemplatesPage';
import CommunityTemplatesPage from './components/templates/CommunityTemplatesPage';
import CommunityAdvertorialTemplate from './components/templates/CommunityAdvertorialTemplate';
import CommunitySalesTemplate from './components/templates/CommunitySalesTemplate';
import CommunityCaptureTemplate from './components/templates/CommunityCaptureTemplate';
import CommunityVSLTemplate from './components/templates/CommunityVSLTemplate';
import CmsTemplate from './components/templates/CmsTemplate';
import KanbanTemplate from './components/templates/KanbanTemplate';
import SaasSettingsTemplate from './components/templates/SaasSettingsTemplate';
import LendariaOsPage from './components/templates/LendariaOsPage';
import CourseStudioTemplate from './components/templates/CourseStudioTemplate';
import CourseDetailTemplate from './components/templates/CourseDetailTemplate';
import ProductionPipelineTemplate from './components/templates/ProductionPipelineTemplate';
import LessonEditorTemplate from './components/templates/LessonEditorTemplate';
import NewCourseTemplate from './components/templates/NewCourseTemplate';
import PsychometricAnalysisTemplate from './components/templates/PsychometricAnalysisTemplate';
import PsychometricUploadTemplate from './components/templates/PsychometricUploadTemplate';
import PrdStudioTemplate from './components/templates/PrdStudioTemplate';
import PrdProjectDetailTemplate from './components/templates/PrdProjectDetailTemplate';
import PrdStoryDetailTemplate from './components/templates/PrdStoryDetailTemplate';
import PrdUploadTemplate from './components/templates/PrdUploadTemplate';
import PrdAnalysisTemplate from './components/templates/PrdAnalysisTemplate';
import PrdResearchTemplate from './components/templates/PrdResearchTemplate';
import PrdProjectBriefTemplate from './components/templates/PrdBriefTemplate';
import PrdSpecTemplate from './components/templates/PrdSpecTemplate';
import PrdPlanTemplate from './components/templates/PrdPlanTemplate';
import PrdExportTemplate from './components/templates/PrdExportTemplate';
import ContentStudioTemplate from './components/templates/ContentStudioTemplate';
import ContentRepurposeTemplate from './components/templates/ContentRepurposeTemplate';
import LmsStudentTemplate from './components/templates/LmsStudentTemplate';
import LmsCourseGridTemplate from './components/templates/LmsCourseGridTemplate';
import LmsCourseDetailTemplate from './components/templates/LmsCourseDetailTemplate';
import LmsCertificateTemplate from './components/templates/LmsCertificateTemplate';
import LmsMaterialsTemplate from './components/templates/LmsMaterialsTemplate';
import LmsToolsTemplate from './components/templates/LmsToolsTemplate';
import LmsBookClubTemplate from './components/templates/LmsBookClubTemplate';
import LmsBookClubPostTemplate from './components/templates/LmsBookClubPostTemplate';
import LmsStudentProfileTemplate from './components/templates/LmsStudentProfileTemplate';
import LmsLibraryAdminTemplate from './components/templates/LmsLibraryAdminTemplate'; 
import LmsAuthorsTemplate from './components/templates/LmsAuthorsTemplate';
import MentesSinteticasTemplate from './components/templates/MentesSinteticasTemplate';
import FrameworksTemplate from './components/templates/FrameworksTemplate';
import PersonasTemplate from './components/templates/PersonasTemplate';
import GroupDashboardTemplate from './components/templates/GroupDashboardTemplate';
import ProjectCreatorTemplate from './components/templates/ProjectCreatorTemplate';
import PrdArchitectureTemplate from './components/templates/PrdArchitectureTemplate';
import { BatchProgressPanel } from './components/books/BatchProgressPanel';
import LmsBookHighlightsTemplate from './components/templates/LmsBookHighlightsTemplate';
import StandaloneLoginTemplate from './components/templates/StandaloneLoginTemplate';
import BookSalesPageTemplate from './components/templates/BookSalesPageTemplate';
import LmsPodcastExploreTemplate from './components/templates/LmsPodcastExploreTemplate';
import LmsPodcastDetailTemplate from './components/templates/LmsPodcastDetailTemplate';
import LmsPodcastReadTemplate from './components/templates/LmsPodcastReadTemplate';
import CommunityFeedTemplate from './components/templates/CommunityFeedTemplate';
import CommunityEventsTemplate from './components/templates/CommunityEventsTemplate';
import CommunityRankingTemplate from './components/templates/CommunityRankingTemplate';
import CommunityMessagesTemplate from './components/templates/CommunityMessagesTemplate';
import LmsMembersTemplate from './components/templates/LmsMembersTemplate';

// --- IMPORT BOOK MODULE TEMPLATES ---
import LibraryPage from './components/books/LibraryPage';
import MyBooksPage from './components/books/MyBooksPage';
import CollectionPage from './components/books/CollectionPage';
import OverviewPage from './components/books/OverviewPage';
import OverviewPageV2 from './components/books/OverviewPageV2';
import SummaryPage from './components/books/SummaryPage';
import ReaderPage from './components/books/ReaderPage';
import ReaderPageV2 from './components/books/ReaderPageV2';
import WorkbookPage from './components/books/WorkbookPage';


const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.CONCEPT);
  const [isDark, setIsDark] = useState(true); // Default Dark Mode
  const [themeName, setThemeName] = useState<ThemeName>('Gold');
  const [language, setLanguage] = useState<Language>('pt');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply Theme & Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Dark Mode Class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS Variables from Theme
    const theme = THEMES[themeName];
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-light', theme.light);
    root.style.setProperty('--primary-foreground', theme.foreground);
    root.style.setProperty('--ring', theme.primary);
    
  }, [isDark, themeName]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Mapping for Header Title
  const sectionHierarchy: Partial<Record<Section, { category: string; label: string }>> = {
      [Section.CONCEPT]: { category: 'Design System', label: 'Visão Geral' },
      [Section.LENDARIA_OS]: { category: 'Design System', label: 'LendariaOS' },
      [Section.IDENTITY]: { category: 'Verbal Identity', label: 'Identidade' },
      [Section.LEGENDARY_VS_MEDIOCRE]: { category: 'Verbal Identity', label: 'Lendário vs Medíocre' },
      [Section.COLORS]: { category: 'Interface', label: 'Cores & Temas' },
      [Section.TYPOGRAPHY]: { category: 'Interface', label: 'Tipografia' },
      [Section.SPACING]: { category: 'Interface', label: 'Espaçamentos' },
      [Section.ICONS]: { category: 'Interface', label: 'Ícones' },
      [Section.LISTS]: { category: 'Interface', label: 'Listas' },
      [Section.MOTION]: { category: 'Interface', label: 'Motion' },
      [Section.GRAPHS]: { category: 'Interface', label: 'Grafos' },
      [Section.CHARTS]: { category: 'Interface', label: 'Charts' },
      [Section.COMPONENTS]: { category: 'Interface', label: 'Componentes' },
      [Section.ADVANCED]: { category: 'Interface', label: 'Interações Avançadas' },
      [Section.FEEDBACK]: { category: 'Interface', label: 'Feedback' },
      [Section.STATES]: { category: 'Interface', label: 'Estados' },
      [Section.CARDS]: { category: 'Interface', label: 'Cards' },
      [Section.FORMS]: { category: 'Interface', label: 'Formulários' },
      [Section.TABLES]: { category: 'Interface', label: 'Tabelas' },
      [Section.TEMPLATES]: { category: 'Templates', label: 'App Templates' },
      
      // Templates
      [Section.TEMPLATE_LANDING]: { category: 'Templates', label: 'Landing Page' },
      [Section.TEMPLATE_ADVERTORIAL]: { category: 'Templates', label: 'Advertorial' },
      [Section.TEMPLATE_SALES]: { category: 'Templates', label: 'Sales Page' },
      [Section.TEMPLATE_EBOOK]: { category: 'Templates', label: 'Ebook Page' },
      [Section.TEMPLATE_VSL]: { category: 'Templates', label: 'VSL Page' },
      [Section.TEMPLATE_WEBINAR]: { category: 'Templates', label: 'Webinar Reg.', },
      [Section.TEMPLATE_THANKYOU]: { category: 'Templates', label: 'Thank You' },
      [Section.MARKETING_GUIDE]: { category: 'Marketing', label: 'Guia de Copywriting' },
      
      // Community
      [Section.TEMPLATE_COMMUNITY_CAPTURE]: { category: 'Community', label: 'Página de Captura' },
      [Section.TEMPLATE_COMMUNITY_ADVERTORIAL]: { category: 'Community', label: 'Advertorial' },
      [Section.TEMPLATE_COMMUNITY_SALES]: { category: 'Community', label: 'Página de Vendas' },
      [Section.TEMPLATE_COMMUNITY_VSL]: { category: 'Community', label: 'VSL Page' },
      [Section.TEMPLATE_COMMUNITY_EMAILS]: { category: 'Community', label: 'Sequência de Emails' },
      [Section.TEMPLATE_COMMUNITY_FEED]: { category: 'Community', label: 'Espaços' },
      [Section.TEMPLATE_COMMUNITY_EVENTS]: { category: 'Community', label: 'Eventos' },
      [Section.TEMPLATE_COMMUNITY_RANKING]: { category: 'Community', label: 'Hall da Fama' },
      [Section.TEMPLATE_COMMUNITY_MESSAGES]: { category: 'Community', label: 'Mensagens & IA' },

      // App Templates
      [Section.TEMPLATE_APP_CMS]: { category: 'App', label: 'CMS Dashboard' },
      [Section.TEMPLATE_APP_KANBAN]: { category: 'App', label: 'Kanban Board' },
      [Section.TEMPLATE_APP_SETTINGS]: { category: 'App', label: 'Settings' },
      [Section.TEMPLATE_APP_MENTES]: { category: 'App', label: 'Mentes Sintéticas' },
      [Section.TEMPLATE_APP_CLONE_ARENA]: { category: 'App', label: 'Clone Arena' },
      [Section.TEMPLATE_APP_GROUP_DASHBOARD]: { category: 'App', label: 'Dashboard de Grupos' },
      [Section.TEMPLATE_LOGIN]: { category: 'App', label: 'Login' },
      
      // Course Creator
      [Section.TEMPLATE_APP_COURSE_STUDIO]: { category: 'Course Creator', label: 'Dashboard' },
      [Section.TEMPLATE_APP_COURSE_DETAIL]: { category: 'Course Creator', label: 'Detalhes do Curso' },
      [Section.TEMPLATE_APP_NEW_COURSE]: { category: 'Course Creator', label: 'Novo Curso' },
      [Section.TEMPLATE_APP_PROJECT_CREATOR]: { category: 'Course Creator', label: 'Criador com IA' },
      [Section.TEMPLATE_APP_LESSON_EDITOR]: { category: 'Course Creator', label: 'Editor de Aulas' },
      [Section.TEMPLATE_APP_PIPELINE]: { category: 'Course Creator', label: 'Pipeline' },
      [Section.TEMPLATE_APP_FRAMEWORKS]: { category: 'Course Creator', label: 'Frameworks' },
      [Section.TEMPLATE_APP_PERSONAS]: { category: 'Course Creator', label: 'Personas' },
      [Section.TEMPLATE_APP_PSYCHOMETRIC]: { category: 'Course Creator', label: 'Psicometria' },
      [Section.TEMPLATE_APP_PSYCHOMETRIC_UPLOAD]: { category: 'Course Creator', label: 'Upload Psicometria' },
      
      // PRD Studio
      [Section.TEMPLATE_APP_PRD_ARCH]: { category: 'PRD Studio', label: 'Arquitetura' },
      [Section.TEMPLATE_APP_PRD_STUDIO]: { category: 'PRD Studio', label: 'Dashboard' },
      [Section.TEMPLATE_APP_PRD_PROJECT_DETAIL]: { category: 'PRD Studio', label: 'Detalhes do Projeto' },
      [Section.TEMPLATE_APP_PRD_STORY_DETAIL]: { category: 'PRD Studio', label: 'Detalhes da Story' },
      [Section.TEMPLATE_APP_PRD_UPLOAD]: { category: 'PRD Studio', label: 'Upload' },
      [Section.TEMPLATE_APP_PRD_ANALYSIS]: { category: 'PRD Studio', label: 'Análise' },
      [Section.TEMPLATE_APP_PRD_RESEARCH]: { category: 'PRD Studio', label: 'Pesquisa' },
      [Section.TEMPLATE_APP_PRD_BRIEF]: { category: 'PRD Studio', label: 'Brief' },
      [Section.TEMPLATE_APP_PRD_SPEC]: { category: 'PRD Studio', label: 'Especificação' },
      [Section.TEMPLATE_APP_PRD_PLAN]: { category: 'PRD Studio', label: 'Plano' },
      [Section.TEMPLATE_APP_PRD_EXPORT]: { category: 'PRD Studio', label: 'Export' },
      
      // Content Studio
      [Section.TEMPLATE_APP_CONTENT_STUDIO]: { category: 'Content Studio', label: 'Dashboard' },
      [Section.TEMPLATE_APP_CONTENT_REPURPOSE]: { category: 'Content Studio', label: 'Repurpose' },
      
      // Student Area (LMS & Books)
      [Section.TEMPLATE_LMS_GRID]: { category: 'Student Area', label: 'Meus Cursos' }, 
      [Section.TEMPLATE_LMS_DETAIL]: { category: 'Student Area', label: 'Detalhes do Curso' }, 
      [Section.TEMPLATE_LMS_STUDENT]: { category: 'Student Area', label: 'Player de Aula' }, 
      [Section.TEMPLATE_LMS_CERTIFICATE]: { category: 'Student Area', label: 'Certificado Verificado' },
      [Section.TEMPLATE_LMS_PROFILE]: { category: 'Student Area', label: 'Meu Perfil' }, 
      [Section.TEMPLATE_LMS_MEMBERS]: { category: 'Student Area', label: 'Lendários' }, 
      [Section.TEMPLATE_LMS_LIBRARY]: { category: 'Student Area', label: 'Biblioteca' },
      [Section.TEMPLATE_LMS_MY_BOOKS]: { category: 'Student Area', label: 'Meus Livros' },
      [Section.TEMPLATE_LMS_AUTHORS]: { category: 'Student Area', label: 'Autores' },
      [Section.TEMPLATE_LMS_ADMIN_LIBRARY]: { category: 'Student Area', label: 'Gestão de Acervo' },
      [Section.TEMPLATE_LMS_COLLECTION]: { category: 'Student Area', label: 'Coleção' },
      [Section.TEMPLATE_LMS_BOOK_OVERVIEW]: { category: 'Student Area', label: 'Livro: Visão Geral' },
      [Section.TEMPLATE_LMS_BOOK_OVERVIEW_V2]: { category: 'Student Area', label: 'Livro: Visão Geral (Luxo 2.0)' },
      [Section.TEMPLATE_LMS_BOOK_SUMMARY]: { category: 'Student Area', label: 'Leitor de Livro' },
      [Section.TEMPLATE_LMS_BOOK_READ]: { category: 'Student Area', label: 'Leitura (Texto)' },
      [Section.TEMPLATE_LMS_BOOK_READ_V2]: { category: 'Student Area', label: 'Leitura (Luxo 2.0)' },
      [Section.TEMPLATE_LMS_BOOK_HIGHLIGHTS]: { category: 'Student Area', label: 'Destaques do Livro' },
      [Section.TEMPLATE_LMS_BOOK_WORKBOOK]: { category: 'Student Area', label: 'Workbook (Prática)' }, 
      [Section.TEMPLATE_LMS_BOOK_CLUB]: { category: 'Student Area', label: 'Clube do Livro' },
      [Section.TEMPLATE_LMS_BOOK_CLUB_POST]: { category: 'Student Area', label: 'Clube do Livro (Post)' },
      [Section.TEMPLATE_LMS_MATERIALS]: { category: 'Student Area', label: 'Materiais' }, 
      [Section.TEMPLATE_LMS_TOOLS]: { category: 'Student Area', label: 'Ferramentas' }, 
      [Section.TEMPLATE_BATCH_PANEL]: { category: 'Student Area', label: 'Pipeline (Batch)' },
      [Section.TEMPLATE_LMS_BOOK_SALES]: { category: 'Student Area', label: 'Vendas de Livros' },
      [Section.TEMPLATE_LMS_PODCAST_EXPLORE]: { category: 'Student Area', label: 'Podcasts' },
      [Section.TEMPLATE_LMS_PODCAST_DETAIL]: { category: 'Student Area', label: 'Podcast' },
      [Section.TEMPLATE_LMS_PODCAST_READ]: { category: 'Student Area', label: 'Podcast Leitura' },
      
      // Docs
      [Section.DOCS]: { category: 'Docs', label: 'Técnica' },
      [Section.TOKENS]: { category: 'Docs', label: 'Tokens' },
      [Section.LOVABLE_GUIDE]: { category: 'Docs', label: 'Guia Lovable' },
      [Section.AI_MANUAL]: { category: 'Docs', label: 'Manual IA' },
  };

  const renderContent = () => {
    switch (currentSection) {
      case Section.CONCEPT: return <IdentitySection />; 
      case Section.LENDARIA_OS: return <LendariaOsPage />;
      case Section.IDENTITY: return <IdentitySection />; 
      case Section.LEGENDARY_VS_MEDIOCRE: return <LegendaryVsMediocreSection />;
      case Section.COLORS: return <ColorSection isDark={isDark} currentTheme={themeName} />;
      case Section.TYPOGRAPHY: return <TypographySection />;
      case Section.SPACING: return <SpacingSection />;
      case Section.ICONS: return <IconSection />;
      case Section.LISTS: return <ListSection />;
      case Section.GRAPHS: return <GraphSection />;
      case Section.CHARTS: return <ChartsSection />;
      case Section.MOTION: return <MotionSection />;
      case Section.COMPONENTS: return <ComponentSection />;
      case Section.ADVANCED: return <AdvancedUISection />;
      case Section.FEEDBACK: return <FeedbackSection />;
      case Section.STATES: return <StatesSection />;
      case Section.CARDS: return <CardsSection />;
      case Section.FORMS: return <FormSection />;
      case Section.TABLES: return <TableSection />;
      
      // Docs
      case Section.DOCS: return <DocsSection />;
      case Section.TOKENS: return <TokensSection />;
      case Section.LOVABLE_GUIDE: return <LovableGuideSection />;
      case Section.AI_MANUAL: return <AiManualSection />;

      // Templates Marketing
      case Section.MARKETING_GUIDE: return <MarketingTemplatesPage />;
      case Section.TEMPLATE_LANDING: return <LandingPageTemplate />;
      case Section.TEMPLATE_ADVERTORIAL: return <AdvertorialTemplate />;
      case Section.TEMPLATE_SALES: return <SalesPageTemplate />;
      case Section.TEMPLATE_EBOOK: return <EbookTemplate />;
      case Section.TEMPLATE_VSL: return <VSLTemplate />;
      case Section.TEMPLATE_WEBINAR: return <WebinarTemplate />;
      case Section.TEMPLATE_THANKYOU: return <ThankYouTemplate />;
      
      // Community
      case Section.TEMPLATE_COMMUNITY_CAPTURE: return <CommunityCaptureTemplate />;
      case Section.TEMPLATE_COMMUNITY_ADVERTORIAL: return <CommunityAdvertorialTemplate />;
      case Section.TEMPLATE_COMMUNITY_SALES: return <CommunitySalesTemplate />;
      case Section.TEMPLATE_COMMUNITY_VSL: return <CommunityVSLTemplate />;
      case Section.TEMPLATE_COMMUNITY_EMAILS: return <CommunityTemplatesPage />; 
      case Section.TEMPLATE_COMMUNITY_FEED: return <CommunityFeedTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_COMMUNITY_EVENTS: return <CommunityEventsTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_COMMUNITY_RANKING: return <CommunityRankingTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_COMMUNITY_MESSAGES: return <CommunityMessagesTemplate onNavigate={setCurrentSection} />;

      // App Templates
      case Section.TEMPLATE_APP_CMS: return <CmsTemplate />;
      case Section.TEMPLATE_APP_KANBAN: return <KanbanTemplate />;
      case Section.TEMPLATE_APP_SETTINGS: return <SaasSettingsTemplate />;
      case Section.TEMPLATE_APP_MENTES: return <MentesSinteticasTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_APP_CLONE_ARENA: return <MentesSinteticasTemplate onNavigate={setCurrentSection} initialTab="arena" />;
      case Section.TEMPLATE_APP_GROUP_DASHBOARD: return <GroupDashboardTemplate />;
      case Section.TEMPLATE_LOGIN: return <StandaloneLoginTemplate onNavigate={setCurrentSection} />;
      
      // Course Creator
      case Section.TEMPLATE_APP_COURSE_STUDIO: return <CourseStudioTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_COURSE_DETAIL: return <CourseDetailTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_NEW_COURSE: return <NewCourseTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PROJECT_CREATOR: return <ProjectCreatorTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_LESSON_EDITOR: return <LessonEditorTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PIPELINE: return <ProductionPipelineTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_FRAMEWORKS: return <FrameworksTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PERSONAS: return <PersonasTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PSYCHOMETRIC: return <PsychometricAnalysisTemplate />;
      case Section.TEMPLATE_APP_PSYCHOMETRIC_UPLOAD: return <PsychometricUploadTemplate />;

      // PRD Studio
      case Section.TEMPLATE_APP_PRD_ARCH: return <PrdArchitectureTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_STUDIO: return <PrdStudioTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_PROJECT_DETAIL: return <PrdProjectDetailTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_STORY_DETAIL: return <PrdStoryDetailTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_UPLOAD: return <PrdUploadTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_ANALYSIS: return <PrdAnalysisTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_RESEARCH: return <PrdResearchTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_BRIEF: return <PrdProjectBriefTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_SPEC: return <PrdSpecTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_PLAN: return <PrdPlanTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_PRD_EXPORT: return <PrdExportTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;

      // Content Studio
      case Section.TEMPLATE_APP_CONTENT_STUDIO: return <ContentStudioTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;
      case Section.TEMPLATE_APP_CONTENT_REPURPOSE: return <ContentRepurposeTemplate onNavigate={setCurrentSection} currentSection={currentSection} />;

      // LMS / Books
      case Section.TEMPLATE_LMS_GRID: return <LmsCourseGridTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_DETAIL: return <LmsCourseDetailTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_STUDENT: return <LmsStudentTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_CERTIFICATE: return <LmsCertificateTemplate />;
      case Section.TEMPLATE_LMS_PROFILE: return <LmsStudentProfileTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_MEMBERS: return <LmsMembersTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_LIBRARY: return <LibraryPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_MY_BOOKS: return <MyBooksPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_AUTHORS: return <LmsAuthorsTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_ADMIN_LIBRARY: return <LmsLibraryAdminTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_COLLECTION: return <CollectionPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_OVERVIEW: return <OverviewPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_OVERVIEW_V2: return <OverviewPageV2 onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_SUMMARY: return <SummaryPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_READ: return <ReaderPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_READ_V2: return <ReaderPageV2 onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_HIGHLIGHTS: return <LmsBookHighlightsTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_WORKBOOK: return <WorkbookPage onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_CLUB: return <LmsBookClubTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_BOOK_CLUB_POST: return <LmsBookClubPostTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_MATERIALS: return <LmsMaterialsTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_TOOLS: return <LmsToolsTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_BATCH_PANEL: return <BatchProgressPanel />;
      case Section.TEMPLATE_LMS_BOOK_SALES: return <BookSalesPageTemplate onNavigate={setCurrentSection} />;
      
      // Podcast
      case Section.TEMPLATE_LMS_PODCAST_EXPLORE: return <LmsPodcastExploreTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_PODCAST_DETAIL: return <LmsPodcastDetailTemplate onNavigate={setCurrentSection} />;
      case Section.TEMPLATE_LMS_PODCAST_READ: return <LmsPodcastReadTemplate onNavigate={setCurrentSection} />;
      
      case Section.TEMPLATES: return <div className="p-12 text-center text-muted-foreground">Selecione um template no menu lateral.</div>;

      default: return <div className="p-12 text-center text-muted-foreground">Seção em desenvolvimento.</div>;
    }
  };

  const currentInfo = sectionHierarchy[currentSection] || { category: 'Sistema', label: 'Academia Lendária' };

  // Determine if sidebar should be hidden
  const hideSidebar = currentSection === Section.TEMPLATE_LOGIN || currentSection === Section.TEMPLATE_LMS_BOOK_SALES || currentSection === Section.TEMPLATE_LMS_CERTIFICATE;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
        {!hideSidebar && (
            <Sidebar 
                currentSection={currentSection} 
                setSection={setCurrentSection}
                isDark={isDark}
                toggleTheme={toggleTheme}
                isCollapsed={sidebarCollapsed}
                toggleCollapse={toggleSidebar}
                currentThemeName={themeName}
                setThemeName={setThemeName}
                currentLanguage={language}
                setLanguage={setLanguage}
                isMobileOpen={mobileMenuOpen}
                closeMobileMenu={() => setMobileMenuOpen(false)}
            />
        )}

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            
            {/* Mobile Menu Trigger (Visible only on mobile) */}
            {!hideSidebar && (
                <div className="md:hidden p-4 border-b border-border flex items-center justify-between bg-card">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase">{currentInfo.category}</span>
                        <span className="text-sm font-bold">{currentInfo.label}</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Icon name="menu-burger" />
                    </button>
                </div>
            )}

            {renderContent()}
        </div>
        
        <Toaster />
    </div>
  );
};

export default App;
