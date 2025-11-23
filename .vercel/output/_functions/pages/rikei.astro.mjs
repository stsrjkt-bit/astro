import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CmjTqM-c.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from '../chunks/PageLayout_D8B0VJ2z.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Atom, FlaskConical, Calculator, Layers, BrainCircuit, MessageCircle, BookOpen, GraduationCap, HeartHandshake, Mail } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "vision", label: "将来と悩み" },
  { id: "requirements", label: "理系入試の鍵" },
  { id: "support", label: "指導の方針" },
  { id: "cases", label: "モデルケース" },
  { id: "contact", label: "ご相談" }
];
const Reveal = ({
  children,
  delay = 0,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setHasHydrated(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (entry.target) observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  const baseClasses = "transition-all duration-1000 ease-out transform";
  const visibleClasses = "opacity-100 translate-y-0 blur-0 scale-100";
  const hiddenClasses = "opacity-0 translate-y-8 blur-sm scale-[0.98]";
  const animationClasses = !hasHydrated ? visibleClasses : isVisible ? visibleClasses : hiddenClasses;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `${baseClasses} ${animationClasses} ${className}`,
      style: { transitionDelay: `${delay}ms` },
      children
    }
  );
};
const DotNavigation = ({ activeSection }) => {
  return /* @__PURE__ */ jsx("div", { className: "hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4", children: SECTIONS.map((section) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: `#${section.id}`,
      className: "group relative flex items-center justify-end",
      "aria-label": section.label,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `absolute right-6 px-2 py-1 text-xs font-bold text-white bg-[#009DE0] rounded opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none whitespace-nowrap shadow-sm`,
            children: section.label
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === section.id ? "bg-[#009DE0] border-[#009DE0] scale-125" : "bg-transparent border-[#334455]/30 group-hover:border-[#009DE0] group-hover:bg-[#009DE0]/20"}`
          }
        )
      ]
    },
    section.id
  )) });
};
const MobileTableOfContents = () => {
  return /* @__PURE__ */ jsxs("div", { className: "md:hidden px-6 py-8 bg-white/50 border-y border-[#009DE0]/10 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 tracking-widest uppercase font-bold mb-4 text-center", children: "- Page Menu -" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: SECTIONS.slice(1).map((section) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `#${section.id}`,
        className: "flex items-center justify-between p-3 bg-white rounded-lg border border-[#009DE0]/10 shadow-sm text-sm font-medium text-[#334455] active:scale-95 transition-transform",
        children: [
          section.label,
          /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: "text-[#009DE0] -rotate-90" })
        ]
      },
      section.id
    )) })
  ] });
};
function ScienceMajorPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    setLoaded(true);
  }, []);
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F8FAFC] text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(DotNavigation, { activeSection }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[-1] pointer-events-none opacity-40",
        style: {
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxs("section", { id: "hero", className: "relative w-full min-h-[85vh] flex items-center overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-full h-full transition-opacity duration-[2000ms] ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
                alt: "理系学習のイメージ",
                className: "w-full h-[120%] object-cover opacity-[0.1] origin-center",
                style: { transform: loaded ? "scale(1.05)" : "scale(1.0)", transition: "transform 10s ease-out" }
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-[#F8FAFC]/40" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl text-left", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
              children: /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 md:mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1", children: "高校生・保護者の皆様へ" }) })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
              children: [
                /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-snug text-[#334455] mb-8 drop-shadow-sm tracking-tight", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-[#009DE0] relative inline-block mr-2", children: [
                    "数学・理科",
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#D6DE26]/40 -z-10",
                        viewBox: "0 0 100 10",
                        preserveAspectRatio: "none",
                        children: /* @__PURE__ */ jsx("path", { d: "M0 5 Q 50 10 100 5", stroke: "currentColor", strokeWidth: "8", fill: "none" })
                      }
                    )
                  ] }),
                  "を軸に、",
                  /* @__PURE__ */ jsx("br", {}),
                  "理系進学をめざすあなたへ。"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-base md:text-lg leading-loose mb-10 max-w-2xl", children: [
                  "理系大学への進学は、将来の選択肢を大きく広げます。",
                  /* @__PURE__ */ jsx("br", {}),
                  "しかし、数学IIIや物理・化学など、乗り越えるべきハードルが高いのも事実です。",
                  /* @__PURE__ */ jsx("br", {}),
                  "さとう数理塾は、あなたの「理系に行きたい」という気持ちを、",
                  /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                  "確実な学力と自信に変えるための個別指導塾です。"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#contact",
                    className: "inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#009DE0] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#008ac4] transition-all hover:-translate-y-1",
                    children: [
                      "無料体験・学習相談を予約する ",
                      /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#vision",
                    className: "inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#334455] border border-[#334455]/10 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all",
                    children: [
                      "詳しく見る ",
                      /* @__PURE__ */ jsx(ChevronDown, { size: 16 })
                    ]
                  }
                )
              ] })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(MobileTableOfContents, {}),
      /* @__PURE__ */ jsx("section", { id: "vision", className: "py-20 bg-white relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block", children: "Current Situation" }),
          /* @__PURE__ */ jsxs("h3", { className: "font-serif text-xl md:text-3xl text-[#334455] leading-relaxed font-bold", children: [
            "こんな将来像や悩み、",
            /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
            "ありませんか？"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F8FAFC] border border-[#009DE0]/10 rounded-2xl p-8 md:p-12 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-1 gap-6", children: [
            "理系に進みたいけれど、具体的な進路や学部学科がまだぼんやりしている",
            "数学・理科（物理・化学）の授業スピードが速く、消化不良気味になっている",
            "部活動が忙しいが、現役での理系大学合格を諦めたくない",
            "模試の偏差値に波があり、得意科目をどう伸ばせばいいかわからない"
          ].map((item, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 100, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1 flex-shrink-0 text-[#009DE0]", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 24 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-[#334455] font-medium leading-relaxed", children: item })
          ] }) }, index)) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 600, children: /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
            "理系の受験勉強は、積み上げが必要な科目が多く、計画性が問われます。",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            "今の成績が良いか悪いかよりも、",
            /* @__PURE__ */ jsx("strong", { className: "text-[#009DE0] font-bold", children: "「今日からどう積み上げるか」" }),
            "が合否を分けます。"
          ] }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "requirements", className: "py-20 md:py-32 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-0 w-[400px] h-[400px] bg-[#009DE0]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/4" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 relative z-10", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold", children: "今の理系入試で求められる力" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/70 text-sm md:text-base max-w-2xl mx-auto leading-loose", children: [
              "単なる暗記では太刀打ちできないのが理系科目の特徴です。",
              /* @__PURE__ */ jsx("br", {}),
              "根本的な理解と、それを使いこなす思考力が問われます。"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsx(Reveal, { delay: 100, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#009DE0]/10 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(Atom, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] mr-2", children: "01." }),
                "数学・理科の「積み上げ」"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "数学はI・A・II・B・C(・III)と繋がっており、理科（物理・化学）も基礎理論の上に応用が成り立ちます。",
                /* @__PURE__ */ jsx("br", {}),
                "一つの穴がその後の学習すべてに影響するため、",
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "基礎の完全な理解" }),
                "が不可欠です。"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 200, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#D6DE26]/20 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(FlaskConical, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-[#D6DE26] mr-2 text-shadow-sm",
                    style: { textShadow: "0 0 1px rgba(0,0,0,0.1)" },
                    children: "02."
                  }
                ),
                "現象をイメージする力"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "特に物理や化学では、数式を追うだけでなく「何が起きているか」をイメージする力が重要です。",
                /* @__PURE__ */ jsx("br", {}),
                "公式の丸暗記ではなく、",
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "「なぜそうなるのか」" }),
                "を説明できるレベルを目指します。"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 300, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#EA5514] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#EA5514]/10 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(Calculator, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] mr-2", children: "03." }),
                "記述力と論理構成"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "国公立や難関私大の理系入試では、答えだけでなく「導出過程」も評価されます。",
                /* @__PURE__ */ jsx("br", {}),
                "日頃から論理的に答案を作成するトレーニングを行うことで、",
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "得点力のある記述" }),
                "を身につけます。"
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/70 text-sm bg-white inline-block px-6 py-3 rounded-full border border-[#009DE0]/20 shadow-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold mr-2", children: "Info" }),
            "理系入試には英語も重要です。数学・理科を中心に、必要な英語学習についても合わせてご相談いただけます。"
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "support", className: "py-20 md:py-32 bg-[#F1F5F9] relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block", children: "Our Support" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#334455] mb-4 font-bold", children: "さとう数理塾ができること" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#009DE0]/10 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#009DE0]/10 rounded-full flex items-center justify-center text-[#009DE0]", children: /* @__PURE__ */ jsx(Layers, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "学年をまたいだ「戦略的な設計」" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "学校の進度はあくまで目安です。志望校のレベルや受験科目に合わせて、 「高2の夏までに数II・B・Cを終わらせる」「高3の春からは理科の演習に入る」など、",
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold bg-[#009DE0]/5 px-1", children: "合格から逆算したカリキュラム" }),
                "を作成します。"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#D6DE26]/30 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#D6DE26]/20 rounded-full flex items-center justify-center text-[#8C9400]", children: /* @__PURE__ */ jsx(BrainCircuit, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "AI教材で「見えない弱点」を特定" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "得意だと思っていた分野にも、意外な抜け漏れがあるものです。 最新のAI教材を活用して学習データを分析し、",
                /* @__PURE__ */ jsx("span", { className: "text-[#8C9400] font-bold bg-[#D6DE26]/10 px-1", children: "優先的に復習すべき単元" }),
                "をピンポイントで特定します。"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EA5514]/20 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#EA5514]/10 rounded-full flex items-center justify-center text-[#EA5514]", children: /* @__PURE__ */ jsx(MessageCircle, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "1対1対話で「思考プロセス」を確認" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "正解した問題でも、「なぜその公式を使ったのか」を講師が問いかけます。 自分の言葉で説明することで理解が深まり、",
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] font-bold bg-[#EA5514]/5 px-1", children: "初見の問題にも対応できる応用力" }),
                "を養います。"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/60 mt-3", children: "※数学・理科の指導が中心ですが、必要に応じて英語の学習計画も一緒に立てることができます。" })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "cases", className: "py-20 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold", children: "学年別モデルケース" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#334455]/70", children: "スタート時期に合わせた、無理のないペース配分の一例です。" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 100, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "border border-[#009DE0]/20 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 pb-3 border-b border-gray-100", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "text-[#009DE0]", size: 24 }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#334455]", children: "高1からスタート" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-[#334455]/80 space-y-3", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "block text-[#009DE0] mb-1", children: "土台作りと先取り" }),
                "数学I・Aの完全定着を目指しつつ、余裕があれば数学IIの先取りも実施。"
              ] }),
              /* @__PURE__ */ jsx("p", { children: "理科基礎科目（物理基礎・化学基礎）の学校授業を大切にし、2年次以降の科目選択のアドバイスも行います。" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 200, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "border border-[#D6DE26]/50 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 pb-3 border-b border-gray-100", children: [
              /* @__PURE__ */ jsx(FlaskConical, { className: "text-[#8C9400]", size: 24 }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#334455]", children: "高2からスタート" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-[#334455]/80 space-y-3", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "block text-[#8C9400] mb-1", children: "理系科目の本格化" }),
                "数学II・B・C、そして理科専門科目の学習が始まります。"
              ] }),
              /* @__PURE__ */ jsx("p", { children: "部活との両立が一番大変な時期ですが、週ごとの学習ペースを管理し、入試に直結する重要単元を取りこぼさないようサポートします。" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 300, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "border border-[#EA5514]/30 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 pb-3 border-b border-gray-100", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "text-[#EA5514]", size: 24 }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#334455]", children: "高3からスタート" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-[#334455]/80 space-y-3", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "block text-[#EA5514] mb-1", children: "演習と総仕上げ" }),
                "志望校の傾向に合わせた実践的な演習を中心に行います。"
              ] }),
              /* @__PURE__ */ jsx("p", { children: "AI教材で弱点をピンポイントで補強しつつ、数IIIや理科の記述対策を強化。限られた時間で最大効果を狙います。" })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "contact",
          className: "py-20 bg-gradient-to-b from-[#F8FAFC] to-[#009DE0]/5 border-t border-[#009DE0]/10",
          children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx(HeartHandshake, { size: 48, className: "mx-auto text-[#009DE0] mb-6" }),
              /* @__PURE__ */ jsxs("h3", { className: "font-serif text-2xl md:text-4xl text-[#334455] mb-6 font-bold", children: [
                "今の成績だけで、",
                /* @__PURE__ */ jsx("br", {}),
                "理系進学をあきらめなくていい。"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-loose mb-8", children: [
                "理系の勉強は確かに難しいですが、正しいやり方で積み上げれば必ず結果はついてきます。",
                /* @__PURE__ */ jsx("br", {}),
                "私たちと一緒に、あなたに合った学習計画を立ててみませんか？",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("br", {}),
                "進路のこと、科目のこと、まずはリラックスしてお話ししましょう。"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 justify-center mt-10 flex-wrap", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#",
                  className: "group flex items-center justify-center gap-3 px-8 py-4 bg-[#009DE0] text-white rounded-full shadow-lg hover:bg-[#008ac4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { size: 20 }),
                    "無料体験に申し込む",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "/consultation",
                  className: "group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#009DE0] border-2 border-[#009DE0] rounded-full shadow-lg hover:bg-[#009DE0]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]",
                  children: [
                    /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
                    "学習相談に申し込む",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://lin.ee/blKCpXC",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] text-white rounded-full shadow-lg hover:bg-[#05b04d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base md:text-lg min-w-[280px]",
                  children: [
                    /* @__PURE__ */ jsx(MessageCircle, { size: 20, className: "fill-white text-[#06C755]" }),
                    /* @__PURE__ */ jsx("span", { children: "LINEで気軽に質問する" })
                  ]
                }
              )
            ] })
          ] }) })
        }
      )
    ] })
  ] });
}

const $$Rikei = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "\u7406\u7CFB\u5927\u5B66\u3092\u3081\u3056\u3059\u3042\u306A\u305F\u3078 - \u3055\u3068\u3046\u6570\u7406\u587E"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ScienceMajorPage", ScienceMajorPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/react/ScienceMajorPage", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/rikei.astro", void 0);

const $$file = "/workspace/src/pages/rikei.astro";
const $$url = "/rikei";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rikei,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
