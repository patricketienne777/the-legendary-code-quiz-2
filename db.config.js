module.exports = {
  HOST: "wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  USER: "tbncr9arfmiyufe0",
  PASSWORD: "q6piqdqhw691fian",
  DB: "s4w0kuvldtu5gtym",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
