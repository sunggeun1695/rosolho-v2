const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: '아바타',
    description: '유저의 아바타를 표시합니다.',
    options: [
  {
    name: "유저",
    description: "유저를 멘션합니다.",
    type: "USER",
    required: false
  }
],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {*} color
     */
  run: async (client, interaction, args, color) => {
  await interaction.deferReply({
            ephemeral: false
        });
 const user = interaction.options.getUser("user");
 let member;
 if(user) member = interaction.guild.members.cache.get(user.id);
 else member = interaction.member;

  let avs = new MessageEmbed()
      .setAuthor(
        `아바타: ${member.user.tag}`,
        member.user.displayAvatarURL({ dynamic: true }),
        "https://discord.gg/DisBotlist")
     
      .setColor(client.config.Bot.Color)
      .setURL(
        member.user.displayAvatarURL({
          dynamic: true }))
      .setImage(
        member.user.displayAvatarURL({
          dynamic: true,
          size: 512 }));

      interaction.followUp({embeds : [avs]})
  },
};
