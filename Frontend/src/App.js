import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Common/Home";
import Signin from "./Components/User/Signin";
import Signup from "./Components/User/Signup";
import Activate from "./Components/User/Activate";
import ForgetPassword from "./Components/User/ForgetPassword";
import ResetPassword from "./Components/User/ResetPassword";
import UserDashBoard from "./Components/User/UserDashBoard";
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
import AdminRoute from "./Components/Helper/AdminRoute";
import PrivateRoute from "./Components/Helper/PrivateRoute";
import UpdateProfile from "./Components/User/UpdateProfile";
import CreateCategory from "./Components/Admin/CreateCategory";
import ViewCategories from "./Components/Admin/ViewCategories";
import UpdateCategory from "./Components/Admin/UpdateCategory";
import CreateProduct from "./Components/Admin/CreateProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import ViewProducts from "./Components/Admin/ViewProducts";
import Shop from "./Components/Common/Shop";
import ProductPage from "./Components/Common/ProductPage";
import Cart from "./Components/Common/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/activate/:hash/:userId" component={Activate} />
          <Route path="/password/forget" component={ForgetPassword} />
          <Route path="/password/reset/:token" component={ResetPassword} />
          <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
          <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
          <PrivateRoute path="/profile/update" component={UpdateProfile} />
          <AdminRoute path="/create/category" component={CreateCategory} />
          <AdminRoute path="/category/all" component={ViewCategories} />
          <AdminRoute
            path="/product/update/:productId"
            component={UpdateProduct}
          />
          {/* show preview of photos */}
          <AdminRoute path="/products/update" component={ViewProducts} />
          {/* Search between products feature */}
          <AdminRoute
            path="/category/update/:categoryId"
            component={UpdateCategory}
          />
          <AdminRoute path="/product/create" component={CreateProduct} />
          {/* show preview of photos */}
          <Route path="/shop" component={Shop} />
          {/* Load More */}
          <Route path={"/product/:productId"} component={ProductPage} />
          {/* make feature for making price ranges */}
          <Route path="/cart" component={Cart} />
          {/* discount coupons */}
          {/* purchase process */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
