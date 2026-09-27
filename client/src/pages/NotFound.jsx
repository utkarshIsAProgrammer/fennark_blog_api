import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="notfound-wrap">
          <span className="notfound-code mono">&lt;404 /&gt;</span>
          <h1 className="notfound-title">PAGE NOT FOUND</h1>
          <p className="notfound-sub">
            The route you requested does not exist. It may have been deleted —
            or never shipped at all.
          </p>
          <div className="hero-actions">
            <Link to="/" className="btn-sharp">
              Back home
            </Link>
            <Link to="/posts" className="btn-sharp-outline">
              Browse posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
