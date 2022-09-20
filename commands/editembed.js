const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editembed')
        .setDescription('creates an embed')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('the message ID to the message you want the bot to react to')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('use a hex code to set the color')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('set the title of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('set the description, use ; to make a new line')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('set the image. OPTIONAL')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const messageid = interaction.options.getString('messageid');
        const msg = await interaction.channel.messages.fetch(messageid);
        //Maybe make it dynamic but idk
        if (msg.author.id !== '1013542212463775784') {return;}
        const rawdescription = interaction.options.getString('description');

        try {
            const splitDescription = rawdescription.split(';');
            const image = interaction.options.getString('image');
            let description = '';
            for (let line = 0; line < splitDescription.length; line++) {
                description += splitDescription[line] + '\n';
            }

            const embed = new EmbedBuilder()
                .setColor(interaction.options.getString('color'))
                .setTitle(interaction.options.getString('title'))
                .setDescription(description);

            if (image !== null) {
                embed.setImage(image);
            }
            msg.edit({ embeds: [embed] }).then(interaction.reply({ content: 'edited the message', ephemeral: true }));
        } catch {
            await interaction.reply({ content: 'there whas an error execting that command', ephemeral: true });
        }

    },
};