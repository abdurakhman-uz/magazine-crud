const path = require('path');
const express = require("express")
const cors = require("cors")
const multer = require('multer')
const dotenv = require("dotenv")
const {read} = require("./utils/read")

dotenv.config()
const {PORT} = process.env


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


const productsRouter = require("./routes/products_route")
const authRouter = require("./routes/auth_route")
const authMiddleware = require("./middlewares/auth_middleware")


app.use(authRouter)
app.use(authMiddleware)
app.use(productsRouter)


app.post("/upload", upload.single("file"), (req, res) => {
    res.send({
        img: `/upload/${req.file.filename}`
    })
})


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
