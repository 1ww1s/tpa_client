export {};

declare global {
  interface Window {
    ym: (
      counterId: number,
      action: 'init' | 'hit' | 'reachGoal' | 'userParams',
      params?: any,
      options?: {
        callback?: () => void;
        ctx?: any;
        referer?: string;
        title?: string;
        userParams?: Record<string, any>;
      }
    ) => void;
    
    // Для работы счетчика
    Ya?: {
      Metrika2?: {
        getCounters?: () => any[];
      };
    };
  }
}