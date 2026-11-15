import React from "react";
import { motion } from "motion/react";
import { PageRoute } from "../types";

import imgIkonWallet from "../assets/dashboard/imgIkonWallet.svg";
import imgIkonChevron from "../assets/dashboard/imgIkonChevron.svg";
import imgIkonDashboard from "../assets/dashboard/imgIkonDashboard.svg";
import imgIkonTransactions from "../assets/dashboard/imgIkonTransactions.svg";
import imgIkonUsers from "../assets/dashboard/imgIkonUsers.svg";
import imgIkonDues from "../assets/dashboard/imgIkonDues.svg";
import imgIkonReport from "../assets/dashboard/imgIkonReport.svg";
import imgIkonSettings from "../assets/dashboard/imgIkonSettings.svg";
import imgIkonHelp from "../assets/dashboard/imgIkonHelp.svg";
import imgIkonFold from "../assets/dashboard/imgIkonFold.svg";

interface SidebarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}) => {
  const menuItems: { id: PageRoute; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: imgIkonDashboard },
    { id: "transactions", label: "Transaksi", icon: imgIkonTransactions },
    { id: "members", label: "Data Anggota", icon: imgIkonUsers },
    { id: "dues", label: "Iuran", icon: imgIkonDues },
    { id: "reports", label: "Laporan Keuangan", icon: imgIkonReport },
    { id: "settings", label: "Pengaturan", icon: imgIkonSettings },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-[#0f172a] h-screen sticky top-0 flex flex-col justify-between p-4 z-30 shrink-0 select-none overflow-hidden"
      data-node-id="10:11128"
      data-name="Sidebar"
    >
      <div className="flex flex-col">
        {/* Logo & Brand KasKita */}
        <div
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 px-3 py-4 cursor-pointer"
        >
          <div className="size-[30px] shrink-0" data-name="Ikon wallet">
            <img alt="KasKita" className="size-full object-contain" src={imgIkonWallet} />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="font-bold text-[24px] text-white leading-none tracking-tight">
                KasKita
              </h1>
              <p className="text-[#94a3b8] text-[9px] font-medium tracking-wider uppercase mt-1">
                KEUANGAN KOMUNITAS
              </p>
            </motion.div>
          )}
        </div>

        {/* Active Organization Widget */}
        <div
          className={`mt-4 bg-[#1e293b] rounded-[12px] p-3 transition-colors ${
            isCollapsed ? "flex justify-center" : "flex items-center justify-between"
          }`}
          data-name="Organisasi aktif"
        >
          {isCollapsed ? (
            <span className="text-white text-xs font-semibold">RT05</span>
          ) : (
            <>
              <div>
                <p className="font-semibold text-white text-[13px] leading-tight">
                  RT 05 / RW 08
                </p>
                <p className="text-[#94a3b8] text-[11px] mt-0.5">
                  Kelurahan Sukamaju
                </p>
              </div>
              <img alt="" className="size-4 opacity-70" src={imgIkonChevron} />
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="mt-6">
          {!isCollapsed && (
            <p className="px-3 text-[#64748b] text-[10px] font-semibold tracking-wider uppercase mb-2">
              MENU UTAMA
            </p>
          )}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-[8px] transition-all text-[13px] font-medium ${
                    isActive
                      ? "bg-[#059669] text-white shadow-sm"
                      : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white"
                  } ${isCollapsed ? "justify-center px-0" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <img alt="" className="size-5 shrink-0" src={item.icon} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-3">
        {/* Help Center Box */}
        {!isCollapsed && (
          <div className="bg-[#1e293b] p-3.5 rounded-[12px] flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 mb-1">
              <img alt="" className="size-4" src={imgIkonHelp} />
              <span className="font-semibold text-white text-[13px]">Butuh bantuan?</span>
            </div>
            <a
              href="#panduan"
              className="text-[#94a3b8] text-[11px] hover:text-white transition-colors"
            >
              Buka panduan KasKita ↗
            </a>
          </div>
        )}

        {/* Toggle Collapse */}
        <button
          onClick={onToggleCollapse}
          className={`flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#94a3b8] hover:text-white hover:bg-[#1e293b] transition-all text-[12px] ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
          title={isCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          <img
            alt=""
            className={`size-5 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
            src={imgIkonFold}
          />
          {!isCollapsed && <span>Ciutkan sidebar</span>}
        </button>

        {!isCollapsed && (
          <p className="px-3 text-[#64748b] text-[10px]">KasKita © 2026</p>
        )}
      </div>
    </motion.aside>
  );
};
