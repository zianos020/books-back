const {check, validationResult} = require("express-validator")

exports.registervalidation = () =>[
    check("name", "name is required!").not().isEmpty(),
    check("email", "email is required!").isEmail(),
    check("password", "password is required!").isLength({min :6})
]

exports.loginValidation = () => [
    check("email", "email is required!").isEmail(),
    check("password", "password is required!").isLength({min :6})
]

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}