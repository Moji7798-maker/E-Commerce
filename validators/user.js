const { check } = require("express-validator");

exports.validateUpdateProfile = [
  check("userName")
    .optional()
    .isLength({ min: 3, max: 32 })
    .withMessage("نام کاربری شما باید بین ۳ و ۳۲ کاراکتر باشد"),
  check("phoneNumber", "تلفن همراه خود را وارد کنید").notEmpty(),
  check("email", "ایمیل خود را وارد کنید")
    .notEmpty()
    .isEmail()
    .withMessage("ایمیل معتبر نیست"),
  check("address")
    .optional()
    .isLength({ min: 10, max: 256 })
    .withMessage("کاراکتر بیش از اندازه"),
];
