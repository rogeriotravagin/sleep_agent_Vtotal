
import React from 'react';
import { cn } from '../../../lib/utils';

interface Author {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  book_count: number;
}

interface AuthorCardProps {
  author: Author;
  onClick: (slug: string) => void;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, onClick }) => {
  // Generate a consistent gradient based on the author's name hash
  const getGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${h1}, 70%, 60%), hsl(${h2}, 80%, 40%))`;
  };

  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      onClick={() => onClick(author.slug)}
      className="group flex flex-col items-center text-center p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-brand-gold/30 hover:scale-[1.02] transition-all duration-300 shadow-sm"
      role="button"
      tabIndex={0}
      aria-label={`Ver livros de ${author.name}`}
    >
      {/* Avatar Container */}
      <div className="relative w-20 h-20 rounded-full ring-2 ring-border overflow-hidden flex items-center justify-center transition-all group-hover:ring-brand-gold/50">
        {author.avatar_url ? (
          <img
            src={author.avatar_url}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xl font-bold text-white"
            style={{ background: getGradient(author.name) }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="mt-3 text-sm font-serif font-bold text-foreground line-clamp-2 leading-snug transition-colors group-hover:text-brand-gold">
        {author.name}
      </h4>

      {/* Book Count */}
      <p className="mt-1 text-xs text-muted-foreground font-sans">
        {author.book_count} {author.book_count === 1 ? 'livro' : 'livros'}
      </p>
    </div>
  );
};
