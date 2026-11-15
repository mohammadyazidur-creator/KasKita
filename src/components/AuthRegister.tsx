import React, { useState } from "react";
import imgIkonWallet from "../assets/dashboard/imgIkonWallet.svg";
import imgLeftHouse from "../assets/common/imgLeftHouse.svg";
import imgRightHouse from "../assets/common/imgRightHouse.svg";
import imgTropicalPlants from "../assets/common/imgTropicalPlants.svg";
import imgMan from "../assets/common/imgMan.svg";
import imgWoman from "../assets/common/imgWoman.svg";
import imgSharedLedger from "../assets/common/imgSharedLedger.svg";
import imgCoins from "../assets/common/imgCoins.svg";

interface AuthRegisterProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

export const AuthRegister: React.FC<AuthRegisterProps> = ({
  onRegisterSuccess,
  onGoToLogin,
}) => {
  const [orgType, setOrgType] = useState<"rt" | "masjid" | "koperasi" | "organisasi">("rt");
  const [orgName, setOrgName] = useState("RT 05 / RW 08 Sukamaju");
  const [userName, setUserName] = useState("Budi Santoso");
  const [phone, setPhone] = useState("081234567890");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row select-none" data-node-id="10:11126" data-name="02 · Daftar organisasi">
      {/* LEFT BRANDING HERO */}
      <div className="lg:w-[50%] xl:w-[600px] bg-[#ecfdf5] p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[500px]">
        <div>
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

        {/* Visual Illustration */}
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

        {/* Benefit Box */}
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

      {/* RIGHT REGISTRATION FORM */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-14 relative overflow-y-auto">
        <div className="flex justify-end text-[12px] text-[#64748b]">
          <span>Bahasa Indonesia ⌄</span>
        </div>

        <div className="max-w-[440px] w-full mx-auto my-auto py-8">
          <h1 className="text-[28px] font-bold text-[#0f172a] leading-tight" data-node-id="10:11760">
            Mulai langkah baik bersama.
          </h1>
          <p className="text-[13px] text-[#64748b] mt-2 mb-6" data-node-id="10:11761">
            Daftarkan organisasi Anda. Gratis untuk memulai.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Org Type Selection */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-2" data-node-id="10:11762">
                Jenis organisasi
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setOrgType("rt")}
                  className={`p-2.5 rounded-[10px] border flex flex-col items-center justify-center gap-1 transition-all ${
                    orgType === "rt"
                      ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                      : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                  }`}
                >
                  <span className="text-base">🏘️</span>
                  <span className="text-[11px] font-medium">RT / RW</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrgType("masjid")}
                  className={`p-2.5 rounded-[10px] border flex flex-col items-center justify-center gap-1 transition-all ${
                    orgType === "masjid"
                      ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                      : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                  }`}
                >
                  <span className="text-base">🕌</span>
                  <span className="text-[11px] font-medium">Masjid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrgType("koperasi")}
                  className={`p-2.5 rounded-[10px] border flex flex-col items-center justify-center gap-1 transition-all ${
                    orgType === "koperasi"
                      ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                      : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                  }`}
                >
                  <span className="text-base">🏢</span>
                  <span className="text-[11px] font-medium">Koperasi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrgType("organisasi")}
                  className={`p-2.5 rounded-[10px] border flex flex-col items-center justify-center gap-1 transition-all ${
                    orgType === "organisasi"
                      ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                      : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                  }`}
                >
                  <span className="text-base">👥</span>
                  <span className="text-[11px] font-medium">Organisasi</span>
                </button>
              </div>
            </div>

            {/* Nama Organisasi */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-1.5" data-node-id="10:11781">
                Nama organisasi
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Contoh: RT 05 / RW 08 Sukamaju"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#0f172a] outline-none"
                required
              />
            </div>

            {/* Nama Anda */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-1.5">
                Nama Anda (Pengurus/Bendahara)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#0f172a] outline-none"
                required
              />
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-1.5">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812xxxxxxx"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#0f172a] outline-none font-mono"
                required
              />
            </div>

            {/* Kata Sandi */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-1.5">
                Kata sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full bg-white border border-[#e2e8f0] focus:border-[#059669] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#0f172a] outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#059669] hover:bg-[#047857] text-white py-3 rounded-[10px] text-[13px] font-semibold transition-colors shadow-xs cursor-pointer mt-4"
            >
              Daftar organisasi sekarang
            </button>
          </form>

          <div className="mt-6 text-center text-[13px] text-[#64748b]">
            Sudah punya akun?{" "}
            <button
              onClick={onGoToLogin}
              className="text-[#059669] font-semibold hover:underline cursor-pointer"
            >
              Masuk di sini
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#94a3b8]">KasKita © 2026</div>
      </div>
    </div>
  );
};
