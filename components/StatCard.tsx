import React from "react";
import styles from "../app/recruiter/home/page.module.css";

export function StatCard({
  label, value, sub, icon: Icon, action,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; action?: React.ReactNode;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <div style={{ flex: 1 }}>
          <div className={styles.walletHeaderRow}>
            <p className={styles.statLabel}>{label}</p>
            {action}
          </div>
          <p className={styles.statValue}>{value}</p>
          <p className={styles.statSub}>{sub}</p>
        </div>
        <div className={styles.statIconWrap} style={{ marginLeft: 12 }}>
          <Icon size={22} color="#64748b" />
        </div>
      </div>
    </div>
  );
}
