// import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import { Button, Container } from 'reactstrap';
import ProjectCard from "./components/ProjectCard";
// import projects from './projects.json'
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar'
import SignUpPage from './components/signUpPage';
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import UserDetails from './views/UserDetails'
import { useSelector } from 'react-redux';

function App() {

  let [showLoginPage, setShowLoginPage] = useState(true)
  const state = useSelector((state) => state);
  console.log(state);

  const navigate = useNavigate()



  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setShowLoginPage(false)
    }
  }, [])

  const onLogOut = () => {
    console.log('login failed >>>>>>>>>>>>>> ');
    navigate('/login')
    setShowLoginPage(true)
    localStorage.removeItem('isLoggedIn')
  }




  // console.log(users.data[0].email);



  return (
    <Container>
 

      <Routes>
        <Route path='/' element={<div><Navbar onLogout={onLogOut} /><Outlet /></div>}>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/users' element={<ProjectCard />}></Route>
          <Route path='/users/details/:userId' element={<UserDetails />}></Route>

        </Route>
      </Routes>



    </Container>
  );
}

export default App;
