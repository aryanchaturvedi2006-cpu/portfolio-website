import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import './Lightbox.css';

const Lightbox = ({
  isOpen,
  onClose,
  title,
  topbarLabel,
  image,
  caption,
  bottomContent,
  windowClassName = '',
  triggerRef
}) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save triggering element to return focus on close
    previouslyFocusedRef.current =
      triggerRef?.current || document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Return focus to triggering element
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const isPortrait =
    image?.height && image?.width ? image.height > image.width : false;

  // Image size bounds: never upscaled beyond natural size (Requirement 2 & 3)
  const maxNaturalW = image?.width || image?.naturalWidth;
  const maxNaturalH = image?.height || image?.naturalHeight;

  // Custom max-width and max-height logic
  const computedMaxWidth = image?.maxWidth
    ? image.maxWidth
    : maxNaturalW
      ? `min(94vw, ${maxNaturalW}px)`
      : '94vw';

  const computedMaxHeight = image?.maxHeight
    ? image.maxHeight
    : maxNaturalH
      ? isPortrait
        ? `min(90vh, ${maxNaturalH}px)`
        : `min(90vh, ${maxNaturalH}px)`
      : '90vh';

  return (
    <div
      className="lightbox-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        id="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Image Preview'}
        className={`lightbox-window ${
          isPortrait ? 'lightbox-portrait' : 'lightbox-landscape'
        } ${windowClassName}`}
      >
        {/* Lightbox Top Bar */}
        <div className="lightbox-topbar">
          <span className="lightbox-title-label">{topbarLabel || title}</span>
          <button
            ref={closeBtnRef}
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Lightbox Image Area */}
        <div className="lightbox-img-area">
          {image?.src ? (
            <img
              src={image.src}
              alt={image.alt || title || 'Full view'}
              onLoad={image.onLoad}
              className="lightbox-img"
              style={{
                maxWidth: computedMaxWidth,
                maxHeight: computedMaxHeight,
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div className="project-preview-fallback">
              <span>// preview unavailable</span>
            </div>
          )}
        </div>

        {/* Lightbox Bottom Bar */}
        {bottomContent ? (
          bottomContent
        ) : caption ? (
          <div className="lightbox-bottombar">
            <div className="lightbox-bottombar-left">
              {typeof caption === 'string' ? (
                <span className="lightbox-caption-title">{caption}</span>
              ) : (
                <>
                  <span className="lightbox-caption-title">{caption.title}</span>
                  {caption.date && (
                    <span className="lightbox-caption-date">{caption.date}</span>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Lightbox;
