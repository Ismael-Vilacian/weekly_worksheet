import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RenderContainer } from './components/renderContainer.tsx';
import MenuBar from './components/menuBar.tsx';
import RegisterCourse from './pages/registerCourse.tsx';
import RegisterDiscipline from './pages/registerDiscipline.tsx';
import RegisterTime from './pages/registerTime.tsx';
import RegisterTeacher from './pages/registerTeacher.tsx';
import logo from './assets/svg_icons/logo.svg';
import { closeAlert } from './utils/tools.tsx';
import Home from './pages/home.tsx';
import "./declarations.d.ts"
import WorkBoardList from './pages/workBoardList.tsx';

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
            <Route path="/register-discipline" element={<RegisterDiscipline />} />
            <Route path="/register-time" element={<RegisterTime />} />
            <Route path="/register-teacher" element={<RegisterTeacher />} />
            <Route path="/work-board-list" element={<WorkBoardList />} />
          </Routes>
        </RenderContainer>
      </Router>

      <div className="loading">
        <div className="loading_logo">
          <img src={logo} alt="" />
        </div>
      </div>

      <div onClick={closeAlert} className="alert">
        <div className="alert_description"></div>
        <div className="alert_close"><i className="bi bi-x"></i></div>
      </div>

    </div>
  );
}

export default App;
