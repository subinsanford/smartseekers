import React from "react";
import { X, Check } from "lucide-react";
import styles from "../app/recruiter/home/page.module.css";

interface RequestCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestSuccess: boolean;
  requestError: string | null;
  requestMessage: string;
  setRequestMessage: (msg: string) => void;
  isSubmittingRequest: boolean;
  handleRequestSubmit: (e: React.FormEvent) => void;
  templates: string[];
}

export function RequestCreditsModal({
  isOpen,
  onClose,
  requestSuccess,
  requestError,
  requestMessage,
  setRequestMessage,
  isSubmittingRequest,
  handleRequestSubmit,
  templates,
}: RequestCreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Request Credits</h3>
          <button className={styles.modalClose} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {requestSuccess ? (
          <div className={styles.successMessage}>
            <div style={{ background: "#d1fae5", padding: "12px", borderRadius: "50%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
              <Check size={28} color="#059669" />
            </div>
            <h4 className={styles.successTitle}>Request Sent Successfully</h4>
            <p className={styles.successDesc}>Your admin has been notified by email template.</p>
            <button 
              className={styles.submitBtn} 
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit}>
            {requestError && (
              <div style={{ color: "#dc2626", background: "#fef2f2", padding: "8px 12px", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "12px", border: "1px solid #fee2e2" }}>
                {requestError}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label className={styles.templateLabel}>Custom Message</label>
              <textarea 
                className={styles.textarea}
                placeholder="Provide details on why you need additional recruiter credits..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.templateLabel}>Quick Templates</label>
              <div className={styles.templateGrid}>
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.templateTag}
                    onClick={() => setRequestMessage(tpl)}
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                type="button" 
                className={styles.cancelBtn} 
                onClick={onClose}
                disabled={isSubmittingRequest}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmittingRequest || !requestMessage.trim()}
              >
                {isSubmittingRequest ? (
                  <>
                    <span className={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
