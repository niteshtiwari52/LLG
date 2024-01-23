import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthErrorAction,
  signUpAction,
} from "../../redux/reducers/auth/auth.action";
import { getMyDetailsAction } from "../../redux/reducers/user/user.action";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialData = {
    fullname: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // data from redux store
  const authResponse = useSelector((globalState) => globalState.auth);
  const user = useSelector((globalState) => globalState.user.selfUser);
  const signupError = useSelector(
    (globalState) => globalState.auth.signupError
  );
  // console.log(user);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    if (authResponse && authResponse.success == true) {
      navigate("/");
    } else if (authResponse && authResponse.signupError.error) {
      alert(authResponse.signupError.error);
      setLoading(false);
      setFormData(initialData);
      dispatch(clearAuthErrorAction());
      navigate("/auth/signin");
    } else {
      return console.log("Sign up  in fails");
    }
  }, [authResponse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate form data
  const validateFormData = (data) => {
    const errors = [];

    // Validate each field
    if (!data.fullname) {
      errors.push("full name is required");
    }

    if (!data.email || !isValidEmail(data.email)) {
      errors.push("Valid email is required");
    }

    if (!data.password || data.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    // Add more validation checks for other fields if needed

    return errors;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // You can use a regular expression or a more advanced email validation library
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks
    const validationErrors = validateFormData(formData);

    if (validationErrors.length === 0) {
      // No validation errors, proceed with sign-up
      await dispatch(signUpAction(formData));
      await dispatch(getMyDetailsAction());
    } else {
      validationErrors.map((item) => alert(item));
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordVisible((passwordVisible) => !passwordVisible);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
            Welcome to{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/")}
            >
              LLG
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Awasome !! You chosen right platform. Let's start Practice by Signup
          </p>

          <form
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Create LLG Account
            </p>
            <div>
              <label htmlFor="fullName" className="sr-only">
                fullname
              </label>

              <div className="relative">
                <input
                  type="fullname"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-teal-600"
                  placeholder="Enter Full Name"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <FaRegUser className="text-gray-400" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-teal-600"
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineAlternateEmail className="text-gray-400" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-teal-600"
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {passwordVisible ? (
                    <FaRegEyeSlash
                      onClick={togglePassword}
                      className="text-gray-400"
                    />
                  ) : (
                    <FaRegEye
                      onClick={togglePassword}
                      className="text-gray-400"
                    />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`block w-full  rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700`}
              onClick={handleSubmit}
            >
              {loading ? "Please Wait...." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?{" "}
              <span
                className="underline cursor-pointer text-teal-500"
                onClick={() => navigate("/auth/signin")}
              >
                Sign In
              </span>
              {/* <a className="underline" href="">
                Sign In
              </a> */}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
