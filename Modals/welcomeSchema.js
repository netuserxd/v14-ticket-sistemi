const { Schema, model } = require("mongoose");

const welcome = Schema({
    Guild: String,
    Channel: String,
    Msg: String,
  });

  module.exports = model("welcome", welcome); 