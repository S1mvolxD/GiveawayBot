const { REST, Routes } = require('discord.js');
const { Functions } = require('./Functions.js');
const { readdirSync, statSync } = require('node:fs');
const { join } = require('node:path');

exports.Handlers = async (client) => {
    loadAntiCrash();
    /*Object.entries(require('./variables.js')).forEach(([table, variable]) => {
        client.variables(variable, table);
    });*/

    new Functions(client, join(__dirname, 'functions'), false);
    client.os = require('os');
    client.status(...require('./statuses.js'));
    client.on('interactionCreate', interaction => require('./interaction.js')(interaction, client));

    if (true) return;
    client.body = [];
    loadCommands(client);
    registerCommands(client);
};

function loadAntiCrash() {
    if (true) return;
    process.on('unhandledRejection', (reason, promise) => {
        console.error(`[${'ERROR'}] :: Unhandled Rejection at:`, promise, `reason:`, reason);
    });

    process.on('uncaughtException', err => {
        console.error(`[${'ERROR'}] :: Uncaught Exception:`, err);
    });
}

function loadCommands(client, basePath = join(process.cwd(), 'commands')) {
    const files = readdirSync(basePath);

    files.forEach(file => {
        if (file === 'owner' || file === 'events') return;

        const filePath = join(basePath, file);

        if (statSync(filePath).isDirectory()) {
            loadCommands(client, filePath);
        } else {
            let cmd = require(filePath);
            if (Array.isArray(cmd)) cmd = cmd[0];
            if (cmd.type || !cmd.name || !cmd.description) return;

            client.body.push({
                name: cmd.name,
                description: cmd.description || 'No description provided',
                type: 1,
                options: cmd.options || []
            });
        }
    });
}

function registerCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: client.body
    });

    delete client.body;
}
