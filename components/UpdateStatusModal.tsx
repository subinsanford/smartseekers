import React, { useState, useEffect } from "react";
import styles from "./AddJobModal.module.css";
import { JobPosting, updateJobStatus } from "../lib/api";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  onStatusUpdated: () => void;
}

export function UpdateStatusModal({ isOpen, onClose, job, onStatusUpdated }: UpdateStatusModalProps) {
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && job) {
      const statusMap: Record<number, string> = {
        1: "active",
        2: "draft",
        3: "paused",
        4: "closed"
      };
      
      const rawStatus = job.status as any;
      if (typeof rawStatus === "string") {
        setStatus(rawStatus.toLowerCase());
      } else if (typeof rawStatus === "number") {
        setStatus(statusMap[rawStatus] || "active");
      } else {
        setStatus("active");
      }
      setError(null);
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!job?.job_id) return;

    try {
      setSaving(true);
      setError(null);
      await updateJobStatus(job.job_id, status);
      onStatusUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update job status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Update Job posting Status</h3>
          <p className={styles.modalSubtitle}>Change the status for this job posting.</p>
        </div>

        {error && (
          <div style={{ color: "#dc2626", background: "#fef2f2", padding: "8px 12px", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "16px", border: "1px solid #fee2e2" }}>
            {error}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Status
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
            <option value="closed">Closed</option>
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
              disabled={saving}
            >
              {saving ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
