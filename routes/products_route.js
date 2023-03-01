const { Router } = require("express")
const Products = require("../controllers/products_controller")
const authMid = require("../middlewares/auth_middleware")

let router = Router()


router.get("/products", Products.GET )
router.get("/products/:id", Products.GETONE )
router.post("/products", Products.CREATE)
router.put("/products/:id", Products.UPDATE)
router.delete("/products/:id", Products.DELETE)


module.exports = router