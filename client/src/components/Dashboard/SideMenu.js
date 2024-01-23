import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCheckSquare } from "react-icons/fa";
import { MdQuiz, MdLeaderboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { selectMenuAction } from "../../redux/reducers/menu/menu.action";
import { signOutAction } from "../../redux/reducers/auth/auth.action";
import { clearUserAction } from "../../redux/reducers/user/user.action";
import { clearLeaderboardAction } from "../../redux/reducers/leaderboard/leaderboard.action";
import { clearQuizAction } from "../../redux/reducers/quiz/quiz.action";

const SideMenu = (props) => {
  const { menuID, setMenuID } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const features = [
    {
      featureId: 1,
      featureName: "User Detail",
      featureUrl: "user-details",
      featureIcon: FaUser,
    },
    {
      featureId: 2,
      featureName: "New Quiz",
      featureUrl: "new-quiz",
      featureIcon: MdQuiz,
    },
    {
      featureId: 3,
      featureName: "Submitted Quiz",
      featureUrl: "submitted-quiz",
      featureIcon: FaCheckSquare,
    },
    {
      featureId: 4,
      featureName: "Leaderboard",
      featureUrl: "leaderboard",
      featureIcon: MdLeaderboard,
    },
  ];

  const handleClickSetMenu = (item) => {
    dispatch(selectMenuAction(item));
  };
  const handleClickSignOut = async () => {
    // alert("signout");
    await dispatch(signOutAction());
    await dispatch(clearUserAction());
    await dispatch(selectMenuAction({}));
    await dispatch(clearLeaderboardAction());
    await dispatch(clearQuizAction());

    navigate("/");
  };
  useEffect(() => {
    handleClickSetMenu({
      featureId: 1,
      featureName: "User Detail",
      featureUrl: "user-details",
      featureIcon: "FaUser",
    });
  }, []);

  return (
    <>
      <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
          <div className="inline-flex h-16 w-16 items-center justify-center">
            <span className="grid h-10 w-10 place-content-center rounded-lg bg-teal-100 text-xs text-gray-600">
              LLG
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                {features.map((item, index) => (
                  <>
                    <li key={index + 1}>
                      <button
                        onClick={() => handleClickSetMenu(item)}
                        className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-teal-200 hover:text-teal-700 ${
                          item.featureId === menuID
                            ? `bg-teal-200 text-teal-700`
                            : `text-teal-500`
                        }  `}
                      >
                        <item.featureIcon className="h-5 w-5 opacity-75" />
                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                          {item.featureName}
                        </span>
                      </button>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          {/* <form action="/logout"> */}
          <button
            // type="submit"
            onClick={handleClickSignOut}
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-teal-500 hover:bg-teal-200 hover:text-teal-700"
          >
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg> */}
            <HiOutlineLogout className="h-5 w-5 opacity-75" />

            <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
              Logout
            </span>
          </button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
