import React, { useState, useEffect } from "react";
import styles from "./AddJobModal.module.css";
import { JobPosting, updateJob } from "../lib/api";

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  onJobUpdated: () => void;
}

export function EditJobModal({ isOpen, onClose, job, onJobUpdated }: EditJobModalProps) {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && job) {
      setPosition(job.job_title || job.title || "");
      setDescription(job.job_description || job.description || "");
      
      // Map backend numeric status (1=Active, 2=Draft, 3=Paused) to payload strings
      const statusMap: Record<number, string> = {
        1: "active",
        2: "draft",
        3: "paused"
      };
      
      const rawStatus = job.status;
      if (typeof rawStatus === "string") {
        setStatus(rawStatus);
      } else if (typeof rawStatus === "number") {
        setStatus(statusMap[rawStatus] || "active");
      } else {
        setStatus("active");
      }
      setError(null);
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;
  const isFormValid = position.trim().length > 0 && wordCount >= 100;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError("Please fill in the job position and provide at least 100 words in the description.");
      return;
    }

    if (!job?.job_id) return;

    try {
      setSaving(true);
      setError(null);
      await updateJob(job.job_id, {
        title: position,
        description: description,
        status: status,
        requirements: []
      });
      onJobUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update job posting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Edit Job Posting</h3>
          <p className={styles.modalSubtitle}>Modify the job posting details below.</p>
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
            disabled={saving}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Job Description <span className={styles.required}>*</span> (Minimum 100 words, current: {wordCount})
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Describe the job role, responsibilities, and requirements."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={saving}
            style={{ minHeight: "180px" }}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Status <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={saving}
            style={{ backgroundColor: "white", cursor: "pointer" }}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <div className={styles.modalActions}>
          <div className={styles.leftActions}>
            {/* Empty left actions for alignment */}
          </div>
          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.addBtn}
              onClick={handleSubmit}
              disabled={saving || !isFormValid}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
