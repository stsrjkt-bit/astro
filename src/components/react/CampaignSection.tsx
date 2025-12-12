import React from 'react';
import { CountdownCampaign } from '~/components/react/CountdownCampaign';

// CountdownCampaignProps を CountdownCampaign.tsx からエクスポートするのが理想だが、
// 今回はここで再定義する。
export interface CampaignData {
  title: React.ReactNode;
  description?: string;
  originalPrice: string;
  discountedPrice: string;
  deadline: string;
  ctaLabel: React.ReactNode;
  ctaHref: string;
  campaignId: string;
  expiredMessage?: string;
  expiredCtaLabel?: string;
  cautionText?: string;
}

interface CampaignSectionProps {
  id?: string;
  variant?: 'homepage' | 'mathNigate' | 'rikei';
  campaign: CampaignData;
}

const variantLeadText = {
  homepage: '現在、期間限定で以下のスタート応援オファーを実施しています。',
  mathNigate: '数学が苦手なまま放置したくない高校生向けの、期間限定スタートオファーです。',
  rikei: '理系をあきらめたくない高校生向けの、期間限定スタートオファーです。',
};

export const CampaignSection: React.FC<CampaignSectionProps> = ({ id, variant = 'homepage', campaign }) => {
  return (
    <section id={id} className="bg-slate-50 py-16 px-4 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-base md:text-lg text-gray-600">{variantLeadText[variant]}</p>
        </div>
        <CountdownCampaign {...campaign} />
      </div>
    </section>
  );
};
