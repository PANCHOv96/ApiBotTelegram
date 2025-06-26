import { Telegraf , Markup} from "telegraf";
import axios from 'axios';
import 'dotenv/config.js';

const { BOT_TOKEN, URL_STATUS }  = process.env

const setURL = (url) => {
    return url 
}

const getURL = setURL(URL_STATUS)

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
        const response = await axios.get(getURL,{
            timeout: 5000 // 5 segundos
        });
        const data = response.data;
        const status = data.status;
        const dev = URL_STATUS.includes('localhost')
        ctx.reply(`${status} ${dev?'-DEV':''}`);
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

