import { buildInvoicePdf } from "./invoicePdf";
import { fetchInvoiceByNo } from "./fees";

export async function downloadInvoice(invoiceNo: string): Promise<void> {
  const invoice = await fetchInvoiceByNo(invoiceNo);
  if (!invoice) throw new Error(`Invoice ${invoiceNo} not found.`);
  const pdf = await buildInvoicePdf(invoice);
  pdf.save(`${invoice.invoiceNo}.pdf`);
}
