import fetch from 'node-fetch'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!text || !text.trim()) throw 'Masukkan teks yang valid!';

  try {
    let url = `https://brat.caliphdev.com/api/brat/?text=${encodeURIComponent(text.trim())}`;

    let res = await fetch(url);
    if (!res.ok) throw `Gagal mengambil gambar dari API! Status: ${res.status}`;

    let imageBuffer = await res.buffer();

    let stiker = await sticker(imageBuffer, null, packname, author);
    await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);

  } catch (err) {
    console.error('Error:', err.message || err);
    await conn.sendMessage(m.chat, { text: `Error: ${err.message || 'Gagal mengambil gambar.'}` }, { quoted: m });
  }
};

handler.help = ['brat']
handler.tags = ['creator']
handler.command = /^(brat)$/i

export default handler