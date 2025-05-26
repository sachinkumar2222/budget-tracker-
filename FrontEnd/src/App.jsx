import React from 'react'
import{
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from "react-router-dom"

import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expense from "./pages/Dashboard/Expense"
import UserProvider from './context/UserContext'
import {Toaster} from "react-hot-toast" 
import EmailVerificationPage from "./pages/auth/EmailVerificationPage"

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/Signup' exact element={<SignUp />} />
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/income' exact element={<Income />} />
          <Route path='/expense' exact element={<Expense />} />
          <Route path="/verify/:token" element={<EmailVerificationPage />} />
        </Routes>
      </Router>
    </div>

    <Toaster 
      toastOption={{
        className:"",
        style:{
          fontSize:'13px'
        },
      }}
    />
    </UserProvider>
  )
}

export default App;

const Root = () =>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"></Navigate>
  ):(
    <Navigate to="/login"></Navigate> 
  )
}