'use client';

export default function HardReloadHomeLink() {
  return (
    <button
      type="button"
      className="ty-back"
      onClick={() => window.location.assign('/')}
    >
      Back to Home
    </button>
  );
}
