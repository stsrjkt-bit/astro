import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CmjTqM-c.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from '../chunks/PageLayout_D8B0VJ2z.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as actions } from '../chunks/_astro_actions_C5xhioEB.mjs';
import { CheckCircle2, Calendar, Sparkles, Clock, User, GraduationCap, Mail, MessageSquare, AlertCircle, Loader2, Send } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const TIME_SLOTS = [
  "13:00〜13:55",
  "14:00〜14:55",
  "15:00〜15:55",
  "16:00〜16:55",
  "17:00〜17:55",
  "18:00〜18:55",
  "19:00〜19:55",
  "20:00〜20:55"
];
const getNextSaturdays = (count = 4) => {
  const dates = [];
  const today = /* @__PURE__ */ new Date();
  const dayOfWeek = today.getDay();
  let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  if (daysUntilSaturday === 0 && today.getHours() >= 20) {
    daysUntilSaturday = 7;
  }
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  for (let i = 0; i < count; i++) {
    const d = new Date(nextSaturday);
    d.setDate(nextSaturday.getDate() + i * 7);
    dates.push(d);
  }
  return dates;
};
const formatDate = (date) => {
  return `${date.getMonth() + 1}月${date.getDate()}日(土)`;
};
function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [saturdays, setSaturdays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    setSaturdays(getNextSaturdays(5));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMessage("ご希望の相談日時を選択してください。");
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");
    const formData = new FormData(e.target);
    const reservationDateTime = `${selectedDate} ${selectedTime}`;
    formData.append("reservationDate", reservationDateTime);
    try {
      const { data, error } = await actions.sendConsultation(formData);
      if (error) {
        setSubmitStatus("error");
        setErrorMessage(error.message || "送信中にエラーが発生しました。");
      } else {
        setSubmitStatus("success");
        e.target.reset();
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("予期せぬエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitStatus === "success") {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-[#009DE0]/20 rounded-2xl p-10 text-center max-w-2xl mx-auto my-10 shadow-xl animate-fade-in relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#009DE0] to-[#D6DE26]" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-[#009DE0]/10 text-[#009DE0] rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 48, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-[#334455] mb-4 font-serif", children: "ご予約ありがとうございました" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 leading-relaxed mb-8 text-lg", children: [
        "無料相談のご予約を承りました。",
        /* @__PURE__ */ jsx("br", {}),
        "ご入力いただいたメールアドレス宛に、",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "当日のご案内メール（予約確定）" }),
        "をお送りしましたのでご確認ください。"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#F8FAFC] p-6 rounded-xl inline-block text-left mb-8 border border-[#009DE0]/10", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#334455] font-bold mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { size: 16, className: "text-[#009DE0]" }),
          "ご予約日時"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-[#009DE0] font-bold", children: [
          selectedDate,
          " ",
          selectedTime
        ] })
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "text-[#009DE0] font-bold hover:text-[#008ac4] underline hover:no-underline transition-all",
          children: "トップページへ戻る"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl my-10 border border-[#009DE0]/10 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-[#009DE0]/10 to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#D6DE26]/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-8 md:p-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#009DE0]/10 text-[#009DE0] px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-wider", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 16 }),
          " 土曜限定・個別対応"
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "font-serif text-3xl md:text-4xl font-bold text-[#334455] mb-6 leading-tight", children: [
          "無料相談 予約フォーム",
          /* @__PURE__ */ jsx("span", { className: "block h-1 w-24 bg-gradient-to-r from-[#009DE0] to-[#D6DE26] mx-auto mt-4 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[#334455]/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto", children: [
          "さとう数理塾の個別指導を体験してみませんか？",
          /* @__PURE__ */ jsx("br", {}),
          "土曜日の午後、じっくりと学習相談を承ります。"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F8FAFC] p-6 md:p-8 rounded-2xl border border-[#334455]/5 shadow-sm relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-2 h-full bg-[#009DE0]" }),
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-3 text-xl font-bold text-[#334455] mb-8 pb-4 border-b border-[#334455]/10", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 28, className: "text-[#009DE0]" }),
            /* @__PURE__ */ jsxs("div", { children: [
              "ご希望の日時を選択",
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#EA5514] font-normal mt-1", children: "*必須項目です" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-base text-[#334455] mb-4 font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-[#334455] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "1" }),
              "日程を選ぶ (土曜開催)"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: saturdays.map((date, index) => {
              const dateStr = formatDate(date);
              const isSelected = selectedDate === dateStr;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedDate(dateStr),
                  className: `py-4 px-2 rounded-xl text-sm font-bold border-2 transition-all relative overflow-hidden group ${isSelected ? "bg-[#009DE0] text-white border-[#009DE0] shadow-md transform -translate-y-1" : "bg-white text-[#334455] border-[#334455]/10 hover:border-[#009DE0] hover:text-[#009DE0] hover:shadow-sm"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: dateStr }),
                    !isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#009DE0]/5 scale-0 group-hover:scale-100 transition-transform origin-center rounded-xl" })
                  ]
                },
                index
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `transition-all duration-500 ${selectedDate ? "opacity-100" : "opacity-50 pointer-events-none blur-sm"}`, children: [
            /* @__PURE__ */ jsxs("p", { className: "text-base text-[#334455] mb-4 font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-[#334455] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "2" }),
              "時間を選ぶ",
              /* @__PURE__ */ jsx(Clock, { size: 18, className: "text-[#334455]/50" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: TIME_SLOTS.map((time, index) => {
              const isSelected = selectedTime === time;
              return /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedTime(time),
                  className: `py-3 px-1 rounded-lg text-sm font-medium border-2 transition-all ${isSelected ? "bg-[#D6DE26] text-[#334455] border-[#D6DE26] font-bold shadow-sm" : "bg-white text-[#334455] border-[#334455]/10 hover:bg-[#D6DE26]/20 hover:border-[#D6DE26]/50"}`,
                  children: time
                },
                index
              );
            }) })
          ] }),
          selectedDate && selectedTime && /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-[#009DE0]/5 border-2 border-[#009DE0] rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { size: 32, className: "text-[#009DE0]" }),
            /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#334455]/70 font-bold mb-1", children: "選択中の日時" }),
              /* @__PURE__ */ jsxs("span", { className: "text-[#334455] font-bold text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0]", children: selectedDate }),
                " の ",
                /* @__PURE__ */ jsx("span", { className: "text-[#009DE0]", children: selectedTime })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 px-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "name", className: "flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors", children: [
                /* @__PURE__ */ jsx(User, { size: 20, className: "text-[#009DE0]" }),
                "お名前 ",
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] text-xs ml-1", children: "*必須" })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "name", id: "name", required: true, placeholder: "例：佐藤 太郎", className: "w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "grade", className: "flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors", children: [
                /* @__PURE__ */ jsx(GraduationCap, { size: 20, className: "text-[#009DE0]" }),
                "学年 ",
                /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] text-xs ml-1", children: "*必須" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs("select", { name: "grade", id: "grade", required: true, defaultValue: "", className: "w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none appearance-none cursor-pointer shadow-sm", children: [
                  /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "選択してください" }),
                  /* @__PURE__ */ jsx("option", { value: "中1", children: "中学1年生" }),
                  /* @__PURE__ */ jsx("option", { value: "中2", children: "中学2年生" }),
                  /* @__PURE__ */ jsx("option", { value: "中3", children: "中学3年生" }),
                  /* @__PURE__ */ jsx("option", { value: "高1", children: "高校1年生" }),
                  /* @__PURE__ */ jsx("option", { value: "高2", children: "高校2年生" }),
                  /* @__PURE__ */ jsx("option", { value: "高3", children: "高校3年生" }),
                  /* @__PURE__ */ jsx("option", { value: "その他", children: "その他" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#334455]/50", children: /* @__PURE__ */ jsx("svg", { className: "fill-current h-5 w-5", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" }) }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors", children: [
              /* @__PURE__ */ jsx(Mail, { size: 20, className: "text-[#009DE0]" }),
              "メールアドレス ",
              /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] text-xs ml-1", children: "*必須" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "email", name: "email", id: "email", required: true, placeholder: "example@email.com", className: "w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "message", className: "flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors", children: [
              /* @__PURE__ */ jsx(MessageSquare, { size: 20, className: "text-[#009DE0]" }),
              "今の悩み・相談したいこと ",
              /* @__PURE__ */ jsx("span", { className: "text-[#EA5514] text-xs ml-1", children: "*必須" })
            ] }),
            /* @__PURE__ */ jsx("textarea", { name: "message", id: "message", rows: "5", required: true, placeholder: "「数学のテストが30点台で...」など、簡単で構いませんのでご記入ください。", className: "w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none resize-y transition-all shadow-sm" })
          ] })
        ] }),
        submitStatus === "error" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-red-50 text-red-600 p-6 rounded-xl text-base border-2 border-red-100 animate-pulse", children: [
          /* @__PURE__ */ jsx(AlertCircle, { size: 24, className: "flex-shrink-0" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: errorMessage })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, className: `w-full font-bold py-5 rounded-full shadow-xl transition-all duration-300 flex justify-center items-center text-xl gap-3 ${isSubmitting ? "bg-gray-300 cursor-not-allowed text-white shadow-none" : "bg-gradient-to-r from-[#009DE0] to-[#008ac4] hover:from-[#008ac4] hover:to-[#0078b0] text-white hover:shadow-2xl hover:-translate-y-1"}`, children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 28 }),
          "送信中..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Send, { size: 24 }),
          "この内容で予約を申し込む"
        ] }) }) })
      ] })
    ] })
  ] });
}

const $$Consultation = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "\u7121\u6599\u5B66\u7FD2\u76F8\u8AC7\u306E\u3054\u4E88\u7D04 - \u3055\u3068\u3046\u6570\u7406\u587E"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ConsultationForm", ConsultationForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/ConsultationForm", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/consultation.astro", void 0);

const $$file = "/workspace/src/pages/consultation.astro";
const $$url = "/consultation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Consultation,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
