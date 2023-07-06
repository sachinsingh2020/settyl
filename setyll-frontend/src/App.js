import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { ProtectedRoute } from 'protected-route-react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './redux/actions/user';
import RedirectedPage from './components/RedirectedPage';



const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(isUserLoggedIn());
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   console.log("isAuthenticated", isAuthenticated);
  // }, [isAuthenticated])

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <RedirectedPage />
          </ProtectedRoute>} />

        <Route exact path='/login' element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect="/"
          >
            <Login />
          </ProtectedRoute>} />

        <Route exact path='/signup' element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect="/"
          >
            <Signup />
          </ProtectedRoute>} />


      </Routes>
    </Router>
  )
}

export default App
