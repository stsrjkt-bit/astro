// src/utils/ga4.ts

export type GAEventParams = Record<string, unknown>;

// Google Analytics の gtag 関数の型定義
// The gtag function can be called with various arguments, so using a flexible type.
type GtagFunction = (...args: unknown[]) => void;

interface WindowWithGtag extends Window {
  dataLayer?: unknown[];
  gtag?: GtagFunction;
}

/**
 * GA4 イベントを送信するユーティリティ関数
 * - SSR で window が無い時は何もしない
 * - window.gtag が未定義でも dataLayer にイベントをキューイングする
 *
 * @param eventName - イベント名（文字列）
 * @param params - 任意のパラメータ（オブジェクト）
 */
export const trackGAEvent = (eventName: string, params: GAEventParams = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const extendedWindow = window as WindowWithGtag;

  // dataLayer がなければ初期化
  extendedWindow.dataLayer = extendedWindow.dataLayer || [];

  // gtag がなければ、dataLayer に積むだけのフォールバックを定義
  if (typeof extendedWindow.gtag !== 'function') {
    extendedWindow.gtag = (...args: unknown[]) => {
      extendedWindow.dataLayer!.push(args);
    };
  }

  // イベントを送信
  try {
    extendedWindow.gtag('event', eventName, params);
  } catch (error) {
    console.error(`GA4 event tracking error for event: ${eventName}`, error);
  }
};
