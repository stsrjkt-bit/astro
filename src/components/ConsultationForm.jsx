import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
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
  Clock,
  Sparkles,
} from 'lucide-react';

// ★★★ EmailJS設定（修正済み） ★★★
const SERVICE_ID = 'service_n0c0j1h';
const TEMPLATE_ID_ADMIN = 'template_uhgfgbf'; // 自分への通知（リスト上）
const TEMPLATE_ID_USER = 'template_rtp1cpn'; // お客様への自動返信（リスト下）
const PUBLIC_KEY = '75aPkLl0nC7hPtQUs';
// ★★★★★★★★★★★★★★★★★★★★★★

// 予約枠の定義
const TIME_SLOTS = [
  '13:00〜13:55',
  '14:00〜14:55',
  '15:00〜15:55',
  '16:00〜16:55',
  '17:00〜17:55',
  '18:00〜18:55',
  '19:00〜19:55',
  '20:00〜20:55',
];

// 直近の土曜日を計算
const getNextSaturdays = (count = 4) => {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  if (daysUntilSaturday === 0 && today.getHours() >= 20) daysUntilSaturday = 7;

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

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [saturdays, setSaturdays] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    setSaturdays(getNextSaturdays(5));
    // EmailJSの初期化
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setErrorMessage('ご希望の相談日時を選択してください。');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const formData = new FormData(e.target);

    // テンプレートに渡すパラメータ
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      grade: formData.get('grade'),
      message: formData.get('message'),
      reservation_date: `${selectedDate} ${selectedTime}`,
    };

    try {
      // 1. 自分（管理者）へ通知メール送信
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParams);

      // 2. お客様へ自動返信メール送信
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, templateParams);

      setSubmitStatus('success');
      e.target.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white border border-[#009DE0]/20 rounded-2xl p-10 text-center max-w-2xl mx-auto my-10 shadow-xl animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#009DE0] to-[#D6DE26]"></div>
        <div className="w-24 h-24 bg-[#009DE0]/10 text-[#009DE0] rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#334455] mb-4 font-serif">ご予約ありがとうございました</h3>
        <p className="text-[#334455]/80 leading-relaxed mb-8 text-lg">
          無料相談のご予約を承りました。
          <br />
          ご入力いただいたメールアドレス宛に、
          <br />
          <strong>当日のご案内メール（予約確定）</strong>をお送りしましたのでご確認ください。
        </p>
        <div className="bg-[#F8FAFC] p-6 rounded-xl inline-block text-left mb-8 border border-[#009DE0]/10">
          <p className="text-sm text-[#334455] font-bold mb-2 flex items-center gap-2">
            <Calendar size={16} className="text-[#009DE0]" />
            ご予約日時
          </p>
          <p className="text-xl text-[#009DE0] font-bold">
            {selectedDate} {selectedTime}
          </p>
        </div>
        <br />
        <a
          href="/"
          className="inline-block text-[#009DE0] font-bold hover:text-[#008ac4] underline hover:no-underline transition-all cursor-pointer"
        >
          トップページへ戻る
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl my-10 border border-[#009DE0]/10 relative overflow-hidden">
      {/* ヘッダー背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-[#009DE0]/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#D6DE26]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#009DE0]/10 text-[#009DE0] px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-wider">
            <Sparkles size={16} /> 土曜限定・個別対応
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#334455] mb-6 leading-tight">
            無料相談 予約フォーム
            <span className="block h-1 w-24 bg-gradient-to-r from-[#009DE0] to-[#D6DE26] mx-auto mt-4 rounded-full"></span>
          </h2>
          <p className="text-[#334455]/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            さとう数理塾の個別指導を体験してみませんか？
            <br />
            土曜日の午後、じっくりと学習相談を承ります。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="bg-[#F8FAFC] p-6 md:p-8 rounded-2xl border border-[#334455]/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#009DE0]"></div>
            <h3 className="flex items-center gap-3 text-xl font-bold text-[#334455] mb-8 pb-4 border-b border-[#334455]/10">
              <Calendar size={28} className="text-[#009DE0]" />
              <div>
                ご希望の日時を選択
                <p className="text-sm text-[#EA5514] font-normal mt-1">*必須項目です</p>
              </div>
            </h3>

            {/* 日付選択 */}
            <div className="mb-8">
              <p className="text-base text-[#334455] mb-4 font-bold flex items-center gap-2">
                <span className="bg-[#334455] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                日程を選ぶ (土曜開催)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {saturdays.map((date, index) => {
                  const dateStr = formatDate(date);
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`py-4 px-2 rounded-xl text-sm font-bold border-2 transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#009DE0] text-white border-[#009DE0] shadow-md transform -translate-y-1'
                          : 'bg-white text-[#334455] border-[#334455]/10 hover:border-[#009DE0] hover:text-[#009DE0] hover:shadow-sm'
                      }`}
                    >
                      <span className="relative z-10">{dateStr}</span>
                      {!isSelected && (
                        <div className="absolute inset-0 bg-[#009DE0]/5 scale-0 group-hover:scale-100 transition-transform origin-center rounded-xl"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 時間選択 */}
            <div
              className={`transition-all duration-500 ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none blur-sm'}`}
            >
              <p className="text-base text-[#334455] mb-4 font-bold flex items-center gap-2">
                <span className="bg-[#334455] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                時間を選ぶ
                <Clock size={18} className="text-[#334455]/50" />
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((time, index) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-1 rounded-lg text-sm font-medium border-2 transition-all ${
                        isSelected
                          ? 'bg-[#D6DE26] text-[#334455] border-[#D6DE26] font-bold shadow-sm'
                          : 'bg-white text-[#334455] border-[#334455]/10 hover:bg-[#D6DE26]/20 hover:border-[#D6DE26]/50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && selectedTime && (
              <div className="mt-8 p-6 bg-[#009DE0]/5 border-2 border-[#009DE0] rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in">
                <CheckCircle2 size={32} className="text-[#009DE0]" />
                <div className="text-center md:text-left">
                  <p className="text-sm text-[#334455]/70 font-bold mb-1">選択中の日時</p>
                  <span className="text-[#334455] font-bold text-xl">
                    <span className="text-[#009DE0]">{selectedDate}</span> の{' '}
                    <span className="text-[#009DE0]">{selectedTime}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8 px-2">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors"
                >
                  <User size={20} className="text-[#009DE0]" />
                  お名前 <span className="text-[#EA5514] text-xs ml-1">*必須</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="例：佐藤 太郎"
                  className="w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="grade"
                  className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors"
                >
                  <GraduationCap size={20} className="text-[#009DE0]" />
                  学年 <span className="text-[#EA5514] text-xs ml-1">*必須</span>
                </label>
                <div className="relative">
                  <select
                    name="grade"
                    id="grade"
                    required
                    defaultValue=""
                    className="w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none appearance-none cursor-pointer shadow-sm"
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
                className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors"
              >
                <Mail size={20} className="text-[#009DE0]" />
                メールアドレス <span className="text-[#EA5514] text-xs ml-1">*必須</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none transition-all shadow-sm"
              />
            </div>
            <div className="group">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-bold text-[#334455] mb-2 group-focus-within:text-[#009DE0] transition-colors"
              >
                <MessageSquare size={20} className="text-[#009DE0]" />
                今の悩み・相談したいこと <span className="text-[#EA5514] text-xs ml-1">*必須</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                placeholder="「数学のテストが30点台で...」「理系に行きたいけど物理が不安」など、簡単で構いませんのでご記入ください。"
                className="w-full px-4 py-4 rounded-xl bg-[#F8FAFC] border-2 border-[#334455]/10 focus:bg-white focus:border-[#009DE0] outline-none resize-y transition-all shadow-sm"
              ></textarea>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 p-6 rounded-xl text-base border-2 border-red-100 animate-pulse">
              <AlertCircle size={24} className="flex-shrink-0" />
              <p className="font-bold">{errorMessage}</p>
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-5 rounded-full shadow-xl transition-all duration-300 flex justify-center items-center text-xl gap-3 ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-white shadow-none'
                  : 'bg-gradient-to-r from-[#009DE0] to-[#008ac4] hover:from-[#008ac4] hover:to-[#0078b0] text-white hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={28} />
                  送信中...
                </>
              ) : (
                <>
                  <Send size={24} />
                  この内容で予約を申し込む
                </>
              )}
            </button>
            <p className="text-center text-sm text-[#334455]/60 mt-6 leading-relaxed">
              ご入力いただいたメールアドレス宛に、
              <br className="md:hidden" />
              予約完了の自動返信メールが送信されます。
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
