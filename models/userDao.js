const myDataSource = require("./db.config");

const createUser = async (userDao) => {
  await myDataSource.query(
    `
    INSERT INTO users(name, email, password)
    VALUES ("${userDao.name}","${userDao.email}","${userDao.password}")
    `
  );
};

const getUser = async (userDao) => {
  const [result] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE email = "${userDao.email}"
    `
  );
  return result;
};

const createNaverUser = async (userDao) => {
  await myDataSource.query(
    `
    INSERT INTO users(name, email)
    VALUES ("${userDao.name}","${userDao.email}")
    `
  );
};

module.exports = { 
  createUser,
  getUser,
  createNaverUser,
}