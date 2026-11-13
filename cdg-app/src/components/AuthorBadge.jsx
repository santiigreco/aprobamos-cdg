import React from 'react';
import { Star } from 'lucide-react';

const AUTHOR_PRESETS = {
  MA: {
    color: '#34d399', // Emerald mint
    bg: 'rgba(16, 185, 129, 0.16)',
    border: 'rgba(52, 211, 153, 0.5)',
    glow: '0 0 12px rgba(16, 185, 129, 0.25)',
    starColor: '#fbbf24',
  },
  LC: {
    color: '#f472b6', // Radiant pink / rose
    bg: 'rgba(236, 72, 153, 0.16)',
    border: 'rgba(244, 114, 182, 0.5)',
    glow: '0 0 12px rgba(236, 72, 153, 0.25)',
    starColor: '#fbbf24',
  },
  SG: {
    color: '#38bdf8', // Bright sky blue
    bg: 'rgba(14, 165, 233, 0.16)',
    border: 'rgba(56, 189, 248, 0.5)',
    glow: '0 0 12px rgba(14, 165, 233, 0.25)',
    starColor: '#fbbf24',
  },
  DEFAULT: {
    color: '#fbbf24', // Radiant Amber Gold
    bg: 'rgba(245, 158, 11, 0.16)',
    border: 'rgba(251, 191, 36, 0.5)',
    glow: '0 0 12px rgba(245, 158, 11, 0.25)',
    starColor: '#fbbf24',
  },
};

export default function AuthorBadge({ author, style: customStyle = {} }) {
  if (!author) return null;

  const key = author.replace(/[\s.]/g, '').toUpperCase();
  const preset = AUTHOR_PRESETS[key] || AUTHOR_PRESETS.DEFAULT;

  return (
    <span
      className="author-badge"
      title={`Contenido elaborado por ${author}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.24rem 0.75rem',
        borderRadius: '999px',
        background: preset.bg,
        border: `1px solid ${preset.border}`,
        color: preset.color,
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        boxShadow: preset.glow,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
        ...customStyle,
      }}
    >
      <Star
        size={13}
        fill={preset.starColor}
        color={preset.starColor}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.75))',
          flexShrink: 0,
        }}
      />
      <span>Por {author}</span>
    </span>
  );
}
