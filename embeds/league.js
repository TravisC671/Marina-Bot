const { EmbedBuilder } = require('discord.js');

function getLeagueEmbeds(data, amount) {
    const leagueBattle = data.league;

    const embeds = [];
    for (let i = 0; i < amount; i++) {
        let startTime = new Date(leagueBattle[i].start_time * 1000).getHours();
        let startHalf;
        if (startTime < 12) {
            startHalf = 'am';
        } else {
            startTime -= 12;
            startHalf = 'pm';
        }
        let endTime = new Date(leagueBattle[i].end_time * 1000).getHours();
        let endHalf;
        if (endTime < 12) {
            endHalf = 'am';
        } else {
            endTime -= 12;
            endHalf = 'pm';
        }
        const leagueEmbed = new EmbedBuilder()
            .setColor(`${hslToHex(335, 87, 56 - ((47 / amount) * (i / 2)))}`)
            .setTitle(`League Battle: ${leagueBattle[i].rule.name}`)
            .setDescription(`${startTime}:00${startHalf} - ${endTime}:00${endHalf}`)
            .addFields({ name: leagueBattle[i].stage_a.name, value: '​', inline: true })
            .addFields({ name: leagueBattle[i].stage_b.name, value: '​', inline: true });
        embeds.push(leagueEmbed);
    }
    return [embeds.reverse()];

}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
        // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

module.exports = { getLeagueEmbeds };