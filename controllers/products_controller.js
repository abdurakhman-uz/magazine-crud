const {uuid} = require("../utils/uuid")
const jwt = require("jsonwebtoken")
const {read, write} = require("../utils/read")
let userData = read("jwt")
let {id} = userData[0]

let Products = {

    GET: (req, res) => {

        let products = read("products").filter(product => product.user_id === id)
        res.status(200).json(products)
    },

    GETONE: (req, res) => {
        const params = req.params.id

        let products = read("products").filter(product => product.id === params)
        res.status(200).json(products)
    },

    CREATE: async (req, res) => {
        try {
            let products = read("products")

            products.push({
                id: uuid(),
                user_id: id,
                ...req.body
            })

            write("products", products)

            res.status(201).send({msg: "Product Created!"})

        } catch (error) {
            res.send(error.message)

        }

    },

    UPDATE: (req, res) => {
        try {
            let products = read("products")

            const {title, author, price} = req.body

            products.forEach((product) => {
                if (product.id === req.params.id) {
                    product.title = title ? title : product.title
                    product.author = author ? author : product.author
                    product.price = price ? price : product.price
                }
            })

            write("products", products)

            return res.status(200).send({msg: "Product Updated!"})

        } catch (error) {}
    },

    DELETE: (req, res) => {
        let products = read("products")

        products.forEach((product, idx) => {
            if (product.id === req.params.id) {
                products.splice(idx, 1)
            }
        })

        write("products", products)

        res.status(200).send({msg: "Product Deleted!"})
    }
}

module.exports = Products
