const Discord = require('discord.js');
const tools = require('./functions.js')

const bot = new Discord.Client();
const token = 'NzAzMDkzMjUyMzA3Mjg4MTc1.XqJk_A.yWRQCeulbwOBQgFs3P1BckiG710';
const PREFIX = '!';

const fs = require('fs');
bot.commands = new Discord.Collection();

var dPoints = JSON.parse(fs.readFileSync(`storage/dPoints.json`, 'utf-8'));

fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
    if(err) console.error(err);
});

bot.on('ready', () =>{
    console.log('Bot up');
})

console.log('points');
bot.on('message', message=>{

    let msg = message.content.toUpperCase();
    let args = message.content.substring(PREFIX.length).split(" ");
    let cmd = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    
    if(!msg.startsWith(PREFIX)) return;
    if(message.author.bot) return;

    const commandFile = require(`./commands/${cmd}`);

    commandFile.run(bot, message, args, tools);
    
})
bot.login(token)