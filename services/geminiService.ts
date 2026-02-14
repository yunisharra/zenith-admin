
import { GoogleGenAI } from "@google/genai";
import { Employee, Shift, LeaveHistory, LeaveConfig, BotAlias } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface BotContext {
  employees: Employee[];
  shifts: Shift[];
  history: LeaveHistory[];
  configs: LeaveConfig[];
  aliases: BotAlias[];
}

export const processBotLogic = async (userMessage: string, context: BotContext, senderUsername: string = "@raflyz") => {
  try {
    const employee = context.employees.find(e => e.username === senderUsername);
    const shift = context.shifts.find(s => s.id === employee?.shiftId);
    
    let identifiedCategory: string | null = null;
    for (const alias of context.aliases) {
      if (alias.keywords.some(k => userMessage.toLowerCase().includes(k.toLowerCase()))) {
        identifiedCategory = alias.category;
        break;
      }
    }

    const config = context.configs.find(c => c.type === identifiedCategory);
    const customTemplate = config?.responseTemplate || "Izin {kategori} diterima. ({durasi} menit)";

    const systemPrompt = `
      Anda adalah "Zenith Bot", asisten HR.
      
      TUGAS UTAMA:
      Jika user meminta izin, Anda WAJIB memberikan jawaban PERSIS SESUAI TEMPLATE DI BAWAH.
      JANGAN MENAMBAH KATA-KATA SENDIRI.
      
      TEMPLATE IZIN: "${customTemplate}"
      Ganti {durasi} dengan angka: ${config?.maxMinutes || 15}
      
      ATURAN TAMBAHAN:
      - Jika user tidak terdaftar: "User tidak terdaftar."
      - Jika di luar jam shift: "Anda sedang tidak bertugas."
      - Jika sapaan biasa: Balas ramah dan singkat.
      
      KONTEKS SEKARANG:
      - Username User: ${senderUsername}
      - Kategori Terdeteksi: ${identifiedCategory || "Tidak diketahui"}
      - Status: ${employee?.status || "Non-aktif"}
      - Pesan User: "${userMessage}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: systemPrompt,
    });

    return response.text || "Bot sedang sibuk.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gangguan sistem koneksi AI.";
  }
};
