import './App.css'
import React, { Fragment } from "react"
import { checkUserLogged } from './features/user/authSlice'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

//Components
import Register from "./components/Register"
import Home from './components/Home'
import Login from './components/Login'
import Footer from './components/Footer'
import ForgottenPassword from './components/ForgottenPassword'
import ResetPassword from './components/ResetPassword'


function App() {
  let userLogged = useSelector(checkUserLogged)

  return <Fragment>
    <div className="container">
      {userLogged ?
        <>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </> :
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/forgottenPassword">
            <ForgottenPassword />
          </Route>
          <Route path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route>
            <Login exact />
          </Route>
        </Switch>
      }
      <Route>
        <Footer />
      </Route>
    </div>
  </Fragment>
}

export default App;
