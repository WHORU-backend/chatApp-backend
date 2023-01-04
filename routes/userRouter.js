const express = require('express');
const router = express.Router();
const {userController} = require('../controllers');
const naverLogIn = require('../middlewares/naverLogIn');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/naver',userController.naverSignIn);
router.get('/naver/info',naverLogIn,userController.naverUserInfo);
router.get('/kakao', userController.kakaoSignIn);

module.exports = router;