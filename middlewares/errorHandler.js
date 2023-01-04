const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message });
  };
  
const catchAsync = func => {
return async (req, res, next) => {
      try {
          await func(req, res)
      }
      catch(error){
          next(error);
      }
  }
};

module.exports = { errorHandler, catchAsync };