import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavigationBar/Navbar";

const LandingPage = () => {
  const naviagte = useNavigate();

  /**
   *  States
   */

  /**
   * Object
   */
  const features = [
    {
      featureId: "1",
      featureName: "Practice Language",
      featureDescription: "A tool for Learn Language",
      featureUrl: "/auth/signin",
    },

    {
      featureId: "2",
      featureName: "Make Friends",
      featureDescription: "A tool for Learn Language",
      // featureUrl: "/auth/signin",
    },
    {
      featureId: "3",
      featureName: "Learn Language",
      featureDescription: "A tool for Learn Language",
      // featureUrl: "/auth/signin",
    },
    {
      featureId: "4",
      featureName: "Practice Quiz",
      featureDescription: "A tool for Learn Language",
      featureUrl: "/auth/signin",
    },
    {
      featureId: "5",
      featureName: "Host Quiz",
      featureDescription: "A tool for Learn Language",
      // featureUrl: "/auth/signin",
    },
    {
      featureId: "1",
      featureName: "Community",
      featureDescription: "A tool for Learn Language",
      // featureUrl: "/auth/signin",
    },
  ];

  /**
   *  Functions
   */
  // Navigating to Sign up page
  const navigateToSignUp = () => {
    naviagte("/auth/signup");
  };
  // Navigating to Sign up page
  const navigateToSignIn = () => {
    naviagte("/auth/signin");
  };
  return (
    <>
      <Navbar />
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Language Learning Game
              </h2>

              <p className="mt-4 text-gray-600">
                Let's Learn, Practice and become Proficient
              </p>
              <button
                onClick={navigateToSignUp}
                className="mt-8 inline-block rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </button>
              {/* <a href="#">Get Started Today</a> */}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {features.map((item) => (
                <>
                  <button
                    key={item.featureId}
                    className="block rounded-xl border border-gray-100 bg-teal-50 p-4 shadow-sm hover:border-teal-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    onClick={() =>
                      item.featureUrl
                        ? naviagte(item.featureUrl)
                        : alert("This feature is in Development Phase. ")
                    }
                  >
                    <span className="inline-block rounded-lg bg-white p-3">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    </span>

                    <h2 className="mt-2 font-bold">{item.featureName}</h2>

                    <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                      {item.featureDescription}
                    </p>
                  </button>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
