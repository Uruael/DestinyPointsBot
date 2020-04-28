exports.run= (bot,message,args,tools) =>{
    if(args[0]=='fate'){
        switch(args[1]){
            case 'roll':
                if(message.member.roles.cache.has('694209756520382534')){//0GM 1PC
                    tools.myfate(bot,0,message);
                }
                else{
                    tools.myfate(bot,1,message);
                }
                break;
            case 'flip':
                if(message.member.roles.cache.has('694209756520382534')){
                    tools.flip(bot,0,message);
                }
                else{
                    tools.flip(bot,1,message);
                }
                break;
            case 'show':
                tools.show(bot,message);
                break;
            case 'reset':
                tools.reset(bot,message);
                break;
            case 'setpc':
                tools.setpc(bot,message,args[2], args[3]);
                break;
            case 'setgm':
                tools.setgm(bot,message,args[2],args[3]);
                break;
            case 'help':
                tools.help(bot,message);
                break;
            }
    }
    
 //694209756520382534   

}
