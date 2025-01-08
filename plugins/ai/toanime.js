import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .toanime'
        if (!/image\/(jpe?g|png)/.test(mime))
            throw `Mime ${mime} tidak support`
        const sender = m.sender.split(`@`)[0];
        await conn.sendMessage(m.chat, {
            react: {
                text: "👌",
                key: m.key,
            },
        });
        let media = await q.download()
        let url = await uploadImage(media)
        let response = await fetch(`https://btch.us.kg/toanime?url=${url}`)
        let json = await response.json()
        let hasilUrl = json.url
    await conn.sendMsg(m.chat, { image: { url: hasilUrl }, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.menuai = ['toanime']
handler.tagsai = ['img']
handler.command = /^(toanime)$/i

handler.limit = true
handler.premium = true

export default handler