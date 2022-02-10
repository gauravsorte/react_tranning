// import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import { Button, Container } from 'reactstrap';
import ProjectCard from "./components/ProjectCard";
// import projects from './projects.json'
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar'
import SignUpPage from './components/signUpPage';
import { Routes, Route, Link, Outlet } from "react-router-dom";

function App() {

  let [showLoginPage, setShowLoginPage] = useState(true)
  let [showSignUpPage, setShowSignUpPage] = useState(false)

  let users__ = null;

  let title = showLoginPage ? 'Login' : 'Project'

  const togglePage = () => setShowLoginPage(!showLoginPage)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setShowLoginPage(false)
    }
  }, [])
  // console.log('>>>>>>>>>>> ',users.data[0]);

  const showLoginInPage = () => {
    setShowLoginPage(true)
  }
  const onLoginSuccess = () => {
    setShowLoginPage(false)
    localStorage.setItem('isLoggedIn', true)
  }

  const onLogOut = () => {
    console.log('login failed >>>>>>>>>>>>>> ');
    setShowLoginPage(true)
    localStorage.removeItem('isLoggedIn')
  }



  const showSignupPage_ = () => {
    setShowSignUpPage(true)
  }

  // console.log(users.data[0].email);


  return (
    <Container>
      {/* <h1>Hello world</h1> */}
      {/* <Navbar onLogout = {onLogOut} showLoginPage = {showLoginPage}/>
      <h1>{title}</h1>
      <Button onClick={togglePage}>Change Page </Button>

      {showLoginPage ? (
        showSignUpPage ?  (<SignUpPage showLoginPage = {showLoginInPage}/>) : (<LoginPage onLoginSuccess={onLoginSuccess} onLoginFail = {onLogOut} showSignUp = {showSignupPage_}/>) 
      // <LoginPage onLoginSuccess={onLoginSuccess} onLoginFail = {onLogOut} shoeSignUp = {showSiginupPage_}/>
      
      ) :
        (<div>
          <ProjectCard />
        </div>)
      } */}

      <Routes>
        <Route path='/' element={<div><Navbar onLogout={onLogOut} /><Outlet /></div>}>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>


        </Route>
      </Routes>



    </Container>
  );
}

export default App;
