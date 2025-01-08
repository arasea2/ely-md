let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} girl big oppai, hair cut collor red, full body, bokeh`
    const sender = m.sender.split(`@`)[0];

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://api.ryzendesu.vip/api/ai/v2/text2img?prompt=${text}&model=dalle`
        await conn.sendMsg(m.chat, { image: { url: url }, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })
    } catch (e) {
        console.log(e)
        m.reply(e)
    }
}

handler.menuai = ['dalle <prompt>']
handler.tagsai = ['img']
handler.command = /^(dalle)$/i

handler.limit = 2
handler.premium = true

export default handler
