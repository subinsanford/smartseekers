import React from "react";
import { Home, AlertTriangle } from "lucide-react";
import styles from "../app/recruiter/home/page.module.css";

export function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Home size={18} className={styles.topbarHomeIcon} />
          <h1 className={styles.topbarTitle}>Dashboard Error</h1>
        </div>
      </header>
      <main className={styles.content}>
        <div className={styles.errorContainer}>
          <AlertTriangle size={32} color="#dc2626" style={{ marginBottom: "1rem" }} />
          <h2 className={styles.errorTitle}>Error Loading Dashboard</h2>
          <p className={styles.errorMessage}>{message}</p>
          <button className={styles.retryBtn} onClick={onRetry}>
            Retry Loading
          </button>
        </div>
      </main>
    </div>
  );
}
