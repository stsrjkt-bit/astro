import React, { useState, useEffect } from 'react';

// GA4 / Meta Pixel の型定義
declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params?: { [key: string]: unknown }) => void;
    fbq?: (command: 'track' | 'trackCustom', eventName: string, params?: { [key: string]: unknown }) => void;
  }
}

interface CountdownCampaignProps {
  title: string | React.ReactNode;
  description?: string;
  originalPrice: string;
  discountedPrice: string;
  deadline: string;
  ctaLabel: string | React.ReactNode;
  ctaHref: string;
  campaignId: string;
  expiredMessage?: string;
  expiredCtaLabel?: string;
  cautionText?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// -----------------------------------------------------------------------------
// 装飾用コンポーネント & スタイル
// -----------------------------------------------------------------------------

// アニメーション用スタイル定義
const CampaignStyles = () => (
  <style>{`
    /* 雪のアニメーション */
    @keyframes fall {
      0% { transform: translateY(-10%) translateX(0); opacity: 0; }
      10% { opacity: 0.8; }
      50% { opacity: 1; }
      100% { transform: translateY(120%) translateX(20px); opacity: 0; }
    }
    .snowflake {
      position: absolute;
      top: -10px;
      color: rgba(255, 255, 255, 0.6);
      animation: fall linear infinite;
      z-index: 10;
      pointer-events: none;
    }
    .snowflake:nth-child(1) { left: 10%; animation-duration: 8s; font-size: 1.2rem; }
    .snowflake:nth-child(2) { left: 20%; animation-duration: 6s; animation-delay: 1s; font-size: 1rem; }
    .snowflake:nth-child(3) { left: 35%; animation-duration: 10s; animation-delay: 2s; font-size: 1.5rem; }
    .snowflake:nth-child(4) { left: 50%; animation-duration: 7s; animation-delay: 0.5s; font-size: 0.8rem; }
    .snowflake:nth-child(5) { left: 70%; animation-duration: 9s; animation-delay: 1.5s; font-size: 1.1rem; }
    .snowflake:nth-child(6) { left: 85%; animation-duration: 6s; animation-delay: 2.5s; font-size: 1.3rem; }

    /* ソリに乗ったサンタたちの揺れるアニメーション */
    @keyframes sleigh-rock {
      0%, 100% { transform: rotate(-2deg) translateY(0); }
      50% { transform: rotate(2deg) translateY(-2px); }
    }
    .sleigh-group {
      animation: sleigh-rock 2s ease-in-out infinite;
      display: inline-block;
      filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3));
      white-space: nowrap;
    }

    /* ふわふわ浮く絵文字（ツリーやプレゼントなど） */
    @keyframes emoji-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(5deg); }
    }
    .floating-emoji {
      animation: emoji-float 3s ease-in-out infinite;
      position: absolute;
      z-index: 15;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      pointer-events: none;
    }

    /* ぶら下がるオーナメントの揺れ */
    @keyframes swing {
      0% { transform: rotate(3deg); }
      50% { transform: rotate(-3deg); }
      100% { transform: rotate(3deg); }
    }
    .hanging-ornament {
      transform-origin: top center;
      animation: swing 3s ease-in-out infinite;
      position: absolute;
      top: -10px; /* 少し上から吊るす */
      z-index: 25;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .string {
      width: 1px;
      background-color: rgba(255, 255, 255, 0.6);
      height: 40px; /* デフォルトの紐の長さ */
    }
    .emoji-deco {
      font-size: 1.5rem;
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
      margin-top: -5px; /* 紐とくっつける */
    }

    /* タイマーの点滅コロン */
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .timer-colon {
      animation: blink 1s step-end infinite;
    }
    
    /* 緊迫感を出すパルス */
    @keyframes urgency-pulse {
      0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
      70% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
      100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
    }
    .urgent-border {
      animation: urgency-pulse 2s infinite;
    }
  `}</style>
);

// タイトル横のヒイラギアイコン
const HollyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="inline-block mr-2 shrink-0 drop-shadow-sm -mt-1">
    <path d="M12 2C12 2 13.5 5 16 5C18.5 5 21 3 21 3C21 3 20 6 21 8C22 10 24 10.5 24 10.5C24 10.5 21.5 12 21 14C20.5 16 22 19 22 19C22 19 19 18.5 17 19.5C15 20.5 14 23 14 23C14 23 12.5 20 10 20C7.5 20 5 22 5 22C5 22 6 19 5 17C4 15 2 14.5 2 14.5C2 14.5 4.5 13 5 11C5.5 9 4 6 4 6C4 6 7 6.5 9 5.5C11 4.5 12 2 12 2Z" fill="#15803d" stroke="#0f391e" strokeWidth="1"/>
    <g>
      <circle cx="12" cy="12" r="2.5" fill="#ef4444"/>
      <circle cx="15.5" cy="10.5" r="2" fill="#ef4444"/>
      <circle cx="13.5" cy="15.5" r="2" fill="#ef4444"/>
    </g>
  </svg>
);

// -----------------------------------------------------------------------------
// メインコンポーネント
// -----------------------------------------------------------------------------

export const CountdownCampaign: React.FC<CountdownCampaignProps> = ({
  title,
  description,
  originalPrice,
  discountedPrice,
  deadline,
  ctaLabel,
  ctaHref,
  campaignId,
  expiredMessage = 'このオファーは終了しました。',
  expiredCtaLabel = 'キャンペーンは終了しました',
  cautionText = '※ 定員に達し次第、予告なく終了する場合がございます。',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const calculateTimeLeft = (): TimeLeft | null => {
    if (!deadline) return null;
    const difference = new Date(deadline).getTime() - Date.now();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const formatTime = (time: number) => String(time).padStart(2, '0');

  useEffect(() => {
    setIsClient(true);
    const initialLeft = calculateTimeLeft();
    if (!initialLeft) {
      setIsExpired(true);
    } else {
      setTimeLeft(initialLeft);
    }

    if (typeof window !== 'undefined') {
      const locationPath = window.location.pathname;
      window.gtag?.('event', 'campaign_view', {
        campaign_id: campaignId,
        deadline: deadline,
        page_location: locationPath,
      });
      window.fbq?.('trackCustom', 'CampaignView', {
        campaign_id: campaignId,
        deadline: deadline,
      });
    }

    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      if (!left) {
        setIsExpired(true);
        setTimeLeft(null);
        clearInterval(timer);
      } else {
        setTimeLeft(left);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [campaignId, deadline]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExpired) {
      e.preventDefault();
      return;
    }
    if (typeof window !== 'undefined') {
      const locationPath = window.location.pathname;
      window.gtag?.('event', 'campaign_cta_click', {
        campaign_id: campaignId,
        page_location: locationPath,
      });
      window.fbq?.('trackCustom', 'CampaignCtaClick', {
        campaign_id: campaignId,
      });
    }
  };

  const formatDeadlineText = (isoString: string) => {
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return '';
      const formatter = new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const parts = formatter.formatToParts(d);
      const getPart = (type: Intl.DateTimeFormatPartTypes) => 
        parts.find(p => p.type === type)?.value || '';
      return `${getPart('month')}月${getPart('day')}日（${getPart('weekday')}）${getPart('hour')}:${getPart('minute')} まで`;
    } catch {
      return '';
    }
  };

  if (!isClient) {
    return <div className="w-full h-48 bg-slate-100 rounded-xl my-8 animate-pulse"></div>;
  }

  const splitPrice = (priceStr: string) => {
    const parts = priceStr.split(/[\s\u3000]+/);
    if (parts.length >= 2) {
      const label = parts[0];
      const value = parts.slice(1).join(' ');
      return { label, value };
    }
    return { label: '', value: priceStr };
  };

  const { label: originalLabel, value: originalValue } = splitPrice(originalPrice);
  const { label: discountLabel, value: discountValue } = splitPrice(discountedPrice);

  return (
    <>
      <CampaignStyles />
      <div className="relative w-full my-8 font-sans group isolate">
        
        {/* =========================================
            メインカードコンテナ
            ========================================= */}
        <div
          className={[
            "relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-900 via-red-800 to-red-950",
            "shadow-2xl ring-4 ring-yellow-500/30 border-t border-red-500/50 pt-6 pb-2",
            !isExpired ? "urgent-border" : ""
          ]
            .filter(Boolean)
            .join(" ")}
        >
          
          {/* 背景の雪のエフェクト */}
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          
          {/* ★ 賑わい演出1: ぶら下がるオーナメント (もみの木の飾り風) ★ */}
          {!isExpired && (
            <>
              {/* 左端: 星 */}
              <div className="hanging-ornament left-4 sm:left-8" style={{ animationDelay: '0s' }}>
                <div className="string h-12"></div>
                <div className="emoji-deco">🌟</div>
              </div>
              {/* 少し右: 赤い玉 */}
              <div className="hanging-ornament left-16 sm:left-24" style={{ animationDelay: '1s' }}>
                <div className="string h-16"></div>
                <div className="emoji-deco">🔴</div>
              </div>
              {/* 中央左: 靴下 */}
              <div className="hanging-ornament left-1/3" style={{ animationDelay: '0.5s' }}>
                <div className="string h-10"></div>
                <div className="emoji-deco">🧦</div>
              </div>
              {/* 中央右: リボン */}
              <div className="hanging-ornament right-1/3" style={{ animationDelay: '1.5s' }}>
                <div className="string h-14"></div>
                <div className="emoji-deco">🎀</div>
              </div>
              {/* 右端寄り: ベル */}
              <div className="hanging-ornament right-16 sm:right-24" style={{ animationDelay: '2s' }}>
                <div className="string h-8"></div>
                <div className="emoji-deco">🔔</div>
              </div>
              {/* 右端: 黄色い玉 */}
              <div className="hanging-ornament right-4 sm:right-8" style={{ animationDelay: '0.8s' }}>
                <div className="string h-12"></div>
                <div className="emoji-deco">🟡</div>
              </div>
            </>
          )}

          {/* ★ 賑わい演出2: フローティング絵文字たち ★ */}
          {!isExpired && (
            <>
              {/* 左上付近: ツリー */}
              <div className="floating-emoji top-16 left-2 sm:left-6 text-2xl opacity-80" style={{ animationDelay: '0.2s' }}>
                🎄
              </div>
              
              {/* 左下付近: 雪だるま */}
              <div className="floating-emoji bottom-12 left-4 text-3xl" style={{ animationDelay: '2s' }}>
                ⛄
              </div>

              {/* 右下付近: プレゼント */}
              <div className="floating-emoji bottom-20 right-2 text-2xl" style={{ animationDelay: '0.5s' }}>
                🎁
              </div>
              
              {/* 中央付近: クッキー */}
              <div className="floating-emoji top-1/2 left-10 text-xl opacity-60" style={{ animationDelay: '1.2s' }}>
                🍪
              </div>

              {/* 中央付近: キャンディ */}
              <div className="floating-emoji top-1/3 right-10 text-xl opacity-60" style={{ animationDelay: '1.8s' }}>
                🍬
              </div>
            </>
          )}

          {/* 内側の金枠 */}
          <div className="absolute inset-1.5 border border-yellow-400/30 rounded-xl pointer-events-none z-10 box-border"></div>
          
          {/* 右上のリボン */}
          {!isExpired && (
            <div className="absolute -top-2 -right-2 w-24 h-24 overflow-hidden z-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-36 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 text-[10px] font-black flex items-center justify-center transform translate-x-12 translate-y-6 rotate-45 shadow-lg border-y border-yellow-200 tracking-wider">
                LIMITED
              </div>
            </div>
          )}

          {/* コンテンツラッパー */}
          <div className="relative z-20 px-4 py-6 sm:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-stretch gap-6 sm:gap-8 mt-4 sm:mt-0">
            
            {/* -------------------------------------------------
                左側：キャンペーン情報
                ------------------------------------------------- */}
            <div className="flex-1 flex flex-col justify-center">
              
              {!isExpired && (
                <div className="relative self-start mb-4">
                  <div className="bg-green-800 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-sm shadow-md border border-green-600 flex items-center gap-2">
                    <span className="text-yellow-400 animate-pulse">★</span>
                    <span className="text-xs sm:text-sm font-bold tracking-widest font-serif text-yellow-50">CHRISTMAS SALE</span>
                    <span className="text-yellow-400 animate-pulse">★</span>
                  </div>
                </div>
              )}

              {/* 情報カード */}
              <div className="bg-white rounded-lg p-4 sm:p-5 shadow-xl shadow-black/30">
                
                <h3 className="flex items-start text-lg sm:text-2xl font-bold text-slate-900 mb-3 leading-snug drop-shadow-sm">
                  <HollyIcon />
                  <span className="break-words w-full">{title}</span>
                </h3>

                {description && (
                  <p className="text-sm sm:text-base text-slate-700 mb-4 pl-2 border-l-4 border-red-600 leading-relaxed font-medium">
                    {description}
                  </p>
                )}

                {isExpired ? (
                  <div className="mt-4 p-3 bg-slate-100 rounded text-slate-500 font-bold text-center border border-slate-200">
                    {expiredMessage}
                  </div>
                ) : (
                  <div className="mt-2 bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100 relative overflow-hidden">
                    <div className="mb-1 text-xs sm:text-sm font-bold text-slate-500 relative z-10">
                      {originalLabel && <span className="mr-2">{originalLabel}</span>}
                      <span className="line-through decoration-slate-400 whitespace-nowrap">{originalValue}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 relative z-10">
                      <div className="flex items-center gap-2 mb-1 sm:mb-0">
                        {discountLabel && (
                          <span className="text-sm sm:text-base font-bold text-red-900 whitespace-nowrap">
                            {discountLabel}
                          </span>
                        )}
                        <span className="text-red-600 font-bold text-lg animate-bounce sm:hidden">⬇</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-red-600 font-bold text-lg animate-bounce">⬇</span>
                        <span className="text-3xl sm:text-3xl lg:text-4xl font-black text-red-700 tracking-tight drop-shadow-sm whitespace-nowrap">
                          {discountValue}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center text-xs sm:text-sm font-bold text-red-800 bg-red-100 px-2 py-1 rounded inline-block">
                      <span className="mr-1">⏳</span> {formatDeadlineText(deadline)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* -------------------------------------------------
                右側：緊迫のタイマー & CTA
                ------------------------------------------------- */}
            <div className="flex flex-col justify-center items-center lg:items-end w-full lg:w-auto shrink-0 gap-5">
              
              {!isExpired && timeLeft && (
                <div className="w-full lg:w-auto relative mt-8 sm:mt-0">
                  
                  {/* タイマーヘッダー */}
                  <div className="text-center mb-2">
                    <span className="text-[12px] font-bold text-yellow-400 tracking-[0.2em] uppercase text-shadow-sm animate-pulse">
                      Time Left
                    </span>
                  </div>

                  {/* ★ サンタとトナカイの絵文字セット ★ 
                    タイマーの上に乗っかっているような配置で賑やかに
                  */}
                  <div className="absolute -top-9 right-2 sm:right-6 z-20 sleigh-group">
                    {/* 🦌(トナカイ) + 🎅(サンタ) */}
                    <span className="text-4xl sm:text-5xl filter drop-shadow-md">🦌🎅</span>
                  </div>
                  
                  {/* タイマー本体 */}
                  <div className="relative z-10 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-white">
                      
                      {/* Days */}
                      <div className="flex flex-col items-center min-w-[3.2rem] sm:min-w-[3.8rem]">
                        <span className="text-2xl sm:text-4xl font-black font-mono leading-none text-white tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                          {timeLeft.days}
                        </span>
                        <span className="text-[10px] text-red-400 font-bold mt-1">DAYS</span>
                      </div>
                      
                      <span className="text-red-500 text-2xl font-bold pb-4 timer-colon">:</span>
                      
                      {/* Hours */}
                      <div className="flex flex-col items-center min-w-[3.2rem] sm:min-w-[3.8rem]">
                        <span className="text-2xl sm:text-4xl font-black font-mono leading-none text-white tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                          {formatTime(timeLeft.hours)}
                        </span>
                        <span className="text-[10px] text-red-400 font-bold mt-1">HRS</span>
                      </div>
                      
                      <span className="text-red-500 text-2xl font-bold pb-4 timer-colon">:</span>
                      
                      {/* Mins */}
                      <div className="flex flex-col items-center min-w-[3.2rem] sm:min-w-[3.8rem]">
                        <span className="text-2xl sm:text-4xl font-black font-mono leading-none text-white tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                          {formatTime(timeLeft.minutes)}
                        </span>
                        <span className="text-[10px] text-red-400 font-bold mt-1">MINS</span>
                      </div>
                      
                      <span className="text-red-500 text-2xl font-bold pb-4 timer-colon">:</span>
                      
                      {/* Secs */}
                      <div className="flex flex-col items-center min-w-[3.2rem] sm:min-w-[3.8rem]">
                        <span className="text-2xl sm:text-4xl font-black font-mono leading-none text-red-500 tabular-nums drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
                          {formatTime(timeLeft.seconds)}
                        </span>
                        <span className="text-[10px] text-red-400 font-bold mt-1">SECS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ボタンエリア */}
              <div className="relative w-full lg:w-auto text-center mt-2">
                {!isExpired && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-950 text-[11px] font-black px-3 py-0.5 rounded-full shadow-lg border border-yellow-200 whitespace-nowrap z-30 flex items-center gap-1">
                    <span className="animate-pulse">●</span> 特別オファー適用中
                  </div>
                )}

                <a
                  href={isExpired ? '#' : ctaHref}
                  onClick={handleCtaClick}
                  className={`
                    relative group/btn w-full lg:w-auto inline-flex items-center justify-center px-6 py-4 sm:px-8 sm:py-5
                    text-base sm:text-lg font-bold text-white transition-all duration-200 
                    rounded-full shadow-[0_4px_14px_0_rgba(22,163,74,0.39)]
                    ${isExpired 
                      ? 'bg-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 border-t border-green-400 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0'
                    }
                  `}
                  aria-disabled={isExpired}
                  role="button"
                >
                  {!isExpired && (
                    <span className="absolute inset-0 rounded-full bg-white/20 group-hover/btn:animate-pulse"></span>
                  )}
                  {isExpired ? expiredCtaLabel : (
                    <span className="relative flex items-center justify-center gap-2 drop-shadow-md text-center">
                      <span className="text-2xl shrink-0 filter drop-shadow">🎁</span>
                      <span className="leading-tight text-shadow-sm">
                        {ctaLabel}
                      </span>
                      <svg className="w-5 h-5 ml-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                    </span>
                  )}
                </a>
                
                {!isExpired && (
                  <p className="mt-3 text-[10px] sm:text-xs text-red-100 font-medium w-full max-w-[300px] mx-auto lg:mr-0 lg:ml-auto leading-tight opacity-90">
                    {cautionText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
