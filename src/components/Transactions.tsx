import React, { useState } from "react";
import { motion } from "motion/react";
import { TransactionItem } from "../types";

interface TransactionsProps {
  transactions: TransactionItem[];
  onOpenAddModal: () => void;
}

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  onOpenAddModal,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const netCashflow = totalIncome - totalExpense;

  // Filter transactions
  const filtered = transactions.filter((t) => {
    if (activeTab === "income" && t.type !== "income") return false;
    if (activeTab === "expense" && t.type !== "expense") return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== "all" && t.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11199" data-name="04 · Transaksi">
      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight" data-node-id="10:12083">
            Transaksi
          </h2>
          <p className="text-[#64748b] text-[13px] mt-1" data-node-id="10:12084">
            Catat setiap pemasukan dan pengeluaran, tanpa terlewat.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="bg-[#059669] hover:bg-[#047857] text-white px-5 h-[42px] rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-all shadow-xs self-start md:self-auto cursor-pointer"
          data-node-id="10:12085"
        >
          <span className="text-base leading-none">+</span>
          <span>Tambah Transaksi</span>
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pemasukan */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 relative overflow-hidden shadow-xs h-[100px] flex flex-col justify-between"
          data-node-id="10:11960"
        >
          <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#059669] rounded-r-md" />
          <p className="text-[12px] text-[#64748b]">Pemasukan November</p>
          <p className="text-[25px] font-bold text-[#059669] leading-tight">
            Rp{totalIncome.toLocaleString("id-ID")}
          </p>
        </motion.div>

        {/* Pengeluaran */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 relative overflow-hidden shadow-xs h-[100px] flex flex-col justify-between"
          data-node-id="10:11964"
        >
          <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#dc2626] rounded-r-md" />
          <p className="text-[12px] text-[#64748b]">Pengeluaran November</p>
          <p className="text-[25px] font-bold text-[#dc2626] leading-tight">
            Rp{totalExpense.toLocaleString("id-ID")}
          </p>
        </motion.div>

        {/* Selisih Arus Kas */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 relative overflow-hidden shadow-xs h-[100px] flex flex-col justify-between"
          data-node-id="10:11968"
        >
          <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#059669] rounded-r-md" />
          <p className="text-[12px] text-[#64748b]">Selisih arus kas</p>
          <p className="text-[25px] font-bold text-[#059669] leading-tight">
            {netCashflow >= 0 ? "+" : ""}Rp{netCashflow.toLocaleString("id-ID")}
          </p>
        </motion.div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-xs overflow-hidden" data-node-id="10:11972">
        {/* Table Top Header & Controls */}
        <div className="p-6 pb-4 border-b border-[#f1f5f9] flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[#0f172a] text-[16px]">Semua transaksi</h3>
              <p className="text-[11px] text-[#64748b] mt-0.5">{filtered.length} transaksi tercatat</p>
            </div>
            <button className="bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#0f172a] text-[11px] font-medium px-4 py-2 rounded-[10px] flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer">
              <span>↓</span> Ekspor
            </button>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
            {/* Search */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 flex items-center gap-2 bg-[#f8fafc]/50 focus-within:bg-white focus-within:border-[#cbd5e1]">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Cari keterangan atau nomor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-[#0f172a] placeholder-[#64748b]"
              />
            </div>

            {/* Date filter */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 flex items-center justify-between bg-white text-[#0f172a]">
              <span>01 Nov 2026 – 30 Nov 2026</span>
              <span className="text-[#64748b]">⌄</span>
            </div>

            {/* Category filter */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center justify-between">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent outline-none w-full text-[#0f172a]"
              >
                <option value="all">Semua kategori</option>
                <option value="Iuran bulanan">Iuran bulanan</option>
                <option value="Donasi warga">Donasi warga</option>
                <option value="Kebersihan">Kebersihan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Sosial">Sosial</option>
                <option value="Operasional">Operasional</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center justify-between text-[#0f172a]">
              <span>Semua jenis</span>
              <span className="text-[#64748b]">⌄</span>
            </div>
          </div>

          {/* Segmented Tab Row */}
          <div className="flex items-center gap-6 border-b border-[#f1f5f9] pt-2 text-[12px]">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 font-semibold relative flex items-center gap-2 cursor-pointer ${
                activeTab === "all" ? "text-[#059669]" : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <span>Semua</span>
              <span className="bg-[#ecfdf5] text-[#059669] text-[10px] px-2 py-0.5 rounded-full font-medium">
                {transactions.length}
              </span>
              {activeTab === "all" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669]"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("income")}
              className={`pb-3 font-medium relative cursor-pointer ${
                activeTab === "income" ? "text-[#059669] font-semibold" : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <span>Pemasukan</span>
              {activeTab === "income" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669]"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("expense")}
              className={`pb-3 font-medium relative cursor-pointer ${
                activeTab === "expense" ? "text-[#dc2626] font-semibold" : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <span>Pengeluaran</span>
              {activeTab === "expense" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#dc2626]"
                />
              )}
            </button>
          </div>
        </div>

        {/* Table Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-[#f8fafc] text-[#64748b] text-[9px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6 w-12 text-center">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">No. Transaksi</th>
                <th className="py-3 px-6">Keterangan</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-6">Nominal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                  <td className="py-3.5 px-6 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-3.5 px-4 text-[#64748b]">{tx.date}</td>
                  <td className="py-3.5 px-4 font-mono text-[#64748b]">{tx.code}</td>
                  <td className="py-3.5 px-6 font-medium text-[#0f172a]">{tx.name}</td>
                  <td className="py-3.5 px-4 text-[#64748b]">{tx.category}</td>
                  <td
                    className={`py-3.5 px-6 font-semibold text-[12px] ${
                      tx.type === "income" ? "text-[#059669]" : "text-[#dc2626]"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "−"}Rp{tx.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-[6px] text-[10px] font-medium inline-block ${
                        tx.status === "Tercatat"
                          ? "bg-[#ecfdf5] text-[#059669]"
                          : "bg-[#fffbeb] text-[#b45309]"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                    •••
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 px-6 border-t border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#64748b]">
          <p>Menampilkan 1–{filtered.length} dari {transactions.length} transaksi</p>
          <div className="flex items-center gap-1.5">
            <button className="size-8 rounded-[8px] border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]">
              ‹
            </button>
            <button className="size-8 rounded-[8px] bg-[#059669] text-white flex items-center justify-center font-medium">
              1
            </button>
            <button className="size-8 rounded-[8px] border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]">
              2
            </button>
            <button className="size-8 rounded-[8px] border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]">
              3
            </button>
            <button className="size-8 rounded-[8px] border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
