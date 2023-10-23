module.exports = (sequelize, Sequelize) => {
  const Quests = sequelize.define("quests", {
    soru: {
      type: Sequelize.STRING,
    },
    cevap: {
      type: Sequelize.STRING,
    },
  });

  return Quests;
};
