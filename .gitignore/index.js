//Début
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();

var PREFIX = "z."

const warns = JSON.parse(fs.readFileSync('./warns.json'))

client.on('ready', () => {
    console.log(`Prêt a travailler chef !`);
  });

  client.on('message', message => {

    if (message.content === PREFIX + "help"){

        const embed = new Discord.RichEmbed();

        let help_embed = new Discord.RichEmbed()

            .setTitle("**Vous avez besoin d'aide ?**")
            .setColor('0C00FF')
            .setDescription("**Va voir voir dans le salon【☣】help pour demander de l'aide**")
            .addBlankField()
            .addField("**Quelqu'un ne respecte pas les règles ?**", "**Signale dans le salon【⛔】report**")
            .addBlankField()
            .setFooter("By Zamasu - Zamasu")
        message.channel.send(help_embed)

        console.log("Le bot répond !")
    }
});

client.on('ready', () => {
    console.log(`Prêt a travailler chef !`);
  });

  client.on('message', message => {

    if (message.content === PREFIX + "command"){

        const embed = new Discord.RichEmbed();

        let help_embed = new Discord.RichEmbed()

            .setTitle("**Voici les commandes qui ont été crée pour la communauté**")
            .setColor('0C00FF')
            .setDescription("z.help")
            .addBlankField()
            .addField("**Voici les commandes qui ont été crées pour le staff**")
            .setDescription("z.ban")
            .addBlankField()
            .setFooter("By Zamasu - Zamasu")
        message.channel.send(help_embed)

        console.log("Le bot répond !")
    }
});

/*Kick*/
client.on('message', message => {

    if(!message.guild) return

    let args = message.content.trim().split(/ +/g);


    if (args[0].toLocaleLowerCase() === PREFIX + "kick"){
        if(!message.member.hasPermissions('KICK_MEMBERS')) return message.channel.send("**Vous n'avez pas les permissions nécéssaires pour utiliser cette commande :x:**");

        let member = message.mentions.members.first()

        if(!member) return message.channel.send("**Veuillez mentionner un utilisateur :mag:**");

        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**Vous ne pouvez pas kick cet utilisateur :x:**");

        if(!member.kickable) return message.channel.send(message.mentions.members + "a été exclu du serveur par" + message.author.username);

        member.kick()

        clientDiscord.channels.get('576028063398101033').send(member.user.username);

        message.channel.send(member.user.username + " **a été exclu du serveur :white_check_mark:**");
    }
});

//clear
client.on('message', message => { 

    if(!message.guild) return

    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === PREFIX + "clear") {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas les permissions nécéssaires pour utiliser cette commande :x:**");

        let count = args[1]

        if (!count) return message.channel.send("**Veuillez indiquer le nombre de message à supprimer**");

        if (isNaN(count)) return message.channel.send("**Veuillez indiquer un nombre valide**");

        if (count < 1 || count > 100) return message.channel.send("**Veuillez indiquer un nombre en 1 et 100**");

        message.channel.bulkDelete(parseInt(count) + 1)
    }
});

//ban
client.on('message', message => {

    if(!message.guild) return
    
    let args = message.content.trim().split(/ +/g);

    if(args[0].toLocaleLowerCase() === PREFIX + "ban") {

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**Vous n'avez pas les permissions nécéssaires pour utiliser cette commande :x:**");

        let member = message.mentions.members.first()

        if(!member) return message.channel.send("**Veuillez mentionner un utilisateur :mag:**");

        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**Vous ne pouvez pas bannir cet utilisateur**");

        let reason = args.slice(2).join(' ')

        if (!reason) return message.channel.send("Veuillez indiquer une raison")

        member.ban()

        message.channel.send(member.user.username + "** a été banni du serveur pour ** " + reason + ":white_check_mark: ");
    }
});

//guildadd
client.on('guildMemberAdd', member =>{
    let new_embed = new Discord.RichEmbed()
        .setTitle('**Bienvenue** ' + member.user.username + ' a rejoins ' + member.guild.name)
        .setDescription('**Pour pouvoir accèder au reste du serveur, vous devez valider le règlement en cliquant sur la réaction ci-dessous du règlement.**')
        .addField('**Nous sommes désormais** ' + member.guild.memberCount + " **membres**", "**Objectif : 50 membres**")
        .setFooter('By Zamasu - Zamasu')
        .setColor('04FF00')
    member.guild.channels.get('575815293419388941').send(new_embed)
    member.addRole('575761668001497100')
});

//guildremove
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setTitle('**Aurevoir** ' + member.user.username + '** a quitté le serveur !**')
        .setDescription('**Tu nous manqueras un petit peu**')
        .addField('**Nous sommes désormais** ' + member.guild.memberCount + " **membres**", "**Objectif : 50 membres**")
        .setFooter('By Zamasu - Zamasu')
        .setColor('00C5FF')
    member.guild.channels.get('575824666841841676').send(embed)
});

//warn
client.on('message', message =>{
    if(!message.guild) return 
    let args = message.content.trim().split(/ +/g)

    if(args[0].toLocaleLowerCase() === PREFIX +"warn") {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner un utilisateur')
        if(member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn cet utilisateur")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + ":white_check_mark:")
    }
//infractions 
    if (args[0].toLowerCase() === PREFIX + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('Warn de ' + member.user.username, ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
            .setColor("FF0000")
        message.channel.send(embed)
    }
})

//unmute

client.on('message', message =>{
    if(!message.guild) return 
    let args = message.content.trim().split(/ +/g)
    if (args[0].toLowerCase() === PREFIX + "unmute") {
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("Membre introuvable")
    if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
    if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
    let muterole = message.guild.roles.find(role => role.name === 'Muted')
    if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
    member.addRole('575761473683587083')
    member.addRole('575761668001497100')
    message.channel.send(member + ' a été unmute :white_check_mark:')
    }
});


//unwarn
client.on('message', message =>{
    if(!message.guild) return 
    let args = message.content.trim().split(/ +/g)
if (args[0].toLowerCase() === PREFIX + "unwarn") {
    let member = message.mentions.members.first()
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
    if(!member) return message.channel.send("Membre introuvable")
    if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
    if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unwarn ce membre.")
    if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
    warns[member.id].shift()
    fs.writeFileSync('./warns.json', JSON.stringify(warns))
    message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
}
});

//mute
client.on('message', message =>{
    if(!message.guild) return 
    let args = message.content.trim().split(/ +/g)
    if (args[0].toLowerCase() === PREFIX + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            member.removeRole('575761473683587083')
            member.removeRole('575761668001497100')
            member.removeRole('576018332398911509')
            member.removeRole('576018382474969088')
            member.removeRole('576018461143072768')
            member.removeRole('576018533884887051')
            member.removeRole('575761564796190740')
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})
    
client.login(process.env.TOKEN)
