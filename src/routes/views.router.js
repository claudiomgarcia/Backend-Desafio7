import { Router } from 'express'
import {
    renderProductsPage,
    renderRealTimeProductsPage,
    renderChatPage,
    renderCartPage,
    renderLoginPage,
    renderRegisterPage,
    renderProfilePage,
    renderNotFoundPage
} from '../controllers/views.controller.js'
import { isAuthenticated, isNotAuthenticated } from '../middlewares/auth.js'

const viewsRouter = Router()

viewsRouter.get('/products', isAuthenticated, renderProductsPage)
viewsRouter.get('/realtimeproducts', renderRealTimeProductsPage)
viewsRouter.get('/chat', renderChatPage)
viewsRouter.get('/carts/:cid', isAuthenticated, renderCartPage)
viewsRouter.get(['/', '/login'], isNotAuthenticated, renderLoginPage)
viewsRouter.get('/register', isNotAuthenticated, renderRegisterPage)
viewsRouter.get('/profile', isAuthenticated, renderProfilePage)
viewsRouter.get('*', renderNotFoundPage)

export default viewsRouter
