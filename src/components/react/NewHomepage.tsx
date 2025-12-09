import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  MessageCircle,
  GraduationCap,
  Mail,
  Info,
  BookOpen,
  School,
  BrainCircuit,
  Image as ImageIcon,
  Calculator,
  Ruler,
  PenTool,
  Pi,
  Sigma,
  Variable,
  Divide,
  Sparkles,
  Lightbulb,
  Star,
  Smartphone,
  AlertCircle,
  Footprints,
  Home,
  ClipboardList,
} from 'lucide-react';
import { trackMetaEvent } from '~/utils/metaPixel';
import { trackGAEvent } from '~/utils/ga4';
import UserChoiceSection from '~/components/react/UserChoiceSection';
import { CampaignSection, type CampaignData } from '~/components/react/CampaignSection';

const campaignData: CampaignData = {
  title: (
    <>
      高校生の理系立て直し
      <br className="block sm:hidden" />
      応援オファー
    </>
  ),
  description: 'この冬〜1月で理系科目の勉強を立て直したい高校生向けの期間限定オファーです。',
  originalPrice: '通常月謝 17,600円（税込）',
  discountedPrice: '初月月謝 14,800円（税込）',
  deadline: '2025-12-21T23:59:59+09:00',
  ctaLabel: (
    <>
      このボタンから
      <br className="block sm:hidden" />
      無料体験を予約する
    </>
  ),
  ctaHref: '/trial?campaign=xmas_high1_2025',
  cautionText: '※ 本ボタン経由の予約のみ割引が適用されます。他ページからのご予約は対象外となりますのでご注意ください。',
  campaignId: 'xmas_high1_2025',
};

// --- ブランドカラー定義 ---
// Primary (Sky Blue): #009DE0
// Secondary (Lime Yellow): #D6DE26
// Text (Dark Navy): #334455
// Background: #F8FAFC (Slate-50)

// --- セクション定義 ---
const SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'concept', label: '当塾の想い' },
  { id: 'campaign', label: '特別オファー' },
  { id: 'about', label: '当塾について' },
  { id: 'features', label: '3つの特徴' },
  { id: 'achievements', label: '合格実績' },
  { id: 'gallery', label: '教室の様子' },
  { id: 'access', label: 'アクセス' },
  { id: 'contact', label: 'お問い合わせ' },
];

// --- カスタムフック: スクロール位置の取得 ---
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

// --- 背景装飾用コンポーネント (Blob) ---
const DecorativeBlob = ({
  color = 'bg-[#009DE0]',
  className = '',
  size = 'w-64 h-64',
}: {
  color?: string;
  className?: string;
  size?: string;
}) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${color} ${size} ${className}`}
  />
);

// --- スクロール連動アニメーション用コンポーネント ---
const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-8 blur-sm scale-[0.98]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- フローティングアイコンコンポーネント ---
const FloatingIcon = ({
  icon: Icon,
  className = '',
  delay = 0,
  duration = 6,
  size = 24,
}: {
  icon: React.ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
}) => {
  return (
    <div
      className={`absolute flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50 ${className}`}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon strokeWidth={1.5} size={size} />
    </div>
  );
};

// --- PC用 ドットナビゲーション ---
const DotNavigation = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end p-2"
          aria-label={section.label}
        >
          <span
            className={`absolute right-8 px-3 py-1.5 text-xs font-bold text-white bg-[#334455] rounded opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none whitespace-nowrap shadow-lg`}
          >
            {section.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 border-2 border-[#009DE0] shadow-sm ${
              activeSection === section.id
                ? 'bg-[#009DE0] scale-125 border-transparent'
                : 'bg-white hover:bg-[#009DE0]/20'
            }`}
          />
        </a>
      ))}
    </div>
  );
};

// アイコンのマッピング
const getIcon = (id: string) => {
  switch (id) {
    case 'concept':
      return <PenTool size={18} className="text-[#009DE0]" />;
    case 'campaign':
      return <Star size={18} className="text-[#009DE0]" />;
    case 'about':
      return <Info size={18} className="text-[#009DE0]" />;
    case 'features':
      return <BrainCircuit size={18} className="text-[#009DE0]" />;
    case 'achievements':
      return <GraduationCap size={18} className="text-[#009DE0]" />;
    case 'gallery':
      return <ImageIcon size={18} className="text-[#009DE0]" />;
    case 'access':
      return <MapPin size={18} className="text-[#009DE0]" />;
    case 'contact':
      return <MessageCircle size={18} className="text-[#009DE0]" />;
    default:
      return <ChevronRight size={18} className="text-[#009DE0]" />;
  }
};

// --- MENU用セクション（「当塾の想い」を除外した6つ） ---
const MENU_SECTIONS = [
  { id: 'campaign', label: '特別オファー' },
  { id: 'about', label: '当塾について' },
  { id: 'features', label: '3つの特徴' },
  { id: 'achievements', label: '合格実績' },
  { id: 'gallery', label: '教室の様子' },
  { id: 'access', label: 'アクセス' },
  { id: 'contact', label: 'お問い合わせ' },
];

// --- スマホ用 目次リスト ---
const MobileTableOfContents = () => {
  return (
    <div className="md:hidden w-full relative overflow-hidden bg-white border-b border-slate-100 shadow-sm z-30">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009DE0] to-[#D6DE26]" />
      <div className="relative px-5 py-8 bg-[#F8FAFC]/50">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[1px] w-8 bg-slate-300"></span>
          <p className="text-xs font-bold tracking-[0.2em] text-[#334455] uppercase">Menu</p>
          <span className="h-[1px] w-8 bg-slate-300"></span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {MENU_SECTIONS.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm active:scale-[0.98] transition-all hover:border-[#009DE0]/30 hover:shadow-md"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold mb-0.5 text-[#009DE0]/60">
                  0{index + 1}
                </span>
                <span className="text-sm font-bold text-[#334455]">{section.label}</span>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#009DE0] group-hover:text-white transition-colors text-[#009DE0]">
                {getIcon(section.id)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ヒヨコのアニメーションコンポーネント ---
const HatchingEgg = () => {
  const [stage, setStage] = useState<'idle' | 'shaking' | 'cracking' | 'hatched'>('idle');

  const startAnimation = () => {
    if (stage !== 'hatched') {
      setStage('shaking');
      setTimeout(() => setStage('cracking'), 1200);
      setTimeout(() => setStage('hatched'), 1800);
    } else {
      // Reset for replay
      setStage('idle');
      setTimeout(() => {
        setStage('shaking');
        setTimeout(() => setStage('cracking'), 1200);
        setTimeout(() => setStage('hatched'), 1800);
      }, 100);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group select-none"
      onClick={startAnimation}
    >
      {/* 背景の光 (割れたときに出現) */}
      <div
        className={`absolute inset-0 bg-[#D6DE26]/30 blur-[60px] rounded-full transition-all duration-1000 ${stage === 'hatched' ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}
      ></div>

      {/* --- 飛び出す星たち (Stars) --- */}
      {/* 大きな星 (左上) */}
      <div
        className={`absolute left-4 top-10 transition-all duration-1000 ease-out delay-100 ${
          stage === 'hatched'
            ? 'translate-x-[-30px] translate-y-[-30px] rotate-[-45deg] opacity-100 scale-100'
            : 'translate-x-[40px] translate-y-[80px] scale-0 opacity-0'
        }`}
      >
        <Star className="text-[#FFD700]" fill="#FFD700" size={32} strokeWidth={1} />
      </div>

      {/* 中くらいの星 (右上) */}
      <div
        className={`absolute right-6 top-12 transition-all duration-1000 ease-out delay-200 ${
          stage === 'hatched'
            ? 'translate-x-[40px] translate-y-[-40px] rotate-[30deg] opacity-100 scale-100'
            : 'translate-x-[-40px] translate-y-[80px] scale-0 opacity-0'
        }`}
      >
        <Star className="text-[#009DE0]" fill="#009DE0" size={24} strokeWidth={1} />
      </div>

      {/* 小さな星 (左側) */}
      <div
        className={`absolute left-0 top-32 transition-all duration-1000 ease-out delay-150 ${
          stage === 'hatched'
            ? 'translate-x-[-50px] translate-y-[-10px] rotate-[-15deg] opacity-80 scale-100'
            : 'translate-x-[40px] translate-y-[40px] scale-0 opacity-0'
        }`}
      >
        <Star className="text-[#D6DE26]" fill="#D6DE26" size={16} strokeWidth={1} />
      </div>

      {/* 小さな星 (右側) */}
      <div
        className={`absolute right-2 top-28 transition-all duration-1000 ease-out delay-300 ${
          stage === 'hatched'
            ? 'translate-x-[50px] translate-y-[0px] rotate-[60deg] opacity-80 scale-100'
            : 'translate-x-[-40px] translate-y-[40px] scale-0 opacity-0'
        }`}
      >
        <Star className="text-[#FFD700]" fill="#FFD700" size={12} strokeWidth={1} />
      </div>

      {/* キラキラ (真上) */}
      <div
        className={`absolute top-0 transition-all duration-1000 ease-out delay-75 ${
          stage === 'hatched' ? 'translate-y-[-60px] opacity-100 scale-110' : 'translate-y-[0px] scale-0 opacity-0'
        }`}
      >
        <Sparkles className="text-[#009DE0]" fill="none" size={28} strokeWidth={1.5} />
      </div>

      {/* --- メインキャラクター: ヒヨコ (Chick) --- */}
      <div
        className={`absolute z-10 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          stage === 'hatched' ? 'translate-y-[-20px] scale-100 opacity-100' : 'translate-y-[50px] scale-50 opacity-0'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg">
          {/* 体 */}
          <path
            d="M50 15 C 25 15 10 45 10 65 C 10 90 30 95 50 95 C 70 95 90 90 90 65 C 90 45 75 15 50 15 Z"
            fill="#FFE066"
          />
          {/* 翼 */}
          <path d="M15 55 C 5 55 5 75 15 75 C 25 75 25 55 15 55 Z" fill="#FACC15" />
          <path d="M85 55 C 95 55 95 75 85 75 C 75 75 75 55 85 55 Z" fill="#FACC15" />
          {/* 目 */}
          <circle cx="35" cy="45" r="5" fill="#334455" />
          <circle cx="65" cy="45" r="5" fill="#334455" />
          <circle cx="37" cy="43" r="1.5" fill="white" />
          <circle cx="67" cy="43" r="1.5" fill="white" />
          {/* くちばし */}
          <path d="M45 55 L 55 55 L 50 62 Z" fill="#F97316" />
          {/* 頭の毛 */}
          <path d="M50 15 Q 45 5 40 10" fill="none" stroke="#FFE066" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 15 Q 55 2 60 8" fill="none" stroke="#FFE066" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. 卵の殻 (SVG) */}
      <div
        className={`relative z-20 w-40 h-52 md:w-48 md:h-64 transition-transform duration-300 ${stage === 'shaking' ? 'animate-wiggle' : ''} ${stage === 'cracking' ? 'animate-shiver' : ''}`}
      >
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="eggGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
          </defs>

          {/* 下半分の殻 */}
          <path
            d="M5 65 L 15 62 L 25 68 L 35 60 L 45 68 L 55 62 L 65 70 L 75 62 L 85 68 L 95 62 L 95 65 C 95 105 75 125 50 125 C 25 125 5 105 5 65 Z"
            fill="url(#eggGradient)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${
              stage === 'hatched' ? 'translate-y-[10px] scale-[0.98]' : ''
            }`}
          />

          {/* 上半分の殻 - 割れると飛ぶ */}
          <g
            className={`transition-all duration-1000 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-[80%_80%] ${
              stage === 'hatched' ? 'translate-x-[20px] translate-y-[-40px] rotate-[30deg] opacity-0' : ''
            }`}
          >
            <path
              d="M50 5 C 20 5 5 35 5 65 L 15 62 L 25 68 L 35 60 L 45 68 L 55 62 L 65 70 L 75 62 L 85 68 L 95 62 L 95 65 C 95 35 80 5 50 5 Z"
              fill="url(#eggGradient)"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            {/* ひび割れ線 (Cracking stageのみ表示) */}
            <path
              d="M50 5 C 50 20 30 30 50 45"
              fill="none"
              stroke="#009DE0"
              strokeWidth="1"
              className={`transition-all duration-300 ${stage === 'cracking' || stage === 'hatched' ? 'opacity-40' : 'opacity-0'}`}
            />
          </g>

          {/* 内部からの光漏れ (Cracking stageのみ) */}
          <path
            d="M 5 65 L 15 62 L 25 68 L 35 60 L 45 68 L 55 62 L 65 70 L 75 62 L 85 68 L 95 62"
            fill="none"
            stroke="#D6DE26"
            strokeWidth="2"
            className={`transition-opacity duration-200 blur-sm ${stage === 'cracking' ? 'opacity-100' : 'opacity-0'}`}
          />
        </svg>
      </div>
    </div>
  );
};

// --- ★学習習慣セクション (Topページ挿入用) ---
const HabitSection = () => {
  return (
    <section
      id="habit"
      className="py-16 md:py-32 bg-[#F8FAFC] border-y border-[#334455]/5 relative overflow-hidden font-sans text-slate-800"
    >
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-[#009DE0]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-[#D6DE26]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10">
        <Reveal>
          {/* セクション見出し */}
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#009DE0] uppercase mb-4">
              Study Habit Support
            </p>
            <h2 className="font-bold text-[#334455]">
              {/* ターゲットへの呼びかけ：ゴシック体（font-sans）で見やすく */}
              <span className="block text-base md:text-xl text-[#334455]/80 mb-3 md:mb-4 font-sans tracking-wide">
                数学の
                <span className="text-[#009DE0] font-bold mx-1 text-lg md:text-2xl">「壁」</span>
                を感じ始めた高校生へ
              </span>

              {/* メインコピー：明朝体（font-serif）で強調 */}
              <span className="block text-2xl md:text-4xl leading-snug md:leading-normal font-serif tracking-tight">
                <span className="inline decoration-clone bg-gradient-to-b from-transparent from-[60%] to-[#D6DE26]/60 to-[60%] px-1 rounded-sm">
                  努力を空回りさせない、
                  <br className="md:hidden" />
                  ペースと通い方の話
                </span>
              </span>
            </h2>
          </div>
        </Reveal>

        {/* 2カラム本体 */}
        <div className="mt-8 space-y-8">
          <Reveal delay={200}>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#334455]/20"></div>
                <p className="text-sm font-bold text-[#334455]/60 tracking-wide">よくいただくお悩み</p>
              </div>

              {/* 1段目：声カードの段（高校生＋保護者さま） */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* 高校生の声 */}
                <div className="bg-white rounded-2xl border border-[#334455]/10 shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#009DE0]"></div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#009DE0]/10 flex items-center justify-center text-[#009DE0]">
                      <Smartphone size={20} />
                    </div>
                    <p className="text-base font-bold text-[#334455]">高校生の声</p>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      '高校に入ってから数学が急に難しくなり、授業についていけないと感じる。',
                      'いくら勉強しても数学の点数があまり伸びず、この先が不安になる。',
                      '理系に進みたいけれど、このままでは無理かもしれないと感じてしまう。',
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm md:text-base text-[#334455]/80 leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#009DE0]/40 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 保護者の声 */}
                <div className="bg-[#F8FAFC] rounded-2xl border border-[#334455]/5 shadow-inner p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EA5514]"></div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#EA5514]/10 flex items-center justify-center text-[#EA5514]">
                      <AlertCircle size={20} />
                    </div>
                    <p className="text-base font-bold text-[#334455]">保護者さまの声</p>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      '子どもには自主性を持ってほしいけれど、どこまで勉強に口出ししてよいか悩んでいる。',
                      'このまま数学の成績が低いままだと、将来の選択肢が狭まりそうで不安になる。',
                      '理系進学を諦めてほしくないが、今の成績を見ると本当に大丈夫か心配になる。',
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm md:text-base text-[#334455]/80 leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#EA5514]/40 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2段目：さとう数理塾の「答え」の段（横いっぱい） */}
          <Reveal delay={400}>
            <div>
              <div className="flex flex-col h-full bg-white rounded-3xl border-2 border-[#009DE0]/10 shadow-xl shadow-[#009DE0]/5 p-6 md:p-10 relative overflow-hidden">
                {/* 装飾タグ */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#D6DE26] rotate-45 transform"></div>
                <div className="absolute top-4 right-4 text-xs font-bold text-[#334455] bg-[#D6DE26] px-3 py-1 rounded-full shadow-sm z-10">
                  Solution
                </div>

                <div className="mb-6 md:mb-8">
                  <p className="text-xs font-bold text-[#009DE0] tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    さとう数理塾の「答え」
                  </p>

                  <h3 className="text-[#334455]">
                    <span className="block text-base md:text-lg font-bold mb-2 md:mb-3">
                      「時間・場所・やること」を整理
                    </span>
                    <span className="block text-xl md:text-2xl font-serif font-bold leading-relaxed tracking-tight">
                      <span className="relative inline-block z-10">
                        <span className="absolute inset-x-0 bottom-1 md:bottom-2 h-3 bg-[#D6DE26]/50 -z-10 rounded-sm transform -rotate-1 w-full"></span>
                        意志の力に頼らず、
                      </span>
                      <br className="md:hidden" />
                      勉強のペースを作ります。
                    </span>
                  </h3>
                </div>

                <div className="space-y-6 md:space-y-8 flex-1">
                  {/* Point 1 */}
                  <div className="flex gap-4 md:gap-5 group">
                    <div className="mt-1 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#009DE0]/10 flex items-center justify-center text-[#009DE0] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-[#334455] text-base md:text-lg mb-1 md:mb-2">
                        部活あとに寄れる、平日夜3時間の勉強タイム
                      </p>
                      <p className="text-sm md:text-base text-[#334455]/70 leading-relaxed">
                        平日18:50〜21:50のあいだなら、週1でも週5でも通えます。テスト前だけ回数を増やすこともできるので、
                        「勉強時間がとれない」「ペースが安定しない」という不安から先に解消します。
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex gap-4 md:gap-5 group">
                    <div className="mt-1 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#D6DE26]/20 flex items-center justify-center text-[#8C9400] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-[#334455] text-base md:text-lg mb-1 md:mb-2">
                        家でも学校でもない「半こもり空間」
                      </p>
                      <p className="text-sm md:text-base text-[#334455]/70 leading-relaxed">
                        個別ブースで周りの視線を気にせず、静かに勉強に集中できます。
                        数学の質問や、進路にかかわる不安も、落ち着いた環境で相談できます。
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex gap-4 md:gap-5 group">
                    <div className="mt-1 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#EA5514]/10 flex items-center justify-center text-[#EA5514] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Footprints className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-[#334455] text-base md:text-lg mb-1 md:mb-2">
                        迷ったときは、一緒に「今日やること」を整える
                      </p>
                      <p className="text-sm md:text-base text-[#334455]/70 leading-relaxed">
                        ふだんはAI教材や学校の課題を、自分のペースでどんどん進めてもらいます。
                        「何から手をつければいいか分からない」「テストまでの進め方を整理したい」
                        というときは、塾長が一緒に方針を相談し、必要に応じて進め方を調整します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const HomeLearningSection: React.FC = () => {
  return (
    <section id="home-learning" className="py-16 md:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-[#009DE0]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-tr from-[#D6DE26]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* 左カラム：見出し・導入文 */}
          <div className="flex flex-col gap-5 md:gap-6">
            <Reveal>
              <div className="flex flex-col gap-3 md:gap-4">
                <span className="text-[#009DE0] font-bold tracking-wider text-xs md:text-sm uppercase">
                  Home Learning Support
                </span>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#334455] leading-snug md:leading-tight">
                  <span className="bg-gradient-to-r from-[#D6DE26]/90 to-[#D6DE26]/50 bg-[length:100%_35%] bg-no-repeat bg-bottom px-1 rounded-sm box-decoration-clone">
                    家庭学習も、
                    <br />
                    同じ流れで進められます
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                さとう数理塾では、教室だけでなく
                <br className="hidden md:block" />
                ご家庭での勉強時間も整えられるように、
                <br className="hidden md:block" />
                AI教材と、AI質問チャットの仕組みを用意しています。
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-2 md:mt-4">
                <a
                  href="/counseling"
                  className="inline-flex items-center justify-center bg-[#009DE0] text-white font-bold rounded-full py-3 px-8 hover:bg-[#008ac4] transition-colors gap-2 text-base md:text-lg group shadow-sm hover:shadow-md"
                >
                  学習相談フォーム
                  <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-xs md:text-sm text-gray-500 mt-3 leading-relaxed">
                  家庭学習の進め方について詳しく知りたい方は、
                  <br className="sm:hidden" />
                  上記フォームからご相談ください。
                </p>
              </div>
            </Reveal>
          </div>

          {/* 右カラム：3つのポイントカード */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* POINT 1 */}
            <Reveal delay={300}>
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex gap-4 md:gap-5 hover:shadow-md transition-shadow duration-300 items-start">
                <div className="shrink-0 mt-1 md:mt-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#009DE0]">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#334455] mb-1 md:mb-2 flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-[#009DE0] text-[10px] md:text-sm font-extrabold bg-[#E0F2FE] px-2 py-0.5 rounded-full whitespace-nowrap">
                      POINT 1
                    </span>
                    <span>家でも続きから</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    塾で使っているAI教材を、そのまま自宅でも使えます。
                    「今日は何をやればいいか」を毎回一から考えなくてよいので、 勉強のペースが崩れにくくなります。
                  </p>
                </div>
              </div>
            </Reveal>

            {/* POINT 2 */}
            <Reveal delay={400}>
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex gap-4 md:gap-5 hover:shadow-md transition-shadow duration-300 items-start">
                <div className="shrink-0 mt-1 md:mt-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FEF9C3] flex items-center justify-center text-[#854D0E]">
                    <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-[#A3AD00]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#334455] mb-1 md:mb-2 flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-[#A3AD00] text-[10px] md:text-sm font-extrabold bg-[#FEF9C3] px-2 py-0.5 rounded-full whitespace-nowrap">
                      POINT 2
                    </span>
                    <span>質問はため込まない</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    数学の問題でつまずいたときは、 大学受験レベルまで対応できるAI質問チャットで、疑問点を解消できます。
                    解説を読んでも分からない問題を、そのまま放置しなくてすみます。
                  </p>
                </div>
              </div>
            </Reveal>

            {/* POINT 3 */}
            <Reveal delay={500}>
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex gap-4 md:gap-5 hover:shadow-md transition-shadow duration-300 items-start">
                <div className="shrink-0 mt-1 md:mt-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#EA5514]/10 flex items-center justify-center text-[#EA5514]">
                    <Home className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#334455] mb-1 md:mb-2 flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-[#EA5514] text-[10px] md:text-sm font-extrabold bg-[#EA5514]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      POINT 3
                    </span>
                    <span>進め方も一緒に見直す</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    「どこまで家で進めるか」「テスト前はどう配分するか」など、
                    家庭学習の組み立て方も、希望があれば面談で一緒に考えます。
                    塾と家で、勉強の話が一本線につながるようサポートします。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- メインコンポーネント ---
export default function NewHomepage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const scrollY = useScrollPosition();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 既存のギャラリー画像（Google Drive URLs）
  const galleryImages = [
    {
      src: 'https://lh3.googleusercontent.com/d/1YZemnybxdBF7zgX4bGrQvnvTYCKqWmlM=s0',
      alt: 'エントランスと本棚',
    },
    {
      src: 'https://lh3.googleusercontent.com/d/18WWMFN5jCNy_k5eM8x6bDSDo9qJI2OKr=s0',
      alt: '集中できる学習環境',
    },
    {
      src: 'https://lh3.googleusercontent.com/d/1dYZaS_o8O3IrbwioJlWPkJcEbgT7b-VZ=s0',
      alt: '個別指導デスク',
    },
    {
      src: 'https://lh3.googleusercontent.com/d/1NEyLD4KY4MIpD8E8pJF58BGt37qavNEI=s0',
      alt: 'AI学習タブレット',
    },
    {
      src: 'https://lh3.googleusercontent.com/d/1fA4R4476PQrHyip-NootpyjEO9V6umGe=s0',
      alt: '指導風景',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 selection:text-[#009DE0] overflow-x-hidden m-0 p-0">
      {/* アニメーション用スタイル定義 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
        @keyframes shiver {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-wiggle {
            animation: wiggle 0.5s ease-in-out infinite;
        }
        .animate-shiver {
            animation: shiver 0.2s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <DotNavigation activeSection={activeSection} />

      {/* ===========================================
          NEW HERO SECTION (Top) - Egg Hatching
         =========================================== */}
      <section
        id="top"
        className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#F0F9FF] -mt-[2px] pt-[2px]"
      >
        {/* 背景のグラデーション装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[5%] w-[50vw] h-[50vw] bg-gradient-to-b from-[#BAE6FD] to-transparent rounded-full opacity-70 blur-3xl animate-blob" />
          <div className="absolute bottom-[-20%] left-[5%] w-[40vw] h-[40vw] bg-gradient-to-t from-[#E0F2FE] to-transparent rounded-full opacity-70 blur-3xl animate-blob animation-delay-2000" />
        </div>

        {/* 幾何学的なグリッドライン */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,157,224,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,157,224,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>

        {/* センターロゴエリア */}
        <div
          className={`relative z-20 flex flex-col items-center justify-center transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {/* 卵アニメーション */}
          <div className="mb-2">
            <HatchingEgg />
          </div>

          {/* タイトルエリア */}
          <div className="relative text-center -mt-8">
            {/* メインタイトル (ロゴエリア) */}
            <h1 className="relative flex flex-col items-center pb-2">
              {/* 1. キャッチコピー部分 */}
              <span className="block text-xl md:text-2xl font-bold text-[#009DE0] mb-3 tracking-normal flex items-center justify-center gap-2">
                <span className="h-[1px] w-8 bg-[#009DE0]/50"></span>
                才能の殻を、破ろう
                <span className="h-[1px] w-8 bg-[#009DE0]/50"></span>
              </span>

              {/* 2. ロゴ画像表示 */}
              <img
                src="/images/sato-math-logo.png"
                alt="さとう数理塾のロゴ"
                className="h-16 md:h-24 w-auto object-contain mt-2"
              />
            </h1>

            {/* 装飾ライン */}
            <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#334455]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#009DE0]"></div>
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#334455]"></div>
            </div>
          </div>
        </div>

        {/* 浮遊する数学的モチーフ */}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <FloatingIcon
            icon={Pi}
            className="w-16 h-16 text-[#009DE0]/20 top-[15%] left-[10%] rotate-12"
            delay={0}
            duration={8}
            size={32}
          />
          <FloatingIcon
            icon={Ruler}
            className="w-12 h-12 text-[#334455]/20 top-[25%] left-[20%] -rotate-12"
            delay={1}
            duration={6}
            size={20}
          />
          <FloatingIcon
            icon={Lightbulb}
            className="w-20 h-20 text-[#D6DE26]/40 bottom-[20%] left-[15%] rotate-6"
            delay={2}
            duration={7}
            size={40}
          />
          <FloatingIcon
            icon={Variable}
            className="w-14 h-14 text-[#009DE0]/20 bottom-[35%] left-[8%] -rotate-45"
            delay={0.5}
            duration={9}
            size={24}
          />
          <FloatingIcon
            icon={Sigma}
            className="w-18 h-18 text-[#D6DE26]/40 top-[18%] right-[15%] -rotate-6"
            delay={1.5}
            duration={7.5}
            size={36}
          />
          <FloatingIcon
            icon={Calculator}
            className="w-14 h-14 text-[#009DE0]/20 top-[30%] right-[8%] rotate-12"
            delay={2.5}
            duration={6.5}
            size={24}
          />
          <FloatingIcon
            icon={BrainCircuit}
            className="w-24 h-24 text-[#009DE0]/10 bottom-[15%] right-[10%] rotate-3"
            delay={0.2}
            duration={10}
            size={48}
          />
          <FloatingIcon
            icon={Divide}
            className="w-12 h-12 text-[#334455]/20 bottom-[40%] right-[20%] rotate-45"
            delay={1.8}
            duration={5.5}
            size={20}
          />
        </div>

        {/* Scroll Indication */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#009DE0]/0 via-[#009DE0] to-[#009DE0]/0 mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* ===========================================
          OLD HERO SECTION (Moved to Concept)
         =========================================== */}
      <section
        id="concept"
        className="relative w-full min-h-[60vh] md:min-h-[100vh] flex items-center overflow-hidden bg-white"
      >
        {/* 背景画像エリア */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              transform: `translateY(${(scrollY - (typeof window !== 'undefined' ? window.innerHeight : 0)) * 0.4}px)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
              alt="教室のイメージ"
              className="w-full h-[120%] object-cover object-center brightness-[0.9]"
            />
          </div>
          {/* モダンなグラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 sm:to-[#009DE0]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
        </div>

        {/* コンテンツエリア */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pt-16 md:pt-0 pb-12 md:pb-32">
          <div className="max-w-4xl">
            <Reveal>
              {/* タグライン */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#009DE0]/20 shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-[#D6DE26] animate-pulse" />
                <p className="text-[#009DE0] font-bold tracking-wider text-xs md:text-sm">
                  「数学が急に難しくなった」と感じたら
                </p>
              </div>

              {/* 見出し */}
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight text-[#334455] mb-8 drop-shadow-sm tracking-tight">
                <span className="block mb-2 text-2xl md:text-4xl text-[#334455]/80 font-medium">数学が苦手でも、</span>
                <span className="relative inline-block text-[#009DE0]">
                  理系
                  <span className="absolute bottom-2 left-0 w-full h-3 md:h-6 bg-[#D6DE26]/30 -z-10 -rotate-1 rounded-sm mix-blend-multiply"></span>
                </span>
                をあきらめない
                <br />
                <span className="text-2xl md:text-4xl text-[#334455] font-medium mt-4 block">
                  高校生のための個別指導塾
                </span>
              </h2>

              {/* サブコピー */}
              <p className="text-base md:text-lg text-[#334455]/80 leading-relaxed font-medium mb-12 max-w-2xl pl-1 border-l-4 border-[#D6DE26]">
                日大三島・暁秀、
                <br className="hidden md:inline" />
                沼津東・三島北などの高校生が通っています。
                <span className="block mt-4">
                  「がんばっているのに数学が伸びない」「勉強が行き詰まっている」
                  <br className="hidden md:inline" />
                  そんな理系志望の高校生を支える個別塾です。
                </span>
                <span className="block mt-4">
                  多くのご家庭で、
                  <br className="hidden md:inline" />
                  「このままだと将来の選択肢が狭まりそうで不安」
                  <br className="hidden md:inline" />
                  というご相談が通塾のきっかけになっています。
                </span>
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href="/math-nigate"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full font-bold shadow-md hover:shadow-xl hover:bg-[#007bb5] hover:-translate-y-0.5 transition-all duration-300 min-w-[280px]"
                >
                  <Mail size={22} strokeWidth={2.5} />
                  <span className="text-lg tracking-wide">数学から立て直す</span>
                  <ArrowRight
                    size={20}
                    strokeWidth={2.5}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CampaignSection variant="homepage" campaign={campaignData} />

      <UserChoiceSection />

      {/* ===========================================
          共感・問題提起 (EMPATHY) - レイアウト修正版
         =========================================== */}
      <section className="relative z-20 px-4 md:px-6 mt-8 md:-mt-20">
        <div className="max-w-6xl mx-auto">
          {/* 背景装飾 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl z-[-1]">
            <DecorativeBlob color="bg-[#D6DE26]" className="top-0 right-0 opacity-20 w-96 h-96" />
            <DecorativeBlob
              color="bg-[#009DE0]"
              className="bottom-0 left-0 opacity-20 w-96 h-96 animation-delay-2000"
            />
          </div>

          <Reveal>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#009DE0] to-[#D6DE26]" />

              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                {/* 左カラム：フック・タイトル・導入 */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#009DE0]/10 rounded-2xl text-[#009DE0]">
                      <Mail size={32} />
                    </div>
                    <span className="text-sm font-bold text-[#009DE0] tracking-widest uppercase">To Parents</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#334455] leading-tight">
                    高校の数学が
                    <br />
                    <span className="relative inline-block text-[#009DE0] mt-1 mb-1">
                      「急に難しくなった」
                      <span className="absolute bottom-1 left-0 w-full h-2 bg-[#D6DE26]/20 -z-10 -rotate-1 rounded-sm"></span>
                    </span>
                    <br />
                    と感じている保護者さまへ
                  </h3>

                  <p className="text-base md:text-lg text-[#334455]/70 font-medium leading-relaxed">
                    「このまま何もしなければ、この子の将来の選択肢が狭まってしまうかもしれない」——
                    学力を立て直すきっかけは、たいていそんな心配から生まれます。
                  </p>

                  <p className="text-base md:text-lg text-[#334455]/70 font-medium leading-relaxed">
                    中学まではしっかり点が取れていたのに、高校に入ってからのテストで、数学の点数や順位が思うように伸びない。
                  </p>
                </div>

                {/* 右カラム：詳細・解決策 */}
                <div className="md:col-span-7 space-y-6">
                  <p className="text-base leading-relaxed text-[#334455]/80 font-medium">
                    沼津エリアの進学校に通う多くの生徒さんが、この「高校数学の壁」に戸惑っています。
                    <br />
                    いつものやり方が通用しなくなったり、解説を見ればわかるのに自分では解けなかったり...
                  </p>

                  {/* チェックリストをコンパクトなグリッドに */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#009DE0] flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-[#334455]">授業は聞いているのに点数が伸びない</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#009DE0] flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-[#334455]">「このままでは理系は無理かも」と不安</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-base leading-relaxed text-[#334455]/80 font-medium mb-4">
                      そんな不安を感じ始めたとき、それを単なる"勉強不足"で片付けると、かえって自信を失わせてしまいます。
                    </p>
                    <p className="text-base leading-relaxed text-[#334455]/80 font-medium bg-[#D6DE26]/10 p-4 rounded-xl border-l-4 border-[#D6DE26]">
                      さとう数理塾は、
                      <strong className="text-[#009DE0]">
                        「数学はまだ戦える」と思えるところまで、一緒に組み立て直していく場所
                      </strong>
                      でありたいと考えています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===========================================
          学習習慣セクション (HABIT)
         =========================================== */}
      <HabitSection />

      <HomeLearningSection />

      <MobileTableOfContents />

      {/* ===========================================
          ABOUT & FEATURES
         =========================================== */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] to-white">
        {/* 背景装飾 */}
        <DecorativeBlob color="bg-[#009DE0]" className="-top-24 -left-24 w-[500px] h-[500px] opacity-10" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* About Header */}
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#334455] mb-4">さとう数理塾について</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-8 bg-[#009DE0]"></span>
                <p className="text-[#009DE0] font-bold tracking-widest text-xs uppercase">About Us</p>
                <span className="h-[1px] w-8 bg-[#009DE0]"></span>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#009DE0]/20 aspect-[4/3] group border-4 border-white">
                <img
                  src="/images/sato-math-about.jpg"
                  alt="さとう数理塾 教室の様子"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#009DE0]/40 to-transparent opacity-60"></div>

                {/* 画像上の装飾 */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">
                  <p className="text-xs text-[#334455]/60 font-bold uppercase mb-1">Target Area</p>
                  <p className="text-lg font-bold text-[#334455]">沼津・三島エリアの高校生</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#334455] leading-snug relative">
                  <span className="relative z-10">
                    理系科目の「わからない」を
                    <br />
                    根本から解決する専門塾
                  </span>
                  <span className="absolute -bottom-2 left-0 w-24 h-3 bg-[#D6DE26]/40 -z-0"></span>
                </h3>
                <p className="text-[#334455]/80 leading-loose text-lg">
                  数学・物理・化学といった理系科目は、一度つまずくとリカバリーが難しい教科です。
                  当塾は沼津エリアの高校生を対象に、理系科目に特化した個別指導を提供しています。
                  また、理系大学受験において合否を分ける「英語」の指導も行い、理系進学をトータルでサポートします。
                </p>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#009DE0]">1:1</span>
                    <span className="text-xs font-bold text-[#334455]/60">完全個別</span>
                  </div>
                  <div className="w-[1px] h-12 bg-slate-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#009DE0]">AI</span>
                    <span className="text-xs font-bold text-[#334455]/60">弱点分析</span>
                  </div>
                  <div className="w-[1px] h-12 bg-slate-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#009DE0]">Web</span>
                    <span className="text-xs font-bold text-[#334455]/60">学習管理</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Features Grid */}
          <div id="features" className="scroll-mt-24">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-[#334455] mb-2">3つの特徴</h3>
                <span className="block w-16 h-1.5 bg-[#D6DE26] mx-auto rounded-full"></span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Reveal delay={100} className="h-full">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#009DE0]/10 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#009DE0] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-20 h-20 bg-[#F0F9FF] rounded-2xl flex items-center justify-center mb-6 text-[#009DE0] group-hover:bg-[#009DE0] group-hover:text-white transition-colors duration-300">
                    <BrainCircuit size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-[#334455] mb-4">理系特化の専門指導</h4>
                  <p className="text-sm leading-relaxed text-[#334455]/70">
                    数学・物理・化学の専門知識を持った講師が指導。学校の授業進度に合わせた補習から、国公立・難関私大の入試対策まで対応します。
                  </p>
                </div>
              </Reveal>

              {/* Feature 2 */}
              <Reveal delay={200} className="h-full">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#009DE0]/10 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#009DE0] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-20 h-20 bg-[#F0F9FF] rounded-2xl flex items-center justify-center mb-6 text-[#009DE0] group-hover:bg-[#009DE0] group-hover:text-white transition-colors duration-300">
                    <BookOpen size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-[#334455] mb-4">AI教材 × 1対1指導</h4>
                  <p className="text-sm leading-relaxed text-[#334455]/70">
                    AIで「どこでつまずいたか」を効率的に発見。その弱点を、講師との1対1の対話で深く理解するハイブリッドな指導スタイルです。
                  </p>
                </div>
              </Reveal>

              {/* Feature 3 */}
              <Reveal delay={300} className="h-full">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#009DE0]/10 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#D6DE26] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-20 h-20 bg-[#FCFDE7] rounded-2xl flex items-center justify-center mb-6 text-[#D6DE26] group-hover:bg-[#D6DE26] group-hover:text-white transition-colors duration-300">
                    <School size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-[#334455] mb-4">英語もしっかりサポート</h4>
                  <p className="text-sm leading-relaxed text-[#334455]/70">
                    理系大学受験でも英語は必須。理系の学習時間を圧迫しない効率的な英語指導で、トータルサポートを実現します。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          ACHIEVEMENTS
         =========================================== */}
      <section id="achievements" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#009DE0] rounded-full filter blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D6DE26] rounded-full filter blur-3xl mix-blend-screen animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">合格実績</h2>
                <p className="text-[#009DE0] font-bold tracking-widest text-xs uppercase">Achievements</p>
              </div>
              <p className="text-sm text-white/70">基礎からの積み重ねが、確かな結果につながっています。</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/20 hover:from-white/15 hover:to-white/10 transition-all duration-300 relative overflow-hidden group">
                {/* 光沢エフェクト */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                <h4 className="flex items-center gap-3 text-xl font-bold mb-8 text-[#009DE0]">
                  <GraduationCap size={28} />
                  大学合格実績
                </h4>
                <ul className="space-y-4">
                  {['東北大学', '東京理科大学', '芝浦工業大学', '立命館大学'].map((school, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-white/20 pb-3 group">
                      <span className="font-medium text-lg">{school}</span>
                      <CheckCircle2
                        size={16}
                        className="text-[#009DE0] opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </li>
                  ))}
                  <li className="text-xs text-right text-white/50 mt-2">など</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/20 hover:from-white/15 hover:to-white/10 transition-all duration-300 relative overflow-hidden group">
                {/* 光沢エフェクト */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                <h4 className="flex items-center gap-3 text-xl font-bold mb-8 text-[#D6DE26]">
                  <GraduationCap size={28} />
                  高校合格実績
                </h4>
                <ul className="space-y-4">
                  {['沼津東高校', '沼津西高校', '韮山高校', '三島北高校'].map((school, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-white/20 pb-3 group">
                      <span className="font-medium text-lg">{school}</span>
                      <CheckCircle2
                        size={16}
                        className="text-[#D6DE26] opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </li>
                  ))}
                  <li className="text-xs text-right text-white/50 mt-2">など</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===========================================
          GALLERY
         =========================================== */}
      <section id="gallery" className="py-24 bg-[#F8FAFC] overflow-hidden relative">
        <DecorativeBlob
          color="bg-[#009DE0]"
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 w-[800px] h-[800px]"
        />

        <Reveal>
          <div className="max-w-5xl mx-auto px-6 text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#334455] mb-2">教室の雰囲気</h2>
            <p className="text-[#009DE0] font-bold tracking-widest text-xs uppercase">Gallery</p>
          </div>
        </Reveal>

        <div className="relative w-full max-w-[1600px] mx-auto group z-10">
          <button
            onClick={() => scrollGallery('left')}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => scrollGallery('right')}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            <ChevronRight size={28} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-6 md:px-[max(2rem,calc(50vw-400px))] pb-12"
            style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-[85vw] md:w-[600px] h-[60vw] md:h-[400px] relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 group/image cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#009DE0]/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
            <div className="flex-shrink-0 w-4 md:w-1"></div>
          </div>
        </div>
      </section>

      {/* ===========================================
          ACCESS
         =========================================== */}
      <section id="access" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#334455] mb-2">教室情報・アクセス</h2>
                <p className="text-[#009DE0] font-bold tracking-widest text-xs uppercase mb-10">Access</p>

                <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200">
                  <dl className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-xs text-[#009DE0] font-bold uppercase tracking-wider w-24 pt-1">Name</dt>
                      <dd className="font-bold text-[#334455] text-lg">さとう数理塾</dd>
                    </div>
                    <div className="w-full h-[1px] bg-slate-200"></div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-xs text-[#009DE0] font-bold uppercase tracking-wider w-24 pt-1">Address</dt>
                      <dd className="text-[#334455]">
                        <div className="flex items-start gap-2">
                          <MapPin size={18} className="mt-1 flex-shrink-0 text-[#009DE0]" />
                          <span>
                            〒410-0052
                            <br />
                            静岡県沼津市沢田町1-3 牧原ビル102
                          </span>
                        </div>
                      </dd>
                    </div>
                    <div className="w-full h-[1px] bg-slate-200"></div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-xs text-[#009DE0] font-bold uppercase tracking-wider w-24 pt-1">Open</dt>
                      <dd className="text-[#334455]">
                        <p className="font-bold mb-1">月〜金</p>
                        <p className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-[#009DE0]" />
                          18:50〜21:50
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col justify-center space-y-6">
              <Reveal delay={200}>
                <a
                  href="https://calendar.google.com/calendar/u/0/embed?src=f927cc21f73c5d1b2a2ff1cd51ad58da3288ca06760c437b5e477ec43e87f4da@group.calendar.google.com&ctz=Asia/Tokyo&hl=ja&mode=MONTH&wkst=2&showTitle=0&showTabs=0&showPrint=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#009DE0] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#F0F9FF] rounded-2xl text-[#009DE0] group-hover:bg-[#009DE0] group-hover:text-white transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 mb-1">SCHEDULE</span>
                      <span className="font-bold text-[#334455] text-lg">今月のお休みを確認する</span>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-slate-300 group-hover:text-[#009DE0]" />
                </a>
              </Reveal>

              <Reveal delay={300}>
                <a
                  href="https://www.google.com/maps?q=%E9%9D%99%E5%B2%A1%E7%9C%8C%E6%B2%BC%E6%B4%A5%E5%B8%82%E6%B2%A2%E7%94%B0%E7%94%BA1-3+%E7%89%A7%E5%8E%9F%E3%83%93%E3%83%AB102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#009DE0] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#F0F9FF] rounded-2xl text-[#009DE0] group-hover:bg-[#009DE0] group-hover:text-white transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 mb-1">GOOGLE MAP</span>
                      <span className="font-bold text-[#334455] text-lg">Googleマップを開く</span>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-slate-300 group-hover:text-[#009DE0]" />
                </a>
              </Reveal>

              <Reveal delay={400}>
                <a
                  href="/join"
                  className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#009DE0] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#F0F9FF] rounded-2xl text-[#009DE0] group-hover:bg-[#009DE0] group-hover:text-white transition-colors">
                      <ClipboardList size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 mb-1">FLOW</span>
                      <span className="font-bold text-[#334455] text-lg">入塾までの流れを見る</span>
                      <p className="text-sm text-slate-500 mt-1">無料体験〜ご入塾までのステップを確認できます。</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-[#009DE0]" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          CONTACT / CTA
         =========================================== */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-gradient-to-br from-[#009DE0] to-[#007BB0] text-white relative overflow-hidden"
      >
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <DecorativeBlob color="bg-white" className="top-0 right-0 opacity-10 w-[600px] h-[600px] mix-blend-overlay" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight drop-shadow-md">
              まずは「学習相談」で、
              <br />
              今の不安をお聞かせください。
            </h2>
            <p className="text-white/80 mb-12 text-lg font-medium">
              無理な勧誘は一切いたしません。
              <br className="md:hidden" />
              無料体験授業も随時受け付けております。
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch md:items-center">
              {/* 無料体験 Button */}
              <a
                href="/trial"
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-white text-[#009DE0] rounded-full font-bold shadow-xl hover:bg-[#f8fafc] hover:scale-105 transition-all min-w-[300px]"
                onClick={() => {
                  trackMetaEvent('Lead', {
                    type: 'trial_cta',
                    pageType: 'home',
                    position: 'contact_section',
                  });
                  trackGAEvent('trial_cta_click', {
                    page_type: 'home',
                    position: 'contact_section',
                  });
                }}
              >
                <Mail size={24} />
                <span className="text-lg">無料体験に申し込む</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 学習相談 Button */}
              <a
                href="/counseling"
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-transparent text-white border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all min-w-[300px]"
                onClick={() => {
                  trackMetaEvent('Contact', {
                    type: 'counseling_cta',
                    pageType: 'home',
                    position: 'contact_section',
                  });
                  trackGAEvent('counseling_cta_click', {
                    page_type: 'home',
                    position: 'contact_section',
                  });
                }}
              >
                <MessageCircle size={24} />
                <span className="text-lg">学習相談に申し込む</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="https://lin.ee/blKCpXC"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-[#06C755] text-white rounded-full font-bold shadow-xl hover:bg-[#05b64d] hover:scale-105 transition-all min-w-[300px] max-w-[300px]"
                onClick={() => {
                  trackMetaEvent('Contact', {
                    type: 'line',
                    pageType: 'home',
                    position: 'contact_section',
                  });
                  trackGAEvent('line_click', {
                    type: 'line',
                    page_type: 'home',
                    position: 'contact_section',
                  });
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.5C7.2 2.5 3 5.8 3 9.8C3 12.3 4.5 14.5 6.8 15.7C7.6 16.1 7.2 17.6 7 18.2C6.9 18.6 6.8 19.3 7.4 19.4C7.9 19.5 8.7 19.1 10.3 18C10.3 18 10.3 18 10.3 18C10.9 18.1 11.4 18.1 12 18.1C16.8 18.1 21 14.8 21 10.8C21 6.8 16.8 2.5 12 2.5Z" />
                </svg>
                <span className="text-lg">LINEで質問する</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
