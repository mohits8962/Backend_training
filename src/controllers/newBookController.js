const newBookModel = require("../models/newBookModel")
const newAuthorModel = require("../models/authorModel")
const newPublisherModel = require("../models/newPublisherModel")

const createBook= async function (req, res) {
    let book = req.body
    if(!book.author) res.send("Author id is mandatory")
    let bookinf = await newBookModel.findById(book.author)
    if(!bookinf) res.send("Author id is not valid")
    
    if(!book.publisher) res.send("Publisher id is mandatory")
    let Pubinf = await newBookModel.findById(book.publisher)
    if(!Pubinf) res.send("Publisher id is not valid")
    
    let bookCreated = await newBookModel.create(book)
    res.send({data: bookCreated})
}


const getBooksWithAuthorAndPublisherDetails = async function (req, res) {
    let specificDetails = await newBookModel.find().populate('author publisher')
    res.send({data: specificDetails})

}


const books= async function (req, res) {
    let data = await newPublisherModel.find({name:{$in:["Penguin","HarperCollins"]}}).select({_id:1})
    let book = await newBookModel.find({publisher: {$in:data}}).update({$set:{isHardCover:true}})
    let result = await newBookModel.find({isHardCover:true}).populate('author publisher')
    res.send({data: result})
}

const booksByAuthor= async function (req, res) {
    let data = await newBookModel.find({ratings:{$gte:3.5}})
    let blank=[]
    data.forEach(element=>{
        if(element.author!=null){
            blank.push(element._id)
        }
    })
    let anotherData=await newBookModel.updateMany({_id:blank},{$inc:{price:+10}})
    res.send({data: anotherData})
}


module.exports.createBook= createBook
module.exports.getBooksWithAuthorAndPublisherDetails= getBooksWithAuthorAndPublisherDetails
module.exports.books= books
module.exports.booksByAuthor= booksByAuthor