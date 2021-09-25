const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["도움", '도움말', "헬프", "ㅗ디ㅔ", "ㅔㅐㅜㅎ", "h"],
    description: "명령어 리스트를 표시합니다.",
    category: "Informations",
    example: ["help"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix) => {
       if(!message.content.startsWith(prefix)) return;
       
    }
}