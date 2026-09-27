import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost, getApiError } from '../api/blogApi.js';
import Loading from '../components/Loading.jsx';
import ErrorState from '../components/ErrorState.jsx';
import DeletePostButton from '../components/DeletePostButton.jsx';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPost = () => {
    setError('');
    setLoading(true);
    getPost(id)
      .then((data) => setPost(data.post))
      .catch((err) => {
        const notFound = err?.response?.status === 404;
        setError(
          notFound ? 'This post does not exist (or was deleted).' : getApiError(err)
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadPost, [id]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container">
          <Loading label="Loading post" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding">
        <div className="container">
          <ErrorState message={error} onRetry={loadPost} />
          <div className="detail-back">
            <Link to="/" className="btn-sharp-outline">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <article className="section-padding">
      <div className="container container-narrow">
        <div className="detail-top">
          <Link to="/" className="back-link mono">
            ← home
          </Link>
          <div className="post-card-actions">
            <Link to={`/posts/${post._id}/edit`} className="icon-btn" title="Edit post">
              ✎
            </Link>
            <span className="post-card-sep" aria-hidden="true">
              /
            </span>
            <DeletePostButton postId={post._id} />
          </div>
        </div>

        <header className="detail-header">
          <span className="badge-sharp">{formatDate(post.createdAt)}</span>
          <h1 className="detail-title">{post.title}</h1>
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <p className="mono detail-updated">
              // edited {formatDate(post.updatedAt)}
            </p>
          )}
        </header>

        <div className="detail-body">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer className="detail-footer">
          <Link to="/" className="btn-sharp-outline">
            ← Back to all posts
          </Link>
        </footer>
      </div>
    </article>
  );
}
