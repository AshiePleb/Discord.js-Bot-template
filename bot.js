const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const config = require("./config.json");

bot.login(config.token).then(function() {
  console.log(`Connected to discord and logged in as ${bot.user.tag}`)
}).catch((e) => {
  console.log(e)
})

bot.on('ready', async() => {
    bot.user.setActivity(config.game)
});

fs.readdir('./commands', (err, files) => {
    if (err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('No commands have been found why not make some!')
        return;
    }

    jsfile.forEach((file, i) => {
        let props = require(`./commands/${file}`)
        console.log(`${file} has been loaded`)
        bot.commands.set(props.help.name, props)
    })

    bot.on('message', async message => {
        let prefix = config.prefix

        if (!message.content.startsWith(prefix)) return
        if (message.author.bot || message.channel.type === "dm") return

        let messageArray = message.content.split(' ')
        let cmd = messageArray[0]
        let args = messageArray.splice(1)
        let commandFile = bot.commands.get(cmd.slice(prefix.length))

        if (commandFile) commandFile.run(bot, message, args)
    })
})
