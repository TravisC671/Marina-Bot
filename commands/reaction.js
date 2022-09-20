const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { messages } = require('../db/reactionMessages.json');
const StormDB = require('stormdb');
const engine = new StormDB.localFileEngine('./db/reactions.stormdb');
const db = new StormDB(engine);

db.default({ messages: [] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction')
        .setDescription('allows you to set up messages with reaction roles. MUST BE USED IN CHANNEL OF MESSAGE')
        .addStringOption(option =>
            option.setName('operation')
                .setDescription('add or remove the reaction')
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'add' },
                    { name: 'remove', value: 'remove' },
                ))
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('set the emoji you want the bot to react to')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('id of the role that you want the reaction to give you')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('the message ID to the message you want the bot to react to')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            if (interaction.options.getString('operation') === 'add') {
                const messageid = interaction.options.getString('messageid');
                const emoji = interaction.options.getString('emoji');
                const role = interaction.options.getRole('role');

                const msg = await interaction.channel.messages.fetch(messageid);
                msg.react(emoji);


                const message = db.get('messages').value();
                let duplicate = false;
                message.forEach(element => {
                    if (element.messageid === messageid && element.emoji === emoji) {
                        console.log('duplicate');
                        duplicate = true;
                    }
                });
                if (!duplicate) {
                    db.get('messages').push({ messageid: messageid, emoji: emoji, role: role.id }).save();
                    await interaction.reply({ content: `set ${emoji} to give the <@&${role.id}> role`, ephemeral: true });
                }
            } else {
                //! later
                /*
                const messageid = interaction.options.getString('messageid');
                const emoji = interaction.options.getString('emoji');
                const role = interaction.options.getRole('role');

                const msg = await interaction.channel.messages.fetch(messageid);
                /*msg.reactions.cache.get(emoji).remove()
                    .catch(error => console.error('Failed to remove reactions:', error));
                //HELP console.log(msg.reactions.resolve(emoji).users.fetch());
                let message = db.get('messages').value();
                message.forEach((element, index) => {
                    if (element.messageid === messageid && element.emoji === emoji) {
                        console.log('duplicate');
                        db.get('messages').get(index).delete();
                    }
                });

                message = message.filter(el => el !== null);
                db.get('messages').set(message);*/
                await interaction.reply({ content: 'wip', ephemeral: true });
            }
        } catch (err) {
            console.log(err);
            await interaction.reply({ content: 'there was an error execting that command', ephemeral: true });
        }

    },
};