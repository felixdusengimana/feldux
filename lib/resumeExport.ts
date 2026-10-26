import { Resume, formatRange, roleMeta } from "@/lib/resume";

const fileBase = (r: Resume) => `${r.name.replace(/\s+/g, "_")}_Resume`;
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const LINK = "0563C1"; // standard link blue in Word

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
    [r.email, r.phone, host(r.website), ...r.profiles.map((p) => host(p.url))].join(" · "),
  ];
  const section = (title: string, lines: string[]) => lines.length && out.push("", `## ${title}`, ...lines);
  section("Summary", r.summary ? [r.summary] : []);
  section("Skills", r.expertise.map((e) => `- ${e}`));
  section("Experience", r.experience.flatMap((x) => [
    "", `### ${x.role}`, `**${x.company}** · *${roleMeta(x)}*`, ...(x.intro ? ["", x.intro] : []),
    "", `**Stack:** ${x.stack.join(", ")}`, "", ...x.highlights.map((h) => `- ${h}`),
  ]));
  section("Projects", r.projects.flatMap((p) => [
    "", `### ${p.url ? `[${p.name}](${p.url})` : p.name}`, ...(p.start ? [`*${formatRange(p.start, p.end)}*`] : []), p.description, `**Stack:** ${p.stack.join(", ")}`,
  ]));
  section("Education", r.education.map((e) => `- **${e.title}**, ${e.school} (${e.location}), ${formatRange(e.start, e.end)}`));
  section("Certificates and awards", r.awards.map((a) => `- ${a.url ? `[${a.title}](${a.url})` : a.title}, ${a.issuer}`));
  section("Languages", r.languages.length ? [r.languages.map((l) => `${l.name} (${l.level})`).join(" · ")] : []);
  section("Additional skills", r.additionalSkills.length ? [r.additionalSkills.join(", ")] : []);
  section("Hobbies and interests", r.hobbies.length ? [r.hobbies.join(", ")] : []);
  return out.join("\n") + "\n";
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
      phone: r.phone,
      url: r.website,
      summary: r.summary || undefined,
      location: { city: "Kigali", countryCode: "RW" },
      profiles: r.profiles.map((p) => ({ network: p.network, url: p.url, username: host(p.url).split("/").pop() })),
    },
    work: r.experience.map((x) => ({ name: x.company, position: x.role, startDate: date(x.start), endDate: date(x.end), location: x.location, summary: x.intro, highlights: x.highlights })),
    projects: r.projects.map((p) => ({ name: p.name, description: p.description, keywords: p.stack, url: p.url, startDate: date(p.start), endDate: date(p.end) })),
    education: r.education.map((e) => ({ institution: e.school, studyType: e.title, startDate: date(e.start), endDate: date(e.end) })),
    awards: r.awards.map((a) => ({ title: a.title, awarder: a.issuer, url: a.url })),
    languages: r.languages.map((l) => ({ language: l.name, fluency: l.level })),
    skills: [{ name: "Expertise", keywords: r.expertise }, { name: "Additional skills", keywords: r.additionalSkills }].filter((x) => x.keywords.length),
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
  const blue = () => doc.setTextColor(`#${LINK}`);
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
  // keep a heading with the start of its section
  const heading = (s: string) => {
    ensure(30);
    y += 3;
    text(s.toUpperCase(), 9.5, { bold: true, gray: 30 });
    doc.setDrawColor(200); doc.line(M, y, M + W, y);
    y += 2.5;
  };
  // bullet and first line are one text item, so parsers keep them together
  const bullets = (items: (string | { text: string; url?: string })[]) => items.forEach((item) => {
    const { text: b, url } = typeof item === "string" ? { text: item, url: undefined } : item;
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
    const indent = doc.getTextWidth("•  ");
    const lines: string[] = doc.splitTextToSize(b, W - 1 - indent);
    ensure(lines.length * 4);
    if (url) blue(); else ink(40);
    lines.forEach((line, i) => {
      doc.text(i ? line : `•  ${line}`, M + 1 + (i ? indent : 0), y + 3.2);
      if (url) doc.link(M + 1 + indent, y, doc.getTextWidth(line), 4, { url });
      y += 4;
    });
    y += 0.6;
  });
  // left and right text drawn as separate items, so parsers read them as separate fields
  const sides = (left: string, right: string, size: number, opts: { bold?: boolean; gray: number }) => {
    doc.setFont("helvetica", opts.bold ? "bold" : "normal"); doc.setFontSize(size); ink(opts.gray);
    doc.text(left, M, y + 4);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); ink(90);
    if (right) doc.text(right, M + W - doc.getTextWidth(right), y + 4);
    y += size * 0.42 + 1.6;
  };

  text(r.name, 20, { bold: true, gray: 10 });
  text(`${r.headline} · ${r.location}`, 11, { gray: 70, gap: 1 });
  doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); ink(60);
  let x = M;
  [[r.email, `mailto:${r.email}`], [r.phone, tel(r.phone)], [host(r.website), r.website], ...r.profiles.map((p) => [host(p.url), p.url])].forEach(([label, url], i) => {
    if (i && x + doc.getTextWidth("   ·   " + label) > M + W) { x = M; y += 5; i = 0; }
    if (i) { ink(60); doc.text("   ·   ", x, y + 3.5); x += doc.getTextWidth("   ·   "); }
    blue(); doc.text(label, x, y + 3.5);
    doc.link(x, y, doc.getTextWidth(label), 4.5, { url });
    x += doc.getTextWidth(label);
  });
  y += 7;

  if (r.summary) { heading("Summary"); text(r.summary, 9.5, { gray: 40, gap: 1 }); }
  if (r.expertise.length) { heading("Skills"); text(r.expertise.join("  ·  "), 9.5, { gray: 40, gap: 1 }); }

  // lines needed for a block of text at a given size, so a role's header, intro and stack stay together
  const height = (str: string, size: number, font = "normal") => {
    doc.setFont("helvetica", font); doc.setFontSize(size);
    return (doc.splitTextToSize(str, W) as string[]).length * size * 0.42;
  };
  if (r.experience.length) heading("Experience");
  r.experience.forEach((e, i) => {
    ensure(8 + (e.intro ? height(e.intro, 9.5) : 0) + height(e.stack.join(" · "), 8.5, "italic") + 14);
    if (i) y += 2;
    sides(e.role, formatRange(e.start, e.end), 10.5, { bold: true, gray: 15 });
    sides(e.company, [e.type, e.location].filter(Boolean).join(" · "), 9.5, { gray: 60 });
    if (e.intro) text(e.intro, 9.5, { gray: 40, gap: 0.8 });
    text(e.stack.join(" · "), 8.5, { italic: true, gray: 100, gap: 1 });
    bullets(e.highlights);
  });

  if (r.projects.length) heading("Projects");
  r.projects.forEach((p) => {
    ensure(12);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(15);
    doc.text(p.name, M, y + 4);
    let px = M + doc.getTextWidth(p.name);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    if (p.url) {
      px += 3; blue(); doc.text(host(p.url), px, y + 4);
      doc.link(px, y, doc.getTextWidth(host(p.url)), 5, { url: p.url });
      px += doc.getTextWidth(host(p.url));
    }
    if (p.start) { ink(90); doc.text(`  ·  ${formatRange(p.start, p.end)}`, px, y + 4); }
    y += 5.8;
    text(p.description, 9.5, { gray: 40 });
    text(p.stack.join(" · "), 8.5, { italic: true, gray: 100, gap: 1.5 });
  });

  if (r.education.length) heading("Education");
  r.education.forEach((e) => {
    ensure(12);
    text(e.title, 10, { bold: true, gray: 15 });
    sides(`${e.school}, ${e.location}`, formatRange(e.start, e.end), 9.5, { gray: 60 });
    y += 1.5;
  });

  if (r.awards.length) { heading("Certificates and awards"); bullets(r.awards.map((a) => ({ text: `${a.title} (${a.issuer})`, url: a.url }))); }
  if (r.languages.length) { heading("Languages"); text(r.languages.map((l) => `${l.name} (${l.level})`).join("  ·  "), 9.5, { gray: 40 }); }
  if (r.additionalSkills.length) { heading("Additional skills"); text(r.additionalSkills.join(", "), 9.5, { gray: 40 }); }
  if (r.hobbies.length) { heading("Hobbies and interests"); text(r.hobbies.join(", "), 9.5, { gray: 40 }); }

  doc.setProperties({ title: `${r.name} - ${r.headline}`, author: r.name, subject: "Resume", keywords: r.expertise.join(", ") });
  doc.save(`${fileBase(r)}.pdf`);
}

export async function downloadDocx(r: Resume) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, TabStopType } = await import("docx");
  const p = (t: string, opts: { bold?: boolean; italics?: boolean; size?: number; color?: string } = {}) =>
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: t, bold: opts.bold, italics: opts.italics, size: opts.size ?? 20, color: opts.color })] });
  const h = (t: string) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 80 }, children: [new TextRun({ text: t.toUpperCase(), size: 20, bold: true, color: "222222" })] });
  const bullet = (t: string) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: t, size: 20 })] });
  const link = (label: string, url: string, size = 20) =>
    new ExternalHyperlink({ link: url, children: [new TextRun({ text: label, style: "Hyperlink", color: LINK, underline: {}, size })] });

  const contacts = [[r.email, `mailto:${r.email}`], [r.phone, tel(r.phone)], [host(r.website), r.website], ...r.profiles.map((x) => [host(x.url), x.url])];
  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: r.name, bold: true, size: 40 })] }),
    p(`${r.headline} · ${r.location}`, { size: 22, color: "555555" }),
    new Paragraph({ spacing: { after: 120 }, children: contacts.flatMap(([label, url], i) => [...(i ? [new TextRun({ text: "  ·  ", size: 20 })] : []), link(label, url)]) }),
  ];
  const add = (show: unknown, ...items: InstanceType<typeof Paragraph>[]) => show && children.push(...items);
  add(r.summary, h("Summary"), p(r.summary));
  add(r.expertise.length, h("Skills"), ...r.expertise.map(bullet));
  add(r.experience.length, h("Experience"), ...r.experience.flatMap((e) => [
    new Paragraph({
      spacing: { before: 160, after: 40 },
      tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
      children: [new TextRun({ text: e.role, bold: true, size: 22 }), new TextRun({ text: `\t${formatRange(e.start, e.end)}`, size: 18, color: "666666" })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
      children: [new TextRun({ text: e.company, size: 20, color: "444444" }), new TextRun({ text: `\t${[e.type, e.location].filter(Boolean).join(" · ")}`, size: 18, color: "666666" })],
    }),
    ...(e.intro ? [p(e.intro)] : []),
    p(e.stack.join(" · "), { italics: true, size: 18, color: "666666" }),
    ...e.highlights.map(bullet),
  ]));
  add(r.projects.length, h("Projects"), ...r.projects.flatMap((x) => [
    new Paragraph({ spacing: { before: 120, after: 40 }, children: [new TextRun({ text: x.name, bold: true, size: 21 }), ...(x.url ? [new TextRun({ text: "  ", size: 20 }), link(host(x.url), x.url)] : []), ...(x.start ? [new TextRun({ text: `  ·  ${formatRange(x.start, x.end)}`, size: 18, color: "666666" })] : [])] }),
    p(x.description),
    p(x.stack.join(" · "), { italics: true, size: 18, color: "666666" }),
  ]));
  add(r.education.length, h("Education"), ...r.education.flatMap((e) => [
    p(e.title, { bold: true }),
    new Paragraph({
      spacing: { after: 80 },
      tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
      children: [new TextRun({ text: `${e.school}, ${e.location}`, size: 20, color: "555555" }), new TextRun({ text: `\t${formatRange(e.start, e.end)}`, size: 18, color: "666666" })],
    }),
  ]));
  add(r.awards.length, h("Certificates and awards"), ...r.awards.map((a) =>
    a.url
      ? new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [link(a.title, a.url), new TextRun({ text: ` (${a.issuer})`, size: 20 })] })
      : bullet(`${a.title} (${a.issuer})`)
  ));
  add(r.languages.length, h("Languages"), p(r.languages.map((l) => `${l.name} (${l.level})`).join(" · ")));
  add(r.additionalSkills.length, h("Additional skills"), p(r.additionalSkills.join(", ")));
  add(r.hobbies.length, h("Hobbies and interests"), p(r.hobbies.join(", ")));
  const doc = new Document({
    creator: r.name,
    title: `${r.name} - ${r.headline}`,
    styles: { default: { document: { run: { font: "Calibri" } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
  });
  saveBlob(await Packer.toBlob(doc), `${fileBase(r)}.docx`);
}
