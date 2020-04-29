const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botping = new Date() - message.createdAt;
    let pingembed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .addField('API Ping ', Math.floor(bot.ws.ping) + ' ms', true)
     .addField('Bot Ping ', Math.floor(botping) + ' ms', true)
     .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL())
 return message.channel.send(pingembed);
}
module.exports.help = {
    name: "ping"
}