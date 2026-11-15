import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TransactionItem } from "../types";

import imgIkon2 from "../assets/common/imgIkon2.svg";
import imgIkon3 from "../assets/common/imgIkon3.svg";
import imgIkon4 from "../assets/common/imgIkon4.svg";
import imgIkon5 from "../assets/common/imgIkon5.svg";
import imgIkon6 from "../assets/common/imgIkon6.svg";
import imgIkon7 from "../assets/common/imgIkon7.svg";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<TransactionItem, "id" | "code">) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [txType, setTxType] = useState<"income" | "expense">("income");
  const [date, setDate] = useState("2026-11-14");
  const [amount, setAmount] = useState("150000");
  const [category, setCategory] = useState("Iuran bulanan");
  const [description, setDescription] = useState("Iuran warga bulan November 2026");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(amount.replace(/\D/g, ""), 10) || 0;
    onAddTransaction({
      name: description || (txType === "income" ? "Pemasukan Baru" : "Pengeluaran Baru"),
      category,
      date: "14 Nov 2026",
      amount: num,
      type: txType,
      status: "Tercatat",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0f172a]"
          data-node-id="10:12211"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-white rounded-[16px] shadow-2xl w-full max-w-[600px] max-h-[92vh] flex flex-col relative z-10 overflow-hidden"
          data-node-id="10:12212"
          data-name="Modal tambah transaksi"
        >
          {/* Header */}
          <div className="p-7 pb-5 flex items-start justify-between border-b border-[#e2e8f0]">
            <div>
              <h3 className="text-[23px] font-bold text-[#0f172a] leading-tight" data-node-id="10:12213">
                Tambah transaksi
              </h3>
              <p className="text-[12px] text-[#64748b] mt-1" data-node-id="10:12214">
                Catat arus kas dengan lengkap dan transparan.
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#f8fafc] hover:bg-[#f1f5f9] p-2 rounded-[8px] transition-colors"
              data-node-id="10:12215"
            >
              <img alt="Tutup" className="size-4" src={imgIkon3} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-7 overflow-y-auto space-y-5">
            {/* Transaction Type Segmented Toggle */}
            <div className="bg-[#f1f5f9] p-1 rounded-[10px] grid grid-cols-2 gap-1" data-node-id="10:12219">
              <button
                type="button"
                onClick={() => {
                  setTxType("income");
                  setCategory("Iuran bulanan");
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-[8px] text-[12px] font-semibold transition-all ${
                  txType === "income"
                    ? "bg-white text-[#059669] shadow-xs"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                <img alt="" className="size-4" src={imgIkon4} />
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => {
                  setTxType("expense");
                  setCategory("Kebersihan");
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-[8px] text-[12px] font-semibold transition-all ${
                  txType === "expense"
                    ? "bg-white text-[#dc2626] shadow-xs"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                <img alt="" className="size-4" src={imgIkon5} />
                Pengeluaran
              </button>
            </div>

            {/* Row: Date & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#0f172a] mb-1.5" data-node-id="10:12227">
                  Tanggal *
                </label>
                <div className="flex items-center bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-[12px] text-[#0f172a] outline-none"
                    required
                  />
                  <img alt="" className="size-4 ml-2 opacity-60 pointer-events-none" src={imgIkon2} />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#0f172a] mb-1.5" data-node-id="10:12233">
                  Nominal *
                </label>
                <div className="flex items-center bg-white border border-[#059669] rounded-[8px] px-3 py-2.5">
                  <span className="text-[12px] font-medium text-[#0f172a] mr-2">Rp</span>
                  <input
                    type="text"
                    value={Number(amount).toLocaleString("id-ID")}
                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                    placeholder="0"
                    className="w-full text-[12px] font-semibold text-[#0f172a] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-[12px] font-medium text-[#0f172a] mb-1.5" data-node-id="10:12236">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2.5 text-[12px] text-[#0f172a] outline-none"
              >
                {txType === "income" ? (
                  <>
                    <option value="Iuran bulanan">Iuran bulanan</option>
                    <option value="Donasi warga">Donasi warga</option>
                    <option value="Infaq & sedekah">Infaq & sedekah</option>
                    <option value="Kas awal">Kas awal</option>
                  </>
                ) : (
                  <>
                    <option value="Kebersihan">Kebersihan</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Sosial">Sosial / Bantuan warga</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Listrik & Air">Listrik & Air pos ronda</option>
                  </>
                )}
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-medium text-[#0f172a]" data-node-id="10:12240">
                  Keterangan *
                </label>
                <span className="text-[10px] text-[#94a3b8]">{description.length}/200</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                rows={3}
                className="w-full bg-white border border-[#e2e8f0] rounded-[8px] p-3 text-[12px] text-[#0f172a] outline-none focus:border-[#cbd5e1]"
                placeholder="Tuliskan keterangan rincian transaksi…"
                required
              />
            </div>

            {/* Upload Proof Dropzone */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-medium text-[#0f172a]" data-node-id="10:12244">
                  Bukti / nota
                </label>
                <span className="text-[10px] text-[#94a3b8]">Opsional</span>
              </div>
              <div className="bg-[#f8fafc] border border-dashed border-[#e2e8f0] hover:border-[#059669] rounded-[12px] p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center">
                <img alt="" className="size-6 mb-2 opacity-70" src={imgIkon6} />
                <p className="text-[#059669] text-[11px] font-semibold">
                  Klik untuk unggah atau tarik berkas ke sini
                </p>
                <p className="text-[#64748b] text-[10px] mt-1">
                  JPG, PNG, atau PDF · Maksimal 5 MB
                </p>
              </div>
            </div>

            {/* Info notice banner */}
            <div className="bg-[#eff6ff] rounded-[8px] p-3 flex items-center gap-2.5">
              <img alt="" className="size-4 shrink-0" src={imgIkon7} />
              <p className="text-[#1d4ed8] text-[11px]">
                {txType === "income"
                  ? "Transaksi akan langsung menambah saldo kas organisasi."
                  : "Transaksi akan langsung mengurangi saldo kas organisasi."}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#e2e8f0] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-[10px] border border-[#e2e8f0] text-[12px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-[10px] bg-[#059669] hover:bg-[#047857] text-white text-[12px] font-semibold shadow-xs transition-colors"
              >
                Simpan transaksi
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
