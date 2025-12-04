import React, { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser'; // 削除: CDN経由で読み込みます
import {
  User,
  Mail,
  GraduationCap,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Sparkles,
  Gift,
  School,
} from 'lucide-react';
import { trackMetaEvent } from '~/utils/metaPixel';
import { trackGAEvent } from '~/utils/ga4';

// --- EmailJS 設定 (本番用) ---
const SERVICE_ID = 'service_n0c0j1h';
const PUBLIC_KEY = '75aPkLl0nC7hPtQUs';

// 無料体験フォーム用テンプレートID
const TEMPLATE_ID_TRIAL = 'template_uhgfgbf';

// --- ヘルパー関数 ---

// 体験月の選択肢を生成（現在から2ヶ月分）
const getUpcomingMonths = () => {
  const options = [];
  const today = new Date();

  for (let i = 0; i < 2; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    options.push(`${d.getFullYear()}年${d.getMonth() + 1}月`);
  }
  return options;
};

// --- メインコンポーネント ---

function TrialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailJsLoaded, setIsEmailJsLoaded] = useState(false);

  // フォームの状態
  const [trialMonths, setTrialMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [campaign, setCampaign] = useState('');

  // EmailJSスクリプトの動的読み込み
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      setIsEmailJsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setTrialMonths(getUpcomingMonths());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const value = params.get('campaign') || '';
    setCampaign(value);
  }, []);

  // --- 送信処理 ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    if (!isEmailJsLoaded || !window.emailjs) {
      setErrorMessage('送信システムを読み込み中です。数秒待ってから再度お試しください。');
      setIsSubmitting(false);
      return;
    }

    // フォームデータから値を取得
    const formData = new FormData(e.currentTarget);

    const campaignValue = campaign || '';

    // EmailJSに渡すパラメータを構築
    const templateParams = {
      // フォームの入力項目
      month: selectedMonth, // 体験希望月（Stateから）
      name: formData.get('name'), // お名前
      grade: formData.get('grade'), // 学年
      email: formData.get('email'), // メールアドレス
      message: formData.get('message') || 'なし', // ご質問・ご要望
      campaign: campaignValue,
      campaign_label: campaignValue === 'xmas_high1_2025' ? '高1理系スタート応援オファー（初月 14,800円 税込）' : '',
    };

    try {
      // EmailJSによる送信（自動返信 + BCC管理者通知）
      // window.emailjs を使用
      await window.emailjs.send(SERVICE_ID, TEMPLATE_ID_TRIAL, templateParams, {
        publicKey: PUBLIC_KEY,
      });

      // 成功時の処理
      setSubmitStatus('success');
      trackMetaEvent('Lead', {
        type: 'trial_form_submit',
        pageType: 'trial',
      });
      trackGAEvent('trial_form_submit', {
        page_location: window.location.pathname,
        value: 1,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信完了画面
  if (submitStatus === 'success') {
    return (
      <div className="bg-white border border-[#009DE0]/20 rounded-2xl p-6 md:p-10 text-center max-w-2xl mx-auto shadow-xl animate-fade-in relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#009DE0] to-[#D6DE26]"></div>
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#009DE0]/10 text-[#009DE0] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
          <CheckCircle2 size={40} strokeWidth={1.5} className="md:w-12 md:h-12" />
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-[#334455] mb-4 font-serif">
          お申込み
          <br className="md:hidden" />
          ありがとうございました
        </h3>
        <p className="text-[#334455]/80 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
          無料体験授業のお申込みを受け付けました。
          <br />
          ご入力いただいたメールアドレス宛に、
          <br />
          <strong>お申込み受付完了メール</strong>をお送りしました。
        </p>
        <div className="bg-[#F8FAFC] p-5 md:p-6 rounded-xl inline-block text-left mb-8 border border-[#009DE0]/10 w-full md:w-auto">
          <p className="text-xs md:text-sm text-[#334455] font-bold mb-2 flex items-center gap-2">
            <Calendar size={16} className="text-[#009DE0]" />
            体験希望月
          </p>
          <p className="text-lg md:text-xl text-[#009DE0] font-bold">{selectedMonth}</p>
        </div>
        <br />
        <button
          onClick={() => window.location.reload()}
          className="w-full md:w-auto py-3 md:py-0 inline-block text-[#009DE0] font-bold hover:text-[#008ac4] underline hover:no-underline transition-all cursor-pointer"
        >
          トップページへ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-[#F8FAFC] rounded-2xl md:rounded-3xl shadow-xl border border-[#009DE0]/10 relative overflow-hidden font-sans">
      {/* ヘッダー背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-48 md:h-64 bg-gradient-to-br from-[#009DE0]/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-30px] right-[-30px] w-40 h-40 md:w-64 md:h-64 bg-[#D6DE26]/10 rounded-full blur-2xl md:blur-3xl pointer-events-none"></div>

      {/* お得なバッジ装飾 */}
      <div className="absolute top-3 right-3 md:top-8 md:right-8 animate-bounce-slow z-20">
        <div className="bg-gradient-to-r from-[#D6DE26] to-[#c0c918] text-[#334455] font-black text-[10px] md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg transform rotate-3 flex items-center gap-1 border-2 border-white whitespace-nowrap">
          <Gift size={12} className="md:w-4 md:h-4" /> 最大1ヶ月無料!
        </div>
      </div>

      <div className="relative z-10 p-5 md:p-12 pb-8">
        <div className="text-center mb-8 md:mb-10 mt-8 md:mt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#009DE0]/10 text-[#009DE0] px-3 py-1 rounded-full text-xs md:text-sm font-bold mb-4 tracking-wider">
            <Sparkles size={14} className="md:w-4 md:h-4" /> まずはお試し
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#334455] mb-5 leading-tight">
            無料体験のお申込み
            <span className="block h-1 w-16 md:w-24 bg-gradient-to-r from-[#009DE0] to-[#D6DE26] mx-auto mt-3 rounded-full"></span>
          </h2>

          {/* 説明文エリア */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#009DE0]/20 rounded-xl p-4 md:p-6 max-w-xl mx-auto shadow-sm">
            <p className="text-[#334455]/90 text-sm md:text-base leading-relaxed font-medium text-left md:text-center">
              さとう数理塾の授業を
              <span className="text-[#009DE0] font-bold border-b-2 border-[#D6DE26] whitespace-nowrap">
                実際の通塾と同じ形
              </span>
              でお試しいただけます。
            </p>
            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-[#334455]/70">
              <span className="flex items-center gap-1.5 bg-[#F8FAFC] px-2 py-1 rounded-lg w-full sm:w-auto">
                <Calendar size={14} className="text-[#009DE0]" /> 体験は各月ごとに実施
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8FAFC] px-2 py-1 rounded-lg w-full sm:w-auto">
                <School size={14} className="text-[#009DE0]" /> 教室の雰囲気を体感
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <input type="hidden" name="campaign" value={campaign || ''} />

          {campaign === 'xmas_high1_2025' && (
            <div className="mb-4 md:mb-6 p-4 md:p-5 rounded-xl border-2 border-[#EA5514]/30 bg-[#FFF7ED] text-[#7C2D12] shadow-sm">
              <p className="text-xs md:text-sm font-bold text-[#EA5514] tracking-[0.15em] uppercase mb-1">
                🎁 高1理系スタート 応援オファー適用中
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                このページからのお申し込みは、
                <span className="font-bold"> 初月月謝 14,800円（税込）</span>
                が適用されます（通常 17,600円）。
                <br className="hidden md:inline" />※ 高1の方が対象です。
              </p>
            </div>
          )}

          {/* セクション1: 体験月選択 */}
          <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-[#334455]/5 shadow-sm relative overflow-hidden group hover:border-[#009DE0]/30 transition-colors">
            <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-[#D6DE26]"></div>
            <h3 className="flex items-center gap-2.5 text-lg md:text-xl font-bold text-[#334455] mb-4 md:mb-6">
              <Calendar size={24} className="text-[#D6DE26] md:w-7 md:h-7" />
              <div>
                体験する月を選ぶ
                <p className="text-[10px] md:text-sm text-[#EA5514] font-normal mt-0.5 md:mt-1">*必須項目です</p>
              </div>
            </h3>

            <div className="relative">
              <select
                name="month"
                id="month"
                required
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3.5 md:py-5 rounded-lg md:rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:border-[#009DE0] outline-none appearance-none cursor-pointer shadow-sm text-base md:text-lg font-bold text-[#334455] transition-all"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {trialMonths.map((month, index) => (
                  <option key={index} value={month}>
                    {month} の体験授業
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#009DE0]">
                <svg className="fill-current h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* セクション2: 基本情報 */}
          <div className="space-y-5 md:space-y-8 px-1">
            <div className="grid md:grid-cols-2 gap-5 md:gap-8">
              <div className="group">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-1.5 md:mb-2 group-focus-within:text-[#009DE0] transition-colors"
                >
                  <User size={18} className="text-[#009DE0] md:w-5 md:h-5" />
                  お名前 <span className="text-[#EA5514] text-xs ml-1">*必須</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="例：佐藤 太郎"
                  className="w-full px-4 py-3.5 md:py-4 rounded-lg md:rounded-xl bg-white border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm text-base"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="grade"
                  className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-1.5 md:mb-2 group-focus-within:text-[#009DE0] transition-colors"
                >
                  <GraduationCap size={18} className="text-[#009DE0] md:w-5 md:h-5" />
                  学年 <span className="text-[#EA5514] text-xs ml-1">*必須</span>
                </label>
                <div className="relative">
                  <select
                    name="grade"
                    id="grade"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3.5 md:py-4 rounded-lg md:rounded-xl bg-white border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none appearance-none cursor-pointer shadow-sm text-base"
                  >
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="中1">中学1年生</option>
                    <option value="中2">中学2年生</option>
                    <option value="中3">中学3年生</option>
                    <option value="高1">高校1年生</option>
                    <option value="高2">高校2年生</option>
                    <option value="高3">高校3年生</option>
                    <option value="その他">その他</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#334455]/50">
                    <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-1.5 md:mb-2 group-focus-within:text-[#009DE0] transition-colors"
              >
                <Mail size={18} className="text-[#009DE0] md:w-5 md:h-5" />
                メールアドレス <span className="text-[#EA5514] text-xs ml-1">*必須</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3.5 md:py-4 rounded-lg md:rounded-xl bg-white border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm text-base"
              />
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-1.5 md:mb-2 group-focus-within:text-[#009DE0] transition-colors"
              >
                <MessageSquare size={18} className="text-[#009DE0] md:w-5 md:h-5" />
                その他ご質問・ご要望 <span className="text-[#334455]/50 text-xs ml-1">(任意)</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder="こちらにご記入ください。"
                className="w-full px-4 py-3.5 md:py-4 rounded-lg md:rounded-2xl bg-white border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none resize-y transition-all shadow-sm text-base"
              ></textarea>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 md:p-6 rounded-xl text-sm md:text-base border-2 border-red-100 animate-pulse">
              <AlertCircle size={24} className="flex-shrink-0" />
              <p className="font-bold">{errorMessage}</p>
            </div>
          )}

          <div className="pt-4 md:pt-6 pb-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-4 md:py-5 rounded-full shadow-xl transition-all duration-300 flex justify-center items-center text-lg md:text-xl gap-2 md:gap-3 ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-white shadow-none'
                  : 'bg-gradient-to-r from-[#009DE0] to-[#008ac4] hover:from-[#008ac4] hover:to-[#0078b0] text-white hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin md:w-7 md:h-7" size={24} />
                  送信中...
                </>
              ) : (
                <>
                  <Send size={20} className="md:w-6 md:h-6" />
                  無料で体験を申し込む
                </>
              )}
            </button>
            <p className="text-center text-xs md:text-sm text-[#334455]/60 mt-4 md:mt-6 leading-relaxed">
              ご入力いただいたメールアドレス宛に、
              <br className="sm:hidden" />
              確認メールが自動で送信されます。
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] py-4 px-3 sm:py-8 sm:px-6">
      <TrialForm />
    </div>
  );
}
