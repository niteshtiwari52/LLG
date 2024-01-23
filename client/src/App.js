import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getMyDetailsAction,
  getUserDetailsAction,
} from "./redux/reducers/user/user.action";

// PAges
// import Checkout from "./pages/Checkout.Page";
// import GoogleAuth from "./pages/GoogleAuth.Page";
import Home from "./pages/Home.Page";

import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import LandingPage from "./components/Welcome/LandingPage";
import { leaderboardDetailsAction } from "./redux/reducers/leaderboard/leaderboard.action";
import { fetchAllAttemptedQuizesAction } from "./redux/reducers/quiz/quiz.action";
// import Restaurant from "./pages/Restaurant.Page";

// components
// import Overview from "./components/Restaurant/Overview";
// import OrderOnline from "./components/Restaurant/OrderOnline";
// import Menu from "./components/Restaurant/Menu";
// import Reviews from "./components/Restaurant/Reviews";
// import Photos from "./components/Restaurant/Photos";
// import RestaurantLayout from "./layouts/Restaurant.layout";
// import { getCart } from "./redux/reducers/cart/cart.action";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyDetailsAction());
    dispatch(getUserDetailsAction());
    dispatch(leaderboardDetailsAction());
    dispatch(fetchAllAttemptedQuizesAction());
    // dispatch(getCart());
  }, [localStorage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={navigate("/user-details")} />
        <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* <Route path="/dashboard" element={<Home />} /> */}
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        {/* <Route path="/" element={<Home />} /> */}

        {/* <Route path="/:type" element={<Home />} />
        <Route path="/google/:token" element={<GoogleAuth />} /> */}
        {/* <Route path="/restaurant/:id" element={<RedirectRestaurant />} /> */}
        {/* <Route
          path="/restaurant/:id"
          element={
            <RestaurantLayout>
              <Restaurant />
            </RestaurantLayout>
          }
        > */}
        {/* <Route path="overview" element={<Overview />} />
          <Route path="order-online" element={<OrderOnline />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="menu" element={<Menu />} />
          <Route path="photos" element={<Photos />} />
        </Route>
        <Route path="/checkout/orders" element={<Checkout />} /> */}
      </Routes>
    </>
  );
}

export default App;
