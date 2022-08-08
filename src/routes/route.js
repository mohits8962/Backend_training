const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

// ASSIGNMENT--------------------------------------------------------------------------------------------------


// problem 01
router.get('/movies', function (req, res){
    let getMovies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    console.log(getMovies)
    res.send("problem 01 run successfully")
})


// problem 02
// router.get('/movies/:indexNumber', function (req, res){
//     let getMovies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
//     let reqParams = req.params
//     let movieIndex = reqParams.indexNumber
//     let movieName=getMovies[movieIndex]
//     console.log(movieName)
    

//     res.send("problem 02 run successfully")
// })

// problem 03
router.get('/movies/:indexNumber', function (req, res){
    let getMovies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    let reqParams = req.params
    let movieIndex = reqParams.indexNumber
    let movieName=getMovies[movieIndex]
    console.log(movieName||"Error : use a valid index")
    

    res.send("problem 03 run successfully")
})


// problem 04
router.get('/films', function (req, res){
    let movieArray = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       
        console.log(movieArray)

    res.send("problem 04 run successfully")
})


// problem 05
router.get('/films/:filmId', function (req, res){
    let movieArray = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       

        let reqParams = req.params
        let movieId = reqParams.filmId
        let filmArray = movieArray[movieId]
        console.log(filmArray||"Error : use a valid index") 

    res.send("problem 05 run successfully")
})

module.exports = router;