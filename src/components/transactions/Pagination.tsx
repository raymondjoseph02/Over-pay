import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages =
    totalPages <= 5
      ? pages
      : page <= 3
        ? [...pages.slice(0, 4), null, totalPages]
        : page >= totalPages - 2
          ? [1, null, ...pages.slice(totalPages - 4)]
          : [1, null, page - 1, page, page + 1, null, totalPages];

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
        {start}–{end} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="size-8 flex items-center justify-center rounded-lg border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>

        {visiblePages.map((p, i) =>
          p === null ? (
            <span
              key={`ellipsis-${i}`}
              className="size-8 flex items-center justify-center text-xs text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`size-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                p === page
                  ? "bg-primary-500 text-white border border-primary-500"
                  : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="size-8 flex items-center justify-center rounded-lg border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
