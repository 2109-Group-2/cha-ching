const router = require("express").Router();
const fileUpload = require("express-fileupload");
const { User, Account, Saving } = require("../db");

module.exports = router;

router.use(fileUpload());
router.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const singleUserWithAccounts = await User.findByPk(id, {
      include: [
        {
          model: Account,
          as: "accounts",
        },
        {
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

router.post("/upload", (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file found" });
  }

  const file = req.files.file;
 
  file.mv(`${__dirname}/public/uploads/${file.name}`);

});
