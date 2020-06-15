const Patient = require("../models/patientModel")
const CustomError = require("../utils/CustomError")
const path = require("path")

// @desc    Get all patients records
// @route   GET /api/v1/patients
// @access  public

exports.getAllPateients = async (req, res, next) => {
    try {
        const patients = await Patient.find()
        res.status(201).json({ success: true, data: patients })
    } catch (err) {
        next(err)
    }

}

// @desc    Get single patient record
// @route   GET /api/v1/patients/:id
// @access  public

exports.getPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        if (!patient) {
            return next(
                new CustomError(`Patient Not Found With Id Of ${req.params.id}`, 404)
            )
        }
        res.status(201).json({ success: true, data: patient })
    } catch (err) {
        next(err)
    }
}

// @desc    Create new patient record
// @route   POST /api/v1/patients
// @access  admin, publisher

exports.createPatient = async (req, res, next) => {

    try {
        const patient = await Patient.create(req.body)
        patient.creator = req.user.id
        await patient.save()
        res.status(201).json({ success: true, data: patient })
    } catch (err) {
        next(err)
    }
}

// @desc    Update  patient record
// @route   PUT /api/v1/patients/:id
// @access   admin,publisher

exports.updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!patient) {
            return next(new CustomError(`Patient Not Found With Id Of ${req.params.id}`, 404))
        }
        res.status(201).json({ success: true, data: patient })

    } catch (err) {
        next(err)
    }
}

// @desc    Delete patient record
// @route   Delete /api/v1/patients/:id
// @access   admin,publisher

exports.deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id)

        if (!patient) return next(new CustomError(`Patient Not Found With Id Of ${req.params.id}`, 404))

        res.status(201).json({ success: true, data: {} })
    } catch (err) {
        next(err)
    }
}

// @desc    Upload  patient image
// @route   PUT /api/v1/patients/:id/photo
// @access   PRivate

exports.photoUpload = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id)

        if (!patient) return next(new CustomError(`Patient Not Found With Id Of ${req.params.id}`, 404))


        if (!req.files) {
            return next(
                new CustomError("Please upload a file", 400)
            )
        }
        const file = req.files.file

        //check if file is image
        if (!file.mimetype.startsWith('image')) {
            return next(
                new CustomError('Please choose a image file', 400)
            )
        }

        //check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(
                new CustomError(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
            )
        }

        //filename
        file.name = `photo_${patient.id}${path.parse(file.name).ext}`
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.log(err)
                return next(
                    new CustomError('Problem with file upload', 500)
                )
            }

            await Patient.findByIdAndUpdate(req.params.id, { image: file.name })
            res.status(200).json({ success: true, data: file.name })

        })

    } catch (err) {
        next(err)
    }
}



