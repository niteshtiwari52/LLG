import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderboardDetailsAction } from "../../../redux/reducers/leaderboard/leaderboard.action";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const userID = useSelector((globalState) => globalState.user.selfUser);
  const leaderboardData = useSelector(
    (globalState) => globalState.leaderboard.leaderboardUsers
  );

  useEffect(() => {
    dispatch(leaderboardDetailsAction());
  }, []);
  useEffect(() => {
    if (leaderboardData) {
      console.log(leaderboardData.length);
    }
  }, [leaderboardData]);

  return (
    <>
      <div class="my-4 max-w-screen-md   w-3/4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="shrink-0 mr-auto sm:py-3 w-full">
            <p class="font-medium text-3xl text-center">Leaderboard</p>
            <p class="text-sm text-gray-600 text-center">
              Leaderboard will update frequently
            </p>
          </div>
        </div>

        {/* <div className="flow-root mt-4">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Full Name</dt>
              <dd className="text-gray-700 sm:col-span-2">Nitesh Tiwari</dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2">nitesh1@gmail.com</dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Average Score</dt>
              <dd className="text-gray-700 sm:col-span-2">15</dd>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Leaderboard Rank</dt>
              <dd className="text-gray-700 sm:col-span-2">15</dd>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Last Quiz Score</dt>
              <dd className="text-gray-700 sm:col-span-2">10</dd>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Feedback</dt>
              <dd className="text-gray-700 sm:col-span-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                facilis debitis explicabo doloremque impedit nesciunt dolorem
                facere, dolor quasi veritatis quia fugit aperiam aspernatur
                neque molestiae labore aliquam soluta architecto?
              </dd>
            </div>
          </dl>
        </div> */}
        <div className="overflow-hidden">
          <div class=" overflow-x-auto  overflow-y-auto h-screen-73  rounded-lg border border-gray-200">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="ltr:text-left rtl:text-right">
                <tr>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    S. No.
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Name
                  </th>
                  {/* <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Rank
                </th> */}
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Average Score
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {leaderboardData &&
                  leaderboardData.map((user, index) => (
                    <>
                      <tr key={user.userId} className="text-center">
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {index + 1}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {user.userName}{" "}
                          {userID && userID._id === user.userId ? (
                            <>
                              <span className="whitespace-nowrap rounded-full bg-teal-100 px-2.5 py-0.5 text-sm text-teal-700">
                                You
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        {/* <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        {user.userLeaderboardRank}
                      </td> */}
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {user.userAverageScore}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
