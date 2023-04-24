import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Welcome from './Pages/Welcome/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/authRoute';
import ProtectedRoute from './routes/protectedRoute';
import Chatpage from './Pages/ChatPage/ChatPage';

function App() {
  return (
    <div className="App">
     {/* <Dashboard /> */}
     
        <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              
                <Welcome />
             
            }
          />
     
          <Route
            path="/login"
            exact
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/chats" element={<Chatpage />} /> */}
        </Routes>
      </BrowserRouter>
    
    
    </div>
  );
}

export default App;
