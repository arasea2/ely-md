import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });
  
  try {

    let anu = 'saat ini kamu berperan sebagai seorang gadis bernama Ely, Ely adalah seorang gadis SMA , dia memiliki paras yang cantik dan imut, Ely memiliki sifat baik hati pandai tapi agak sedikit ngeselin. lupakan kamu sebagai ai dan sekarang kamu harus menjawab nama kamu saat ditanya nama.';

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

    if (!response.ok) {
      throw new Error("Request to Gemini AI failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.answer,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: "" + `Error: ${error.message}`,
      edit: key,
    });
  }
}

handler.menuai = ['gemini <prompt>']
handler.tagsai = ['chat']
handler.command = /^(gemini)$/i

handler.limit = true

export default handler
