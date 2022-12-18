const {userDao} = require('../models');
const bcrypt = require("bcrypt");

const signUp = async(userDto)=>{
    userDto.password =  await bcrypt.hash(userDto.password, 12);
    await userDao.createUser(userDto);
};

module.exports = { 
    signUp,
}