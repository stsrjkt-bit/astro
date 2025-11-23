import React from 'react';

interface CtaButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'accent' | 'outline';
  className?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ 
  href, 
  label, 
  variant = 'primary', 
  className = '',
  target,
  rel,
  icon 
}) => {
  const baseClass =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm sm:text-base font-semibold transition-colors transition-transform duration-200 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 gap-2';

  const variantClass =
    variant === 'accent'
      ? 'bg-[#F39800] text-white hover:bg-[#ea8800] focus-visible:ring-[#F39800]'
      : variant === 'outline'
      ? 'bg-white text-[#009DE0] border border-[#009DE0] hover:bg-[#F0F7FF] focus-visible:ring-[#009DE0]'
      : 'bg-[#009DE0] text-white hover:bg-[#0084ba] focus-visible:ring-[#009DE0]';

  return (
    <a 
      href={href} 
      className={`${baseClass} ${variantClass} ${className}`}
      target={target}
      rel={rel}
    >
      {icon}
      {label}
    </a>
  );
};
