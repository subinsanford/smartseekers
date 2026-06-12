import React, { useState } from "react";
import styles from "./AddJobModal.module.css";
import { createJob } from "../lib/api";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: () => void;
}

export function AddJobModal({ isOpen, onClose, onJobAdded }: AddJobModalProps) {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;
  const isFormValid = position.trim().length > 0 && wordCount >= 100;

  const handleSubmit = async (status: string) => {
    if (!isFormValid) {
      setError("Please fill in the job position and provide at least 100 words in the description.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createJob({
        title: position,
        description: description,
        status: status,
        requirements: []
      });
      setPosition("");
      setDescription("");
      onJobAdded();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create job posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Add Job Posting</h3>
          <p className={styles.modalSubtitle}>Enter details for the new job posting.</p>
        </div>

        {error && (
          <div style={{ color: "#dc2626", background: "#fef2f2", padding: "8px 12px", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "16px", border: "1px solid #fee2e2" }}>
            {error}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Job Position <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Senior Frontend Developer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Job Description <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Describe the job role, responsibilities, and requirements."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.modalActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.draftBtn}
              onClick={() => handleSubmit("draft")}
              disabled={loading || !isFormValid}
            >
              Save as Draft
            </button>
          </div>
          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => handleSubmit("active")}
              disabled={loading || !isFormValid}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
