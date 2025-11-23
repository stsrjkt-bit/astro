import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_7FE2qpej.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Zkm1TCFP.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { X, Menu, FileText, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
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
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.title = "ご利用の手引 | さとう数理塾";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      if (document.head.contains(meta)) document.head.removeChild(meta);
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "入塾までの流れ", href: "/#contact" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F8FAFC] text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 overflow-x-hidden relative", children: [
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
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: `fixed w-full top-0 z-50 transition-all duration-500 border-b ${scrollPosition > 50 ? "bg-[#F8FAFC]/95 backdrop-blur-md border-[#009DE0]/10 py-2 shadow-sm" : "bg-transparent border-transparent py-4"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 h-12 md:h-14 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h1", { className: "flex items-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "block w-32 md:w-40 transition-opacity hover:opacity-80", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://placehold.co/400x100/transparent/009DE0?text=Sato+Juku+Logo",
                alt: "さとう数理塾",
                className: "w-full h-auto object-contain",
                width: 160,
                height: 40
              }
            ) }) }),
            /* @__PURE__ */ jsx("nav", { className: "hidden md:flex gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: link.href,
                className: "text-sm text-[#334455]/70 hover:text-[#009DE0] transition-colors tracking-wider relative group py-2 font-medium",
                children: [
                  link.name,
                  /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-[#009DE0] transition-all duration-300 group-hover:w-full" })
                ]
              },
              link.name
            )) }),
            /* @__PURE__ */ jsx("button", { className: "md:hidden p-2 text-[#334455]", onClick: () => setIsMenuOpen(!isMenuOpen), "aria-label": "Menu", children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 }) })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `md:hidden absolute top-full left-0 w-full bg-[#F8FAFC] border-b border-[#009DE0]/10 shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col p-6 gap-4", children: navLinks.map((link) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  className: "text-[#334455] py-2 border-b border-gray-200 hover:text-[#009DE0] hover:pl-2 transition-all font-medium",
                  children: link.name
                },
                link.name
              )) })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("main", { className: "pt-24 pb-20 px-4 md:px-6 w-full", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold text-[#009DE0] tracking-widest mb-3 uppercase", children: [
          /* @__PURE__ */ jsx(FileText, { size: 14 }),
          " Guide"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl md:text-4xl text-[#334455] font-bold mb-6", children: "ご利用の手引" }),
        /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed text-sm md:text-base", children: [
          "さとう数理塾をご利用いただきありがとうございます。",
          /* @__PURE__ */ jsx("br", { className: "hidden md:inline" }),
          "本書は、保護者様・生徒さんに安心して通塾していただくためのルールとお願いをまとめたものです。",
          /* @__PURE__ */ jsx("br", { className: "hidden md:inline" }),
          "ご一読のうえ、ご家庭でも共有いただけますと幸いです。"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxs("section", { className: "bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]", children: "01" }),
            "ご来塾・教室利用のルール"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "駐車場のご利用について"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 mb-4 text-sm leading-relaxed", children: "皆様の安全でスムーズな送迎のため、以下の点にご協力ください。" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 bg-[#F8FAFC] p-5 rounded-lg border border-gray-100", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-[#334455]", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-[#009DE0] mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: "2台分の駐車スペースが確保できるようにお停めください。" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-[#334455]", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-[#009DE0] mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: "横付け駐車は避け、前向きまたはバックで駐車してください。" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#EA5514] mt-3 flex items-start gap-1.5 font-medium ml-1", children: [
                /* @__PURE__ */ jsx(AlertCircle, { size: 14, className: "mt-0.5 shrink-0" }),
                "万が一の事故等につきましては、塾としての対応が難しい場合がございます。あらかじめご了承ください。"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "飲み物・食べ物について"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[#334455]/80 text-sm leading-relaxed space-y-2 pl-4 border-l border-gray-100", children: [
                /* @__PURE__ */ jsx("p", { children: "教室内での飲み物は持ち込み可です。ただし、匂いの強い飲み物はお控えください。" }),
                /* @__PURE__ */ jsx("p", { className: "font-bold text-[#334455] bg-[#F8FAFC] inline-block px-2 py-1 rounded text-xs md:text-sm", children: "食べ物の持ち込み・飲食はご遠慮ください。" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "ご入室の時間について"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: [
                "授業開始前は清掃等の準備を行っております。",
                /* @__PURE__ */ jsx("br", {}),
                "そのため、",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-[#009DE0]", children: "開店時間以降にご入室" }),
                "いただきますよう、お願いいたします。"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "自転車でお越しの場合"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: [
                "自転車は、教室に向かって",
                /* @__PURE__ */ jsx("span", { className: "font-bold border-b-2 border-[#D6DE26]/50", children: "左側の壁際に整列して" }),
                "お停めください。"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "汗のケアについて"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: "限られた空間で多くの生徒さんが学習します。皆さんが気持ちよく過ごせるよう、ご協力ください。" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxs("section", { className: "bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]", children: "02" }),
            "体調管理と感染症対策"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "体調不良時の出欠について"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#F0F7FF] p-5 rounded-lg border border-[#009DE0]/10 text-sm text-[#334455] leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold", children: "発熱・咳・のどの痛み・強いだるさなど、体調がすぐれない場合は無理をせず欠席をお願いいたします。" }),
                /* @__PURE__ */ jsx("p", { className: "opacity-80", children: "感染症拡大防止のためにも、ご理解とご協力をお願いいたします。" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l border-gray-100", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#334455] mb-3", children: "マスク着用について" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed", children: "教室内では、感染症予防の観点からマスクの着用をお願いしています。" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l border-gray-100", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#334455] mb-3", children: "手洗いについて" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed", children: "塾のPCを使用する前には、必ず石けんでの手洗いをお願いいたします。" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxs("section", { className: "bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]", children: "03" }),
            "お問い合わせ・ご連絡について"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#334455] text-white p-6 md:p-8 rounded-xl shadow-md relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[#009DE0] rounded-full blur-3xl opacity-20 pointer-events-none" }),
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold mb-6 flex items-center gap-2 relative z-10", children: [
                /* @__PURE__ */ jsx(Phone, { size: 20, className: "text-[#D6DE26]" }),
                "連絡先"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 relative z-10", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-[10px] font-bold text-white/50 tracking-widest uppercase mb-2", children: "Emergency" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white/80 mb-1", children: "緊急のご連絡先" }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "tel:080-8108-0767",
                      className: "text-2xl font-bold font-sans tracking-wide hover:text-[#009DE0] transition-colors",
                      children: "080-8108-0767"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-[10px] font-bold text-white/50 tracking-widest uppercase mb-2", children: "Inquiry" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white/80 mb-1", children: "緊急でないお問い合わせ" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-white/90 leading-relaxed", children: [
                    "LINEまたはメールにて",
                    /* @__PURE__ */ jsx("br", {}),
                    "お問い合わせください。",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:stsrjk@gmail.com",
                        className: "text-[#009DE0] underline decoration-white/20 underline-offset-4 mt-1 inline-block",
                        children: "stsrjk@gmail.com"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/40 mt-6 pt-4 border-t border-white/10 relative z-10", children: "※ 授業中など、すぐに電話に出られない場合があります。その際は折り返しご連絡いたします。" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "勉強に関するご質問について"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: "勉強の進め方や問題の解き方などのご質問は、できるだけお子様ご本人から授業中にご相談いただくようお願いしています。" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                "お子様ご本人へのご確認をお願いしたいこと"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed mb-4 pl-4", children: "以下の内容につきましては、まずはご家庭でお子様ご本人にご確認ください。" }),
              /* @__PURE__ */ jsx("div", { className: "bg-[#F8FAFC] p-6 rounded-lg border border-gray-100 mb-6", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
                "きちんと勉強できているか",
                "学校や塾の成績表を見せているか",
                "困っていることを先生に相談しているか"
              ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-[#334455] font-medium", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border-2 border-[#009DE0]/20 flex items-center justify-center bg-white shrink-0", children: /* @__PURE__ */ jsx("span", { className: "block w-2 h-2 bg-[#009DE0] rounded-full" }) }),
                item
              ] }, i)) }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: [
                "当塾では、生徒さんに「勉強は強制しないけれど、自分で考えて動いてみよう」というスタンスを伝えています。",
                /* @__PURE__ */ jsx("br", {}),
                "そのため、お子様を飛び越えて、塾から一方的に保護者様に指導状況等をお伝えすることは控えております。何とぞご理解ください。"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsxs("section", { className: "bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]", children: "04" }),
            "その他のご案内"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                  "臨時休業について"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: "台風や大雪、講師の急病などによる臨時休業は、メールおよび教室入口の掲示にてお知らせいたします。" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#334455] mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-6 bg-[#D6DE26] rounded-full" }),
                  "退塾について"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100", children: [
                  "退塾をご希望の際は、メール（",
                  /* @__PURE__ */ jsx("a", { href: "mailto:stsrjk@gmail.com", className: "text-[#009DE0] underline", children: "stsrjk@gmail.com" }),
                  "）にてご連絡をお願いいたします。"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-dashed border-gray-200 text-center mt-8", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#334455] font-serif font-medium text-lg mb-8", children: "これまでのご通塾に、心より感謝申し上げます。" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455]/80 text-sm mb-2", children: "以上となります。ご不明な点がございましたら、どうぞ遠慮なくお問い合わせください。" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#334455] font-bold text-sm", children: "さとう数理塾 佐藤" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-[#334455]/40 mt-12 pb-8", children: "※ 本ページの内容は随時見直し・更新する可能性があります。（最終更新: 2025年11月）" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-white text-[#334455]/60 py-12 border-t border-[#009DE0]/10", children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 w-32 md:w-40", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://placehold.co/400x100/transparent/009DE0?text=Sato+Juku+Logo",
          alt: "さとう数理塾",
          className: "w-full h-auto object-contain opacity-80",
          width: 160,
          height: 40
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs tracking-wider mb-8 font-medium", children: /* @__PURE__ */ jsx("span", { children: "〒410-0052 静岡県沼津市沢田町1-3 牧原ビル102" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-widest opacity-60", children: "© 2016-2025 さとう数理塾" })
    ] }) }) })
  ] });
}

const $$Guide = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "\u3054\u5229\u7528\u306E\u624B\u5F15 | \u3055\u3068\u3046\u6570\u7406\u587E",
    description: "\u3055\u3068\u3046\u6570\u7406\u587E\u3092\u3054\u5229\u7528\u3044\u305F\u3060\u304F\u306B\u3042\u305F\u3063\u3066\u306E\u30EB\u30FC\u30EB\u3068\u304A\u9858\u3044\u3092\u307E\u3068\u3081\u305F\u3082\u306E\u3067\u3059\u3002",
    robots: {
      index: false,
      follow: false
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "GuidePage", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/guide/GuidePage", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/guide.astro", void 0);

const $$file = "/workspace/src/pages/guide.astro";
const $$url = "/guide";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Guide,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
