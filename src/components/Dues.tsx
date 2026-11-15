import React, { useState } from "react";
import { motion } from "motion/react";
import { MemberItem } from "../types";

interface DuesProps {
  members: MemberItem[];
}

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export const Dues: React.FC<DuesProps> = ({ members }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear] = useState("2026");
  const [whatsappSent, setWhatsappSent] = useState(false);

  const totalMembers = members.length;
  const paidMembers = members.filter((m) => m.duesStatus === "Lunas").length;
  const unpaidMembers = totalMembers - paidMembers;
  const collectedAmount = paidMembers * 50000;
  const unpaidAmount = unpaidMembers * 50000;
  const percentage = totalMembers > 0 ? ((paidMembers / totalMembers) * 100).toFixed(1) : 0;

  const handleSendReminder = () => {
    setWhatsappSent(true);
    setTimeout(() => setWhatsappSent(false), 4000);
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11415" data-name="07 · Iuran">
      {/* Title & WhatsApp Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight">Iuran</h2>
          <p className="text-[#64748b] text-[13px] mt-1" data-node-id="10:12399">
            Iuran tertib, kegiatan bersama berjalan lebih baik.
          </p>
        </div>

        <button
          onClick={handleSendReminder}
          className="bg-[#059669] hover:bg-[#047857] text-white h-[42px] px-5 rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-all shadow-xs self-start md:self-auto cursor-pointer"
          data-node-id="10:12400"
        >
          <span>💬</span>
          <span>{whatsappSent ? "Pengingat Terkirim!" : "Kirim pengingat WhatsApp"}</span>
        </button>
      </div>

      {/* 3 Dues Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Iuran Bulanan */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[139px]"
          data-node-id="10:12405"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#0f172a] text-[13px]">Iuran bulanan</span>
            <span className="text-[#059669] text-[10px] font-medium cursor-pointer hover:underline">
              Atur ↗
            </span>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-[#0f172a] leading-none">Rp50.000</h3>
            <p className="text-[#64748b] text-[11px] mt-1">per anggota / bulan</p>
          </div>
          <p className="text-[#64748b] text-[10px]">Ditagih otomatis setiap tanggal 1</p>
        </motion.div>

        {/* Infaq */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[139px]"
          data-node-id="10:12411"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#0f172a] text-[13px]">Infaq</span>
            <span className="text-[#059669] text-[10px] font-medium cursor-pointer hover:underline">
              Atur ↗
            </span>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-[#0f172a] leading-none">Sukarela</h3>
            <p className="text-[#64748b] text-[11px] mt-1">tanpa nominal minimum</p>
          </div>
          <p className="text-[#64748b] text-[10px]">Donasi rutin untuk kegiatan bersama</p>
        </motion.div>

        {/* Sumbangan */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs flex flex-col justify-between h-[139px]"
          data-node-id="10:12417"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#0f172a] text-[13px]">Sumbangan</span>
            <span className="text-[#059669] text-[10px] font-medium cursor-pointer hover:underline">
              Atur ↗
            </span>
          </div>
          <div>
            <h3 className="text-[25px] font-bold text-[#0f172a] leading-none">Insidental</h3>
            <p className="text-[#64748b] text-[11px] mt-1">sesuai kebutuhan</p>
          </div>
          <p className="text-[#64748b] text-[10px]">Penggalangan dana kegiatan khusus</p>
        </motion.div>
      </div>

      {/* Progress Recap Card */}
      <div
        className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
        data-node-id="10:12423"
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-[#0f172a] text-[13px]">Rekap November 2026</h4>
            <span className="text-[#059669] font-bold text-[18px]">{percentage}%</span>
          </div>
          <p className="text-[#64748b] text-[11px] mb-3">
            {paidMembers} / {totalMembers} anggota lunas
          </p>
          <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#059669] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-4 md:pt-0 md:pl-8">
          <div>
            <p className="text-[#64748b] text-[11px]">Terkumpul</p>
            <p className="font-bold text-[#059669] text-[20px] leading-tight">
              Rp{collectedAmount.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="h-10 w-px bg-[#e2e8f0]" />
          <div>
            <p className="text-[#64748b] text-[11px]">Belum dibayar</p>
            <p className="font-bold text-[#dc2626] text-[20px] leading-tight">
              Rp{unpaidAmount.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Dues Annual Matrix Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-xs overflow-hidden" data-node-id="10:12434">
        <div className="p-6 pb-4 border-b border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#0f172a] text-[16px]">Rekap pembayaran anggota</h3>
            <p className="text-[#64748b] text-[11px] mt-0.5">Iuran bulanan · Rp50.000 per bulan</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-1.5 bg-[#f8fafc] text-[12px] font-medium text-[#0f172a]">
              {selectedYear} ⌄
            </div>
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-1.5 flex items-center gap-2 text-[12px] bg-white">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Cari anggota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-36 text-[#0f172a]"
              />
            </div>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-center text-[11px]">
            <thead className="bg-[#f8fafc] text-[#64748b] text-[9px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6 text-left">Nama Warga</th>
                {months.map((m) => (
                  <th key={m} className="py-3 px-2 font-medium">
                    {m}
                  </th>
                ))}
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredMembers.map((member) => {
                const isPaidNov = member.duesStatus === "Lunas";
                return (
                  <tr key={member.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                    <td className="py-3 px-6 text-left font-medium text-[#0f172a] whitespace-nowrap">
                      {member.name}
                    </td>
                    {months.map((m, mIdx) => {
                      // Mocking past months as paid, Nov based on status, Dec pending
                      const isPaid = mIdx < 10 ? true : mIdx === 10 ? isPaidNov : false;
                      return (
                        <td key={m} className="py-3 px-2">
                          <span
                            className={`inline-flex items-center justify-center size-5 rounded-full text-[10px] ${
                              isPaid
                                ? "bg-[#ecfdf5] text-[#059669] font-bold"
                                : mIdx === 10
                                ? "bg-[#fef2f2] text-[#dc2626] font-bold"
                                : "text-gray-300"
                            }`}
                          >
                            {isPaid ? "✓" : mIdx === 10 ? "✕" : "·"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="py-3 px-4 text-right font-semibold text-[#059669]">
                      Rp{((isPaidNov ? 11 : 10) * 50000).toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
