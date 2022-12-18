const {userService} = require('../services');

const signUp = async (req, res) => {
    const userDto = {...req.body};
    
    if (!(userDto.name && userDto.email && userDto.password)) {
      res.status(400).json({ error: "KEY ERROR" });
      return;
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
}