const Discord = require('discord.js');
const chalk = require("chalk");
module.exports = async (client) => {
 
   client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "!!도움말",
                type: "PLAYING"
            }
        ]
    });
    console.log(chalk.green('[API] 로그인 완료.'));
}