/***
 CREATOR RIZXYU(SXZY)
 github.com/Rizxyu
 Dont delete credit nigga
***/
import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, text, command}) => {

    var user = db.data.users[m.sender]
    
    global.skill = ["swordmaster", "necromancer", "witch", "archer", "magicswordmaster", "thief", "shadow"]
    
    var bintang = {
    "Satu": "⭐",
    "Dua": "⭐⭐",
    "Tiga": "⭐⭐⭐",
    "Empat": "⭐⭐⭐⭐",
    "Lima": "⭐⭐⭐⭐⭐",
    "Enam": "⭐⭐⭐⭐⭐⭐"
    }//star how good is the skill
       
       let skil = text.trim().toLowerCase() // to filter text
         
       if (!skill.includes(skil)) throw `Pilih Skill Apa Yang Kamu Inginkan:\n\n${skill.map(skil => `› ${skil}`).join('\n')}
    
         How To use/Cara menggunakan:
         ${usedPrefix + command} <nameskill>
         
         Example/Contoh:
         ${usedPrefix + command} necromancer
         `
    
        if (user.skill == "") {
        user.skill = skil
        m.reply(`Kamu Telah Memilih Skill ${skil}`)
        } else if (user.skill) {
        m.reply(`Kamu Sudah Punya Skill ${user.skill} Tidak Bisa Diganti`)
       }
    
    }
    
    handler.menufun = ['pilihskill']
    handler.tagsfun = ['rpg']
    handler.command = /^(pilihskill|selectskill)$/i

    handler.rpg = true
    
  //  export default handler
