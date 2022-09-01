let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


// -------------------------------------------------------------------------------------------------------------------------

let getDistrictsById = async function (req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        // console.log(`query params are: ${id} ${date}`)
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options);
        // console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

// -------------------------------------------------------------------------------------------------------------------------


let getmeme = async function (req, res) {
    try {
        let options = {
            method: "post",
            url: "https://api.imgflip.com/caption_image?template_id=181913649&text0=hiiii&text1=byeee&username=chewie12345&password=meme@123"
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


// -------------------------------------------------------------------------------------------------------------------------


let getWeather = async function (req, res) {
    try {
        let data01 = req.query.q
        let data02= req.query.appid
        // console.log(`query params are: ${data01} ${data02}`)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${data01}&appid=${data02}`
        }
        let result = await axios(options);
        // console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



let getTemperature = async function (req, res) {
    try {
        let data01 = req.query.q
        let data02= req.query.appid
        // console.log(`query params are: ${data01} ${data02}`)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${data01}&appid=${data02}`
        }
        let result = await axios(options);
        // console.log(result)
        let data = result.data.main['temp']
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getSortedCities = async function (req, res) {
    try {
        let cities = [ "Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let citiesResult =[]

        for( let i=0; i<cities.length; i++){
            let obj = {city: cities[i]}

            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=bd35366a64e3d7477ff270ac5aed2e8f`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp
            citiesResult.push(obj)
            
        }
        let sorted = citiesResult.sort(function(a,b){return a.temp - b.temp})
        console.log(sorted)
        res.status(200).send({ status:true, data: sorted })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrictsById = getDistrictsById
module.exports.getmeme = getmeme
module.exports.getWeather = getWeather
module.exports.getTemperature = getTemperature
module.exports.getSortedCities = getSortedCities




