import Home from './components/Home'
import LoginForm from './auth/Login';
import RegisterForm from './auth/Register';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import UserProfileManagement from './auth/Profile';
import Navbar from './components/Navbar';
function App() {
  return (
    <div>
     
      <TaskProvider>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/register" element={<RegisterForm />} /> 
            <Route path="/profile" element={<UserProfileManagement />} /> 

          </Routes>
        </Router>
      </TaskProvider>
    </div>
  )
}

export default App
