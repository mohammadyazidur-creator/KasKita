import React, { useState } from "react";
import imgIkonWallet from "../assets/dashboard/imgIkonWallet.svg";
import imgLeftHouse from "../assets/common/imgLeftHouse.svg";
import imgRightHouse from "../assets/common/imgRightHouse.svg";
import imgTropicalPlants from "../assets/common/imgTropicalPlants.svg";
import imgMan from "../assets/common/imgMan.svg";
import imgWoman from "../assets/common/imgWoman.svg";
import imgSharedLedger from "../assets/common/imgSharedLedger.svg";
import imgCoins from "../assets/common/imgCoins.svg";

interface AuthLoginProps {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}

export const AuthLogin: React.FC<AuthLoginProps> = ({
  onLoginSuccess,
  onGoToRegister,
}) => {
  const [email, setEmail] = useState("budi@kaskita.id");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row select-none" data-node-id="10:11125" data-name="01 · Masuk">
      {/* LEFT BRANDING HERO (656px in Figma) */}
      <div className="lg:w-[50%] xl:w-[600px] bg-[#ecfdf5] p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[500px]">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-[#059669] rounded-[12px] size-[42px] flex items-center justify-center shadow-xs">
              <img alt="" className="size-6" src={imgIkonWallet} />
            </div>
            <span className="font-bold text-[27px] text-[#064e3b] leading-tight">KasKita</span>
          </div>

          <p className="text-[#047857] text-[11px] font-semibold tracking-wider uppercase mt-10">
            KECIL IURANNYA. BESAR MANFAATNYA.
          </p>

          <h2 className="text-[38px] lg:text-[44px] font-bold text-[#064e3b] leading-[1.15] mt-3">
            Kas terkelola, <br />
            komunitas berdaya.
          </h2>

          <p className="text-[#427365] text-[15px] mt-4 leading-relaxed max-w-[480px]">
            Satu tempat untuk mencatat, mengelola, dan mempertanggungjawabkan setiap rupiah bersama.
          </p>
        </div>

        {/* Visual Composition / Illustration */}
        <div className="relative my-8 h-48 lg:h-64 flex items-center justify-center">
          <div className="relative w-full max-w-[420px] h-full flex items-center justify-center">
            <img alt="" className="absolute left-4 bottom-2 h-28 opacity-90" src={imgLeftHouse} />
            <img alt="" className="absolute right-4 bottom-2 h-28 opacity-90" src={imgRightHouse} />
            <img alt="" className="absolute inset-x-8 bottom-0 h-32 opacity-80" src={imgTropicalPlants} />
            <img alt="" className="absolute left-20 bottom-4 h-36" src={imgMan} />
            <img alt="" className="absolute right-20 bottom-4 h-36" src={imgWoman} />
            <img alt="" className="absolute inset-x-0 mx-auto bottom-6 h-28" src={imgSharedLedger} />
            <img alt="" className="absolute inset-x-0 mx-auto bottom-0 h-8" src={imgCoins} />
          </div>
        </div>

        {/* Benefit Card */}
        <div className="bg-white rounded-[12px] p-5 shadow-xs flex items-start gap-4">
          <div className="size-7 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#059669] font-bold text-sm shrink-0">
            🛡️
          </div>
          <div>
            <h4 className="font-semibold text-[#064e3b] text-[15px]">Transparan untuk semua.</h4>
            <p className="text-[#64748b] text-[13px] mt-1 leading-normal">
              Dari iuran warga hingga donasi masjid, setiap transaksi tercatat dengan rapi.
            </p>
          </div>
        </div>

        <p className="text-[#427365] text-[11px] mt-6">Dibuat untuk komunitas Indonesia</p>
      </div>

      {/* RIGHT AUTH FORM */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-14 relative">
        <div className="flex justify-end text-[12px] text-[#64748b]">
          <span>Bahasa Indonesia ⌄</span>
        </div>

        <div className="max-w-[440px] w-full mx-auto my-auto py-8">
          <h1 className="text-[29px] font-bold text-[#0f172a] leading-tight" data-node-id="10:11649">
            Selamat datang kembali 👋
          </h1>
          <p className="text-[13px] text-[#64748b] mt-2 mb-8" data-node-id="10:11650">
            Masuk dan kelola kas komunitas Anda dengan mudah.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-2" data-node-id="10:11651">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-4 py-3 text-[13px] text-[#0f172a] outline-none transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] font-medium text-[#334155]">Kata sandi</label>
                <a href="#lupa" className="text-[12px] text-[#059669] font-medium hover:underline">
                  Lupa kata sandi?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-4 py-3 text-[13px] text-[#0f172a] outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#059669] hover:bg-[#047857] text-white py-3.5 rounded-[10px] text-[13px] font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Masuk ke KasKita
            </button>
          </form>

          <div className="mt-8 text-center text-[13px] text-[#64748b]">
            Belum punya akun?{" "}
            <button
              onClick={onGoToRegister}
              className="text-[#059669] font-semibold hover:underline cursor-pointer"
            >
              Daftar organisasi sekarang
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#94a3b8]">KasKita © 2026</div>
      </div>
    </div>
  );
};
