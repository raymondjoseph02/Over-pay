import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface PaymentMethodCardProps {
  icon?: ReactNode;
  name: string;
  balance: string;
  selected: boolean;
  onSelect: () => void;
}

export const PaymentMethodCard = ({
  icon,
  name,
  balance,
  selected,
  onSelect,
}: PaymentMethodCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`flex-1 flex items-center gap-2 justify-between px-4 py-3.5 rounded-2xl border transition-colors text-left cursor-pointer ${
        selected
          ? "border-primary-500 dark:bg-gray-800/60 bg-gray-50"
          : "border-gray-200 dark:border-gray-700 dark:bg-gray-800/30 bg-white"
      }`}
    >
      {/* Card logo */}
      <div className="size-14 rounded-full bg-white dark:bg-white flex items-center justify-center shrink-0 shadow-sm">
        {icon ?? name.slice(0, 2)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-black text-gray-900 dark:text-white leading-tight">
          {name}
        </p>
        <p className="text-sm font-medium  dark:text-gray-500 mt-0.5 text-gray-600">
          {balance}
        </p>
      </div>

      {/* Selection indicator */}
      <div
        className={`size-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          selected
            ? "bg-primary-500"
            : "border-2 border-gray-300 dark:border-gray-600"
        }`}
      >
        {selected && <Check size={14} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  );
};
