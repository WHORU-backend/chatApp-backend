const myDataSource = require("./db.config");

const createUser = async (userDao) => {
  await myDataSource.query(
    `
    INSERT INTO users(name, email, password)
    VALUES ("${userDao.name}","${userDao.email}","${userDao.password}")
    `
  );
};

module.exports = { 
    createUser,
}