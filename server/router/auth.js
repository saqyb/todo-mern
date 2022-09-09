const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("Hello World From auth.js");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords Dont Match" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });
      const userRegistered = await user.save();
      if (userRegistered) {
        return res
          .status(201)
          .json({ message: "User Registered Successfully" });
      } else {
        return res.status(500).json({ error: "Failed to Register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Plz send complete data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expiresIn: 1000,
          httpOnly: true,
        });
        return res.status(201).json({ message: "logged in Successfully" });
      } else {
        return res.status(500).json({ error: "User Not Found" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/authenticate", authenticate, (req, res) => {
  // console.log("About page from Auth");
  res.send(req.rootUser);
});

router.post("/getList", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send(user.todos);
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
  res.send(req.todos);
});

router.post("/addTodo", async (req, res) => {
  const { email, todo } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const Todo = { id: todo.id, todo: todo.todo };
    await user.todos.unshift(Todo);
    const save = user.save();
    if (save) {
      return res.status(201).json({ message: "Saved New Todo" });
    } else {
      return res.status(500).json({ error: "Failed to save" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateTodo", async (req, res) => {
  const { email, todos } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Plz Send Complete Data" });
  }
  try {
    var user = await User.findOne({ email: email });
    if (user) {
      var tempUser = user;
      tempUser.todos = todos;
      user = tempUser;
      const save = await user.save();
      console.log(user);
      if (save) {
        return res
          .status(201)
          .json({ message: "User Registered Successfully" });
      } else {
        return res.status(500).json({ error: "Failed to Register" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteTodo", async (req, res) => {
  const { email, todo } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Plz Send Complete Data" });
  }
  try {
    var user = await User.findOne({ email: email });
    if (user) {
      await user.update({ $pull: { todos: todo } });
      const save = await user.save();
      // console.log(user);
      if (save) {
        // console.log("DELETED TODO");
        return res.status(201).json({ message: "Todo Deleted Successfully" });
      } else {
        // console.log("Failed to DELETE TODO");
        return res.status(500).json({ error: "Failed to Delete Todo" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Log Out page

router.get("/logout", (req, res) => {
  console.log("User LogOut from Auth");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged out");
});

module.exports = router;
