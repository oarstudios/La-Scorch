const User = require('../modles/UserModel');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const sendResponse = require('../utils/sendResponse');
const generateUserId = require('../utils/generateUserId');
const createToken = require('../utils/createToken');

const signup = async (req, res) => {
    try {
        const userId = generateUserId();
        const { username, email, password, userType } = req.body;

        const user = await User.signup(userId, username, email, password, userType);
        const token = createToken(user);

        const userObj = user.toObject();
        delete userObj.password;

        sendResponse(res, StatusCodes.CREATED, "Signed up successfully", { user: userObj, token });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user);

        const userObj = user.toObject();
        delete userObj.password;

        sendResponse(res, StatusCodes.OK, "Logged in successfully", { user: userObj, token });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("cart.productId");
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        user.cart = user.cart.filter(item => item.productId && !item.productId.isArchived && item.productId.inStock);
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        const existingItem = user.cart.find(item => item.productId.toString() === productId);
        if (existingItem) {
            if (quantity === 0) {
                user.cart = user.cart.filter(item => item.productId.toString() !== productId);
            } else {
                existingItem.quantity = quantity;
            }
        } else if (quantity > 0) {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(StatusCodes.OK).json({ cart: user.cart });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { id, productId } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { cart } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        user.cart = cart;
        await user.save();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const emptyCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        user.cart = [];
        await user.save();
        res.status(StatusCodes.OK).json({ message: "Cart emptied successfully", cart: user.cart });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        if (user.addresses.length >= 3) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "You can only add up to 3 addresses." });
        }

        user.addresses.push(req.body);
        await user.save();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        const index = user.addresses.findIndex(addr => addr._id.toString() === addressId);
        if (index === -1) return res.status(StatusCodes.NOT_FOUND).json({ error: "Address not found" });

        user.addresses[index] = { ...user.addresses[index].toObject(), ...req.body };
        await user.save();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
        await user.save();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

module.exports = {
    signup,
    login,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    addToCart,
    removeFromCart,
    updateCart,
    emptyCart,
    addAddress,
    updateAddress,
    deleteAddress
};
