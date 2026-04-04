import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../global-ui/Button";
import { DropDownSelect } from "../global-ui/DropDownSelect";
import { useTransactionStore } from "../../store/transactionStore";
import type { TransactionStatus } from "../../types/type";
import { AmountInput } from "../global-ui";
import { buildTransaction } from "../../utility/transaction";

const CATEGORY_OPTIONS = [
  "Shopping",
  "Home",
  "Food",
  "Transport",
  "Health",
  "Entertainment",
  "Others",
].map((category) => ({ label: category, value: category }));

const STATUS_OPTIONS: { label: string; value: TransactionStatus }[] = [
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

interface AddTransactionModalProps {
  onClose: () => void;
}

export const AddTransactionModal = ({ onClose }: AddTransactionModalProps) => {
  const { addTransaction } = useTransactionStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<TransactionStatus>("success");
  const [statusOpen, setStatusOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");
  const isValid = name.trim() && amount && Number(amount) > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitStatus("loading");
    setTimeout(() => {
      addTransaction(buildTransaction({ name, category, type, amount, status, date }));
      setSubmitStatus("success");
    }, 1500);
  };

  const labelClass =
    "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block";
  const inputClass =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-primary-500 transition-colors";

  return (
    <div className="h-dvh md:h-fit pt-6 md:pt-0 relative overflow-hidden">
      {/* X button */}
      <div className="flex items-end justify-end mb-8">
        <button onClick={onClose} className="w-fit h-fit text-primary-500 cursor-pointer">
          <X />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {/* Form */}
        {(submitStatus === "idle" || submitStatus === "loading") && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-2 max-w-100 mx-auto mb-8">
              <p className="text-2xl font-extrabold dark:text-gray-50 text-gray-900 text-center leading-[130%]">
                Add Transaction
              </p>
              <p className="text-sm font-medium text-gray-600 text-center">
                Fill in the details below to record a new transaction
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-base font-black dark:text-gray-50 text-gray-900 mb-3">Type</p>
                <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {(["expense", "income"] as const).map((txType) => (
                    <button
                      key={txType}
                      onClick={() => setType(txType)}
                      className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors cursor-pointer ${
                        type === txType
                          ? txType === "income"
                            ? "bg-emerald-500 text-white"
                            : "bg-red-500 text-white"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {txType}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-base font-black dark:text-gray-50 text-gray-900 mb-3">Name / Merchant</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amazon, Netflix"
                  className={inputClass}
                />
              </div>

              <div>
                <p className="text-base font-black dark:text-gray-50 text-gray-900 mb-3">Amount (USD)</p>
                <AmountInput value={amount} onChange={setAmount} icon={<span className="text-2xl leading-none">🇺🇸</span>} />
              </div>

              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <label className={labelClass}>Category</label>
                  <DropDownSelect
                    className="w-full"
                    active={categoryOpen}
                    setActive={(isOpen) => { setCategoryOpen(isOpen); if (isOpen) setStatusOpen(false); }}
                    selected={category}
                    setSelected={setCategory}
                    options={CATEGORY_OPTIONS}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className={labelClass}>Status</label>
                  <DropDownSelect
                    className="w-full"
                    active={statusOpen}
                    setActive={(isOpen) => { setStatusOpen(isOpen); if (isOpen) setCategoryOpen(false); }}
                    selected={status}
                    setSelected={(value) => setStatus(value as TransactionStatus)}
                    options={STATUS_OPTIONS}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button variants="primary" isDisable={!isValid} loading={submitStatus === "loading"} handleClick={handleSubmit}>
                Add Transaction
              </Button>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {submitStatus === "success" && (
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
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <CheckCircle2 size={64} className="text-emerald-500" />
            </motion.div>

            <div className="space-y-1.5 mt-2">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-50">
                Transaction Added!
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-gray-50">{name}</span>{" "}
                has been recorded as a{" "}
                <span className={`font-black ${type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                  {type}
                </span>{" "}
                of{" "}
                <span className="text-primary-500 font-black">
                  ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>.
              </p>
            </div>

            <div className="w-full mt-4">
              <Button variants="primary" handleClick={onClose}>
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
