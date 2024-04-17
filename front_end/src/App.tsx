import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RenderContainer } from './components/renderContainer.tsx';
import { Home } from './pages/home.tsx';
import { Register } from './pages/register.tsx';
import { Reports } from './pages/reports.tsx';
import MenuBar from './components/menuBar.tsx';
import { RegisterCourse } from './pages/registerCourse.tsx';


function App() {
  return (
    <div className='App'>
      <Router>
        <MenuBar />
        <RenderContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register-course" element={<RegisterCourse />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </RenderContainer>
      </Router>
    </div>
  );
}

export default App;
