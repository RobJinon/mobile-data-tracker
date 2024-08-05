import Layout from './Layout'
import Login from './components/signin_signup/Login'
import Signup from './components/signin_signup/Signup'
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'



function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path = "/" element = { <Layout/> }>
            <Route path = '/login' element = { <Login/>}></Route>
            <Route path = "/signup" element = { <Signup/> } ></Route>
            <Route index element = { <Home/> }></Route>
            <Route path='/home' element = { <Home/> }></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    
  )
}

export default App
