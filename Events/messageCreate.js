const db = require('quick.db');
const leveling = require('discord-leveling')
const Discord = require('discord.js');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(message.author.bot) return;

    if(prefix === null) {
        prefix = client.prefix;
    } else {
        prefix = prefix;
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let color = client.config.Bot.Color;

    const cmd = client.commands.get(command) || client.commands.find((x) => x.aliases && x.aliases.includes(command));

    if(!cmd) return;
    cmd.run(client, message, args, prefix, color);

    // leveling
    if(leveling && null) {
        return;
    } 

    if (leveling === true) {
        let profile = await leveling.Fetch(message.author.id);
        leveling.AddXp(message.author.id, 1);
    
        if(profile.xp + 0 > 120) {
            leveling.AddLevel(message.author.id, 1);
            leveling.SetXp(message.author.id, 1)
            message.reply(`축하합니다! 레벨이 ${profile.level + 1}으(로) 올랐습니다!`)
        }
    }

    if(message.channel.type === "DM") {
        client.users.cache.find(x => x.id === client.config.Developers).send(`${message.author} (${message.author.tag}) 님이 메세지를 보냈습니다.\n내용: \`${message.content}\``)
        message.reply('해당 내용이 개발진에게 전달되었습니다.')
    }


}