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
  ChevronDown,
  Mail,
} from 'lucide-react';

// --- ブランドカラー定義 (Tailwindのクラス置換用メモ) ---
// Primary (Sky Blue): #009DE0
// Secondary (Lime Yellow): #D6DE26
// Accent (Orange/Red): #F39800, #EA5514
// Text (Dark Navy): #334455
// Base (White): #FFFFFF -> 変更: #F8FAFC (Slate-50) をベースに、カードをWhiteに
// Line Green: #06C755

// --- セクション定義 (ページ内スクロール用) ---
const SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'about', label: '当塾について' },
  { id: 'features', label: '3つの特徴' },
  { id: 'achievements', label: '合格実績' },
  { id: 'gallery', label: '教室の雰囲気' },
  { id: 'access', label: '教室情報' },
  { id: 'contact', label: 'お問い合わせ' }, // 追加
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

// --- スクロール連動アニメーション用コンポーネント (ブラー効果付き) ---
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

// --- PC用 ドットナビゲーション ---
const DotNavigation = ({ activeSection }: { activeSection: string }) => {
  // SSR時はnullを返す、または非表示にする (クライアントでのみ機能するため)
  // hydration errorを防ぐため、初期状態は非表示または固定値にするが、
  // ここではCSSで hidden md:flex となっているので、DOM構造があればOK
  // ただし activeSection の状態がクライアントとサーバーでずれる可能性があるため注意
  // 一旦そのままレンダリングする

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          aria-label={section.label}
        >
          {/* Label (Hoverで表示) */}
          <span
            className={`absolute right-6 px-2 py-1 text-xs font-bold text-white bg-[#009DE0] rounded opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none whitespace-nowrap shadow-sm`}
          >
            {section.label}
          </span>

          {/* Dot */}
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

// --- スマホ用 目次リスト ---
const MobileTableOfContents = () => {
  return (
    <div className="md:hidden px-6 py-8 bg-white/50 border-y border-[#009DE0]/10 backdrop-blur-sm">
      <p className="text-xs text-[#334455]/50 tracking-widest uppercase font-bold mb-4 text-center">- Page Menu -</p>
      <div className="grid grid-cols-2 gap-3">
        {SECTIONS.slice(1, -1).map(
          (
            section // TopとContact以外を表示
          ) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#009DE0]/10 shadow-sm text-sm font-medium text-[#334455] active:scale-95 transition-transform"
            >
              {section.label}
              <ChevronDown size={14} className="text-[#009DE0] -rotate-90" />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default function NewHomepage() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // Removed for integration
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const scrollY = useScrollPosition();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 初回ロード時のアニメーション
  useEffect(() => {
    setLoaded(true);
  }, []);

  // 現在のセクションを検知する処理
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // 画面の1/3まで来たら切り替え

      // 各セクションの位置を確認
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

  // const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Removed

  // ギャラリースクロール操作
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

  // Removed navLinks

  const galleryImages = [
    {
      src: 'https://lh3.googleusercontent.com/d/1YZemnybxdBF7zgX4bGrQvnvTYCKqWmlM=s0',
      alt: '明るく清潔感のある教室全体の様子',
    }, // 入口（本棚）
    { src: 'https://lh3.googleusercontent.com/d/18WWMFN5jCNy_k5eM8x6bDSDo9qJI2OKr=s0', alt: '集中できる自習スペース' },
    {
      src: 'https://lh3.googleusercontent.com/d/1dYZaS_o8O3IrbwioJlWPkJcEbgT7b-VZ=s0',
      alt: '1対1の個別指導を行うデスク',
    },
    {
      src: 'https://lh3.googleusercontent.com/d/1NEyLD4KY4MIpD8E8pJF58BGt37qavNEI=s0',
      alt: 'オンライン学習・AI教材用のタブレット端末',
    },
    { src: 'https://lh3.googleusercontent.com/d/1fA4R4476PQrHyip-NootpyjEO9V6umGe=s0', alt: '先生の指導風景' }, // 先生の机と青いパネル
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 overflow-x-hidden relative">
      {/* PC用 ドットナビゲーション */}
      <DotNavigation activeSection={activeSection} />

      {/* まぶしさ軽減用: 全体に微細なドットパターンを敷く */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* Header Removed */}

      <div className="w-full overflow-hidden">
        {/* ===========================================
          HERO SECTION
          ===========================================
        */}
        <section id="top" className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 will-change-transform"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div
              className={`w-full h-full transition-opacity duration-[2000ms] ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
                alt="学習風景"
                className="w-full h-[120%] object-cover opacity-[0.08] grayscale origin-center"
                style={{ transform: loaded ? 'scale(1.1)' : 'scale(1.0)', transition: 'transform 10s ease-out' }}
              />
            </div>
          </div>

          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/90 via-[#F8FAFC]/70 to-[#F8FAFC]/30"></div>

          <div
            className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            <div className="max-w-2xl text-left">
              <div
                className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <div className="inline-block mb-6 md:mb-8">
                  <p className="text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1">
                    沼津・理系特化型の個別指導
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl leading-tight md:leading-snug text-[#334455] mb-10 md:mb-12 drop-shadow-sm tracking-tight">
                  <span className="inline-block whitespace-nowrap">数学が苦手でも、</span>
                  <br />
                  <span className="inline-block whitespace-nowrap">
                    <span className="text-[#009DE0] relative inline-block">
                      理系
                      <svg
                        className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#D6DE26]/30 -z-10"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                    </span>
                    をあきらめない。
                  </span>
                </h2>
              </div>

              <div
                className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm md:text-base text-[#334455]/80 tracking-widest font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#D6DE26]" />
                    <span className="border-b border-[#334455]/20 pb-1">数学が苦手な高校生へ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#D6DE26]" />
                    <span className="border-b border-[#334455]/20 pb-1">理系大学をめざすあなたへ</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div
                className={`mt-10 md:hidden transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#009DE0] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#008ac4] transition-colors"
                >
                  まずは教室の様子を見る <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <div
              className="animate-bounce text-[#009DE0]/50 p-4 cursor-pointer hover:text-[#009DE0] transition-colors flex flex-col items-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
            >
              <span className="text-[10px] tracking-widest uppercase text-[#009DE0]">Scroll</span>
              <ArrowRight className="transform rotate-90" size={20} />
            </div>
          </div>
        </section>

        {/* スマホ用 目次 (Mobile Only) */}
        <MobileTableOfContents />

        {/* ===========================================
          EMPATHY SECTION
          ===========================================
        */}
        <section className="py-20 relative">
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-12">
                <h3 className="font-serif text-xl md:text-2xl text-[#334455] leading-relaxed">
                  「理系に行きたいけれど、
                  <br className="md:hidden" />
                  数学が...」
                  <br />
                  <span className="text-base md:text-lg text-[#334455]/70 mt-4 block font-sans font-normal">
                    そんなお悩み、抱えていませんか？
                  </span>
                </h3>
              </div>
            </Reveal>

            <div className="space-y-4 bg-white p-8 md:p-10 rounded-lg border border-[#009DE0]/10 shadow-sm hover:shadow-md transition-shadow duration-500">
              {[
                '理科や実験は好きなのに、数学のテストで点が取れない',
                '学校の集団授業が早すぎて、質問するタイミングがない',
                '「どこがわからないか」が、自分でもわからなくなっている',
                'このままでは理系大学は無理だと、諦めかけている',
              ].map((item, index) => (
                <Reveal key={index} delay={index * 150}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0 text-[#009DE0] group-hover:text-[#EA5514] transition-colors duration-500 transform group-hover:scale-110">
                      <CheckCircle2 size={22} />
                    </div>
                    <p className="text-[#334455] leading-relaxed font-medium">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="text-center mt-12">
                <p className="text-[#334455]/80 leading-loose text-sm md:text-base">
                  もし一つでも当てはまるなら、さとう数理塾にお任せください。
                  <br />
                  <strong className="text-[#334455] font-bold relative inline-block">
                    当塾は、「わからない」に寄り添うこと
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D6DE26]/40 -z-10 rounded-sm"></span>
                  </strong>
                  から始めます。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===========================================
          ABOUT SECTION
          ===========================================
        */}
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#F1F5F9] skew-y-3 origin-top-left transform -translate-y-20 z-0 scale-110"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6DE26] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 md:sticky md:top-32">
                <Reveal>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 relative inline-block font-bold">
                    さとう数理塾
                    <br />
                    について
                    <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[#D6DE26]"></span>
                  </h3>
                  <p className="text-xs text-[#334455]/50 mt-4 tracking-widest uppercase font-bold">About Us</p>
                </Reveal>
              </div>

              <div className="md:col-span-8 space-y-12 text-[#334455]/80 leading-loose text-justify">
                <Reveal delay={200}>
                  <div className="bg-white shadow-sm p-6 md:p-8 -m-6 md:m-0 rounded-lg transition-all duration-500 border border-[#009DE0]/5">
                    <h4 className="text-lg text-[#334455] font-serif mb-4 border-l-4 border-[#009DE0] pl-4 font-bold">
                      沼津の理系専門個別指導
                    </h4>
                    <p>
                      さとう数理塾は、沼津を拠点に理系科目に特化した個別指導を行っています。
                      AI教材と1対1の個別指導を組み合わせ、生徒一人ひとりのペースで「わからない」から一歩ずつ抜け出すための塾です。
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="bg-white shadow-sm p-6 md:p-8 -m-6 md:m-0 rounded-lg transition-all duration-500 border border-[#009DE0]/5">
                    <h4 className="text-lg text-[#334455] font-serif mb-4 border-l-4 border-[#009DE0] pl-4 font-bold">
                      生徒の可能性を最大限に
                    </h4>
                    <p>
                      数学・理科の基礎から応用、そして理系大学受験に欠かせない英語まで、目標に合わせた丁寧な指導を心がけています。
                      特に「数学の授業についていけない」といった悩みを持つ生徒さんにこそ、当塾の指導が必要です。
                      「わからない」を「わかる」に変え、さらに「できる」へと導く。それが当塾の使命です。
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="bg-white p-8 rounded-lg border border-[#009DE0]/20 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-2 right-2 text-[#009DE0]/5 transform rotate-12 scale-150 pointer-events-none">
                      <MessageCircle size={100} />
                    </div>

                    <p className="text-sm text-[#009DE0] mb-4 font-bold tracking-wider flex items-center gap-2 relative z-10">
                      <MessageCircle size={18} className="fill-[#009DE0]/10" />
                      保護者様へ
                    </p>
                    <p className="leading-relaxed relative z-10 text-[#334455]/90">
                      沼津で数学の個別指導を探されている方から、「子供が質問しやすくなった」「テストの点数が安定してきた」と信頼をいただいています。
                      集団授業では埋もれてしまいがちな小さなつまずきも見逃さず、大学受験に向けて着実な一歩を共に歩みましょう。
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===========================================
          FEATURES SECTION
          ===========================================
        */}
        <section id="features" className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16 md:mb-24">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold">3つの特徴</h3>
                <p className="text-xs text-[#334455]/50 tracking-widest uppercase font-bold">Features</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Feature 1 */}
              <Reveal delay={100} className="h-full">
                <div className="bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold">
                    01
                  </div>

                  <h4 className="font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold">個別対応</h4>

                  <p className="text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10">
                    「なんとなく」で終わらせない
                  </p>

                  <p className="text-sm leading-7 text-[#334455]/80 relative z-10">
                    一人ひとりの理解度に合わせた完全個別指導です。
                    AI教材の効率的な演習と、講師による丁寧な対話型指導を組み合わせ、着実に力をつけます。
                  </p>
                </div>
              </Reveal>

              {/* Feature 2 */}
              <Reveal delay={300} className="h-full">
                <div className="bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold">
                    02
                  </div>

                  <h4 className="font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold">理系特化</h4>

                  <p className="text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10">
                    理数力の土台を作る
                  </p>

                  <p className="text-sm leading-7 text-[#334455]/80 relative z-10">
                    数学・物理・化学などの理系科目を専門的に指導します。
                    また、理系大学受験で避けて通れない「英語」の対策も万全。理系科目の負担を減らしながら、バランスよく合格力を高めます。
                  </p>
                </div>
              </Reveal>

              {/* Feature 3 */}
              <Reveal delay={500} className="h-full">
                <div className="bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold">
                    03
                  </div>

                  <h4 className="font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold">実績重視</h4>

                  <p className="text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10">
                    合格まで二人三脚
                  </p>

                  <p className="text-sm leading-7 text-[#334455]/80 relative z-10">
                    基礎固めから難関大学受験まで、確かな実績に基づいた指導を提供します。
                    定期テストの点数アップはもちろん、沼津エリアからの理系大学受験対策まで、最適なカリキュラムを作成。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          ACHIEVEMENTS SECTION
          ===========================================
        */}
        <section id="achievements" className="py-20 md:py-32 relative">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold">合格実績</h3>
                <p className="text-xs text-[#334455]/50 tracking-widest uppercase font-bold">Achievements</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* University */}
              <Reveal delay={200}>
                <div className="bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {/* 装飾アイコン */}
                  <div className="absolute top-[-20px] right-[-20px] text-[#009DE0]/5 rotate-12">
                    <GraduationCap size={150} />
                  </div>

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-[#009DE0]/10 rounded-full text-[#009DE0]">
                      <GraduationCap size={24} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#334455]">大学合格実績</h4>
                  </div>
                  <ul className="space-y-4 relative z-10">
                    {['東北大学', '東京理科大学', '芝浦工業大学', '立命館大学'].map((school, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[#334455] font-medium border-b border-dashed border-gray-100 pb-2 last:border-0"
                      >
                        <CheckCircle2 size={18} className="text-[#009DE0] flex-shrink-0" />
                        <span>{school}</span>
                      </li>
                    ))}
                    <li className="text-right text-sm text-[#334455]/50 mt-2 font-medium">など</li>
                  </ul>
                </div>
              </Reveal>

              {/* High School */}
              <Reveal delay={400}>
                <div className="bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {/* 装飾アイコン */}
                  <div className="absolute top-[-20px] right-[-20px] text-[#D6DE26]/20 rotate-12">
                    <GraduationCap size={150} />
                  </div>

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-[#D6DE26]/30 rounded-full text-[#8c9400]">
                      <GraduationCap size={24} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#334455]">高校合格実績</h4>
                  </div>
                  <ul className="space-y-4 relative z-10">
                    {['沼津東高校', '沼津西高校', '韮山高校', '三島北高校'].map((school, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[#334455] font-medium border-b border-dashed border-gray-100 pb-2 last:border-0"
                      >
                        <CheckCircle2 size={18} className="text-[#D6DE26] flex-shrink-0" />
                        <span>{school}</span>
                      </li>
                    ))}
                    <li className="text-right text-sm text-[#334455]/50 mt-2 font-medium">など</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          GALLERY SECTION
          ===========================================
        */}
        <section id="gallery" className="py-20 md:py-32 overflow-hidden">
          <Reveal>
            <div className="max-w-5xl mx-auto px-6 text-center mb-12">
              <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold">教室の雰囲気</h3>
              <p className="text-xs text-[#334455]/50 tracking-widest uppercase font-bold">Gallery</p>
            </div>
          </Reveal>

          <div className="relative w-full max-w-[1400px] mx-auto group">
            <button
              onClick={() => scrollGallery('left')}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300"
              aria-label="前の写真へ"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scrollGallery('right')}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300"
              aria-label="次の写真へ"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-8 px-6 md:px-[max(1rem,calc(50vw-500px))]"
              style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-[85vw] md:w-[600px] h-[50vw] md:h-[400px] relative rounded-lg overflow-hidden bg-gray-100 group/image cursor-pointer shadow-md"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-1000 ease-out brightness-110 saturate-125 contrast-105"
                    loading="lazy"
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-6 md:w-1"></div>
            </div>

            <div className="md:hidden text-center mt-6 text-xs text-[#334455]/60 tracking-widest animate-pulse">
              Swipe <ArrowRight className="inline w-3 h-3 ml-1" />
            </div>
          </div>
        </section>

        {/* ===========================================
          ACCESS SECTION
          ===========================================
        */}
        <section id="access" className="py-20 md:py-32 relative border-t border-[#009DE0]/10">
          <div className="absolute inset-0 bg-[#F1F5F9] z-0"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16">
              <Reveal>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold">教室情報・アクセス</h3>
                  <p className="text-xs text-[#334455]/50 tracking-widest uppercase mb-10 font-bold">Access</p>

                  <dl className="space-y-8 text-sm md:text-base">
                    <div className="group">
                      <dt className="text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold">
                        教室名
                      </dt>
                      <dd className="font-medium text-[#334455]">さとう数理塾</dd>
                    </div>

                    <div className="group">
                      <dt className="text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold">
                        住所
                      </dt>
                      <dd className="flex items-start gap-2 text-[#334455] leading-relaxed">
                        <MapPin size={18} className="mt-1 flex-shrink-0 text-[#009DE0]" />
                        <span>
                          〒410-0052
                          <br />
                          静岡県沼津市沢田町1-3 牧原ビル102
                        </span>
                      </dd>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <dt className="text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold">
                          開校日
                        </dt>
                        <dd className="text-[#334455]">月〜金</dd>
                      </div>
                      <div className="group">
                        <dt className="text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold">
                          開校時間
                        </dt>
                        <dd className="flex items-center gap-2 text-[#334455]">
                          <Clock size={16} className="text-[#009DE0]" />
                          18:50〜21:50
                        </dd>
                      </div>
                    </div>

                    <div className="group">
                      <dt className="text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold">
                        休校日
                      </dt>
                      <dd className="text-[#334455] leading-relaxed">
                        土日・8月のお盆・年末年始
                        <span className="block text-xs text-[#334455]/60 mt-2">
                          ※ 詳しい休校日程は下記の「今月のお休み（Googleカレンダー）」からご確認ください。
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <div className="flex flex-col justify-center space-y-4">
                <Reveal delay={200}>
                  <a
                    href="https://calendar.google.com/calendar/u/0/embed?src=f927cc21f73c5d1b2a2ff1cd51ad58da3288ca06760c437b5e477ec43e87f4da@group.calendar.google.com&ctz=Asia/Tokyo&hl=ja&mode=MONTH&wkst=2&showTitle=0&showTabs=0&showPrint=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border border-[#009DE0]/20 bg-white hover:border-[#009DE0] hover:shadow-md transition-all duration-300 transform hover:-translate-x-1 relative overflow-hidden rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-[#009DE0]/10 rounded-full group-hover:bg-[#009DE0] transition-colors duration-300">
                        <Calendar
                          className="text-[#009DE0] group-hover:text-white transition-colors"
                          strokeWidth={1.5}
                          size={20}
                        />
                      </div>
                      <span className="text-sm md:text-base font-bold text-[#334455]">
                        今月のお休みを
                        <br className="md:hidden" /> Googleカレンダーで見る
                      </span>
                    </div>
                    <ExternalLink size={18} className="text-[#009DE0]/50 group-hover:text-[#009DE0]" />
                  </a>
                </Reveal>

                <Reveal delay={300}>
                  <a
                    href="https://www.google.com/maps?q=%E9%9D%99%E5%B2%A1%E7%9C%8C%E6%B2%BC%E6%B4%A5%E5%B8%82%E6%B2%A2%E7%94%B0%E7%94%BA1-3+%E7%89%A7%E5%8E%9F%E3%83%93%E3%83%AB102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border border-[#009DE0]/20 bg-white hover:border-[#009DE0] hover:shadow-md transition-all duration-300 transform hover:-translate-x-1 relative overflow-hidden rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-[#009DE0]/10 rounded-full group-hover:bg-[#009DE0] transition-colors duration-300">
                        <MapPin
                          className="text-[#009DE0] group-hover:text-white transition-colors"
                          strokeWidth={1.5}
                          size={20}
                        />
                      </div>
                      <span className="text-sm md:text-base font-bold text-[#334455]">
                        Googleマップで
                        <br className="md:hidden" /> 教室の場所を見る
                      </span>
                    </div>
                    <ExternalLink size={18} className="text-[#009DE0]/50 group-hover:text-[#009DE0]" />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===========================================
          CONTACT / CONVERSION SECTION (New)
          ===========================================
        */}
        <section id="contact" className="py-20 md:py-32 bg-[#F0F7FF] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#009DE0] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#06C755] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <Reveal>
              <h3 className="font-serif text-xl md:text-2xl text-[#334455] mb-6 leading-relaxed">
                無理な勧誘は一切いたしません。
                <br />
                <span className="text-sm md:text-base text-[#334455]/80 mt-4 block font-sans">
                  まずは不安を解消し、新しい可能性を見つける場として、
                  <br className="md:hidden" />
                  無料体験・相談をご活用ください。
                </span>
              </h3>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10 flex-wrap">
                {/* Free Trial Button */}
                <a
                  href="#"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                >
                  {/* TODO: 将来、無料体験・学習相談フォームページができたら、このボタンのhrefを差し替える */}
                  <Mail size={20} />
                  無料体験に申し込む
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

              {/* Consultation Button */}
              <a
                href="/counseling"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#009DE0] border-2 border-[#009DE0] rounded-full shadow-lg hover:bg-[#009DE0]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
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
                >
                  <MessageCircle size={20} className="fill-white text-[#06C755]" />
                  LINEで気軽に質問する
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Footer Removed */}
    </div>
  );
}
