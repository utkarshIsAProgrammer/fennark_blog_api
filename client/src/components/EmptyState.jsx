import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="empty-state card-sharp">
      <span className="empty-glyph">[ ]</span>
      <h3 className="empty-title">No posts yet</h3>
      <p className="empty-message">
        The blog is empty. Be the first to publish something worth reading.
      </p>
      <Link to="/posts/new" className="btn-sharp">
        Write the first post
      </Link>
    </div>
  );
}
