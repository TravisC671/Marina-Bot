const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('creates an embed')
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
        //console.log(interaction.options.getString('title'));
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
            interaction.deferReply();
            interaction.deleteReply();
            await interaction.channel.send({ embeds: [embed] });
        } catch {
            await interaction.reply({ content: 'there whas an error execting that command', ephemeral: true });
        }

    },
};