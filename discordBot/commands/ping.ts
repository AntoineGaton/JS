import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Resplies with success.",

    callback: ({message}) => {
        message.reply("Pong");
    }
} as ICommand