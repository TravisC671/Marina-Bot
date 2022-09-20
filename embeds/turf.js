const { EmbedBuilder } = require('discord.js');

function getTurfEmbeds(data, amount) {
    const turfWar = data.regular;

    const embeds = [];
    for (let i = 0; i < amount; i++) {
        let startTime = new Date(turfWar[i].start_time * 1000).getHours();
        let startHalf;
        if (startTime < 12) {
            startHalf = 'am';
        } else {
            startTime -= 12;
            startHalf = 'pm';
        }
        let endTime = new Date(turfWar[i].end_time * 1000).getHours();
        let endHalf;
        if (endTime < 12) {
            endHalf = 'am';
        } else {
            endTime -= 12;
            endHalf = 'pm';
        }
        const turfEmbed = new EmbedBuilder()
            .setColor(`${hslToHex(120, 79, 47 - ((47 / amount) * (i / 2)))}`)
            .setTitle('Turf War')
            .setDescription(`${startTime}:00${startHalf} - ${endTime}:00${endHalf}`)
            .addFields({ name: turfWar[i].stage_a.name, value: '​', inline: true })
            .addFields({ name: turfWar[i].stage_b.name, value: '​', inline: true });
        embeds.push(turfEmbed);
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

module.exports = { getTurfEmbeds };