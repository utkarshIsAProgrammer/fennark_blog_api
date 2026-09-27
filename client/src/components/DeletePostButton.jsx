import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deletePost, getApiError } from '../api/blogApi.js';
import ConfirmModal from './ConfirmModal.jsx';

export default function DeletePostButton({ postId, onDeleted }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      const res = await deletePost(postId);
      toast.success(res.message || 'Post deleted successfully!');
      setConfirmOpen(false);
      // Let the owning list remove the post from state immediately
      onDeleted?.(postId);
      // If the deleted post's own page is open, go home
      if (location.pathname.includes(postId)) {
        navigate('/', { replace: true });
      }
    } catch (err) {
      toast.error(getApiError(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="icon-btn icon-btn-danger"
        title="Delete post"
        onClick={() => setConfirmOpen(true)}
        disabled={deleting}
      >
        ✕
      </button>
      <ConfirmModal
        open={confirmOpen}
        title="Delete this post?"
        message="This action cannot be undone. The post will be permanently removed."
        confirmLabel={deleting ? 'Deleting…' : 'Delete'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
