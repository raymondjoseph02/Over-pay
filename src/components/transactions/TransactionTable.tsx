import {
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  AlertCircle,
  Eye,
  Pencil,
} from "lucide-react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transaction } from "../../types/type";
import type { SortColumn } from "../../types/type";
import { useTransactionStore } from "../../store/transactionStore";
import { useAuthStore } from "../../store/authStore";
import { NoTransactionFound } from "./NoTransactionFound";
import { TransactionAvatar } from "./TransactionAvatar";
import { StatusBadge } from "./StatusBadge";
import useClickOutside from "../../hooks/useClickOutside";
import { isIncome } from "../../utility/transaction";
import { dropdownVariants } from "../../animation";
import { useLoadingStimulator } from "../../hooks/useLoadingStimulator";

const columns: { label: string; key: SortColumn }[] = [
  { label: "Name/Business", key: "name" },
  { label: "Date", key: "date" },
  { label: "Invoice ID", key: "invoiceId" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
];

interface TransactionTableProps {
  data: Transaction[];
  onEdit?: (transaction: Transaction) => void;
}

const ActionMenu = ({
  transaction,
  isAdmin,
  onEdit,
}: {
  transaction: Transaction;
  isAdmin: boolean;
  onEdit?: (transaction: Transaction) => void;
}) => {
  const { deleteTransaction, setSelectedTransaction, selectedTransaction } =
    useTransactionStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);
  const isActive = selectedTransaction?.id === transaction.id;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="size-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <MoreHorizontal size={19} className="font-medium" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute right-0 top-full mt-1 z-20 min-w-36 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
          >
            {isAdmin ? (
              <>
                <li
                  onClick={() => {
                    onEdit?.(transaction);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Pencil size={13} />
                  Edit
                </li>
                <li
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-500 bg-primary-50 dark:bg-primary-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Eye size={13} />
                  View Details
                </li>
                <li
                  onClick={() => {
                    deleteTransaction(transaction.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <AlertCircle size={13} />
                  Dispute
                </li>
                <li
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-500 bg-primary-50 dark:bg-primary-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Eye size={13} />
                  View Details
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkeletonRow = () => (
  <tr className="border-b border-gray-50 dark:border-gray-800 animate-pulse">
    <td className="py-3.5 pr-4">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2.5 w-16 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </td>
    <td className="py-3.5 pr-4">
      <div className="space-y-1.5">
        <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2.5 w-12 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </td>
    <td className="py-3.5 pr-4">
      <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
    </td>
    <td className="py-3.5 pr-4">
      <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
    </td>
    <td className="py-3.5 pr-4">
      <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
    </td>
    <td className="py-3.5">
      <div className="size-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </td>
  </tr>
);

const SkeletonCard = () => (
  <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 dark:border-gray-800 animate-pulse">
    <div className="flex gap-3 items-center">
      <div className="size-9 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="space-y-1.5">
        <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2.5 w-16 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
    <div className="flex flex-col items-end gap-1.5">
      <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

const SKELETON_COUNT = 6;

export const TransactionTable = ({ data, onEdit }: TransactionTableProps) => {
  const { sortColumn, setSort, selectedTransaction, setSelectedTransaction } =
    useTransactionStore();
  const { currentUser } = useAuthStore();
  const isAdmin = currentUser.role === "admin";
  const { loading } = useLoadingStimulator();

  return (
    <div className="w-full ">
      {/* Mobile card list */}
      <div className="flex flex-col gap-4 md:hidden">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : data.length === 0 ? (
          <NoTransactionFound />
        ) : (
          data.map((transaction) => {
            const isActive = selectedTransaction?.id === transaction.id;
            return (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className={`flex justify-between items-center p-3 rounded-xl border transition-colors cursor-pointer ${
                  isActive
                    ? "border-primary-500/30 bg-primary-100/30 dark:bg-primary-500/5"
                    : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <TransactionAvatar
                    imageUrl={transaction.imageUrl}
                    avatarInitial={transaction.avatarInitial}
                    avatarColor={transaction.avatarColor}
                    name={transaction.name}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-sm font-black ${
                      isIncome(transaction.amount)
                        ? "text-success-dark dark:text-success-light"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {transaction.amount}
                  </span>
                  <StatusBadge status={transaction.status} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block ">
        <table className="w-full min-w-160">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => setSort(column.key)}
                  className="text-left pb-3 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 cursor-pointer select-none whitespace-nowrap group"
                >
                  <span className="inline-flex items-center gap-1">
                    {column.label}
                    <ArrowUpDown
                      size={12}
                      className={`transition-colors ${
                        sortColumn === column.key
                          ? "text-primary-500"
                          : "text-gray-300 dark:text-gray-600 group-hover:text-gray-400"
                      }`}
                    />
                  </span>
                </th>
              ))}
              <th className="text-left pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <NoTransactionFound />
                </td>
              </tr>
            ) : (
              data.map((transaction) => {
                const isActive = selectedTransaction?.id === transaction.id;
                return (
                  <tr
                    key={transaction.id}
                    className={`border-b border-gray-50 dark:border-gray-800 transition-colors ${
                      isActive
                        ? "bg-primary-100/30 dark:bg-primary-500/5"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {/* Name/Business */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <TransactionAvatar
                          imageUrl={transaction.imageUrl}
                          avatarInitial={transaction.avatarInitial}
                          avatarColor={transaction.avatarColor}
                          name={transaction.name}
                        />
                        <div>
                          <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                            {transaction.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 pr-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        {transaction.date}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        at {transaction.time}
                      </p>
                    </td>

                    {/* Invoice ID */}
                    <td className="py-3.5 pr-4">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {transaction.invoiceId}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 pr-4">
                      <span
                        className={`text-sm font-black ${
                          isIncome(transaction.amount)
                            ? "text-success-dark dark:text-success-light"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {transaction.amount}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 pr-4">
                      <StatusBadge status={transaction.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5">
                      <ActionMenu
                        transaction={transaction}
                        isAdmin={isAdmin}
                        onEdit={onEdit}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
