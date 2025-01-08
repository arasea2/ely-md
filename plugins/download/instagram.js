import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!args[0]) throw `Linknya?\nExample: *${usedPrefix}${command} https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ==*`;

  if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) return m.reply(`Invalid Instagram URL.`)
  await conn.sendMessage(m.chat, {
    react: {
      text: "👌",
      key: m.key,
    },
  });
  try {
    const res = await axios.get(`https://api.ryzendesu.vip/api/downloader/igdl?url=${args[0]}`)
    for (let i of res.data.data) {
      if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
        await conn.sendMsg(m.chat, { image: { url: a.url } }, { quoted: m })
      } else {
        await conn.sendMsg(m.chat, { video: { url: a.url } }, { quoted: m })
      }
    }
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
    m.reply(`Error: ${e.message}`);
  }
}

handler.menudownload = ['instagram <url>'];
handler.tagsdownload = ['search'];
handler.command = /^(instagram|igdl|ig|instagramdl)$/i;

handler.limit = true;

export default handler
