import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// Plain, single-column, ATS-safe Word document from the model's plain text.
const HEADINGS = new Set([
  "PROFESSIONAL SUMMARY", "KEY SKILLS", "WORK EXPERIENCE", "CERTIFICATES AND LICENCES",
  "EDUCATION", "LANGUAGES", "REFEREES",
]);

export function extractSection(body: string, titlePrefix: string): string {
  const re = /^## (.+)$/gm;
  const marks: { title: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) marks.push({ title: m[1], start: m.index, end: m.index + m[0].length });
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].title.toUpperCase().startsWith(titlePrefix.toUpperCase())) {
      return body.slice(marks[i].end, marks[i + 1]?.start ?? body.length).trim();
    }
  }
  return "";
}

function clean(line: string): string {
  return line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^#+\s*/, "").trimEnd();
}

export async function textToDocx(text: string, opts: { nameFirstLine?: boolean } = {}): Promise<Buffer> {
  const lines = text.split(/\r?\n/);
  const children: Paragraph[] = [];
  let first = true;
  for (const raw of lines) {
    const line = clean(raw);
    if (!line.trim()) { children.push(new Paragraph({ spacing: { after: 60 } })); continue; }
    const isBullet = /^[-*•]\s+/.test(line);
    if (opts.nameFirstLine && first) {
      children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: line, bold: true, size: 32, font: "Calibri" })], spacing: { after: 60 } }));
    } else if (HEADINGS.has(line.trim().toUpperCase())) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: line.trim().toUpperCase(), bold: true, size: 24, font: "Calibri" })], spacing: { before: 200, after: 80 } }));
    } else if (isBullet) {
      children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: line.replace(/^[-*•]\s+/, ""), size: 21, font: "Calibri" })], spacing: { after: 40 } }));
    } else {
      children.push(new Paragraph({ children: [new TextRun({ text: line, size: 21, font: "Calibri" })], spacing: { after: 60 } }));
    }
    first = false;
  }
  const doc = new Document({
    sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } } }, children }],
  });
  return Buffer.from(await Packer.toBuffer(doc));
}
