const { isValidObjectId } = require("mongoose")
const orderModel= require("../models/orderModel")
const productModel= require("../models/productModel")
const userModel= require("../models/userModel")

const createOrder= async function (req, res) {

    let data= req.body
    if(!data.userID) return res.send({msg:"userID is required"})
    if(!isValidObjectId(data.userID)) return res.send({msg:"userID is not valid"})

    if(!data.productID) return res.send({msg:"productID is required"})
    if(!isValidObjectId(data.productID)) return res.send({msg:"productID is not valid"})

// ---------------------------------------------------------

    const userInfo= await userModel.findById(data.userID).select({balance:1,_id:0})
    if(!userInfo) return res.send({msg:"userID is not present in your collection"})

    const productInfo= await productModel.findById(data.productID).select({price:1,_id:0})
    // console.log(productInfo)
    if(!productInfo) return res.send({msg:"productID is not present in your collection"})

// ---------------------------------------------------------
    
    if(req.isfreeappuser == "true"){
        data["isfreeappuser"] = req.isfreeappuser
        let savedData= await orderModel.create(data)
        return res.send({msg: savedData, status:true})
    }

// -------------------------------------------------------------------

    if(userInfo.balance < productInfo.price){
        return res.send({msg:"not enough balance in your wallet"})
    }

// ----------------------------------------------------------------------------

    const currentBalance = userInfo.balance - productInfo.price
    const updatedBalance =await userModel.findByIdAndUpdate({_id:data.userID},{$set:{balance:currentBalance}},{new:true})
    data["isfreeappuser"] = req.isfreeappuser
    data["amount"] = productInfo.price

    let savedData= await orderModel.create(data)
    res.send({msg: savedData,updatedBalance, status:false})
}

module.exports.createOrder= createOrder