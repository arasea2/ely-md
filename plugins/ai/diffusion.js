let handler = async (m, {conn, usedPrefix, command, args}) => {
    if (!args) throw `Usage: ${usedPrefix + command} style prompt\n*Ex:* Vintage-Anme Girl White hair\n\nStyle Tersedia:\nCute-Anime\nStudio-Ghibli\nAnimen\nWaifu\nVintage-Anime\nSoft-Anime`
    const [style, ...params] = args
    const toTitleCase = (str) => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');
    }
    const formattedStyle = toTitleCase(style)
    const validStyles = ['Cute-Anime', 'Studio-Ghibli', 'Anime', 'Waifu', 'Vintage-Anime', 'Soft-Anime']
    if (!validStyles.includes(formattedStyle)) {
        throw `Style tidak valid. Gunakan salah satu dari:\n${validStyles.join('\n')}`
    }
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⏱️' } }, { messageId: m.key.id })
    try {
        const promptParams = params.join(' ')
        let anu = await fetch(`https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(promptParams)}&style=${encodeURIComponent(formattedStyle)}`)
        await conn.sendMsg(m.chat, { image: anu, caption: `ini Kak @${m.sender.split('@')[0]} hasilnya`, mentions: [m.sender] }, { quoted: m })
        m.react('')
    } catch (e) {
        console.log(e)
        m.reply('Internal Server Error!')
    }
}

handler.menuai = ['diffusion <style> <prompt>']
handler.tagsai = ['img']
handler.command = /^(diffusion)$/i

export default handler