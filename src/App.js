import React from "react"
import Signup from "./components/authentication/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router,  Route } from "react-router-dom"
import Profile from "./components/authentication/Profile"
import Login from "./components/authentication/Login"
import PrivateRoute from "./components/authentication/PrivateRoute"
import ForgotPassword from "./components/authentication/ForgotPassword"
import UpdateProfile from "./components/authentication/UpdateProfile"
import Dashboard from "./components/files_manage/Dashboard"
import Landing from "./components/Landing/Landing"

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing} />
      <AuthProvider>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/folder/:folderId' component={Dashboard} />

        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/update-profile' component={UpdateProfile} />

        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
      </AuthProvider>  
    </Router>
  )
}

export default App
