
const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "핑",
    description: "🏓 핑을 체크합니다.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        interaction.reply({ content: `💚 Pong! ${client.ws.ping}ms` })
    }
}