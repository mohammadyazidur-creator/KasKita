export type PageRoute =
  | "dashboard"
  | "transactions"
  | "members"
  | "dues"
  | "reports"
  | "settings"
  | "login"
  | "register";

export interface TransactionItem {
  id: string;
  code: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  status: "Tercatat" | "Menunggu" | "Dibatalkan";
}

export interface MemberItem {
  id: string;
  name: string;
  avatar?: string;
  address: string;
  phone: string;
  duesStatus: "Lunas" | "Belum Lunas";
  duesAmount: number;
}
