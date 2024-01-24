import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthErrorAction,
  signInAction,
} from "../../redux/reducers/auth/auth.action";
import { getMyDetailsAction } from "../../redux/reducers/user/user.action";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialData = {
    email: "",
    password: "",
  };
  // States
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // data from redux store
  const authResponse = useSelector((globalState) => globalState.auth);

  const user = useSelector((globalState) => globalState.user.selfUser);
  // console.log(user);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  useEffect(() => {
    if (authResponse && authResponse.success == true) {
      navigate("/");
    } else if (authResponse && authResponse.signinError.error) {
      alert(authResponse.signinError.error);
      setLoading(false);
      setFormData(initialData);
      dispatch(clearAuthErrorAction());
    } else {
      return;
    }
  }, [authResponse]);
  // Functions
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to validate form data
  const validateFormData = (data) => {
    const errors = [];

    // Validate each field

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
    // Add your signin logic here
    // setLoading(true);
    // await dispatch(signInAction(formData));
    // await dispatch(getMyDetailsAction());

    // setFormData(initialData);
    // navigate("/");
    // console.log("Form submitted:", formData);
    e.preventDefault();
    setLoading(true);

    // Validation checks
    const validationErrors = validateFormData(formData);

    if (validationErrors.length === 0) {
      // No validation errors, proceed with sign-up
      await dispatch(signInAction(formData));
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
            Welcome Back to{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/")}
            >
              LLG
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Practice makes person perfect. Let's start Practice
          </p>

          <form
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

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
              className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700"
              onClick={handleSubmit}
            >
              {loading ? "Please Wait...." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?{" "}
              <span
                className="underline cursor-pointer text-teal-600"
                onClick={() => navigate("/auth/signup")}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
    // <div className="min-h-screen flex items-center justify-center">
    //   <form className="max-w-md p-6 bg-white rounded-md shadow-md">
    //     <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
    //     <div className="mb-4">
    //       <label htmlFor="email" className="block text-gray-600 mb-2">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
    //       />
    //     </div>
    //     <div className="mb-6">
    //       <label htmlFor="password" className="block text-gray-600 mb-2">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       onClick={handleSubmit}
    //       className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
    //     >
    //       Sign In
    //     </button>
    //   </form>
    // </div>
  );
};

export default Signin;
