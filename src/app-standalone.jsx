
import React, { useState, useMemo, useEffect } from "react";

// ---------- Inline icon set (replaces lucide-react, which needs npm/a bundler) ----------
function mkIcon(children) {
  return function IconComp({ size = 16, color = "currentColor", strokeWidth = 2, style }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
        {children}
      </svg>
    );
  };
}
const LayoutGrid = mkIcon(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>);
const CheckSquare = mkIcon(<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>);
const Target = mkIcon(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>);
const FolderKanban = mkIcon(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>);
const Bell = mkIcon(<><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>);
const BellRing = Bell;
const BellOff = mkIcon(<><path d="M18 8a6 6 0 00-9.33-5" /><path d="M6.26 6.26A6 6 0 006 8c0 7-3 9-3 9h13" /><path d="M18 8a6 6 0 01.79 3.63" /><path d="M13.73 21a2 2 0 01-3.46 0" /><path d="M1 1l22 22" /></>);
const Users = mkIcon(<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>);
const StickyNote = mkIcon(<><path d="M14 3v4a1 1 0 001 1h4" /><path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" /></>);
const Plus = mkIcon(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
const X = mkIcon(<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>);
const Check = mkIcon(<path d="M20 6L9 17l-5-5" />);
const ClockIcon = mkIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>);
const ChevronRight = mkIcon(<path d="M9 6l6 6-6 6" />);
const ArrowLeft = mkIcon(<><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></>);
const RotateCcw = mkIcon(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></>);
const Zap = function ZapIcon({ size = 16, color = "currentColor", fill = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
};
const Flame = function FlameIcon({ size = 16, color = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" style={style}>
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
};
const Circle = mkIcon(<circle cx="12" cy="12" r="9" />);

// ---------- Design tokens ----------
const COLORS = {
  bg: "var(--ff-bg)",
  bgElevated: "var(--ff-bg-elevated)",
  bgCard: "var(--ff-card)",
  border: "var(--ff-border)",
  text: "var(--ff-text)",
  textDim: "var(--ff-dim)",
  textFaint: "var(--ff-faint)",
  amber: "var(--ff-accent)",
  amberDim: "var(--ff-accent-dim)",
  sage: "var(--ff-sage)",
  coral: "var(--ff-coral)",
};

const FONTS = {
  display: "'Fraunces', serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ---------- Brand Logo Component ----------
function BrandLogo({ size = 30, showText = true }) {
  return (
    <a
      href="/"
      target="_top"
      title="FocusFlow - Back to home"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.32),
        background: "linear-gradient(135deg, #2563EB 0%, #6366F1 50%, #9333EA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(99, 102, 241, 0.45)",
        flexShrink: 0,
      }}>
        <svg width={Math.round(size * 0.58)} height={Math.round(size * 0.58)} viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      {showText && (
        <span style={{
          fontFamily: FONTS.display,
          fontSize: 18,
          fontWeight: 700,
          background: "linear-gradient(90deg, #60A5FA 0%, #A5B4FC 50%, #C084FC 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.01em",
        }}>
          FocusFlow
        </span>
      )}
    </a>
  );
}
const CheckCircle2 = mkIcon(<><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></>);
const Phone = mkIcon(<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />);
const Mail = mkIcon(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></>);
const CalendarIcon = mkIcon(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></>);
const Trash2 = mkIcon(<><path d="M3 6h18" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M10 11v6" /><path d="M14 11v6" /></>);
const Edit3 = mkIcon(<><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" /></>);
const Eye = mkIcon(<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>);
const Sun = mkIcon(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M4.93 19.07l1.41-1.41" /><path d="M17.66 6.34l1.41-1.41" /></>);
const Moon = mkIcon(<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />);
const WifiOff = mkIcon(<><path d="M1 1l22 22" /><path d="M16.72 11.06A10.94 10.94 0 0119 12.55" /><path d="M5 12.55a10.94 10.94 0 015.17-2.39" /><path d="M10.71 5.05A16 16 0 0122.58 9" /><path d="M1.42 9a15.91 15.91 0 014.7-2.88" /><path d="M8.53 16.11a6 6 0 016.95 0" /><path d="M12 20h.01" /></>);
// Clock/Calendar aliasing to match original names used throughout the app body
const Clock = ClockIcon;

// ---------- Real API client (talks to your live backend) ----------
const API_URL = "https://focus-flow-vipw.onrender.com";

async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API error ${res.status}: ${text}`);
    }
    if (res.status === 204) return null;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json().catch(() => null);
    }
    return null;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

const api = {
  base: API_URL,
  list: (resource) => apiRequest(`/api/${resource}`),
  create: (resource, data) => apiRequest(`/api/${resource}`, { method: "POST", body: JSON.stringify(data) }),
  update: (resource, id, data) => apiRequest(`/api/${resource}/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  remove: (resource, id) => apiRequest(`/api/${resource}/${id}`, { method: "DELETE" }),
  getVapidKey: () => apiRequest("/api/push/vapid-public-key"),
  subscribePush: (subscription) => apiRequest("/api/push/subscribe", { method: "POST", body: JSON.stringify(subscription) }),
  unsubscribePush: (endpoint) => apiRequest("/api/push/unsubscribe", { method: "POST", body: JSON.stringify({ endpoint }) }),
  testPush: () => apiRequest("/api/push/test", { method: "POST" }),
};

// ---------- Real push & notification logic ----------
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

async function triggerNotification(title, options = {}, delay = 0) {
  const notificationOptions = {
    icon: "/pwa-192x192.png",
    badge: "/icon.svg",
    ...options,
  };

  // Preferred: Service Worker registration (supported on installed PWAs, iOS 16.4+ Home Screen, Android)
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready.catch(() => null);
      if (reg) {
        if (delay > 0) {
          if (reg.active) {
            reg.active.postMessage({
              type: "TRIGGER_NOTIFICATION",
              title,
              options: notificationOptions,
              delay,
            });
            return true;
          }
          setTimeout(() => {
            reg.showNotification(title, notificationOptions).catch(() => {});
          }, delay);
          return true;
        } else if (reg.showNotification) {
          await reg.showNotification(title, notificationOptions);
          return true;
        }
      }
    } catch (err) {
      console.warn("ServiceWorker showNotification error, trying fallback:", err);
    }
  }

  // Fallback: standard Window Notification
  if ("Notification" in window && Notification.permission === "granted") {
    if (delay > 0) {
      setTimeout(() => {
        try { new Notification(title, notificationOptions); } catch {}
      }, delay);
    } else {
      try { new Notification(title, notificationOptions); } catch {}
    }
    return true;
  }
  return false;
}

async function enablePushNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { status: "unsupported" };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return { status: permission }; // "denied" or "default"
    }

    // Try Web Push subscription if backend VAPID is configured
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const vapid = await api.getVapidKey().catch(() => null);
        if (vapid && vapid.configured && vapid.publicKey) {
          const reg = await Promise.race([
            navigator.serviceWorker.ready,
            new Promise((_, reject) => setTimeout(() => reject(new Error("SW timeout")), 2000)),
          ]).catch(() => null);
          if (reg && reg.pushManager) {
            let sub = await reg.pushManager.getSubscription().catch(() => null);
            if (!sub) {
              sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapid.publicKey),
              }).catch(() => null);
            }
            if (sub) {
              await api.subscribePush(sub.toJSON()).catch(() => {});
            }
          }
        }
      } catch (err) {
        console.warn("Server push subscription skipped:", err);
      }
    }

    // Send immediate confirmation notification to verify Home Screen / device alerts
    await triggerNotification("FocusFlow Notifications Active 🎉", {
      body: "You're all set! You will now receive timely reminders for your scheduled tasks.",
      tag: "focusflow-activated",
    });

    return { status: "granted" };
  } catch (err) {
    console.error("Failed to enable notifications:", err);
    return { status: "error", error: err };
  }
}

async function getPushStatus() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return "prompt";
}

// ---------- API field mapping ----------
function mapContactFromApi(row) {
  return { ...row, followUp: row.follow_up };
}
function mapReminderFromApi(row) {
  const local = utcDateTimeToLocal(row.date, row.time);
  return { ...row, date: local.date, time: local.time };
}

// ---------- Sample data ----------
const todayStr = () => new Date().toISOString().slice(0, 10);
const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

// Local <-> UTC conversion for reminders, so the scheduler (which runs in
// UTC) fires at the right real-world moment no matter what region the
// server is deployed in or what time zone the device is in.
function localDateTimeToUTC(dateStr, timeStr) {
  const local = new Date(`${dateStr}T${timeStr}:00`);
  const utcDate = `${local.getUTCFullYear()}-${String(local.getUTCMonth() + 1).padStart(2, "0")}-${String(local.getUTCDate()).padStart(2, "0")}`;
  const utcTime = `${String(local.getUTCHours()).padStart(2, "0")}:${String(local.getUTCMinutes()).padStart(2, "0")}`;
  return { date: utcDate, time: utcTime };
}
function utcDateTimeToLocal(dateStr, timeStr) {
  const utc = new Date(`${dateStr}T${timeStr}:00Z`);
  const localDate = `${utc.getFullYear()}-${String(utc.getMonth() + 1).padStart(2, "0")}-${String(utc.getDate()).padStart(2, "0")}`;
  const localTime = `${String(utc.getHours()).padStart(2, "0")}:${String(utc.getMinutes()).padStart(2, "0")}`;
  return { date: localDate, time: localTime };
}

const initialTasks = [
  { id: "t1", name: "Welcome to FocusFlow! Check off this task to get started", due: todayStr(), priority: "Medium", status: "Pending", notes: "Tap any item to edit details, or tap the + button to add your own." },
  { id: "t2", name: "Define top 3 priorities for today", due: todayStr(), priority: "High", status: "Pending", notes: "Focus on the high-impact tasks first." },
];

const initialGoals = [
  { id: "g1", name: "Build a consistent daily focus habit", target: addDays(30), progress: 10, notes: "Break your ambitions into clear, manageable steps." },
];

const initialProjects = [
  { id: "p1", name: "My First Project", deadline: addDays(14), status: "In Progress", description: "Organize tasks and track milestones together in one place.", notes: "" },
];

const initialReminders = [
  { id: "r1", title: "Daily Review & Wind Down", date: todayStr(), time: "18:00", priority: "Low", notes: "Review today's achievements and set up tomorrow." },
];

const initialContacts = [];

const initialNotes = [
  { id: "n1", title: "Welcome Note", content: "FocusFlow is your personal focus dashboard. Everything you create, complete, or edit is stored automatically on your device.", date: todayStr() },
];

// ---------- Local Storage Persistence ----------
function getStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(`ff_${key}`);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read local storage for", key, err);
  }
  return fallback;
}

function saveStored(key, data) {
  try {
    window.localStorage.setItem(`ff_${key}`, JSON.stringify(data));
  } catch (err) {
    console.warn("Could not save to local storage for", key, err);
  }
}

// ---------- Small helpers ----------
const priorityColor = (p) => (p === "High" ? COLORS.coral : p === "Medium" ? COLORS.amber : COLORS.sage);
const statusColor = (s) => (s === "Completed" ? COLORS.sage : s === "In Progress" ? COLORS.amber : COLORS.textDim);

function fmtDate(dstr) {
  const d = new Date(dstr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function daysUntil(dstr) {
  const d = new Date(dstr + "T00:00:00");
  const today = new Date(todayStr() + "T00:00:00");
  return Math.round((d - today) / 86400000);
}
function dueLabel(dstr) {
  const n = daysUntil(dstr);
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  if (n === -1) return "Yesterday";
  if (n < 0) return `${Math.abs(n)}d overdue`;
  return fmtDate(dstr);
}

// ---------- Reusable UI ----------
function Pill({ children, color, filled }) {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 11,
        letterSpacing: 0.3,
        padding: "3px 8px",
        borderRadius: 999,
        border: `1px solid ${color}`,
        color: filled ? COLORS.bg : color,
        background: filled ? color : "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: 16,
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.15s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
      <div>
        {eyebrow && (
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.amber, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 600, color: COLORS.text, margin: 0 }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}

function IconButton({ icon: Icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: COLORS.amber, color: "#FFFFFF",
        border: "none", borderRadius: 10, padding: "9px 14px",
        fontFamily: FONTS.body, fontSize: 13, fontWeight: 600,
        cursor: "pointer",
      }}
    >
      <Icon size={15} /> {label}
    </button>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{ padding: "32px 16px", textAlign: "center", color: COLORS.textFaint, fontFamily: FONTS.body, fontSize: 13.5 }}>
      {text}
    </div>
  );
}

// Small row of icon-only action buttons used on every card (view / edit / delete)
function CardActions({ onView, onEdit, onDelete }) {
  const btnStyle = {
    background: "none", border: "none", color: COLORS.textFaint, cursor: "pointer",
    padding: 4, display: "flex", alignItems: "center",
  };
  return (
    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
      {onView && (
        <button onClick={onView} style={btnStyle} aria-label="View"><Eye size={15} /></button>
      )}
      {onEdit && (
        <button onClick={onEdit} style={btnStyle} aria-label="Edit"><Edit3 size={15} /></button>
      )}
      {onDelete && (
        <button onClick={onDelete} style={btnStyle} aria-label="Delete"><Trash2 size={15} /></button>
      )}
    </div>
  );
}

// Modal for add/edit forms
function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(8,10,14,0.7)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 100, backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.bgElevated, borderTop: `1px solid ${COLORS.border}`,
          borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480,
          maxHeight: "85vh", overflowY: "auto", padding: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textDim, cursor: "pointer", padding: 4 }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", background: COLORS.bgCard,
  border: `1px solid ${COLORS.border}`, borderRadius: 9, padding: "10px 12px",
  color: COLORS.text, fontFamily: FONTS.body, fontSize: 14, outline: "none",
};

function TextInput(props) { return <input {...props} style={inputStyle} />; }
function TextArea(props) { return <textarea {...props} rows={3} style={{ ...inputStyle, resize: "vertical", fontFamily: FONTS.body }} />; }
function Select({ options, ...props }) {
  return (
    <select {...props} style={inputStyle}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// Custom 24-hour time picker. Native <input type="time"> displays in
// 12-hour AM/PM format on devices set to that regional format, which we
// don't want — this always shows and stores HH:MM in 24-hour time,
// regardless of the device's own settings.
function TimeInput24({ name, defaultValue = "09:00" }) {
  const [hh, mm] = (defaultValue || "09:00").split(":");
  const [hour, setHour] = useState(hh || "09");
  const [minute, setMinute] = useState(mm || "00");
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select value={hour} onChange={(e) => setHour(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
        {hours.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
      <span style={{ color: COLORS.textDim, fontFamily: FONTS.mono }}>:</span>
      <select value={minute} onChange={(e) => setMinute(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
        {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      {/* Hidden field so the surrounding <form>'s FormData/e.target picks up
          a single combined "HH:MM" value under the given field name. */}
      <input type="hidden" name={name} value={`${hour}:${minute}`} />
    </div>
  );
}

function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      style={{
        width: "100%", background: COLORS.amber, color: "#FFFFFF", border: "none",
        borderRadius: 10, padding: "12px", fontFamily: FONTS.body, fontWeight: 700,
        fontSize: 14, cursor: "pointer", marginTop: 6,
      }}
    >
      {children}
    </button>
  );
}

// Read-only view row used inside the "view" modal
function ViewRow({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.text, lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  );
}

function ViewActions({ onEdit, onClose }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
      <button
        onClick={onClose}
        style={{
          flex: 1, background: "transparent", color: COLORS.textDim, border: `1px solid ${COLORS.border}`,
          borderRadius: 10, padding: "12px", fontFamily: FONTS.body, fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}
      >
        Close
      </button>
      <button
        onClick={onEdit}
        style={{
          flex: 1, background: COLORS.amber, color: "#FFFFFF", border: "none",
          borderRadius: 10, padding: "12px", fontFamily: FONTS.body, fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <Edit3 size={15} /> Edit
      </button>
    </div>
  );
}

// ---------- Splash screen (shown while data loads) ----------
function SplashScreen({ exiting }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 18, zIndex: 9999,
      willChange: "opacity, transform",
      opacity: exiting ? 0 : 1,
      transform: exiting ? "scale(1.03)" : "scale(1)",
      transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      pointerEvents: exiting ? "none" : "auto",
    }}>
      <style>{`
        @keyframes ff-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.9; }
        }
        @keyframes ff-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ff-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .ff-splash-mark { animation: ff-pulse 1.8s ease-in-out infinite; }
        .ff-splash-text { animation: ff-fade-in 0.5s ease 0.1s both; }
      `}</style>
      <div className="ff-splash-mark" style={{
        width: 64, height: 64, borderRadius: 18,
        background: "linear-gradient(135deg, #2563EB 0%, #6366F1 50%, #9333EA 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 20px 60px -12px rgba(99, 102, 241, 0.6)",
        animationPlayState: exiting ? "paused" : "running",
      }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <div className="ff-splash-text" style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700,
          background: "linear-gradient(90deg, #60A5FA 0%, #A5B4FC 50%, #C084FC 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          FocusFlow
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "#9A99AC", marginTop: 6 }}>
          Loading your day…
        </div>
      </div>
      <div style={{
        width: 140, height: 3, background: "rgba(255, 255, 255, 0.1)",
        borderRadius: 999, overflow: "hidden", marginTop: 8,
      }}>
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(90deg, transparent 0%, #3B82F6 30%, #818CF8 60%, #C084FC 90%, transparent 100%)",
          borderRadius: 999,
          animation: "ff-shimmer 1.5s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

// ---------- Focus Ring (signature element) ----------
function FocusRing({ pct, size = 96 }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={COLORS.border} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={COLORS.amber} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

// ---------- Main App ----------
function FocusFlow() {
  const [tab, setTab] = useState("dashboard");
  const [tasks, setTasks] = useState(() => getStored("tasks", initialTasks));
  const [goals, setGoals] = useState(() => getStored("goals", initialGoals));
  const [projects, setProjects] = useState(() => getStored("projects", initialProjects));
  const [reminders, setReminders] = useState(() => getStored("reminders", initialReminders));
  const [contacts, setContacts] = useState(() => getStored("contacts", initialContacts));
  const [notes, setNotes] = useState(() => getStored("notes", initialNotes));
  const [modal, setModal] = useState(null); // { type, mode: 'add'|'view'|'edit', item? }
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [pushStatus, setPushStatus] = useState("unknown");
  const [isStandaloneApp, setIsStandaloneApp] = useState(() => {
    if (typeof window === "undefined") return false;
    const searchParams = new URLSearchParams(window.location.search);
    const isPwaSource = searchParams.get("source") === "pwa" || searchParams.get("standalone") === "true";
    const isStandaloneDisplay =
      (window.matchMedia && (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: fullscreen)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches
      )) ||
      window.navigator.standalone === true;
    return Boolean(isPwaSource || isStandaloneDisplay);
  });
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return window.localStorage.getItem("focusflow-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const toggleTheme = () => {
    setThemeMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      try { window.localStorage.setItem("focusflow-theme", next); } catch {}
      return next;
    });
  };

  // Automatically persist user changes to localStorage whenever state changes
  React.useEffect(() => { saveStored("tasks", tasks); }, [tasks]);
  React.useEffect(() => { saveStored("goals", goals); }, [goals]);
  React.useEffect(() => { saveStored("projects", projects); }, [projects]);
  React.useEffect(() => { saveStored("reminders", reminders); }, [reminders]);
  React.useEffect(() => { saveStored("contacts", contacts); }, [contacts]);
  React.useEffect(() => { saveStored("notes", notes); }, [notes]);

  const handleResetToFresh = () => {
    if (window.confirm("Start fresh? This will clear all data and restore a clean, fresh starter dashboard.")) {
      try {
        ["ff_tasks", "ff_goals", "ff_projects", "ff_reminders", "ff_contacts", "ff_notes"].forEach((k) =>
          window.localStorage.removeItem(k)
        );
      } catch (err) {
        console.warn("Storage clear error:", err);
      }
      setTasks(initialTasks);
      setGoals(initialGoals);
      setProjects(initialProjects);
      setReminders(initialReminders);
      setContacts(initialContacts);
      setNotes(initialNotes);
    }
  };

  React.useEffect(() => {
    let cancelled = false;

    // Check if launched in standalone PWA / Home Screen mode
    const checkStandalone = () => {
      if (typeof window === "undefined") return false;
      const searchParams = new URLSearchParams(window.location.search);
      const isPwaSource = searchParams.get("source") === "pwa" || searchParams.get("standalone") === "true";
      const isStandaloneDisplay =
        (window.matchMedia && (
          window.matchMedia("(display-mode: standalone)").matches ||
          window.matchMedia("(display-mode: fullscreen)").matches ||
          window.matchMedia("(display-mode: minimal-ui)").matches
        )) ||
        window.navigator.standalone === true;
      return Boolean(isPwaSource || isStandaloneDisplay);
    };

    const standaloneNow = checkStandalone();
    setIsStandaloneApp(standaloneNow);

    // Calculate how long the splash has been visible since initial HTML document load
    const splashStarted = (typeof window !== "undefined" && window.__splashStartTime) || Date.now();
    const elapsed = Date.now() - splashStarted;

    // Target a relaxed, moderate duration (2.2s for home screen / direct launch, 1.6s for web)
    // to give a smooth native loading feel with progress animation, eliminating the "view once" flash.
    const TARGET_DURATION = standaloneNow ? 2200 : 1600;
    const remaining = Math.max(700, TARGET_DURATION - elapsed);

    const timer = setTimeout(() => {
      if (cancelled) return;
      setSplashFading(true);

      // Fade out the initial HTML splash in lockstep with the React splash
      const initialEl = document.getElementById("initial-app-splash");
      if (initialEl) {
        initialEl.style.transition = "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";
        initialEl.style.opacity = "0";
        initialEl.style.transform = "scale(1.03)";
        initialEl.style.pointerEvents = "none";
      }

      setTimeout(() => {
        if (!cancelled) {
          setShowSplash(false);
          if (initialEl) initialEl.style.display = "none";
        }
      }, 520);
    }, remaining);

    getPushStatus().then(setPushStatus).catch(() => setPushStatus("unsupported"));

    const handleMediaChange = () => {
      if (!cancelled) {
        setIsStandaloneApp(checkStandalone());
      }
    };

    let mq;
    if (typeof window !== "undefined" && window.matchMedia) {
      mq = window.matchMedia("(display-mode: standalone)");
      if (mq.addEventListener) {
        mq.addEventListener("change", handleMediaChange);
      } else if (mq.addListener) {
        mq.addListener(handleMediaChange);
      }
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (mq) {
        if (mq.removeEventListener) {
          mq.removeEventListener("change", handleMediaChange);
        } else if (mq.removeListener) {
          mq.removeListener(handleMediaChange);
        }
      }
    };
  }, []);

  const [testNoticeMsg, setTestNoticeMsg] = useState("");

  const todayTasks = useMemo(() => tasks.filter((t) => t.due === todayStr()), [tasks]);
  const completedToday = todayTasks.filter((t) => t.status === "Completed").length;
  const upcomingReminders = useMemo(
    () => [...reminders].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4),
    [reminders]
  );
  const activeProjects = projects.filter((p) => p.status !== "Completed");
  const avgGoalProgress = goals.length ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;

  const overallFocus = useMemo(() => {
    const taskPct = todayTasks.length ? (completedToday / todayTasks.length) * 100 : 0;
    return Math.round(taskPct * 0.5 + avgGoalProgress * 0.5);
  }, [todayTasks, completedToday, avgGoalProgress]);

  const toggleTaskStatus = (id) => {
    setTasks((ts) => ts.map((t) => {
      if (t.id !== id) return t;
      const next = t.status === "Completed" ? "Pending" : t.status === "Pending" ? "In Progress" : "Completed";
      api.update("tasks", id, { status: next }).catch((err) => console.error("Failed to save task:", err));
      return { ...t, status: next };
    }));
  };

  async function handleEnablePush() {
    const result = await enablePushNotifications();
    const nextStatus = result.status === "granted" || result.status === "subscribed" ? "granted" : result.status;
    setPushStatus(nextStatus);
    if (nextStatus === "granted") {
      setTestNoticeMsg("🎉 Notifications active! Tap 'Test Alert' to verify on your device or lock screen.");
      setTimeout(() => setTestNoticeMsg(""), 6000);
    }
  }

  async function handleSendTestNotification() {
    setTestNoticeMsg("⏰ Test alert will appear in 3 seconds. Lock your phone or switch apps to test!");
    await triggerNotification(
      "FocusFlow Reminder Test 🎯",
      {
        body: "Notifications are working smoothly from your Home Screen! Time for your focus session.",
        tag: "focusflow-test-alert",
      },
      3000
    );
    setTimeout(() => setTestNoticeMsg(""), 7000);
  }

  // Periodic reminder checking engine (every 25 seconds)
  React.useEffect(() => {
    if (pushStatus !== "granted" && pushStatus !== "subscribed") return;

    const checkDueReminders = async () => {
      const now = new Date();
      const curDate = todayStr();
      const curH = String(now.getHours()).padStart(2, "0");
      const curM = String(now.getMinutes()).padStart(2, "0");
      const curTime = `${curH}:${curM}`;

      let notified = {};
      try {
        notified = JSON.parse(sessionStorage.getItem("ff_notified_reminders") || "{}");
      } catch {}

      const due = reminders.filter((r) => {
        if (notified[r.id]) return false;
        if (r.date === curDate) {
          if (!r.time || r.time <= curTime) return true;
        }
        return false;
      });

      if (due.length > 0) {
        for (const r of due) {
          notified[r.id] = Date.now();
          await triggerNotification(`Reminder: ${r.title}`, {
            body: r.notes || `Scheduled for today at ${r.time || "now"}`,
            tag: `reminder-${r.id}`,
          });
        }
        try {
          sessionStorage.setItem("ff_notified_reminders", JSON.stringify(notified));
        } catch {}
      }
    };

    const interval = setInterval(checkDueReminders, 25000);
    checkDueReminders();
    return () => clearInterval(interval);
  }, [reminders, pushStatus]);

  // ---------- Add handlers ----------
  function handleAddTask(e) {
    e.preventDefault();
    const f = e.target;
    const payload = { name: f.name.value, due: f.due.value || todayStr(), priority: f.priority.value, status: f.status.value, notes: f.notes.value };
    const tempId = `t_local_${Date.now()}`;
    setTasks((ts) => [{ id: tempId, ...payload }, ...ts]);
    api.create("tasks", payload)
      .then((row) => setTasks((ts) => ts.map((t) => (t.id === tempId ? row : t))))
      .catch((err) => console.error("Failed to save task:", err));
    setModal(null);
  }
  function handleAddGoal(e) {
    e.preventDefault();
    const f = e.target;
    const payload = { name: f.name.value, target: f.target.value || addDays(30), progress: Number(f.progress.value) || 0, notes: f.notes.value };
    const tempId = `g_local_${Date.now()}`;
    setGoals((gs) => [{ id: tempId, ...payload }, ...gs]);
    api.create("goals", payload)
      .then((row) => setGoals((gs) => gs.map((g) => (g.id === tempId ? row : g))))
      .catch((err) => console.error("Failed to save goal:", err));
    setModal(null);
  }
  function handleAddProject(e) {
    e.preventDefault();
    const f = e.target;
    const payload = { name: f.name.value, deadline: f.deadline.value || addDays(14), status: f.status.value, description: f.description.value, notes: f.notes.value };
    const tempId = `p_local_${Date.now()}`;
    setProjects((ps) => [{ id: tempId, ...payload }, ...ps]);
    api.create("projects", payload)
      .then((row) => setProjects((ps) => ps.map((p) => (p.id === tempId ? row : p))))
      .catch((err) => console.error("Failed to save project:", err));
    setModal(null);
  }
  function handleAddReminder(e) {
    e.preventDefault();
    const f = e.target;
    const localDate = f.date.value || todayStr();
    const localTime = f.time.value || "09:00";
    const utc = localDateTimeToUTC(localDate, localTime);
    const payload = { title: f.title.value, date: utc.date, time: utc.time, priority: f.priority.value, notes: f.notes.value };
    const tempId = `r_local_${Date.now()}`;
    setReminders((rs) => [{ id: tempId, title: payload.title, date: localDate, time: localTime, priority: payload.priority, notes: payload.notes }, ...rs]);
    api.create("reminders", payload)
      .then((row) => setReminders((rs) => rs.map((r) => (r.id === tempId ? mapReminderFromApi(row) : r))))
      .catch((err) => console.error("Failed to save reminder:", err));
    setModal(null);
  }
  function handleAddContact(e) {
    e.preventDefault();
    const f = e.target;
    const payload = { name: f.name.value, phone: f.phone.value, email: f.email.value, follow_up: f.followUp.value || addDays(7), notes: f.notes.value };
    const tempId = `c_local_${Date.now()}`;
    setContacts((cs) => [{ id: tempId, ...payload, followUp: payload.follow_up }, ...cs]);
    api.create("contacts", payload)
      .then((row) => setContacts((cs) => cs.map((c) => (c.id === tempId ? mapContactFromApi(row) : c))))
      .catch((err) => console.error("Failed to save contact:", err));
    setModal(null);
  }
  function handleAddNote(e) {
    e.preventDefault();
    const f = e.target;
    const payload = { title: f.title.value, content: f.content.value, date: todayStr() };
    const tempId = `n_local_${Date.now()}`;
    setNotes((ns) => [{ id: tempId, ...payload }, ...ns]);
    api.create("notes", payload)
      .then((row) => setNotes((ns) => ns.map((n) => (n.id === tempId ? row : n))))
      .catch((err) => console.error("Failed to save note:", err));
    setModal(null);
  }

  // ---------- Edit handlers ----------
  function handleEditTask(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const payload = { name: f.name.value, due: f.due.value, priority: f.priority.value, status: f.status.value, notes: f.notes.value };
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...payload } : t)));
    api.update("tasks", id, payload).catch((err) => console.error("Failed to update task:", err));
    setModal(null);
  }
  function handleEditGoal(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const payload = { name: f.name.value, target: f.target.value, progress: Number(f.progress.value) || 0, notes: f.notes.value };
    setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, ...payload } : g)));
    api.update("goals", id, payload).catch((err) => console.error("Failed to update goal:", err));
    setModal(null);
  }
  function handleEditProject(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const payload = { name: f.name.value, deadline: f.deadline.value, status: f.status.value, description: f.description.value, notes: f.notes.value };
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, ...payload } : p)));
    api.update("projects", id, payload).catch((err) => console.error("Failed to update project:", err));
    setModal(null);
  }
  function handleEditReminder(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const localDate = f.date.value;
    const localTime = f.time.value;
    const utc = localDateTimeToUTC(localDate, localTime);
    const payload = { title: f.title.value, date: utc.date, time: utc.time, priority: f.priority.value, notes: f.notes.value };
    setReminders((rs) => rs.map((r) => (r.id === id ? { ...r, title: payload.title, date: localDate, time: localTime, priority: payload.priority, notes: payload.notes } : r)));
    api.update("reminders", id, payload).catch((err) => console.error("Failed to update reminder:", err));
    setModal(null);
  }
  function handleEditContact(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const payload = { name: f.name.value, phone: f.phone.value, email: f.email.value, follow_up: f.followUp.value, notes: f.notes.value };
    setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, ...payload, followUp: payload.follow_up } : c)));
    api.update("contacts", id, payload).catch((err) => console.error("Failed to update contact:", err));
    setModal(null);
  }
  function handleEditNote(e) {
    e.preventDefault();
    const f = e.target;
    const id = modal.item.id;
    const payload = { title: f.title.value, content: f.content.value };
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, ...payload } : n)));
    api.update("notes", id, payload).catch((err) => console.error("Failed to update note:", err));
    setModal(null);
  }

  const del = (setter, resource) => (id) => {
    setter((arr) => arr.filter((x) => x.id !== id));
    if (!id.includes("_local_")) {
      api.remove(resource, id).catch((err) => console.error(`Failed to delete ${resource}:`, err));
    }
  };

  const openView = (type, item) => setModal({ type, mode: "view", item });
  const openEdit = (type, item) => setModal({ type, mode: "edit", item });
  const openAdd = (type) => setModal({ type, mode: "add" });

  const delTasks = del(setTasks, "tasks");
  const delGoals = del(setGoals, "goals");
  const delProjects = del(setProjects, "projects");
  const delReminders = del(setReminders, "reminders");
  const delContacts = del(setContacts, "contacts");
  const delNotes = del(setNotes, "notes");

  const NAV = [
    { id: "dashboard", label: "Home", icon: LayoutGrid },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "goals", label: "Goals", icon: Target },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "reminders", label: "Alerts", icon: Bell },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "notes", label: "Notes", icon: StickyNote },
  ];

  // These CSS custom properties must be available the instant anything
  // renders — including the splash screen, which mounts before the main
  // dashboard's own <style> block would otherwise exist. Rendering this
  // unconditionally avoids a real bug: without it, colors like
  // COLORS.amber (just the string "var(--ff-accent)") resolve to nothing
  // during the splash, making the logo mark render with no background.
  const themeVarsStyle = (
    <style>{`
      :root, [data-ff-theme="dark"] {
        --ff-bg: #000000;
        --ff-bg-elevated: #0B0B10;
        --ff-card: #131318;
        --ff-border: #232330;
        --ff-text: #F2F1F7;
        --ff-dim: #9A99AC;
        --ff-faint: #5F5E70;
        --ff-accent: #6C5CE7;
        --ff-accent-dim: #443790;
        --ff-sage: #5FD0A6;
        --ff-coral: #2DD4C8;
      }
      [data-ff-theme="light"] {
        --ff-bg: #F3F1EE;
        --ff-bg-elevated: #FBFAF8;
        --ff-card: #FBFAF8;
        --ff-border: #E2DFDA;
        --ff-text: #33313A;
        --ff-dim: #726F7C;
        --ff-faint: #A7A3AD;
        --ff-accent: #7D6FE0;
        --ff-accent-dim: #E7E3FA;
        --ff-sage: #3C9C7E;
        --ff-coral: #2E9C93;
      }
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        background: var(--ff-bg);
        overscroll-behavior-y: contain;
        -webkit-overflow-scrolling: touch;
      }
      #root {
        min-height: 100%;
        background: var(--ff-bg);
      }
    `}</style>
  );

  // The dashboard renders immediately underneath the splash overlay — fully built
  // and ready, hidden behind the opaque splash on top. While the user sees the splash,
  // the browser completes layout and rasterization so the crossfade to the dashboard
  // is buttery smooth with zero dropped frames or freeze glitches.
  const dashboardTree = (
    <div className="ff-app-root" data-ff-theme={themeMode} style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", width: "100%",
    }}>
      {themeVarsStyle}
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: ${COLORS.textFaint}; }
        select option { background: ${COLORS.bgCard}; }
        .ff-app-root { opacity: 1; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }

        .ff-shell {
          max-width: 480px;
          margin: 0 auto;
          position: relative;
          padding-bottom: calc(88px + env(safe-area-inset-bottom, 16px));
          min-height: 100dvh;
          box-sizing: border-box;
          background: var(--ff-bg);
        }
        @media (min-width: 720px) {
          .ff-shell {
            max-width: 460px;
            margin: 16px auto 24px;
            border: 1px solid ${COLORS.border};
            border-radius: 28px;
            box-shadow: 0 40px 100px -30px rgba(0,0,0,0.9);
          }
          .ff-bottomnav {
            max-width: 460px !important;
            border-radius: 0 0 28px 28px;
          }
        }
        @media (min-width: 1100px) {
          .ff-shell { max-width: 480px; }
          .ff-bottomnav { max-width: 480px !important; }
        }
      `}</style>

      <div className="ff-shell">
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30, background: COLORS.bgElevated,
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 10,
        }}>
          <BrandLogo size={28} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Back to Website button - ONLY shown when viewing in a browser and NOT added to home screen */}
            {!isStandaloneApp && (
              <a
                href="/"
                target="_top"
                title="Back to FocusFlow Website"
                aria-label="Back to website"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 11px",
                  borderRadius: 8,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textDim,
                  textDecoration: "none",
                  fontSize: 12,
                  fontFamily: FONTS.body,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLORS.text;
                  e.currentTarget.style.borderColor = COLORS.borderHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = COLORS.textDim;
                  e.currentTarget.style.borderColor = COLORS.border;
                }}
              >
                <ArrowLeft size={13} />
                <span>Back to Website</span>
              </a>
            )}

            <button
              onClick={handleResetToFresh}
              aria-label="Start fresh dashboard"
              title="Start fresh (reset to clean starter items)"
              style={{
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                borderRadius: 8, width: 32, height: 32, display: "flex",
                alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0,
                color: COLORS.textDim, flexShrink: 0,
                transition: "all 0.15s ease",
              }}
            >
              <RotateCcw size={14} color={COLORS.textDim} />
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              style={{
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                borderRadius: 8, width: 32, height: 32, display: "flex",
                alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0,
                color: COLORS.textDim, flexShrink: 0,
              }}
            >
              {themeMode === "dark" ? <Sun size={15} color={COLORS.textDim} /> : <Moon size={15} color={COLORS.textDim} />}
            </button>
          </div>
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          {tab === "dashboard" && (
            <Dashboard
              todayTasks={todayTasks} completedToday={completedToday}
              upcomingReminders={upcomingReminders} activeProjects={activeProjects}
              goals={goals} avgGoalProgress={avgGoalProgress} overallFocus={overallFocus}
              toggleTaskStatus={toggleTaskStatus} setTab={setTab}
              pushStatus={pushStatus} onEnablePush={handleEnablePush}
              onTestPush={handleSendTestNotification} testNoticeMsg={testNoticeMsg}
            />
          )}
          {tab === "tasks" && (
            <TasksView tasks={tasks} toggleTaskStatus={toggleTaskStatus}
              onAdd={() => openAdd("task")} onView={(item) => openView("task", item)}
              onEdit={(item) => openEdit("task", item)} onDelete={delTasks} />
          )}
          {tab === "goals" && (
            <GoalsView goals={goals} onAdd={() => openAdd("goal")}
              onView={(item) => openView("goal", item)} onEdit={(item) => openEdit("goal", item)} onDelete={delGoals} />
          )}
          {tab === "projects" && (
            <ProjectsView projects={projects} onAdd={() => openAdd("project")}
              onView={(item) => openView("project", item)} onEdit={(item) => openEdit("project", item)} onDelete={delProjects} />
          )}
          {tab === "reminders" && (
            <RemindersView reminders={reminders} onAdd={() => openAdd("reminder")}
              onView={(item) => openView("reminder", item)} onEdit={(item) => openEdit("reminder", item)} onDelete={delReminders}
              pushStatus={pushStatus} onEnablePush={handleEnablePush}
              onTestPush={handleSendTestNotification} testNoticeMsg={testNoticeMsg} />
          )}
          {tab === "contacts" && (
            <ContactsView contacts={contacts} onAdd={() => openAdd("contact")}
              onView={(item) => openView("contact", item)} onEdit={(item) => openEdit("contact", item)} onDelete={delContacts} />
          )}
          {tab === "notes" && (
            <NotesView notes={notes} onAdd={() => openAdd("note")}
              onView={(item) => openView("note", item)} onEdit={(item) => openEdit("note", item)} onDelete={delNotes} />
          )}
        </div>

        {/* Bottom nav */}
        <div className="ff-bottomnav" style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 480, background: COLORS.bgElevated,
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderTop: `1px solid ${COLORS.border}`, display: "flex",
          padding: "8px 4px calc(env(safe-area-inset-bottom, 0px) + 8px)",
          zIndex: 40, boxSizing: "border-box",
        }}>
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 3, background: "none", border: "none", cursor: "pointer",
                  color: active ? COLORS.amber : COLORS.textFaint, padding: "6px 2px",
                }}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                <span style={{ fontSize: 10, fontFamily: FONTS.body, fontWeight: active ? 700 : 500 }}>{n.label}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Add modals ---- */}
        {modal?.mode === "add" && modal.type === "task" && (
          <Modal title="New task" onClose={() => setModal(null)}>
            <form onSubmit={handleAddTask}>
              <Field label="Task name"><TextInput name="name" required placeholder="e.g. Write weekly report" /></Field>
              <Field label="Due date"><TextInput type="date" name="due" defaultValue={todayStr()} /></Field>
              <Field label="Priority"><Select name="priority" options={["High", "Medium", "Low"]} defaultValue="Medium" /></Field>
              <Field label="Status"><Select name="status" options={["Pending", "In Progress", "Completed"]} defaultValue="Pending" /></Field>
              <Field label="Notes"><TextArea name="notes" placeholder="Optional details..." /></Field>
              <SubmitButton>Add task</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "add" && modal.type === "goal" && (
          <Modal title="New goal" onClose={() => setModal(null)}>
            <form onSubmit={handleAddGoal}>
              <Field label="Goal name"><TextInput name="name" required placeholder="e.g. Learn Spanish" /></Field>
              <Field label="Target date"><TextInput type="date" name="target" defaultValue={addDays(30)} /></Field>
              <Field label="Progress (%)"><TextInput type="number" name="progress" min="0" max="100" defaultValue="0" /></Field>
              <Field label="Notes"><TextArea name="notes" placeholder="What does success look like?" /></Field>
              <SubmitButton>Add goal</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "add" && modal.type === "project" && (
          <Modal title="New project" onClose={() => setModal(null)}>
            <form onSubmit={handleAddProject}>
              <Field label="Project name"><TextInput name="name" required placeholder="e.g. Brand refresh" /></Field>
              <Field label="Deadline"><TextInput type="date" name="deadline" defaultValue={addDays(14)} /></Field>
              <Field label="Status"><Select name="status" options={["Pending", "In Progress", "Completed"]} defaultValue="Pending" /></Field>
              <Field label="Description"><TextArea name="description" placeholder="What is this project about?" /></Field>
              <Field label="Notes"><TextArea name="notes" placeholder="Optional details..." /></Field>
              <SubmitButton>Add project</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "add" && modal.type === "reminder" && (
          <Modal title="New reminder" onClose={() => setModal(null)}>
            <form onSubmit={handleAddReminder}>
              <Field label="Reminder title"><TextInput name="title" required placeholder="e.g. Pay rent" /></Field>
              <Field label="Date"><TextInput type="date" name="date" defaultValue={todayStr()} /></Field>
              <Field label="Time (24h)"><TimeInput24 name="time" defaultValue="09:00" /></Field>
              <Field label="Priority"><Select name="priority" options={["High", "Medium", "Low"]} defaultValue="Medium" /></Field>
              <Field label="Notes"><TextArea name="notes" placeholder="Optional details..." /></Field>
              <SubmitButton>Add reminder</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "add" && modal.type === "contact" && (
          <Modal title="New contact" onClose={() => setModal(null)}>
            <form onSubmit={handleAddContact}>
              <Field label="Name"><TextInput name="name" required placeholder="e.g. Alex Rivera" /></Field>
              <Field label="Phone"><TextInput name="phone" placeholder="(555) 123-4567" /></Field>
              <Field label="Email"><TextInput type="email" name="email" placeholder="name@email.com" /></Field>
              <Field label="Follow-up date"><TextInput type="date" name="followUp" defaultValue={addDays(7)} /></Field>
              <Field label="Notes"><TextArea name="notes" placeholder="Context on this contact..." /></Field>
              <SubmitButton>Add contact</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "add" && modal.type === "note" && (
          <Modal title="New note" onClose={() => setModal(null)}>
            <form onSubmit={handleAddNote}>
              <Field label="Title"><TextInput name="title" required placeholder="e.g. Meeting takeaways" /></Field>
              <Field label="Content"><TextArea name="content" rows={5} placeholder="Write your note..." /></Field>
              <SubmitButton>Add note</SubmitButton>
            </form>
          </Modal>
        )}

        {/* ---- View modals (read-only, with a button to switch to edit) ---- */}
        {modal?.mode === "view" && modal.type === "task" && (
          <Modal title="Task details" onClose={() => setModal(null)}>
            <ViewRow label="Task name" value={modal.item.name} />
            <ViewRow label="Due date" value={fmtDate(modal.item.due)} />
            <ViewRow label="Priority" value={modal.item.priority} />
            <ViewRow label="Status" value={modal.item.status} />
            <ViewRow label="Notes" value={modal.item.notes} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "task", mode: "edit", item: modal.item })} />
          </Modal>
        )}
        {modal?.mode === "view" && modal.type === "goal" && (
          <Modal title="Goal details" onClose={() => setModal(null)}>
            <ViewRow label="Goal name" value={modal.item.name} />
            <ViewRow label="Target date" value={fmtDate(modal.item.target)} />
            <ViewRow label="Progress" value={`${modal.item.progress}%`} />
            <ViewRow label="Notes" value={modal.item.notes} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "goal", mode: "edit", item: modal.item })} />
          </Modal>
        )}
        {modal?.mode === "view" && modal.type === "project" && (
          <Modal title="Project details" onClose={() => setModal(null)}>
            <ViewRow label="Project name" value={modal.item.name} />
            <ViewRow label="Deadline" value={fmtDate(modal.item.deadline)} />
            <ViewRow label="Status" value={modal.item.status} />
            <ViewRow label="Description" value={modal.item.description} />
            <ViewRow label="Notes" value={modal.item.notes} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "project", mode: "edit", item: modal.item })} />
          </Modal>
        )}
        {modal?.mode === "view" && modal.type === "reminder" && (
          <Modal title="Reminder details" onClose={() => setModal(null)}>
            <ViewRow label="Title" value={modal.item.title} />
            <ViewRow label="Date" value={fmtDate(modal.item.date)} />
            <ViewRow label="Time" value={modal.item.time} />
            <ViewRow label="Priority" value={modal.item.priority} />
            <ViewRow label="Notes" value={modal.item.notes} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "reminder", mode: "edit", item: modal.item })} />
          </Modal>
        )}
        {modal?.mode === "view" && modal.type === "contact" && (
          <Modal title="Contact details" onClose={() => setModal(null)}>
            <ViewRow label="Name" value={modal.item.name} />
            <ViewRow label="Phone" value={modal.item.phone} />
            <ViewRow label="Email" value={modal.item.email} />
            <ViewRow label="Follow-up date" value={modal.item.followUp ? fmtDate(modal.item.followUp) : null} />
            <ViewRow label="Notes" value={modal.item.notes} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "contact", mode: "edit", item: modal.item })} />
          </Modal>
        )}
        {modal?.mode === "view" && modal.type === "note" && (
          <Modal title="Note" onClose={() => setModal(null)}>
            <ViewRow label="Title" value={modal.item.title} />
            <ViewRow label="Date" value={fmtDate(modal.item.date)} />
            <ViewRow label="Content" value={modal.item.content} />
            <ViewActions onClose={() => setModal(null)} onEdit={() => setModal({ type: "note", mode: "edit", item: modal.item })} />
          </Modal>
        )}

        {/* ---- Edit modals (pre-filled forms) ---- */}
        {modal?.mode === "edit" && modal.type === "task" && (
          <Modal title="Edit task" onClose={() => setModal(null)}>
            <form onSubmit={handleEditTask}>
              <Field label="Task name"><TextInput name="name" required defaultValue={modal.item.name} /></Field>
              <Field label="Due date"><TextInput type="date" name="due" defaultValue={modal.item.due} /></Field>
              <Field label="Priority"><Select name="priority" options={["High", "Medium", "Low"]} defaultValue={modal.item.priority} /></Field>
              <Field label="Status"><Select name="status" options={["Pending", "In Progress", "Completed"]} defaultValue={modal.item.status} /></Field>
              <Field label="Notes"><TextArea name="notes" defaultValue={modal.item.notes} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "edit" && modal.type === "goal" && (
          <Modal title="Edit goal" onClose={() => setModal(null)}>
            <form onSubmit={handleEditGoal}>
              <Field label="Goal name"><TextInput name="name" required defaultValue={modal.item.name} /></Field>
              <Field label="Target date"><TextInput type="date" name="target" defaultValue={modal.item.target} /></Field>
              <Field label="Progress (%)"><TextInput type="number" name="progress" min="0" max="100" defaultValue={modal.item.progress} /></Field>
              <Field label="Notes"><TextArea name="notes" defaultValue={modal.item.notes} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "edit" && modal.type === "project" && (
          <Modal title="Edit project" onClose={() => setModal(null)}>
            <form onSubmit={handleEditProject}>
              <Field label="Project name"><TextInput name="name" required defaultValue={modal.item.name} /></Field>
              <Field label="Deadline"><TextInput type="date" name="deadline" defaultValue={modal.item.deadline} /></Field>
              <Field label="Status"><Select name="status" options={["Pending", "In Progress", "Completed"]} defaultValue={modal.item.status} /></Field>
              <Field label="Description"><TextArea name="description" defaultValue={modal.item.description} /></Field>
              <Field label="Notes"><TextArea name="notes" defaultValue={modal.item.notes} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "edit" && modal.type === "reminder" && (
          <Modal title="Edit reminder" onClose={() => setModal(null)}>
            <form onSubmit={handleEditReminder}>
              <Field label="Reminder title"><TextInput name="title" required defaultValue={modal.item.title} /></Field>
              <Field label="Date"><TextInput type="date" name="date" defaultValue={modal.item.date} /></Field>
              <Field label="Time (24h)"><TimeInput24 name="time" defaultValue={modal.item.time} /></Field>
              <Field label="Priority"><Select name="priority" options={["High", "Medium", "Low"]} defaultValue={modal.item.priority} /></Field>
              <Field label="Notes"><TextArea name="notes" defaultValue={modal.item.notes} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "edit" && modal.type === "contact" && (
          <Modal title="Edit contact" onClose={() => setModal(null)}>
            <form onSubmit={handleEditContact}>
              <Field label="Name"><TextInput name="name" required defaultValue={modal.item.name} /></Field>
              <Field label="Phone"><TextInput name="phone" defaultValue={modal.item.phone} /></Field>
              <Field label="Email"><TextInput type="email" name="email" defaultValue={modal.item.email} /></Field>
              <Field label="Follow-up date"><TextInput type="date" name="followUp" defaultValue={modal.item.followUp} /></Field>
              <Field label="Notes"><TextArea name="notes" defaultValue={modal.item.notes} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
        {modal?.mode === "edit" && modal.type === "note" && (
          <Modal title="Edit note" onClose={() => setModal(null)}>
            <form onSubmit={handleEditNote}>
              <Field label="Title"><TextInput name="title" required defaultValue={modal.item.title} /></Field>
              <Field label="Content"><TextArea name="content" rows={5} defaultValue={modal.item.content} /></Field>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );

  return (
    <>
      {themeVarsStyle}
      {dashboardTree}
      {showSplash && <SplashScreen exiting={splashFading} />}
    </>
  );
}

// ---------- Notification Status & Home Screen Card ----------
function NotificationStatusCard({ pushStatus, onEnablePush, onTestPush, testNoticeMsg }) {
  const isStandaloneApp = typeof window !== "undefined" && (
    window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true
  );
  const isIosDevice = typeof window !== "undefined" && typeof navigator !== "undefined" && (
    /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );

  return (
    <div style={{ marginBottom: 16 }}>
      {(pushStatus === "granted" || pushStatus === "subscribed") && (
        <Card style={{ borderColor: "rgba(52,211,153,0.35)", background: "rgba(52,211,153,0.06)", padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "rgba(52,211,153,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Bell size={16} color={COLORS.sage} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Home Screen Alerts Active</div>
                <div style={{ fontSize: 11.5, color: COLORS.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Alerts enabled for your scheduled reminders
                </div>
              </div>
            </div>
            {onTestPush && (
              <button
                onClick={onTestPush}
                style={{
                  background: COLORS.bgElevated,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "6px 11px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Test Alert
              </button>
            )}
          </div>
          {testNoticeMsg && (
            <div style={{
              marginTop: 10, fontSize: 12, color: COLORS.amber, background: "rgba(245,158,11,0.12)",
              padding: "7px 10px", borderRadius: 6, textAlign: "center", fontWeight: 500
            }}>
              {testNoticeMsg}
            </div>
          )}
        </Card>
      )}

      {(pushStatus === "prompt" || pushStatus === "not-subscribed" || pushStatus === "unknown") && (
        <Card style={{ borderColor: COLORS.amberDim, padding: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, background: "rgba(245,158,11,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <BellRing size={17} color={COLORS.amber} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Enable Home Screen Alerts</div>
              <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 2 }}>
                Receive alerts when your focus blocks and reminders are due.
              </div>
            </div>
            <button
              onClick={onEnablePush}
              style={{
                background: COLORS.amber, color: "#FFFFFF", border: "none", borderRadius: 8,
                padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", flexShrink: 0,
              }}
            >
              Enable
            </button>
          </div>
          {isIosDevice && !isStandaloneApp && (
            <div style={{
              marginTop: 10, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`,
              fontSize: 11.5, color: COLORS.textDim, lineHeight: 1.45
            }}>
              💡 <strong>iPhone/iPad:</strong> Tap Share <span style={{ fontSize: 13 }}>⎋</span> in Safari, choose <strong>"Add to Home Screen"</strong>, then launch FocusFlow from your Home Screen for background alerts.
            </div>
          )}
        </Card>
      )}

      {pushStatus === "denied" && (
        <Card style={{ display: "flex", alignItems: "center", gap: 12, borderColor: COLORS.border, padding: "12px 14px" }}>
          <BellOff size={18} color={COLORS.textFaint} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.4 }}>
            Notifications are blocked in your browser/device settings. To receive reminder alerts on your Home Screen, allow notifications for FocusFlow in Settings.
          </div>
        </Card>
      )}
    </div>
  );
}

// ---------- Dashboard ----------
function Dashboard({ todayTasks, completedToday, upcomingReminders, activeProjects, goals, avgGoalProgress, overallFocus, toggleTaskStatus, setTab, pushStatus, onEnablePush, onTestPush, testNoticeMsg }) {
  return (
    <div>
      <NotificationStatusCard
        pushStatus={pushStatus}
        onEnablePush={onEnablePush}
        onTestPush={onTestPush}
        testNoticeMsg={testNoticeMsg}
      />

      <Card style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20, background: COLORS.bgElevated }}>
        <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
          <FocusRing pct={overallFocus} />
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700 }}>{overallFocus}%</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.amber, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>
            Today's focus
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 13.5, color: COLORS.textDim, lineHeight: 1.5 }}>
            {completedToday} of {todayTasks.length} tasks done · avg goal progress {avgGoalProgress}%
          </div>
        </div>
      </Card>

      <SectionBlock title="Today's tasks" onSeeAll={() => setTab("tasks")}>
        {todayTasks.length === 0 ? <EmptyState text="Nothing due today — enjoy the clear runway." /> :
          todayTasks.map((t) => (
            <TaskRow key={t.id} task={t} onToggle={() => toggleTaskStatus(t.id)} />
          ))}
      </SectionBlock>

      <SectionBlock title="Upcoming reminders" onSeeAll={() => setTab("reminders")}>
        {upcomingReminders.length === 0 ? <EmptyState text="No reminders on the horizon." /> :
          upcomingReminders.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Bell size={14} color={priorityColor(r.priority)} />
                <span style={{ fontSize: 14 }}>{r.title}</span>
              </div>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim }}>{dueLabel(r.date)}</span>
            </div>
          ))}
      </SectionBlock>

      <SectionBlock title="Active projects" onSeeAll={() => setTab("projects")}>
        {activeProjects.length === 0 ? <EmptyState text="No active projects right now." /> :
          activeProjects.map((p) => (
            <div key={p.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
                <Pill color={statusColor(p.status)}>{p.status}</Pill>
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim }}>Due {dueLabel(p.deadline)}</div>
            </div>
          ))}
      </SectionBlock>

      <SectionBlock title="Goals progress" onSeeAll={() => setTab("goals")}>
        {goals.map((g) => (
          <div key={g.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{g.name}</span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.amber }}>{g.progress}%</span>
            </div>
            <ProgressBar pct={g.progress} />
          </div>
        ))}
      </SectionBlock>
    </div>
  );
}

function SectionBlock({ title, onSeeAll, children }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h3 style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 0.6, margin: 0 }}>
          {title}
        </h3>
        {onSeeAll && (
          <button onClick={onSeeAll} style={{ background: "none", border: "none", color: COLORS.amber, fontSize: 12, fontFamily: FONTS.body, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>
            See all <ChevronRight size={13} />
          </button>
        )}
      </div>
      <Card>{children}</Card>
    </div>
  );
}

function ProgressBar({ pct, color = COLORS.amber }) {
  return (
    <div style={{ height: 6, background: COLORS.border, borderRadius: 999, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 999, transition: "width 0.4s ease" }} />
    </div>
  );
}

function TaskRow({ task, onToggle }) {
  const done = task.status === "Completed";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${COLORS.border}` }}>
      <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
        {done ? <CheckCircle2 size={19} color={COLORS.sage} /> : <Circle size={19} color={COLORS.textFaint} />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, color: done ? COLORS.textFaint : COLORS.text, textDecoration: done ? "line-through" : "none" }}>
          {task.name}
        </div>
      </div>
      <Pill color={priorityColor(task.priority)}>{task.priority}</Pill>
    </div>
  );
}

// ---------- Tasks ----------
function TasksView({ tasks, toggleTaskStatus, onAdd, onView, onEdit, onDelete }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);
  const sorted = [...filtered].sort((a, b) => a.due.localeCompare(b.due));

  return (
    <div>
      <SectionHeader eyebrow={`${tasks.length} total`} title="Tasks" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      <FilterRow options={["All", "Pending", "In Progress", "Completed"]} value={filter} onChange={setFilter} />
      {sorted.length === 0 ? (
        <EmptyState text={tasks.length === 0 ? "No tasks here yet." : `No ${filter.toLowerCase()} tasks.`} />
      ) : sorted.map((t) => (
        <Card key={t.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <button onClick={() => toggleTaskStatus(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 1 }}>
              {t.status === "Completed" ? <CheckCircle2 size={20} color={COLORS.sage} /> : <Circle size={20} color={COLORS.textFaint} />}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, textDecoration: t.status === "Completed" ? "line-through" : "none", color: t.status === "Completed" ? COLORS.textFaint : COLORS.text }}>
                  {t.name}
                </span>
                <CardActions onView={() => onView(t)} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
              </div>
              {t.notes && <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 4 }}>{t.notes}</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                <Pill color={priorityColor(t.priority)}>{t.priority}</Pill>
                <Pill color={statusColor(t.status)}>{t.status}</Pill>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim, alignSelf: "center" }}>
                  <Clock size={11} style={{ verticalAlign: -1, marginRight: 3 }} />{dueLabel(t.due)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function FilterRow({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          style={{
            fontFamily: FONTS.body, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
            padding: "7px 13px", borderRadius: 999, cursor: "pointer",
            border: `1px solid ${value === o ? COLORS.amber : COLORS.border}`,
            background: value === o ? COLORS.amber : "transparent",
            color: value === o ? "#FFFFFF" : COLORS.textDim,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// ---------- Goals ----------
function GoalsView({ goals, onAdd, onView, onEdit, onDelete }) {
  return (
    <div>
      <SectionHeader eyebrow={`${goals.length} goals`} title="Goals" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      {goals.length === 0 ? <EmptyState text="No goals yet — set your first one." /> : goals.map((g) => (
        <Card key={g.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{g.name}</span>
            <CardActions onView={() => onView(g)} onEdit={() => onEdit(g)} onDelete={() => onDelete(g.id)} />
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim, margin: "4px 0 10px" }}>
            <CalendarIcon size={11} style={{ verticalAlign: -1, marginRight: 3 }} />Target {fmtDate(g.target)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.amber }}>{g.progress}% complete</span>
          </div>
          <ProgressBar pct={g.progress} color={g.progress >= 100 ? COLORS.sage : COLORS.amber} />
          {g.notes && <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 10 }}>{g.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

// ---------- Projects ----------
function ProjectsView({ projects, onAdd, onView, onEdit, onDelete }) {
  return (
    <div>
      <SectionHeader eyebrow={`${projects.length} projects`} title="Projects" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      {projects.length === 0 ? <EmptyState text="No projects yet." /> : projects.map((p) => (
        <Card key={p.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</span>
            <CardActions onView={() => onView(p)} onEdit={() => onEdit(p)} onDelete={() => onDelete(p.id)} />
          </div>
          {p.description && <div style={{ fontSize: 13.5, color: COLORS.textDim, margin: "6px 0" }}>{p.description}</div>}
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Pill color={statusColor(p.status)}>{p.status}</Pill>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim }}>
              <Clock size={11} style={{ verticalAlign: -1, marginRight: 3 }} />{dueLabel(p.deadline)}
            </span>
          </div>
          {p.notes && <div style={{ fontSize: 13, color: COLORS.textFaint, marginTop: 10, fontStyle: "italic" }}>{p.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

// ---------- Reminders ----------
function RemindersView({ reminders, onAdd, onView, onEdit, onDelete, pushStatus, onEnablePush, onTestPush, testNoticeMsg }) {
  const sorted = [...reminders].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div>
      <SectionHeader eyebrow={`${reminders.length} reminders`} title="Reminders" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      <NotificationStatusCard
        pushStatus={pushStatus}
        onEnablePush={onEnablePush}
        onTestPush={onTestPush}
        testNoticeMsg={testNoticeMsg}
      />
      {sorted.length === 0 ? <EmptyState text="No reminders set." /> : sorted.map((r) => (
        <Card key={r.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Bell size={15} color={priorityColor(r.priority)} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{r.title}</span>
            </div>
            <CardActions onView={() => onView(r)} onEdit={() => onEdit(r)} onDelete={() => onDelete(r.id)} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
            <Pill color={priorityColor(r.priority)}>{r.priority}</Pill>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.textDim }}>
              {dueLabel(r.date)}{r.time ? ` · ${r.time}` : ""}
            </span>
          </div>
          {r.notes && <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 10 }}>{r.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

// ---------- Contacts ----------
function ContactsView({ contacts, onAdd, onView, onEdit, onDelete }) {
  return (
    <div>
      <SectionHeader eyebrow={`${contacts.length} contacts`} title="Contacts" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      {contacts.length === 0 ? <EmptyState text="No contacts saved yet." /> : contacts.map((c) => (
        <Card key={c.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{c.name}</span>
            <CardActions onView={() => onView(c)} onEdit={() => onEdit(c)} onDelete={() => onDelete(c.id)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {c.phone && <div style={{ fontSize: 13, color: COLORS.textDim, display: "flex", alignItems: "center", gap: 6 }}><Phone size={12} />{c.phone}</div>}
            {c.email && <div style={{ fontSize: 13, color: COLORS.textDim, display: "flex", alignItems: "center", gap: 6 }}><Mail size={12} />{c.email}</div>}
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: daysUntil(c.followUp) < 0 ? COLORS.coral : COLORS.textDim }}>
              Follow up {dueLabel(c.followUp)}
            </span>
          </div>
          {c.notes && <div style={{ fontSize: 13, color: COLORS.textFaint, marginTop: 8, fontStyle: "italic" }}>{c.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

// ---------- Notes ----------
function NotesView({ notes, onAdd, onView, onEdit, onDelete }) {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div>
      <SectionHeader eyebrow={`${notes.length} notes`} title="Notes" action={<IconButton icon={Plus} label="Add" onClick={onAdd} />} />
      {sorted.length === 0 ? <EmptyState text="No notes yet." /> : sorted.map((n) => (
        <Card key={n.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{n.title}</span>
            <CardActions onView={() => onView(n)} onEdit={() => onEdit(n)} onDelete={() => onDelete(n.id)} />
          </div>
          <div style={{ fontSize: 13.5, color: COLORS.textDim, marginTop: 8, lineHeight: 1.5 }}>{n.content}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textFaint, marginTop: 10 }}>{fmtDate(n.date)}</div>
        </Card>
      ))}
    </div>
  );
}

export default FocusFlow;
export { FocusFlow };


  