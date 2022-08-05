// prob 01

let todaysDate=function() {
    console.log(Date())
}


// prob 02

let printMonth=function(){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
     const a = new Date();
     let month = months[a.getMonth()];
     console.log("month is " +month);
    }


// prob 03
let getBatchInfo=function(){
    console.log("Plutonium"+" "+"W3D2"+" "+"the topic for today is Nodejs module system")
}
getBatchInfo()

module.exports.todaysDate = todaysDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo