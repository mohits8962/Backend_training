const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/getDistrictsById", CowinController.getDistrictsById)

router.post("/getmeme", CowinController.getmeme)

router.get("/getWeather", CowinController.getWeather)

router.get("/getTemperature", CowinController.getTemperature)

router.get("/getSortedCities", CowinController.getSortedCities)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;