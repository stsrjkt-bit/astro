// src/utils/ga4.ts

export type GAEventParams = Record<string, unknown>;

// Google Analytics の gtag 関数の型定義
type GtagFunction = (
  command: 'event' | 'config' | 'set',
  eventName: string,
  params?: GAEventParams
) => void;

interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
}

/**
 * GA4 イベントを送信するユーティリティ関数
 * - SSR で window が無い時は何もしない
 * - window.gtag が関数でない時も何もしない
 *
 * @param eventName - イベント名（文字列）
 * @param params - 任意のパラメータ（オブジェクト）
 */
export const trackGAEvent = (eventName: string, params: GAEventParams = {}) => {
  if (typeof window === 'undefined') return;

  const gtag = (window as WindowWithGtag).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', eventName, params);
};
