import React, { useState } from 'react';

// データ定義
const steps = [
  {
    number: 1,
    title: '無料体験のお申込み',
    button: { label: '無料体験のお申込み', url: 'https://forms.gle/qYAiJi3Un4PMDLbc7' },
    checklist: ['無料体験フォームを送信した', '受付メールが届いた'],
  },
  {
    number: 2,
    title: 'ご利用の手引を読む',
    button: { label: 'ご利用の手引を読む', url: '/guide' },
    checklist: ['ご利用の手引を読んだ'],
  },
  {
    number: 3,
    title: '体験授業への参加',
    button: null,
    checklist: ['体験授業に参加して、「ここならやっていけそうか」「雰囲気が合いそうか」を確認した'],
  },
  {
    number: 4,
    title: '入塾のお申込み',
    button: { label: '入塾のお申込み', url: 'https://forms.gle/irFCFdf3qEEuR6Ay9' },
    checklist: ['入塾フォームを送信した', '入塾フォームの受付メールが届いた'],
  },
  {
    number: 5,
    title: '初回費用・口座振替まわり',
    button: null,
    checklist: [
      '案内メールで「初回に払う金額」と「支払期限」を確認した',
      '初回費用を銀行振込した',
      '口座振替の開始が間に合わない場合、2回目の月謝も銀行振込になることを理解した',
      '初回授業で、お子さまが教室で「口座振替依頼書」を受け取った',
      '口座振替依頼書に銀行印を押し、記入漏れ・銀行印のまちがいがないか確認してから提出した',
    ],
  },
];

interface ChecklistItemProps {
  text: string;
  isChecked: boolean;
  onToggle: () => void;
  isStepCompleted: boolean;
}

// チェックリストアイテム単体のコンポーネント
const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, isChecked, onToggle, isStepCompleted }) => {
  return (
    <li
      onClick={onToggle}
      className={`checklist-item flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer select-none group/item border border-transparent
        ${
          isStepCompleted
            ? 'cursor-default'
            : // 未完了時のホバー色を少し明るいブルーに変更
              'hover:bg-blue-50 hover:border-blue-100'
        }`}
    >
      {/* チェックボックスアイコン */}
      <div
        className={`checkbox-icon flex-shrink-0 mt-0.5 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 
        ${
          isChecked
            ? isStepCompleted
              ? 'bg-slate-400 border-slate-400'
              : 'bg-[#06C755] border-[#06C755] shadow-sm'
            : // 未チェック時も少し色味を持たせる（淡いブルーグレー）
              'border-blue-200 bg-white group-hover/item:border-[#009DE0]'
        }`}
      >
        <svg
          className={`w-4 h-4 text-white transition-all duration-300 ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      {/* テキスト */}
      <span
        className={`text-sm md:text-base leading-relaxed transition-all duration-300 ${isChecked ? 'text-slate-400 line-through decoration-slate-400' : 'text-[#334455]'}`}
      >
        {text}
      </span>
    </li>
  );
};

interface Step {
  number: number;
  title: string;
  button: { label: string; url: string } | null;
  checklist: string[];
}

// ステップごとのカードコンポーネント
const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  const [checkedState, setCheckedState] = useState(new Array(step.checklist.length).fill(false));

  const isCompleted = checkedState.every(Boolean);

  const handleToggle = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-500
      ${
        isCompleted
          ? 'bg-slate-100 border border-slate-200 shadow-none' // 完了時はシンプルに
          : 'bg-white border-b border-x border-b-[#009DE0]/10 border-x-[#009DE0]/10 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1' // 通常時は少しリッチに
      }
      // 上部に色付きのラインを追加（ボーダー）
      ${isCompleted ? 'border-t-4 border-t-slate-300' : 'border-t-4 border-t-[#009DE0]'}
    `}
    >
      {/* 装飾: 背景の数字（色を少し青寄りに調整） */}
      <div
        className={`absolute -right-4 -top-6 text-[120px] font-serif font-bold pointer-events-none select-none z-0 transition-colors duration-500
        ${isCompleted ? 'text-slate-200' : 'text-blue-50/80'}`}
      >
        {step.number}
      </div>

      {/* 完了バッジ */}
      <div
        className={`absolute top-4 right-4 md:right-8 z-20 transition-all duration-500 transform
        ${isCompleted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-2 pointer-events-none'}`}
      >
        <span className="inline-flex items-center gap-1 bg-slate-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          COMPLETED
        </span>
      </div>

      <div className={`relative z-10 transition-opacity duration-500 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
        {/* ステップヘッダー */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold shadow-sm font-serif transition-colors duration-500
            ${
              isCompleted
                ? 'bg-slate-400 text-white'
                : 'bg-gradient-to-br from-[#009DE0] to-[#007AB0] text-white shadow-blue-200' // グラデーションに変更
            }`}
          >
            {step.number}
          </div>
          <h2
            className={`text-xl md:text-2xl font-bold transition-colors duration-500 ${isCompleted ? 'text-slate-500' : 'text-[#334455]'}`}
          >
            {step.title}
          </h2>
        </div>

        {/* アクションボタン */}
        {step.button && (
          <div className="mb-6 ml-0 md:ml-16">
            <a
              href={step.button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold shadow transition-all duration-200 text-sm md:text-base w-full md:w-auto cursor-pointer no-underline
                ${
                  isCompleted
                    ? 'bg-slate-300 text-white cursor-default shadow-none pointer-events-none'
                    : 'bg-gradient-to-r from-[#009DE0] to-[#008ac4] text-white hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5'
                }`}
            >
              {step.button.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        )}

        {/* チェックリスト */}
        <ul className="space-y-3 ml-0 md:ml-16">
          {step.checklist.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              isChecked={checkedState[index]}
              onToggle={() => handleToggle(index)}
              isStepCompleted={isCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function EnrollmentFlow() {
  return (
    // 背景をグラデーションに変更して奥行きを出す
    <div className="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-[#F8FAFC] py-16 md:py-24 text-[#334455] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&display=swap');
        .font-serif { font-family: 'Noto Serif JP', serif; }
        .font-sans { font-family: 'Noto Sans JP', sans-serif; }
      `}</style>

      <div className="max-w-4xl mx-auto px-6">
        {/* ヘッダーエリア */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-[#009DE0] text-xs font-bold px-3 py-1 rounded-full tracking-wider">
              GUIDE
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#009DE0] mb-6 tracking-tight drop-shadow-sm">
            入塾の流れ
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#334455]/80 max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-blue-50 shadow-sm">
            さとう数理塾では、月ごとに無料体験を受け付けています。
            <br className="hidden md:inline" />
            <strong className="text-[#009DE0] bg-blue-50 px-1 py-0.5 rounded border border-blue-100">
              最大1ヶ月まで無料
            </strong>
            で通えるので、
            <br className="md:hidden" />
            実際の通い方や教室の雰囲気を、入塾前にしっかり確認できます。
          </p>
        </div>

        {/* ステップリスト */}
        <div className="space-y-8 md:space-y-10">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* フッターリンク */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="text-[#009DE0] hover:underline hover:text-[#008ac4] text-sm font-medium inline-flex items-center gap-1 cursor-pointer bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
            トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
