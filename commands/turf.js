const { SlashCommandBuilder } = require('discord.js');
const { GetSchedule } = require('../lib/getschedule');
const { getTurfEmbeds } = require('../embeds/turf');
const { turf } = require('../db/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('turf')
        .setDescription('sends info for the current and upcoming turf battles'),
    async execute(interaction) {
        await interaction.reply('command currently wip');
        /*

        const response = await GetSchedule('32449507786579989234');

        const embeds = getTurfEmbeds(response, 5);

        interaction.deferReply();
        interaction.deleteReply();
        await interaction.guild.channels.cache.get(turf).send({ embeds: embeds[0] });
        /*  .then(msg => {
                setTimeout(() => {
                    msg.delete();
                    interaction.guild.channels.cache.get(stages).send('refreshing');
                }, 10000);
            }).catch(err => console.log(err))*/

    },
};