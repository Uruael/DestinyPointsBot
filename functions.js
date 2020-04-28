const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    
    
    myfate: function(bot,who,message) {


        var dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));
        num = (Math.random() * 6);
        if(num<=1){
            if(who)
                dPoints['PCs']+=1;      
            else
                dPoints['GMs']+=1;      
        }
        else if(num<=5){
            if(who)
                dPoints['PCs']+=2;      
            else
                dPoints['GMs']+=2;   
        }
        else{
            if(who)
                dPoints['PCs']+=3;      
            else
                dPoints['GMs']+=3;   
        }

    fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
        if(err) console.error(err);
    });
    
    this.show(bot,message,dPoints);
    },

    

    flip: function(bot,who,message){
        var dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));

        if(who){        //PC
            if(dPoints['PCs']>0){
                dPoints['PCs']-=1;
                dPoints['GMt']+=1;   
            }
            else if(dPoints['PCt']>0)
                dPoints['PCt']-=1;     
            else
                message.reply("No tokens") 
        }
        else{
            if(dPoints['GMs']>0){
                dPoints['GMs']-=1;
                dPoints['PCt']+=1;   
            }
            else if(dPoints['GMt']>0)
                dPoints['GMt']-=1;     
            else
                message.reply("No tokens") 
        }
        fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
            if(err) console.error(err);
        });
        this.show(bot,message,dPoints);
    },

    reset:  function(bot,message){
        var dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));

        dPoints['GMs']=0;
        dPoints['GMt']=0;
        dPoints['PCs']=0;
        dPoints['PCt']=0;

        fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
            if(err) console.error(err);
        });
        this.show(bot,message,dPoints);
    },
    //NAPRAW NAN ORAZ PILNOWAINIE ABY BYLY 2 ARG
    setpc: function(bot,message,a,b){
        var dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));

        if(!isNaN(a) && a>=0)
            dPoints['PCs']=parseInt(a);
        if(!isNaN(b) && b>=0)
            dPoints['PCt']=parseInt(b);

        fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
            if(err) console.error(err);
        });
        this.show(bot,message,dPoints);
    },


    setgm: function(bot,message,a,b){
        var dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));

        if(!isNaN(a) && a>=0)
            dPoints['GMs']=parseInt(a);
        if(!isNaN(b) && b>=0)
            dPoints['GMt']=parseInt(b);

        fs.writeFile('storage/dPoints.json', JSON.stringify(dPoints), (err) => {
            if(err) console.error(err);
        });
        this.show(bot,message,dPoints);
    },

    help: function(bot,message){

        exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('DestinyBot Help')
        .setURL()
        .setAuthor('Uruael')
        .setDescription()
        .setThumbnail()
        .addField('!fate roll', 'Roll for tokens', true)
        .addField('!fate flip', 'Flip a token', true)
        .addField('!fate show', 'Show tokens', true)
        .addField('!fate reset', 'Reset tokens', true)
        .addField('!fate setpc [X] [Y]', 'Alter an number of PC\'s tokens', true)
        .addField('!fate setgm [X] [Y]', 'Alter an number of GM\'s tokens', true)
        .setImage()
        .setTimestamp()
        .setFooter();
        message.reply(exampleEmbed)
    },

    show: function(bot,message,dPoints=false){

        if(!dPoints)
        dPoints = JSON.parse(fs.readFileSync('storage/dPoints.json', 'utf8'));

        var mess='';
        if(dPoints){
            for(var val in dPoints){
                for(var i=0; i<dPoints[val];i++){
                    if(val=='GMs'){
                        mess+=bot.emojis.cache.get('703564809139912774').toString();
                    }
                    else if(val=='GMt'){
                        mess+=bot.emojis.cache.get('703564043629232228').toString();
                    }
                    else if(val=='PCs'){
                        mess+=bot.emojis.cache.get('703564819516883028').toString();
                    }
                    else{
                        mess+=bot.emojis.cache.get('703564109509296138').toString();
                    }
                }
            }
        }

        if(mess!='')
            message.channel.send(mess);

        message.reply('GM: '+dPoints['GMs']+'('+dPoints['GMt']+')'+' PC: '+dPoints['PCs']+'('+dPoints['PCt']+')'); 
    },

    unknownCommand: function(bot,message){
        message.reply("Unknown command");
    }

}