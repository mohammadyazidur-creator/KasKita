import { useState, useEffect } from "react";
import { PageRoute, TransactionItem, MemberItem } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Transactions } from "./components/Transactions";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { Members } from "./components/Members";
import { Dues } from "./components/Dues";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { AuthLogin } from "./components/AuthLogin";
import { AuthRegister } from "./components/AuthRegister";
import { apiService } from "./services/api";

const initialTransactions: TransactionItem[] = [
  {
    id: "tx-1",
    code: "TRX-0248",
    name: "Iuran warga · November",
    category: "Iuran bulanan",
    date: "14 Nov 2026",
    amount: 150000,
    type: "income",
    status: "Tercatat",
  },
  {
    id: "tx-2",
    code: "TRX-0247",
    name: "Donasi kegiatan warga",
    category: "Donasi warga",
    date: "13 Nov 2026",
    amount: 500000,
    type: "income",
    status: "Tercatat",
  },
  {
    id: "tx-3",
    code: "TRX-0246",
    name: "Tagihan listrik pos ronda",
    category: "Operasional",
    date: "12 Nov 2026",
    amount: 350000,
    type: "expense",
    status: "Tercatat",
  },
  {
    id: "tx-4",
    code: "TRX-0245",
    name: "Iuran · Siti Aminah",
    category: "Iuran bulanan",
    date: "12 Nov 2026",
    amount: 50000,
    type: "income",
    status: "Tercatat",
  },
  {
    id: "tx-5",
    code: "TRX-0244",
    name: "Bantuan warga sakit",
    category: "Sosial",
    date: "11 Nov 2026",
    amount: 750000,
    type: "expense",
    status: "Tercatat",
  },
  {
    id: "tx-6",
    code: "TRX-0243",
    name: "Pembelian alat kebersihan",
    category: "Kebersihan",
    date: "10 Nov 2026",
    amount: 250000,
    type: "expense",
    status: "Menunggu",
  },
];

const initialMembers: MemberItem[] = [
  {
    id: "W-001",
    name: "Budi Santoso",
    address: "Blok A1 No. 04, RT 05",
    phone: "0812-3456-7890",
    duesStatus: "Lunas",
    duesAmount: 50000,
  },
  {
    id: "W-002",
    name: "Siti Aminah",
    address: "Blok A1 No. 06, RT 05",
    phone: "0813-8822-1144",
    duesStatus: "Lunas",
    duesAmount: 50000,
  },
  {
    id: "W-003",
    name: "Agus Pratama",
    address: "Blok A2 No. 01, RT 05",
    phone: "0856-9911-3322",
    duesStatus: "Belum Lunas",
    duesAmount: 50000,
  },
  {
    id: "W-004",
    name: "Dewi Lestari",
    address: "Blok A2 No. 05, RT 05",
    phone: "0819-4455-6677",
    duesStatus: "Lunas",
    duesAmount: 50000,
  },
  {
    id: "W-005",
    name: "Hendra Gunawan",
    address: "Blok B1 No. 02, RT 05",
    phone: "0877-2233-4455",
    duesStatus: "Belum Lunas",
    duesAmount: 50000,
  },
  {
    id: "W-006",
    name: "Rina Wulandari",
    address: "Blok B1 No. 08, RT 05",
    phone: "0812-8877-6655",
    duesStatus: "Lunas",
    duesAmount: 50000,
  },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [members, setMembers] = useState<MemberItem[]>(initialMembers);

  // Sync with Laravel Backend
  useEffect(() => {
    async function loadData() {
      try {
        const txRes = await apiService.getTransactions();
        if (txRes?.data && txRes.data.length > 0) {
          setTransactions(
            txRes.data.map((tx: any) => ({
              id: String(tx.id),
              code: `TRX-${String(tx.id).padStart(4, "0")}`,
              name: tx.description,
              category: tx.category?.name || "Umum",
              date: tx.transaction_date,
              amount: parseFloat(tx.amount),
              type: tx.transaction_type,
              status: tx.status || "Tercatat",
            }))
          );
        }

        const memRes = await apiService.getMembers();
        if (memRes?.data && memRes.data.length > 0) {
          setMembers(
            memRes.data.map((m: any) => ({
              id: `W-${String(m.id).padStart(3, "0")}`,
              name: m.name,
              address: m.address || "RT 05 / RW 08",
              phone: m.phone || "-",
              duesStatus: m.is_paid_this_month > 0 ? "Lunas" : "Belum Lunas",
              duesAmount: 50000,
            }))
          );
        }
      } catch {
        // Fallback to local data
      }
    }
    loadData();
  }, []);

  const handleAddTransaction = async (newTx: Omit<TransactionItem, "id" | "code">) => {
    const createdLocally: TransactionItem = {
      ...newTx,
      id: `tx-${Date.now()}`,
      code: `TRX-02${Math.floor(Math.random() * 50 + 49)}`,
    };
    setTransactions([createdLocally, ...transactions]);

    // Send to Laravel API
    try {
      await apiService.createTransaction({
        description: newTx.name,
        amount: newTx.amount,
        transaction_type: newTx.type,
        category_name: newTx.category,
        transaction_date: "2026-11-14",
      });
    } catch {
      // Ignore if offline
    }
  };

  // Auth views
  if (currentRoute === "login") {
    return (
      <AuthLogin
        onLoginSuccess={() => setCurrentRoute("dashboard")}
        onGoToRegister={() => setCurrentRoute("register")}
      />
    );
  }

  if (currentRoute === "register") {
    return (
      <AuthRegister
        onRegisterSuccess={() => setCurrentRoute("dashboard")}
        onGoToLogin={() => setCurrentRoute("login")}
      />
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0f172a] font-sans antialiased flex flex-col md:flex-row">
      {/* SIDEBAR (Collapsible) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <Header onLogout={() => setCurrentRoute("login")} />

        {/* ACTIVE PAGE CONTENT */}
        <main className="p-8 max-w-[1240px] w-full mx-auto flex-1">
          {currentRoute === "dashboard" && (
            <Dashboard
              transactions={transactions}
              members={members}
              onNavigate={setCurrentRoute}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {currentRoute === "transactions" && (
            <Transactions
              transactions={transactions}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {currentRoute === "members" && <Members members={members} />}

          {currentRoute === "dues" && <Dues members={members} />}

          {currentRoute === "reports" && <Reports />}

          {currentRoute === "settings" && <Settings />}
        </main>
      </div>

      {/* Frame 05: Tambah Transaksi Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
