const { Product, Image } = require("../models/Product");
const Category = require("../models/Category");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { search } = require("../routes/product");

module.exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: {
            debug: "چنین محصولی وجود ندارد.",
          },
        });
      }

      req.product = product;
      next();
    });
};

module.exports.getProduct = (req, res) => {
  Category.find({}).then((categories) => {
    if (categories) {
      req.product.photos = undefined;
      return res.json({
        product: req.product,
        categories,
      });
    }
  });
};

module.exports.getProducts = (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  console.log(sortBy, order, limit);

  Product.find()
    .select("-photos")
    .sort({ [sortBy]: order })
    .populate("category")
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: {
            notif: "محصولی وجود ندارد",
          },
        });
      }

      return res.json(products);
    });
};

// TODO: 4 photo maximum allowed
module.exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: {
          notif: "مشکلی در ذخیره کردن تصویر پیش آمد.",
        },
      });
    }

    const { name, description, newPrice, category, quantity } = fields;

    if (!name || !description || !newPrice || !category || !quantity) {
      return res.status(400).json({
        error: {
          notif: "همه ی فیلد ها لازم است",
        },
      });
    }
    let product = new Product(fields);

    if (Object.keys(files).some((p) => p.includes("photo"))) {
      if (
        Array.from(Object.keys(files)).reduce((t, p) => t + files[p].size, 0) >
        2000000
      ) {
        return res.status(400).json({
          error: {
            notif:
              "ماکسیمم حجم تمام عکس ها نباید بیشتر از ۲" + " mb" + " باشد.",
          },
        });
      }
      const photos = Array.from(Object.keys(files)).map((p, i) => {
        const photo = new Image({
          name: files[p].name,
          photo: {
            data: fs.readFileSync(files[p].path),
            contentType: files[p].type,
          },
        });
        return photo;
      });

      product.photos = photos;
    }

    product
      .save()
      .then((newProduct) => {
        res.json({ newProduct, message: "محصول جدید ساخته شد." });
      })
      .catch((err) => {
        console.log(err);
        res.status(501).json({
          error: {
            notif: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
          },
        });
      });
  });
  // }
};

module.exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: {
          notif: "مشکلی در ذخیره کردن تصویر پیش آمد.",
        },
      });
    }

    let product = req.product;
    console.log(product);
    product = _.extend(product, fields);
    console.log(product);
    if (Object.keys(files).some((p) => p.includes("photo"))) {
      if (
        Array.from(Object.keys(files)).reduce((t, p) => t + files[p].size, 0) >
        2000000
      ) {
        return res.status(400).json({
          error: {
            notif:
              "ماکسیمم حجم تمام عکس ها نباید بیشتر از ۲" + " mb" + " باشد.",
          },
        });
      }
      const photos = Array.from(Object.keys(files)).map((p, i) => {
        const photo = new Image({
          name: files[p].name,
          photo: {
            data: fs.readFileSync(files[p].path),
            contentType: files[p].type,
          },
        });
        return photo;
      });

      product.photos = photos;
    }

    product
      .save()
      .then((updatedProduct) => {
        res.json({ updatedProduct, message: "محصول به روز رسانی شد." });
      })
      .catch((err) =>
        res.status(500).json({
          error: {
            notif: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
          },
        })
      );
  });
};

module.exports.deleteProduct = (req, res) => {
  const product = req.product;

  product
    .remove()
    .then((success) => {
      if (success) {
        return res.json({ message: "محصول حذف شد." });
      }
    })
    .catch((err) =>
      res.status(400).json({
        error: {
          notif: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
        },
      })
    );
};

module.exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(404).json({
        error: {
          debug: "محصولی پیدا نشد.",
        },
      });
    }

    res.json(categories);
  });
};

module.exports.getPhoto = (req, res, next) => {
  console.log(req.product);
  if (req.product.photos[0].photo.data) {
    res.set("Content-Type", req.product.photos[0].photo.contentType);
    return res.send(req.product.photos[0].photo.data);
  }

  next();
};

module.exports.getPhotos = (req, res, next) => {
  const index = req.params.index;
  if (req.product.photos[index].photo.data) {
    res.set("Content-Type", req.product.photos[index].photo.contentType);
    return res.send(req.product.photos[index].photo.data);
  }

  next();
};

module.exports.getPhotosLength = (req, res) => {
  return res.json(req.product.photos.length);
};

module.exports.filterProducts = (req, res) => {
  const skip = parseInt(req.body.skip);
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const order = req.body.order ? req.body.order : -1;
  const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  const filters = req.body.filters;

  const filterArgs = {};

  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "newPrice") {
        filterArgs[key] = {
          $gte: filters[key][0],
          $lte: filters[key][1],
        };
      } else {
        filterArgs[key] = filters[key];
      }
    }
  }

  Product.find(filterArgs)
    .select("-photo")
    .populate("category")
    .sort({ [sortBy]: order })
    .limit(limit)
    .skip(skip)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(404).json({
          error: {
            notif: "محصولی وجود ندارد",
          },
        });
      }

      return res.json({ products, size: products.length });
    });
};

module.exports.relatedProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find({
    _id: { $ne: req.product._id },
    category: req.product.category,
  })
    .populate("category")
    .limit(limit)
    .then((products) => {
      if (products) {
        res.json(products);
      } else {
        res.status(400).json({ message: "محصول مرتبطی وجود ندارد" });
      }
    })
    .catch((err) =>
      res.status(400).json({
        error: {
          debug: "مشکلی در گرفتن محصولات مرتبط پیش آمد.",
        },
      })
    );
};

module.exports.getSearchResult = (req, res) => {
  let query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }

  Product.find(query)
    .populate("category")
    .select("-photos")
    .then((products) => {
      if (products) {
        return res.json(products);
      } else {
        return res
          .status(400)
          .json({ error: { message: "محصولی وجود ندارد." } });
      }
    })
    .catch(
      (err) => res.status(400).json(err)
      // .json({ error: { notif: "مشکلی پیش آمد لطفا دوباره امتحان کنید." } })
    );
};
