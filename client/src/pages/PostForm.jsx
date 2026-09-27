import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost, updatePost, getPost, getApiError } from '../api/blogApi.js';
import Loading from '../components/Loading.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'devblog';

export default function PostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(isEdit);
  const [loadError, setLoadError] = useState('');
  const [showCancel, setShowCancel] = useState(false);

  // Load the post when editing
  useEffect(() => {
    if (!isEdit) return;
    getPost(id)
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
      })
      .catch((err) =>
        setLoadError(getApiError(err, 'Could not load this post for editing.'))
      )
      .finally(() => setChecking(false));
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required!');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        const res = await updatePost(id, { title, content });
        toast.success(res.message || 'Post updated successfully!');
        navigate(`/posts/${id}`);
      } else {
        const res = await createPost({ title, content });
        toast.success(res.message || 'Post created successfully!');
        navigate(`/posts/${res.post._id}`);
      }
    } catch (err) {
      toast.error(getApiError(err));
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <section className="section-padding">
        <div className="container container-narrow">
          <Loading label="Loading post" />
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="error-state card-sharp" role="alert">
            <span className="error-code">[ ! ]</span>
            <h3 className="error-title">Could not load post</h3>
            <p className="error-message">{loadError}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container container-narrow">
        <div className="section-heading section-heading-left">
          <span className="badge-sharp">{isEdit ? 'editing' : 'new entry'}</span>
          <h2 className="section-title">
            {isEdit ? 'EDIT POST' : `WRITE FOR ${APP_NAME.toUpperCase()}`}
          </h2>
          <p className="section-sub">
            {isEdit
              ? 'Refine your thoughts, then hit save.'
              : 'Sharp words only. The internet has enough fluff.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-field">
            <label htmlFor="post-title" className="form-label mono">
              title_*
            </label>
            <input
              id="post-title"
              type="text"
              className="input-sharp"
              placeholder="An unreasonably effective title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
            />
          </div>

          <div className="form-field">
            <label htmlFor="post-content" className="form-label mono">
              content_*
            </label>
            <textarea
              id="post-content"
              className="input-sharp textarea-sharp"
              placeholder="Write something worth reading…"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="form-hint mono">
              <span>{content.length} chars</span>
              <span>* required</span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-sharp-outline"
              onClick={() => setShowCancel(true)}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn-sharp" disabled={saving}>
              {saving ? 'Publishing…' : isEdit ? 'Save changes' : 'Publish post'}
            </button>
          </div>
        </form>
      </div>

      <ConfirmModal
        open={showCancel}
        title="Discard this post?"
        message="Your changes will be lost if you leave this page."
        confirmLabel="Discard"
        onConfirm={() => navigate(-1)}
        onCancel={() => setShowCancel(false)}
      />
    </section>
  );
}
