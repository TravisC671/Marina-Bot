const { EmbedBuilder } = require('discord.js');

function getStageEmbeds(data) {

    const turfWar = data.regular[0];
    const ranked = data.gachi[0];
    const league = data.league[0];

    let startTime = new Date(turfWar.start_time * 1000).getHours();
    let startHalf;
    if (startTime < 12) {
        startHalf = 'am';
    } else {
        startTime -= 12;
        startHalf = 'pm';
    }
    let endTime = new Date(turfWar.end_time * 1000).getHours();
    let endHalf;
    if (endTime < 12) {
        endHalf = 'am';
    } else {
        endTime -= 12;
        endHalf = 'pm';
    }

    const turfEmbed = new EmbedBuilder()
        .setColor(0x19D719)
        .setTitle('Turf War')
        .setDescription(`${startTime}:00${startHalf} - ${endTime}:00${endHalf}`)
        .addFields({ name: turfWar.stage_a.name, value: '​', inline: true })
        .addFields({ name: turfWar.stage_b.name, value: '​', inline: true });
    const rankedEmbed = new EmbedBuilder()
        .setColor(0xF54910)
        .setTitle(`Ranked Battle: ${ranked.rule.name}`)
        .setDescription(`${startTime}:00${startHalf} - ${endTime}:00${endHalf}`)
        .addFields({ name: ranked.stage_a.name, value: '​', inline: true })
        .addFields({ name: ranked.stage_b.name, value: '​', inline: true });
    const leagueEmbed = new EmbedBuilder()
        .setColor(0xF02D7D)
        .setTitle(`Ranked Battle: ${league.rule.name}`)
        .setDescription(`${startTime}:00${startHalf} - ${endTime}:00${endHalf}`)
        .addFields({ name: league.stage_a.name, value: '​', inline: true })
        .addFields({ name: league.stage_b.name, value: '​', inline: true });
    
    return [turfEmbed, rankedEmbed, leagueEmbed];
}

module.exports = { getStageEmbeds };