const express = require("express")
const router = express.Router()

const editionCtrl = require("../controllers/edition.ctrl")

// User DB
router.get("/", editionCtrl.readEditions)
router.get("/:id", editionCtrl.readEdition)
router.post("/", editionCtrl.createEdition)
router.put("/:id", editionCtrl.updateEdition)
router.delete("/:id", editionCtrl.deleteEdition)

module.exports = router
