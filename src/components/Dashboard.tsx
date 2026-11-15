import React from "react";
import { motion } from "motion/react";
import { TransactionItem, MemberItem, PageRoute } from "../types";

import imgIkon from "../assets/dashboard/imgIkon.svg";
import imgIkon1 from "../assets/dashboard/imgIkon1.svg";
import imgIkon2 from "../assets/dashboard/imgIkon2.svg";
import imgIkon3 from "../assets/dashboard/imgIkon3.svg";
import imgIkon4 from "../assets/dashboard/imgIkon4.svg";
import imgPemasukanDanPengeluaran from "../assets/dashboard/imgPemasukanDanPengeluaran.svg";
import imgDonatPengeluaran from "../assets/dashboard/imgDonatPengeluaran.svg";
import imgIkon5 from "../assets/dashboard/imgIkon5.svg";

interface DashboardProps {
  transactions: TransactionItem[];
  members: MemberItem[];
  onNavigate: (route: PageRoute) => void;
  onOpenAddModal: () => void;
}

const months = ["Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov"];

export const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  members,
  onNavigate,
}) => {
  const totalMembers = members.length;
  const paidMembers = members.filter((m) => m.duesStatus === "Lunas").length;
  const unpaidMembers = totalMembers - paidMembers;
  const unpaidAmount = unpaidMembers * 50000;
  const paidPercentage = totalMembers > 0 ? (paidMembers / totalMembers) * 100 : 0;

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11198" data-name="Konten 03 · Dashboard">
      {/* Title & Month Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight" data-node-id="10:11805">
            Dashboard
          </h2>
          <p className="text-[#64748b] text-[13px] mt-1" data-node-id="10:11806">
            Selamat pagi, Pak Budi. Berikut kabar kas komunitas Anda.
          </p>
        </div>

        <button
          className="bg-white border border-[#e2e8f0] rounded-[12px] h-[42px] px-4 flex items-center gap-3 shadow-xs hover:border-[#cbd5e1] transition-all self-start md:self-auto cursor-pointer"
          data-node-id="10:11807"
        >
          <img alt="" className="size-[18px]" src={imgIkon} />
          <span className="text-[12px] font-medium text-[#0f172a]">November 2026</span>
          <span className="text-[#64748b] text-xs">⌄</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Saldo Kas */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#059669] text-white rounded-[12px] p-5 shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] border border-[#059669] relative flex flex-col justify-between h-[132px]"
          data-node-id="10:11813"
        >
          <div className="flex justify-between items-start">
            <span className="text-[#d1fae5] text-[12px] font-medium">Saldo Kas</span>
            <div className="bg-[#10a879] rounded-[9px] size-[34px] flex items-center justify-center">
              <img alt="" className="size-[18px]" src={imgIkon1} />
            </div>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-white leading-none">
              Rp{balance.toLocaleString("id-ID")}
            </h3>
            <p className="text-[#a7f3d0] text-[10px] mt-1.5">Kas tersedia saat ini</p>
          </div>
        </motion.div>

        {/* Card 2: Pemasukan Bulan Ini */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-[12px] p-5 shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] border border-[#e2e8f0] relative flex flex-col justify-between h-[132px]"
          data-node-id="10:11821"
        >
          <div className="flex justify-between items-start">
            <span className="text-[#64748b] text-[12px] font-medium">Pemasukan Bulan Ini</span>
            <div className="bg-[#ecfdf5] rounded-[9px] size-[34px] flex items-center justify-center">
              <img alt="" className="size-[18px]" src={imgIkon2} />
            </div>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-[#0f172a] leading-none">
              Rp{totalIncome.toLocaleString("id-ID")}
            </h3>
            <p className="text-[#059669] text-[10px] font-medium mt-1.5">↗ 12,5% dari bulan lalu</p>
          </div>
        </motion.div>

        {/* Card 3: Pengeluaran Bulan Ini */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-[12px] p-5 shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] border border-[#e2e8f0] relative flex flex-col justify-between h-[132px]"
          data-node-id="10:11828"
        >
          <div className="flex justify-between items-start">
            <span className="text-[#64748b] text-[12px] font-medium">Pengeluaran Bulan Ini</span>
            <div className="bg-[#fef2f2] rounded-[9px] size-[34px] flex items-center justify-center">
              <img alt="" className="size-[18px]" src={imgIkon3} />
            </div>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-[#0f172a] leading-none">
              Rp{totalExpense.toLocaleString("id-ID")}
            </h3>
            <p className="text-[#64748b] text-[10px] mt-1.5">↘ 8,2% dari bulan lalu</p>
          </div>
        </motion.div>

        {/* Card 4: Jumlah Anggota */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigate("members")}
          className="bg-white rounded-[12px] p-5 shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] border border-[#e2e8f0] relative flex flex-col justify-between h-[132px] cursor-pointer"
          data-node-id="10:11835"
        >
          <div className="flex justify-between items-start">
            <span className="text-[#64748b] text-[12px] font-medium">Jumlah Anggota</span>
            <div className="bg-[#ecfdf5] rounded-[9px] size-[34px] flex items-center justify-center">
              <img alt="" className="size-[18px]" src={imgIkon4} />
            </div>
          </div>
          <div>
            <h3 className="text-[26px] font-bold text-[#0f172a] leading-none">{totalMembers} orang</h3>
            <p className="text-[#059669] text-[10px] font-medium mt-1.5">
              {paidMembers} anggota sudah lunas
            </p>
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Cashflow Chart & Expense Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Arus Kas 12 Bulan (span 2 cols) */}
        <div
          className="lg:col-span-2 bg-white rounded-[12px] p-6 border border-[#e2e8f0] shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] flex flex-col justify-between"
          data-node-id="10:11843"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold text-[#0f172a] text-[16px]">Arus kas</h4>
              <p className="text-[#64748b] text-[11px] mt-0.5">Desember 2025 – November 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="size-[7px] rounded-full bg-[#059669]" />
                <span className="text-[#64748b] text-[10px]">Pemasukan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-[7px] rounded-full bg-[#f59e0b]" />
                <span className="text-[#64748b] text-[10px]">Pengeluaran</span>
              </div>
              <div className="bg-[#f8fafc] px-2.5 py-1 rounded-[6px] text-[#64748b] text-[10px] font-medium border border-[#f1f5f9]">
                12 bulan terakhir
              </div>
            </div>
          </div>

          <div className="relative w-full h-[205px] mt-2">
            <img
              alt="Grafik Arus Kas"
              className="w-full h-[180px] object-contain"
              src={imgPemasukanDanPengeluaran}
            />
            <div className="flex justify-between text-[#64748b] text-[10px] px-2 mt-1">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Pengeluaran per Kategori (span 1 col) */}
        <div
          className="bg-white rounded-[12px] p-6 border border-[#e2e8f0] shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] flex flex-col justify-between"
          data-node-id="10:11878"
        >
          <div>
            <h4 className="font-semibold text-[#0f172a] text-[16px]">Pengeluaran per kategori</h4>
            <p className="text-[#64748b] text-[11px] mt-0.5">November 2026</p>
          </div>

          <div className="flex items-center justify-between gap-4 my-3">
            <div className="relative size-[140px] shrink-0 flex items-center justify-center">
              <img
                alt="Donat Pengeluaran"
                className="size-full object-contain"
                src={imgDonatPengeluaran}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[#64748b] text-[10px]">Total</span>
                <span className="font-bold text-[#0f172a] text-[18px] leading-tight">3,85 jt</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 flex-1 text-[11px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-[3px] bg-[#059669]" />
                  <span className="text-[#64748b]">Kebersihan</span>
                </div>
                <span className="font-semibold text-[#0f172a]">39%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-[3px] bg-[#34d399]" />
                  <span className="text-[#64748b]">Keamanan</span>
                </div>
                <span className="font-semibold text-[#0f172a]">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-[3px] bg-[#a7f3d0]" />
                  <span className="text-[#64748b]">Sosial</span>
                </div>
                <span className="font-semibold text-[#0f172a]">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-[3px] bg-[#fbbf24]" />
                  <span className="text-[#64748b]">Operasional</span>
                </div>
                <span className="font-semibold text-[#0f172a]">9%</span>
              </div>
            </div>
          </div>

          <p className="text-[#059669] text-[11px] font-medium pt-2 border-t border-[#f1f5f9]">
            Pengeluaran turun 8,2% dari Oktober
          </p>
        </div>
      </div>

      {/* Bottom Section: Recent Transactions & Dues Reminder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaksi Terakhir (span 2 cols) */}
        <div
          className="lg:col-span-2 bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] overflow-hidden"
          data-node-id="10:11903"
        >
          <div className="p-6 pb-4 flex items-center justify-between">
            <h4 className="font-semibold text-[#0f172a] text-[16px]">Transaksi terakhir</h4>
            <button
              onClick={() => onNavigate("transactions")}
              className="text-[#059669] text-[11px] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Lihat semua →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f8fafc] text-[#64748b] text-[9px] font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-6">Transaksi</th>
                  <th className="py-2.5 px-4">Tanggal</th>
                  <th className="py-2.5 px-4">Nominal</th>
                  <th className="py-2.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9] text-[11px]">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                    <td className="py-3 px-6 font-medium text-[#0f172a]">{tx.name}</td>
                    <td className="py-3 px-4 text-[#64748b] text-[10px]">{tx.date}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        tx.type === "income" ? "text-[#059669]" : "text-[#dc2626]"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "−"}Rp{tx.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-6">
                      <span className="bg-[#ecfdf5] text-[#059669] px-2.5 py-1 rounded-[6px] text-[10px] font-medium inline-block">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pengingat Iuran (span 1 col) */}
        <div
          className="bg-white rounded-[12px] p-6 border border-[#e2e8f0] shadow-[0px_3px_10px_0px_rgba(15,23,41,0.03)] flex flex-col justify-between"
          data-node-id="10:11940"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#fffbeb] rounded-[9px] size-[34px] flex items-center justify-center shrink-0">
                <img alt="" className="size-[18px]" src={imgIkon5} />
              </div>
              <div>
                <h4 className="font-semibold text-[#0f172a] text-[16px] leading-tight">Pengingat iuran</h4>
                <p className="text-[#64748b] text-[10px] mt-0.5">Ada yang perlu ditindaklanjuti</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-[#0f172a] text-[15px]">{unpaidMembers} anggota belum membayar</p>
              <p className="text-[#64748b] text-[11px] mt-0.5">Total tunggakan November</p>
              <p className="text-[#d97706] text-[26px] font-bold mt-1">
                Rp{unpaidAmount.toLocaleString("id-ID")}
              </p>
              <p className="text-[#64748b] text-[10px] mt-3">
                {paidMembers} dari {totalMembers} anggota sudah lunas
              </p>

              <div className="w-full bg-[#e2e8f0] h-[6px] rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#059669] h-full rounded-full transition-all"
                  style={{ width: `${paidPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("dues")}
            className="w-full mt-5 bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] font-semibold text-[11px] py-2.5 rounded-[8px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            Lihat tunggakan iuran →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
