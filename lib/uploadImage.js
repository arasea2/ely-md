import axios from 'axios'
import db from './database.js'
import { fileTypeFromBuffer } from 'file-type'
import { niceBytes, headers } from './func.js'

/**
 * Upload image to telegra.ph / imgbb / neko.pe
 * Supported all mimetype
 * @param {Buffer} buffer Media Buffer
 * @return {Promise<string>}
 */
export default async (buffer, json = false) => {
	const { ext, mime } = await fileTypeFromBuffer(buffer)
	let form = new FormData()
	let host, link, filesize, status = true
	const r = (Math.random() + 1).toString(36).substring(2)
	const blob = new Blob([buffer], { type: mime })
	const filename = r+'.'+ext
	form.append(mime.split('/')[0], blob, filename)
	try {
		form = new FormData()
		form.append('file', blob, filename)
		const data = await (await fetch('https://tmpfiles.org/api/v1/upload', {
			method: 'post',
			body: form,
		})).json()
		const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url)
		host = 'https://tmpfiles.org'
		link = `https://tmpfiles.org/dl/${match[1]}`
		if (data.status != 'success') throw Error()
		filesize = niceBytes(Buffer.byteLength(buffer))
	} catch {
		try {
			form = new FormData()
			form.append('file', blob, filename)
			const data = await (await fetch('https://i.supa.codes/api/upload', {
				method: 'post',
				body: form,
			})).json()
			if (!data.link) throw Error()
			host = data.origin
			link = data.link
			filesize = niceBytes(Buffer.byteLength(buffer))
		} catch {
			try {
				const formData = new FormData()
				formData.append('reqtype', 'fileupload')
				formData.append('fileToUpload', blob, 'file.' + ext)
				const response = await fetch('https://catbox.moe/user/api.php', {
					method: 'POST',
					body: formData,
					headers
				})
				host = 'https://catbox.moe'
				link = await response.text()
				if (!/http/.test(link)) throw Error()
				filesize = niceBytes(Buffer.byteLength(buffer))
			} catch {
				try {
					form = new FormData()
					form.append('file', blob, filename)
					const data = await (await fetch('https://storage.neko.pe/api/upload.php', {
						method: 'post',
						body: form,
					})).json()
					host = 'https://neko.pe'
					link = data.result.url_file
					filesize = data.result.filesize
				} catch (e) {
					try {
						form = new FormData()
						form.append('file', blob, filename)
						const data = await (await fetch('https://file.btch.rf.gd/api/upload.php', {
							method: 'post',
							body: form,
						})).json()
						host = 'https://file.btch.bz'
						link = data.result.url
						filesize = niceBytes(Buffer.byteLength(buffer))
					} catch (e) {
						try {
						form = new FormData()
						form.append('file', blob, filename)
						const data = await (await fetch('https://cdn.meitang.xyz/api/upload.php', {
							method: 'post',
							body: form,
						})).json()
						host = 'https://cdn.meitang.xyz'
						link = data.result.url
						filesize = niceBytes(Buffer.byteLength(buffer))
					} catch (e) {
						console.log(e)
						status = false
					}
					}
				}
			}
		}
	}
	if (!status) return false
	if (json) return {
		status: true,
		result: {
			host: host,
			filename: filename,
			mimetype: mime,
			filesize: filesize,
			url: link
		}
	}
	else return link
}