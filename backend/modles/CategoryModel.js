const { default: mongoose } = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,   
        required: true,
        trim: true
    },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;