export interface Holiday {
  name: string;
  ink: string[]; // solid bands across the word, left to right
  underline?: string; // defaults to the last ink colour
}

const RWANDA = ["#00A1DE", "#E0B400", "#20A050"];

// month-day ranges, inclusive; Kwibuka is intentionally left out
const FIXED: [string, string, Holiday][] = [
  ["01-01", "01-01", { name: "Happy New Year", ink: ["#D4A017"] }],
  ["02-01", "02-01", { name: "Heroes' Day", ink: RWANDA }],
  ["02-14", "02-14", { name: "Happy Valentine's Day", ink: ["#E91E63"] }],
  ["07-01", "07-01", { name: "Independence Day", ink: RWANDA }],
  ["07-04", "07-04", { name: "Liberation Day", ink: RWANDA }],
  ["12-24", "12-26", { name: "Merry Christmas", ink: ["#C62828"], underline: "#2E7D32" }],
  ["12-31", "12-31", { name: "Happy New Year", ink: ["#D4A017"] }],
];

const pad = (n: number) => String(n).padStart(2, "0");

export function holidayOn(date: Date): Holiday | undefined {
  const md = `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const fixed = FIXED.find(([from, to]) => md >= from && md <= to);
  if (fixed) return fixed[2];
  // Umuganura: first Friday of August
  if (date.getMonth() === 7 && date.getDay() === 5 && date.getDate() <= 7) {
    return { name: "Happy Umuganura", ink: ["#2E7D32"], underline: "#D4A017" };
  }
}
