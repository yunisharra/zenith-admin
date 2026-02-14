
import React, { useState } from 'react';
import { 
  Globe, Server, Rocket, Cloud, ShieldAlert, ArrowRight, 
  Terminal, FileCode, CheckCircle2, Info, Copy, Check,
  Github, Layout, HardDrive, Download, MousePointerClick, Monitor, Smartphone,
  ExternalLink, Lock, Zap, MousePointer2, FolderOpen, Upload, GitBranch, GitCommit, GitMerge
} from 'lucide-react';

const Deployment: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
           <Github size={14} /> GitHub + Vercel Integration
        </div>
        <h1 className="text-5xl font-black text-[#0f172a] tracking-tighter italic uppercase">Integrasi Cloud Pro</h1>
        <p className="text-sm font-medium text-slate-400 max-w-2xl mx-auto">
           Anda sudah punya GitHub! Ini adalah langkah terakhir untuk membuat aplikasi Zenith Anda aktif 24/7 dan terupdate secara otomatis.
        </p>
      </header>

      {/* STEP BY STEP GITHUB TO VERCEL */}
      <section className="space-y-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* STEP 1: GITHUB */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl flex flex-col gap-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><GitBranch size={80} /></div>
               <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">1</div>
               <div>
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Simpan ke GitHub</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                     1. Buka <b>github.com/new</b><br/>
                     2. Beri nama repo: <b>zenith-admin</b><br/>
                     3. Klik <b>"uploading an existing file"</b> di bagian bawah halaman baru.<br/>
                     4. Tarik semua file aplikasi Anda ke sana dan klik <b>Commit Changes</b>.
                  </p>
               </div>
               <a href="https://github.com/new" target="_blank" className="mt-auto bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200">
                  BUAT REPO GITHUB <ExternalLink size={14} />
               </a>
            </div>

            {/* STEP 2: VERCEL CONNECT */}
            <div className="bg-white p-10 rounded-[3.5rem] border-4 border-indigo-600 shadow-2xl flex flex-col gap-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Rocket size={80} /></div>
               <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">2</div>
               <div>
                  <h4 className="font-black text-indigo-600 uppercase text-xs tracking-widest mb-2">Hubungkan ke Vercel</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                     1. Buka Vercel (seperti screenshot Anda).<br/>
                     2. Klik <b>"Continue with GitHub"</b>.<br/>
                     3. Cari repo <b>zenith-admin</b> yang baru Anda buat.<br/>
                     4. Klik tombol <b>Import</b>.
                  </p>
               </div>
               <div className="mt-auto bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                  <p className="text-[9px] font-black text-indigo-600 uppercase text-center">Tampilan Pro Aktif</p>
               </div>
            </div>

            {/* STEP 3: DONE */}
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] text-white shadow-xl flex flex-col gap-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><CheckCircle2 size={80} /></div>
               <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">3</div>
               <div>
                  <h4 className="font-black text-emerald-400 uppercase text-xs tracking-widest mb-2">Selesai & Auto-Update</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                     "Setiap kali Anda mengubah kode di GitHub, Vercel akan langsung mengupdate aplikasi Anda secara ajaib tanpa perlu upload ulang manual!"
                  </p>
               </div>
               <div className="mt-auto flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <Zap size={16} className="text-amber-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">CI/CD Pipeline Active</span>
               </div>
            </div>
         </div>
      </section>

      {/* INFO TAMBAHAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl flex items-center gap-10">
            <div className="hidden lg:block bg-white/20 p-6 rounded-[2rem] border border-white/20">
               <HardDrive size={40} />
            </div>
            <div>
               <h3 className="text-2xl font-black italic uppercase tracking-tight">Kenapa GitHub?</h3>
               <p className="text-xs text-indigo-100 font-medium leading-relaxed mt-2">
                  GitHub adalah tempat "menyimpan" kode Anda dengan aman. Vercel hanya bertugas "menampilkan" kode tersebut sebagai website. Jika laptop Anda rusak, kode Anda tetap aman di GitHub.
               </p>
            </div>
         </div>

         <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200 flex flex-col justify-center items-center text-center space-y-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
               <ShieldAlert className="text-amber-500" size={32} />
            </div>
            <h4 className="font-black uppercase text-sm tracking-widest">Catatan Penting</h4>
            <p className="text-[11px] text-slate-500 font-medium max-w-sm">
               Saat upload ke GitHub, pastikan <b>tidak ada API KEY</b> yang tertulis langsung di kode jika repository Anda diatur sebagai "Public".
            </p>
         </div>
      </div>

      {/* ALTERNATIF */}
      <div className="text-center space-y-4 pt-10 border-t border-slate-100">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Punya kendala dengan GitHub?</p>
         <div className="flex justify-center gap-4">
            <a href="https://app.netlify.com/drop" className="text-[10px] font-black text-indigo-600 hover:underline">Gunakan Netlify Drop (Tanpa Akun)</a>
            <span className="text-slate-300">•</span>
            <button onClick={() => alert("Hubungi Administrator untuk bantuan remote.")} className="text-[10px] font-black text-slate-500 hover:underline">Butuh Bantuan Langsung?</button>
         </div>
      </div>
    </div>
  );
};

export default Deployment;
