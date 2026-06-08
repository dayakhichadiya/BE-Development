const User = require("./user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require('../../utils/jwt');

const registerUser = async (payload) => {

    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        "role": "user"
    })

    return user;
}

const loginUser = async (payload) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new Error("Please fill out email and password");
    }

    const user = await User.findOne({ email }).select("+password");  // we have added +password because in schema we have omitted the password field.

    if (!user) {
        throw new Error("Invalid Credential");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); //compare the password from user to payload

    if (!isPasswordMatch) {
        throw new Error("Invalid Credential");
    }

    const token = generateToken({
        userId: user._id,
        role: user.role
    })

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
    };
}

const updateProfile = async (userId, payload) => {
    const user = await User.findByIdAndUpdate(userId, payload, {
        new: true, // Without it:returns old data.
        runValidators: true, //ensures schema validation runs during updates.
    }).select("-password");

    return user;
}

const changePassword = async (userId, payload) => {
    const { oldPassword, newPassword } = payload;

    const user = await User.findById(userId).select("+password");

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("Enter correct Old password");
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;

    await user.save();

    return true;
}

const getAllUser = async (query) => {
    const { search } = query;

    let filter = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i", // i means case insensetive = i, I, any of the capital or small
        }
    }
    const users = await User.find(filter);
    return users;
}

module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    changePassword,
    getAllUser
}