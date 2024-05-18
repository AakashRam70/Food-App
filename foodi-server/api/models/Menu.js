const mongoose = require("mongoose");
const { schema } = mongoose;

// create schema Object for menu items.
var menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

