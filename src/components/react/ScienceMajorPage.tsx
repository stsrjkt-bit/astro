import React, { useState, useEffect, useRef } from 'react';
import {
  Atom,
  FlaskConical,
  Calculator,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  GraduationCap,
  BrainCircuit,
  Layers,
  HeartHandshake,
  BookOpen,
  Mail,
} from 'lucide-react';
import { trackMetaEvent } from '~/utils/metaPixel';

// --- ブランドカラー定義 (共通) ---
// Primary (Sky Blue): #009DE0
// Secondary (Lime Yellow): #D6DE26
// Accent (Orange/Red): #F39800, #EA5514
// Text (Dark Navy): #334455
// Base: #F8FAFC

// --- このページ用のセクション定義 ---
const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'vision', label: '将来と悩み' },
  { id: 'requirements', label: '理系入試の鍵' },
  { id: 'support', label: '指導の方針' },
  { id: 'cases', label: 'モデルケース' },
  { id: 'contact', label: 'ご相談' },
];

// --- アニメーションコンポーネント (共通) ---
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
  const [hasHydrated, setHasHydrated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasHydrated(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (entry.target) observer.unobserve(entry.target);
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

  const baseClasses = 'transition-all duration-1000 ease-out transform';
  const visibleClasses = 'opacity-100 translate-y-0 blur-0 scale-100';
  const hiddenClasses = 'opacity-0 translate-y-8 blur-sm scale-[0.98]';

  const animationClasses = !hasHydrated ? visibleClasses : isVisible ? visibleClasses : hiddenClasses;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- PC用 ドットナビゲーション (共通) ---
const DotNavigation = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          aria-label={section.label}
        >
          <span
            className={`absolute right-6 px-2 py-1 text-xs font-bold text-white bg-[#009DE0] rounded opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none whitespace-nowrap shadow-sm`}
          >
            {section.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-[#009DE0] border-[#009DE0] scale-125'
                : 'bg-transparent border-[#334455]/30 group-hover:border-[#009DE0] group-hover:bg-[#009DE0]/20'
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
    case 'vision':
      return <HelpCircle size={18} className="text-[#009DE0]" />;
    case 'requirements':
      return <MapPin size={18} className="text-[#009DE0]" />;
    case 'support':
      return <Lightbulb size={18} className="text-[#009DE0]" />;
    case 'cases':
      return <CheckCircle2 size={18} className="text-[#009DE0]" />;
    case 'contact':
      return <MessageCircle size={18} className="text-[#009DE0]" />;
    default:
      return <ChevronRight size={18} className="text-[#009DE0]" />;
  }
};

// --- スマホ用 目次リスト (共通) ---
const MobileTableOfContents = () => {
  return (
    <div className="md:hidden w-full relative overflow-hidden">
      {/* 背景装飾: ブランドカラーを使った淡いグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#009DE0]/5 via-[#F8FAFC] to-[#D6DE26]/10 pointer-events-none" />

      {/* 上下のボーダーもグラデーションで表現 */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009DE0]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009DE0]/20 to-transparent" />

      <div className="relative px-5 py-8">
        {/* タイトル周り: 装飾ラインを入れて華やかに */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#009DE0]"></span>
          <p className="text-xs font-bold tracking-[0.2em] text-[#009DE0] uppercase">Page Menu</p>
          <span className="h-[2px] w-8 bg-gradient-to-l from-transparent to-[#009DE0]"></span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SECTIONS.slice(1).map((section) => {
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex items-center justify-between p-3.5 rounded-xl shadow-sm transition-all duration-300 bg-white text-[#334455] hover:shadow-md hover:shadow-[#009DE0]/5 active:scale-95 border border-slate-100"
              >
                {/* 左端アクセントバー (ホバー時に表示) - 全項目共通にしました */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-[#D6DE26] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col">
                  {/* 英語ラベル（装飾用） */}
                  <span className="text-[10px] uppercase tracking-wider font-bold mb-0.5 text-[#009DE0]/70">
                    0{SECTIONS.indexOf(section)}
                  </span>
                  {/* 日本語ラベル */}
                  <span className="text-sm font-bold text-[#334455]">{section.label}</span>
                </div>

                {/* アイコンサークル */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full transition-transform group-hover:scale-110 bg-[#F8FAFC] group-hover:bg-[#009DE0]/10">
                  {getIcon(section.id)}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function ScienceMajorPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setLoaded(true);
  }, []);

  // スクロール検知
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 overflow-x-hidden relative">
      {/* ナビゲーション */}
      <DotNavigation activeSection={activeSection} />

      {/* 背景パターン */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* Removed Header */}

      <div className="w-full overflow-hidden">
        {/* ===========================================
          HERO SECTION (Rikei / High School Students)
          ===========================================
        */}
        <section id="hero" className="relative w-full min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden">
          {/* 背景画像エリア */}
          <div className="absolute inset-0 z-0">
            <div
              className={`w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* 理系・実験・学習イメージ */}
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
                alt="理系学習のイメージ"
                className="w-full h-full md:h-[120%] object-cover opacity-[0.1] origin-center"
                style={{
                  transform: loaded ? 'scale(1.05)' : 'scale(1.0)',
                  transition: 'transform 10s ease-out',
                }}
              />
            </div>
          </div>

          {/* --- 幾何学的な背景装飾レイヤー (MathNigatePageと統一) --- */}
          <div
            className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* 1. 方眼紙風ドットグリッド */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(#009DE0 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* 2. 右上の大きなふんわり円 (青) */}
            <div
              className={`absolute -top-20 -right-20 md:-top-32 md:-right-32 w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-[#009DE0]/20 to-transparent blur-[60px] md:blur-[100px] mix-blend-multiply transition-transform duration-[3000ms] ease-out ${loaded ? 'translate-y-0 scale-100' : '-translate-y-10 scale-90'}`}
            ></div>

            {/* 3. 左中ほどのアクセント (黄色) */}
            <div
              className={`absolute top-1/2 -left-20 md:-left-32 w-[50vw] h-[50vw] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-[#D6DE26]/30 to-transparent blur-[50px] md:blur-[80px] mix-blend-multiply transition-transform duration-[3000ms] delay-300 ease-out ${loaded ? 'translate-x-0' : '-translate-x-10'}`}
            ></div>

            {/* 4. 幾何学オブジェクト: 六角形（化学構造式イメージ） */}
            <div className="absolute top-[20%] right-[10%] md:right-[20%] opacity-20 hidden sm:block">
              <svg width="120" height="120" viewBox="0 0 100 100" className="animate-[spin_60s_linear_infinite]">
                <path
                  d="M50 5 L93.3 30 L93.3 80 L50 105 L6.7 80 L6.7 30 Z"
                  stroke="#334455"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M50 5 L50 55 M93.3 30 L50 55 M6.7 30 L50 55"
                  stroke="#334455"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* 5. 幾何学オブジェクト: サイン波（物理・数学イメージ） */}
            <div className="absolute bottom-[25%] right-[5%] md:right-[10%] opacity-20">
              <svg width="150" height="60" viewBox="0 0 150 60">
                <path d="M0 30 Q 37.5 0, 75 30 T 150 30" stroke="#009DE0" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/90 to-[#F8FAFC]/40"></div>

          {/* コンテンツエリア */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:pt-20">
            <div className="max-w-3xl text-left">
              {/* ラベル部分 */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <div className="inline-block mb-6 md:mb-8">
                  <p className="text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1">
                    高校生・保護者の皆様へ
                  </p>
                </div>
              </div>

              {/* 見出し部分（スマホ最適化済み・明朝体へ修正） */}
              <div
                className={`transition-all duration-1000 delay-500 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                {/* font-serif を復活させました */}
                <h2 className="font-serif font-bold text-[#334455] mb-8 drop-shadow-sm tracking-tight">
                  {/* 1行目: 数学・理科を軸に、 - PCでより存在感を出す */}
                  <span className="text-3xl md:text-[3.25rem] leading-relaxed md:leading-tight block">
                    <span className="relative inline-block mr-1 md:mr-2">
                      <span className="text-[#009DE0] relative z-10 font-extrabold">数学・理科</span>
                      {/* アンダーラインSVG: 太さを増して安定感を出す */}
                      <svg
                        className="absolute w-full h-2.5 md:h-4 bottom-0 md:bottom-0.5 left-0 text-[#D6DE26]/70 -z-10"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="10" fill="none" />
                      </svg>
                    </span>
                    を軸に、
                  </span>

                  {/* 2行目: 理系進学をめざすあなたへ。 - 1行目と一体感を持たせる */}
                  <span className="text-2xl md:text-[2.75rem] leading-relaxed md:leading-tight mt-2 md:mt-1 block">
                    理系進学をめざすあなたへ。
                  </span>
                </h2>

                {/* 本文エリア */}
                <p className="text-[#334455]/80 text-base md:text-lg leading-7 md:leading-loose mb-10 max-w-2xl">
                  {/* スマホでは改行タグを無効化し、自然な折り返しに任せる */}
                  理系大学への進学は、将来の選択肢を大きく広げます。
                  <br className="hidden md:block" />
                  しかし、数学IIIや物理・化学など、乗り越えるべきハードルが高いのも事実です。
                  <br className="hidden md:block" />
                  さとう数理塾は、あなたの「理系に行きたい」という気持ちを、
                  <br className="hidden md:block" />
                  確実な学力と自信に変えるための個別指導塾です。
                </p>
              </div>

              {/* ボタンエリア */}
              <div
                className={`transition-all duration-1000 delay-700 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    className="group inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#009DE0] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#008ac4] transition-all hover:-translate-y-1"
                    onClick={() => {
                      trackMetaEvent('Contact', {
                        type: 'scroll_to_contact',
                        pageType: 'rikei',
                        position: 'hero',
                      });
                    }}
                  >
                    無料体験・学習相談を予約する
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#vision"
                    className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#334455] border border-[#334455]/10 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all"
                  >
                    詳しく見る <ChevronDown size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MobileTableOfContents />

        {/* ===========================================
          VISION / WORRY SECTION
          ===========================================
        */}
        <section id="vision" className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block">
                  Current Situation
                </span>
                <h3 className="font-serif text-xl md:text-3xl text-[#334455] leading-relaxed font-bold">
                  こんな将来像や悩み、
                  <br className="md:hidden" />
                  ありませんか？
                </h3>
              </div>
            </Reveal>

            <div className="bg-[#F8FAFC] border border-[#009DE0]/10 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  '理系に進みたいけれど、具体的な進路や学部学科がまだぼんやりしている',
                  '数学・理科（物理・化学）の授業スピードが速く、消化不良気味になっている',
                  '部活動が忙しいが、現役での理系大学合格を諦めたくない',
                  '模試の偏差値に波があり、得意科目をどう伸ばせばいいかわからない',
                ].map((item, index) => (
                  <Reveal key={index} delay={index * 100}>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mt-1 flex-shrink-0 text-[#009DE0]">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-[#334455] font-medium leading-relaxed">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={600}>
                <div className="mt-10 text-center">
                  <p className="text-[#334455]/80 leading-relaxed">
                    理系の受験勉強は、積み上げが必要な科目が多く、計画性が問われます。
                    <br className="hidden md:block" />
                    今の成績が良いか悪いかよりも、
                    <strong className="text-[#009DE0] font-bold">「今日からどう積み上げるか」</strong>が合否を分けます。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          REQUIREMENTS SECTION (理系入試の鍵)
          ===========================================
        */}
        <section id="requirements" className="py-20 md:py-32 relative overflow-hidden">
          {/* 装飾用背景要素 */}
          <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#009DE0]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/4"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold">
                  今の理系入試で求められる力
                </h3>
                <p className="text-[#334455]/70 text-sm md:text-base max-w-2xl mx-auto leading-loose">
                  単なる暗記では太刀打ちできないのが理系科目の特徴です。
                  <br />
                  根本的な理解と、それを使いこなす思考力が問われます。
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Point 1 */}
              <Reveal delay={100} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#009DE0]/10 group-hover:scale-110 transition-transform duration-500">
                    <Atom size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span className="text-[#009DE0] mr-2">01.</span>
                    数学・理科の「積み上げ」
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    数学はI・A・II・B・C(・III)と繋がっており、理科（物理・化学）も基礎理論の上に応用が成り立ちます。
                    <br />
                    一つの穴がその後の学習すべてに影響するため、
                    <span className="border-b border-[#D6DE26] font-bold">基礎の完全な理解</span>が不可欠です。
                  </p>
                </div>
              </Reveal>

              {/* Point 2 */}
              <Reveal delay={200} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#D6DE26]/20 group-hover:scale-110 transition-transform duration-500">
                    <FlaskConical size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span
                      className="text-[#D6DE26] mr-2 text-shadow-sm"
                      style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}
                    >
                      02.
                    </span>
                    現象をイメージする力
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    特に物理や化学では、数式を追うだけでなく「何が起きているか」をイメージする力が重要です。
                    <br />
                    公式の丸暗記ではなく、
                    <span className="border-b border-[#D6DE26] font-bold">「なぜそうなるのか」</span>
                    を説明できるレベルを目指します。
                  </p>
                </div>
              </Reveal>

              {/* Point 3 */}
              <Reveal delay={300} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#EA5514] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#EA5514]/10 group-hover:scale-110 transition-transform duration-500">
                    <Calculator size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span className="text-[#EA5514] mr-2">03.</span>
                    記述力と論理構成
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    国公立や難関私大の理系入試では、答えだけでなく「導出過程」も評価されます。
                    <br />
                    日頃から論理的に答案を作成するトレーニングを行うことで、
                    <span className="border-b border-[#D6DE26] font-bold">得点力のある記述</span>を身につけます。
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={400}>
              <div className="mt-12 text-center">
                <p className="text-[#334455]/70 text-sm bg-white inline-block px-6 py-3 rounded-full border border-[#009DE0]/20 shadow-sm">
                  <span className="text-[#009DE0] font-bold mr-2">Info</span>
                  理系入試には英語も重要です。数学・理科を中心に、必要な英語学習についても合わせてご相談いただけます。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===========================================
          SUPPORT SECTION (指導の方針)
          ===========================================
        */}
        <section id="support" className="py-20 md:py-32 bg-[#F1F5F9] relative">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block">
                  Our Support
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#334455] mb-4 font-bold">
                  さとう数理塾ができること
                </h3>
              </div>
            </Reveal>

            <div className="space-y-8">
              {/* Support 1 */}
              <Reveal delay={100}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#009DE0]/10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#009DE0]/10 rounded-full flex items-center justify-center text-[#009DE0]">
                    <Layers size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">学年をまたいだ「戦略的な設計」</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      学校の進度はあくまで目安です。志望校のレベルや受験科目に合わせて、
                      「高2の夏までに数II・B・Cを終わらせる」「高3の春からは理科の演習に入る」など、
                      <span className="text-[#009DE0] font-bold bg-[#009DE0]/5 px-1">合格から逆算したカリキュラム</span>
                      を作成します。
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Support 2 */}
              <Reveal delay={200}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#D6DE26]/30 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#D6DE26]/20 rounded-full flex items-center justify-center text-[#8C9400]">
                    <BrainCircuit size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">AI教材で「見えない弱点」を特定</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      得意だと思っていた分野にも、意外な抜け漏れがあるものです。
                      最新のAI教材を活用して学習データを分析し、
                      <span className="text-[#8C9400] font-bold bg-[#D6DE26]/10 px-1">優先的に復習すべき単元</span>
                      をピンポイントで特定します。
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Support 3 */}
              <Reveal delay={300}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EA5514]/20 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#EA5514]/10 rounded-full flex items-center justify-center text-[#EA5514]">
                    <MessageCircle size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">1対1対話で「思考プロセス」を確認</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      正解した問題でも、「なぜその公式を使ったのか」を講師が問いかけます。
                      自分の言葉で説明することで理解が深まり、
                      <span className="text-[#EA5514] font-bold bg-[#EA5514]/5 px-1">
                        初見の問題にも対応できる応用力
                      </span>
                      を養います。
                    </p>
                    <p className="text-xs text-[#334455]/60 mt-3">
                      ※数学・理科の指導が中心ですが、必要に応じて英語の学習計画も一緒に立てることができます。
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          CASES SECTION (モデルケース)
          ===========================================
        */}
        <section id="cases" className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold">学年別モデルケース</h3>
                <p className="text-[#334455]/70">スタート時期に合わせた、無理のないペース配分の一例です。</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              <Reveal delay={100} className="h-full">
                <div className="border border-[#009DE0]/20 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                    <BookOpen className="text-[#009DE0]" size={24} />
                    <h4 className="font-bold text-[#334455]">高1からスタート</h4>
                  </div>
                  <div className="flex-1 text-sm text-[#334455]/80 space-y-3">
                    <p>
                      <strong className="block text-[#009DE0] mb-1">土台作りと先取り</strong>
                      数学I・Aの完全定着を目指しつつ、余裕があれば数学IIの先取りも実施。
                    </p>
                    <p>
                      理科基礎科目（物理基礎・化学基礎）の学校授業を大切にし、2年次以降の科目選択のアドバイスも行います。
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200} className="h-full">
                <div className="border border-[#D6DE26]/50 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                    <FlaskConical className="text-[#8C9400]" size={24} />
                    <h4 className="font-bold text-[#334455]">高2からスタート</h4>
                  </div>
                  <div className="flex-1 text-sm text-[#334455]/80 space-y-3">
                    <p>
                      <strong className="block text-[#8C9400] mb-1">理系科目の本格化</strong>
                      数学II・B・C、そして理科専門科目の学習が始まります。
                    </p>
                    <p>
                      部活との両立が一番大変な時期ですが、週ごとの学習ペースを管理し、入試に直結する重要単元を取りこぼさないようサポートします。
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} className="h-full">
                <div className="border border-[#EA5514]/30 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                    <GraduationCap className="text-[#EA5514]" size={24} />
                    <h4 className="font-bold text-[#334455]">高3からスタート</h4>
                  </div>
                  <div className="flex-1 text-sm text-[#334455]/80 space-y-3">
                    <p>
                      <strong className="block text-[#EA5514] mb-1">演習と総仕上げ</strong>
                      志望校の傾向に合わせた実践的な演習を中心に行います。
                    </p>
                    <p>
                      AI教材で弱点をピンポイントで補強しつつ、数IIIや理科の記述対策を強化。限られた時間で最大効果を狙います。
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          CLOSING / CTA SECTION
          ===========================================
        */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-b from-[#F8FAFC] to-[#009DE0]/5 border-t border-[#009DE0]/10"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Reveal>
              <div className="mb-10">
                <HeartHandshake size={48} className="mx-auto text-[#009DE0] mb-6" />
                <h3 className="font-serif text-2xl md:text-4xl text-[#334455] mb-6 font-bold">
                  今の成績だけで、
                  <br />
                  理系進学をあきらめなくていい。
                </h3>
                <p className="text-[#334455]/80 leading-loose mb-8">
                  理系の勉強は確かに難しいですが、正しいやり方で積み上げれば必ず結果はついてきます。
                  <br />
                  当塾と一緒に、あなたに合った学習計画を立ててみませんか？
                  <br />
                  <br />
                  進路のこと、科目のこと、まずはリラックスしてお話ししましょう。
                </p>
              </div>

              {/* Updated CTA buttons to match Top Page style (Split Free Trial & Consultation) */}
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10 flex-wrap">
                {/* Free Trial Button */}
                <a
                  href="/trial"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Lead', {
                      type: 'trial_cta',
                      pageType: 'rikei',
                      position: 'contact_section',
                    });
                  }}
                >
                  <Mail size={20} />
                  無料体験に申し込む
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Consultation Button */}
                <a
                  href="/counseling"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#009DE0] border-2 border-[#009DE0] rounded-full shadow-lg hover:bg-[#009DE0]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Contact', {
                      type: 'counseling_cta',
                      pageType: 'rikei',
                      position: 'contact_section',
                    });
                  }}
                >
                  {/* TODO: 将来、無料体験・学習相談フォームページができたら、このボタンのhrefを差し替える */}
                  <MessageCircle size={20} />
                  学習相談に申し込む
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* LINE Button */}
                <a
                  href="https://lin.ee/blKCpXC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] text-white rounded-full shadow-lg hover:bg-[#05b04d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Contact', {
                      type: 'line',
                      pageType: 'rikei',
                      position: 'contact_section',
                    });
                  }}
                >
                  <MessageCircle size={20} className="fill-white text-[#06C755]" />
                  <span>LINEで気軽に質問する</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Removed Footer */}
    </div>
  );
}
