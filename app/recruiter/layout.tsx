"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  Users,
  ClipboardList,
  Video,
  BarChart2,
  UserCog,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import styles from "./layout.module.css";

const navItems = [
  { label: "Home", href: "/recruiter/home", icon: Home },
  { label: "Job Postings", href: "/recruiter/jobs", icon: Briefcase },
  { label: "Candidate Profiles", href: "/recruiter/candidates", icon: Users },
  { label: "Assignments", href: "/recruiter/assignments", icon: ClipboardList },
  { label: "Interviews", href: "/recruiter/interviews", icon: Video },
  { label: "Interview Analysis", href: "/recruiter/analysis", icon: BarChart2 },
  { label: "Users", href: "/recruiter/users", icon: UserCog },
];

const bottomItems = [
  { label: "Permissions", href: "/recruiter/permissions", icon: Shield },
  { label: "Settings", href: "/recruiter/settings", icon: Settings },
];

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored tokens or auth state here
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Image src="/logo.svg" alt="Smart Seekers" width={120} height={38} style={{ width: "auto" }} priority />
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${pathname === href ? styles.navItemActive : ""}`}
            >
              <Icon size={17} />
              <span>{label}</span>
              {pathname === href && <ChevronRight size={14} className={styles.navChevron} />}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          {bottomItems.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={styles.navItem}>
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={17} />
            <span>Log out</span>
            <span className={styles.issueBadge}>1 Issue ×</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className={styles.mainArea}>
        {children}
      </div>
    </div>
  );
}
