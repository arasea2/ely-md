import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .upscale'
    if (!/image\/(jpe?g|png)/.test(mime))
        throw `Mime ${mime} tidak support`
    const sender = m.sender.split(`@`)[0];
    m.reply('Mohon Ditunggu ^^')
    let media = await q.download()
    let url = await uploadImage(media)
    try {
        let hasil = await fetch(`https://api.ryzendesu.vip/api/ai/upscaler?url=${url}`)
        await conn.sendMsg(m.chat, { image: hasil, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
        m.react('')
    } catch (e) {
        console.log(e)
    }
}
handler.menuai = ['upscale']
handler.tagsai = ['upscaler']
handler.command = /^(upscaler)$/i

handler.limit = true

export default handler
