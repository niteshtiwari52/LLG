import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Layout
import HomeLayout from "../layouts/Homepage.layout";

// component
import UserDashboard from "../components/Dashboard/UserDashboard";
import LandingPage from "../components/Welcome/LandingPage";
import Signin from "../components/Auth/Signin";
import Navbar from "../components/NavigationBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyDetailsAction } from "../redux/reducers/user/user.action";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // data from redux store
  const user = useSelector((globalState) => globalState.user.selfUser);
  // console.log(user);

  // useEffect(() => {
  //   dispatch(getMyDetailsAction());
  //   // dispatch(getCart());
  // }, [localStorage]);

  useEffect(() => {
    // console.log(user);
    if (user && user.fullname) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  // useEffect(() => {
  //   if (isUserLoggedIn) {
  //     navigate("/dashboard");
  //   }
  // }, [isUserLoggedIn]);

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <UserDashboard />
        </>
      ) : (
        <>
          <div className="container mx-auto px-4 lg:px-20">
            {/* <Navbar /> */}
            <LandingPage />
          </div>
        </>
      )}
    </>
  );
};

export default HomeLayout(Home);
