import fetch from "node-fetch"

const previousMessagesMap = new Map();
const MAX_MESSAGES = 15;

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        throw "Masukkan pertanyaan!\n\n*Contoh:* Berapa 5+5?";
    }

    let { key } = await conn.sendMessage(m.chat, {
        text: "...",
    });
    const senderId = m.sender
    const previousMessages = previousMessagesMap.get(senderId) || [];
    try {
        previousMessages.push({ role: "user", content: text });

        if (previousMessages.length > MAX_MESSAGES) {
            previousMessages.shift()
          }
      
          previousMessagesMap.set(senderId, previousMessages);

        let get = await fetch(`https://ai.arasea.us.kg/chat/?prompt=${text}&model=claude-3-haiku-20240307&history=${JSON.stringify(previousMessages)}`)
        let res = await get.json()
        await conn.sendMessage(m.chat, {
            text: "" + res.response,
            edit: key,
        });
    } catch (error) {
        await conn.sendMessage(m.chat, {
            text: `Error: ${error.message}`,
        });
    }
}

handler.menuai = ['claude <pertanyaan>']
handler.tagsai = ['chat']
handler.command = /^(claude)$/i

handler.premium = false
handler.limit = true

export default handler