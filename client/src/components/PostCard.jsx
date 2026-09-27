import { Link } from 'react-router-dom';
import DeletePostButton from './DeletePostButton.jsx';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostCard({ post, index = 0, onDeleted }) {
  return (
    <article className="post-card card-sharp card-interactive">
      <div className="post-card-top">
        <span className="post-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="badge-sharp">{formatDate(post.createdAt)}</span>
      </div>
      <Link to={`/posts/${post._id}`} className="post-card-title-link">
        <h2 className="post-card-title">{post.title}</h2>
      </Link>
      <p className="post-card-excerpt">{post.content}</p>
      <div className="post-card-footer">
        <Link to={`/posts/${post._id}`} className="read-more">
          Read →
        </Link>
        <div className="post-card-actions">
          <Link to={`/posts/${post._id}/edit`} className="icon-btn" title="Edit post">
            ✎
          </Link>
          <span className="post-card-sep" aria-hidden="true">
            /
          </span>
          <DeletePostButton postId={post._id} onDeleted={onDeleted} />
        </div>
      </div>
    </article>
  );
}
