const mongoose = require("mongoose");

// creating a database
mongoose.connect(`${process.env.DB_CONNECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull");
}).catch((error) => {
    console.log(error);
})