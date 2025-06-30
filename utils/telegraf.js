import { Telegraf , Markup} from "telegraf";
import axios from 'axios';
import 'dotenv/config.js';

const { BOT_TOKEN, URL_STATUS }  = process.env

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
    try{
        getMainMenu(ctx);
    }
    catch(error){
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🌎 STATUS', async (ctx) => {
    try {
        const response = await axios.get(URL_STATUS,{
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
    try{
        ctx.reply(
            '🔥Bloqueo manual de emergencia🚒',
            Markup.keyboard([
                ['🔒 BloquearBotsTW'],
                ['🔓 DesbloquearBotsTW'],
                ['🔙 REGRESAR']
            ])
        );
    }
    catch(error){
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🔒 BloquearBotsTW', async (ctx) => {
    try {
        const response = await axios.get(`${URL_STATUS}/api/bloquear`,{
            timeout: 5000 // 5 segundos
        });
        const data = response.data;
        const result = data.result;
        ctx.reply(result,getMainMenu(ctx));
    } catch (error) {
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🔓 DesbloquearBotsTW', async (ctx) => {
    try {
        const response = await axios.get(`${URL_STATUS}/api/desbloquear`,{
            timeout: 5000 // 5 segundos
        });
        const data = response.data;
        const result = data.result;
        ctx.reply(result,getMainMenu(ctx));
    } catch (error) {
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.hears('🔙 REGRESAR', (ctx) => {
    try{
        getMainMenu(ctx);
    }
    catch(error){
        const mensajeError = error.response?.data?.error;
        ctx.reply(mensajeError ? mensajeError : `Ocurrio un error`);
    }
});

bot.launch()

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log('Bot iniciado. Envía /start a tu bot de Telegram.');

