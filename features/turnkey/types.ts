export interface TurnkeySectionProps {
  data?: {
    steps?: Array<{ number: string; title: string; description: string }>;
    guarantees?: Array<{ title: string; description: string }>;
  };
}
