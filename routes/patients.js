const router = require("express").Router()
const { protect } = require("../middleware/protect")

const { getAllPateients, getPatient, createPatient, updatePatient, deletePatient, photoUpload } = require("../controllers/patients")

router
    .route("/")
    .get(getAllPateients)
    .post(protect, createPatient)

router
    .route("/:id/photo")
    .put(photoUpload)

router
    .route("/:id")
    .get(getPatient)
    .put(protect, updatePatient)
    .delete(protect, deletePatient)

module.exports = router