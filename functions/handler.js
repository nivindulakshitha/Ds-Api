const express = require("express")
const router = express.Router()
const { registerDoc, findDocById, updateLikes } = require("./dataController")

router.post("/reg", registerDoc)
router.post("/find", findDocById)
router.post("/like", updateLikes)

module.exports = router;