const { check } = require("express-validator");

exports.validateCategory = [
  check("categoryName", "نام دسته را وارد کنید")
    .notEmpty()
    .isLength({ min: 2, max: 32 })
    .withMessage("نام دسته باید بین ۲ و ۳۲ کاراکتر باشد."),
];
