import Layout from './Layout'
import Login from './signin_signup/Login'
import Signup from './signin_signup/Signup'
import Dashboard from './dashboard/Dashboard'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'



function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path = "/" element = { <Layout/> }>
            <Route index element = { <Login/>}></Route>
            <Route path = "/signup" element = { <Signup/> } ></Route>
            <Route path = "/profile" element = { <Dashboard/> }></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    
  )
}

export default App
