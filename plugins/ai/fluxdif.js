import db from '../../lib/database.js'

import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = pauthor
    let user = db.data.users[m.sender];
    if (user.isLoadingAnimeDif) {
        await m.reply("⏱️ Sedang dalam proses, harap tunggu hingga selesai.");
        return;
    }
    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} a girl with glasses, pink short hair, in a uniform, anime style, full body, bokeh`
    }
    user.isLoadingAnimeDif = true
    await m.reply('Tunggu yaa~')
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⏱️' } }, { messageId: m.key.id })

    const apiCombinations = [
        `https://api.ryzendesu.vip/api/ai/flux-diffusion?prompt=${encodeURIComponent(text)}`,   // Primary API: flux-diffusion
        `https://api.ryzendesu.vip/api/ai/flux-schnell?prompt=${encodeURIComponent(text)}`,      // Primary API: flux-schnell
        `https://apidl.asepharyana.my.id/api/ai/flux-diffusion?prompt=${encodeURIComponent(text)}`,  // Backup API: flux-diffusion
        `https://apidl.asepharyana.my.id/api/ai/flux-schnell?prompt=${encodeURIComponent(text)}`     // Backup API: flux-schnell
    ];

    let usedBackup = false;

    // Loop through the API combinations one by one
    for (let i = 0; i < apiCombinations.length; i++) {
        try {
            let response = await fetch(apiCombinations[i]);
            let imageBuffer = await response.buffer();

            // if (i >= 2) {
            //     conn.reply(m.chat, '⚠️ Using backup API due to failure of the primary.', m);
            // }

            await conn.sendMsg(m.chat, { image: response , caption: `ini Kak @${m.sender.split('@')[0]} hasilnya`, mentions: [m.sender] }, { quoted: m })
            m.react('')

            break

        } catch (error) {
            console.log(`URL ${apiCombinations[i]} failed:`, error);

            if (i === apiCombinations.length - 1) {
                conn.reply(m.chat, 'All API URLs failed. Please try again later.', m);
                return;
            }
        } finally {
            user.isLoadingAnimeDif = false
        }
    }
}

handler.menuai = ['flux <prompt>']
handler.tagsai = ['img']
handler.command = /^(flux(diff)?)$/i

handler.premium = false
handler.limit = 3

export default handler
