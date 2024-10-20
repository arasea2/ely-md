import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const userId = args[0]
    const zoneId = args[1]

    if (!userId) throw 'Masukkan User ID'
    if (!zoneId) throw 'Masukkan Server ID'
    if (!userId && !zoneId) throw 'Masukkan User ID dan Server ID'

    try {
        let res = await axios.get(`https://api.ryzendesu.vip/api/internet/cekml?userId=${userId}&zoneId=${zoneId}`)
        let result = res.data
        let ini_text =
            `
*RESULT*

> Username: ${result.data.username}
> Negara akun dibuat: ${result.data.create_role_country}
> Negara terakhir login: ${result.data.this_login_country}

> Waktu dibuat: ${result.data.user_reg_time}
> Terakhir login: ${result.data.timestamp}

Usia akun:
${result.accountAge.years} Tahun, ${result.accountAge.months} Bulan, ${result.accountAge.days} Hari,
${result.accountAge.hours} Jam, ${result.accountAge.minutes} Menit, ${result.accountAge.seconds} Detik
`

        await conn.sendMessage(m.chat, {
            text: ini_text
        }, { quoted: m });
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `error from API: ${e}`,
        }, { quoted: m});
    }
}

handler.help = ['cekml <id> <server>']
handler.tags = ['searching']
handler.command = /^(cekml|checkml|mlcheck)$/i

export default handler