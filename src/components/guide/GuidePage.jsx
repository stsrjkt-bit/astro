import { useState, useEffect, useRef } from 'react';
import { Menu, X, CheckCircle2, FileText, AlertCircle, Phone } from 'lucide-react';

// --- ブランドカラー定義 ---
// Primary: #009DE0, Secondary: #D6DE26, Text: #334455, Base: #F8FAFC

// --- 共通コンポーネント: アニメーション (Reveal) ---
const Reveal = ({ children, delay = 0, className = '' }) => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
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

// --- メインコンポーネント: ご利用の手引ページ ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // スクロール検知（ヘッダー背景用）
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO: 検索除け (noindex) の設定
  useEffect(() => {
    document.title = 'ご利用の手引 | さとう数理塾';
    // 実際の運用環境ではheadタグ等に直接記述推奨ですが、SPA動作確認用に動的追加します
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      // クリーンアップ
      if (document.head.contains(meta)) document.head.removeChild(meta);
    };
  }, []);

  // ページトップへスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 共通ナビゲーションリンク（トップページに戻る想定）
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: '入塾までの流れ', href: '/join' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334455] font-sans antialiased selection:bg-[#009DE0]/20 overflow-x-hidden relative">
      {/* 背景パターン */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* ===========================================
        HEADER
        ===========================================
      */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${
          scrollPosition > 50
            ? 'bg-[#F8FAFC]/95 backdrop-blur-md border-[#009DE0]/10 py-2 shadow-sm'
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-12 md:h-14 flex items-center justify-between">
          <h1 className="flex items-center">
            <a href="/" className="block w-32 md:w-40 transition-opacity hover:opacity-80">
              <img
                src="https://placehold.co/400x100/transparent/009DE0?text=Sato+Juku+Logo"
                alt="さとう数理塾"
                className="w-full h-auto object-contain"
                width={160}
                height={40}
              />
            </a>
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-[#334455]/70 hover:text-[#009DE0] transition-colors tracking-wider relative group py-2 font-medium"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#009DE0] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-[#334455]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#F8FAFC] border-b border-[#009DE0]/10 shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#334455] py-2 border-b border-gray-200 hover:text-[#009DE0] hover:pl-2 transition-all font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ===========================================
        MAIN CONTENT (Guide Body)
        ===========================================
      */}
      <main className="pt-24 pb-20 px-4 md:px-6 w-full">
        <div className="max-w-3xl mx-auto">
          {/* Page Title & Intro */}
          <Reveal>
            <div className="mb-12 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#009DE0] tracking-widest mb-3 uppercase">
                <FileText size={14} /> Guide
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-[#334455] font-bold mb-6">ご利用の手引</h1>
              <p className="text-[#334455]/80 leading-relaxed text-sm md:text-base">
                さとう数理塾をご利用いただきありがとうございます。
                <br className="hidden md:inline" />
                本書は、保護者様・生徒さんに安心して通塾していただくためのルールとお願いをまとめたものです。
                <br className="hidden md:inline" />
                ご一読のうえ、ご家庭でも共有いただけますと幸いです。
              </p>
            </div>
          </Reveal>

          {/* Document Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <Reveal delay={100}>
              <section className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20">
                  <span className="text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]">01</span>
                  ご来塾・教室利用のルール
                </h2>

                <div className="space-y-10">
                  {/* Block: 駐車場 */}
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      駐車場のご利用について
                    </h3>
                    <p className="text-[#334455]/80 mb-4 text-sm leading-relaxed">
                      皆様の安全でスムーズな送迎のため、以下の点にご協力ください。
                    </p>
                    <ul className="space-y-3 bg-[#F8FAFC] p-5 rounded-lg border border-gray-100">
                      <li className="flex items-start gap-3 text-sm text-[#334455]">
                        <CheckCircle2 size={18} className="text-[#009DE0] mt-0.5 shrink-0" />
                        <span>2台分の駐車スペースが確保できるようにお停めください。</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-[#334455]">
                        <CheckCircle2 size={18} className="text-[#009DE0] mt-0.5 shrink-0" />
                        <span>横付け駐車は避け、前向きまたはバックで駐車してください。</span>
                      </li>
                    </ul>
                    <p className="text-xs text-[#EA5514] mt-3 flex items-start gap-1.5 font-medium ml-1">
                      <AlertCircle size={14} className="mt-0.5 shrink-0" />
                      万が一の事故等につきましては、塾としての対応が難しい場合がございます。あらかじめご了承ください。
                    </p>
                  </div>

                  {/* Block: 飲食 */}
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      飲み物・食べ物について
                    </h3>
                    <div className="text-[#334455]/80 text-sm leading-relaxed space-y-2 pl-4 border-l border-gray-100">
                      <p>教室内での飲み物は持ち込み可です。ただし、匂いの強い飲み物はお控えください。</p>
                      <p className="font-bold text-[#334455] bg-[#F8FAFC] inline-block px-2 py-1 rounded text-xs md:text-sm">
                        食べ物の持ち込み・飲食はご遠慮ください。
                      </p>
                    </div>
                  </div>

                  {/* Block: 入室時間 */}
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      ご入室の時間について
                    </h3>
                    <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                      授業開始前は清掃等の準備を行っております。
                      <br />
                      そのため、<span className="font-bold text-[#009DE0]">開店時間以降にご入室</span>
                      いただきますよう、お願いいたします。
                    </p>
                  </div>

                  {/* Block: 自転車 */}
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      自転車でお越しの場合
                    </h3>
                    <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                      自転車は、教室に向かって
                      <span className="font-bold border-b-2 border-[#D6DE26]/50">左側の壁際に整列して</span>
                      お停めください。
                    </p>
                  </div>

                  {/* Block: 汗のケア */}
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      汗のケアについて
                    </h3>
                    <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                      限られた空間で多くの生徒さんが学習します。皆さんが気持ちよく過ごせるよう、ご協力ください。
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Section 2 */}
            <Reveal delay={200}>
              <section className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20">
                  <span className="text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]">02</span>
                  体調管理と感染症対策
                </h2>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      体調不良時の出欠について
                    </h3>
                    <div className="bg-[#F0F7FF] p-5 rounded-lg border border-[#009DE0]/10 text-sm text-[#334455] leading-relaxed">
                      <p className="mb-2 font-bold">
                        発熱・咳・のどの痛み・強いだるさなど、体調がすぐれない場合は無理をせず欠席をお願いいたします。
                      </p>
                      <p className="opacity-80">感染症拡大防止のためにも、ご理解とご協力をお願いいたします。</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="pl-4 border-l border-gray-100">
                      <h3 className="text-lg font-bold text-[#334455] mb-3">マスク着用について</h3>
                      <p className="text-[#334455]/80 text-sm leading-relaxed">
                        教室内では、感染症予防の観点からマスクの着用をお願いしています。
                      </p>
                    </div>
                    <div className="pl-4 border-l border-gray-100">
                      <h3 className="text-lg font-bold text-[#334455] mb-3">手洗いについて</h3>
                      <p className="text-[#334455]/80 text-sm leading-relaxed">
                        塾のPCを使用する前には、必ず石けんでの手洗いをお願いいたします。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Section 3 */}
            <Reveal delay={300}>
              <section className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20">
                  <span className="text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]">03</span>
                  お問い合わせ・ご連絡について
                </h2>

                <div className="space-y-10">
                  {/* Contact Box */}
                  <div className="bg-[#334455] text-white p-6 md:p-8 rounded-xl shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#009DE0] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                      <Phone size={20} className="text-[#D6DE26]" />
                      連絡先
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                      <div>
                        <span className="block text-[10px] font-bold text-white/50 tracking-widest uppercase mb-2">
                          Emergency
                        </span>
                        <p className="text-xs font-bold text-white/80 mb-1">緊急のご連絡先</p>
                        <a
                          href="tel:080-8108-0767"
                          className="text-2xl font-bold font-sans tracking-wide hover:text-[#009DE0] transition-colors"
                        >
                          080-8108-0767
                        </a>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-white/50 tracking-widest uppercase mb-2">
                          Inquiry
                        </span>
                        <p className="text-xs font-bold text-white/80 mb-1">緊急でないお問い合わせ</p>
                        <p className="text-sm text-white/90 leading-relaxed">
                          LINEまたはメールにて
                          <br />
                          お問い合わせください。
                          <br />
                          <a
                            href="mailto:stsrjk@gmail.com"
                            className="text-[#009DE0] underline decoration-white/20 underline-offset-4 mt-1 inline-block"
                          >
                            stsrjk@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 mt-6 pt-4 border-t border-white/10 relative z-10">
                      ※ 授業中など、すぐに電話に出られない場合があります。その際は折り返しご連絡いたします。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      勉強に関するご質問について
                    </h3>
                    <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                      勉強の進め方や問題の解き方などのご質問は、できるだけお子様ご本人から授業中にご相談いただくようお願いしています。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#334455] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                      お子様ご本人へのご確認をお願いしたいこと
                    </h3>
                    <p className="text-[#334455]/80 text-sm leading-relaxed mb-4 pl-4">
                      以下の内容につきましては、まずはご家庭でお子様ご本人にご確認ください。
                    </p>
                    <div className="bg-[#F8FAFC] p-6 rounded-lg border border-gray-100 mb-6">
                      <ul className="space-y-3">
                        {[
                          'きちんと勉強できているか',
                          '学校や塾の成績表を見せているか',
                          '困っていることを先生に相談しているか',
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-[#334455] font-medium">
                            <div className="w-5 h-5 rounded-full border-2 border-[#009DE0]/20 flex items-center justify-center bg-white shrink-0">
                              <span className="block w-2 h-2 bg-[#009DE0] rounded-full"></span>
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                      当塾では、生徒さんに「勉強は強制しないけれど、自分で考えて動いてみよう」というスタンスを伝えています。
                      <br />
                      そのため、お子様を飛び越えて、塾から一方的に保護者様に指導状況等をお伝えすることは控えております。何とぞご理解ください。
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Section 4 */}
            <Reveal delay={400}>
              <section className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#009DE0]/10">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-serif text-[#009DE0] font-bold mb-8 pb-4 border-b border-[#009DE0]/20">
                  <span className="text-3xl opacity-20 font-sans font-black select-none text-[#009DE0]">04</span>
                  その他のご案内
                </h2>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-[#334455] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                        臨時休業について
                      </h3>
                      <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                        台風や大雪、講師の急病などによる臨時休業は、メールおよび教室入口の掲示にてお知らせいたします。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#334455] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#D6DE26] rounded-full"></span>
                        退塾について
                      </h3>
                      <p className="text-[#334455]/80 text-sm leading-relaxed pl-4 border-l border-gray-100">
                        退塾をご希望の際は、メール（
                        <a href="mailto:stsrjk@gmail.com" className="text-[#009DE0] underline">
                          stsrjk@gmail.com
                        </a>
                        ）にてご連絡をお願いいたします。
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-dashed border-gray-200 text-center mt-8">
                    <p className="text-[#334455] font-serif font-medium text-lg mb-8">
                      これまでのご通塾に、心より感謝申し上げます。
                    </p>
                    <p className="text-[#334455]/80 text-sm mb-2">
                      以上となります。ご不明な点がございましたら、どうぞ遠慮なくお問い合わせください。
                    </p>
                    <p className="text-[#334455] font-bold text-sm">さとう数理塾 佐藤</p>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Disclaimer */}
            <p className="text-center text-xs text-[#334455]/40 mt-12 pb-8">
              ※ 本ページの内容は随時見直し・更新する可能性があります。（最終更新: 2025年11月）
            </p>
          </div>
        </div>
      </main>

      {/* ===========================================
        FOOTER
        ===========================================
      */}
      <footer className="bg-white text-[#334455]/60 py-12 border-t border-[#009DE0]/10">
        <Reveal>
          <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
            <div className="mb-4 w-32 md:w-40">
              <img
                src="https://placehold.co/400x100/transparent/009DE0?text=Sato+Juku+Logo"
                alt="さとう数理塾"
                className="w-full h-auto object-contain opacity-80"
                width={160}
                height={40}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs tracking-wider mb-8 font-medium">
              <span>〒410-0052 静岡県沼津市沢田町1-3 牧原ビル102</span>
            </div>
            <p className="text-[10px] tracking-widest opacity-60">© 2016-2025 さとう数理塾</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
