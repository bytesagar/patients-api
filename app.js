const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const colors = require("colors")
const connectToDb = require("./config/dbConfig")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const errorHandler = require("./middleware/errorHandler")


//load env files
dotenv.config({ path: './config/.env' })

connectToDb()

//middleware files
const morgan = require("morgan")

//route files
const patients = require("./routes/patients")
const user = require("./routes/auth")

const app = express()

//middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//file upload
app.use(fileUpload())

//static folder
app.use(express.static(path.join(__dirname, 'public')))



//json body data
app.use(express.json())

//cookie parser
app.use(cookieParser())

//connect routers
app.use("/api/v1/patients", patients)
app.use("/api/v1/auth", user)

app.use(errorHandler)


const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.underline.bold)
})

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //close server and exit
    server.close(() => {
        process.exit(1)
    })
})