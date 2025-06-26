import { Router } from "express";
import { bot } from '../utils/telegraf.js'
import 'dotenv/config.js';

const { ID_CHAT_SUPERGRUOP, ID_CHAT_LOGGER }  = process.env

export const loggerHandler = Router()

loggerHandler.get('/', (req,res)=>{
    const { endpoint, loggerLocation, loggerMessage, symbol} = req.query;
    const date = new Date();
    const message = `ENDPOINT:\n /${endpoint}\nMONEDA:\n ${symbol}\nUBICACION:\n ${loggerLocation}\nMENSAJE:\n ${loggerMessage}\nFECHA:\n ${date}`;
    bot.telegram.sendMessage(ID_CHAT_SUPERGRUOP,message,{message_thread_id:ID_CHAT_LOGGER})
    res.status(200).send();
})