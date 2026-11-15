import React, { useState } from "react";
import { motion } from "motion/react";
import imgDonatPengeluaran from "../assets/dashboard/imgDonatPengeluaran.svg";

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("November 2026");
  const [reportType, setReportType] = useState("Laporan kas bulanan");

  const monthlyTrend = [
    { month: "Jun", income: 7.2, expense: 3.8 },
    { month: "Jul", income: 8.6, expense: 4.5 },
    { month: "Agu", income: 7.8, expense: 3.7 },
    { month: "Sep", income: 8.1, expense: 4.2 },
    { month: "Okt", income: 7.5, expense: 4.2 },
    { month: "Nov", income: 8.5, expense: 3.85 },
  ];

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11487" data-name="08 · Laporan keuangan">
      {/* Title & Export Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight">Laporan keuangan</h2>
          <p className="text-[#64748b] text-[13px] mt-1">
            Transparansi penuh untuk seluruh anggota komunitas.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#059669] h-[42px] px-4 rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-colors cursor-pointer" data-node-id="10:12710">
            <span>📥</span>
            <span>Ekspor Excel</span>
          </button>
          <button className="bg-[#059669] hover:bg-[#047857] text-white h-[42px] px-5 rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-colors shadow-xs cursor-pointer" data-node-id="10:12714">
            <span>📄</span>
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Period & Filter Banner */}
      <div
        className="bg-white border border-[#e2e8f0] rounded-[12px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px]"
        data-node-id="10:12718"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-[#0f172a]">Periode laporan</span>
          <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-transparent outline-none text-[#0f172a]"
            >
              <option value="November 2026">November 2026</option>
              <option value="Oktober 2026">Oktober 2026</option>
              <option value="September 2026">September 2026</option>
            </select>
          </div>
          <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center gap-2">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="bg-transparent outline-none text-[#0f172a]"
            >
              <option value="Laporan kas bulanan">Laporan kas bulanan</option>
              <option value="Laporan kas tahunan">Laporan kas tahunan</option>
              <option value="Rekap per pos dana">Rekap per pos dana</option>
            </select>
          </div>
        </div>

        <p className="text-[#64748b] text-[10px]">Diperbarui 14 Nov 2026, 09.41 WIB</p>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[108px]"
          data-node-id="10:12725"
        >
          <p className="text-[12px] text-[#64748b]">Total pemasukan</p>
          <p className="text-[26px] font-bold text-[#059669] leading-none">Rp8.500.000</p>
          <p className="text-[10px] text-[#64748b]">Iuran, infaq, dan sumbangan</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[108px]"
          data-node-id="10:12729"
        >
          <p className="text-[12px] text-[#64748b]">Total pengeluaran</p>
          <p className="text-[26px] font-bold text-[#dc2626] leading-none">Rp3.850.000</p>
          <p className="text-[10px] text-[#64748b]">4 kategori pengeluaran</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#ecfdf5] border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[108px]"
          data-node-id="10:12733"
        >
          <p className="text-[12px] text-[#64748b]">Surplus / (defisit)</p>
          <p className="text-[26px] font-bold text-[#059669] leading-none">+Rp4.650.000</p>
          <p className="text-[10px] text-[#64748b]">Pemasukan − pengeluaran</p>
        </motion.div>
      </div>

      {/* Charts & Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Bar Chart */}
        <div
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-xs flex flex-col justify-between h-[340px]"
          data-node-id="10:12737"
        >
          <div>
            <h4 className="font-semibold text-[#0f172a] text-[16px]">Tren keuangan</h4>
            <p className="text-[#64748b] text-[10px] mt-0.5">6 bulan terakhir · dalam juta Rupiah</p>
          </div>

          <div className="flex items-end justify-between h-48 pt-6 pb-2 px-2 border-b border-[#f1f5f9]">
            {monthlyTrend.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="flex items-end gap-1 h-36">
                  {/* Income bar */}
                  <div
                    className="w-3 bg-[#059669] rounded-t-[3px] transition-all"
                    style={{ height: `${(item.income / 10) * 100}%` }}
                    title={`Pemasukan: Rp${item.income}jt`}
                  />
                  {/* Expense bar */}
                  <div
                    className="w-3 bg-[#fbbf24] rounded-t-[3px] transition-all"
                    style={{ height: `${(item.expense / 10) * 100}%` }}
                    title={`Pengeluaran: Rp${item.expense}jt`}
                  />
                </div>
                <span className="text-[9px] text-[#64748b]">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-[#64748b] pt-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-[2px] bg-[#059669]" />
              <span>Pemasukan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-[2px] bg-[#fbbf24]" />
              <span>Pengeluaran</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown & Donut */}
        <div className="lg:col-span-2 bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-xs flex flex-col justify-between h-[340px]">
          <div>
            <h4 className="font-semibold text-[#0f172a] text-[16px]">Distribusi Pengeluaran</h4>
            <p className="text-[#64748b] text-[10px] mt-0.5">Rincian penggunaan kas bulan ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 my-auto">
            <div className="flex items-center justify-center">
              <div className="relative size-36">
                <img alt="" className="size-full object-contain" src={imgDonatPengeluaran} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] text-[#64748b]">Total</span>
                  <span className="text-[18px] font-bold text-[#0f172a]">3,85 jt</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-[3px] bg-[#059669]" />
                  <span className="text-[#0f172a]">Kebersihan lingkungan</span>
                </div>
                <span className="font-semibold">Rp1.500.000 (39%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-[3px] bg-[#34d399]" />
                  <span className="text-[#0f172a]">Keamanan malam</span>
                </div>
                <span className="font-semibold">Rp1.232.000 (32%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-[3px] bg-[#a7f3d0]" />
                  <span className="text-[#0f172a]">Bantuan sosial warga</span>
                </div>
                <span className="font-semibold">Rp770.000 (20%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-[3px] bg-[#fbbf24]" />
                  <span className="text-[#0f172a]">Operasional & ATK</span>
                </div>
                <span className="font-semibold">Rp348.000 (9%)</span>
              </div>
            </div>
          </div>

          <p className="text-[#059669] text-[11px] font-medium pt-2 border-t border-[#f1f5f9]">
            ✓ Arus kas berstatus sehat dan surplus.
          </p>
        </div>
      </div>
    </div>
  );
};
