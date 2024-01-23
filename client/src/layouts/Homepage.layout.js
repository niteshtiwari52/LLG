import React from "react";
// import Navbar from "../components/Navbar";
// import FoodTab from "../components/FoodTab";

const HomepageLayout =
  (Components) =>
  ({ ...props }) => {
    return (
      <>
        {/* <Navbar />
        <FoodTab /> */}
        {/* <div className="container mx-auto px-4 lg:px-20"> */}
        <Components {...props} />
        {/* </div> */}
      </>
    );
  };

export default HomepageLayout;
