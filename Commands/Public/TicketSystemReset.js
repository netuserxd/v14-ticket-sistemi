const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder } = require("discord.js");
const just = require("croxydb")


module.exports = {
    data: new SlashCommandBuilder()
      .setName("ticket-sıfırla")
      .setDescription("Ticket sistemini sıfırlar"),
  
    async execute(interaction) {
  

    const ayarla = just.get(`ticketSystem_${interaction.guild.id}`)

    const sistem_ayarlı_değil = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
            .setDescription("`❌` | **Ticket sistemi ayarlı değil.**")
            .setFooter({text: "Sistemi açmak için /ticket yazmanız yeterli."})

        if (!ayarla) return interaction.reply({ embeds: [sistem_ayarlı_değil], ephemeral: true })

    const { user, customId, guild } = interaction;

    const embed = new EmbedBuilder()
    .setAuthor({name: `Başarılı ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
    .setDescription("`✅` | **Ticket sistemi başarıyla sıfırlandı**")
    .setFooter({text: "Sistemi tekrar kurmak için /ticket yazmanız yeterli."})

    interaction.reply({embeds: [embed]})

    just.delete(`ticketCatagory_${interaction.guild.id}`)
    just.delete(`ticketSystem_${interaction.guild.id}`)
  }
}