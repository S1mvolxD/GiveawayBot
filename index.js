const { AoiClient } = require("aoi.js");

const client = new AoiClient({
  token: "MTE2MzYzNDYyOTg0OTQwMzM5Mg.GBb9cT.-KEYOfwM_pfjkfjMO8ZSM1WYCj2WxrOfuKPlV0",
  prefix: "g!",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue",
    },
  },
});

client.loadCommands("./commands/", true);

require("./handler/variables.js")(client);

client.command({
    name: "up",
    code: `
    $updatecommands
    команды обновились!`
})

client.command({
  name: "eval",
  code: `
  $eval[$message]`
})