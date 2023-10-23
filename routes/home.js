const router = require("express").Router();
const db = require("../models");
const Quest = db.quests;
const { authcheck } = require("../middlewares/authCheck");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const user = req.user;

  if (user) {
    res.render("index", {
      user: user,
    });
  } else {
    res.render("index");
  }
});

router.get("/addquestion", authcheck, async (req, res) => {
  const user = req.user;

  if (user.admin === true) {
    res.render("addquestion");
  } else {
    res.redirect("/questions");
  }
});

router.post("/postquest", async (req, res) => {
  await Quest.sync();

  const myquest = {
    soru: req.body.soru,
    cevap: req.body.cevap,
  };

  // Save Quest in the database
  Quest.create(myquest)

    .then((myquest) => {
      console.log(myquest);
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
    });
});

router.get("/questions", authcheck, async (req, res) => {
  const questions = await Quest.findAll({
    order: [["id", "ASC"]],
  });

  console.log(questions);

  res.render("questions", {
    soru: questions[0].soru,
    cevap: questions[0].cevap,
  });
});

router.get("/questionsjson", authcheck, async (req, res) => {
  const questions = await Quest.findAll({
    order: [sequelize.fn("RAND")],
  });

  res.json({
    soru: questions[0].soru,
    cevap: questions[0].cevap,
  });
});
router.post("/answersheet", authcheck, async (req, res) => {
  const allAnswers = await Quest.findAll({
    order: [["id", "ASC"]],
  });
  res.json(allAnswers);
  res.render("answersheet");
});

router.post("/postanswer", authcheck, async (req, res) => {
  const bodyquestion = req.body.question;
  const answer = req.body.answer;

  const question = await Quest.findOne({
    where: {
      soru: bodyquestion,
    },
  });

  console.log(question);

  if (question.cevap === answer) {
    res.json("Success");
  } else {
    res.json("Fail");
  }
});

module.exports = router;
