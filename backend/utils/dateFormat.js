const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/**
 * Formats a project's date range for display.
 * Admin can always override via `displayLabel` on the project —
 * this is only the auto-generated fallback used when displayLabel is empty.
 *
 * Granularity rules:
 * - If `datePrecision` is "day": show "DD Mon YYYY" (and a range if endDate differs)
 * - If `datePrecision` is "month" (default): show "Mon YYYY" (and a range if endDate is a different month)
 * - `type` (Hackathon, Personal Project, etc.) is appended after a " · " separator
 */
export function formatProjectDate({ startDate, endDate, datePrecision = "month", type }) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const dayFmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const monthFmt = (d) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

  let core;

  if (datePrecision === "day") {
    if (end && (end.getTime() !== start.getTime())) {
      core = `${dayFmt(start)} – ${dayFmt(end)}`;
    } else {
      core = dayFmt(start);
    }
  } else {
    // month precision
    const sameMonth = end
      ? start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()
      : true;
    if (end && !sameMonth) {
      core = `${monthFmt(start)} – ${monthFmt(end)}`;
    } else {
      core = monthFmt(start);
    }
  }

  return type ? `${core} · ${type}` : core;
}

/**
 * The single timestamp used for SORTING projects (newest first).
 * Uses endDate if present, otherwise startDate.
 * This is what drives the automatic 01/02/03 numbering —
 * there is never a manually stored number.
 */
export function getSortDate(project) {
  return new Date(project.endDate || project.startDate).getTime();
}

/**
 * Takes a list of projects (already filtered to published, from the DB)
 * and returns them sorted newest-first with a computed `num` field
 * ("01", "02", ...) and a computed `displayDate` if the admin didn't
 * set a manual override.
 */
export function applyAutoNumbering(projects) {
  const sorted = [...projects].sort((a, b) => getSortDate(b) - getSortDate(a));
  return sorted.map((p, i) => ({
    ...p,
    num: String(i + 1).padStart(2, "0"),
    displayDate: p.displayLabel?.trim()
      ? p.displayLabel
      : formatProjectDate(p),
  }));
}
