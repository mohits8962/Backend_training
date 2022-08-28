const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


// assignment------------------------------------------------------------------------


router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)


router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

router.delete("/deletedUsers/:userId", userController.deletedUser)

module.exports = router;