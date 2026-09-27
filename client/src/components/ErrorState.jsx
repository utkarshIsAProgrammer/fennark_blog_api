export default function ErrorState({ message = 'Something went wrong!', onRetry }) {
  return (
    <div className="error-state card-sharp" role="alert">
      <span className="error-code">[ ! ]</span>
      <h3 className="error-title">Failed to load</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button type="button" className="btn-sharp-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
