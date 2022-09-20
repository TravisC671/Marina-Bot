const { SlashCommandBuilder } = require('discord.js');
const { GetSchedule } = require('../lib/getschedule');
const { getStageEmbeds } = require('../embeds/stages');
const { stages } = require('../db/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stages')
        .setDescription('sends info for the current regular, ranked, and league battles'),
    async execute(interaction) {
        await interaction.reply('command currently wip');
        /*
        const response = await GetSchedule('32449507786579989234');
        if (response.code === 'AUTHENTICATION_ERROR') {
            console.log('re-authenticating');
        }
        const embeds = getStageEmbeds(response);

        interaction.deferReply();
        interaction.deleteReply();
        await interaction.guild.channels.cache.get(stages).send({ embeds: embeds });
        /*  .then(msg => {
                setTimeout(() => {
                    msg.delete();
                    interaction.guild.channels.cache.get(stages).send('refreshing');
                }, 10000);
            }).catch(err => console.log(err))*/
        
    },
};