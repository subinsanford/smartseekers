"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import {
  Bell,
  FilePlus,
  MoreVertical,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
  Download
} from "lucide-react";
import { getJobs, JobPosting } from "../../../lib/api";
import { DashboardSkeleton } from "../../../components/DashboardSkeleton";
import { DashboardError } from "../../../components/DashboardError";

export default function JobPostingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getJobs();
      setJobs(res.jobs || []);
    } catch (err: any) {
      console.error("Failed to load jobs:", err);
      setError(err.message || "Failed to load job postings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const filteredJobs = jobs.filter(job => 
    job.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.unique_job_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError message={error} onRetry={loadJobs} />;
  }

  return (
    <div className={styles.page}>
      
      {/* Header Area */}
      <div className={styles.headerArea}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Job Postings</h1>
          <p className={styles.pageSubtitle}>Manage job postings and track candidate applications.</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.liveBtn}>
            <span className={styles.liveIcon} />
            LIVE
            <span className={styles.liveCount}>0</span>
          </button>
          <button className={styles.iconBtn}>
            <Bell size={18} />
            <span className={styles.notifBadge}>16</span>
          </button>
          <button className={styles.actionBtn}>
            <Download size={16} /> Import Job Postings
          </button>
          <button className={styles.actionBtn}>
            <FilePlus size={16} /> Add Job Posting
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className={styles.mainContainer}>
        
        {/* Top Blue Section (Filters & Header) */}
        <div className={styles.blueSection}>
          <div className={styles.filterRow1}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search by Job ID, Job Position, Description or Keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>Clear Filters</button>
          </div>
          <div className={styles.filterRow2}>
            <button className={styles.setBtn}>Set Filters</button>
          </div>
          
          <div className={styles.tableHeader}>
            <div className={styles.colId}>JOB POSTING ID</div>
            <div className={styles.colPos}>JOB POSITION</div>
            <div className={styles.colDate}>POSTED ON</div>
            <div className={styles.colStatus}>STATUS</div>
            <div className={styles.colAction}>ACTIONS</div>
          </div>
        </div>

        {/* Table Body */}
        <div className={styles.tableBody}>
          {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => {
            const statusMap: Record<number, string> = {
              1: "Active",
              2: "Draft",
              3: "Paused"
            };
            const statusStr = statusMap[job.status] || "Draft";
            const statusLower = statusStr.toLowerCase();
            const postedDate = job.created_on ? job.created_on.split(' ')[0] : "--";
            
            return (
              <div key={job.job_id || idx} className={`${styles.tableRow} ${idx % 2 === 1 ? styles.rowAlt : ""}`}>
                <div className={styles.colId}>{job.unique_job_id || job.job_id || "--"}</div>
                <div className={styles.colPos}>{job.job_title || "Untitled Position"}</div>
                <div className={styles.colDate}>{postedDate}</div>
                <div className={styles.colStatus}>
                  <span className={`${styles.statusText} ${styles[statusLower] || ""}`}>{statusStr}</span>
                </div>
                <div className={styles.colAction}>
                  <button className={styles.moreBtn}>
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            );
          }) : (
             <div className={styles.tableRow} style={{ justifyContent: "center", color: "#64748b", padding: "2rem" }}>
               No job postings found.
             </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className={styles.paginationArea}>
          <div className={styles.pageControls}>
            <button className={styles.pageNavBtn}><ChevronsLeft size={16} /></button>
            <button className={styles.pageNavBtn}><ChevronLeft size={16} /></button>
            <button className={`${styles.pageNavBtn} ${styles.pageNavActive}`}>1</button>
            <button className={styles.pageNavBtn}><ChevronRight size={16} /></button>
            <button className={styles.pageNavBtn}><ChevronsRight size={16} /></button>
            <span className={styles.pageInfo}>Page 1 of 1</span>
          </div>
          <div className={styles.rowsSelector}>
            <span>Rows per page:</span>
            <div className={styles.dropdown}>
              10 <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
