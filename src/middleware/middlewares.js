const authormodel = require('../model/authormodel');
const blogsModel = require('../model/blogsmodel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const auth01 = async function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) return res.status(400).send({ status: false, msg: 'Please add token' })

    let decodeToken = jwt.verify(token, "PROJECT01 SECRET KEY")
    req.decodeToken = decodeToken
    next()
}

const auth02 = async function (req, res, next) {

    // let token = req.headers['x-auth-token']

    let blogId = req.params.blogId
    // console.log(blogId)

    // let authorId=req.decodeToken.authorId
    // console.log(authorId)

    let get = await blogsModel.findById(blogId).select({ authorId: 1})
    if (!get) return res.status(400).send({status:false, msg:"Please Enter Valid Blog Id"})
    // console.log(get)

    // let getAuthorId= get.authorId.toString()
    // console.log(getAuthorId)

    // if (!token) return res.status(400).send({ status: false, msg: 'Please add token' })

    // let decodeToken = jwt.verify(token, "PROJECT01 SECRET KEY")
    if(req.decodeToken.authorId !== get.authorId.toString()){
        return res.status(400).send({ status: false, msg: 'You Are Not Authorised' })
    }
    next()
}

module.exports.auth01=auth01
module.exports.auth02=auth02
