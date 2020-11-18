import React, { useState } from 'react'
import { Route, Switch } from "react-router-dom";

// Pages
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import JobsPage from './pages/Jobs'

// Navigation menu
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'

const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
      setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </>
  )
}

export default App
