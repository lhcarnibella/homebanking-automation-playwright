
type FixedTerm = {
  days: string;
  tna: number;
  description: string;
};

export const fixedTerms: Record<string, FixedTerm> = {
  thirtyDays: { days: '30', tna: 35, description: '30 días - 35% TNA' },
  sixtyDays: { days: '60', tna: 38, description: '60 días - 38% TNA' },
  ninetyDays: { days: '90', tna: 42, description: '90 días - 42% TNA' },
  oneEightyDays: { days: '180', tna: 45, description: '180 días - 45% TNA' },
  threeSixtyDays: { days: '360', tna: 50, description: '360 días - 50% TNA' },

};
