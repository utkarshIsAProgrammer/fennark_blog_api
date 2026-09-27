const APP_NAME = import.meta.env.VITE_APP_NAME || 'devblog';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="brand-mark">
            {APP_NAME}
            <span className="brand-cursor">_</span>
          </span>
          <p className="footer-tagline">
            A sharp-edged blog for people who ship. Read, write and share — no
            rounded corners allowed.
          </p>
        </div>
        <div className="footer-meta">
          <p className="mono footer-line footer-dim">
            © {new Date().getFullYear()} {APP_NAME} — all posts sharp, all
            corners right angles
          </p>
        </div>
      </div>
    </footer>
  );
}
