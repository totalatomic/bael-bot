const commando = require("@iceprod/discord.js-commando");
const gatchaInsertSchema = require("../../schemas/gatchaInsert-schema");
const GotchaInsertSchema = require('../../schemas/gatchaInsert-schema');

module.exports = class updateval extends commando.Command {
  constructor(client) {
    super(client, {
      name: "updateval",
      memberName: "updateval",
      group: "gacha",
      description: "description",
      ownerOnly: true
    });
  }
  async run(msg, { args }) {
    try {
      await gatchaInsertSchema.aggregate([
        {$set: { weight: {$multiply:[{$rand: {}}, 10]}}},
        {$set: { weight: {$floor: "$weight"}}},
        {$merge: "gatchaoptions"}
      ])
    } catch (error) {
      console.log(error)
    }
  }

};