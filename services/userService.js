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

const naverSignIn = async()=>{
    const state = Math.random().toString(36).substring(2);;
    const redirectURI = encodeURI("http://localhost:8000/users/naver/info");
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + process.env.NAVER_CLIENT_ID
            + '&redirect_uri=' + redirectURI
            + '&state=' + state;
    return api_url;
};

const naverUserInfo = async(userDto) => {
    await userDao.createNaverUser(userDto);
    const existingUser = await userDao.getUser(userDto);
    return existingUser;
};

module.exports = { 
    signUp,
    signIn,
    naverSignIn,
    naverUserInfo,
};