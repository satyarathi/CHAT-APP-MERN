import React from "react";
import Image from "../../image/chat.png";
import Button from "@mui/material/Button";
import { loginUser } from "../../Services/userService";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function Login() {

  const navigate = useNavigate();

  const HandlePage=()=>{
    navigate('/signup')
  }
    
        const [loginObj, setloginObj] = React.useState({
            email: "",
            password: "",
          });
          const [errorObj, setErrorObj] = React.useState({
            emailError: false,
            emailHelper: "",
            passwordError: false,
            passwordHelper: "",
          });
        
          const takeEmail = (event) => {
            setloginObj((prevState) => ({ ...prevState, email: event.target.value }));
          };
          const takePassword = (e) => {
            setloginObj((prevState) => ({ ...prevState, password: e.target.value }));
          };
        
          const submit = async (event) => {
            event.preventDefault()
            let emailTest = emailRegex.test(loginObj.email);
            let passwordTest = passwordRegex.test(loginObj.password);
        
        
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
        
            if (
              emailTest === true &&
              passwordTest === true
            ) {
                let response = await loginUser(loginObj);
                console.log(
                  "response------------------------------------------>",
                  response
                );
                localStorage.setItem("token",JSON.stringify(response.data.data));

                console.log("token", response.data.data);
                navigate('/dashboard')
                return response;
              }
            
    }
  return (
    <div className="login-page">
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
              <h3 className="heading1">Login</h3>
              </div>
             
              <div class="text-box">
              <TextField id="standard-basic" label="Enter Email..." variant="standard"

                  type="email"
               
                  className="control"
                  
                  onChange={takeEmail}
                  error={errorObj.emailError}
                  helperText={errorObj.emailHelper}
                />
              </div>
              <div class="text-box">
              <TextField id="standard-basic" label="Enter Password..." variant="standard"

                  type="password"
                 
                  className="control"
                  
                  onChange={takePassword}
                  error={errorObj.passwordError}
                  helperText={errorObj.passwordHelper}
                />
              </div>
              <div className="text-box m20" >
                
                  <input
                    type="submit"
                    name="name"
                    className="btn"
                    value="Login account"
                    onClick={submit}
                    style={{cursor:'pointer'}}
                  />    
              </div>
              <div className="Login-box"><h4>New to App? <Button onClick={HandlePage} style={{cursor:'pointer'}}>Sign Up</Button> </h4></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;