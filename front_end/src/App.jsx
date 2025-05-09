import Home from './components/Home'
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
          </Routes>
        </Router>
      </TaskProvider>
    </div>
  )
}

export default App
