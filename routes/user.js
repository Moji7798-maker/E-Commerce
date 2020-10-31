const express = require("express");

// load controllers
const {
  register,
  activate,
  resendActivationEmail,
  login,
  forgetPassword,
  resetPassword,
  requireSignin,
  isAuth,
} = require("../controllers/auth");

// load validators
const {
  validateRegister,
  validateLogin,
  validateForget,
  validateReset,
} = require("../validators/auth");

const { validateUpdateProfile } = require("../validators/user");

const { userById, readProfile, updateProfile } = require("../controllers/user");

const router = express.Router();

// GET api/user/test
// for testing
// @ public
router.get("/test", (req, res) => {
  res.send("welcome");
});

// POST api/user/register
// register user
// @ public
router.post("/register", validateRegister, register);

// POST api/user/activate
// activate user account
// @ public
router.post("/activate", activate);

// POST api/user/resend
// resend verification email
// @ public
router.post("/resend", resendActivationEmail);

// POST api/user/login
// login user
// @ public
router.post("/login", validateLogin, login);

// POST api/user/password/forget
// retrive user's forgotten passwprd
// @ public
router.post("/password/forget", validateForget, forgetPassword);

// POST api/user/password/reset
// reset user's forgotten passwprd
// @ public
router.post("/password/reset", validateReset, resetPassword);

// GET api/user/:userId
// get user data
// @ private
router.get("/:userId", requireSignin, isAuth, readProfile);

// PUT api/user/update/:userId
// update user data
// @ private
router.put(
  "/update/:userId",
  requireSignin,
  isAuth,
  validateUpdateProfile,
  updateProfile
);

router.param("userId", userById);

module.exports = router;
