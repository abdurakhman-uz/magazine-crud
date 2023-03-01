const { Router } = require('express')
const Auth = require("../controllers/auth_controller")


const router = Router()


router.post("/register", Auth.REGISTER )
router.post("/login", Auth.LOGIN )



module.exports = router