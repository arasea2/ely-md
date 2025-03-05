import fetch from "node-fetch"
import { sticker } from '../../lib/sticker.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example:\n${usedPrefix + command} https://t.me/addstickers/ult_1610338601_1`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `???`
    let packName = args[0].replace("https://t.me/addstickers/", "") 
    let gas = await fetch(`https://api.telegram.org/bot${process.env.tele_token}/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    if (!gas.ok) throw 'Internal server Error'
    let json = await gas.json()
    m.reply(`*Sticker total:* ${json.result.stickers.length}`.trim())
    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].file_id
        let gasIn = await fetch(`https://api.telegram.org/bot${process.env.tele_token}/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        let stiker = await sticker(false, `https://api.telegram.org/file/bot${process.env.tele_token}/` + jisin.result.file_path, packname, author)
        await delay(1000)
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { quoted: m })
        await delay(1000)
    }
    throw `*Done*`
}
handler.help = ['stickertele <url>']
handler.tags = ['creator']
handler.command = /^(stic?kertele(gram)?)$/i

handler.limit = 10

export default handler

const delay = time => new Promise(res => setTimeout(res, time))