import React from 'react';
import { Footprints, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export default function UserChoiceSection() {
  return (
    <section className="bg-slate-50 py-16 px-4 md:py-32 relative overflow-hidden" id="choice">
      {/* シマー効果（光が走る）のアニメーション定義 */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>

      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#009DE0]/5 rounded-full blur-[100px] -translate-x-1/2 mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D6DE26]/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 mix-blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center justify-center py-1.5 px-4 rounded-full bg-white border border-[#009DE0]/20 text-[#009DE0] text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
            Select Your Path
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#334455] mb-2 font-serif leading-tight">
            今のあなたは、
            <br className="md:hidden" />
            どちらに近いですか？
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8 lg:gap-12 px-0 md:px-4">
          {/* 左カード：数学 */}
          <div className="group relative bg-white rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col overflow-hidden transition-transform active:scale-[0.99] duration-200">
            <div className="h-1.5 w-full bg-[#D6DE26]" />
            <div className="p-6 md:p-10 flex flex-col h-full relative z-10">
              <Footprints className="absolute top-4 right-4 text-[#D6DE26]/20 w-16 h-16 -rotate-12" strokeWidth={1.5} />
              <div className="flex-grow mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-[#334455] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-[#D6DE26] inline-block md:hidden"></span>
                  数学から立て直したい
                </h3>
                <p className="text-sm md:text-base text-[#334455]/70 font-medium leading-relaxed">
                  進路の選択肢を守る、
                  <br />
                  その一歩を数学から。
                </p>
              </div>
              <a
                href="/math-nigate"
                className="
                  relative w-full h-14 md:h-16 rounded-full 
                  bg-[#D6DE26] text-[#334455]
                  shadow-[0_4px_10px_rgba(214,222,38,0.4)]
                  flex items-center justify-between px-2 pr-6
                  group/btn overflow-hidden
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(214,222,38,0.5)]
                  active:translate-y-0 active:scale-95 active:shadow-inner
                "
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[#9ca31a] shadow-sm relative z-20">
                  <ArrowRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
                <span className="flex-grow text-center font-bold text-sm md:text-lg tracking-wide relative z-20">
                  このルートに進む
                </span>
                <Sparkles size={18} className="text-[#334455]/40 relative z-20" />
              </a>
            </div>
          </div>

          {/* 右カード：理系 */}
          <div className="group relative bg-white rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col overflow-hidden transition-transform active:scale-[0.99] duration-200">
            <div className="h-1.5 w-full bg-[#009DE0]" />
            <div className="p-6 md:p-10 flex flex-col h-full relative z-10">
              <GraduationCap
                className="absolute top-4 right-4 text-[#009DE0]/10 w-16 h-16 -rotate-12"
                strokeWidth={1.5}
              />
              <div className="flex-grow mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-[#334455] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-[#009DE0] inline-block md:hidden"></span>
                  理系受験の準備を進めたい
                </h3>
                <p className="text-sm md:text-base text-[#334455]/70 font-medium leading-relaxed">
                  理系の選択肢を広げる、
                  <br />
                  その一歩をここから。
                </p>
              </div>
              <a
                href="/rikei"
                className="
                  relative w-full h-14 md:h-16 rounded-full 
                  bg-[#009DE0] text-white
                  shadow-[0_4px_10px_rgba(0,157,224,0.3)]
                  flex items-center justify-between px-2 pr-6
                  group/btn overflow-hidden
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(0,157,224,0.4)]
                  active:translate-y-0 active:scale-95 active:shadow-inner
                "
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner border border-white/20 relative z-20">
                  <ArrowRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
                <span className="flex-grow text-center font-bold text-sm md:text-lg tracking-wide relative z-20 drop-shadow-sm">
                  このルートに進む
                </span>
                <Sparkles size={18} className="text-white/40 relative z-20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
