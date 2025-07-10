'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface YandexMetrikaProps {
  counterId: number;
  debug?: boolean;
}

export const YandexMetrika = ({ counterId, debug = false }: YandexMetrikaProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    if (!window.ym) {
      // Загрузка скрипта метрики
      const script = document.createElement('script');
      script.src = 'https://mc.yandex.ru/metrika/tag.js';
      script.async = true;
      script.onload = () => initMetrika(url);
      document.head.appendChild(script);
    } else {
      initMetrika(url);
    }

    function initMetrika(url: string) {
      try {
        if (!window.ym) {
          if (debug) console.warn('Yandex Metrika not loaded');
          return;
        }

        window.ym(counterId, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          defer: true,
          ecommerce: 'dataLayer',
          triggerEvent: false,
          trackHash: true,
        });

        // Первая загрузка страницы
        window.ym(counterId, 'hit', url);
        
        if (debug) console.log('Yandex Metrika initialized', counterId);
      } catch (e) {
        console.error('Yandex Metrika error', e);
      }
    }

    return () => {
      // Очистка при размонтировании
      const scripts = document.querySelectorAll('script[src*="mc.yandex.ru/metrika/tag.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [counterId, debug, pathname, searchParams]);

  useEffect(() => {
    // Отслеживание изменений URL
    if (typeof window === 'undefined' || !window.ym) return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.ym(counterId, 'hit', url);
    
    if (debug) console.log('Yandex Metrika pageview', url);
  }, [pathname, searchParams, counterId, debug]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
};