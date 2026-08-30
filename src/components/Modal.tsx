import { useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, closeLabel, onClose, children }: Props) {
  useEffect(() => {
    /* capture + stopImmediatePropagation: قبل از handler عمومی App اجرا می‌شود
       تا Esc فقط مودال را ببندد و برگهٔ آزاد پاره نشود */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="modal-fade absolute inset-0 w-full bg-ink-950/80 backdrop-blur-[3px] cursor-default"
      />
      <div
        className="modal-pop relative flex w-full flex-col overflow-hidden rounded-t-2xl border border-ink-600 bg-ink-900 shadow-[0_-10px_60px_rgba(0,0,0,0.6)] sm:max-w-2xl sm:rounded-2xl"
        style={{
          maxHeight: "min(92dvh, 46rem)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink-700 px-5 py-4 sm:px-7">
          <h3 className="font-display text-2xl leading-snug text-bone sm:text-3xl">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="keycap keycap-dark flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
