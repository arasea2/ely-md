import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} girl big oppai, hair cut collor red, full body, bokeh`
    const sender = m.sender.split(`@`)[0];
    await conn.sendMessage(m.chat, {
        react: {
            text: "👌",
            key: m.key,
        },
    });

    try {
        let url = `https://btch.us.kg/v5/text2img?text=${text}`

        await conn.sendMsg(m.chat, { image: { url: url }, caption: `ini Kak @${sender} hasilnya`, mentions: [m.sender] }, { quoted: m })


    } catch (e) {
        console.log(e)
        m.reply(e)
    }
}

handler.menuai = ['animediff2 <prompt>']
handler.tagsai = ['img']
handler.command = /^(animediff2)$/i

handler.premium = true
handler.limit = 3

export default handler
