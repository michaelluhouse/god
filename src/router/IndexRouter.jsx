import React from 'react';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import Login from '../views/login/login.jsx';
import NewsSandBox from '../views/sandbox/newssandbox.jsx';
import News from '../views/news/news.jsx';
import Detail from '../views/news/detail.jsx';

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/news" element={<News />}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="*" element={<NewsSandBox />}/> 
        <Route path="*" render={() => 
          localStorage.getItem("token")?
          <NewsSandBox /> :
          <Navigate to="/login"/>
        }/>
    
        {/* <Route path="/" render={() => 
            localStorage.getItem("token")?
            <NewsSandBox></NewsSandBox> :
            <Navigate to="/login"/>
        }/> */}
      </Routes>
    </HashRouter>
  )
}
