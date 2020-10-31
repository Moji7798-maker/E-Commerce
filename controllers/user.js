const User = require("../models/User");
const { showError } = require("../helpers/helpers");
const { validationResult } = require("express-validator");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: {
          notif: "دسترسی ممکن نیست",
        },
      });
    }

    req.profile = user;
    next();
  });
};

exports.readProfile = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.profile.active = undefined;
  req.profile.resetPasswordLink = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.history = undefined;
  req.profile.role = undefined;

  return res.json(req.profile);
};

exports.updateProfile = (req, res) => {
  const { email, userName, phoneNumber, province, county, address } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: { email, userName, phoneNumber, province, county, address } },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(401).json({
            error: {
              notif: "شما اجازه دسترسی به این سرویس را ندارید",
            },
          });
        }

        user.hashed_password = undefined;
        user.salt = undefined;
        return res.json(user);
      }
    );
  }
};
