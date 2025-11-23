import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CmjTqM-c.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from '../chunks/PageLayout_D8B0VJ2z.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight, MessageCircle, GraduationCap, ChevronLeft, ChevronRight, MapPin, Clock, Calendar, ExternalLink, Mail, ChevronDown } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "about", label: "当塾について" },
  { id: "features", label: "3つの特徴" },
  { id: "achievements", label: "合格実績" },
  { id: "gallery", label: "教室の雰囲気" },
  { id: "access", label: "教室情報" },
  { id: "contact", label: "お問い合わせ" }
  // 追加
];
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollPosition;
};
const Reveal = ({
  children,
  delay = 0,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
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
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: SECTIONS.slice(1, -1).map(
      (section) => /* @__PURE__ */ jsxs(
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
      )
    ) })
  ] });
};
function NewHomepage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const scrollY = useScrollPosition();
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
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
  const scrollGallery = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/d/1YZemnybxdBF7zgX4bGrQvnvTYCKqWmlM=s0",
      alt: "明るく清潔感のある教室全体の様子"
    },
    // 入口（本棚）
    { src: "https://lh3.googleusercontent.com/d/18WWMFN5jCNy_k5eM8x6bDSDo9qJI2OKr=s0", alt: "集中できる自習スペース" },
    {
      src: "https://lh3.googleusercontent.com/d/1dYZaS_o8O3IrbwioJlWPkJcEbgT7b-VZ=s0",
      alt: "1対1の個別指導を行うデスク"
    },
    {
      src: "https://lh3.googleusercontent.com/d/1NEyLD4KY4MIpD8E8pJF58BGt37qavNEI=s0",
      alt: "オンライン学習・AI教材用のタブレット端末"
    },
    { src: "https://lh3.googleusercontent.com/d/1fA4R4476PQrHyip-NootpyjEO9V6umGe=s0", alt: "先生の指導風景" }
    // 先生の机と青いパネル
  ];
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
      /* @__PURE__ */ jsxs("section", { id: "top", className: "relative w-full min-h-[90vh] flex items-center overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-0 will-change-transform",
            style: { transform: `translateY(${scrollY * 0.5}px)` },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-full h-full transition-opacity duration-[2000ms] ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`,
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
                    alt: "学習風景",
                    className: "w-full h-[120%] object-cover opacity-[0.08] grayscale origin-center",
                    style: { transform: loaded ? "scale(1.1)" : "scale(1.0)", transition: "transform 10s ease-out" }
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 bg-gradient-to-r from-[#F8FAFC]/90 via-[#F8FAFC]/70 to-[#F8FAFC]/30" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12",
            style: { transform: `translateY(${-scrollY * 0.1}px)` },
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl text-left", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
                  children: /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 md:mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-[#009DE0] text-sm md:text-base tracking-[0.15em] font-bold border-l-4 border-[#D6DE26] pl-3 py-1", children: "沼津・理系特化型の個別指導" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
                  children: /* @__PURE__ */ jsxs("h2", { className: "font-serif text-3xl sm:text-5xl md:text-7xl leading-tight md:leading-snug text-[#334455] mb-10 md:mb-12 drop-shadow-sm tracking-tight", children: [
                    /* @__PURE__ */ jsx("span", { className: "inline-block whitespace-nowrap", children: "数学が苦手でも、" }),
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsxs("span", { className: "inline-block whitespace-nowrap", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-[#009DE0] relative inline-block", children: [
                        "理系",
                        /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: "absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#D6DE26]/30 -z-10",
                            viewBox: "0 0 100 10",
                            preserveAspectRatio: "none",
                            children: /* @__PURE__ */ jsx("path", { d: "M0 5 Q 50 10 100 5", stroke: "currentColor", strokeWidth: "8", fill: "none" })
                          }
                        )
                      ] }),
                      "をあきらめない。"
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm md:text-base text-[#334455]/80 tracking-widest font-medium", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "text-[#D6DE26]" }),
                      /* @__PURE__ */ jsx("span", { className: "border-b border-[#334455]/20 pb-1", children: "数学が苦手な高校生へ" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "text-[#D6DE26]" }),
                      /* @__PURE__ */ jsx("span", { className: "border-b border-[#334455]/20 pb-1", children: "理系大学をめざすあなたへ" })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `mt-10 md:hidden transition-all duration-1000 delay-900 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                  children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#gallery",
                      className: "inline-flex items-center gap-2 px-6 py-3 bg-[#009DE0] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#008ac4] transition-colors",
                      children: [
                        "まずは教室の様子を見る ",
                        /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                      ]
                    }
                  )
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`,
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "animate-bounce text-[#009DE0]/50 p-4 cursor-pointer hover:text-[#009DE0] transition-colors flex flex-col items-center gap-2",
                onClick: () => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                  }
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-widest uppercase text-[#009DE0]", children: "Scroll" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "transform rotate-90", size: 20 })
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx(MobileTableOfContents, {}),
      /* @__PURE__ */ jsx("section", { className: "py-20 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxs("h3", { className: "font-serif text-xl md:text-2xl text-[#334455] leading-relaxed", children: [
          "「理系に行きたいけれど、",
          /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
          "数学が...」",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-base md:text-lg text-[#334455]/70 mt-4 block font-sans font-normal", children: "そんなお悩み、抱えていませんか？" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 bg-white p-8 md:p-10 rounded-lg border border-[#009DE0]/10 shadow-sm hover:shadow-md transition-shadow duration-500", children: [
          "理科や実験は好きなのに、数学のテストで点が取れない",
          "学校の集団授業が早すぎて、質問するタイミングがない",
          "「どこがわからないか」が、自分でもわからなくなっている",
          "このままでは理系大学は無理だと、諦めかけている"
        ].map((item, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 150, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-1 flex-shrink-0 text-[#009DE0] group-hover:text-[#EA5514] transition-colors duration-500 transform group-hover:scale-110", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 22 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[#334455] leading-relaxed font-medium", children: item })
        ] }) }, index)) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-loose text-sm md:text-base", children: [
          "もし一つでも当てはまるなら、さとう数理塾にお任せください。",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("strong", { className: "text-[#334455] font-bold relative inline-block", children: [
            "当塾は、「わからない」に寄り添うこと",
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 left-0 w-full h-3 bg-[#D6DE26]/40 -z-10 rounded-sm" })
          ] }),
          "から始めます。"
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "about", className: "py-20 md:py-32 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#F1F5F9] skew-y-3 origin-top-left transform -translate-y-20 z-0 scale-110" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6DE26] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 gap-12 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "md:col-span-4 md:sticky md:top-32", children: /* @__PURE__ */ jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-4 relative inline-block font-bold", children: [
              "さとう数理塾",
              /* @__PURE__ */ jsx("br", {}),
              "について",
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-2 left-0 w-12 h-[3px] bg-[#D6DE26]" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 mt-4 tracking-widest uppercase font-bold", children: "About Us" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-8 space-y-12 text-[#334455]/80 leading-loose text-justify", children: [
            /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm p-6 md:p-8 -m-6 md:m-0 rounded-lg transition-all duration-500 border border-[#009DE0]/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg text-[#334455] font-serif mb-4 border-l-4 border-[#009DE0] pl-4 font-bold", children: "沼津の理系専門個別指導" }),
              /* @__PURE__ */ jsx("p", { children: "さとう数理塾は、沼津を拠点に理系科目に特化した個別指導を行っています。 AI教材と1対1の個別指導を組み合わせ、生徒一人ひとりのペースで「わからない」から一歩ずつ抜け出すための塾です。" })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm p-6 md:p-8 -m-6 md:m-0 rounded-lg transition-all duration-500 border border-[#009DE0]/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg text-[#334455] font-serif mb-4 border-l-4 border-[#009DE0] pl-4 font-bold", children: "生徒の可能性を最大限に" }),
              /* @__PURE__ */ jsx("p", { children: "数学・理科の基礎から応用、そして理系大学受験に欠かせない英語まで、目標に合わせた丁寧な指導を心がけています。 特に「数学の授業についていけない」といった悩みを持つ生徒さんにこそ、当塾の指導が必要です。 「わからない」を「わかる」に変え、さらに「できる」へと導く。それが当塾の使命です。" })
            ] }) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg border border-[#009DE0]/20 relative overflow-hidden group shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 text-[#009DE0]/5 transform rotate-12 scale-150 pointer-events-none", children: /* @__PURE__ */ jsx(MessageCircle, { size: 100 }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#009DE0] mb-4 font-bold tracking-wider flex items-center gap-2 relative z-10", children: [
                /* @__PURE__ */ jsx(MessageCircle, { size: 18, className: "fill-[#009DE0]/10" }),
                "保護者様へ"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed relative z-10 text-[#334455]/90", children: "沼津で数学の個別指導を探されている方から、「子供が質問しやすくなった」「テストの点数が安定してきた」と信頼をいただいています。 集団授業では埋もれてしまいがちな小さなつまずきも見逃さず、大学受験に向けて着実な一歩を共に歩みましょう。" })
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "features", className: "py-20 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 md:mb-24", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold", children: "3つの特徴" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 tracking-widest uppercase font-bold", children: "Features" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 md:gap-12", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 100, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700" }),
            /* @__PURE__ */ jsx("div", { className: "text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold", children: "01" }),
            /* @__PURE__ */ jsx("h4", { className: "font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold", children: "個別対応" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10", children: "「なんとなく」で終わらせない" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-7 text-[#334455]/80 relative z-10", children: "一人ひとりの理解度に合わせた完全個別指導です。 AI教材の効率的な演習と、講師による丁寧な対話型指導を組み合わせ、着実に力をつけます。" })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 300, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700" }),
            /* @__PURE__ */ jsx("div", { className: "text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold", children: "02" }),
            /* @__PURE__ */ jsx("h4", { className: "font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold", children: "理系特化" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10", children: "理数力の土台を作る" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-7 text-[#334455]/80 relative z-10", children: "数学・物理・化学などの理系科目を専門的に指導します。 また、理系大学受験で避けて通れない「英語」の対策も万全。理系科目の負担を減らしながら、バランスよく合格力を高めます。" })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 500, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-lg relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-[#009DE0]/10 hover:border-[#009DE0]/30 overflow-hidden shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-[#D6DE26]/20 rounded-full group-hover:scale-150 transition-transform duration-700" }),
            /* @__PURE__ */ jsx("div", { className: "text-4xl text-[#009DE0] font-serif absolute top-6 right-6 transition-colors duration-500 z-10 opacity-50 font-bold", children: "03" }),
            /* @__PURE__ */ jsx("h4", { className: "font-serif text-xl text-[#334455] mb-6 pt-4 relative z-10 font-bold", children: "実績重視" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#009DE0] font-bold mb-4 block tracking-wide relative z-10", children: "合格まで二人三脚" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-7 text-[#334455]/80 relative z-10", children: "基礎固めから難関大学受験まで、確かな実績に基づいた指導を提供します。 定期テストの点数アップはもちろん、沼津エリアからの理系大学受験対策まで、最適なカリキュラムを作成。" })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "achievements", className: "py-20 md:py-32 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold", children: "合格実績" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 tracking-widest uppercase font-bold", children: "Achievements" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg border-t-4 border-[#009DE0] shadow-sm h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-20px] right-[-20px] text-[#009DE0]/5 rotate-12", children: /* @__PURE__ */ jsx(GraduationCap, { size: 150 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-[#009DE0]/10 rounded-full text-[#009DE0]", children: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-bold text-[#334455]", children: "大学合格実績" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 relative z-10", children: [
              ["東北大学", "東京理科大学", "芝浦工業大学", "立命館大学"].map((school, i) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-3 text-[#334455] font-medium border-b border-dashed border-gray-100 pb-2 last:border-0",
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-[#009DE0] flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: school })
                  ]
                },
                i
              )),
              /* @__PURE__ */ jsx("li", { className: "text-right text-sm text-[#334455]/50 mt-2 font-medium", children: "など" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg border-t-4 border-[#D6DE26] shadow-sm h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-20px] right-[-20px] text-[#D6DE26]/20 rotate-12", children: /* @__PURE__ */ jsx(GraduationCap, { size: 150 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-[#D6DE26]/30 rounded-full text-[#8c9400]", children: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-bold text-[#334455]", children: "高校合格実績" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 relative z-10", children: [
              ["沼津東高校", "沼津西高校", "韮山高校", "三島北高校"].map((school, i) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-3 text-[#334455] font-medium border-b border-dashed border-gray-100 pb-2 last:border-0",
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-[#D6DE26] flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: school })
                  ]
                },
                i
              )),
              /* @__PURE__ */ jsx("li", { className: "text-right text-sm text-[#334455]/50 mt-2 font-medium", children: "など" })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "gallery", className: "py-20 md:py-32 overflow-hidden", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center mb-12", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold", children: "教室の雰囲気" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 tracking-widest uppercase font-bold", children: "Gallery" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[1400px] mx-auto group", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollGallery("left"),
              className: "hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300",
              "aria-label": "前の写真へ",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollGallery("right"),
              className: "hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-[#009DE0] hover:text-white items-center justify-center rounded-full shadow-lg text-[#009DE0] transition-all opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300",
              "aria-label": "次の写真へ",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 24 })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: scrollContainerRef,
              className: "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-8 px-6 md:px-[max(1rem,calc(50vw-500px))]",
              style: { scrollBehavior: "smooth", msOverflowStyle: "none", scrollbarWidth: "none" },
              children: [
                galleryImages.map((img, index) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "snap-center flex-shrink-0 w-[85vw] md:w-[600px] h-[50vw] md:h-[400px] relative rounded-lg overflow-hidden bg-gray-100 group/image cursor-pointer shadow-md",
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: img.src,
                        alt: img.alt,
                        className: "w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-1000 ease-out brightness-110 saturate-125 contrast-105",
                        loading: "lazy"
                      }
                    )
                  },
                  index
                )),
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-6 md:w-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "md:hidden text-center mt-6 text-xs text-[#334455]/60 tracking-widest animate-pulse", children: [
            "Swipe ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "inline w-3 h-3 ml-1" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "access", className: "py-20 md:py-32 relative border-t border-[#009DE0]/10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#F1F5F9] z-0" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-[#009DE0] mb-2 font-bold", children: "教室情報・アクセス" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#334455]/50 tracking-widest uppercase mb-10 font-bold", children: "Access" }),
            /* @__PURE__ */ jsxs("dl", { className: "space-y-8 text-sm md:text-base", children: [
              /* @__PURE__ */ jsxs("div", { className: "group", children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold", children: "教室名" }),
                /* @__PURE__ */ jsx("dd", { className: "font-medium text-[#334455]", children: "さとう数理塾" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "group", children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold", children: "住所" }),
                /* @__PURE__ */ jsxs("dd", { className: "flex items-start gap-2 text-[#334455] leading-relaxed", children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 18, className: "mt-1 flex-shrink-0 text-[#009DE0]" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "〒410-0052",
                    /* @__PURE__ */ jsx("br", {}),
                    "静岡県沼津市沢田町1-3 牧原ビル102"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "group", children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold", children: "開校日" }),
                  /* @__PURE__ */ jsx("dd", { className: "text-[#334455]", children: "月〜金" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "group", children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold", children: "開校時間" }),
                  /* @__PURE__ */ jsxs("dd", { className: "flex items-center gap-2 text-[#334455]", children: [
                    /* @__PURE__ */ jsx(Clock, { size: 16, className: "text-[#009DE0]" }),
                    "18:50〜21:50"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "group", children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs text-[#334455]/60 mb-1 block tracking-widest group-hover:text-[#009DE0] transition-colors font-bold", children: "休校日" }),
                /* @__PURE__ */ jsxs("dd", { className: "text-[#334455] leading-relaxed", children: [
                  "土日・8月のお盆・年末年始",
                  /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#334455]/60 mt-2", children: "※ 詳しい休校日程は下記の「今月のお休み（Googleカレンダー）」からご確認ください。" })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-4", children: [
            /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://calendar.google.com/calendar/u/0/embed?src=f927cc21f73c5d1b2a2ff1cd51ad58da3288ca06760c437b5e477ec43e87f4da@group.calendar.google.com&ctz=Asia/Tokyo&hl=ja&mode=MONTH&wkst=2&showTitle=0&showTabs=0&showPrint=0",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group flex items-center justify-between p-6 border border-[#009DE0]/20 bg-white hover:border-[#009DE0] hover:shadow-md transition-all duration-300 transform hover:-translate-x-1 relative overflow-hidden rounded-lg shadow-sm",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 bg-[#009DE0]/10 rounded-full group-hover:bg-[#009DE0] transition-colors duration-300", children: /* @__PURE__ */ jsx(
                      Calendar,
                      {
                        className: "text-[#009DE0] group-hover:text-white transition-colors",
                        strokeWidth: 1.5,
                        size: 20
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("span", { className: "text-sm md:text-base font-bold text-[#334455]", children: [
                      "今月のお休みを",
                      /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
                      " Googleカレンダーで見る"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ExternalLink, { size: 18, className: "text-[#009DE0]/50 group-hover:text-[#009DE0]" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://www.google.com/maps?q=%E9%9D%99%E5%B2%A1%E7%9C%8C%E6%B2%BC%E6%B4%A5%E5%B8%82%E6%B2%A2%E7%94%B0%E7%94%BA1-3+%E7%89%A7%E5%8E%9F%E3%83%93%E3%83%AB102",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group flex items-center justify-between p-6 border border-[#009DE0]/20 bg-white hover:border-[#009DE0] hover:shadow-md transition-all duration-300 transform hover:-translate-x-1 relative overflow-hidden rounded-lg shadow-sm",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 bg-[#009DE0]/10 rounded-full group-hover:bg-[#009DE0] transition-colors duration-300", children: /* @__PURE__ */ jsx(
                      MapPin,
                      {
                        className: "text-[#009DE0] group-hover:text-white transition-colors",
                        strokeWidth: 1.5,
                        size: 20
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("span", { className: "text-sm md:text-base font-bold text-[#334455]", children: [
                      "Googleマップで",
                      /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
                      " 教室の場所を見る"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ExternalLink, { size: 18, className: "text-[#009DE0]/50 group-hover:text-[#009DE0]" })
                ]
              }
            ) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "contact", className: "py-20 md:py-32 bg-[#F0F7FF] relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none opacity-30", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-[#009DE0] rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -right-24 w-64 h-64 bg-[#06C755] rounded-full blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 text-center", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("h3", { className: "font-serif text-xl md:text-2xl text-[#334455] mb-6 leading-relaxed", children: [
            "無理な勧誘は一切いたしません。",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("span", { className: "text-sm md:text-base text-[#334455]/80 mt-4 block font-sans", children: [
              "まずは不安を解消し、新しい可能性を見つける場として、",
              /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
              "無料体験・相談をご活用ください。"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 justify-center mt-10 flex-wrap", children: [
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
                  "LINEで気軽に質問する"
                ]
              }
            )
          ] }) })
        ] })
      ] })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "\u3055\u3068\u3046\u6570\u7406\u587E - \u6CBC\u6D25\u30FB\u7406\u7CFB\u7279\u5316\u578B\u306E\u500B\u5225\u6307\u5C0E",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NewHomepage", NewHomepage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/react/NewHomepage", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/index.astro", void 0);

const $$file = "/workspace/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
