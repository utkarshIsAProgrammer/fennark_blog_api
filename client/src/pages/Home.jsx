import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getApiError } from '../api/blogApi.js';
import PostCard from '../components/PostCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'devblog';

export default function Home() {
  const [posts, setPosts] = useState(null); // null = loading
  const [error, setError] = useState('');

  const loadPosts = () => {
    setError('');
    setPosts(null);
    getPosts()
      .then((data) => setPosts(data.posts || []))
      .catch((err) => setError(getApiError(err, 'Could not reach the API.')));
  };

  const handleDeleted = (deletedId) => {
    // Remove the post from state immediately so it disappears from the UI
    setPosts((prev) => (prev ? prev.filter((p) => p._id !== deletedId) : prev));
  };

  useEffect(loadPosts, []);

  return (
    <>
      <section className="hero section-padding">
        <div className="container">
          <div className="hero-inner">
            <span className="badge-sharp badge-pulse">100% beginner-powered</span>
            <h1 className="hero-title">
              SHARP THOUGHTS.
              <br />
              NO ROUNDED
              <span className="hero-title-accent"> CORNERS.</span>
            </h1>
            <p className="hero-sub">
              {APP_NAME} is a brutally simple blog built on React and Express.
              Read any post — or publish your own in seconds.
            </p>
            <div className="hero-actions">
              <Link to="/posts/new" className="btn-sharp">
                Write a post
              </Link>
              <a href="#all-posts" className="btn-sharp-outline">
                Browse posts
              </a>
            </div>
            <div className="hero-stats mono">
              <span>
                {posts === null ? '--' : String(posts.length).padStart(2, '0')}
              </span>
              posts published
              <span className="hero-stats-sep">//</span>
              <span>02</span>
              fennark internship project
            </div>
          </div>
        </div>
      </section>

      <section id="all-posts" className="section-padding section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="badge-sharp">the blog</span>
            <h2 className="section-title">ALL POSTS</h2>
            <p className="section-sub">Everything published so far.</p>
          </div>

          {posts === null && <Loading label="Loading posts" />}
          {error && <ErrorState message={error} onRetry={loadPosts} />}
          {posts !== null && !error && posts.length === 0 && <EmptyState />}
          {posts !== null && !error && posts.length > 0 && (
            <div className="posts-grid">
              {posts.map((post, i) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={i}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
