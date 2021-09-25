const { Message, Client } = require("discord.js");
const leveling = require('discord-leveling');
const db = require('quick.db');

module.exports = {
    name: "level",
    aliases: ["레벨", "ㅣㄷㅍ디", "레벨확인"],
    description: "레벨을 표시합니다.",
    category: "Fun",
    example: ["level"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix) => {
       if(!message.content.startsWith(prefix)) return;
       let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
       let levelingtrue = db.get(`leveling_${message.guild.id}`)

       if(levelingtrue === null) return message.reply('이 서버는 레벨링 시스템이 꺼져 있습니다.')

       let output = await leveling.Fetch(message.author.id)
       if(!args[0]) return message.reply(`${message.author} 님은 현재 ${output.xp} 경험치로 ${output.level}레벨 입니다!`)
       if(user) return message.reply('자신의 레벨만 확인 가능합니다!')
    }
}