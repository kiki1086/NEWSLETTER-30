import React from 'react';
import { SectionCategory } from '../types/article';

interface ThematicGraphicProps {
  category: SectionCategory;
  title: string;
  sourceName: string;
  className?: string;
  hideCredit?: boolean;
}

export const ThematicGraphic: React.FC<ThematicGraphicProps> = ({
  category,
  title,
  sourceName,
  className = 'h-48',
  hideCredit = false
}) => {
  // Deterministic pattern selector based on title characters
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const renderVisual = () => {
    switch (category) {
      case 'Security Pulse':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#0C2340" />
            {/* Topographic radar/survey grid */}
            <circle cx="200" cy="110" r="140" stroke="#1B365D" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="110" r="95" stroke="#1B365D" strokeWidth="1" />
            <circle cx="200" cy="110" r="50" stroke="#284E82" strokeWidth="1.5" />
            <line x1="20" y1="110" x2="380" y2="110" stroke="#1B365D" strokeWidth="1" />
            <line x1="200" y1="10" x2="200" y2="210" stroke="#1B365D" strokeWidth="1" />
            {/* Patkai Range mountain contours */}
            <path d="M0 220 L60 145 L130 180 L210 120 L290 165 L360 135 L400 170 L400 220 Z" fill="#061221" opacity="0.8" />
            <path d="M0 220 L90 160 L160 190 L240 140 L310 175 L400 130 L400 220 Z" fill="#143054" opacity="0.6" />
            {/* Target waypoint marker */}
            <circle cx="210" cy="120" r="5" fill="#E06D14" />
            <circle cx="210" cy="120" r="12" stroke="#E06D14" strokeWidth="1.5" opacity="0.7" />
            <text x="225" y="124" fill="#FDFBF7" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">SEC // VERIFIED</text>
          </svg>
        );

      case 'Frontier View':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#1E3F20" />
            {/* High altitude elevation contours */}
            <path d="M-20 60 Q 80 120 180 40 T 380 90 T 420 40" stroke="#2D5A27" strokeWidth="1.5" fill="none" />
            <path d="M-20 100 Q 100 150 200 80 T 400 130" stroke="#3D7835" strokeWidth="1.5" fill="none" />
            <path d="M-20 140 Q 90 190 220 120 T 420 160" stroke="#2D5A27" strokeWidth="1.5" fill="none" />
            {/* Eastern Himalayas ridgeline silhouette */}
            <path d="M0 220 L50 110 L120 145 L180 85 L260 140 L320 95 L400 160 L400 220 Z" fill="#0F2111" opacity="0.75" />
            {/* Coordinates overlay */}
            <rect x="20" y="20" width="130" height="24" rx="4" fill="#0F2111" opacity="0.8" />
            <text x="30" y="36" fill="#FFA043" fontSize="10" fontFamily="JetBrains Mono, monospace">28°17' N · 97°01' E</text>
          </svg>
        );

      case 'Regional Currents':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#F8F5EE" />
            {/* Brahmaputra riverine fluid curves */}
            <path d="M0 80 C 100 130, 200 40, 300 110 C 350 140, 380 120, 400 130 L400 220 L0 220 Z" fill="#E8E3D5" />
            <path d="M0 110 C 120 160, 220 70, 320 140 C 360 170, 390 150, 400 160 L400 220 L0 220 Z" fill="#D8D2C2" opacity="0.7" />
            {/* Editorial geometric lines */}
            <line x1="30" y1="40" x2="370" y2="40" stroke="#0C2340" strokeWidth="1.5" />
            <line x1="30" y1="46" x2="150" y2="46" stroke="#E06D14" strokeWidth="2.5" />
            <text x="30" y="32" fill="#0C2340" fontSize="11" fontFamily="Playfair Display, serif" fontStyle="italic">Regional Dispatch</text>
          </svg>
        );

      case 'Development & Infrastructure':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#143054" />
            {/* Engineering grid blueprint */}
            <defs>
              <pattern id={`grid-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1B365D" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="400" height="220" fill={`url(#grid-${seed})`} />
            {/* Bridge suspension / road infrastructure vector */}
            <path d="M30 170 Q 200 70 370 170" stroke="#FF8A00" strokeWidth="2.5" fill="none" />
            <line x1="30" y1="170" x2="370" y2="170" stroke="#FDFBF7" strokeWidth="2" />
            <line x1="120" y1="120" x2="120" y2="170" stroke="#FDFBF7" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="200" y1="95" x2="200" y2="170" stroke="#FDFBF7" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="280" y1="120" x2="280" y2="170" stroke="#FDFBF7" strokeWidth="1" strokeDasharray="2 2" />
            <text x="30" y="35" fill="#E8E3D5" fontSize="10" fontFamily="JetBrains Mono, monospace">INFRA // ENGINEERING</text>
          </svg>
        );

      case 'Society & Youth':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#EFE9DC" />
            {/* Cultural Angami/Muga diamond motif */}
            <g opacity="0.6">
              <path d="M 60 70 L 100 30 L 140 70 L 100 110 Z" fill="#E06D14" />
              <path d="M 140 70 L 180 30 L 220 70 L 180 110 Z" fill="#1E3F20" />
              <path d="M 220 70 L 260 30 L 300 70 L 260 110 Z" fill="#0C2340" />
              <path d="M 100 110 L 140 70 L 180 110 L 140 150 Z" fill="#0C2340" />
              <path d="M 180 110 L 220 70 L 260 110 L 220 150 Z" fill="#E06D14" />
            </g>
            <rect x="0" y="180" width="400" height="40" fill="#0C2340" />
            <text x="30" y="205" fill="#FDFBF7" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">
              Community Outreach & Welfare
            </text>
          </svg>
        );

      case 'Sports & Achievements':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#0C2340" />
            {/* Athletic stadium / gold wreath dynamic arcs */}
            <circle cx="200" cy="110" r="75" stroke="#E06D14" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="200" cy="110" r="55" stroke="#FFA043" strokeWidth="3" />
            <path d="M 150 110 L 250 110" stroke="#FF8A00" strokeWidth="2" />
            <polygon points="200,75 208,95 230,95 212,108 219,130 200,117 181,130 188,108 170,95 192,95" fill="#FFA043" />
            <text x="200" y="165" textAnchor="middle" fill="#FDFBF7" fontSize="11" fontFamily="Cinzel, serif" fontWeight="700">HONOR & EXCELLENCE</text>
          </svg>
        );

      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#E8E3D5" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-t-lg ${className}`}>
      {renderVisual()}
      
      {/* Sourced Image Credit Overlay */}
      {!hideCredit && (
        <div className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-ivory-100">
          Archival / {sourceName}
        </div>
      )}
    </div>
  );
};
