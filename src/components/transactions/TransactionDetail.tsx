import {
  Wallet,
  CalendarDays,
  BadgeDollarSign,
  FileText,
  ChevronLeft,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import type { Transaction } from "../../types/type";
import { TransactionAvatar } from "./TransactionAvatar";
import { useTransactionStore } from "../../store/transactionStore";
import { useAuthStore } from "../../store/authStore";
import useClickOutside from "../../hooks/useClickOutside";
import { SpendingBarChart } from "../charts";
import {
  transactionDetailVariants,
  transactionDetailTransition,
} from "../../animation";

const detailRows = [
  {
    icon: <Wallet size={15} />,
    label: "Recipient",
    key: "recipient" as keyof Transaction,
  },
  {
    icon: <CalendarDays size={15} />,
    label: "Date",
    key: "date" as keyof Transaction,
  },
  {
    icon: <BadgeDollarSign size={15} />,
    label: "Transaction fee",
    key: "transactionFee" as keyof Transaction,
  },
  {
    icon: <FileText size={15} />,
    label: "Invoice",
    key: "invoiceId" as keyof Transaction,
  },
];

export const TransactionDetail = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { setSelectedTransaction, deleteTransaction } = useTransactionStore();
  const { currentUser } = useAuthStore();
  const isAdmin = currentUser.role === "admin";
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(
    () => setSelectedTransaction(null),
    [setSelectedTransaction],
  );
  useClickOutside(panelRef, close);

  return (
    <motion.div
      ref={panelRef}
      variants={transactionDetailVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transactionDetailTransition}
      className="shrink-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col overflow-y-auto overflow-x-hidden h-dvh fixed right-0 top-0 z-30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-screen md:w-72 xl:w-80 rounded-2xl md:rounded-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={close}
            className="rounded-lg size-10 shrink-0 dark:bg-gray-800 flex items-center justify-center text-gray-900 bg-gray-50 dark:text-gray-50"
          >
            <ChevronLeft />
          </button>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-50 leading-[140%] tracking-[0.2px]">
            Payment Detail
          </p>
        </div>

        {isAdmin ? (
          <button
            onClick={() => { deleteTransaction(transaction.id); close(); }}
            className="rounded-lg size-10 shrink-0 dark:bg-gray-800 flex items-center justify-center text-red-500 bg-gray-50 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        ) : (
          <button
            className="rounded-lg size-10 shrink-0 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <AlertCircle size={18} />
          </button>
        )}
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 mx-4" />

      <div className="max-w-2xl mx-auto w-full">
        {/* Avatar + amount */}
        <div className="flex flex-col items-center gap-2 pb-5 px-4 pt-8">
          <TransactionAvatar
            imageUrl={transaction.imageUrl}
            avatarInitial={transaction.avatarInitial}
            avatarColor={transaction.avatarColor}
            name={transaction.name}
            size="lg"
          />
          <p className="text-2xl font-black tracking-tight dark:text-gray-50">
            {transaction.amount}
          </p>
          <p className="dark:text-gray-600 font-medium">
            {transaction.category}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700 mx-4" />

        {/* Detail rows */}
        <div className="flex flex-col gap-3.5 px-4 py-4">
          {detailRows.map((row) => {
            const value = transaction[row.key] as string;
            if (!value) return null;
            return (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 py-3"
              >
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-600 text-base font-medium">
                  {row.icon}
                  <span>{row.label}</span>
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-gray-50 text-right">
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700 mx-4" />

        <div className="px-4">
          {transaction.spendingHistory &&
            transaction.spendingHistory.length > 0 && (
              <SpendingBarChart history={transaction.spendingHistory} />
            )}
        </div>
      </div>
    </motion.div>
  );
};
