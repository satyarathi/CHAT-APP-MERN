import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

function Dashboard() {

  const [toggles, setToggle] = useState(true);

  const listenToSignUpPage = () => {
    setToggle(false);
  };

  const listenToLoginPage = () => {
    setToggle(true);
  };
  return (
    <div>
      <div>
        {toggles ? (
          <SignUp listenToSignUpPage={listenToSignUpPage} />
        ) : (
          <Login listenToLoginPage={listenToLoginPage} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;