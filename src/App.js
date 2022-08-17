import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet} from "react-router-dom"
import Home from './Home/Home';
import Test from './Test/Test';
import ResultPage from './ResultPage/ResultPage';
import AddQuestionPage from './AddQuestionPage/AddQuestionPage';
import Register from './Register/Register';
import Login from './Login/Login'
import Welcome from './Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* needs to be automated */}
          <Route path="/" element={<Welcome></Welcome>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/resultpage" element={<ResultPage></ResultPage>}></Route>
          <Route path="/addquestionpage" element={<AddQuestionPage/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;