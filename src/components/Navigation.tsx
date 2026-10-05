import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShieldAlert, Compass, Globe, Building2, Users2, Trophy, Map, Clock, BookOpen, Layers, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Cover & Index', path: '/', icon: Globe, accentColor: 'text-navy-900' },
  { name: 'Newsletter Digest', path: '/newsletter', icon: BookOpen, accentColor: 'text-saffron-600' },
  { name: 'Presentation Album', path: '/magazine', icon: Sparkles, accentColor: 'text-sand-600' },
  { name: 'Security Pulse', path: '/security-pulse', icon: ShieldAlert, accentColor: 'text-navy-900' },
  { name: 'Frontier View', path: '/frontier-view', icon: Compass, accentColor: 'text-forest-700' },
  { name: 'Regional Currents', path: '/regional-currents', icon: Globe, accentColor: 'text-navy-700' },
  { name: 'Development', path: '/development', icon: Building2, accentColor: 'text-forest-800' },
  { name: 'Society & Youth', path: '/society-youth', icon: Users2, accentColor: 'text-saffron-700' },
  { name: 'Sports & Honors', path: '/sports', icon: Trophy, accentColor: 'text-saffron-600' },
  { name: '8 State Pages', path: '/states', icon: Map, accentColor: 'text-navy-800' },
  { name: '30-Day Timeline', path: '/timeline', icon: Clock, accentColor: 'text-saffron-700' },
  { name: 'Appendices', path: '/appendices', icon: Layers, accentColor: 'text-forest-700' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isItemActive = (itemPath: string) => {
    if (itemPath === '/') return location.pathname === '/';
    if (itemPath === '/appendices') {
      return (
        location.pathname.startsWith('/appendices') ||
        location.pathname.startsWith('/appendix') ||
        location.pathname.startsWith('/sources') ||
        location.pathname.startsWith('/rationale')
      );
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <nav className="sticky top-0 z-30 bg-ivory-200/95 backdrop-blur-xs border-b border-sand-300 overflow-x-auto no-scrollbar py-1 shadow-xs" aria-label="Main Editorial Sections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center space-x-1 sm:space-x-2 min-w-max py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.path);
            const isNewsletter = item.path === '/newsletter';
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? 'bg-navy-900 text-ivory-100 shadow-xs'
                      : isNewsletter
                      ? 'bg-saffron-100/80 text-navy-950 font-bold border border-saffron-300/80 hover:bg-saffron-200/90 shadow-2xs'
                      : 'text-navy-800 hover:bg-sand-200 hover:text-navy-950'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-saffron-400' : isNewsletter ? 'text-saffron-700' : item.accentColor}`} />
                  <span>{item.name}</span>
                  {isNewsletter && !active && (
                    <span className="px-1 py-0.2 rounded bg-saffron-600 text-white text-[9px] font-mono uppercase font-bold tracking-tight">
                      38p
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
