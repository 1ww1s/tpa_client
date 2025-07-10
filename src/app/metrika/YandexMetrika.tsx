'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { YmInitParams } from '@/types/global';

interface YandexMetrikaProps {
  counterId: number;
  debug?: boolean;
}

export const YandexMetrika = ({ counterId, debug = false }: YandexMetrikaProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Инициализация объекта ym, если его нет
    if (!window.ym) {
      window.ym = function(...args: unknown[]) {
        (window.ym!.a = window.ym!.a || []).push(args);
      };
      window.ym.l = Date.now();
    }

    // Загрузка скрипта метрики
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://mc.yandex.ru/metrika/tag.js';
      script.async = true;
      script.onload = initMetrika;
      document.head.appendChild(script);
    };

    // Инициализация метрики
    const initMetrika = () => {
      try {
        if (!window.ym) {
          if (debug) console.warn('Yandex Metrika not loaded');
          return;
        }

        const initParams: YmInitParams = {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        };

        window.ym(counterId, 'init', initParams);
        
        if (debug) console.log('Yandex Metrika initialized', counterId);
      } catch (error) {
        console.error('Yandex Metrika initialization error', error);
      }
    };

    loadScript();

    return () => {
      // Очистка при размонтировании
      const scripts = document.querySelectorAll('script[src*="mc.yandex.ru/metrika/tag.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [counterId, debug]);

  useEffect(() => {
    // Отслеживание изменений URL
    if (typeof window === 'undefined' || !window.ym) return;

    try {
      window.ym(counterId, 'hit', pathname);
      if (debug) console.log('Yandex Metrika pageview', pathname);
    } catch (error) {
      console.error('Yandex Metrika hit error', error);
    }
  }, [pathname, counterId, debug]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt="Yandex Metrika"
        />
      </div>
    </noscript>
  );
};