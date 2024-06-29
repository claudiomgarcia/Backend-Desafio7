import { Router } from 'express'
import {
    register,
    login,
    githubAuth,
    githubCallback,
    logout,
    getCurrentSession
} from '../../controllers/sessions.controller.js'

const sessionsRouter = Router()

sessionsRouter.post('/register', register)
sessionsRouter.post('/login', login)
sessionsRouter.get("/github", githubAuth)
sessionsRouter.get("/githubcallback", githubCallback)
sessionsRouter.post('/logout', logout)
sessionsRouter.get('/current', getCurrentSession)

export default sessionsRouter
