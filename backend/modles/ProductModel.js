const mongoose = require('mongoose');
const generateProductId = require('../utils/generateProductId')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    flavour: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    preparationTime: {
        type: String
    },
    care: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    bestseller: {
        type: Boolean,
        default: false
    },
    inStock: {
        type: Boolean,
        default: true
    },
    cakeOfTheDay: {
        type: Boolean,
        default: false
    },
    productId: {
        type: String,
        unique: true,
        default: generateProductId
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
