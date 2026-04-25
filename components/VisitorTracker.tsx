"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('visitor_session_id', sessionId);
    }

    // Track visit
    const trackVisit = async () => {
      try {
        await fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pageUrl: window.location.href,
            referrer: document.referrer,
            sessionId,
            isAdmin
          })
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [pathname, isAdmin]);

  return null;
}
