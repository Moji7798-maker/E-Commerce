const express = require("express");
const router = express.Router();

// load controllers
const { isAdmin, isAuth, requireSignin } = require("../controllers/auth");

const {
  categoryById,
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// load validators
const { validateCategory } = require("../validators/category");
const { userById } = require("../controllers/user");

// GET api/category/:categoryId
// get a specific category
// @ public
router.get("/:categoryId", getCategory);

// GET api/category/categories
// get all the categories
// @ public
router.get("/", getCategories);

// POST api/category/create/:userId
// create a category
// @ private
router.post(
  "/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  validateCategory,
  createCategory
);

// PUT api/category/update/:categoryId/:userId
// update a category
// @ private
router.put(
  "/update/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  validateCategory,
  updateCategory
);

// DELETE api/category/delete/:categoryId/:userId
// delete a category
// @ private
router.delete(
  "/delete/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteCategory
);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
