
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, Users, AlertCircle, Loader2 } from 'lucide-react';
import { Section } from '../../../types';
import { AuthorCard } from '../ui/AuthorCard';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

interface Author {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  short_bio: string | null;
  book_count: number;
}

interface AuthorsListTemplateProps {
  onNavigate?: (section: Section) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Sample Data
const SAMPLE_AUTHORS: Author[] = [
  { id: '1', slug: 'adam_grant', name: 'Adam Grant', avatar_url: null, short_bio: null, book_count: 3 },
  { id: '2', slug: 'cal_newport', name: 'Cal Newport', avatar_url: null, short_bio: null, book_count: 5 },
  { id: '3', slug: 'daniel_pink', name: 'Daniel Pink', avatar_url: null, short_bio: null, book_count: 2 },
  { id: '4', slug: 'james_clear', name: 'James Clear', avatar_url: null, short_bio: null, book_count: 4 },
  { id: '5', slug: 'malcolm_gladwell', name: 'Malcolm Gladwell', avatar_url: null, short_bio: null, book_count: 6 },
  { id: '6', slug: 'naval_ravikant', name: 'Naval Ravikant', avatar_url: null, short_bio: null, book_count: 1 },
  { id: '7', slug: 'paulo_coelho', name: 'Paulo Coelho', avatar_url: null, short_bio: null, book_count: 8 },
  { id: '8', slug: 'ryan_holiday', name: 'Ryan Holiday', avatar_url: null, short_bio: null, book_count: 4 },
  { id: '9', slug: 'robert_greene', name: 'Robert Greene', avatar_url: null, short_bio: null, book_count: 12 },
  { id: '10', slug: 'tim_ferriss', name: 'Tim Ferriss', avatar_url: null, short_bio: null, book_count: 7 },
  { id: '11', slug: 'yuval_harari', name: 'Yuval Noah Harari', avatar_url: null, short_bio: null, book_count: 5 },
  { id: '12', slug: 'bren_brown', name: 'Brené Brown', avatar_url: null, short_bio: null, book_count: 3 },
];

export const AuthorsListTemplate: React.FC<AuthorsListTemplateProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAuthors = useMemo(() => {
    return SAMPLE_AUTHORS.filter(author => 
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  const authorsByLetter = useMemo(() => {
    const groups: Record<string, Author[]> = {};
    filteredAuthors.forEach(author => {
      const firstLetter = author.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(author);
    });
    return groups;
  }, [filteredAuthors]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuthorClick = (slug: string) => {
    // In a real app with slug routes, we'd navigate to /books/slug
    // Here we use the section system
    console.log(`Navigating to author: ${slug}`);
    if (onNavigate) onNavigate(Section.TEMPLATE_LMS_LIBRARY);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-serif font-bold">Erro ao carregar autores</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in font-sans">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground -ml-4"
            onClick={() => onNavigate && onNavigate(Section.TEMPLATE_LMS_LIBRARY)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar autores..." 
              className="pl-10 rounded-full bg-muted/30 border-border focus:border-brand-gold/50 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="flex justify-between items-end border-b border-border pb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight uppercase">Autores</h1>
            <p className="text-muted-foreground mt-1">Descubra os pensadores por trás dos resumos</p>
          </div>
          {!isLoading && (
            <span className="text-sm text-muted-foreground font-mono">
              {filteredAuthors.length} {filteredAuthors.length === 1 ? 'autor' : 'autores'}
            </span>
          )}
        </div>

        {/* Alphabet Filter Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 sticky top-0 bg-background/80 backdrop-blur-md z-30 -mx-6 px-6">
          {ALPHABET.map((letter) => {
            const hasAuthors = !!authorsByLetter[letter];
            return (
              <button
                key={letter}
                disabled={!hasAuthors && !isLoading}
                onClick={() => scrollToLetter(letter)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm min-w-[32px] transition-all",
                  hasAuthors 
                    ? "text-foreground hover:bg-muted font-medium" 
                    : "text-muted-foreground/30 cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                )}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 p-4 border border-border rounded-xl animate-pulse">
                <div className="w-20 h-20 rounded-full bg-muted" />
                <div className="w-24 h-3 bg-muted rounded" />
                <div className="w-16 h-2 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : filteredAuthors.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4">
            <Users className="w-16 h-16 text-muted-foreground/30" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif">
                {searchTerm ? `Nenhum autor corresponde a '${searchTerm}'` : "Nenhum autor encontrado"}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Tente buscar por outro nome" : "Os autores aparecerão aqui quando houver livros na biblioteca"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {ALPHABET.map(letter => {
              const letterAuthors = authorsByLetter[letter];
              if (!letterAuthors) return null;

              return (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-24 space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-serif font-bold text-brand-gold">{letter}</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {letterAuthors.map(author => (
                      <AuthorCard 
                        key={author.id} 
                        author={author} 
                        onClick={handleAuthorClick}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
