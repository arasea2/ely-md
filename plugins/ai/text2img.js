import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `This command can generate an image from text\n\n Ex\n${usedPrefix + command} girl, pink hair, full body`
    const sender = m.sender.split(`@`)[0];

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://api.ryzendesu.vip/api/ai/text2img?prompt=${text}`

        await conn.sendMsg(m.chat, { image: { url: url }, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
    } catch (e) {
        console.log(e)
        m.reply('Server Down')
    }
}

handler.menuai = ['text2img <prompt>', 'text2image <prompt>']
handler.tagsai = ['img']
handler.command = /^(text2img|text2image)$/i

handler.premium = true
handler.limit = 2

export default handler
