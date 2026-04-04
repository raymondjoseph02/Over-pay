import type { FilterParams, Transaction } from "../types/type";

export const filterTransactions = ({
  transactions,
  search = "",
  statusFilter = "all",
  typeFilter = "all",
  sortColumn,
  sortDirection = "asc",
}: FilterParams): Transaction[] => {
  let result = [...transactions];

  // Search filter
  if (search.trim()) {
    const query = search.toLowerCase();
    result = result.filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(query) ||
        transaction.invoiceId.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query),
    );
  }

  // Status filter
  if (statusFilter !== "all") {
    result = result.filter((transaction) => transaction.status === statusFilter);
  }

  // Type filter (income/expense)
  if (typeFilter !== "all") {
    const typeMap: Record<string, string[]> = {
      income: ["+"],
      expense: ["-"],
    };
    const prefixes = typeMap[typeFilter];
    if (prefixes) {
      result = result.filter((transaction) =>
        prefixes.some((prefix) => transaction.amount.startsWith(prefix)),
      );
    }
  }

  // Sorting
  if (sortColumn) {
    result.sort((a, b) => {
      const aVal = String(a[sortColumn as keyof Transaction]);
      const bVal = String(b[sortColumn as keyof Transaction]);
      const cmp = aVal.localeCompare(bVal);
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }

  return result;
};
