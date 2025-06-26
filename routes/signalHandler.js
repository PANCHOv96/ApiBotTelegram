import { Router } from "express";
import { bot } from '../utils/telegraf.js'
import 'dotenv/config.js';

const { ID_CHAT_SUPERGRUOP, ID_CHAT_SIGNAL }  = process.env

export const signalHandler = Router()

signalHandler.get('/', (req,res)=>{
    const { nameContract, symbol, stopPrice, priceLimit, side, leverage } = req.query;
    const emoji = (side == 'BUY') ? ['🟢','📈']: ['🔴','📉'];
    const message = `== Moneda ==
🌟 💵 ${symbol}
== Señal ==
${emoji[0]} « ${side} » ${emoji[1]}
PE => MARKET
SL => ${stopPrice}
TP => ${priceLimit}
== Contrato ==
🧾 ${nameContract}
== Apalancamiento ==
x${leverage}`;
    bot.telegram.sendMessage(ID_CHAT_SUPERGRUOP,message,{message_thread_id:ID_CHAT_SIGNAL})
    res.status(200).send();
})