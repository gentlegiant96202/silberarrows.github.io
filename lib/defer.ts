/**
 * Run `task` once the browser has painted the response to the current
 * interaction, so analytics work never delays the visible reaction to a tap
 * (Interaction to Next Paint). If the page is hidden or unloading first, as
 * after a tel: / wa.me tap, the task runs immediately instead so the event
 * is not lost.
 */
export function afterNextPaint(task: () => void): void {
  if (typeof window === "undefined") return;

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    window.removeEventListener("pagehide", run);
    document.removeEventListener("visibilitychange", onHidden);
    try {
      task();
    } catch {
      /* analytics must never break the page */
    }
  };
  const onHidden = () => {
    if (document.visibilityState === "hidden") run();
  };

  window.addEventListener("pagehide", run);
  document.addEventListener("visibilitychange", onHidden);
  requestAnimationFrame(() => setTimeout(run, 0));
}
