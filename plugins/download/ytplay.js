import ytdl from 'ytdl-core'
import yts from 'yt-search'
import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'
import { savefrom } from '@bochilteam/scraper'
import { somematch, isUrl, niceBytes } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	await conn.sendMessage(m.chat, {
		react: {
			text: "👌",
			key: m.key,
		},
	});
	let url = ''
	if (isUrl(text)) {
		url = text
		try {
			let anu = await yts({ videoId: await ytdl.getURLVideoID(url) })
			let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Author :* ${anu.author.name}\n`
				+ `⏲️ *Published :* ${anu.ago}\n`
				+ `⌚ *Duration :* ${anu.duration.timestamp}\n`
				+ `👁️ *Views :* ${anu.views}\n`
				+ `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(url)
				anu = anu.video[0]
				let txt = `📌 *${anu.title}*\n\n`
					+ `🪶 *Author :* ${anu.authorName}\n`
					+ `⏲️ *Published :* ${anu.publishedTime}\n`
					+ `⌚ *Duration :* ${anu.durationH}\n`
					+ `👁️ *Views :* ${anu.viewH}\n`
					+ `🌀 *Url :* ${anu.url}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				return m.reply('invalid url')
			}
		}
	} else {
		try {
			let anu = await yts(text)
			anu = anu.all[0]
			url = anu.url
			let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Author :* ${anu.author.name}\n`
				+ `⏲️ *Published :* ${anu.ago}\n`
				+ `${(anu.duration && anu.duration.timestamp) ? `⌚ *Duration :* ${anu.duration.timestamp}\n` : ''}`
				+ `👁️ *Views :* ${anu.views}\n`
				+ `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(text)
				anu = anu.video[0]
				url = anu.url
				let txt = `📌 *${anu.title}*\n\n`
					+ `🪶 *Author :* ${anu.authorName}\n`
					+ `⏲️ *Published :* ${anu.publishedTime}\n`
					+ `⌚ *Duration :* ${anu.durationH}\n`
					+ `👁️ *Views :* ${anu.viewH}\n`
					+ `🌀 *Url :* ${url}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				return m.reply(`Tidak ditemukan hasil.`)
			}
		}
	}
	if (!url) return
	try {
		let anu = await (await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${url}`)).json()
		await conn.sendMsg(m.chat, { audio: { url: anu.url }, mimetype: 'audio/mpeg' }, { quoted: m })
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(url)
			let anu = await ytdl.getInfo(res)
			anu = anu.formats.filter(v => v.mimeType.includes('audio/mp4'))[0]
			let size = parseInt(anu.contentLength)
			if (size > 400000000) return m.reply(`Filesize: ${niceBytes(size)}\nTidak dapat mengirim, maksimal file 400 MB`)
			await conn.sendMsg(m.chat, { audio: { url: anu.url }, mimetype: 'audio/mpeg' }, { quoted: m })
		} catch (e) {
			try {
				let res = await youtubedl(url)
				let data = res.audio[Object.keys(res.audio)[0]]
				let site = await data.download()
				if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
				await conn.sendMsg(m.chat, { audio: { url: site }, mimetype: 'audio/mpeg' }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let anu = await (await fetch(`https://widipe.com/download/ytdl?url=${url}`)).json()
					await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.result.mp3 }, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3` }, m, anu.result.title, anu.result.thumbnail, args[0])
				} catch (e) {
					console.log(e)
					try {
						let data = await savefrom(url)
						let dataObj = data[0].url.find(i => i.ext === 'opus');
						await conn.sendMsg(m.chat, { audio: { url: dataObj.url }, mimetype: 'audio/mpeg' }, { quoted: m })
					} catch (e) {
						console.log(e)
						return m.reply(`Server Down`)
					}
				}
			}
		}
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

handler.limit = true

export default handler
