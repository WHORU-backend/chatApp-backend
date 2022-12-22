const {userDao} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async(userDto)=>{
    userDto.password =  await bcrypt.hash(userDto.password, 12);
    await userDao.createUser(userDto);
};

const signIn = async(userDto)=>{
    const existingUser = await userDao.getUser(userDto);
    
    if (existingUser) {
        if (bcrypt.compareSync(userDto.password, existingUser.password)){
            const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
            return token;
        } else {
            const error = new Error("INVAILD PASSWORD");
            error.statusCode = 400;
            throw error;
        }
    } else {
        const error = new Error("INVAILD USER");
        error.statusCode = 400;
        throw error;
    }
};

module.exports = { 
    signUp,
    signIn,
};