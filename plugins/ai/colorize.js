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

        let response = await fetch(`https://api.ryzendesu.vip/api/ai/colorize?url=${url}`)
        if (!response.ok) throw new Error('Gagal menghubungi API Colorize')

        await conn.sendMsg(m.chat, { image: response, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.menuai = ['removebg']
handler.tagsai = ['upscaler']
handler.command = /^(removebg)$/i

handler.limit = 3

export default handler