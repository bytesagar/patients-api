const router = require("express").Router()
const { protect, authorize } = require("../middleware/protect")

const { getAllPateients, getPatient, createPatient, updatePatient, deletePatient, photoUpload } = require("../controllers/patients")

router
    .route("/")
    .get(getAllPateients)
    .post(protect, authorize('staff', 'doctor'), createPatient)

router
    .route("/:id/photo")
    .put(protect, authorize('staff', 'doctor'), photoUpload)

router
    .route("/:id")
    .get(getPatient)
    .put(protect, authorize('staff', 'doctor'), updatePatient)
    .delete(protect, authorize('staff', 'doctor'), deletePatient)

module.exports = router