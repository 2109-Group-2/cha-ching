const router = require("express").Router();
const Saving = require("../db/models/Saving");
const User = require("../db/models/User");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.get("/:id", async (req, res) => {
  //to get all savings associated with a particular user
  try {
    const user = await User.findById(req.params.id);
    console.log("this is the user ", user);
    let goals = [];
    if (user.savings) {
      user.savings.map((goal) => {
        goals.push(goal);
      });
      console.log("second *inside terminal* : ", goals);
      return res.json(goals);
    }
    return res.json(goals);
  } catch (err) {
    console.log("there was an error in api/goals: ", err);
  }
});

router.delete("/:id", async (req, res) => {
  //to get one saving associated with a user
  //must be used with the id of a specific goal
  try {
    console.log("this is req: ", req.params);
    const savings = await Saving.findById(req.params.id);
    console.log("this is savings at an id", savings);
    // const user = await User.findById(req.params.id);
    // console.log(user);
    // let savings = [];
    // if (user.savings) {
    //   user.savings.map((goal) => {
    //     savings.push(goal);
    //   });
    //   return res.json(savings);
    // }
    return res.json(savings);
  } catch (err) {
    console.log("there was an error in api/goals/delete: ", err);
  }
});

router.post("/:id", async (req, res, next) => {
  console.log("req body ", req.body);
  console.log("req params", req.params);
  let file;
  if (!req.file) {
    file = "/public/user-icon.png";
  } else {
    file = req.files.file;

    file.mv(`${__dirname}/public/uploads/${file.name}`);
  }

  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const { title, category, currentBalance, goalTarget } = req.body;
    const newGoal = {
      userId: userId,
      title: title,
      image: file,
      category: category,
      currentBalance: currentBalance,
      goalTarget: goalTarget,
    };
    await user.savings.push(newGoal);

    user.save(function (err) {
      if (!err) console.log("Successfully added Saving!", newGoal);
      else console.log("could not add goal! ", err);
    });
    return res.json(newGoal);
  } catch (err) {
    console.log("===Mongo Error===", err);
  }
});

module.exports = router;
