import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import ChatPage from "../ChatPage/ChatPage";


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
        <ChatPage />
        {/* {toggles ? (
          <SignUp listenToSignUpPage={listenToSignUpPage} />
        ) : (
          <Login listenToLoginPage={listenToLoginPage} />
        )} */}
      </div>
    </div>
  );
}

export default Dashboard;