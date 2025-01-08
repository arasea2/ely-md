import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .toanime'
        m.reply('Mohon Tunggu~')
        const sender = m.sender.split(`@`)[0];
        let media = await q.download()
        let url = await uploadImage(media)

        // Mengirim permintaan ke API waifu2x dan mendapatkan buffer
        let response = await fetch(`https://api.ryzendesu.vip/api/ai/waifu2x?url=${url}`)
        if (!response.ok) throw new Error('Gagal menghubungi API waifu2x')

        // Mengirim file buffer langsung ke chat
        await conn.sendMsg(m.chat, { image: response, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.menuai = ['waifu2x']
handler.tagsai = ['upscaler']
handler.command = /^(waifu2x)$/i

handler.limit = 1

export default handler
