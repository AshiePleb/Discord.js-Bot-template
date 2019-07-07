const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const useruser = "Requested By: " + message.author.tag;
    const userurl = message.author.avatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Getting Ping..`)
    message.channel.send(botembed).then(message =>{
        botembed.setColor("RANDOM")
        botembed.setDescription(`:ping_pong: My Ping Is: **\`${bot.pings[0]}ms\`**`)
        botembed.setFooter(useruser, userurl)
        message.edit(botembed)
    })

}

module.exports.help = {
	name:"ping"
}
