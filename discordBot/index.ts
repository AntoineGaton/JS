import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from 'wokcommands';
import path from 'path';

dotenv.config();

const client = new DiscordJS.Client({
    // version 13 of discord requires intents. 
    // intents are a way to tell discord what our bot does and needs.
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

//listening for slash commands
client.on('ready', () => {
    console.log('The bot is ready!');

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true
    })

    //there are two types of slash commands.
    //guild: registered instantly. use this when testing.
    //global: takes time to register. use this for final product.
    const guildID = '################################';
    const guild = client.guilds.cache.get(guildID);
    let commands;
    
    if (guild){
        commands = guild.commands;
    } else{
        commands = client.application?.commands;
    }

    commands?.create({
        name: "ding",
        description: "Replies with dong."
    })

    commands?.create({
        name: "add",
        description: "Adds two numbers.",
        options: [
            {
                name: "num1",
                description: "The first number.",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: "num2",
                description: "The second number.",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
})

//responding to slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()){
        return
    }
    const { commandName, options } = interaction;

    if (commandName === "ding"){
        interaction.reply({
            content: "dong",
            ephemeral: true // only the user can see the reply
        })
    } else if (commandName === "add"){
        const num1 = options.getNumber('num1')!;
        const num2 = options.getNumber('num2')!;
        const sum = num1 + num2;

        await interaction.deferReply({
            ephemeral: true
        })

        await new Promise((resolve) => setTimeout(resolve,5000))

        interaction.editReply({
            content: `The sum of ${num1} and ${num2} is ${sum}!`
        })
    }
})

//responding to messages
client.on('messageCreate', (message) => {
    if(message.content === "hello") {
        message.reply({
            content: "Hi! Welcome to Antoine's server. I am Antoine's first discord bot."
        })
    }
})
client.login(process.env.TOKEN);