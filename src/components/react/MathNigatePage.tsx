import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  HeartHandshake,
  BrainCircuit,
  LineChart,
  MessageCircle,
  GraduationCap,
  Mail,
} from 'lucide-react';

// --- ブランドカラー定義 (トップページと共通) ---
// Primary (Sky Blue): #009DE0
// Secondary (Lime Yellow): #D6DE26
// Accent (Orange/Red): #F39800, #EA5514
// Text (Dark Navy): #334455
// Base: #F8FAFC

// --- このページ用のセクション定義 ---
const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'worry', label: 'こんなお悩み' },
  { id: 'reason', label: '伸び悩む理由' },
  { id: 'solution', label: '解決へのアプローチ' },
  { id: 'flow', label: '通塾イメージ' },
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

// --- PC用 ドットナビゲーション (共通スタイル) ---
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

// --- スマホ用 目次リスト (共通スタイル) ---
const MobileTableOfContents = () => {
  return (
    <div className="md:hidden px-6 py-8 bg-white/50 border-y border-[#009DE0]/10 backdrop-blur-sm">
      <p className="text-xs text-[#334455]/50 tracking-widest uppercase font-bold mb-4 text-center">- Page Menu -</p>
      <div className="grid grid-cols-2 gap-3">
        {SECTIONS.slice(1).map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#009DE0]/10 shadow-sm text-sm font-medium text-[#334455] active:scale-95 transition-transform"
          >
            {section.label}
            <ChevronDown size={14} className="text-[#009DE0] -rotate-90" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function MathNigatePage() {
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

      {/* Main Content (was <main> in original, now div to fit inside Layout) */}
      <div className="w-full overflow-hidden">
        {/* ===========================================
          HERO SECTION (Parents)
          ===========================================
        */}
        <section id="hero" className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className={`w-full h-full transition-opacity duration-[2000ms] ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* 保護者・勉強・相談イメージの画像 */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                alt="勉強を見守るイメージ"
                className="w-full h-[120%] object-cover opacity-[0.1] grayscale origin-center"
                style={{ transform: loaded ? 'scale(1.05)' : 'scale(1.0)', transition: 'transform 10s ease-out' }}
              />
            </div>
          </div>

          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-[#F8FAFC]/40"></div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-20">
            <div className="max-w-3xl text-left">
              <div
                className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <div className="inline-block mb-6 md:mb-8">
                  <p className="text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1">
                    保護者の方へ
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-snug text-[#334455] mb-8 drop-shadow-sm tracking-tight">
                  「数学が心配...」
                  <br className="md:hidden" />
                  その不安は、
                  <br />
                  <span className="text-[#009DE0] relative inline-block mr-2">
                    適切なアプローチ
                    <svg
                      className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#D6DE26]/40 -z-10"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                  で必ず変えられます。
                </h2>
                <p className="text-[#334455]/80 text-base md:text-lg leading-loose mb-10 max-w-2xl">
                  お子様の数学の点数を見て、将来の進路を諦めかけてはいませんか？
                  <br />
                  高校数学は一度つまずくと挽回が難しい教科ですが、
                  <br className="hidden md:block" />
                  原因を特定し、正しい順序で学び直せば、必ず自信を取り戻せます。
                  <br />
                  まずは保護者の方の「どうしたらいいの？」を、私たちにお聞かせください。
                </p>
              </div>

              <div
                className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#009DE0] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#008ac4] transition-all hover:-translate-y-1"
                  >
                    無料体験・学習相談を予約する <ArrowRight size={16} />
                  </a>
                  <a
                    href="#worry"
                    className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#334455] border border-[#334455]/10 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all"
                  >
                    詳しく読む <ChevronDown size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MobileTableOfContents />

        {/* ===========================================
          WORRY SECTION (Checklist)
          ===========================================
        */}
        <section id="worry" className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block">
                  Check List
                </span>
                <h3 className="font-serif text-xl md:text-3xl text-[#334455] leading-relaxed font-bold">
                  こんなご様子に、
                  <br className="md:hidden" />
                  心当たりはありませんか？
                </h3>
              </div>
            </Reveal>

            <div className="bg-[#F8FAFC] border border-[#009DE0]/10 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  '模試や定期テストで、数学だけ極端に点数が低い（あるいは下がってきた）',
                  '「勉強しなさい」と言っても、机に向かう時間が以前より減っている',
                  'テスト前には勉強しているはずなのに、本番になると真っ白になってしまう',
                  '数学の話をすると、急に不機嫌になったり、口をつぐんだりする',
                  '塾には通っているが、集団授業のスピードについていけていないようだ',
                ].map((item, index) => (
                  <Reveal key={index} delay={index * 100}>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mt-1 flex-shrink-0 text-[#EA5514]">
                        <AlertCircle size={24} />
                      </div>
                      <p className="text-[#334455] font-medium leading-relaxed">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={600}>
                <div className="mt-10 text-center">
                  <p className="text-[#334455]/80 leading-relaxed">
                    これらは、決して「お子様の努力不足」や「能力の問題」だけが原因ではありません。
                    <br className="hidden md:block" />
                    高校数学特有の<strong className="text-[#009DE0] font-bold">「構造的な難しさ」</strong>
                    が壁になっているケースがほとんどです。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          REASON SECTION
          ===========================================
        */}
        <section id="reason" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D6DE26]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold">
                  なぜ数学だけ、
                  <br className="md:hidden" />
                  こんなに伸びにくいのか？
                </h3>
                <p className="text-[#334455]/70 text-sm md:text-base max-w-2xl mx-auto leading-loose">
                  他の科目はなんとかなるのに、数学だけはどうにもならない。
                  <br />
                  それには、明確な理由があります。
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Reason 1 */}
              <Reveal delay={100} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#009DE0]/10 group-hover:scale-110 transition-transform duration-500">
                    <BrainCircuit size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span className="text-[#009DE0] mr-2">01.</span>
                    積み上げ型の科目だから
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    数学は「ピラミッド」のような科目です。高1の内容でつまずいたまま高2の内容を理解することは、土台のない場所に家を建てるようなもの。
                    <br />
                    <span className="border-b border-[#D6DE26] font-bold">どこから崩れているか</span>
                    を特定しない限り、今の授業を聞いても理解できません。
                  </p>
                </div>
              </Reveal>

              {/* Reason 2 */}
              <Reveal delay={200} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#D6DE26]/20 group-hover:scale-110 transition-transform duration-500">
                    <AlertCircle size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span
                      className="text-[#D6DE26] mr-2 text-shadow-sm"
                      style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}
                    >
                      02.
                    </span>
                    「わかったつもり」の罠
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    授業で先生の解説を聞いて「なるほど」と思っても、それは「理解した」だけ。
                    <br />
                    「自力で解ける」状態にはなっていません。
                    <br />
                    このギャップがテスト本番での
                    <span className="border-b border-[#D6DE26] font-bold">「手が動かない」</span>を引き起こします。
                  </p>
                </div>
              </Reveal>

              {/* Reason 3 */}
              <Reveal delay={300} className="h-full">
                <div className="h-full bg-white p-8 rounded-lg border-t-4 border-[#EA5514] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[#EA5514]/10 group-hover:scale-110 transition-transform duration-500">
                    <LineChart size={60} />
                  </div>
                  <h4 className="text-lg font-bold text-[#334455] mb-4 relative z-10">
                    <span className="text-[#EA5514] mr-2">03.</span>
                    一人では戻り方が不明
                  </h4>
                  <p className="text-[#334455]/80 text-sm leading-7 relative z-10">
                    「復習しなさい」と言われても、生徒本人は
                    <span className="border-b border-[#D6DE26] font-bold">「どの単元の、何がわからないのか」</span>
                    がわかりません。
                    <br />
                    結果、やみくもに問題を解いて自信を失う悪循環に陥ってしまいます。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          SOLUTION SECTION
          ===========================================
        */}
        <section id="solution" className="py-20 md:py-32 bg-[#F1F5F9] relative">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block">
                  Our Approach
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#334455] mb-4 font-bold">
                  さとう数理塾では、
                  <br className="md:hidden" />
                  こう変えていきます
                </h3>
              </div>
            </Reveal>

            {/* Solution Items - Layout similar to Top Page Features but with details */}
            <div className="space-y-8">
              {/* Item 1 */}
              <Reveal delay={100}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#009DE0]/10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#009DE0]/10 rounded-full flex items-center justify-center text-[#009DE0]">
                    <BrainCircuit size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">AI教材で「つまずきの根源」を特定</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      最新のAI教材を使用し、お子様がどこでつまずいているかを数分で診断します。
                      「高2だから高2の問題」ではなく、「中3の二次関数が怪しいからそこへ戻る」といった、
                      <span className="text-[#009DE0] font-bold bg-[#009DE0]/5 px-1">最短ルートの復習計画</span>
                      を立てます。
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Item 2 */}
              <Reveal delay={200}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#D6DE26]/30 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#D6DE26]/20 rounded-full flex items-center justify-center text-[#8C9400]">
                    <MessageCircle size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">1対1対話で「なぜ？」を解決</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      ただ答えを教えるのではなく、「どうしてこの式になると思う？」と対話をしながら進めます。
                      自分の言葉で説明できるようになることで、「わかったつもり」を排除し、
                      <span className="text-[#8C9400] font-bold bg-[#D6DE26]/10 px-1">テスト本番で使える力</span>
                      へ変えます。
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Item 3 */}
              <Reveal delay={300}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EA5514]/20 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-[#EA5514]/10 rounded-full flex items-center justify-center text-[#EA5514]">
                    <Clock size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#334455] mb-3">「演習」しながらその場で解決</h4>
                    <p className="text-[#334455]/80 leading-relaxed">
                      「授業を聞いて終わり」ではなく、実際に手を動かす時間を重視します。
                      学習中にわからないことがあればその都度指導が入るため、
                      <span className="text-[#EA5514] font-bold bg-[#EA5514]/5 px-1">疑問をその場で解消</span>
                      しながら進められます。
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===========================================
          FLOW SECTION
          ===========================================
        */}
        <section id="flow" className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h3 className="font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold">通い方のイメージ</h3>
                <p className="text-[#334455]/70">
                  部活や学校生活と両立しながら、無理なく続けられるペースをご提案します。
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={100}>
                <div className="border border-[#009DE0]/20 rounded-xl p-6 bg-white shadow-sm">
                  <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                    <Calendar className="text-[#009DE0]" size={24} />
                    <h4 className="font-bold text-[#334455]">数学が苦手な A君(高2)</h4>
                  </div>
                  <ul className="space-y-4 text-sm text-[#334455]/80">
                    <li className="flex gap-3">
                      <span className="font-bold w-12 text-[#009DE0] flex-shrink-0">通塾</span>
                      <span>
                        週2回 (19:30〜)。
                        <br />
                        予習に必要な過去単元はAIが自動提案。効率よくつまずきを解消しながら予習し、学校の授業を「復習の場」に変える。
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold w-12 text-[#009DE0] flex-shrink-0">目標</span>
                      <span>
                        「予習→学校の授業(復習)→定着」のサイクルを確立すること。
                        <br />
                        学習科学に基づいたアプローチで、無理なく平均点以上を目指す。
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="border border-[#D6DE26]/50 rounded-xl p-6 bg-white shadow-sm">
                  <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                    <GraduationCap className="text-[#8C9400]" size={24} />
                    <h4 className="font-bold text-[#334455]">理系志望の Bさん(高1)</h4>
                  </div>
                  <ul className="space-y-4 text-sm text-[#334455]/80">
                    <li className="flex gap-3">
                      <span className="font-bold w-12 text-[#8C9400] flex-shrink-0">通塾</span>
                      <span>
                        週3回 (19:30〜)。
                        <br />
                        数学は予習ペースが定着し、余裕が生まれた分、英語や理科の先取り学習にも着手。
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold w-12 text-[#8C9400] flex-shrink-0">目標</span>
                      <span>
                        数学での「貯金」を活かして全教科の評定平均を底上げし、希望する大学の指定校推薦枠を確実に掴む。
                      </span>
                    </li>
                  </ul>
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
                  まずは、現状を整理することから
                  <br />
                  始めませんか？
                </h3>
                <p className="text-[#334455]/80 leading-loose mb-8">
                  今の成績だけで、お子さんの可能性が決まるわけではありません。
                  <br />
                  「どこでつまずいているのか」「何をすればいいのか」がわかれば、
                  <br className="hidden md:block" />
                  お子さんの表情は驚くほど変わります。
                  <br />
                  <br />
                  無理な勧誘は一切いたしません。
                  <br />
                  まずは不安を解消し、新しい可能性を見つける場として、無料体験・相談をご活用ください。
                </p>
              </div>

              {/* Updated CTA buttons to match Top Page style (Split Free Trial & Consultation) */}
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
                  <span>LINEで気軽に質問する</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
