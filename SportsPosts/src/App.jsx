import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SportsPost from './components/SportsPost';
import AddSportsPost from './components/AddSportsPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
        <Route
          path='/add-sports-post'
          element={<AddSportsPost />}
        />
        <Route
          path='/post/:id'
          element={
            <SportsPost
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;