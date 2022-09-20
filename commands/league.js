const { SlashCommandBuilder } = require('discord.js');
const { GetSchedule } = require('../lib/getschedule');
const { getLeagueEmbeds } = require('../embeds/league');
const { league } = require('../db/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('league')
        .setDescription('sends info for the current and upcoming league battles'),
    async execute(interaction) {
        await interaction.reply('command currently wip');

        /*
        const response = await GetSchedule('32449507786579989234');

        const embeds = getLeagueEmbeds(response, 5);

        interaction.deferReply();
        interaction.deleteReply();
        await interaction.guild.channels.cache.get(league).send({ embeds: embeds[0] });
        /*  .then(msg => {
                setTimeout(() => {
                    msg.delete();
                    interaction.guild.channels.cache.get(stages).send('refreshing');
                }, 10000);
            }).catch(err => console.log(err))*/

    },
};