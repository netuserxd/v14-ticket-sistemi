const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder } = require("discord.js");
const just = require("croxydb")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket sistemini kurar")
    .addChannelOption((option) => 
      option.setName("kanal")
      .setDescription("Kanal Seçiniz")
      .setRequired(true)
    ),

  async execute(interaction) {

    const channel = interaction.options.getChannel("kanal");


    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp({content: "> Sistemi kurmak için **Administrator** yetkisine ihtiyacın var.", ephemeral: true})

   const guild = interaction.guild;

   await interaction.deferReply({ephemeral: true});

   if(just.get(`ticketSystem_${guild.id}`)) {
   return interaction.editReply({content: `> **Ticket sistemi zaten kurulu.\n> ${channel} Kanalına kurulu.**`, ephemeral: true})
  }

   const row1 = new ActionRowBuilder()
   .addComponents(
    new ButtonBuilder()
        .setLabel('Mesajı Gönder')
        .setEmoji("✏️")
        .setStyle(3)
        .setCustomId("kur")
   ) 

    const embed = new EmbedBuilder()
    .setAuthor({name: guild.name, iconURL: guild.iconURL({ dynamic: true })})
    .setDescription(`> **Sistem başarılı birşekilde olarak ${channel} kanalına ayarlandı**`)
    .setColor("Green")
    .setFooter({text: "Sistemi sıfırlamak için /ticket-sıfırla komudunu kullanınız"})

    interaction.followUp({embeds: [embed], components: [row1], ephemeral: true})
    just.set(`ticketSystem_${interaction.guild.id}`, { channel: channel.id})
    }
  }