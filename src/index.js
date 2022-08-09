const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);



// Assignment-------------------------------------------------------------------------------------


// problem01

app.get('/sol01', function (req, res) {
    function missing(arr){
        let missArray=[]

        // (1,2,3,5,6,7)  by spread operator
        let minNum=Math.min(...arr)  //1
        let maxNum=Math.max(...arr)  //7

        // here indexOf is doing this------return its position, if its not there then it give -1
        for(let i=minNum; i<maxNum; i++){
            if(arr.indexOf(i)<0){
                missArray.push(i)
            }
        }
        return missArray
    }
    console.log(missing([1,2,3,5,6,7]))
    res.send("problem 01 run successfully");
});


// problem02

app.get('/sol02', function (req, res) {
    function missing(arr){
        let missArray=[]

        let minNum=Math.min(...arr)  
        let maxNum=Math.max(...arr)  

        // here indexOf is doing this------return its position, if its not there then it give -1
        for(let i=minNum; i<maxNum; i++){
            if(arr.indexOf(i)<0){
                missArray.push(i)
            }
        }
        return missArray
    }
    console.log(missing([33, 34, 35, 37, 38]))
    res.send("problem 02 run successfully");
});


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

