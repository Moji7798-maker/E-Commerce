const { check } = require("express-validator");

exports.validateCreate = [
  check("name", "نام محصول را وارد کنید")
    .notEmpty()
    .isLength({ min: 3, max: 32 })
    .withMessage("نام شما باید بین ۳ و ۳۲ کاراکتر باشد"),
  check("newPrice", "قیمت محصول را وارد کنید").notEmpty(),
  check("description", "توضیحات محصول را وارد کنید").notEmpty(),
  check("quantity", "تعداد موجود از محصول را وارد کنید").notEmpty(),
  check("category", " دسته بندی محصول را انتخاب کنید").notEmpty(),
  check("photos", "تصویر محصول را انتخاب کنید").notEmpty(),
];
