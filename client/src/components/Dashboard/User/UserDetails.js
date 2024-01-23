import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction } from "../../../redux/reducers/user/user.action";

const UserDetails = () => {
  const dispatch = useDispatch();
  const selfUserDetails = useSelector(
    (globalState) => globalState.user.selfUserDetails
  );

  useEffect(() => {
    dispatch(getUserDetailsAction());
  }, []);

  return (
    <>
      <div className="my-4 max-w-screen-md w-3/4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div className="shrink-0 mr-auto sm:py-3 w-full">
            <p className="font-medium text-3xl text-center">
              Account Details and User Performance
            </p>
          </div>
        </div>

        <div className="flow-root mt-4">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Full Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {selfUserDetails ? selfUserDetails.userName : "loading..."}
              </dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {selfUserDetails ? selfUserDetails.userEmail : "loading..."}
              </dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Average Score</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {selfUserDetails
                  ? selfUserDetails.userAverageScore
                  : "loading..."}
              </dd>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Leaderboard Rank</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {selfUserDetails
                  ? selfUserDetails.userLeaderboardRank
                  : "loading..."}
              </dd>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">
                Total Quizes Attempted
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                {selfUserDetails
                  ? selfUserDetails.userAttemptedQuizes.length
                  : "loading..."}
              </dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Note</dt>
              <dd className="text-gray-700 sm:col-span-2">
                You Started well. If you want to improve your language
                participate in more quizes.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
