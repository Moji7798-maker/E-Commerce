import jwt_decode from "jwt-decode";
import { prices } from "./assets/fixedPrices";

export const format = (num) => {
  return ("" + num).replace(
    /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
    function (m, s1, s2) {
      return s2 || s1 + ",";
    }
  );
};

const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const persianRegex = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const latinRegex = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
const latinNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const fixDigit = (num) => {
  num = format(num);
  for (let i = 0; i < 10; i++) {
    num = num.toString().replace(latinRegex[i], persianNumbers[i]);
  }
  return num;
};

export const persianToLatin = (num) => {
  for (let i = 0; i < 10; i++) {
    num = num.toString().replace(persianRegex[i], latinNumbers[i]);
  }
  return num;
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ecom-jwt", data);
    next();
  }
};

export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("ecom-jwt")) {
    if (!checkForExpiration()) {
      return false;
    }
    return localStorage.getItem("ecom-jwt");
  } else {
    return false;
  }
};

export const checkForExpiration = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("ecom-jwt")) {
      const now = Date.now() / 1000;
      const decoded = jwt_decode(localStorage.getItem("ecom-jwt"));
      if (decoded.exp < now) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export const setInputFilter = (textbox, inputFilter) => {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.forEach((t) => {
      t.current.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  });
};

export const makePriceRanges = (value) => {
  let data = prices;
  let array = [];

  for (let key in data) {
    if (data[key]._id === parseInt(value)) {
      array = data[key].array;
    }
  }

  return array;
};

export const addItemToCart = (item, next) => {
  let cart = [];
  let newItem = {};
  if (typeof window !== "undefined") {
    if (localStorage.getItem("ecommerce-cart")) {
      cart = JSON.parse(localStorage.getItem("ecommerce-cart"));
    }

    const isAvailable = cart.find((a, i) => a._id === item._id);
    if (isAvailable) {
      cart.map((a, i) => {
        if (a._id === item._id) {
          a.count += 1;
          newItem = a;
          return newItem;
        } else return a;
      });
    } else {
      newItem = { ...item, count: 1 };
      cart.push(newItem);
    }

    localStorage.setItem("ecommerce-cart", JSON.stringify(cart));

    next(newItem);
  }
};

export const updateCart = (item, count, next) => {
  let cart = [];
  let updatedItem = {};
  if (typeof window !== "undefined") {
    if (localStorage.getItem("ecommerce-cart")) {
      cart = JSON.parse(localStorage.getItem("ecommerce-cart"));
    }

    cart.map((a, i) => {
      if (a._id === item._id) {
        a.count = count;
        updatedItem = a;
        return updatedItem;
      } else return a;
    });

    localStorage.setItem("ecommerce-cart", JSON.stringify(cart));

    next(updatedItem);
  }
};

export const deletefromCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("ecommerce-cart")) {
      cart = JSON.parse(localStorage.getItem("ecommerce-cart"));
    }

    cart = cart.filter((a, i) => a._id !== item._id);

    localStorage.setItem("ecommerce-cart", JSON.stringify(cart));

    next(item);
  }
};
