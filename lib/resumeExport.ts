import { Resume, formatRange } from "@/lib/resume";

const fileBase = (r: Resume) => `${r.name.replace(/\s+/g, "_")}_Resume`;
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function saveBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function toMarkdown(r: Resume) {
  const out: string[] = [
    `# ${r.name}`,
    `**${r.headline}** · ${r.location}`,
    "",
    [r.email, host(r.website), ...r.profiles.map((p) => host(p.url))].join(" · "),
    "",
    "## Summary",
    r.summary,
    "",
    "## Areas of expertise",
    ...r.expertise.map((e) => `- ${e}`),
    "",
    "## Experience",
  ];
  r.experience.forEach((x) => {
    out.push("", `### ${x.role}, ${x.company}`, `*${formatRange(x.start, x.end)}*`, "", x.intro, "", `**Stack:** ${x.stack.join(", ")}`, "", ...x.highlights.map((h) => `- ${h}`));
  });
  out.push("", "## Projects");
  r.projects.forEach((p) => out.push("", `### ${p.url ? `[${p.name}](${p.url})` : p.name}`, p.description, `**Stack:** ${p.stack.join(", ")}`));
  out.push("", "## Education");
  r.education.forEach((e) => out.push(`- **${e.title}**, ${e.school} (${e.location}), ${formatRange(e.start, e.end)}`));
  out.push("", "## Certificates and awards");
  r.awards.forEach((a) => out.push(`- ${a.url ? `[${a.title}](${a.url})` : a.title}, ${a.issuer}`));
  out.push("", "## Languages", r.languages.map((l) => `${l.name} (${l.level})`).join(" · "));
  out.push("", "## Additional skills", r.additionalSkills.join(", "));
  out.push("", "## Hobbies and interests", r.hobbies.join(", "), "");
  return out.join("\n");
}

// https://jsonresume.org/schema
export function toJsonResume(r: Resume) {
  const date = (ym?: string) => (ym ? `${ym}-01` : undefined);
  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: r.name,
      label: r.headline,
      email: r.email,
      url: r.website,
      summary: r.summary,
      location: { city: "Kigali", countryCode: "RW" },
      profiles: r.profiles.map((p) => ({ network: p.network, url: p.url, username: host(p.url).split("/").pop() })),
    },
    work: r.experience.map((x) => ({ name: x.company, position: x.role, startDate: date(x.start), endDate: date(x.end), summary: x.intro, highlights: x.highlights })),
    projects: r.projects.map((p) => ({ name: p.name, description: p.description, keywords: p.stack, url: p.url })),
    education: r.education.map((e) => ({ institution: e.school, studyType: e.title, startDate: date(e.start), endDate: date(e.end) })),
    awards: r.awards.map((a) => ({ title: a.title, awarder: a.issuer, url: a.url })),
    languages: r.languages.map((l) => ({ language: l.name, fluency: l.level })),
    skills: [{ name: "Expertise", keywords: r.expertise }, { name: "Additional skills", keywords: r.additionalSkills }],
    interests: r.hobbies.map((h) => ({ name: h })),
  };
}

export function downloadMarkdown(r: Resume) {
  saveBlob(new Blob([toMarkdown(r)], { type: "text/markdown;charset=utf-8" }), `${fileBase(r)}.md`);
}

export function downloadJson(r: Resume) {
  saveBlob(new Blob([JSON.stringify(toJsonResume(r), null, 2)], { type: "application/json" }), `${fileBase(r)}.json`);
}

export async function downloadPdf(r: Resume) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const M = 16, W = 210 - M * 2, BOTTOM = 297 - 16;
  let y = M;
  const ink = (g: number) => doc.setTextColor(g, g, g);
  const ensure = (h: number) => {
    if (y + h > BOTTOM) { doc.addPage(); y = M; }
  };
  const text = (s: string, size: number, opts: { bold?: boolean; italic?: boolean; gray?: number; indent?: number; gap?: number } = {}) => {
    doc.setFont("helvetica", opts.bold ? "bold" : opts.italic ? "italic" : "normal");
    doc.setFontSize(size);
    ink(opts.gray ?? 20);
    const lh = size * 0.42;
    const lines: string[] = doc.splitTextToSize(s, W - (opts.indent ?? 0));
    lines.forEach((line) => { ensure(lh); doc.text(line, M + (opts.indent ?? 0), y + lh * 0.8); y += lh; });
    y += opts.gap ?? 0;
  };
  const heading = (s: string) => {
    ensure(14);
    y += 3;
    text(s.toUpperCase(), 9.5, { bold: true, gray: 30 });
    doc.setDrawColor(200); doc.line(M, y, M + W, y);
    y += 2.5;
  };
  const bullets = (items: string[]) => items.forEach((b) => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
    const lines: string[] = doc.splitTextToSize(b, W - 5);
    ensure(lines.length * 4);
    ink(40); doc.text("•", M + 1, y + 3.2);
    lines.forEach((line) => { doc.text(line, M + 5, y + 3.2); y += 4; });
    y += 0.6;
  });

  text(r.name, 20, { bold: true, gray: 10 });
  text(`${r.headline} · ${r.location}`, 11, { gray: 70, gap: 1 });
  doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); ink(60);
  let x = M;
  [[r.email, `mailto:${r.email}`], [host(r.website), r.website], ...r.profiles.map((p) => [host(p.url), p.url])].forEach(([label, url], i) => {
    const s = (i ? "   ·   " : "") + label;
    const offset = i ? doc.getTextWidth("   ·   ") : 0;
    doc.text(s, x, y + 3.5);
    doc.link(x + offset, y, doc.getTextWidth(label), 4.5, { url });
    x += doc.getTextWidth(s);
  });
  y += 7;

  heading("Summary");
  text(r.summary, 9.5, { gray: 40, gap: 1 });
  heading("Areas of expertise");
  text(r.expertise.join("  ·  "), 9.5, { gray: 40, gap: 1 });

  heading("Experience");
  // lines needed for a block of text at a given size, so a role's header, intro and stack stay together
  const height = (str: string, size: number, font = "normal") => {
    doc.setFont("helvetica", font); doc.setFontSize(size);
    return (doc.splitTextToSize(str, W) as string[]).length * size * 0.42;
  };
  r.experience.forEach((e, i) => {
    ensure(8 + height(e.intro, 9.5) + height(e.stack.join(" · "), 8.5, "italic") + 10);
    if (i) y += 2;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); ink(15);
    doc.text(`${e.role}, ${e.company}`, M, y + 4);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); ink(90);
    const range = formatRange(e.start, e.end);
    doc.text(range, M + W - doc.getTextWidth(range), y + 4);
    y += 6;
    text(e.intro, 9.5, { gray: 40, gap: 0.8 });
    text(e.stack.join(" · "), 8.5, { italic: true, gray: 100, gap: 1 });
    bullets(e.highlights);
  });

  heading("Projects");
  r.projects.forEach((p) => {
    ensure(12);
    text(p.name + (p.url ? `  (${host(p.url)})` : ""), 10, { bold: true, gray: 15 });
    text(p.description, 9.5, { gray: 40 });
    text(p.stack.join(" · "), 8.5, { italic: true, gray: 100, gap: 1.5 });
  });

  heading("Education");
  r.education.forEach((e) => {
    text(e.title, 10, { bold: true, gray: 15 });
    text(`${e.school}, ${e.location}  ·  ${formatRange(e.start, e.end)}`, 9.5, { gray: 60, gap: 1.5 });
  });

  heading("Certificates and awards");
  bullets(r.awards.map((a) => `${a.title} (${a.issuer})`));
  heading("Languages");
  text(r.languages.map((l) => `${l.name} (${l.level})`).join("  ·  "), 9.5, { gray: 40 });
  heading("Additional skills");
  text(r.additionalSkills.join(", "), 9.5, { gray: 40 });
  heading("Hobbies and interests");
  text(r.hobbies.join(", "), 9.5, { gray: 40 });

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i); doc.setFont("helvetica", "normal"); doc.setFontSize(8); ink(140);
    doc.text(`${r.name}  ·  ${host(r.website)}`, M, 297 - 8);
    doc.text(`${i} / ${pages}`, 210 - M, 297 - 8, { align: "right" });
  }
  doc.setProperties({ title: `${r.name} - ${r.headline}`, author: r.name, subject: "Resume", keywords: r.expertise.join(", ") });
  doc.save(`${fileBase(r)}.pdf`);
}

export async function downloadDocx(r: Resume) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, TabStopType } = await import("docx");
  const p = (t: string, opts: { bold?: boolean; italics?: boolean; size?: number; color?: string } = {}) =>
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: t, bold: opts.bold, italics: opts.italics, size: opts.size ?? 20, color: opts.color })] });
  const h = (t: string) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 80 }, children: [new TextRun({ text: t.toUpperCase(), size: 20, bold: true, color: "222222" })] });
  const bullet = (t: string) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: t, size: 20 })] });
  const link = (label: string, url: string) => new ExternalHyperlink({ link: url, children: [new TextRun({ text: label, style: "Hyperlink", size: 20 })] });

  const contacts = [[r.email, `mailto:${r.email}`], [host(r.website), r.website], ...r.profiles.map((x) => [host(x.url), x.url])];
  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: r.name, bold: true, size: 40 })] }),
    p(`${r.headline} · ${r.location}`, { size: 22, color: "555555" }),
    new Paragraph({ spacing: { after: 120 }, children: contacts.flatMap(([label, url], i) => [...(i ? [new TextRun({ text: "  ·  ", size: 20 })] : []), link(label, url)]) }),
    h("Summary"), p(r.summary),
    h("Areas of expertise"), ...r.expertise.map(bullet),
    h("Experience"),
    ...r.experience.flatMap((e) => [
      new Paragraph({
        spacing: { before: 160, after: 40 },
        tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
        children: [new TextRun({ text: `${e.role}, ${e.company}`, bold: true, size: 22 }), new TextRun({ text: `\t${formatRange(e.start, e.end)}`, size: 18, color: "666666" })],
      }),
      p(e.intro),
      p(e.stack.join(" · "), { italics: true, size: 18, color: "666666" }),
      ...e.highlights.map(bullet),
    ]),
    h("Projects"),
    ...r.projects.flatMap((x) => [
      new Paragraph({ spacing: { before: 120, after: 40 }, children: [new TextRun({ text: x.name, bold: true, size: 21 }), ...(x.url ? [new TextRun({ text: "  ", size: 20 }), link(host(x.url), x.url)] : [])] }),
      p(x.description),
      p(x.stack.join(" · "), { italics: true, size: 18, color: "666666" }),
    ]),
    h("Education"),
    ...r.education.flatMap((e) => [p(e.title, { bold: true }), p(`${e.school}, ${e.location} · ${formatRange(e.start, e.end)}`, { color: "555555" })]),
    h("Certificates and awards"), ...r.awards.map((a) => bullet(`${a.title} (${a.issuer})`)),
    h("Languages"), p(r.languages.map((l) => `${l.name} (${l.level})`).join(" · ")),
    h("Additional skills"), p(r.additionalSkills.join(", ")),
    h("Hobbies and interests"), p(r.hobbies.join(", ")),
  ];
  const doc = new Document({
    creator: r.name,
    title: `${r.name} - ${r.headline}`,
    styles: { default: { document: { run: { font: "Calibri" } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
  });
  saveBlob(await Packer.toBlob(doc), `${fileBase(r)}.docx`);
}
