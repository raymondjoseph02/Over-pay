import type { SavingsAccountProps } from "../types/type";

export const SAVINGS_RANGE_OPTIONS = [
  { label: "Last 7 Days", value: "last-7-days" },
  { label: "Last 30 Days", value: "last-30-days" },
  { label: "Last 90 Days", value: "last-90-days" },
];

const RANGE_MAP: Record<string, { from: number; to: number }> = {
  "last-7-days": { from: 7, to: 0 },
  "last-30-days": { from: 30, to: 7 },
  "last-90-days": { from: 90, to: 30 },
};

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

export const filterSavingsByRange = (
  accounts: SavingsAccountProps[],
  range: string,
) => {
  const { from, to } = RANGE_MAP[range] ?? RANGE_MAP["last-7-days"];
  const start = daysAgo(from);
  const end = daysAgo(to);
  return accounts.filter((account) => {
    const date = new Date(account.createdAt);
    return date >= start && date <= end;
  });
};
