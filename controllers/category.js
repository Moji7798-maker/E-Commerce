const User = require("../models/User");
const Category = require("../models/Category");
const { showError } = require("../helpers/helpers");
const { validationResult } = require("express-validator");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: {
          debug: "چنین دسته ای وجود ندارد.",
        },
      });
    }

    req.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  Category.findById(req.category._id)
    .then((category) => {
      if (category) {
        return res.json(category);
      } else {
        return res.status(400).json({
          error: {
            notif: "دسته ای یا این نشانی وجود ندارد.",
          },
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: {
          notif: "مشکلی یه وجود آمد. دوباره امتحان کنید.",
        },
      });
    });
};

exports.getCategories = (req, res) => {
  Category.find({})
    .then((categories) => {
      if (categories) {
        return res.json(categories);
      } else {
        return res.status(400).json({
          error: {
            notif: "دسته ای وجود ندارد",
          },
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: {
          notif: "مشکلی یه وجود آمد. دوباره امتحان کنید.",
        },
      });
    });
};

exports.createCategory = (req, res) => {
  const { categoryName } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    Category.findOne({ name: categoryName })
      .then((category) => {
        if (category) {
          return res.status(400).json({
            error: {
              notif: "این نام قبلا استفاده شده است.",
            },
          });
        } else {
          const newCategory = new Category({
            name: categoryName,
          });

          newCategory
            .save()
            .then((category) => {
              return res.json({
                category,
                message: category.name + " " + "به دسته بندی ها اضافه شد.",
              });
            })
            .catch((err) => {
              return res.status(400).json({
                error: {
                  notif: "مشکلی یه وجود آمد. دوباره امتحان کنید.",
                },
              });
            });
        }
      })
      .catch((err) =>
        res.status(400).json({
          error: {
            notif: "مشکلی یه وجود آمد. دوباره امتحان کنید.",
          },
        })
      );
  }
};

exports.updateCategory = (req, res) => {
  const { categoryName } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    Category.findOneAndUpdate(
      { _id: req.category._id },
      {
        $set: {
          name: categoryName,
        },
      },
      { new: true }
    )
      .then((category) =>
        res.json({ category, message: "دسته بندی به روز شد." })
      )
      .catch((err) =>
        res.status(400).json({
          error: {
            notif: "مشکلی به وجود آمد.لطفا دوباره تلاش کنید.",
          },
        })
      );
  }
};

exports.deleteCategory = (req, res) => {
  Category.findOneAndDelete({ _id: req.category._id })
    .then((success) => res.json({ message: "دسته حذف شد." }))
    .catch((err) =>
      res.status(400).json({
        error: {
          notif: "مشکلی به وجود آمد.لطفا دوباره تلاش کنید.",
        },
      })
    );
};
