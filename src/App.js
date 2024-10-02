import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Routes, Route, Link, Navigate,useNavigate, Outlet} from "react-router-dom"
import Home from './Home/Home';
import Test from './Test/Test';
import ResultPage from './ResultPage/ResultPage';
// import AddQuestionPage from './AddQuestionPage/AddQuestionPage';
import Register from './Register/Register';
import Login from './Login/Login'
import Welcome from './Welcome/Welcome';
import React, { useEffect } from 'react'
import WithLogin from './WithLogin/WithLogin';
import Navbar from './Navbar/Navbar';
import Admin from './Admin/Admin';

function App() {

  let routes = [
    {
      path:"/",
      component:<Welcome/>,
      postLogin: false
    },
    {
      path:"/home",
      component:<Home/>
    },
    {
      path:"/admin",
      component:<Admin/>
    },
    {
      path:"/login",
      component:<Login/>,
      postLogin: false
    },
    {
      path:"/register",
      component:<Register/>,
      postLogin: false
    },
    {
      path:"/test",
      component:<Test/>
    },
    {
      path:"/resultpage",
      component:<ResultPage/>
    },
    // {
    //   path:"/addquestionpage",
    //   component:<AddQuestionPage/>
    // },
  ]
  let routesMap = routes.map(route=><Route 
    path={route.path} 
    element={<WithLogin path={route.path} postLogin={route.postLogin}>
        {route.component}
    </WithLogin>}
  />)

  return (
    <div className="App">

      <Router>
      <Navbar/>
      <div class="App-page">
        <Routes>
          <></>
            {routesMap}
        </Routes>
      </div>
      </Router>
      
    </div>
  );
}

export default App;