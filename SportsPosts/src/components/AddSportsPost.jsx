import React, { useState } from 'react';
import supabase from '../supabaseClient';
import Navbar from './Navbar';
import '../App.css'; // Import the custom styles

function AddSportsPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const createSportsPost = async () => {
    const newPost = {
      title,
      content,
      image,
      upvotes: 0,
      created_at: new Date(),
    };

    const { data, error } = await supabase.from('sportsPosts').insert(newPost);

    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div>
      <Navbar showAddPost={false} />
      <div className="form-container">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Sports Title'
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Sports Content'
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image URL'
        />
        <button className="submit-button" onClick={createSportsPost}>Create Sports Post</button>
      </div>
    </div>
  );
}

export default AddSportsPost;