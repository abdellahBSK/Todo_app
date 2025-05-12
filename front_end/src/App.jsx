import Home from './components/Home'
import LoginForm from './auth/Login';
import RegisterForm from './auth/Register';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <div>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/register" element={<RegisterForm />} /> 
          </Routes>
        </Router>
      </TaskProvider>
    </div>
  )
}

export default App
