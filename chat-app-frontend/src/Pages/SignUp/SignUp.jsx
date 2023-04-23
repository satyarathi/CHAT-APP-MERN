import React from "react";
import "./SignUp.css";
import Image from "../../image/chat.png";
import Button from "@mui/material/Button";
import { registerUser } from "../../Services/userService";
import TextField from '@mui/material/TextField';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const nameReg = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

function SignUp(props) {

  const clickLogin = () => {
    props.listenToSignUpPage();
  };
 
  const [signupObj, setSignupObj] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errorObj, setErrorObj] = React.useState({
    fullNameError: false,
    fullNameHelper: "",
    emailError: false,
    emailHelper: "",
    passwordError: false,
    passwordHelper: "",
  });

  const takefullName = (a) => {
    setSignupObj((prevState) => ({ ...prevState, fullname: a.target.value }));
  };
  const takeEmail = (event) => {
    setSignupObj((prevState) => ({ ...prevState, email: event.target.value }));
  };
  const takePassword = (e) => {
    setSignupObj((prevState) => ({ ...prevState, password: e.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault()
    console.log("submit triggered")
    let fullNameTest = nameReg.test(signupObj.fullname);
    let emailTest = emailRegex.test(signupObj.email);
    let passwordTest = passwordRegex.test(signupObj.password);

    if (fullNameTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        fullNameError: true,
        fullNameHelper: "enter correct firstname",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        fullNameError: false,
        fullNameHelper: "",
      }));
    }

    if (emailTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: true,
        emailHelper: "enter correct email",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: false,
        emailHelper: "",
      }));
    }
    if (passwordTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: true,
        passwordHelper: "enter correct password",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: false,
        passwordHelper: "",
      }));
    }

    if (fullNameTest===true && emailTest===true && passwordTest===true) {
      console.log("prepared for backend",signupObj)
      let response = await registerUser(signupObj);
      console.log(response);
    }
  }
  return (
    <div className="signin-page">
      <div className="container">
        <div
          className="image-box"
          style={{
            backgroundImage: "url(" + Image + ")",
            backgroundSize: "100% 100%",
          }}
        ></div>
        <div className="form">
          <div className="form-section">
            <form action="">
              <div className="text-box">
              <h3 className="heading1">Create account</h3>
              </div>
              <div className="text-box">
                <TextField id="standard-basic" label="Enter Full Name..." variant="standard"
                 
                  
                  className="control"
                 
                  onChange={takefullName}
                  error={errorObj.fullNameError}
                  helperText={errorObj.fullNameHelper}
                />
              </div>
              <div className="text-box">
              <TextField id="standard-basic" label="Enter Email..." variant="standard"
                 
                  className="control"
                 
                  onChange={takeEmail}
                  error={errorObj.emailError}
                  helperText={errorObj.emailHelper}
                />
              </div>
              <div className="text-box">
              <TextField id="standard-basic" label="Enter Password..." variant="standard"

                  type="password"
                  className="control"
                  onChange={takePassword}
                  error={errorObj.passwordError}
                  helperText={errorObj.passwordHelper}
                />
              </div>

              <div className="text-box m20">    
                  <input
                    type="submit"
                    name="name"
                    className="btn"
                    value="Create account"
                    onClick={submit}
                    style={{cursor:'pointer'}}
                  />   
              </div>
              <div className="Login-box"><h4>Already have an Account? <Button onClick={clickLogin} style={{cursor:'pointer'}}>Login</Button> </h4></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
