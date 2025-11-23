import React from 'react';

interface LineButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export const LineButton: React.FC<LineButtonProps> = ({ 
  href, 
  label = 'LINEで塾長に質問',
  className = ''
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#00C300] bg-white px-4 py-2 text-sm font-semibold text-[#334455] shadow-sm hover:bg-[#F5FFF5] hover:-translate-y-0.5 transition-colors transition-transform duration-200 ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C300] text-white text-xs">
        LINE
      </span>
      <span>{label}</span>
    </a>
  );
};
