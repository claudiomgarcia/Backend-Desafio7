import { Router } from 'express'
import {
    getCarts,
    getCart,
    createCart,
    addProduct,
    deleteProduct,
    updateCart,
    updateProductQty,
    clearCart
} from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.get('/', getCarts)
cartsRouter.get('/:cid', getCart)
cartsRouter.post('/', createCart)
cartsRouter.post('/:cid/product/:pid', addProduct)
cartsRouter.delete('/:cid/products/:pid', deleteProduct)
cartsRouter.put('/:cid', updateCart)
cartsRouter.put('/:cid/products/:pid', updateProductQty)
cartsRouter.delete('/:cid', clearCart)

export default cartsRouter
