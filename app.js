import express, { json } from 'express'
import cors from 'cors'
import { signalHandler } from './routes/signalHandler.js'
import { errorHandler } from './routes/errorHandler.js'
import { loggerHandler } from './routes/loggerHandler.js'
import { errorRoutes } from './routes/error.js'

export function createAPP({string}){
    const server = express();
    server.use(json())
    server.use(cors())

    server.use('/signal',signalHandler);
    server.use('/error',errorHandler);
    server.use('/logger',loggerHandler);
    
    server.get('/*',errorRoutes)

    const PORT = process.env.PORT ?? 1236
    server.listen(PORT,()=>{
        console.log(string)
    })
}

createAPP({string:'API-TELEGRAM-BOT FUNCIONANDO'})
