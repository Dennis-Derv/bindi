'use client';

import React, { useEffect, useRef } from 'react';
import { Mail, RotateCcw, X } from 'lucide-react';
import { SECRETARIAT_EMAIL, type InquiryResult } from '../lib/inquiryEmail';

interface FormStatusModalProps {
  result: InquiryResult | null;
  successTitle: string;
  errorTitle: string;
  onClose: () => void;
}

// Pop-up confirming whether a form submission was delivered; renders nothing while result is null.
export default function FormStatusModal({ result, successTitle, errorTitle, onClose }: FormStatusModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog> gives us focus trapping, Escape-to-close and top-layer stacking for free
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !result) return;

    dialog.showModal();
    // showModal() focuses the first focusable element (the close button); move focus to the main action instead
    dialog.querySelector<HTMLElement>('.status-modal__primary')?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      if (dialog.open) dialog.close();
    };
  }, [result]);

  if (!result) return null;

  const tone = result.success ? 'success' : 'error';

  return (
    <dialog
      ref={dialogRef}
      className={`status-modal status-modal--${tone}`}
      aria-labelledby="status-modal-title"
      aria-describedby="status-modal-message"
      onClose={onClose}
      onClick={(e) => {
        // Clicks on the backdrop land on the <dialog> element itself
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="status-modal__card">
        <button type="button" className="status-modal__close" onClick={onClose} aria-label="Close">
          <X style={{ width: '1.1rem', height: '1.1rem' }} />
        </button>

        <div className="status-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 52 52">
            <circle className="status-modal__icon-ring" cx="26" cy="26" r="24" />
            {result.success ? (
              <path className="status-modal__icon-mark" d="M15 27 l7 7 l15 -16" />
            ) : (
              <path className="status-modal__icon-mark" d="M18 18 l16 16 M34 18 l-16 16" />
            )}
          </svg>
        </div>

        <h2 id="status-modal-title" className="status-modal__title">
          {result.success ? successTitle : errorTitle}
        </h2>
        <p id="status-modal-message" className="status-modal__message">
          {result.message}
        </p>

        <div className="status-modal__actions">
          {result.success ? (
            <button type="button" className="btn btn-primary status-modal__btn status-modal__primary" onClick={onClose}>
              Done
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-primary status-modal__btn status-modal__primary" onClick={onClose}>
                <RotateCcw style={{ width: '1rem', height: '1rem' }} />
                Try Again
              </button>
              <a href={`mailto:${SECRETARIAT_EMAIL}`} className="btn btn-secondary status-modal__btn">
                <Mail style={{ width: '1rem', height: '1rem' }} />
                Email Us Instead
              </a>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
