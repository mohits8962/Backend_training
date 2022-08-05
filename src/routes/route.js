const express = require('express');

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
    res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason