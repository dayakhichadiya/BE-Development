const User = require("./user.model");
const bcrypt = require("bcrypt");

const registerUser = async (payload) => {
   
    const {name, email, password} = payload;

    const existingUser = await User.findOne({email});

    if(existingUser){
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

module.exports = {
    registerUser
}