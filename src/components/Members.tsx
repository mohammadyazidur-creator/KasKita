import React, { useState } from "react";
import { motion } from "motion/react";
import { MemberItem } from "../types";
import imgFotoProfilBudi from "../assets/dashboard/imgFotoProfilBudi.png";

interface MembersProps {
  members: MemberItem[];
  onAddMember?: () => void;
}

export const Members: React.FC<MembersProps> = ({ members }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalMembers = members.length;
  const paidMembers = members.filter((m) => m.duesStatus === "Lunas").length;
  const unpaidMembers = totalMembers - paidMembers;

  const filteredMembers = members.filter((m) => {
    if (statusFilter !== "all" && m.duesStatus !== statusFilter) return false;
    if (
      searchQuery &&
      !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.phone.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11343" data-name="06 · Data anggota">
      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight" data-node-id="10:12261">
            Data anggota
          </h2>
          <p className="text-[#64748b] text-[13px] mt-1" data-node-id="10:12262">
            Kelola data warga dan pantau kepatuhan iuran komunitas.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#0f172a] h-[42px] px-4 rounded-[12px] flex items-center gap-2 text-[12px] font-medium transition-colors cursor-pointer">
            <span>📊</span>
            <span>Impor Excel</span>
          </button>
          <button className="bg-[#059669] hover:bg-[#047857] text-white h-[42px] px-5 rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-colors shadow-xs cursor-pointer">
            <span>+</span>
            <span>Tambah Anggota</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs h-[108px] flex flex-col justify-between"
          data-node-id="10:12271"
        >
          <p className="text-[12px] text-[#64748b]">Total anggota</p>
          <div className="flex items-baseline gap-3">
            <span className="text-[30px] font-bold text-[#0f172a] leading-none">{totalMembers}</span>
            <span className="text-[11px] text-[#64748b]">Terdaftar di organisasi</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs h-[108px] flex flex-col justify-between"
          data-node-id="10:12275"
        >
          <p className="text-[12px] text-[#64748b]">Sudah lunas</p>
          <div className="flex items-baseline gap-3">
            <span className="text-[30px] font-bold text-[#059669] leading-none">{paidMembers}</span>
            <span className="text-[11px] text-[#64748b]">
              {totalMembers > 0 ? ((paidMembers / totalMembers) * 100).toFixed(1) : 0}% dari total anggota
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-xs h-[108px] flex flex-col justify-between"
          data-node-id="10:12279"
        >
          <p className="text-[12px] text-[#64748b]">Belum membayar</p>
          <div className="flex items-baseline gap-3">
            <span className="text-[30px] font-bold text-[#dc2626] leading-none">{unpaidMembers}</span>
            <span className="text-[11px] text-[#64748b]">
              Tunggakan Rp{(unpaidMembers * 50000).toLocaleString("id-ID")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Members Table Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-xs overflow-hidden" data-node-id="10:12283">
        {/* Table Filters */}
        <div className="p-6 pb-4 border-b border-[#f1f5f9] flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-[#0f172a] text-[16px]">Daftar anggota</h3>
            <p className="text-[11px] text-[#64748b] mt-0.5">Data iuran: November 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
            {/* Search */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 flex items-center gap-2 bg-[#f8fafc]/50 focus-within:bg-white focus-within:border-[#cbd5e1]">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Cari nama, alamat, atau nomor HP…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-[#0f172a] placeholder-[#64748b]"
              />
            </div>

            {/* Status Filter */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center justify-between">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none w-full text-[#0f172a]"
              >
                <option value="all">Semua status iuran</option>
                <option value="Lunas">Lunas</option>
                <option value="Belum Lunas">Belum Membayar</option>
              </select>
            </div>

            {/* Wilayah Filter */}
            <div className="border border-[#e2e8f0] rounded-[10px] px-3 py-2 bg-white flex items-center justify-between text-[#0f172a]">
              <span>Semua wilayah</span>
              <span className="text-[#64748b]">⌄</span>
            </div>
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
                <th className="py-3 px-4">Nama Anggota</th>
                <th className="py-3 px-6">Alamat</th>
                <th className="py-3 px-4">Nomor HP</th>
                <th className="py-3 px-4">Iuran November</th>
                <th className="py-3 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                  <td className="py-3.5 px-6 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt={member.name}
                        className="size-9 rounded-full object-cover border border-[#e2e8f0]"
                        src={member.avatar || imgFotoProfilBudi}
                      />
                      <div>
                        <p className="font-semibold text-[#0f172a] text-[12px]">{member.name}</p>
                        <p className="text-[10px] text-[#64748b]">ID: {member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-[#64748b]">{member.address}</td>
                  <td className="py-3.5 px-4 text-[#64748b] font-mono">{member.phone}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-[6px] text-[10px] font-medium inline-block ${
                        member.duesStatus === "Lunas"
                          ? "bg-[#ecfdf5] text-[#059669]"
                          : "bg-[#fef2f2] text-[#dc2626]"
                      }`}
                    >
                      {member.duesStatus === "Lunas" ? "Lunas" : "Belum Lunas"}
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

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#f1f5f9] flex justify-between items-center text-[11px] text-[#64748b]">
          <p>Menampilkan 1–{filteredMembers.length} dari {members.length} anggota</p>
        </div>
      </div>
    </div>
  );
};
