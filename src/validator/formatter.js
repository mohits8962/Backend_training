// prb 01

function changeToTrim(){
    console.log('    I am trimmed   '.trim())
}
changeToTrim()


// prb 02
function changeLower(){
    console.log('LOWERCASE'.toLowerCase())
}
changeLower()


// prb 03
function changeHigher(){
    console.log('uppercase'.toUpperCase())
}
changeHigher()


module.exports.changeToTrim = changeToTrim
module.exports.changeLower = changeLower
module.exports.changeHigher = changeHigher