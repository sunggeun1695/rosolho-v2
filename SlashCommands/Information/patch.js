
const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "패치",
    description: "패치사항을 확인합니다.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle('패치내용')
        .setDescription('슬래시 명령어에서 뮤트 기능이 추가되었습니다! (일반 커맨드는 조금 기다려주세요)')
        interaction.reply({ embeds: [embed] })
    }
}