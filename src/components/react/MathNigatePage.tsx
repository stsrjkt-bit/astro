import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  HeartHandshake,
  BrainCircuit,
  LineChart,
  MessageCircle,
  GraduationCap,
  Mail,
  ClipboardList,
} from 'lucide-react';

import { trackMetaEvent } from '~/utils/metaPixel';
import { trackGAEvent } from '~/utils/ga4';
import { CampaignSection, type CampaignData } from '~/components/react/CampaignSection';

// --- このページ用キャンペーンデータ ---
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
  cautionText:
    '※ 本ボタン経経由の予約のみ割引が適用されます。他ページからのご予約は対象外となりますのでご注意ください。',
  campaignId: 'xmas_high1_2025',
};

// --- このページ用のセクション定義 ---
const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'solution', label: 'アプローチ' },
  { id: 'worry', label: 'こんなお悩み' },
  { id: 'reason', label: '伸び悩む理由' },
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

// アイコンのマッピング
const getIcon = (id: string) => {
  switch (id) {
    case 'worry':
      return <HelpCircle size={18} className="text-[#009DE0]" />;
    case 'reason':
      return <MapPin size={18} className="text-[#009DE0]" />;
    case 'solution':
      return <Lightbulb size={18} className="text-[#009DE0]" />;
    case 'flow':
      return <CheckCircle2 size={18} className="text-[#009DE0]" />;
    case 'contact':
      return <MessageCircle size={18} className="text-[#009DE0]" />;
    default:
      return <ChevronRight size={18} className="text-[#009DE0]" />;
  }
};

// --- スマホ用 目次リスト (共通スタイル) ---
const MobileTableOfContents = () => {
  return (
    <div className="md:hidden w-full relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#009DE0]/5 via-[#F8FAFC] to-[#D6DE26]/10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009DE0]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009DE0]/20 to-transparent" />

      <div className="relative px-5 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#009DE0]" />
          <p className="text-xs font-bold tracking-[0.2em] text-[#009DE0] uppercase">Page Menu</p>
          <span className="h-[2px] w-8 bg-gradient-to-l from-transparent to-[#009DE0]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SECTIONS.slice(1).map((section) => {
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex items-center justify-between p-3.5 rounded-xl shadow-sm transition-all duration-300 bg-white text-[#334455] hover:shadow-md hover:shadow-[#009DE0]/5 active:scale-95 border border-slate-100"
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-[#D6DE26] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold mb-0.5 text-[#009DE0]/70">
                    0{SECTIONS.indexOf(section)}
                  </span>
                  <span className="text-sm font-bold text-[#334455]">{section.label}</span>
                </div>
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

// --- フローセクションのデータ定義 ---
const studentCases = [
  {
    id: 'A',
    delay: 100,
    theme: 'blue',
    icon: Calendar,
    title: '数学が苦手な Aさん(高1)',
    attendance: (
      <>
        週2回 (19:30〜)。
        <br />
        予習に必要な過去単元はAIが自動提案。効率よくつまずきを解消しながら予習し、学校の授業を「復習の場」に変える。
      </>
    ),
    goal: (
      <>
        「予習→学校の授業(復習)→定着」のサイクルを確立すること。
        <br />
        学習科学に基づいたアプローチで、無理なく平均点以上を目指す。
      </>
    ),
  },
  {
    id: 'B',
    delay: 200,
    theme: 'yellow',
    icon: GraduationCap,
    title: '理系志望の Bさん(高2)',
    attendance: (
      <>
        週3回 (19:30〜)。
        <br />
        数学は予習ペースが定着し、余裕が生まれた分、英語や理科の先取り学習にも着手。
      </>
    ),
    goal: <>数学での「貯金」を活かして全教科の評定平均を底上げし、希望する大学の指定校推薦枠を確実に掴む。</>,
  },
  {
    id: 'C',
    delay: 300,
    theme: 'orange',
    icon: Lightbulb,
    title: '理系の選択肢を残したい Cさん(高2)',
    attendance: (
      <>
        週2回 (19:30〜) をベースに、テスト週間や大会前の週はお休みもあり。
        <br />
        その代わり来られた日は、AI教材で「今週どこまで予習しておくか」を整理。
        <br />
        塾で予習 → 学校の授業で復習 のリズムだけは崩さないようにする。
      </>
    ),
    goal: (
      <>部活の忙しさに波があっても、数学・理科だけでも学年の上位に入れるようにしながら、国公立理系の選択肢を守る。</>
    ),
  },
] as const;

const themeClasses = {
  blue: {
    border: 'border-[#009DE0]/20',
    text: 'text-[#009DE0]',
  },
  yellow: {
    border: 'border-[#D6DE26]/50',
    text: 'text-[#8C9400]',
  },
  orange: {
    border: 'border-[#EA5514]/20',
    text: 'text-[#EA5514]',
  },
};

type StudentCase = (typeof studentCases)[number];

const StudentCaseCard = ({ caseData }: { caseData: StudentCase }) => {
  const Icon = caseData.icon;
  const classes = themeClasses[caseData.theme];

  return (
    <div className={`border rounded-xl p-6 bg-white shadow-sm ${classes.border}`}>
      <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
        <Icon className={classes.text} size={24} />
        <h4 className="font-bold text-[#334455]">{caseData.title}</h4>
      </div>
      <ul className="space-y-4 text-sm text-[#334455]/80">
        <li className="flex gap-3">
          <span className={`font-bold w-12 flex-shrink-0 ${classes.text}`}>通塾</span>
          <span>{caseData.attendance}</span>
        </li>
        <li className="flex gap-3">
          <span className={`font-bold w-12 flex-shrink-0 ${classes.text}`}>目標</span>
          <span>{caseData.goal}</span>
        </li>
      </ul>
    </div>
  );
};

// --- 診断ロジック用の定数 ---
const DIAGNOSIS_ITEMS = [
  {
    text: '模試や定期テストで、他教科はそこそこ取れているのに、数学だけがじわじわ足を引っ張っている気がする',
    category: 'A',
  },
  { text: '自習室や塾には通っていて勉強時間も取っているのに、数学の点数だけが安定しない', category: 'A' },
  {
    text: 'とりあえず問題集は進めているものの、これで十分なのか自分でも手応えがなく、勉強の方向性に迷っているように見える',
    category: 'B',
  },
  {
    text: '解説を読めば「わかった気にはなる」のに、類題になると手が止まり、テスト本番では得点につながらない',
    category: 'B',
  },
  {
    text: '部活の練習や大会で平日の時間がタイトになりがちで、勉強はしているつもりなのに、数学だけ「積み残し」が増えているように見える',
    category: 'C',
  },
] as const;

const DIAGNOSIS_RESULTS = {
  A: {
    title: '診断結果：数学だけ成績バランス崩れタイプです',
    content: (
      <>
        他の教科はそこそこ取れているのに、数学だけがじわじわ足を引っ張っているタイプです。
        <br />
        勉強時間自体はある程度取れていることが多く、「やっていない」わけではないのに成績だけ崩れていくことで、お子様もご家族もモヤモヤしやすい状態です。
        <br />
        さとう数理塾では、AI教材で「どこから崩れ始めているのか」を特定し、土台から立て直すことで、数学だけのバランス崩れを整えていきます。
      </>
    ),
  },
  B: {
    title: '診断結果：がんばり方・理解のズレタイプです',
    content: (
      <>
        問題集を進めたり、解説を読んだりと、勉強自体はしているのに「手応えがない」「点数にならない」というタイプです。
        <br />
        「わかったつもり」と「自力で解ける」の間にギャップがあり、がんばり方と成果が噛み合っていない可能性が高い状態です。
        <br />
        さとう数理塾では、1対1の対話を通して「なぜその式になるのか」を言葉にしてもらいながら、類題でも使える形で理解を固めていきます。
      </>
    ),
  },
  C: {
    title: '診断結果：時間配分・部活両立タイプです',
    content: (
      <>
        部活の練習や大会で平日の時間がタイトな中、「できる範囲では勉強しているつもり」なのに、数学だけ積み残しが増えてしまうタイプです。
        <br />
        学校・部活・勉強の優先順位づけや、限られた時間で「どこまでやれば十分か」の線引きが難しくなっている状態と言えます。
        <br />
        さとう数理塾では、部活の予定も含めて週ごとの学習量を一緒に整理し、「ここだけは外さない」という最小限のラインから逆算して学習計画を立てていきます。
      </>
    ),
  },
};

export default function MathNigatePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [checkedItems, setCheckedItems] = useState(new Set<number>());
  const [diagnosisResult, setDiagnosisResult] = useState<string[] | null>(null);
  const [showError, setShowError] = useState(false);

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

  // チェックリストのトグル関数
  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
    if (showError) setShowError(false);
  };

  // 診断実行関数
  const handleDiagnosis = () => {
    if (checkedItems.size === 0) {
      setShowError(true);
      setDiagnosisResult(null);
      return;
    }
    setShowError(false);

    const scores: { [key: string]: number } = { A: 0, B: 0, C: 0 };
    for (const index of checkedItems) {
      const item = DIAGNOSIS_ITEMS[index];
      if (item) {
        scores[item.category]++;
      }
    }

    const maxScore = Math.max(...Object.values(scores));

    const types = Object.entries(scores)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type);

    setDiagnosisResult(types);

    trackMetaEvent('Contact', { type: 'diagnosis_check', result: types.join('_') });
  };

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
      />

      <div className="w-full overflow-hidden">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative w-full min-h-[70vh] md:min-h-[85vh] flex md:items-center overflow-hidden"
        >
          {/* 背景画像エリア */}
          <div className="absolute inset-0 z-0">
            <div
              className={`w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                alt="勉強を見守るイメージ"
                className="w-full h-full md:h-[120%] object-cover opacity-[0.1] grayscale origin-center"
                style={{
                  transform: loaded ? 'scale(1.05)' : 'scale(1.0)',
                  transition: 'transform 10s ease-out',
                }}
              />
            </div>
          </div>

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/90 to-[#F8FAFC]/40" />

          {/* コンテンツエリア */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12 md:py-20">
            <div className="max-w-3xl text-left">
              {/* ラベル部分 */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <div className="inline-block mb-6 md:mb-8">
                  <p className="text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1">
                    保護者の方へ
                  </p>
                </div>
              </div>

              {/* 見出し部分 */}
              <div
                className={`transition-all duration-1000 delay-500 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <h2 className="font-serif text-[#334455] mb-8 md:mb-8 drop-shadow-sm tracking-tight">
                  <span className="text-3xl md:text-5xl leading-relaxed md:leading-snug block">「数学が心配...」</span>
                  <span className="text-2xl md:text-5xl leading-relaxed md:leading-snug mt-4 md:mt-0 block md:inline">
                    その不安は、
                    <br className="hidden md:block" />
                    <span className="inline-block relative">
                      <span className="text-[#009DE0] relative z-10 font-bold">適切なアプローチ</span>
                      <svg
                        className="absolute w-full h-2 md:h-3 bottom-0.5 left-0 text-[#D6DE26]/60 -z-10"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                    </span>
                    <span className="inline-block">で必ず変えられます。</span>
                  </span>
                </h2>
              </div>

              {/* ボタンエリア */}
              <div
                className={`transition-all duration-1000 delay-700 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href="#solution"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#009DE0] to-[#008ac4] text-white rounded-full text-base font-bold shadow-lg shadow-[#009DE0]/30 active:shadow-md active:scale-[0.98] transition-all duration-200 min-w-[240px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/30 skew-y-12 animate-shimmer-auto" />
                    <span className="relative flex items-center gap-2">
                      アプローチを見る
                      <ChevronDown size={20} className="animate-float" />
                    </span>
                  </a>
                </div>
              </div>

              {/* 説明文 */}
              <div
                className={`transition-all duration-1000 delay-700 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              >
                <p className="text-[#334455]/80 text-base md:text-lg leading-7 md:leading-loose max-w-2xl">
                  お子様の数学の点数を見て、将来の進路を諦めかけてはいませんか？
                  <br className="hidden md:block" />
                  高校数学は一度つまずくと挽回が難しい教科ですが、
                  <br className="hidden md:block" />
                  原因を特定し、正しい順序で学び直せば、必ず自信を取り戻せます。
                  <br className="hidden md:block" />
                  まずは保護者の方の「どうしたらいいの？」を、当塾にお聞かせください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* スマホ用メニュー */}
        <MobileTableOfContents />

        {/* SOLUTION SECTION */}
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
                      を立てます。 その結果、
                      <span className="font-bold">
                        「何から手をつければいいのか分からない」状態が、1〜2ヶ月先まで見通せるやることリスト
                      </span>
                      に変わります。
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
                      <span className="text-[#8C9400] font-bold bg-[#D6DE26]/10 px-1">
                        テスト本番で手が止まらない解き方
                      </span>
                      へ変えていきます。
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
                      しながら進められます。 これにより、
                      <span className="font-bold">
                        「解きっぱなしで結局身についていない」勉強から、1問ごとに理解を確認しながら積み上げる勉強
                      </span>
                      に変わります。
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORRY SECTION (CHECK LIST) */}
        <section id="worry" className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block">
                  Check List
                </span>
                <h3 className="font-serif text-xl md:text-3xl text-[#334455] leading-relaxed font-bold mb-4">
                  こんなご様子に、
                  <br className="md:hidden" />
                  心当たりはありませんか？
                </h3>
                <p className="text-xs md:text-sm text-[#334455]/70 max-w-xl mx-auto">
                  ※2〜3分でできる簡単なチェックです。あてはまるところにチェックを入れてみてください。
                </p>
              </div>
            </Reveal>

            <div className="bg-[#F8FAFC] border border-[#009DE0]/10 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-1 gap-4 mb-10">
                {DIAGNOSIS_ITEMS.map((item, index) => {
                  const isChecked = checkedItems.has(index);
                  return (
                    <Reveal key={index} delay={index * 100}>
                      <button
                        onClick={() => toggleCheck(index)}
                        className={`w-full text-left flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 active:scale-[0.99] ${
                          isChecked
                            ? 'bg-[#E0F4FC] border-[#009DE0]/50 ring-1 ring-[#009DE0]/30 shadow-sm'
                            : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#009DE0]/30'
                        }`}
                        aria-pressed={isChecked}
                      >
                        <div
                          className={`mt-1 flex-shrink-0 transition-colors duration-300 ${
                            isChecked ? 'text-[#009DE0]' : 'text-[#EA5514]'
                          }`}
                        >
                          {isChecked ? (
                            <div className="scale-110 transition-transform duration-200">
                              <CheckCircle2 size={24} className="fill-[#009DE0]/10" />
                            </div>
                          ) : (
                            <div className="text-gray-300">
                              <CheckCircle2 size={24} />
                            </div>
                          )}
                        </div>
                        <p
                          className={`font-medium leading-relaxed transition-colors duration-200 ${
                            isChecked ? 'text-[#009DE0] font-bold' : 'text-[#334455]'
                          }`}
                        >
                          {item.text}
                        </p>
                      </button>
                    </Reveal>
                  );
                })}
              </div>

              {/* 診断ボタン */}
              <Reveal delay={500}>
                <div className="flex flex-col items-center">
                  {showError && (
                    <p className="text-[#FF4757] font-bold text-sm mb-4 animate-bounce">
                      ※どれか1つ以上チェックを入れてください
                    </p>
                  )}

                  <button
                    onClick={handleDiagnosis}
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#009DE0] text-white rounded-full font-bold text-base shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-sm transition-all duration-200 min-w-[280px]"
                  >
                    <ClipboardList size={20} />
                    今の状態を簡単チェックする
                  </button>

                  {diagnosisResult && (
                    <div className="mt-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {diagnosisResult.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                          <p className="text-[#334455] font-bold mb-2">はっきりした傾向は見られませんでした</p>
                          <p className="text-[#334455]/70 text-sm">
                            チェック項目が少ない場合、特定の傾向が出ないことがあります。
                            <br />
                            気になる点があれば、お気軽に学習相談でご質問ください。
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {diagnosisResult.map((type) => {
                            if (!(type in DIAGNOSIS_RESULTS)) return null;
                            const result = DIAGNOSIS_RESULTS[type as keyof typeof DIAGNOSIS_RESULTS];

                            return (
                              <div
                                key={type}
                                className="bg-white border-2 border-[#009DE0]/20 rounded-xl p-6 md:p-8 shadow-md relative overflow-hidden"
                              >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009DE0] to-[#D6DE26]" />
                                <h4 className="text-xl md:text-2xl font-bold text-[#009DE0] mb-4 flex items-center gap-2">
                                  <Lightbulb size={24} className="flex-shrink-0" />
                                  {result.title}
                                </h4>
                                <p className="text-[#334455]/80 leading-relaxed text-sm md:text-base">
                                  {result.content}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <p className="mt-6 text-xs text-[#334455]/50 text-center mb-8">
                        ※この結果は、学習状況を整理するための「簡単な目安」です。
                      </p>

                      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a
                          href="/counseling"
                          className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#009DE0] border-2 border-[#009DE0] rounded-full shadow-lg hover:bg-[#009DE0]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                          onClick={() => {
                            trackMetaEvent('Contact', {
                              type: 'counseling_cta',
                              pageType: 'math_nigate',
                              position: 'diagnosis_section',
                            });
                            trackGAEvent('counseling_cta_click', {
                              page_type: 'math_nigate',
                              position: 'diagnosis_section',
                            });
                          }}
                        >
                          <MessageCircle size={20} />
                          学習相談に申し込む
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                          href="/trial"
                          className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                          onClick={() => {
                            trackMetaEvent('Lead', {
                              type: 'trial_cta',
                              pageType: 'math_nigate',
                              position: 'diagnosis_section',
                            });
                            trackGAEvent('trial_cta_click', {
                              page_type: 'math_nigate',
                              position: 'diagnosis_section',
                            });
                          }}
                        >
                          <Mail size={20} />
                          無料体験に申し込む
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* REASON SECTION */}
        <section id="reason" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D6DE26]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4" />

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

        {/* FLOW SECTION */}
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

            <div className="grid md:grid-cols-3 gap-8">
              {studentCases.map((caseData) => (
                <Reveal key={caseData.id} delay={caseData.delay}>
                  <StudentCaseCard caseData={caseData} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* キャンペーンセクション */}
        <CampaignSection variant="mathNigate" campaign={campaignData} />

        {/* CLOSING / CTA SECTION */}
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

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10 flex-wrap">
                <a
                  href="/trial"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Lead', {
                      type: 'trial_cta',
                      pageType: 'math_nigate',
                      position: 'contact_section',
                    });
                    trackGAEvent('trial_cta_click', {
                      page_type: 'math_nigate',
                      position: 'contact_section',
                    });
                  }}
                >
                  <Mail size={20} />
                  無料体験に申し込む
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/counseling"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#009DE0] border-2 border-[#009DE0] rounded-full shadow-lg hover:bg-[#009DE0]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Contact', {
                      type: 'counseling_cta',
                      pageType: 'math_nigate',
                      position: 'contact_section',
                    });
                    trackGAEvent('counseling_cta_click', {
                      page_type: 'math_nigate',
                      position: 'contact_section',
                    });
                  }}
                >
                  <MessageCircle size={20} />
                  学習相談に申し込む
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://lin.ee/blKCpXC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] text-white rounded-full shadow-lg hover:bg-[#05b04d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]"
                  onClick={() => {
                    trackMetaEvent('Contact', {
                      type: 'line',
                      pageType: 'math_nigate',
                      position: 'contact_section',
                    });
                    trackGAEvent('line_click', {
                      type: 'line',
                      page_type: 'math_nigate',
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
    </div>
  );
}
