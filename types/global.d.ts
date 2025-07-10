export {};

declare global {
  interface Window {
    ym?: YmFunction;
    Ya?: {
      Metrika2?: {
        getCounters?: () => any[];
      };
    };
  }
}

type YmFunction = {
  (counterId: number, action: 'init', params: YmInitParams): void;
  (counterId: number, action: 'hit' | 'reachGoal', url: string): void;
  (counterId: number, action: 'userParams', params: Record<string, unknown>): void;
  a?: Array<unknown>;
  l?: number;
};

export interface YmInitParams {
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  defer?: boolean;
  ecommerce?: string | boolean;
  triggerEvent?: boolean;
  trackHash?: boolean;
}