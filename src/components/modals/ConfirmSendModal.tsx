import { PenLine, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../global-ui/Button";
import type { Merchant } from "../../types/type";
import {
  TRANSFER_FEES,
  calcConverted,
  calcArrivalDate,
} from "../../utility/transaction";
import { useTransactionStore } from "../../store/transactionStore";

interface ConfirmSendModalProps {
  onClose: () => void;
  onEdit: () => void;
  amount: string;
  selectedContact: Merchant | null;
}

export const ConfirmSendModal = ({
  onClose,
  onEdit,
  amount,
  selectedContact,
}: ConfirmSendModalProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const numericAmount = Number(amount) || 0;
  const converted = calcConverted(numericAmount);

  const handleConfirm = () => {
    setStatus("loading");
    setTimeout(() => {
      const now = new Date();
      addTransaction({
        id: crypto.randomUUID(),
        name: selectedContact?.name ?? "Unknown",
        category: "Transfer",
        date: now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        invoiceId: `INV-${Date.now()}`,
        amount: `-$${numericAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        status: "success",
        imageUrl: selectedContact?.imageUrl,
        avatarInitial: selectedContact?.initial,
        avatarColor: selectedContact?.color,
        transactionFee: `$${TRANSFER_FEES.toFixed(2)}`,
      });
      setStatus("success");
    }, 1800);
  };

  return (
    <div className="max-h-dvh md:h-fit pt-6 pb-8 md:pt-0 relative overflow-hidden">
      {/* X button — always visible */}
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={onClose}
          className="w-fit h-fit text-primary-500 cursor-pointer"
        >
          <X />
        </button>
      </div>

      {/* Review content */}
      <AnimatePresence initial={false} mode="wait">
        {(status === "idle" || status === "loading") && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-2 max-w-100 mx-auto mb-8">
              <p className="text-2xl font-extrabold dark:text-gray-50 text-gray-900 text-center leading-[130%]">
                Review detail of your transfer
              </p>
              <p className="text-sm font-medium text-gray-600 text-center">
                Please enter user information that you want to send money and
                enter an amount
              </p>
            </div>

            {/* Transfer details */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-black dark:text-gray-50 text-gray-900">
                  Transfer details
                </p>
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 text-primary-500 text-sm font-medium cursor-pointer"
                >
                  <PenLine size={14} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">You send</p>
                  <p className="text-sm font-black text-primary-500">
                    $
                    {numericAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    Total fees
                  </p>
                  <p className="text-sm text-gray-900 font-medium dark:text-gray-50">
                    ${TRANSFER_FEES.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    Amount we'll convert
                  </p>
                  <p className="text-sm text-gray-900 font-black dark:text-gray-50">
                    $
                    {converted.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    Guaranteed rate (48 hours)
                  </p>
                  <p className="text-sm text-gray-900 dark:text-gray-50 font-medium">
                    0.89765
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    Should arrive
                  </p>
                  <p className="text-sm text-gray-900 font-medium dark:text-gray-50">
                    by {calcArrivalDate()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 my-6" />

            {/* Recipient */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-black dark:text-gray-50 text-gray-900">
                  Recipient
                </p>
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 text-primary-500 text-sm font-medium cursor-pointer"
                >
                  <PenLine size={14} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">Merchant</p>
                  <p className="text-sm text-gray-900 dark:text-gray-50 font-black">
                    {selectedContact?.name ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variants="primary"
              loading={status === "loading"}
              handleClick={handleConfirm}
            >
              <div className="flex items-center justify-center">
                <span>Confirm and Send</span>
              </div>
            </Button>
          </motion.div>
        )}

        {/* Success */}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-4 py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1,
              }}
            >
              <CheckCircle2 size={64} className="text-emerald-500" />
            </motion.div>

            <div className="space-y-1.5 mt-2">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-50">
                Payment Sent!
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Your transfer of{" "}
                <span className="text-primary-500 font-black">
                  $
                  {numericAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>{" "}
                to{" "}
                <span className="font-bold text-gray-900 dark:text-gray-50">
                  {selectedContact?.name ?? "merchant"}
                </span>{" "}
                was successful.
              </p>
            </div>

            <div className="w-full border-t border-gray-100 dark:border-gray-700 my-2" />

            <div className="w-full space-y-2.5 text-left px-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Amount sent</p>
                <p className="text-xs font-black text-primary-500">
                  $
                  {numericAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Fees</p>
                <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
                  ${TRANSFER_FEES.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Expected arrival</p>
                <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
                  by {calcArrivalDate()}
                </p>
              </div>
            </div>

            <div className="w-full mt-4">
              <Button variants="primary" handleClick={onClose}>
                <div className="flex items-center justify-center">
                  <span>Done</span>
                </div>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
