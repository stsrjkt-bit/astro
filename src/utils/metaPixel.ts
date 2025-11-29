// src/utils/metaPixel.ts
export type MetaEventName = 'PageView' | 'Lead' | 'Contact' | 'ViewContent' | string;

export const trackMetaEvent = (eventName: MetaEventName, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  const fbq = (window as any).fbq;
  if (typeof fbq !== 'function') return;

  const path = window.location?.pathname ?? 'unknown';

  fbq('track', eventName, {
    page: path,
    ...params,
  });
};
