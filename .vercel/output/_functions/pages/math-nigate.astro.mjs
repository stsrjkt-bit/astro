import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_7FE2qpej.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from '../chunks/PageLayout_BE-pmHuj.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, AlertCircle, BrainCircuit, LineChart, MessageCircle, Clock, Calendar, GraduationCap, HeartHandshake, Mail } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "worry", label: "こんなお悩み" },
  { id: "reason", label: "伸び悩む理由" },
  { id: "solution", label: "解決へのアプローチ" },
  { id: "flow", label: "通塾イメージ" },
  { id: "contact", label: "ご相談" }
];
const Reveal = ({
  children,
  delay = 0,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-8 blur-sm scale-[0.98]"} ${className}`,
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
function MathNigatePage() {
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
                src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
                alt: "勉強を見守るイメージ",
                className: "w-full h-[120%] object-cover opacity-[0.1] grayscale origin-center",
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
              children: /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 md:mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1", children: "保護者の方へ" }) })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
              children: [
                /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-snug text-[#334455] mb-8 drop-shadow-sm tracking-tight", children: [
                  "「数学が心配...」",
                  /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
                  "その不安は、",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsxs("span", { className: "text-[#009DE0] relative inline-block mr-2", children: [
                    "適切なアプローチ",
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
                  "で必ず変えられます。"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-base md:text-lg leading-loose mb-10 max-w-2xl", children: [
                  "お子様の数学の点数を見て、将来の進路を諦めかけてはいませんか？",
                  /* @__PURE__ */ jsx("br", {}),
                  "高校数学は一度つまずくと挽回が難しい教科ですが、",
                  /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                  "原因を特定し、正しい順序で学び直せば、必ず自信を取り戻せます。",
                  /* @__PURE__ */ jsx("br", {}),
                  "まずは保護者の方の「どうしたらいいの？」を、私たちにお聞かせください。"
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
                    href: "#worry",
                    className: "inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#334455] border border-[#334455]/10 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all",
                    children: [
                      "詳しく読む ",
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
      /* @__PURE__ */ jsx("section", { id: "worry", className: "py-20 bg-white relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block", children: "Check List" }),
          /* @__PURE__ */ jsxs("h3", { className: "font-serif text-xl md:text-3xl text-[#334455] leading-relaxed font-bold", children: [
            "こんなご様子に、",
            /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
            "心当たりはありませんか？"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F8FAFC] border border-[#009DE0]/10 rounded-2xl p-8 md:p-12 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-1 gap-6", children: [
            "模試や定期テストで、数学だけ極端に点数が低い（あるいは下がってきた）",
            "「勉強しなさい」と言っても、机に向かう時間が以前より減っている",
            "テスト前には勉強しているはずなのに、本番になると真っ白になってしまう",
            "数学の話をすると、急に不機嫌になったり、口をつぐんだりする",
            "塾には通っているが、集団授業のスピードについていけていないようだ"
          ].map((item, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 100, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1 flex-shrink-0 text-[#EA5514]", children: /* @__PURE__ */ jsx(AlertCircle, { size: 24 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-[#334455] font-medium leading-relaxed", children: item })
          ] }) }, index)) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 600, children: /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
            "これらは、決して「お子様の努力不足」や「能力の問題」だけが原因ではありません。",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            "高校数学特有の",
            /* @__PURE__ */ jsx("strong", { className: "text-[#009DE0] font-bold", children: "「構造的な難しさ」" }),
            "が壁になっているケースがほとんどです。"
          ] }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "reason", className: "py-20 md:py-32 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[600px] h-[600px] bg-[#D6DE26]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 relative z-10", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold", children: [
              "なぜ数学だけ、",
              /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
              "こんなに伸びにくいのか？"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/70 text-sm md:text-base max-w-2xl mx-auto leading-loose", children: [
              "他の科目はなんとかなるのに、数学だけはどうにもならない。",
              /* @__PURE__ */ jsx("br", {}),
              "それには、明確な理由があります。"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsx(Reveal, { delay: 100, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#009DE0]/10 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(BrainCircuit, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] mr-2", children: "01." }),
                "積み上げ型の科目だから"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "数学は「ピラミッド」のような科目です。高1の内容でつまずいたまま高2の内容を理解することは、土台のない場所に家を建てるようなもの。",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "どこから崩れているか" }),
                "を特定しない限り、今の授業を聞いても理解できません。"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 200, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#D6DE26]/20 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(AlertCircle, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-[#D6DE26] mr-2 text-shadow-sm",
                    style: { textShadow: "0 0 1px rgba(0,0,0,0.1)" },
                    children: "02."
                  }
                ),
                "「わかったつもり」の罠"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "授業で先生の解説を聞いて「なるほど」と思っても、それは「理解した」だけ。",
                /* @__PURE__ */ jsx("br", {}),
                "「自力で解ける」状態にはなっていません。",
                /* @__PURE__ */ jsx("br", {}),
                "このギャップがテスト本番での",
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "「手が動かない」" }),
                "を引き起こします。"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 300, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-8 rounded-lg border-t-4 border-[#EA5514] shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-[#EA5514]/10 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(LineChart, { size: 60 }) }),
              /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-[#334455] mb-4 relative z-10", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] mr-2", children: "03." }),
                "一人では戻り方が不明"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-7 relative z-10", children: [
                "「復習しなさい」と言われても、生徒本人は",
                /* @__PURE__ */ jsx("span", { className: "border-b border-[#D6DE26] font-bold", children: "「どの単元の、何がわからないのか」" }),
                "がわかりません。",
                /* @__PURE__ */ jsx("br", {}),
                "結果、やみくもに問題を解いて自信を失う悪循環に陥ってしまいます。"
              ] })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "solution", className: "py-20 md:py-32 bg-[#F1F5F9] relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold text-sm tracking-widest uppercase mb-2 block", children: "Our Approach" }),
          /* @__PURE__ */ jsxs("h3", { className: "font-serif text-2xl md:text-3xl text-[#334455] mb-4 font-bold", children: [
            "さとう数理塾では、",
            /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
            "こう変えていきます"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#009DE0]/10 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#009DE0]/10 rounded-full flex items-center justify-center text-[#009DE0]", children: /* @__PURE__ */ jsx(BrainCircuit, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "AI教材で「つまずきの根源」を特定" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "最新のAI教材を使用し、お子様がどこでつまずいているかを数分で診断します。 「高2だから高2の問題」ではなく、「中3の二次関数が怪しいからそこへ戻る」といった、",
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0] font-bold bg-[#009DE0]/5 px-1", children: "最短ルートの復習計画" }),
                "を立てます。"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#D6DE26]/30 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#D6DE26]/20 rounded-full flex items-center justify-center text-[#8C9400]", children: /* @__PURE__ */ jsx(MessageCircle, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "1対1対話で「なぜ？」を解決" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "ただ答えを教えるのではなく、「どうしてこの式になると思う？」と対話をしながら進めます。 自分の言葉で説明できるようになることで、「わかったつもり」を排除し、",
                /* @__PURE__ */ jsx("span", { className: "text-[#8C9400] font-bold bg-[#D6DE26]/10 px-1", children: "テスト本番で使える力" }),
                "へ変えます。"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EA5514]/20 flex flex-col md:flex-row gap-8 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-[#EA5514]/10 rounded-full flex items-center justify-center text-[#EA5514]", children: /* @__PURE__ */ jsx(Clock, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#334455] mb-3", children: "「演習」しながらその場で解決" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed", children: [
                "「授業を聞いて終わり」ではなく、実際に手を動かす時間を重視します。 学習中にわからないことがあればその都度指導が入るため、",
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] font-bold bg-[#EA5514]/5 px-1", children: "疑問をその場で解消" }),
                "しながら進められます。"
              ] })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "flow", className: "py-20 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 font-bold", children: "通い方のイメージ" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#334455]/70", children: "部活や学校生活と両立しながら、無理なく続けられるペースをご提案します。" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "border border-[#009DE0]/20 rounded-xl p-6 bg-white shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-gray-100 pb-3", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "text-[#009DE0]", size: 24 }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#334455]", children: "数学が苦手な A君(高2)" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm text-[#334455]/80", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold w-12 text-[#009DE0] flex-shrink-0", children: "通塾" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "週2回 (19:30〜)。",
                  /* @__PURE__ */ jsx("br", {}),
                  "予習に必要な過去単元はAIが自動提案。効率よくつまずきを解消しながら予習し、学校の授業を「復習の場」に変える。"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold w-12 text-[#009DE0] flex-shrink-0", children: "目標" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "「予習→学校の授業(復習)→定着」のサイクルを確立すること。",
                  /* @__PURE__ */ jsx("br", {}),
                  "学習科学に基づいたアプローチで、無理なく平均点以上を目指す。"
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "border border-[#D6DE26]/50 rounded-xl p-6 bg-white shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-gray-100 pb-3", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "text-[#8C9400]", size: 24 }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#334455]", children: "理系志望の Bさん(高1)" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm text-[#334455]/80", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold w-12 text-[#8C9400] flex-shrink-0", children: "通塾" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "週3回 (19:30〜)。",
                  /* @__PURE__ */ jsx("br", {}),
                  "数学は予習ペースが定着し、余裕が生まれた分、英語や理科の先取り学習にも着手。"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold w-12 text-[#8C9400] flex-shrink-0", children: "目標" }),
                /* @__PURE__ */ jsx("span", { children: "数学での「貯金」を活かして全教科の評定平均を底上げし、希望する大学の指定校推薦枠を確実に掴む。" })
              ] })
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
                "まずは、現状を整理することから",
                /* @__PURE__ */ jsx("br", {}),
                "始めませんか？"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-loose mb-8", children: [
                "今の成績だけで、お子さんの可能性が決まるわけではありません。",
                /* @__PURE__ */ jsx("br", {}),
                "「どこでつまずいているのか」「何をすればいいのか」がわかれば、",
                /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                "お子さんの表情は驚くほど変わります。",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("br", {}),
                "無理な勧誘は一切いたしません。",
                /* @__PURE__ */ jsx("br", {}),
                "まずは不安を解消し、新しい可能性を見つける場として、無料体験・相談をご活用ください。"
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

const $$MathNigate = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "\u6570\u5B66\u304C\u82E6\u624B\u306A\u9AD8\u6821\u751F\u3078 - \u3055\u3068\u3046\u6570\u7406\u587E"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MathNigatePage", MathNigatePage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/react/MathNigatePage", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/math-nigate.astro", void 0);

const $$file = "/workspace/src/pages/math-nigate.astro";
const $$url = "/math-nigate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MathNigate,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
