const { json } = require('body-parser');
const express = require('express');
const _ = require('lodash');

const router = express.Router();
const prob01=require('../logger/logger')
const prob02=require('../util/helper')
const prob03=require('../validator/formatter')

router.get('/test-me', function (req, res) {
    prob01.welcome()
    prob02.todaysDate()
    prob02.printMonth()
    prob02.getBatchInfo()
    prob03.changeToTrim()
    prob03.changeLower()
    prob03.changeHigher()
    let prob0401=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let result01=_.chunk(prob0401,3)
    console.log(result01)

    let prob0402=[1,3,5,7,9,11,13,15,17,19]
    let result02=_.tail(prob0402)
    console.log(result02)

    let prob0403=([1,2,3],[2,4,3],[5,2,6],[2,3,7],[3,2,5])
    let result03=_.union(prob0403)
    console.log(result03)

    let prob0404=([["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]])
    let result04=_.fromPairs(prob0404)
    console.log(result04)

    res.send('My first ever api!')
});

router.get('/student-details/:age',function(req,res){
    console.log(JSON.stringify(req.params))
    let reqParams=req.params
    let studentsage=reqParams.age
    console.log(studentsage)

    res.send(studentsage)
})


module.exports = router;
// adding this comment for no reason