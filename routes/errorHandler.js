import { Router } from "express";
import { bot } from '../utils/telegraf.js'
import 'dotenv/config.js';

const { ID_CHAT_SUPERGRUOP, ID_CHAT_ERROR }  = process.env

export const errorHandler = Router()

errorHandler.get('/', (req,res)=>{
    const { endpoint, errorLocation, errorCode='', errorMessage } = req.query;
    const date = new Date();
    const message = `CODIGO DE ERROR:\n${errorCode}\nENDPOINT:\n/${endpoint}\nMENSAJE DE ERROR:\n${errorMessage}\nUBICACION DEL ERROR:\n${errorLocation}\nFECHA:\n ${date}`;
    bot.telegram.sendMessage(ID_CHAT_SUPERGRUOP,message,{message_thread_id:ID_CHAT_ERROR})
    res.status(200).send();
})