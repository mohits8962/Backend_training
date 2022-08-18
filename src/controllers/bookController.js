const { count } = require("console")
// const BookModel= require("../models/bookModel")

// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks



// Assignment------------------------------------------------------------------------------------------------------------


const BookModel= require("../models/bookModel")
const authorModel = require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body
    let bookData= await BookModel.create(data)
    res.send({msg: bookData})
}

const createAuthor= async function (req, res) {
    let data= req.body
    let authorData= await authorModel.create(data)
    res.send({msg: authorData})
}

const bookWrittenBy=async function(req,res){
    let data=await authorModel.findOne({author_name:"Chetan Bhagat"}).select({author_id:1,_id:0})
    let listData=await BookModel.find(data);
    res.send({msg: listData});
}

const getAuthor=async function(req,res){
    let data=await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
    let updatedData=await data.price
    let secondData= await authorModel.find({author_id:{$eq:data.author_id}}).select({author_name:1,_id:0})
    res.send({msg: secondData,updatedData});
}

const booksCosts=async function(req,res){
    let data=await BookModel.find( { price : { $gte: 50, $lte: 100} } )
    let anotherData = data.map(x => x.author_id)
    let secondData= await authorModel.find({author_id:anotherData}).select({author_name:1,_id:0})
    res.send({msg: secondData});
}





module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.bookWrittenBy= bookWrittenBy
module.exports.getAuthor= getAuthor
module.exports.booksCosts= booksCosts