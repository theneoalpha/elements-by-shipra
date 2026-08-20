export interface AboutSectionProps {
  data?: {
    eyebrow?: string;
    title?: string;
    founderBio?: string;
    founderName?: string;
    founderTitle?: string;
    founderImage?: unknown;
    stats?: Array<{ value: string; label: string }>;
    pillars?: Array<{
      title: string;
      mobileTitle: string;
      description: string;
    }>;
  };
}
