const { check } = require("express-validator");

exports.validateRegister = [
  check("name", "نام خود را وارد کنید")
    .notEmpty()
    .isLength({ min: 3, max: 32 })
    .withMessage("نام شما باید بین ۳ و ۳۲ کاراکتر باشد"),
  check("lastName", "نام خانوادگی خود را وارد کنید")
    .notEmpty()
    .isLength({ min: 3, max: 32 })
    .withMessage("نام شما باید بین ۳ و ۳۲ کاراکتر باشد"),
  check("phoneNumber", "تلفن همراه خود را وارد کنید").notEmpty(),
  check("email", "ایمیل خود را وارد کنید")
    .notEmpty()
    .isEmail()
    .withMessage("ایمیل معتبر نیست"),
  check("password", "رمز عبور خود را وارد کنید").notEmpty(),
  check("password")
    .isLength({ min: 8, max: 24 })
    .withMessage("رمز عبور شما باید حداقل ۸ کاراکتر داشته باشد")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,24}$/)
    .withMessage("رمز عبور شما باید شامل حداقل یک عدد و یک حرف بزرگ باشد"),
];

exports.validateLogin = [
  check("email", "ایمیل خود را وارد کنید")
    .notEmpty()
    .isEmail()
    .withMessage("ایمیل معتبر نیست"),
  check("password", "رمز عبور خود را وارد کنید").notEmpty(),
];

exports.validateForget = [
  check("email", "ایمیل خود را وارد کنید")
    .notEmpty()
    .isEmail()
    .withMessage("ایمیل معتبر نیست"),
];

exports.validateReset = [
  check("newPassword", "رمز عبور جدید را وارد کنید").notEmpty(),
  check("newPassword")
    .isLength({ min: 8, max: 24 })
    .withMessage("رمز عبور شما باید حداقل ۸ کاراکتر داشته باشد")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,24}$/)
    .withMessage("رمز عبور شما باید شامل حداقل یک عدد و یک حرف بزرگ باشد"),
];
