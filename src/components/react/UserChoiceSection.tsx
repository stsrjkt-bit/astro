import React from 'react';
import { Footprints, ArrowRight, Sparkles } from 'lucide-react';
import { trackGAEvent } from '~/utils/ga4';
import { trackMetaCustomEvent } from '~/utils/metaPixel';

export default function UserChoiceSection() {
  const handleMathRouteClick = () => {
    const eventParams = {
      route_type: 'math_nigate',
      section: 'choice',
    };

    trackGAEvent('select_route', eventParams);
    trackMetaCustomEvent('SelectRoute', eventParams);
  };

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
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-[#009DE0]/5 rounded-full blur-[100px] -translate-x-1/2 mix-blend-multiply" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center justify-center py-1.5 px-4 rounded-full bg-white border border-[#009DE0]/20 text-[#009DE0] text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
            Select Your Path
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#334455] mb-2 font-serif leading-tight">
            まずは「数学」の学習から
            <br className="md:hidden" />
            立て直しませんか？
          </h2>
        </div>

        <div className="grid px-0 md:px-4">
          {/* カード：数学 */}
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
                onClick={handleMathRouteClick}
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
        </div>
      </div>
    </section>
  );
}
