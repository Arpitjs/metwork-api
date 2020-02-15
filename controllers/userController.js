let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    let users = await User.find().select('-__v').select('-password')
    res.status(200).json({
        status: 'success',
        total: users.length,
        users
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
    // select: {'owner': 0}
    let user = await User.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        user
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    let updated = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    res.status(200).json({
        status: 'sucess',
        updated
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json(null)
})

exports.checkUsername = async (req, res, next) => {
    User.findOne({ name: req.params.name })
        .then(user => {
            if (!user) {
                return next({ error: 'no such user', status: 404 })
            }
            res.status(200).json(user)
        })
        .catch(e => next(e))
}