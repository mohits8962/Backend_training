const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  try {
    let data = abcd.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      // console.log(abcd.newAtribute);
      xyz.status(201).send({ msg: savedData });
    }
    else xyz.status(400).send({ msg: "bad request" })
  }

  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
};

// -----------------------------------------------------------------------------------------------------------------

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    if (Object.keys(userName).length != 0 && Object.keys(password).length != 0) {
      let user = await userModel.findOne({ emailId: userName, password: password });
      if (!user)
        return res.send({ status: false, msg: "username or the password is not correct" });

      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "plutonium",
          organisation: "FUnctionUp",
        },
        "functionup-plutonium-very-very-secret-key"
      );
      res.setHeader("x-auth-token", token);
      res.status(200).send({ status: true, data: token });
    }
    else res.status(400).send({ msg: "bad request" })
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
};

// -----------------------------------------------------------------------------------------------------------------

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (userId != 0) {
      let userDetails = await userModel.findById(userId);
      if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });

      res.status(200).send({ status: true, data: userDetails });
    }
    else res.status(400).send({ msg: "bad request" })
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
};

// -----------------------------------------------------------------------------------------------------------------

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (userId != 0) {
      let user = await userModel.findById(userId);
      //Return an error if no user with the given id exists in the db
      if (!user) {
        return res.send("No such user exists");
      }

      let userData = req.body;
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
      res.status(200).send({ status: updatedUser, data: updatedUser });
    }
    else res.status(400).send({ msg: "bad request" })
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
};

// -----------------------------------------------------------------------------------------------------------------

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    if (userId != 0) {
      let user = await userModel.findById(userId)
      if (!user) {
        return res.send({ status: false, message: "no such user exists" })
      }
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
      res.status(200).send({ status: true, data: updatedUser })
    }
    else res.status(400).send({ msg: "bad request" })
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
