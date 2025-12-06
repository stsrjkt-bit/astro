// src/utils/metaPixel.ts
export type MetaEventName = 'PageView' | 'Lead' | 'Contact' | 'ViewContent' | string;

// Facebook Pixel の fbq 関数の型定義
type FbqFunction = (action: string, eventName: string, params?: Record<string, unknown>) => void;

interface WindowWithFbq extends Window {
  fbq?: FbqFunction;
}

export const trackMetaEvent = (eventName: MetaEventName, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;

  const fbq = (window as WindowWithFbq).fbq;
  if (typeof fbq !== 'function') return;

  const path = window.location?.pathname ?? 'unknown';

  fbq('track', eventName, {
    page: path,
    ...params,
  });
};

export const trackMetaCustomEvent = (eventName: MetaEventName, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;

  const fbq = (window as WindowWithFbq).fbq;
  if (typeof fbq !== 'function') return;

  fbq('trackCustom', eventName, params);
};
