const router = require("express").Router();
const Saving = require("../db/models/Saving");
const User = require("../db/models/User");

router.get("/:id", async (req, res) => {
  //to get all savings associated with a particular user
  try {
    const user = await User.findById(req.params.id);
    console.log('this is the user ', user);
    let savings = [];
    if (user.savings) {
      user.savings.map((goal) => {
        savings.push(goal);
      });
      console.log('second *inside terminal* : ', savings)
      return res.json(savings);
    }
    return res.json(savings);
  } catch (err) {
    console.log("there was an error in api/goals: ", err);
  }
});


router.delete("/:id", async (req, res) => {
  //to get one saving associated with a user 
  //must be used with the id of a specific goal
  try {
    console.log('this is req: ', req.params)
    const savings = await Saving.findById(req.params.id)
    console.log('this is savings at an id', savings)
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

module.exports = router;
