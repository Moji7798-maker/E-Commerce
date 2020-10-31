const express = require("express");

const router = express.Router();

// load controllers
const {
  productById,
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories,
  getPhoto,
  getPhotos,
  getPhotosLength,
  filterProducts,
  relatedProduct,
  getSearchResult,
} = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { validateCreate } = require("../validators/product");

// GET api/product/:productId
// get a product
// @ public
router.get("/:productId", getProduct);

// GET api/product
// get all the products
// @ public
router.get("/", getProducts);

// POST api/product/create
// create a product
// @ private
router.post(
  "/create/:userId",
  validateCreate,
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);

// PUT api/product/update/:productId/:userId
// update a product
// @ private
router.put(
  "/update/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
);

// DELETE api/product/delete/:productId/:userId
// delete a product
// @ private
router.delete(
  "/delete/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteProduct
);

// GET api/product/categories
// get categories of a product
// @ public
router.get("/categories", listCategories);

// GET api/product/photo/:productId
// get a corresponding product photo
// @ public
router.get("/photo/:productId", getPhoto);

// GET api/product/photos/:productId
// get a corresponding product photos
// @ public
router.get("/photo/:productId/:index", getPhotos);

// GET api/product/photos/length/:productId
// get a corresponding product photos length
// @ public
router.get("/photosLength/:productId", getPhotosLength);

// POST api/product/by/filter
// get filtered products
// @ public
router.post("/by/filter", filterProducts);

// GET api/product/related/:productId
// get related products of a specefic product
// @ public
router.get("/related/:productId", relatedProduct);

// GET api/product/by/seacrh
// get produts based on search query
// @ public
router.get("/by/search", getSearchResult);

router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
