import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "../../animation";
import { useTransactionStore } from "../../store/transactionStore";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setOpen(false), open);
  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap"
      >
        <span className="text-gray-400 dark:text-gray-500 font-medium">
          {label}
        </span>
        <span>{selected?.label ?? label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute left-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 text-xs font-medium whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  opt.value === value
                    ? "text-primary-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const typeOptions = [
  { label: "All Transactions", value: "all" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

const archiveOptions = [
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

const transactionTypeOptions = [
  { label: "All Transactions", value: "all" },
  { label: "Withdraw", value: "withdraw" },
  { label: "Deposit", value: "deposit" },
  { label: "Transfer", value: "transfer" },
  { label: "Payment", value: "payment" },
];

const dateOptions = [
  { label: "Past 7 Days", value: "7" },
  { label: "Past 30 Days", value: "30" },
  { label: "Past 90 Days", value: "90" },
  { label: "All Time", value: "all" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
];

export const FilterBar = () => {
  const {
    typeFilter,
    setTypeFilter,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    archiveFilter,
    setArchiveFilter,
    transactionTypeFilter,
    setTransactionTypeFilter,
    clearFilters,
  } = useTransactionStore();

  const isFiltered =
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    dateFilter !== "all" ||
    archiveFilter !== "active" ||
    transactionTypeFilter !== "all";

  const handleClear = () => clearFilters();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterDropdown
        label="Type"
        value={typeFilter}
        options={typeOptions}
        onChange={setTypeFilter}
      />
      <FilterDropdown
        label="Archive"
        value={archiveFilter}
        options={archiveOptions}
        onChange={setArchiveFilter}
      />
      <FilterDropdown
        label="Transaction type"
        value={transactionTypeFilter}
        options={transactionTypeOptions}
        onChange={setTransactionTypeFilter}
      />
      <FilterDropdown
        label="Date"
        value={dateFilter}
        options={dateOptions}
        onChange={setDateFilter}
      />
      <FilterDropdown
        label="Status"
        value={statusFilter}
        options={statusOptions}
        onChange={setStatusFilter}
      />
      {isFiltered && (
        <button
          onClick={handleClear}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 transition-colors cursor-pointer whitespace-nowrap"
        >
          Clear
        </button>
      )}
    </div>
  );
};
