"use client";

import {
  FileText, Users, Clock, CheckCircle2,
  DollarSign, CreditCard, Activity, Bell,
  Mic, Settings, Home, TrendingUp, BarChart3,
  Eye, Pencil, UserCircle, Briefcase
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import styles from "./page.module.css";

/* ─── Data ─── */
const creditTrendData = [
  { month: "Jan", credits: 130 },
  { month: "Feb", credits: 145 },
  { month: "Mar", credits: 160 },
  { month: "Apr", credits: 185 },
  { month: "May", credits: 215 },
  { month: "Jun", credits: 260 },
];

const userCreditData = [
  { name: "Sharat Kariyannavar", role: "Main Admin",  credits: 1150, max: 1300, color: "#3b82f6", initials: "S" },
  { name: "Unknown",             role: "Sub-User",    credits: 1300, max: 1300, color: "#f59e0b", initials: "U" },
];

const interviewStatusData = [
  { name: "Cancelled",   value: 2, color: "#ef4444" },
  { name: "Completed",   value: 6, color: "#22c55e" },
  { name: "No Show",     value: 1, color: "#6b7280" },
  { name: "Rescheduled", value: 3, color: "#3b82f6" },
  { name: "Scheduled",   value: 3, color: "#f59e0b" },
];

const topJobs = [
  { title: "Senior Cloud Architect",                    interviews: 4 },
  { title: "Junior Data Analyst",                       interviews: 4 },
  { title: "Data Analyst",                              interviews: 3 },
  { title: "ServiceNow Project Manager / Scrum Master", interviews: 2 },
  { title: "Junior Python Developer",                   interviews: 4 },
];

const topCandidates = [
  { name: "Karthick Ravi",          interviews: 5 },
  { name: "Sharat Kariyannavar",    interviews: 5 },
  { name: "Sharat Karlyannavar",    interviews: 3 },
  { name: "SHARAT KARIYANNAVAR",    interviews: 1 },
];

const activeJobs = [
  { title: "Junior Python Developer",  added: "26/03/2026" },
  { title: "Junior Data Analyst",      added: "06/01/2026" },
  { title: "Senior Cloud Architect 2", added: "10/12/2025" },
];

const draftJobs = [{ title: "ServiceNow Project Manager / Scrum Master" }];

const candidateProfiles = [
  { name: "Karthick Ravi",       role: "Software Engineer", initials: "KR", color: "#3b82f6" },
  { name: "Sharat Kariyannavar", role: "Data Engineer",     initials: "SK", color: "#22c55e" },
  { name: "Arjen Robbon",        role: "Recruiter",         initials: "AR", color: "#f59e0b" },
];

/* ─── Stat Card ─── */
function StatCard({
  label, value, sub, icon: Icon,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <div>
          <p className={styles.statLabel}>{label}</p>
          <p className={styles.statValue}>{value}</p>
          <p className={styles.statSub}>{sub}</p>
        </div>
        <div className={styles.statIconWrap}>
          <Icon size={22} color="#64748b" />
        </div>
      </div>
    </div>
  );
}

/* ─── Custom Pie Label ─── */
const RADIAN = Math.PI / 180;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCustomLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

/* ─── Page ─── */
export default function RecruiterHome() {
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
          <StatCard label="Active Jobs Postings"   value={6}  sub="+0 this month"        icon={FileText}      />
          <StatCard label="Candidates"             value={5}  sub="+0 this month"        icon={Users}         />
          <StatCard label="Pending Interviews"     value={0}  sub="Upcoming Interviews"  icon={Clock}         />
          <StatCard label="Completed Interviews"   value={2}  sub="This week"            icon={CheckCircle2}  />
        </section>

        {/* ── Stats Row 2 ── */}
        <section className={styles.statsGrid}>
          <StatCard label="Current Balance"    value="8160" sub="Available credits"    icon={DollarSign}  />
          <StatCard label="Lifetime Purchased" value="410"  sub="Total credits bought" icon={CreditCard}  />
          <StatCard label="Total Interviews"   value={15}   sub="All time interviews"  icon={Activity}    />
          <StatCard label="Completed"          value={6}    sub="Successful interviews" icon={CheckCircle2} />
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
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
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
              {userCreditData.map((u) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* ── Status & Top Interviews ── */}
        <section className={styles.chartsRow}>

          {/* Interview Status Distribution */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <Clock size={15} className={styles.cardTitleIcon} />
                <h2 className={styles.cardTitle}>Interview Status Distribution</h2>
              </div>
              <p className={styles.cardSubtitle}>Current breakdown of all Interviews</p>
            </div>
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={interviewStatusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {interviewStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
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
                {topJobs.map((j) => (
                  <span key={j.title} className={styles.topTag} style={{ background: "#ede9fe", color: "#6d28d9" }}>
                    <strong style={{ fontSize: "0.72rem" }}>{j.title}</strong>
                    <span className={styles.tagCount}>{j.interviews} interviews</span>
                  </span>
                ))}
              </div>
              <p className={styles.topSectionLabel} style={{ marginTop: "1rem" }}>Top Candidates</p>
              <div className={styles.topTagsWrap}>
                {topCandidates.map((c) => (
                  <span key={c.name} className={styles.topTag} style={{ background: "#e0e7ff", color: "#4338ca" }}>
                    <strong style={{ fontSize: "0.72rem" }}>{c.name}</strong>
                    <span className={styles.tagCount}>{c.interviews} interviews</span>
                  </span>
                ))}
              </div>
              <div className={styles.legendRow}>
                <span className={styles.legendDot} style={{ background: "#6d28d9" }} /> Jobs
                <span className={styles.legendDot} style={{ background: "#4338ca", marginLeft: 12 }} /> Candidates
              </div>
            </div>
          </div>
        </section>

        {/* ── Active & Draft Jobs ── */}
        <section className={styles.chartsRow}>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <FileText size={15} style={{ color: "#f59e0b" }} />
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
                <FileText size={15} style={{ color: "#f59e0b" }} />
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
    </div>
  );
}
