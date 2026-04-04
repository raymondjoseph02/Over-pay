import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SortColumn, SortDirection } from "../types/type";
import type { Transaction } from "../types/type";
import { transactions as seedTransactions } from "../data/data";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  typeFilter: string;
  setTypeFilter: (value: string) => void;

  dateFilter: string;
  setDateFilter: (value: string) => void;

  archiveFilter: string;
  setArchiveFilter: (value: string) => void;

  transactionTypeFilter: string;
  setTransactionTypeFilter: (value: string) => void;

  showFilters: boolean;
  toggleFilters: () => void;

  sortColumn: SortColumn;
  sortDirection: SortDirection;
  setSort: (column: SortColumn) => void;

  clearFilters: () => void;

  selectedTransaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: seedTransactions,
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [transaction, ...state.transactions] })),
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id ? { ...transaction, ...updates } : transaction
          ),
          selectedTransaction: state.selectedTransaction?.id === id
            ? { ...state.selectedTransaction, ...updates }
            : state.selectedTransaction,
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
          selectedTransaction:
            state.selectedTransaction?.id === id ? null : state.selectedTransaction,
        })),

      search: "",
      setSearch: (value) => set({ search: value }),

      statusFilter: "all",
      setStatusFilter: (value) => set({ statusFilter: value }),

      typeFilter: "all",
      setTypeFilter: (value) => set({ typeFilter: value }),

      dateFilter: "all",
      setDateFilter: (value) => set({ dateFilter: value }),

      archiveFilter: "active",
      setArchiveFilter: (value) => set({ archiveFilter: value }),

      transactionTypeFilter: "all",
      setTransactionTypeFilter: (value) => set({ transactionTypeFilter: value }),

      showFilters: false,
      toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),

      sortColumn: "",
      sortDirection: "asc",
      setSort: (column) =>
        set((state) => ({
          sortColumn: column,
          sortDirection:
            state.sortColumn === column && state.sortDirection === "asc" ? "desc" : "asc",
        })),

      clearFilters: () =>
        set({
          search: "",
          statusFilter: "all",
          typeFilter: "all",
          dateFilter: "all",
          archiveFilter: "active",
          transactionTypeFilter: "all",
          sortColumn: "",
          sortDirection: "asc",
        }),

      selectedTransaction: null,
      setSelectedTransaction: (transaction) => {
        const current = get().selectedTransaction;
        set({ selectedTransaction: current?.id === transaction?.id ? null : transaction });
      },
    }),
    { name: "overpay-transactions", version: 1 },
  ),
);
