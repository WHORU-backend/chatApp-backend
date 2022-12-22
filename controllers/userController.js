const {userService} = require('../services');

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

module.exports = { 
    signUp,
};