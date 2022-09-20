const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const { getTurfEmbeds } = require('./embeds/turf');
const { getRankedEmbeds } = require('./embeds/ranked');
const { getLeagueEmbeds } = require('./embeds/league');
const { getStageEmbeds } = require('./embeds/stages');
const { GetSchedule } = require('./lib/getschedule');
const { turf, ranked, league, stages } = require('./db/channels.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const StormDB = require('stormdb');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});
// seconds = minutes = hours
const refreshTime = (1000 * 60 * 60) / 2 ;
/*
setInterval(async () => {
    const response = await GetSchedule('32449507786579989234');
    
    
    const stageEmbeds = getStageEmbeds(response);
    client.channels.cache.get(stages).send({ embeds: stageEmbeds })
    .then(msg => {
        setTimeout(() => {
            msg.delete();
            client.channels.cache.get(stages).send('refreshing').then(refreshingMsg => { refreshingMsg.delete();});
        }, refreshTime);
    }).catch(err => console.log(err));
    
    const turfEmbeds = getTurfEmbeds(response, 5);
    client.channels.cache.get(turf).send({ embeds: turfEmbeds[0] })
    .then(msg => {
        setTimeout(() => {
            msg.delete();
            client.channels.cache.get(turf).send('refreshing').then(refreshingMsg => { refreshingMsg.delete();});
        }, refreshTime);
    }).catch(err => console.log(err));
    
    const rankedEmbeds = getRankedEmbeds(response, 5);
    client.channels.cache.get(ranked).send({ embeds: rankedEmbeds[0] })
    .then(msg => {
        setTimeout(() => {
            msg.delete();
            client.channels.cache.get(ranked).send('refreshing').then(refreshingMsg => { refreshingMsg.delete();});
        }, refreshTime);
    }).catch(err => console.log(err));
    
    const leagueEmbeds = getLeagueEmbeds(response, 5);
    client.channels.cache.get(league).send({ embeds: leagueEmbeds[0] })
        .then(msg => {
            setTimeout(() => {
                msg.delete();
                client.channels.cache.get(league).send('refreshing').then(refreshingMsg => { refreshingMsg.delete();});
            }, refreshTime);
        }).catch(err => console.log(err));
}, refreshTime);*/

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) { return; }
    const engine = new StormDB.localFileEngine('./db/reactions.stormdb');
    const db = new StormDB(engine);

    db.default({ messages: [] });

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }
    let emoji;
    if (reaction.emoji.id === null) {
        emoji = reaction.emoji.name;
    } else {
        emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
    }

    const message = db.get('messages').value();
    message.forEach((element, index) => {
        if (element.messageid === reaction.message.id && element.emoji === emoji) {
            const role = reaction.message.guild.roles.cache.find(r => r.id === element.role);
            console.log(`gave ${user.username} the ${role.name} role`);
            const guildMember = reaction.message.guild.members.cache.get(user.id);
            guildMember.roles.add(role);
        }
    });
});
/*

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) { return; }
    const engine = new StormDB.localFileEngine('./db/reactions.stormdb');
    const db = new StormDB(engine);

    db.default({ messages: [] });

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }
    let emoji;
    if (reaction.emoji.id === null) {
        emoji = reaction.emoji.name;
    } else {
        emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
    }

    const message = db.get('messages').value();
    message.forEach((element, index) => {
        if (element.messageid === reaction.message.id && element.emoji === emoji) {
            const role = reaction.message.guild.roles.cache.find(r => r.id === element.role);
            console.log(`removed the ${role.name} role from ${user.username}`);
            const guildMember = reaction.message.guild.members.cache.get(user.id);
            guildMember.roles.remove(role);
        }
    });
});*/


client.on('raw', async event => {
    if (event.t !== 'MESSAGE_REACTION_REMOVE') { return; }
    
    const user = await client.users.fetch(event.d.user_id);
    
    if (user.bot) {return;}
    
    const guild = client.guilds.cache.get(event.d.guild_id);
    
    
    const engine = new StormDB.localFileEngine('./db/reactions.stormdb');
    const db = new StormDB(engine);
    
    db.default({ messages: [] });
    
    let emoji;
    if (event.d.emoji.id === null) {
        emoji = event.d.emoji.name;
    } else {
        emoji = `<:${event.d.emoji.name}:${event.d.emoji.id}>`;
    }
    
    const message = db.get('messages').value();
    message.forEach(async (element, index) => {
        if (element.messageid === event.d.message_id && element.emoji === emoji) {
            
            const role = guild.roles.cache.find(r => r.id === element.role);
            
            await guild.members.fetch();
            
            const guildMember = guild.members.cache.find(u => u.id === user.id);
            guildMember.roles.remove(role);

            console.log(`removed the ${role.name} role from ${user.username}`);
        }
    });
});


client.login(process.DISCORD_TOKEN);