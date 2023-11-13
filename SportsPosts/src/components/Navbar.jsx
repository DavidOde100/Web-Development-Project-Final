import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the custom styles

function Navbar({ showAddPost }) {
  return (
    <nav>
      <Link to='/'>
        <h1>SportsPosts!</h1>
      </Link>
      {showAddPost && (
        <Link to='/add-sports-post'>
          <button className="add-button">Add Sports Post</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;




