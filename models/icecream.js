const mongoose = require("mongoose")
const icecreamSchema = mongoose.Schema({
    icecream_flavour: {
        type: String,
        required:true
    },
    icecream_quantity: {
        type: String,
        required:true
    },
    icecream_cost: {
        type: Number,
        required:true,
        min: 1,
        max: 1500
    }
    })
module.exports = mongoose.model("icecream",icecreamSchema)    