const { getCollection } = require("../config/mongo");
const { upload } = require("../config/multer");

const router = require("express").Router();
router.delete("/", async (req, res) => {
  const User = await getCollection("users");
  await User.deleteMany();
  res.json({ msg: "db cleaned" });
});

router.get("/", async (req, res) => {
  const db = await getCollection("users");

  const users = await db.find().toArray();

  res.json(
    users.map((u) => {
      return {
        ...u,
        imageUrl: `${process.env.SERVER_URL}/${u.imageUrl}`,
      };
    })
  );
});

router.post("/avatar", upload.single("profile"), (req, res) => {
  console.log(req.body);
  res.json({
    msg: "avatar",
  });
});

router.post("/", upload.single("profile"), async (req, res) => {
  const user = await getCollection("users");
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.filename;
  }
  const newUser = await user.insertOne({
    ...req.body,
    imageUrl,
  });

  res.json({
    newUser,
    msg: "Profile",
    body: req.body,
    file: req.file,
    files: req.files,
  });
});

module.exports = router;
