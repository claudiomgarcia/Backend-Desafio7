import {
    fetchProducts,
    fetchProductById,
    createProduct,
    modifyProduct,
    removeProduct
} from '../services/products.services.js'

export const getProducts = async (req, res) => {
    try {
        const { limit, sort, query, page } = req.query
        const productsData = await fetchProducts(limit, page, sort, query)

        res.json({
            status: 'success',
            payload: productsData.products,
            totalPages: productsData.totalPages,
            prevPage: productsData.hasPrevPage ? productsData.currentPage - 1 : null,
            nextPage: productsData.hasNextPage ? productsData.currentPage + 1 : null,
            page: productsData.currentPage,
            hasPrevPage: productsData.hasPrevPage,
            hasNextPage: productsData.hasNextPage,
            prevLink: productsData.prevLink,
            nextLink: productsData.nextLink
        })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await fetchProductById(pid)

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}.` })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el producto.', message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const product = req.body
        const createProductResponse = await createProduct(product)

        if (createProductResponse === false) {
            return res.status(400).json({ error: `Ya existe un producto con el código "${product.code}".` })
        }

        res.status(201).json({ message: `Se agregó correctamente el producto con el código "${product.code}".` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al agregar el producto.', message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const fields = req.body

        const updateResponse = await modifyProduct(pid, fields)

        if (updateResponse === false) {
            return res.status(400).json({ error: `No se puede modificar el ID del producto` })
        }

        if (!updateResponse) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` })
        }

        res.json({ message: `Se actualizó el producto ${pid}` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar el producto.', message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const deleteResponse = await removeProduct(pid)

        if (!deleteResponse) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` })
        }

        res.json({ message: `Se eliminó correctamente el producto con el id ${pid}` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al intentar eliminar el producto.', message: error.message })
    }
}