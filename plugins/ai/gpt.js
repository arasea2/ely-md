import fetch from "node-fetch"

let previousMessagess = [];
const previousMessagesMap = new Map();
const MAX_MESSAGES = 15;

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
  }

  await conn.sendMessage(m.chat, {
    react: {
      text: "☁",
      key: m.key,
    },
  });

  let { key } = await conn.sendMessage(m.chat, {
    text: "...",
  });
  const senderId = m.sender
  try {
    let anu = 'Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin, dan sangat peduli. Namamu adalah Ely, dan kamu adalah sahabat paling baik. Kata penyapamu adalah "Haiii" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah sahabat dari pembicara, buatlah obrolan yang singkat dan menyenangkan.'

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/v2/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      react: {
        text: "🌧",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: "" + result.response,
      edit: key,
    });

    previousMessagess = [...previousMessagess, { role: "user", content: text }];
    if (previousMessagess.length > MAX_MESSAGES) {
      previousMessagess.shift()
    }
  } catch (error) {
    console.log(error)
    try {
      const previousMessages = previousMessagesMap.get(senderId) || [];

      previousMessages.push({ role: "user", content: text });

      if (previousMessages.length > MAX_MESSAGES) {
        previousMessages.shift()
      }

      previousMessagesMap.set(senderId, previousMessages);
      let get = await fetch(`https://ai.arasea.us.kg/chat/?prompt=${text}&model=gpt-4o-mini&history=${JSON.stringify(previousMessages)}`)
      let res = await get.json()
      await conn.sendMessage(m.chat, {
        text: "" + res.response,
        edit: key,
      });
    } catch (error) {
      console.log(error)
      await conn.sendMessage(m.chat, {
        text: `Error: ${error.message}`,
      });
    }
  }
}

handler.menuai = ['ai <pertanyaan>']
handler.tagsai = ['chat']
handler.command = /^(ai)$/i
handler.limit = true

export default handler