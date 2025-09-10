"use client"
import React from "react";
import clsx from "clsx";

type Status = 'COMPLETED' | 'PENDING' ;

interface RevisionCardProps {
  title?: string;            // e.g., "Revision 1/10"
  status?: Status;           // e.g., "Completed"
  date?: string;             // ISO or human string, e.g., "2025-08-15"
  progressText?: string;     // e.g., "1/10"
  onViewReport?: () => void;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  COMPLETED: "text-emerald-600 bg-emerald-50 ring-1 ring-emerald-100",

  PENDING: "text-slate-600 bg-slate-50 ring-1 ring-slate-100",

};

export function RevisionCard({
  title = "Revision 1/10",
  status = "COMPLETED",
  date = "2025-08-15",
  progressText = "1/10",
  onViewReport,
  className,
}: RevisionCardProps) {
  // Format date safely for display
  const displayDate = (() => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return date;
    }
  })();

  return (
    <section
      className={clsx(
        "group relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition",
        "hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-500",
        "dark:border-slate-800 dark:bg-slate-900",
        className
      )}
      aria-label={title}
    >
      {/* Header */}
      <header className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <span
          className={clsx(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            [status]
          )}
        >
          {status}
        </span>
      </header>

      {/* Meta */}
      <div className="mb-5 space-y-1">
        <p className="text-xs text-slate-500 mb-4  dark:text-slate-400">
          {displayDate}
        </p>
        <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {progressText}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        <button
          type="button"
          onClick={onViewReport}
          className={clsx(
            "inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition",
            "hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
            "dark:bg-indigo-600 dark:hover:bg-indigo-500 hover:cursor-pointer"
          )}
          aria-label="View report"
        >
          View Report
        </button>
      </div>

      {/* Subtle accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </section>
  );
}
