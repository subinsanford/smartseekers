import React from "react";
import { Home } from "lucide-react";
import styles from "../app/recruiter/home/page.module.css";

export function DashboardSkeleton() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Home size={18} className={styles.topbarHomeIcon} />
          <h1 className={styles.topbarTitle}>Loading Dashboard...</h1>
        </div>
      </header>
      <main className={styles.content}>
        <section className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.statCard}>
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "60%" }} />
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "80%", height: 36, margin: "8px 0" }} />
              <div className={`${styles.skeleton} ${styles.skeletonTextShort}`} />
            </div>
          ))}
        </section>
        <section className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.statCard}>
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "60%" }} />
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "80%", height: 36, margin: "8px 0" }} />
              <div className={`${styles.skeleton} ${styles.skeletonTextShort}`} />
            </div>
          ))}
        </section>
        <section className={styles.chartsRow}>
          <div className={styles.card}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "40%", height: 20 }} />
            <div className={`${styles.skeleton}`} style={{ width: "100%", height: 220, marginTop: 16 }} />
          </div>
          <div className={styles.card}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: "40%", height: 20 }} />
            <div className={`${styles.skeleton}`} style={{ width: "100%", height: 220, marginTop: 16 }} />
          </div>
        </section>
      </main>
    </div>
  );
}
