import React, { useState } from "react";
import imgFotoProfilBudi from "../assets/dashboard/imgFotoProfilBudi.png";

export const Settings: React.FC = () => {
  const [orgName, setOrgName] = useState("RT 05 / RW 08 Sukamaju");
  const [orgType, setOrgType] = useState("RT / RW");
  const [phone, setPhone] = useState("021-555-0123");
  const [address, setAddress] = useState("Jl. Melati No. 1, Kelurahan Sukamaju");
  const [saved, setSaved] = useState(false);

  const users = [
    {
      id: "u1",
      name: "Rizky Ramadhan",
      email: "rizky@email.com",
      role: "Admin",
      roleBadge: "bg-[#eff6ff] text-[#2563eb]",
    },
    {
      id: "u2",
      name: "Budi Santoso",
      email: "budi@email.com",
      role: "Bendahara",
      roleBadge: "bg-[#ecfdf5] text-[#059669]",
    },
    {
      id: "u3",
      name: "Andi Pratama",
      email: "andi@email.com",
      role: "Pengurus",
      roleBadge: "bg-[#f8fafc] text-[#64748b]",
    },
    {
      id: "u4",
      name: "Siti Aminah",
      email: "siti@email.com",
      role: "Warga",
      roleBadge: "bg-[#f8fafc] text-[#64748b]",
    },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6" data-node-id="10:11559" data-name="09 · Pengaturan">
      {/* Title & Save Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] leading-tight">Pengaturan</h2>
          <p className="text-[#64748b] text-[13px] mt-1" data-node-id="10:12828">
            Sesuaikan organisasi, kelola akses, dan jaga keamanan data.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#059669] hover:bg-[#047857] text-white h-[42px] px-6 rounded-[12px] flex items-center gap-2 text-[12px] font-semibold transition-all shadow-xs self-start md:self-auto cursor-pointer"
          data-node-id="10:12829"
        >
          <span>{saved ? "✓ Tersimpan!" : "Simpan perubahan"}</span>
        </button>
      </div>

      {/* 2 Main Setting Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profil Organisasi */}
        <div
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-xs flex flex-col justify-between"
          data-node-id="10:12831"
        >
          <div>
            <h4 className="font-semibold text-[#0f172a] text-[16px]">Profil organisasi</h4>
            <p className="text-[#64748b] text-[11px] mt-0.5">
              Identitas yang ditampilkan pada laporan keuangan.
            </p>

            <div className="space-y-4 mt-5 text-[12px]">
              <div>
                <label className="block text-[#0f172a] font-medium mb-1.5">Nama organisasi</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5 text-[#0f172a] outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0f172a] font-medium mb-1.5">Jenis organisasi</label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5 text-[#0f172a] outline-none"
                  >
                    <option value="RT / RW">RT / RW</option>
                    <option value="Masjid">Masjid / Musholla</option>
                    <option value="Koperasi">Koperasi</option>
                    <option value="Komunitas">Komunitas / Paguyuban</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0f172a] font-medium mb-1.5">Nomor telepon</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5 text-[#0f172a] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0f172a] font-medium mb-1.5">Alamat</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5 text-[#0f172a] outline-none"
                />
              </div>
            </div>
          </div>

          <p className="text-[#64748b] text-[10px] mt-6 pt-4 border-t border-[#f1f5f9]">
            Perubahan hanya dapat dilakukan oleh Admin.
          </p>
        </div>

        {/* Manajemen Pengguna */}
        <div
          className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-xs flex flex-col justify-between"
          data-node-id="10:12847"
        >
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#0f172a] text-[16px]">Manajemen pengguna</h4>
                <p className="text-[#64748b] text-[11px] mt-0.5">
                  4 pengguna memiliki akses organisasi
                </p>
              </div>
              <button className="bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#059669] text-[11px] font-semibold px-3 py-1.5 rounded-[10px] cursor-pointer">
                + Undang
              </button>
            </div>

            {/* Users Table */}
            <div className="mt-5 border border-[#f1f5f9] rounded-[10px] overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#f8fafc] text-[#64748b] text-[9px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Pengguna</th>
                    <th className="py-2.5 px-4">Role</th>
                    <th className="py-2.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            alt=""
                            className="size-8 rounded-full object-cover border border-[#e2e8f0]"
                            src={imgFotoProfilBudi}
                          />
                          <div>
                            <p className="font-semibold text-[#0f172a] text-[12px]">{u.name}</p>
                            <p className="text-[10px] text-[#64748b]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-medium ${u.roleBadge}`}>
                          {u.role} ⌄
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                        •••
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[#64748b] text-[10px] mt-6 pt-4 border-t border-[#f1f5f9]">
            Akses pengguna dapat diubah kapan saja oleh pemilik akun.
          </p>
        </div>
      </div>
    </div>
  );
};
