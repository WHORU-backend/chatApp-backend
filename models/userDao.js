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

const getUserByKakaoId = async (kakaoId) => {

  const [user] = await myDataSource.query(
    `
    SELECT 
            id,
            kakaoId,
            name,
            profileImage
    FROM users
    WHERE kakaoId=?`, [kakaoId]
  )

    return user;
}

const createSignUp = async (kakaoId, email, name, profileImage) => {

    return await dataSource.query(
      `
        INSERT INTO users (
          kakaoId, email, name, profileImage
          ) VALUES (
                  ?,
                  ?, 
                  ?, 
                  ?,
                  ?
          )`,
      [socialId, email, name, profileImage]
    )
}

module.exports = { 
  createUser,
  getUser,
  createNaverUser,
  getUserByKakaoId,
}