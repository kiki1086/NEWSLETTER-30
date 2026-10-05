import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SECTION_ROUTES = [
  '/',
  '/security-pulse',
  '/frontier-view',
  '/regional-currents',
  '/development',
  '/society-youth',
  '/sports',
  '/states',
  '/timeline',
  '/sources',
  '/rationale'
];

export function useKeyboardNav(onCloseModal?: () => void) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // If typing in input, don't trigger navigation
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape' && onCloseModal) {
        onCloseModal();
        return;
      }

      const currentIndex = SECTION_ROUTES.indexOf(location.pathname);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight' && (e.altKey || e.metaKey)) {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % SECTION_ROUTES.length;
        navigate(SECTION_ROUTES[nextIndex]);
      } else if (e.key === 'ArrowLeft' && (e.altKey || e.metaKey)) {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + SECTION_ROUTES.length) % SECTION_ROUTES.length;
        navigate(SECTION_ROUTES[prevIndex]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname, onCloseModal]);
}
