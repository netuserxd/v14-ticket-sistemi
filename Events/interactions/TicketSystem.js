const { CommandInteraction } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require("discord.js")
const just = require("croxydb")

module.exports = {
    name: "interactionCreate",

   async execute(interaction, client) {

        const guild = interaction.guild;

        if(interaction.customId === "kur") {

            await interaction.deferReply({ephemeral: true});

            interaction.followUp({content: "> **Sistem mesajı gönderildi**", ephemeral: true})
            
            //const channels = interaction.channels.cache.get(just.get(`ticketSystem_${interaction.guild.id}`))
            //if(!channels);

            const ticket = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setEmoji("🎫")
                .setLabel("Ticket Oluştur")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("ticket")
            )

            const embed = new EmbedBuilder()
            .setAuthor({name: "Ticket Sistemi", iconURL: guild.iconURL({ dynamic: true })})
            .setDescription("> **Ticket Açmak için lütfen aşağıdaki** `Ticket Oluştur` **Butonuna basınız.**")
            .setFooter({text: `${interaction.user.username} Sistemi kuran`, iconURL: interaction.user.avatarURL({ dynamic: true })})
            .setColor("Blue")

        interaction.channel.send({embeds: [embed], components: [ticket]})

        const category = await guild.channels.create({
            name: 'Ticket Log',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });

          just.set(`ticketCatagory_${interaction.guild.id}`, { catagory: category.id})
        }
        if(interaction.customId === "ticket") {
            interaction.reply({content: "> **Ticket kanalı açıldı**", ephemeral: true})
         const catagory = just.fetch(`ticketCatagory_${interaction.guild.id}`)
            const ticketMember = just.fetch(`ticketMember_${interaction.guild.id}`)

         if(ticketMember){
            const channelURL = `https://discord.com/channels/${ticketMember.guildId}/${ticketMember.channelId} `
      return interaction.reply({ content: `**Zaten mevcut olan bir destek talebinizi [destek kanalı](${channelURL}) oluşturmuşssun.**`, ephemeral: true })
         }
         

            const channel = await guild.channels.create({
                name: `ticket-${interaction.user.tag}`,
                type: ChannelType.GuildText,
                parent: catagory.catagory,
                permissionOverwrites: [
                  {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                  },
                   {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                  },
                ],
              });

              const row = new ActionRowBuilder()
              .addComponents(
               new ButtonBuilder()
                   .setLabel('Ticket Kapat')
                   .setEmoji("❌")
                   .setStyle(4)
                   .setCustomId("kapat")
              ) 

              const embed = new EmbedBuilder()
              .setAuthor({name: "Ticket Sistemi", iconURL: guild.iconURL({ dynamica: true })})
              .setDescription(`> **Ticket açtığınız için teşekkür ederiz size en güzel hizmet sunmak için yardımcı olmaya hazırız.**`)
              .setColor("Blue")
              .setFooter({text: "JustNightt | Ticket sistemi"})

              channel.send({embeds: [embed], content: `> <@${interaction.user.id}> **Sorunuzu belirtiniz yetkililer en kısa sorununla ilgilenicektir.**`, components: [row]})
              just.set(`ticketMember_${interaction.guild.id}`, { channelId: channel.id, guildId: guild.id})

        }
        if(interaction.customId === "kapat") {
        
            interaction.channel.delete()

            just.delete(`ticketMember_${interaction.guild.id}`)
        }
    }
}