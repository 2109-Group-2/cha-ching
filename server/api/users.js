const router = require("express").Router();
const { User, Account, Saving } = require("../db");

module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const singleUserWithAccounts = await User.findByPk(id, {
      include: [
        {
          model: Account,
          as: "accounts",
        },{
          model: Saving,
          as: "savings",
        },
      ],
    });
    if (!singleUserWithAccounts) {
      res.sendStatus(404);
      return;
    }
    res.send(singleUserWithAccounts);
  } catch (error) {
    next(error);
  }
});
