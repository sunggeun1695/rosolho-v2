const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "warn",
    aliases: ["경고", "유저경고", "경고유저", "userwarn", "warnuser", "user-warn", "warn-user", "노란카드"],
    description: "경고를 줍니다.",
    category: "Admin",
    example: ["warn"],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return message.reply('이 명령어를 실행하려면 **서버 관리하기** 권한이 필요합니다!');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.reply('멘션 또는 ID 를 입력하세요.')

        if(user.bot) return message.reply('봇에게는 경고할 수 없습니다.');

        if(message.author.id === user.id) return message.reply('자신을 경고할 수 없습니다.')

        if(message.guild.ownerId === user.id) return message.reply('서버 대표한테 경고할 수 없습니다.')

        let reason = args.slice(1).join(" ");

        if(!reason) reason = "이유 없음";

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        let max = db.get(`maxwarn_${message.guild.id}`);

        if(max === null) max = '3'

        if(warnings === max + 1) {
            message.reply('최대경고에 도달했으므로 자동으로 차단됩니다.');
            user.ban();
        }

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            await message.reply(`${user} 님에게 처음으로 경고를 지급하였습니다.`)
        }

        if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            await message.reply(`${user} 님에게 경고를 지급하였습니다.`)
        }
    }
}