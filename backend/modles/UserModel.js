// /models/UserModel.js
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    userId: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNo: { type: String },
    addresses: [
        {
            firstName: String,
            lastName: String,
            address: String,
            landmark: String,
            state: String,
            city: String,
            pincode: String,
            phoneNo: String,
            tag: String
        }
    ],
    age: String,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    cart: [
        {
            productId: { type: mongoose.Schema.ObjectId, ref: "Product", index: true },
            quantity: Number
        }
    ],
    userType: { type: String, enum: ["User", "Admin"], required: true }
}, { timestamps: true });

UserSchema.statics.signup = async function(userId, username, email, password, userType) {
    if (!userId || !username || !email || !password || !userType) throw Error("All fields must be filled");
    if (!validator.isEmail(email)) throw Error("Enter valid email address");
    if (!validator.isStrongPassword(password)) throw Error("Password is too weak");

    const exists = await this.findOne({ email });
    if (exists) throw Error("Email already in use");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ userId, username, email, password: hash, userType });
    return user;
};

UserSchema.statics.login = async function(email, password) {
    if (!email || !password) throw Error("All fields must be filled");

    const user = await this.findOne({ email });
    if (!user) throw Error("Enter valid email address");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error("Enter valid password");

    return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
