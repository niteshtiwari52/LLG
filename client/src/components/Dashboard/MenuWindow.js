import React from "react";
import { useParams } from "react-router-dom";

// Components
import UserDetails from "./User/UserDetails";
import NewQuiz from "./Quiz/NewQuiz";
import SubmittedQuiz from "./SubmittedQuiz/SubmittedQuiz";
import Leaderboard from "./Leaderboard/Leaderboard";

const MenuWindow = (props) => {
  const { menuID, setMenuID } = props;

  let componentToRender;

  // Conditionally set the component based on menuID
  if (menuID === 1) {
    componentToRender = <UserDetails />;
  } else if (menuID === 2) {
    componentToRender = <NewQuiz />;
  } else if (menuID === 3) {
    componentToRender = <SubmittedQuiz />;
  } else if (menuID === 4) {
    componentToRender = <Leaderboard />;
  } else {
    // Handle other cases or set a default component
    componentToRender = <p>Invalid menuID</p>;
  }
  return <>{componentToRender}</>;
};

export default MenuWindow;
