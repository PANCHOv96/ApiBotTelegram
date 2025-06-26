import { Telegraf , Markup} from "telegraf";
import axios from 'axios';
import 'dotenv/config.js';

const { BOT_TOKEN }  = process.env

const setURL = (url) => {
    return url 
}
const getURL = setURL('http://localhost:1235')

function getMainMenu(ctx) {
    return ctx.reply(
        '📚 Menú Principal:',
        Markup.keyboard([
            ['🌎 STATUS'],
            ['⚙️ Configuración']
        ])
        .resize()
    );
}

export const bot = new Telegraf(BOT_TOKEN)
// Comando /menu (para mostrar el teclado nuevamente)
bot.command(['menu','menú','start'], (ctx) => {
    getMainMenu(ctx);
});

bot.hears('🌎 STATUS', async (ctx) => {
    try {
        const response = await axios.get(getURL);
        const data = response.data;
        const status = data.status;
        ctx.reply(status);
    } catch (error) {
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('⚙️ Configuración', (ctx) => {
    ctx.reply(
        '🔥Bloqueo manual de emergencia🚒',
        Markup.keyboard([
            ['🔒 BloquearBotsTW'],
            ['🔓 DesbloquearBotsTW'],
            ['🔙 REGRESAR']
        ])
    );
});

bot.hears('🔒 BloquearBotsTW', async (ctx) => {
    try {
        const response = await axios.get(`${getURL}/api/bloquear`);
        const data = response.data;
        const result = data.result;
        ctx.reply(result);
    } catch (error) {
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🔓 DesbloquearBotsTW', async (ctx) => {
    try {
        const response = await axios.get(`${getURL}/api/desbloquear`);
        const data = response.data;
        const result = data.result;
        ctx.reply(result);
    } catch (error) {
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🔙 REGRESAR', (ctx) => {
    getMainMenu(ctx);
});

bot.launch()

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log('Bot iniciado. Envía /start a tu bot de Telegram.');

