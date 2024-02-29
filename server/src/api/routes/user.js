const { Router } = require("express");
const router = Router();
const { User } = require("../database/db");
const bcrypt = require("bcrypt");
const z = require("zod");
const Auth = require("../middlewares/Auth");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.get("/verify", Auth, async (req, res) => {
  res.json({ msg: "Success!" });
});

router.post("/register", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const findUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (findUser) {
    console.log(req.body);
    res.json({ err: "User already Exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: hashPassword,
      email: email,
    });
    await newUser.save();
    const token = jwt.sign({ email, username }, jwtSecret);
    res.json({
      msg: "User registered successfully!",
      token: token,
      userInfo: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!findUser) {
    res.json({ err: "User does not exist!" });
  } else {
    const match = await bcrypt.compare(password, findUser.password);
    if (match) {
      const token = jwt.sign({ email: findUser.email, username: findUser.username }, jwtSecret);
      res.send({
        token: token,
        userInfo: {
          username: findUser.username,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email: findUser.email,
          avatar: findUser?.avatar
        },
      });
    } else {
      res.json({ err: "Wrong Password!" });
    }
  }
});

/* POST: http://localhost:3000/user/profile-img */
router.post("/profile-img", Auth, async (req, res) => {
  try {
    const avatar = req.body.avatar;
    const newImage = await User.findOneAndUpdate({ email: res.locals.data.email }, {$set: {avatar: avatar}});
    res.json({newImage});
  } catch (err) {}
});

const registerSchema = z.object({
  username: z.string().max(16).trim(),
  password: z.string().min(6),
  firstName: z.string().max(45).trim(),
  lastName: z.string().max(45).trim(),
});

module.exports = router;
