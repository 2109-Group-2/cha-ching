const router = require("express").Router();
const Saving = require("../db/models/Saving");
const User = require("../db/models/User");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.get("/:id", async (req, res) => {
  //to get all savings associated with a particular user
  try {
    const user = await User.findById(req.params.id);
    // console.log("this is the user api/goal ", user);
console.log('this is running!')
    if (!user.savings.image) {
      user.savings.image =
        "https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg";
    }
    // user.savings.map((saving) =>
    //   saving.image
    //     ? saving.image
    //     : "https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg"
    // );

    let goals = [];
    if (user.savings) {
      user.savings.map((goal) => {
        goals.push(goal);
      });
      // console.log("second *inside terminal* : ", goals);
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
  //
  console.log("********************************this is req body ", req.body);
  console.log("********************************this is req files", req.files);
  let file;
  if (!req.files) {
    file = "https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg";
  } else {
    file = req.files.file;
    file.mv(`C:/Users/cdela/Documents/Fullstack-Stuff/cha-ching/public/images/${file.name}`);
  }

  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const { title, category, currentBalance, goalTarget } = req.body;
    const newGoal = {
      userId: userId,
      title: title,
      image: file.name,
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
