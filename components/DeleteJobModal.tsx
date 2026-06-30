import React, { useState } from "react";
import styles from "./AddJobModal.module.css";
import { JobPosting, deleteJob } from "../lib/api";
import { AlertTriangle } from "lucide-react";

interface DeleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number | string | null;
  onJobDeleted: () => void;
}

export function DeleteJobModal({ isOpen, onClose, jobId, onJobDeleted }: DeleteJobModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !jobId) return null;

  const handleDelete = async () => {
    try {
      setSaving(true);
      setError(null);
      await deleteJob(Number(jobId));
      onJobDeleted();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to delete job posting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: "450px", textAlign: "center", padding: "32px 24px" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "#fef2f2", padding: "12px", borderRadius: "50%" }}>
            <AlertTriangle size={28} color="#dc2626" />
          </div>
        </div>
        
        <h3 className={styles.modalTitle} style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>
          Are you absolutely sure?
        </h3>
        
        <p className={styles.modalSubtitle} style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "24px", lineHeight: "1.5" }}>
          This job posting maybe linked to active candidates, scheduled interviews. Deleting it will permanently remove all related data and cannot be undone.
        </p>

        {error && (
          <div style={{ color: "#dc2626", background: "#fef2f2", padding: "8px 12px", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "24px", border: "1px solid #fee2e2", textAlign: "left" }}>
            {error}
          </div>
        )}

        <div className={styles.modalActions} style={{ marginTop: "0", display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={saving}
            style={{ flex: 1, padding: "10px 0" }}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleDelete}
            disabled={saving}
            style={{ flex: 1, padding: "10px 0", backgroundColor: "#dc2626", color: "white", border: "none" }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#b91c1c"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
          >
            {saving ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
