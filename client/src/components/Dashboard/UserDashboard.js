import React, { useEffect, useState } from "react";
// import MenuOptions from "./MenuOptions";
import MenuWindow from "./MenuWindow";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [menuID, setMenuID] = useState(1);

  const featureReduxResponse = useSelector(
    (globalState) => globalState.menu.features
  );
  useEffect(() => {
    if (featureReduxResponse) {
      setMenuID(featureReduxResponse.featureId);
    } else {
      return;
    }
  }, [featureReduxResponse]);
  return (
    <>
      {/* <MenuOptions /> */}
      <div className="flex">
        <SideMenu menuID={menuID} setMenuID={setMenuID} />
        <MenuWindow menuID={menuID} setMenuID={setMenuID} />
      </div>
    </>
  );
};

export default UserDashboard;
