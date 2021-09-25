const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require('moment')

module.exports = {
    name: "user-info",
    aliases: ["userinfo", "infouser", "info-user", "유저정보", "정보유저", "ㅕㄴㄷ갸ㅜ래", "ㅑㅜ래ㅕㄴㄷㄱ", "ㅕㄴㄷㄱ-ㅑㅜ래", "uf", "fu"],
    description: "유저정보",
    category: "Fun",
    example: ["user-info"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix) => {
       const target = message.mentions.users.first() || message.author;
       const member = message.guild.members.cache.get(target.id);

       const respone = new MessageEmbed()
       .setAuthor(`<@!${target.id}> 님의 정보`, target.displayAvatarURL({dynamic:true}))
       .setThumbnail(target.displayAvatarURL({dynamic:true}))
       .setColor("NOT_QUITE_BLACK")
       .addField('🆔 ID', target.id, true)
       .addField('🌐 역할', `${member.roles.cache.map(r => r).join(' ').replace('@everyone', " ")}`)
       .addField('✅ 서버 가입일', `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}`)
       .addField('💫 계정 생성일', `${moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.createdAt).startOf('day').fromNow()}`)
       message.reply({embeds:[respone]});
    }
}