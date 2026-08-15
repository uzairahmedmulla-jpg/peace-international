export type FeeStructure = {
  id: string;
  name: string;
  className: string;
  amount: number;
  category: string;
  description: string;
  createdAt: number;
};

export type Student = {
  id: string;
  name: string;
  className: string;
  parentName: string;
  phone: string;
  email: string;
  createdAt: number;
};

export type InvoiceItem = {
  description: string;
  amount: number;
};

export type Payment = {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  amount: number;
  method: string;
  date: string;
  status: "paid";
  createdAt: number;
};

export type Invoice = {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  phone: string;
  email: string;
  method: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  total: number;
  status: "paid";
  createdAt: number;
};

export type AdminUser = {
  uid: string;
  name: string;
  email: string;
  createdAt: number;
};

export const CLASS_OPTIONS = [
  "Nursery",
  "LKG",
  "UKG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

export const FEE_CATEGORIES = [
  "Tuition",
  "Transport",
  "Admission",
  "Exam",
  "Activity",
  "Other",
];

export const PAYMENT_METHODS = [
  "Cash",
  "UPI",
  "Bank Transfer",
  "Card",
  "Cheque",
] as const;
