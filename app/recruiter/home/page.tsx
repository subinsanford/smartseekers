"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "../../../components/StatCard";
import { DashboardSkeleton } from "../../../components/DashboardSkeleton";
import { DashboardError } from "../../../components/DashboardError";
import { RequestCreditsModal } from "../../../components/RequestCreditsModal";
import {
  FileText, Users, Clock, CheckCircle2,
  DollarSign, CreditCard, Activity, Bell,
  Mic, Settings, Home, TrendingUp, BarChart3,
  Eye, Pencil, UserCircle, Briefcase, PieChart as PieChartIcon,
  X, Check, AlertTriangle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  getCreditStats,
  getInterviewStats,
  requestCredits,
  CreditStatsResponse,
  InterviewStatsResponse
} from "../../../lib/api";
import styles from "./page.module.css";

/* ─── Static Data (Fallback / Historic) ─── */
const creditTrendData = [
  { month: "Jan", credits: 130 },
  { month: "Feb", credits: 145 },
  { month: "Mar", credits: 160 },
  { month: "Apr", credits: 185 },
  { month: "May", credits: 215 },
  { month: "Jun", credits: 260 },
];

const activeJobs = [
  { title: "Junior Python Developer", added: "26/03/2026" },
  { title: "Junior Data Analyst", added: "06/01/2026" },
  { title: "Senior Cloud Architect 2", added: "10/12/2025" },
];

const draftJobs = [{ title: "ServiceNow Project Manager / Scrum Master" }];

const candidateProfiles = [
  { name: "Karthick Ravi", role: "Software Engineer", initials: "KR", color: "#3b82f6" },
  { name: "Sharat Kariyannavar", role: "Data Engineer", initials: "SK", color: "#22c55e" },
  { name: "Arjen Robbon", role: "Recruiter", initials: "AR", color: "#f59e0b" },
];

/* ─── Page ─── */
export default function RecruiterHome() {
  const router = useRouter();

  // Dashboard loading & data states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creditStats, setCreditStats] = useState<CreditStatsResponse | null>(null);
  const [interviewStats, setInterviewStats] = useState<InterviewStatsResponse | null>(null);

  // Credit Request States
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) {
        router.push("/login");
        return;
      }

      const [cStats, iStats] = await Promise.all([
        getCreditStats(),
        getInterviewStats()
      ]);
      setCreditStats(cStats);
      setInterviewStats(iStats);
    } catch (err: any) {
      console.error("Dashboard failed to fetch stats:", err);
      setError(err.message || "Failed to load dashboard statistics. Please ensure you are logged in.");

      // Auto redirect to login on auth failure
      if (err.message?.toLowerCase().includes("unauthorized") || err.message?.toLowerCase().includes("token") || err.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
        }
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRequestSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRequest(true);
    setRequestError(null);
    setRequestSuccess(false);

    try {
      await requestCredits(requestMessage);
      setRequestSuccess(true);
      setRequestMessage("");
    } catch (err: any) {
      setRequestError(err.message || "Failed to submit credit request.");
    } finally {
      setIsSubmittingRequest(false);
    }
  }, [requestMessage]);

  const templates = useMemo(() => [
    "Hey team, we need more credits to schedule 10 more candidates for the engineering role.",
    "We are expanding our search and need 20 extra credits for upcoming technical interviews.",
    "Need 5 additional credits to schedule final-round panel reviews for our Senior Developer pipeline."
  ], []);

  // Construct Pie Chart Data Dynamically
  const statusColors = useMemo(() => ({
    completed: "#10b981", // green-500
    scheduled: "#f59e0b", // amber-500
    cancelled: "#ef4444", // red-500
    no_show: "#64748b",   // slate-500
    rescheduled: "#3b82f6" // blue-500
  }), []);

  const dynamicStatusData = useMemo(() => [
    { name: "Completed", value: interviewStats?.status_breakdown.completed || 0, color: statusColors.completed },
    { name: "Scheduled", value: interviewStats?.status_breakdown.scheduled || 0, color: statusColors.scheduled },
    { name: "Cancelled", value: interviewStats?.status_breakdown.cancelled || 0, color: statusColors.cancelled },
    { name: "No Show", value: interviewStats?.status_breakdown.no_show || 0, color: statusColors.no_show },
    { name: "Rescheduled", value: interviewStats?.status_breakdown.rescheduled || 0, color: statusColors.rescheduled },
  ].filter(item => item.value > 0), [interviewStats, statusColors]);

  // Construct Dynamic Recruiter Credit Spent Data
  const spentPalette = useMemo(() => ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"], []);
  const totalSpent = useMemo(() => creditStats?.spent_breakdown.reduce((acc, curr) => acc + curr.credits_spent, 0) || 0, [creditStats]);
  const currentBalance = useMemo(() => creditStats?.current_balance || 0, [creditStats]);
  const dynamicMax = useMemo(() => currentBalance + totalSpent || 1000, [currentBalance, totalSpent]);

  const dynamicUserCreditData = useMemo(() => (creditStats?.spent_breakdown || []).map((user, idx) => {
    const initials = user.user_name
      ? user.user_name.split(" ").map(part => part[0]).join("").toUpperCase().slice(0, 2)
      : "U";
    return {
      name: user.user_name || "Unknown User",
      role: user.user_type || "Sub-User",
      credits: user.credits_spent,
      max: dynamicMax,
      color: spentPalette[idx % spentPalette.length],
      initials
    };
  }), [creditStats, dynamicMax, spentPalette]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError message={error} onRetry={loadData} />;
  }

  return (
    <div className={styles.page}>

      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Home size={18} className={styles.topbarHomeIcon} />
          <h1 className={styles.topbarTitle}>Home</h1>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.liveBtn}>
            <span className={styles.liveDot} />
            LIVE
          </button>
          <button className={styles.iconBtn}><Mic size={16} /></button>
          <button className={styles.iconBtn} style={{ position: "relative" }}>
            <Bell size={16} />
            <span className={styles.notifBadge}>1</span>
          </button>
          <button className={styles.iconBtn}><Settings size={16} /></button>
        </div>
      </header>

      {/* Content */}
      <main className={styles.content}>

        {/* ── Stats Row 1 ── */}
        <section className={styles.statsGrid}>
          <StatCard label="Active Jobs Postings" value={activeJobs.length} sub="+0 this month" icon={FileText} />
          <StatCard label="Candidates" value={candidateProfiles.length} sub="+0 this month" icon={Users} />
          <StatCard label="Pending Interviews" value={interviewStats?.status_breakdown.scheduled || 0} sub="Upcoming Interviews" icon={Clock} />
          <StatCard label="Completed Interviews" value={interviewStats?.status_breakdown.completed || 0} sub="This week" icon={CheckCircle2} />
        </section>

        {/* ── Stats Row 2 ── */}
        <section className={styles.statsGrid}>
          <StatCard
            label="Current Balance"
            value={creditStats?.current_balance || 0}
            sub="Available credits"
            icon={DollarSign}
            action={
              <button
                className={styles.requestCreditsTriggerBtn}
                onClick={() => {
                  setRequestSuccess(false);
                  setRequestError(null);
                  setIsRequestModalOpen(true);
                }}
              >
                Request
              </button>
            }
          />
          <StatCard label="Lifetime Purchased" value={creditStats?.lifetime_purchased || 0} sub="Total credits bought" icon={CreditCard} />
          <StatCard label="Total Interviews" value={interviewStats?.status_breakdown.total_interviews || 0} sub="All time interviews" icon={Activity} />
          <StatCard label="Completed" value={interviewStats?.status_breakdown.completed || 0} sub="Successful interviews" icon={CheckCircle2} />
        </section>

        {/* ── Charts Row ── */}
        <section className={styles.chartsRow}>

          {/* Credit Usage Trend */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <TrendingUp size={15} className={styles.cardTitleIcon} />
                <h2 className={styles.cardTitle}>Credit Usage Trend</h2>
              </div>
              <p className={styles.cardSubtitle}>Credits spent over the last 6 months</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={creditTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="creditGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: unknown) => [`${v} credits`, "Usage"]}
                />
                <Area type="monotone" dataKey="credits" stroke="#3b82f6" strokeWidth={2} fill="url(#creditGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Credits Used by Users */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <BarChart3 size={15} className={styles.cardTitleIcon} />
                <h2 className={styles.cardTitle}>Credits Used by Users</h2>
              </div>
              <p className={styles.cardSubtitle}>Distribution of credit usage across team members</p>
            </div>
            <div className={styles.userCreditList}>
              {dynamicUserCreditData.length > 0 ? (
                dynamicUserCreditData.map((u) => (
                  <div key={u.name} className={styles.userCreditRow}>
                    <div className={styles.userCreditAvatar} style={{ background: u.color }}>
                      {u.initials}
                    </div>
                    <div className={styles.userCreditInfo}>
                      <div className={styles.userCreditMeta}>
                        <span className={styles.userCreditName}>{u.name}</span>
                        <span className={styles.userCreditAmount}>{u.credits}</span>
                      </div>
                      <p className={styles.userCreditRole}>{u.role}</p>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${(u.credits / u.max) * 100}%`, background: u.color }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.cardSubtitle} style={{ textAlign: "center", padding: "2rem 0" }}>No recruiter credits usage records found.</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Status & Top Interviews ── */}
        <section className={styles.chartsRow}>

          {/* Interview Status Distribution */}
          <div className={styles.card}>
            <div className={styles.statusCardHeader}>
              <div className={styles.cardTitleGroup}>
                <PieChartIcon size={15} style={{ color: "#6366f1" }} />
                <h2 className={styles.cardTitle}>Interview Status Distribution</h2>
              </div>
              <p className={styles.cardSubtitleRight}>Current breakdown of all Interviews</p>
            </div>
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={dynamicStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                >
                  {dynamicStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Dynamic Status Legend */}
            <div className={styles.pieLegend}>
              {[
                { name: "Cancelled", color: "#ef4444" },
                { name: "Completed", color: "#10b981" },
                { name: "No Show", color: "#64748b" },
                { name: "Rescheduled", color: "#3b82f6" },
                { name: "Scheduled", color: "#f59e0b" },
              ].map((item) => (
                <span key={item.name} className={styles.pieLegendItem}>
                  <span className={styles.pieLegendDot} style={{ background: item.color }} />
                  <span style={{ color: item.color }}>{item.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Top Interviews */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <BarChart3 size={15} className={styles.cardTitleIcon} />
                <h2 className={styles.cardTitle}>Top Interviews</h2>
              </div>
            </div>
            <div className={styles.topInterviewsBody}>
              <p className={styles.topSectionLabel}>Top Jobs</p>
              <div className={styles.topTagsWrap}>
                {interviewStats?.interviews_by_job && interviewStats.interviews_by_job.length > 0 ? (
                  interviewStats.interviews_by_job.slice(0, 5).map((j) => (
                    <span key={j.job_id} className={styles.topTag} style={{ background: "#8b5cf6", color: "#ffffff" }}>
                      <strong style={{ fontSize: "0.72rem" }}>{j.job_title}</strong>
                      <span className={styles.tagCount}>{j.interviews_count} interviews</span>
                    </span>
                  ))
                ) : (
                  <p className={styles.cardSubtitle}>No job interview records.</p>
                )}
              </div>

              <p className={styles.topSectionLabel} style={{ marginTop: "1rem" }}>Top Candidates</p>
              <div className={styles.topTagsWrap}>
                {interviewStats?.interviews_by_candidate && interviewStats.interviews_by_candidate.length > 0 ? (
                  interviewStats.interviews_by_candidate.slice(0, 5).map((c) => (
                    <span key={c.candidate_id} className={styles.topTag} style={{ background: "#60a5fa", color: "#ffffff" }}>
                      <strong style={{ fontSize: "0.72rem" }}>{c.candidate_name}</strong>
                      <span className={styles.tagCount}>{c.interviews_count} interviews</span>
                    </span>
                  ))
                ) : (
                  <p className={styles.cardSubtitle}>No candidate interview records.</p>
                )}
              </div>
              <div className={styles.legendRow}>
                <span className={styles.legendCircle} style={{ background: "#8b5cf6" }} /> Jobs
                <span className={styles.legendCircle} style={{ background: "#60a5fa", marginLeft: 12 }} /> Candidates
              </div>
            </div>
          </div>
        </section>

        {/* ── Active & Draft Jobs ── */}
        <section className={styles.chartsRow}>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <FileText size={15} style={{ color: "#3b82f6" }} />
                <h2 className={styles.cardTitle}>Active Job Postings</h2>
              </div>
            </div>
            <div className={styles.jobList}>
              {activeJobs.map((job) => (
                <div key={job.title} className={styles.jobRow}>
                  <div>
                    <p className={styles.jobTitle}>{job.title}</p>
                    <p className={styles.jobAdded}>Added {job.added}</p>
                  </div>
                  <button className={styles.viewBtn}>
                    <Eye size={13} /> View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <FileText size={15} style={{ color: "#3b82f6" }} />
                <h2 className={styles.cardTitle}>Draft Job Postings</h2>
              </div>
            </div>
            <div className={styles.jobList}>
              {draftJobs.map((job) => (
                <div key={job.title} className={styles.jobRow}>
                  <p className={styles.jobTitle}>{job.title}</p>
                  <button className={styles.editBtn}>
                    <Pencil size={13} /> Edit Draft
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Candidate Profiles ── */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <UserCircle size={15} className={styles.cardTitleIcon} />
              <h2 className={styles.cardTitle}>Candidate Profiles</h2>
            </div>
          </div>
          <div className={styles.candidateGrid}>
            {candidateProfiles.map((c) => (
              <div key={c.name} className={styles.candidateCard}>
                <div className={styles.candidateAvatar} style={{ background: c.color }}>
                  {c.initials}
                </div>
                <div>
                  <p className={styles.candidateName}>{c.name}</p>
                  <p className={styles.candidateRole}>{c.role}</p>
                </div>
                <button className={styles.profileBtn}>
                  <Briefcase size={13} /> View Profile
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Glassmorphic Request Credits Modal Overlay ── */}
      <RequestCreditsModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        requestSuccess={requestSuccess}
        requestError={requestError}
        requestMessage={requestMessage}
        setRequestMessage={setRequestMessage}
        isSubmittingRequest={isSubmittingRequest}
        handleRequestSubmit={handleRequestSubmit}
        templates={templates}
      />

    </div>
  );
}
