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

const kakaoSignIn = async ( authCode ) => {

    const kakaoId = process.env.KAKAO_ID;
    const redirectUri = process.env.KAKAO_REDIRECT_URL;
  
    const getToken = await axios({
          url : `https://kauth.kakao.com/oauth/token`,
          method : 'POST',
          headers : {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
          data : `grant_type=authorization_code&kakao_id=${kakaoId}&redirect_uri=${redirectUri}&code=${authCode}`
      });
  
    const userData = await axios({
        url : `https://kapi.kakao.com/v2/user/me`,
        method : 'GET',
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization' : `Bearer ${getToken.data.access_token}`
        }
    });
  
    const kakaoUser = userData.data;
    const email = kakaoUser.kakaoAccount;
    const kakaoUserId = kakaoUser.id;
    const name = kakaoUser.properties.nickname;
    const profileImage = kakaoUser.kakaoAccount.profileImageUrl;
  
    let user = await userDao.getUserByKakaoId(kakaoId);
  
    if(!user){
        await userDao.createSignUp(kakaoId, email, name, profileImage);
        user = await userDao.getUserByKakaoId(kakaoId);
    }
  
    const accessToken = jwt.sign({ user_id : user.id }, process.env.KAKAO_SECRET)
  
    return accessToken
  
  }

module.exports = { 
    signUp,
    signIn,
    naverSignIn,
    naverUserInfo,
    kakaoSignIn,
};