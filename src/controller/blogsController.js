const authormodel = require('../model/authormodel');
const blogsModel = require('../model/blogsmodel');

const createBlogs = async function (req, res) {
    try {
        let blogs = req.body
        let condition = await authormodel.findById(blogs.authorId)
        if (condition) {
            if (blogs.isPublished == true) {
                blogs.publishedAt = Date.now()
                let savedData = await blogsModel.create(blogs)
                res.status(201).send({ data: savedData })
            }
            else if (blogs.isPublished == false) {
                let savedData = await blogsModel.create(blogs)
                res.status(201).send({ data: savedData })
            }
        } else {
            res.status(400).send({ status: false, msg: "authorId is not present" })
        }
    } catch (err) {
        console.log("this is the error:", err.message)
        res.status(500).send({ msg: "error", error: err.message })
    }
}


const getBlogs = async function (req, res) {
    try {
        let data = req.query

        let getData = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, data] }).populate('authorId')
        if (getData.length === 0) {
            res.status(404).send({ status: false, msg: "page not found" })
        }
        res.status(200).send({ status: true, data: getData })
    }
    catch (err) {
        console.log("this is the error:", err.message)
        res.status(500).send({ msg: "error", error: err.message })
    }
}


const updateBlogs = async function (req, res) {
    let getId = req.params.blogId
    let data = req.body
    let checkId = await blogsModel.findOne({ _id: getId })
    if (checkId) {
        if (checkId.isDeleted === false) {
            let checkData = await blogsModel
                .findByIdAndUpdate(getId, {
                    $push: { tags: data.tags, subcategory: data.subcategory },
                    title: data.title, category: data.category
                })
            res.status(200).send({ status: true, data: checkData })
        } else {
            res.status(404).send("file may be not present or Deleted")
        }
    } else {
        res.status(404).send({ status: false, msg: "please enter valid blog id" })
    }
}


const deletedBlog = async function (req, res) {
    let getId = req.params.blogId
    if (!getId) {return res.status(404).send("Please add Blog Id")}

    let blogId = await blogsModel.findById(getId)
    if (!blogId) return res.status(404).send("Please Enter Valid Blog Id")

    if (blogId.isDeleted == false) {
        let data = await blogsModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true, data: data })
    } else {
        res.status(404).send({ status: false, msg: "file Already Deleted" })
    }
}


const deletedByQuery = async function (req, res) {
    let data = req.query
    let getData = await blogsModel.findOne(data)
    if(!getData) return res.status(404).send({status:false, msg:"Blog is not created"})

    if(getData.isDeleted==true) return res.status(400).send({status:false, msg:"Document Is Already Deleted"})

    let savedData= await blogsModel.findOneAndUpdate(data, {$set:{isDeleted:true, deletedAt: Date.now()}}, {new:true})
    res.status(200).send({status:true, msg:savedData})
}

module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deletedBlog = deletedBlog
module.exports.deletedByQuery = deletedByQuery