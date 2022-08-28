const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


// -------------------------------------------------01--------------------------------------------------

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

// -------------------------------------------------02--------------------------------------------------

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password});
  if (!user){
    return res.send({status: false, msg: "username or the password is not corerct",});
  }

  let token = jwt.sign({
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FunctionUp",
    }, 
    "plutonium-student-secret-key");

  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};


// -------------------------------------------------03--------------------------------------------------

const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];          //token taking from headers 

  if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);

// verify 
  let decodedToken = jwt.verify(token, "plutonium-student-secret-key");
  if (!decodedToken)
  return res.send({ status: false, msg: "token is invalid" });
  
// taking id and checking
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};


// -------------------------------------------------04--------------------------------------------------

const updateUser = async function (req, res) {

  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];          //token taking from headers 

  if (!token) return res.send({ status: false, msg: "token must be present" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser });
};


// -------------------------------------------------05--------------------------------------------------

const deletedUser = async function (req, res) {

  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];          //token taking from headers 

  if (!token) return res.send({ status: false, msg: "token must be present" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{ $set: { isDeleted: true }},{ new: true });
  res.send({ status: updatedUser});
};
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deletedUser = deletedUser;
