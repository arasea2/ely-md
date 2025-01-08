import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsai = {
	'img': 'DIFFUSION',
	'chat': 'GPT',
	'upscaler': 'ENHANCER IMAGE'
}
const defaultMenu = {
	before: `
━ ━ *[ 🤖 A.I ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = await (await fetch('https://raw.githubusercontent.com/arasea2/DB/main/honkai.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menuai = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuai: Array.isArray(plugin.tagsai) ? plugin.menuai : [plugin.menuai],
				tagsai: Array.isArray(plugin.tagsai) ? plugin.tagsai : [plugin.tagsai],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuai)
			if (plugin && 'tagsai' in plugin)
				for (let tag of plugin.tagsai)
					if (!(tag in tagsai) && tag) tagsai[tag] = tag
		conn.menuai = conn.menuai ? conn.menuai : {}
		let before = conn.menuai.before || defaultMenu.before
		let header = conn.menuai.header || defaultMenu.header
		let body = conn.menuai.body || defaultMenu.body
		let footer = conn.menuai.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsai).map(tag => {
				return header.replace(/%category/g, tagsai[tag]) + '\n' + [
					...menuai.filter(menuai => menuai.tagsai && menuai.tagsai.includes(tag) && menuai.menuai).map(menuai => {
						return menuai.menuai.map(menuai => {
							return body.replace(/%cmd/g, menuai.prefix ? menuai : '%p' + menuai)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.menuai == 'string' ? conn.menuai : typeof conn.menuai == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`message <text>`, `message <text>${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
		// aaa
	}
}

handler.help = ['menuai']
handler.tags = ['submenu']
handler.command = /^(menuai|mai)$/i

export default handler