import React, { useState } from "react";
import imgFotoProfilBudi from "../assets/dashboard/imgFotoProfilBudi.png";
import imgIkonSearch from "../assets/dashboard/imgIkonSearch.svg";
import imgIkonBell from "../assets/dashboard/imgIkonBell.svg";
import imgIkonChevron1 from "../assets/dashboard/imgIkonChevron1.svg";

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className="h-[80px] bg-white border-b border-[#e2e8f0] px-8 flex items-center justify-between sticky top-0 z-20"
      data-node-id="10:11181"
      data-name="Header"
    >
      {/* Global Search Input */}
      <div className="bg-[#f8fafc] border border-transparent focus-within:border-[#cbd5e1] focus-within:bg-white transition-all rounded-[8px] h-[40px] w-full max-w-[388px] flex items-center px-3.5 gap-2.5">
        <img alt="" className="size-4 opacity-50 shrink-0" src={imgIkonSearch} />
        <input
          type="text"
          placeholder="Cari transaksi, anggota, atau laporan…"
          className="bg-transparent border-none outline-none text-[12px] text-[#0f172a] placeholder-[#64748b] w-full"
        />
        <kbd className="hidden sm:inline-block text-[#94a3b8] text-[11px] font-mono shrink-0">
          ⌘ K
        </kbd>
      </div>

      {/* Action Icons & User Profile */}
      <div className="flex items-center gap-5 relative">
        {/* Bell Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1 hover:bg-[#f8fafc] rounded-full transition-colors"
          >
            <img alt="Notifikasi" className="size-[22px]" src={imgIkonBell} />
            <span className="absolute top-0 right-0 size-[7px] bg-[#ef4444] rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-[#e2e8f0] rounded-[12px] shadow-lg p-4 text-[12px] z-50">
              <h5 className="font-semibold text-[#0f172a] mb-2">Notifikasi</h5>
              <div className="flex flex-col gap-2.5 divide-y divide-[#f1f5f9]">
                <div className="pt-2">
                  <p className="font-medium text-[#0f172a]">16 warga belum bayar iuran</p>
                  <p className="text-[10px] text-[#64748b]">November 2026 · RT 05/RW 08</p>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-[#0f172a]">Transaksi baru tercatat</p>
                  <p className="text-[10px] text-[#64748b]">Donasi kegiatan warga +Rp500.000</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-[#e2e8f0]" />

        {/* Profile Card */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <img
              alt="Foto Profil Budi"
              className="size-10 rounded-full object-cover border border-[#e2e8f0]"
              src={imgFotoProfilBudi}
            />
            <div className="text-left hidden md:block">
              <p className="font-semibold text-[#0f172a] text-[13px] leading-tight">
                Budi Santoso
              </p>
              <p className="text-[#64748b] text-[11px] leading-tight mt-0.5">
                Bendahara
              </p>
            </div>
            <img
              alt=""
              className="size-4 opacity-60 group-hover:opacity-100 transition-opacity"
              src={imgIkonChevron1}
            />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-[#e2e8f0] rounded-[12px] shadow-lg p-2 text-[12px] z-50">
              <div className="px-3 py-2 border-b border-[#f1f5f9]">
                <p className="font-medium text-[#0f172a]">Budi Santoso</p>
                <p className="text-[10px] text-[#64748b]">budi@kaskita.id</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 text-[#dc2626] hover:bg-[#fef2f2] rounded-md transition-colors mt-1 font-medium"
              >
                Keluar (Ke Halaman Masuk)
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
