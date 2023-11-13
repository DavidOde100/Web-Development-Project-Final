import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import Navbar from './Navbar';
import '../App.css';

function SportsPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    title: '',
    content: '',
    image: '',
    comments: '',
  });

  useEffect(() => {
    const fetchSportsPost = async () => {
      const { data, error } = await supabase
        .from('sportsPosts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching sports post: ', error);
      } else {
        setPost({ ...data, comments: data.comments || [] });
        setUpdatedPost({
          title: data.title,
          content: data.content,
          image: data.image,
        });
      }
    };

    fetchSportsPost();
  }, [id]);

  const upvotePost = async () => {
    if (!post) return;
    const { data, error } = await supabase
      .from('sportsPosts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id);
    if (error) {
      console.error('Error upvoting sports post: ', error);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 });
    }
  };

  const deletePost = async () => {
    const { data, error } = await supabase.from('sportsPosts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting sports post:', error);
    } else {
      navigate('/');
    }
  };

  const addComment = async () => {
    if (!post || !comment) return;

    const updatedComments = [...post.comments, comment];
    const { data, error } = await supabase
      .from('sportsPosts')
      .update({ comments: updatedComments })
      .eq('id', id);
    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setPost({ ...post, comments: updatedComments });
      setComment('');
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const updatePost = async () => {
    if (!post) return;
    const { data, error } = await supabase
      .from('sportsPosts')
      .update(updatedPost)
      .eq('id', id);
    if (error) {
      console.error('Error updating sports post:', error);
    } else {
      setPost(data);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <Navbar showAddPost={true} />
      {post && (
        <div className='card'>
          {isEditing ? (
            <div className='edit-form'>
              <input
                value={updatedPost.title}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, title: e.target.value })
                }
                placeholder='Title'
              />
              <input
                value={updatedPost.content}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, content: e.target.value })
                }
                placeholder='Content'
              />
              <input
                value={updatedPost.image}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, image: e.target.value })
                }
                placeholder='Image URL'
              />
              <button className="submit-button" onClick={updatePost}>Save</button>
            </div>
          ) : (
            <>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <img
                src={post.image}
                alt={post.title}
              />
            </>
          )}
          <div>Upvotes: {post.upvotes}</div>
          <button className="action-button" onClick={upvotePost}>Upvote</button>
          <button className="action-button" onClick={deletePost}>Delete</button>
          <button className="action-button" onClick={toggleEditMode}>Edit</button>
          <br></br>
          <input
            className='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment'
          />
          <button className="submit-button" onClick={addComment}>Add Comment</button>
          {post.comments &&
            post.comments.map((comment, index) => (
              <div key={index}>{comment}</div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SportsPost;