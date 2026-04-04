import { useMemo, useState } from "react";
import { Plus, Receipt, Search, SlidersHorizontal, Upload } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button, Header } from "../../components/global-ui";
import {
  TransactionTable,
  TransactionDetail,
  FilterBar,
  Pagination,
} from "../../components/transactions";
import { useTransactionStore } from "../../store/transactionStore";
import { useAuthStore } from "../../store/authStore";
import { useModal } from "../../hooks/useModal";
import { AddTransactionModal } from "../../components/modals/AddTransactionModal";
import { EditTransactionModal } from "../../components/modals/EditTransactionModal";
import type { Transaction } from "../../types/type";
import { exportToCSV } from "../../utility/exportCSV";
import { filterTransactions } from "../../utility/filterTransactions";

const PAGE_SIZE = 5;

const TransactionsEmpty = ({ isAdmin }: { isAdmin: boolean }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600">
      <Receipt size={24} />
    </div>
    <p className="text-sm font-black text-gray-900 dark:text-gray-50">
      No transactions yet
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 text-center max-w-52">
      {isAdmin
        ? "Add the first transaction using the button above."
        : "No transactions have been recorded yet."}
    </p>
  </div>
);

export const TransactionsPage = () => {
  const {
    transactions,
    search,
    setSearch,
    statusFilter,
    typeFilter,
    sortColumn,
    sortDirection,
    showFilters,
    toggleFilters,
    selectedTransaction,
  } = useTransactionStore();

  const { currentUser } = useAuthStore();
  const isAdmin = currentUser.role === "admin";

  const { Modal: addModal, open: openAdd } = useModal("md", (close) => (
    <AddTransactionModal onClose={close} />
  ));

  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const { Modal: editModal, open: openEdit } = useModal("md", (close) =>
    editingTx ? <EditTransactionModal transaction={editingTx} onClose={close} /> : null
  );

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    openEdit();
  };

  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      filterTransactions({
        transactions,
        search,
        statusFilter,
        typeFilter,
        sortColumn,
        sortDirection,
      }),
    [transactions, search, statusFilter, typeFilter, sortColumn, sortDirection],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleExport = () => {
    exportToCSV({
      filename: "transactions.csv",
      headers: [
        "Name",
        "Category",
        "Date",
        "Time",
        "Invoice ID",
        "Amount",
        "Status",
      ],
      rows: filtered.map((transaction) => [
        transaction.name,
        transaction.category,
        transaction.date,
        transaction.time,
        transaction.invoiceId,
        transaction.amount,
        transaction.status,
      ]),
    });
  };

  return (
    <>
      <Header title="Transactions" />

      <div className="flex gap-4 lg:gap-6 items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Search + actions */}
          <div className="flex items-center gap-3 flex-col md:flex-row w-full justify-between">
            <div className="flex-1 flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 w-full md:max-w-xs lg:max-w-sm">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for transactions..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-600 outline-none font-medium placeholder:text-gray-500"
              />
            </div>

            <div className="flex w-full gap-3  flex-col-reverse md:flex-row   md:w-fit">
              {isAdmin && (
                <Button handleClick={openAdd} variants="primary">
                  <Plus size={15} />
                  <span>Add Transaction</span>
                </Button>
              )}

              <div className="flex items-center gap-3 w-full md:w-fit ">
                <button
                  onClick={toggleFilters}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    showFilters
                      ? "border-primary-500 text-primary-500 bg-primary-100/40 dark:bg-primary-500/10"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:border-primary-500 hover:text-primary-500"
                  }`}
                >
                  <SlidersHorizontal size={15} />
                  <span>Filters</span>
                </button>

                <button
                  onClick={handleExport}
                  disabled={filtered.length === 0}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-300 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Upload size={15} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <AnimatePresence initial={false}>
            {showFilters && <FilterBar />}
          </AnimatePresence>

          {/* Table card */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-5">
            {transactions.length === 0 ? (
              <TransactionsEmpty isAdmin={isAdmin} />
            ) : (
              <>
                <TransactionTable data={paginated} onEdit={handleEdit} />
                <Pagination
                  page={safePage}
                  totalPages={totalPages}
                  totalItems={filtered.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedTransaction && (
            <TransactionDetail transaction={selectedTransaction} />
          )}
        </AnimatePresence>
      </div>

      {addModal}
      {editModal}
    </>
  );
};
