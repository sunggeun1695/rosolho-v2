const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["핑", '퐁', "pong", "ㅔㅑㅜㅎ", "ㅔㅐㅜㅎ"],
    description: "핑을 표시합니다.",
    category: "Informations",
    example: ["ping"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix, color) => {
        if(!message.content.startsWith(prefix)) return;
       await message.reply({ content: "핑 체크중..." }).then(async (msg) => {
            const ping = msg.createdAt - message.createdAt;
            const api_ping = client.ws.ping;

            const PingEmbed = new MessageEmbed()
            .setAuthor("퐁!", client.user.displayAvatarURL())
            .setColor(color)
            .addField("봇의 핑", `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, true)
            .addField("API의 핑", `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, true)
            .setFooter(`명령어 사용 ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            
            await msg.edit({
                content: "**핑 체크 완료**",
                embeds: [PingEmbed]
            })
        }).catch((error) => { client.oops(message.channel, error.message) })
    }
}