const express = require("express")
const router = express.Router()
const { registerDoc, findDocById } = require("./dataController")

router.post("/reg", registerDoc)
router.post("/find", findDocById)

module.exports = router;