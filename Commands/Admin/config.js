const { Message, Client } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "settings",
    aliases: ["options", "설정", "ㄴㄷㅅ샤ㅜㅎㄴ", "ㅐㅔ샤ㅐㅜㄴ"],
    description: "핑을 표시합니다.",
    category: "Admin",
    example: ["settings"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {GuildMember} member
     * @param {String[]} args
     */

    run: async (client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;
       if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply('이 명령어를 사용하려면 **서버 관리하기** 명령어가 필요해요.')
       if(!args[0]) return message.reply('설정하실 것을 입력하세요. (예: 접두사, 레벨링, 최대경고, 환영설정, 퇴장설정)');
       if(args[0] == "접두사") {
            if(!args[1]) return message.reply('설정하실 접두사를 입력하세요.');
            db.set(`prefix_${message.guild.id}`, args[1])
            message.reply(`접두사가 ${args[1]} 로 변경되었습니다.`)
       }
       if (args[0] == "레벨링") {
           let leveling = db.get(`leveling_${message.guild.id}`)
           if(args[1] == "켜기") {
                if(leveling === true) return message.reply('이미 레벨링이 켜져 있습니다!')
                db.set(`leveling_${message.guild.id}`, true)
                message.reply('레벨링이 켜졌습니다.')
           }

           if(args[1] == "끄기") {
               if(leveling === null) return message.reply('이미 레벨링이 꺼져 있습니다!')
               db.set(`leveling_${message.guild.id}`, null)
               message.reply('레벨링이 꺼졌습니다.')
           }

           if(!args[1]) return message.reply('레벨링은 켜기 또는 끄기로만 제어하실 수 있습니다.')
       }

       if(args[0] == "최대경고") {
           if(["0", "1", "2"].includes(args[1])) return message.reply('3 이상으로 설정해 주세요.');
           if(!args[1]) return message.reply('설정할 최대경고를 입력하세요.')
           if(isNaN(args[1])) return message.reply('숫자가 아닙니다.');
           db.set(`maxwarn_${message.guild.id}`, args[1]);
           message.reply(`최대경고가 ${args[1]} 으(로) 변경되었습니다.`)
       }
    }
}