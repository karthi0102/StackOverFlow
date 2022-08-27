import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import {fetchAllQuestions} from './actions/question'
import { getAllUsers } from './actions/users';
import { useDispatch } from 'react-redux';
function App() {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(getAllUsers())
  },[dispatch])
  return (
    <div className="App">
      <Router>
           <Navbar />
           <AllRoutes />
     </Router>
    </div>
  );
}

export default App;