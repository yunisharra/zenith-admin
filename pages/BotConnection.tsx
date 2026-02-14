
import React, { useState, useEffect } from 'react';
import { 
  Zap, ShieldCheck, Copy, Terminal, CheckCircle, Code, Globe, Send, 
  RefreshCw, Server, Cloud, Rocket, ExternalLink, ShieldAlert, Check, 
  PlusCircle, Sparkles, MousePointer2, Lock, Layout, FileJson, Github, 
  ArrowRight, Info, AlertTriangle, Power, Edit3, MousePointerClick, 
  MessageSquare, AlertCircle, Activity, Cpu, Database, Link, Wifi, WifiOff,
  Trophy, ZapOff, HardDrive, Box, Database as DbIcon
} from 'lucide-react';
import { BotSettings, LeaveConfig, Employee, BotAlias } from '../types';

interface BotConnectionProps {
  settings: BotSettings;
  setSettings: (s: BotSettings) => void;
  configs: LeaveConfig[];
  employees: Employee[];
  aliases: BotAlias[];
  onCloudSync?: (type: 'push' | 'pull') => Promise<void>;
}

const BotConnection: React.FC<BotConnectionProps> = ({ settings, setSettings, configs, employees, aliases, onCloudSync }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showCopied, setShowCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'index' | 'supabase' | 'sql'>('supabase');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);
  
  const handleSave = () => {
    setSettings(localSettings);
    alert("Konfigurasi disimpan secara lokal. Klik Sync untuk mengunggah ke Cloud.");
  };

  const handleSync = async (type: 'push' | 'pull') => {
    if (!onCloudSync) return;
    setIsSyncing(true);
    await onCloudSync(type);
    setIsSyncing(false);
  };

  const sqlSchema = `-- KOPAS INI KE SQL EDITOR SUPABASE
-- Buat Tabel Karyawan
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  name TEXT,
  username TEXT,
  telegram_id TEXT,
  role TEXT,
  shift_id TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Buat Tabel Histori
CREATE TABLE IF NOT EXISTS history (
  id TEXT PRIMARY KEY,
  employee_name TEXT,
  type TEXT,
  time_out TEXT,
  time_in TEXT,
  date TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tighter italic uppercase flex items-center gap-3">
             Command Center <Cpu className="text-indigo-600" size={32} />
          </h1>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Integrasi Infrastruktur Server & Cloud</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => handleSync('pull')} disabled={isSyncing} className="bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-3xl text-[11px] font-black tracking-widest flex items-center gap-2 hover:bg-slate-50">
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} /> PULL DARI CLOUD
          </button>
          <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-4 rounded-3xl text-[11px] font-black tracking-widest flex items-center gap-2 hover:bg-black shadow-lg">
            <ShieldCheck size={16} /> SIMPAN CONFIG
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 relative overflow-hidden group border-b-4 border-emerald-800">
            <Box className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">Database Cloud (Gratis)</h4>
            <h3 className="text-2xl font-black italic mt-1">Supabase DB</h3>
            <p className="text-[11px] mt-4 font-medium leading-relaxed opacity-90">
               Simpan data Karyawan & Histori di Cloud. Data <b>aman selamanya</b> meski laptop di-reset.
            </p>
         </div>

         <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-4 border-indigo-800">
            <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">Rekomendasi VPS</h4>
            <h3 className="text-2xl font-black italic mt-1">DigitalOcean</h3>
            <p className="text-[11px] mt-4 font-medium leading-relaxed opacity-90">
               Jalankan bot 24 jam dengan performa <b>Anti-Delay</b> di region Singapore.
            </p>
         </div>
         
         <div className="col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-8 shadow-sm">
            <div className="bg-amber-100 p-6 rounded-[2rem] text-amber-600">
               <AlertTriangle size={32} />
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-900 uppercase italic">Peringatan Keamanan</h4>
               <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">
                  Jangan pernah membagikan <b>Bot Token</b> atau <b>Supabase Key</b> kepada siapapun. Siapa pun yang memiliki akses kunci ini bisa mengontrol bot dan database Anda.
               </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
             <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                <DbIcon className="text-emerald-500" size={24} />
                <h3 className="text-lg font-black text-slate-900 uppercase italic">Koneksi Supabase</h3>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supabase Project URL</label>
                  <input 
                      type="text" 
                      value={localSettings?.supabaseUrl || ''}
                      onChange={e => setLocalSettings({...localSettings, supabaseUrl: e.target.value})}
                      className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-none font-bold text-slate-700 shadow-inner text-sm"
                      placeholder="https://xyz.supabase.co"
                    />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supabase Anon Key</label>
                  <input 
                      type="password" 
                      value={localSettings?.supabaseKey || ''}
                      onChange={e => setLocalSettings({...localSettings, supabaseKey: e.target.value})}
                      className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-none font-bold text-slate-700 shadow-inner text-sm"
                      placeholder="eyJhbGciOiJIUzI1NiI..."
                    />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => handleSync('push')}
                    disabled={isSyncing || !localSettings.supabaseUrl}
                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-[11px] tracking-widest shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all uppercase"
                  >
                    {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <Cloud size={18} />}
                    PUSH DATA KE SUPABASE
                  </button>
                  <p className="text-[9px] text-center text-slate-400 font-bold mt-4 uppercase tracking-tighter italic">
                    *Pastikan tabel sudah dibuat via SQL Editor (Cek Tab Sebelah)
                  </p>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-slate-100">
               <div className="flex bg-slate-200/50 p-1 rounded-2xl gap-1">
                  <button onClick={() => setActiveTab('supabase')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'supabase' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500'}`}>SUPABASE EDGE</button>
                  <button onClick={() => setActiveTab('sql')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'sql' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'}`}>SQL SCHEMA (DB)</button>
                  <button onClick={() => setActiveTab('index')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'index' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'}`}>NODE.JS (VPS)</button>
               </div>
            </div>
            <div className="flex-1 bg-[#0b0e14] p-8 overflow-auto custom-scrollbar font-mono text-[11px] leading-relaxed relative">
               <button 
                onClick={() => {
                  navigator.clipboard.writeText(activeTab === 'sql' ? sqlSchema : activeTab === 'supabase' ? 'code...' : 'code...');
                  setShowCopied(true); setTimeout(() => setShowCopied(false), 2000);
                }}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-[9px] font-black flex items-center gap-2 border border-white/5"
               >
                 {showCopied ? <Check size={12} /> : <Copy size={12} />} COPY
               </button>
               <pre className={activeTab === 'sql' ? 'text-amber-400' : activeTab === 'supabase' ? 'text-emerald-400' : 'text-sky-300'}>
                 <code>{activeTab === 'sql' ? sqlSchema : activeTab === 'supabase' ? 'Coming soon...' : 'Coming soon...'}</code>
               </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConnection;
