import express from 'express'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { __dirname } from './utils.js'
import socketProducts from './listener/socketProducts.js'
import socketChat from './listener/socketChat.js'
import connectDB from './config/db.js'
import { appConfig, passportConfig, sessionConfig } from './config/app.config.js'
import { initializeRoutes } from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080


const startServer = async () => {
    try {
        appConfig(app)
        await connectDB()
        sessionConfig(app)
        passportConfig(app)

        initializeRoutes(app)

        const httpServer = app.listen(PORT, console.log(`Server running on: http://localhost:${PORT}`))

        const socketServer = new Server(httpServer)
        socketProducts(socketServer)
        socketChat(socketServer)
    } catch (error) {
        console.error('Failed to connect to the database', error)
        process.exit(1)
    }
}

startServer()