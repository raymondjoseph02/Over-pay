import type { Transaction, TransactionStatus } from "../types/type";

export const TRANSFER_FEES = 0.32;

const AVATAR_COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export const randomAvatarColor = () =>
  AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

export const isIncome = (amount: string) => amount.startsWith("+");

export const calcConverted = (numericAmount: number) =>
  Math.max(0, numericAmount - TRANSFER_FEES);

export const calcArrivalDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

interface BuildTransactionInput {
  name: string;
  category: string;
  type: "income" | "expense";
  amount: string;
  status: TransactionStatus;
  date: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const buildSpendingHistory = (baseValue: number) => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const variance = 0.5 + Math.random();
    return {
      month: MONTHS[d.getMonth()],
      value: Math.round(baseValue * variance),
    };
  });
};

export const buildTransaction = ({
  name,
  category,
  type,
  amount,
  status,
  date,
}: BuildTransactionInput): Transaction => {
  const now = new Date(date);
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const prefix = type === "income" ? "+" : "-";
  const numericAmount = Number(amount);

  return {
    id: `txn-${Date.now()}`,
    name: name.trim(),
    category,
    date: formattedDate,
    time: formattedTime,
    invoiceId: `INV-${Date.now().toString().slice(-6)}`,
    amount: `${prefix}$${numericAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    status,
    avatarInitial: name.trim()[0].toUpperCase(),
    avatarColor: randomAvatarColor(),
    recipient: name.trim(),
    transactionFee: numericAmount >= 100 ? "$2.50" : "$0.00",
    spendingHistory: buildSpendingHistory(numericAmount),
  };
};
