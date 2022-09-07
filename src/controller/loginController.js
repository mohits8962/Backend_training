const authormodel = require('../model/authormodel')
const jwt = require('jsonwebtoken')


const login = async function (req, res) {
    let email = req.body.email
    let password = req.body.password

    if (!email) return res.status(400).send({ status: false, msg: "Please Enter Email" })
    if (!password) return res.status(400).send({ status: false, msg: "Please Enter Password" })

    let get = await authormodel.findOne({ email: email, password: password })
    if (!get) return res.status(400).send({ status: false, msg: "Your Email And Password Is Incorrect" })

    let token = jwt.sign({ authorId: get._id.toString() }, "PROJECT01 SECRET KEY")

    res.setHeader("x-auth-token", token)
    res.status(200).send({ status: true, msg: "You Are Successfully Logged In" })

}

module.exports.login = login