const {Client} = require("discord.js")
const mongoose = require("mongoose")

module.exports = {
    name: "ready",
    once: true,
  async execute(client) {
        console.log(`[+] ${client.user.username} ismiyle giriş yaptı. `)
    
    }
}