const express = require('express')
const { getUserLandingPage, getStudentInfo, getUploadedFile, saveFile, getNodeMailer } = require('../controllers/user.controller')
const router = express.Router()

router.get("/", getUserLandingPage)

router.post("/student", getStudentInfo)

router.post("/upload", getUploadedFile)

router.post("/cloud", saveFile)

router.get("/mail", getNodeMailer)

module.exports = router