const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.BD_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la DB');
    }
}

module.exports = {
    dbConnection
}