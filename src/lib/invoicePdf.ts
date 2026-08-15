import { jsPDF, GState } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice } from "./types";

const SCHOOL = {
  name: "Peace International School",
  tagline: "Shaping Minds. Building Futures.",
  address: "Harihar, Karnataka, India",
  phone: "+91 98800 10068",
  email: "peace.i.school@gmail.com",
};

const PRIMARY: [number, number, number] = [45, 27, 122];
const ACCENT: [number, number, number] = [255, 122, 0];
const DARK: [number, number, number] = [19, 21, 40];
const MUTED: [number, number, number] = [110, 113, 135];
const LIGHT: [number, number, number] = [246, 247, 251];
const GREEN: [number, number, number] = [16, 132, 60];

function fmtINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

/* ---- Indian number-to-words ---- */

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const head = h ? `${ONES[h]} Hundred` : "";
  return `${head}${h && r ? " " : ""}${r ? twoDigits(r) : ""}`;
}

export function amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  if (rupees === 0 && paise === 0) return "Zero Rupees Only";
  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const rest = rupees % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${twoDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  let words = parts.join(" ");
  words += " Rupees";
  if (paise) words += ` and ${twoDigits(paise)} Paise`;
  return `${words} Only`;
}

/* ---- Logo loader (cached) ---- */

let logoCache: string | null | undefined;

async function loadLogo(): Promise<string | null> {
  if (logoCache !== undefined) return logoCache;
  try {
    const res = await fetch("/school-logo.jpg");
    if (!res.ok) {
      logoCache = null;
      return null;
    }
    const blob = await res.blob();
    logoCache = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("logo read failed"));
      reader.readAsDataURL(blob);
    });
  } catch {
    logoCache = null;
  }
  return logoCache;
}

function formatDate(value: string): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function buildInvoicePdf(invoice: Invoice): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 14;
  const contentW = pageW - margin * 2;

  const logo = await loadLogo();
  const paidDate = formatDate(invoice.date);

  /* ---- header band ---- */
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, pageW, 34, "F");
  doc.setFillColor(...ACCENT);
  doc.rect(0, 34, pageW, 1.2, "F");

  let brandX = margin;
  if (logo) {
    try {
      doc.addImage(logo, "JPEG", margin, 5.5, 23, 23);
      brandX = margin + 28;
    } catch {
      brandX = margin;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text(SCHOOL.name, brandX, 12.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(214, 204, 255);
  doc.text(SCHOOL.tagline, brandX, 19);

  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  const contactLine = `${SCHOOL.address}  |  ${SCHOOL.phone}  |  ${SCHOOL.email}`;
  doc.text(doc.splitTextToSize(contactLine, contentW - brandX), brandX, 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...ACCENT);
  doc.text("FEE INVOICE", pageW - margin, 12.5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`Invoice No: ${invoice.invoiceNo}`, pageW - margin, 19, {
    align: "right",
  });
  doc.text(`Date: ${paidDate}`, pageW - margin, 25, { align: "right" });

  /* ---- bill-to + payment detail boxes ---- */
  const y = 46;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...PRIMARY);
  doc.text("BILLED TO", margin, y - 4);

  doc.setFillColor(...LIGHT);
  doc.setDrawColor(228, 228, 236);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, 100, 34, 2, 2, "FD");

  const billRows: Array<[string, string]> = [
    ["Student", invoice.studentName],
    ["Class", invoice.className],
    ["Parent / Guardian", invoice.parentName || "—"],
    ["Phone", invoice.phone || "—"],
    ["Email", invoice.email || "—"],
  ];

  doc.setFontSize(8.5);
  let by = y + 6.5;
  for (const [label, value] of billRows) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MUTED);
    doc.text(`${label}:`, margin + 4, by);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...DARK);
    doc.text(
      doc.splitTextToSize(value || "—", 62) as string,
      margin + 32,
      by,
    );
    by += 5.6;
  }

  const detailX = pageW - margin - 78;
  doc.setFillColor(...LIGHT);
  doc.roundedRect(detailX, y, 78, 34, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...PRIMARY);
  doc.text("PAYMENT DETAILS", detailX + 4, y + 4);

  const detailRows: Array<[string, string]> = [
    ["Method", invoice.method],
    ["Date", paidDate],
    ["Status", "PAID"],
  ];

  doc.setFontSize(8.5);
  let dy = y + 12;
  for (const [label, value] of detailRows) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MUTED);
    doc.text(`${label}:`, detailX + 4, dy);
    doc.setFont("helvetica", "bold");
    const c = label === "Status" ? GREEN : DARK;
    doc.setTextColor(c[0], c[1], c[2]);
    doc.text(String(value), detailX + 34, dy, { align: "right" });
    dy += 6;
  }

  /* ---- items table ---- */
  autoTable(doc, {
    startY: y + 40,
    margin: { left: margin, right: margin },
    head: [["#", "Fee Description", "Amount"]],
    body: invoice.items.map((item, i) => [
      String(i + 1),
      item.description,
      fmtINR(item.amount),
    ]),
    theme: "striped",
    styles: { fontSize: 9.5, cellPadding: 3, textColor: DARK },
    headStyles: {
      fillColor: PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: LIGHT },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" },
      2: { cellWidth: 42, halign: "right" },
    },
  });

  const tableEnd =
    (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
      .finalY ?? y + 50;

  /* ---- totals box + PAID stamp ---- */
  const totalsY = tableEnd + 8;
  const totalsX = pageW - margin - 78;
  doc.setFillColor(...LIGHT);
  doc.setDrawColor(228, 228, 236);
  doc.roundedRect(totalsX, totalsY, 78, 20, 2, 2, "FD");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MUTED);
  doc.text("Subtotal", totalsX + 4, totalsY + 7);
  doc.setTextColor(...DARK);
  doc.text(fmtINR(invoice.subtotal), totalsX + 74, totalsY + 7, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...PRIMARY);
  doc.text("TOTAL", totalsX + 4, totalsY + 15);
  doc.setTextColor(...ACCENT);
  doc.setFontSize(11);
  doc.text(fmtINR(invoice.total), totalsX + 74, totalsY + 15, {
    align: "right",
  });

  /* PAID stamp */
  const stampCX = totalsX + 60;
  const stampCY = totalsY + 10;
  doc.saveGraphicsState();
  doc.setGState(new GState({ opacity: 0.2 }));
  doc.setDrawColor(...GREEN);
  doc.setLineWidth(1.8);
  doc.roundedRect(stampCX - 26, stampCY - 10, 52, 20, 3, 3, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...GREEN);
  doc.text("PAID", stampCX, stampCY + 1, { align: "center" });
  doc.restoreGraphicsState();

  /* ---- amount in words ---- */
  const wordsY = totalsY + 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("Amount in words:", margin, wordsY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text(
    doc.splitTextToSize(amountInWords(invoice.total), contentW) as string,
    margin,
    wordsY + 5,
  );

  /* ---- footer ---- */
  let fy = pageH - 34;
  doc.setDrawColor(220, 220, 230);
  doc.setLineWidth(0.4);
  doc.line(margin, fy, pageW - margin, fy);
  fy += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...PRIMARY);
  doc.text(SCHOOL.name, margin, fy);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    doc.splitTextToSize(
      `${SCHOOL.address}  |  ${SCHOOL.phone}  |  ${SCHOOL.email}`,
      contentW,
    ) as string,
    margin,
    fy + 5,
  );
  doc.text(
    doc.splitTextToSize(
      "Thank you for your payment. This is a computer-generated fee invoice and does not require a signature.",
      contentW,
    ) as string,
    margin,
    fy + 10,
  );

  doc.setDrawColor(150, 150, 160);
  doc.setLineWidth(0.3);
  doc.line(pageW - margin - 45, pageH - 16, pageW - margin, pageH - 16);
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Authorized Signatory", pageW - margin - 45, pageH - 12);

  return doc;
}
