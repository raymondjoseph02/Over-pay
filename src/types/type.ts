import type { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ProfileAction = "PROFILE" | "SETTINGS" | "LOGOUT";

export type ProfileIcon = "user" | "settings" | "logout";
export type ButtonVariant = "primary" | "secondary" | "outline";
export type WalletActionIcon = "send" | "receive" | "invoicing" | "more";
export type WalletAction = "SEND" | "RECEIVE" | "INVOICING" | "MORE";
export type statsColor = "home" | "shopping" | "others";
export type DonutData = {
  label: string;
  value: number;
  color: string;
};

export type TransactionStatus = "pending" | "success" | "failed";
export type SortDirection = "asc" | "desc";
export type SortColumn =
  | "name"
  | "date"
  | "invoiceId"
  | "amount"
  | "status"
  | "";
export type FormatMode = "label" | "short" | "full";

export interface Route {
  name: string;
  path: string;
  hasSubRoutes: boolean;
  subRoutes?: Route[];
  icon?: ReactNode;
  bargeValue?: string | number;
  adminOnly?: boolean;
  barge?: boolean;
}
export interface ProfileDropdownOption {
  name: string;
  action: ProfileAction;
  icon: ProfileIcon;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  accountType: "Business" | "Personal";
  role: "user" | "admin";
}

export interface DashboardHeaderProps {
  title: string;
}

export interface ProfileDropdownProps {
  options: ProfileDropdownOption[];
  isOpen: boolean;
  user: User;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface HamburgerProps {
  toggle: () => void;
  isOpen: boolean;
}

export interface DashboardHeaderProps {
  title: string;
}
export interface ButtonProps {
  variants: ButtonVariant;
  handleClick?: () => void;
  isDisable?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export interface AtmCardProps {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  balance: string;
  currency: string;
}
export interface CardSwiperProps {
  cards: AtmCardProps[];
  activeCard: string;
  setActiveCard: (card: string) => void;
}
export interface WalletActionProps {
  name: string;
  icon?: WalletActionIcon;
  action?: WalletAction;
}

export interface SendMoneyModalProps {
  onClose: () => void;
}

export interface ActivitiesProps {
  title: string;
  description: string;
  date: string;
  time: string;
  amount: string;
  imageUrl: string;
}

export interface DonutChartProps {
  data: DonutData[];
  size?: number;
  strokeWidth?: number;
}
export interface DropDownOptions {
  label: string;
  value: string;
}
export interface DropDownSelectProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  options: DropDownOptions[];
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  invoiceId: string;
  amount: string;
  status: TransactionStatus;
  imageUrl?: string;
  avatarInitial?: string;
  avatarColor?: string;
  recipient?: string;
  recipientEmail?: string;
  accountNumber?: string;
  transactionFee?: string;
  spendingHistory?: { month: string; value: number }[];
}

export interface TransactionSortState {
  column: SortColumn;
  direction: SortDirection;
}
export interface SavingsAccountProps {
  name: string;
  balance: string;
  currency: string;
  targetAmount: string;
  incomePercentage: number;
  createdAt: string;
}

export interface ComingSoonProps {
  title: string;
  description?: string;
}

export interface TransactionTableProps {
  data: Transaction[];
}
export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  className?: string;
};
export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  options: DropDownOptions[];
  onChange: (v: string) => void;
}

export interface SpendingBarChartProps {
  history: { month: string; value: number }[];
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}

export interface TransactionAvatarProps {
  imageUrl?: string;
  avatarInitial?: string;
  avatarColor?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export interface NavItemProps {
  route: Route;
  isOpen: boolean;
  setOpen: (path: string | null) => void;
  pathname: string;
  navigate: (path: string) => void;
  closeSidebar: () => void;
}

export interface CurrencyProps {
  currency: string;
}

export type FilterParams = {
  transactions: Transaction[];
  search?: string;
  statusFilter?: string;
  typeFilter?: string;
  sortColumn?: keyof Transaction | "";
  sortDirection?: "asc" | "desc";
};

export interface Contact {
  id: number;
  name: string;
  image: string;
  email: string;
  accountNumber: string;
}
export interface Merchant {
  id: number;
  name: string;
  imageUrl?: string;
  initial?: string;
  color?: string;
}
export interface PaymentMethod {
  id: string;
  name: string;
  balance: string;
  icon?: ReactNode;
}
