import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postIdFilter, setPostIdFilter] = useState('');

  useEffect(() => {
    // Fetch comments from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {
        // Limit to the first 100 comments
        setComments(data.slice(0, 100));
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  useEffect(() => {
    // Filter comments based on postIdFilter
    const filtered =
      postIdFilter === ''
        ? comments
        : comments.filter(
            (comment) => comment.postId.toString() === postIdFilter.toString()
          );
    setFilteredComments(filtered);
  }, [comments, postIdFilter]);

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <input
          type="text"
          placeholder="Filter by postId"
          value={postIdFilter}
          onChange={(e) => setPostIdFilter(e.target.value)}
        />
        <div className="post-list">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`post-item ${
                selectedPost === comment.postId ? 'selected' : ''
              }`}
              onClick={() => handlePostClick(comment.postId)}
            >
              <p>{comment.name}</p>
              <p className="post-id" style={{fontSize:'0.7rem'}}>Post ID: {comment.postId}</p> {/* Added */}
              {/* Add other comment details here */}
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        {selectedPost && (
          <div className="comment-list">
            <h2>Comments for Post {selectedPost}</h2>
            {comments
              .filter((comment) => comment.postId === selectedPost)
              .map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.body}</p>
                  {/* Add other comment details here */}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
