const {userService} = require('../services');
const { catchAsync } = require('../middleware/error');

const signUp = async (req, res) => {
  const userDto = {...req.body};
  
  if (!(userDto.name && userDto.email && userDto.password)) {
    res.status(400).json({ error: "KEY ERROR" });
    return;
  }

  var emailForm = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;;
  const passwordForm = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})");

  if(!emailForm.test(userDto.email)){
    return res.status(400).json({message: 'INVALID EMAIL'})
  }
  if(!passwordForm.test(userDto.password)){
    return res.status(400).json({message: 'INVALID PASSWORD'})
  }

  try {
    await userService.signUp(userDto);
    res.status(201).json({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const signIn = async (req, res) => {
  const userDto = {...req.body};

  if (!userDto.email || !userDto.password) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }

  const token = await userService.signIn(userDto);
  return res.status(200).json({ token: token });
};

const naverSignIn = async (req, res) => {
  const url = await userService.naverSignIn();
  return res.status(200).json({ naver_signup: url });
};

const naverUserInfo = async (req, res) => {
  const userDto = res.locals.naverInfo;
  await userService.naverUserInfo(userDto);
  return res.status(200).json({ message: "SUCCESS" });
};

const kakaoSignIn = catchAsync(async (req, res) => {
  const authCode = req.query.code;

  if(!authCode){
    const error = new Error("AUTHCODE_ERROR");
    error.statusCode = 400;
        throw error;
    }
    const accessToken = await userService.kakaoSignIn(authCode);
    return res.status(201).json({accessToken});
})

module.exports = {
  signUp,
  signIn,
  naverSignIn,
  naverUserInfo,
  kakaoSignIn
};