const mongoose = require("mongoose")

const conOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}

const connectToDb = async () => {
    const con = await mongoose.connect(process.env.LOCAL_DB_URI, conOptions)
    console.log(`Database connected: ${con.connection.host}`.yellow.bold.underline)

}

module.exports = connectToDb