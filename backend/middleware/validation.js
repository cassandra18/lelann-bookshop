const { body, validationResult } = require('express-validator');
const { isPasswordStrong } = require('../utils/passwordCheck'); 

const validateRegisterInput = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').custom((value) => {
        if (!isPasswordStrong(value)) {
            throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateRegisterInput };