import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { jsPDF } from "jspdf";
import { getDbInstance, getStorageInstance } from "./firebase";
import type {
  AdminUser,
  FeeStructure,
  Invoice,
  InvoiceItem,
  Payment,
  Student,
} from "./types";

const COLLECTIONS = {
  feeStructures: "feeStructures",
  students: "students",
  payments: "payments",
  invoices: "invoices",
  admins: "admins",
  settings: "settings",
  counters: "counters",
};

export type CreatePaymentInput = {
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  phone: string;
  email: string;
  method: string;
  date: string;
  items: InvoiceItem[];
};

/* ---------------- Fee structures ---------------- */

export async function fetchFeeStructures(): Promise<FeeStructure[]> {
  const db = getDbInstance();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.feeStructures), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<FeeStructure, "id">),
  }));
}

export async function addFeeStructure(
  data: Omit<FeeStructure, "id" | "createdAt">,
): Promise<void> {
  const db = getDbInstance();
  await addDoc(collection(db, COLLECTIONS.feeStructures), {
    ...data,
    createdAt: Date.now(),
  });
}

export async function updateFeeStructure(
  id: string,
  data: Omit<FeeStructure, "id" | "createdAt">,
): Promise<void> {
  const db = getDbInstance();
  await updateDoc(doc(db, COLLECTIONS.feeStructures, id), { ...data });
}

export async function deleteFeeStructure(id: string): Promise<void> {
  const db = getDbInstance();
  await deleteDoc(doc(db, COLLECTIONS.feeStructures, id));
}

/* ---------------- Students ---------------- */

export async function fetchStudents(): Promise<Student[]> {
  const db = getDbInstance();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.students), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Student, "id">),
  }));
}

export async function addStudent(
  data: Omit<Student, "id" | "createdAt">,
): Promise<void> {
  const db = getDbInstance();
  await addDoc(collection(db, COLLECTIONS.students), {
    ...data,
    createdAt: Date.now(),
  });
}

export async function updateStudent(
  id: string,
  data: Omit<Student, "id" | "createdAt">,
): Promise<void> {
  const db = getDbInstance();
  await updateDoc(doc(db, COLLECTIONS.students, id), { ...data });
}

export async function deleteStudent(id: string): Promise<void> {
  const db = getDbInstance();
  await deleteDoc(doc(db, COLLECTIONS.students, id));
}

/* ---------------- Payments + Invoices ---------------- */

export async function createPayment(
  input: CreatePaymentInput,
): Promise<string> {
  const db = getDbInstance();
  const year = new Date().getFullYear();
  const paymentRef = doc(collection(db, COLLECTIONS.payments));
  const invoiceRef = doc(collection(db, COLLECTIONS.invoices));
  const counterRef = doc(db, COLLECTIONS.counters, "invoice");

  const invoiceNo = await runTransaction(db, async (tx) => {
    const counterSnap = await tx.get(counterRef);
    const value = counterSnap.exists()
      ? (counterSnap.data().value as number)
      : 0;
    const next = value + 1;
    const no = `PI-${year}-${String(next).padStart(4, "0")}`;
    const subtotal = input.items.reduce((sum, item) => sum + item.amount, 0);
    const now = Date.now();

    tx.set(paymentRef, {
      invoiceNo: no,
      studentId: input.studentId,
      studentName: input.studentName,
      className: input.className,
      amount: subtotal,
      method: input.method,
      date: input.date,
      status: "paid",
      createdAt: now,
    });

    tx.set(invoiceRef, {
      invoiceNo: no,
      studentId: input.studentId,
      studentName: input.studentName,
      className: input.className,
      parentName: input.parentName,
      phone: input.phone,
      email: input.email,
      method: input.method,
      date: input.date,
      items: input.items,
      subtotal,
      total: subtotal,
      status: "paid",
      createdAt: now,
    });

    tx.set(counterRef, { value: next });
    return no;
  });

  return invoiceNo;
}

export async function fetchPayments(): Promise<Payment[]> {
  const db = getDbInstance();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.payments), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({
    id: d.id,
    invoiceNo: d.data().invoiceNo as string,
    studentId: d.data().studentId as string,
    studentName: d.data().studentName as string,
    className: d.data().className as string,
    amount: d.data().amount as number,
    method: d.data().method as string,
    date: d.data().date as string,
    status: "paid",
    createdAt: d.data().createdAt as number,
  }));
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const db = getDbInstance();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.invoices), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Invoice, "id">),
  }));
}

export async function fetchInvoiceByNo(invoiceNo: string): Promise<Invoice | null> {
  const invoices = await fetchInvoices();
  return invoices.find((inv) => inv.invoiceNo === invoiceNo) ?? null;
}

/* ---------------- Storage (invoice PDF backup) ---------------- */

export async function uploadInvoicePdf(
  invoiceNo: string,
  pdf: jsPDF,
): Promise<string> {
  const storage = getStorageInstance();
  const blob = pdf.output("blob");
  const fileRef = ref(storage, `invoices/${invoiceNo}.pdf`);
  await uploadBytes(fileRef, blob, { contentType: "application/pdf" });
  return getDownloadURL(fileRef);
}

/* ---------------- Admin bootstrap ---------------- */

export async function fetchBootstrapDone(): Promise<boolean> {
  const db = getDbInstance();
  const snap = await getDoc(doc(db, COLLECTIONS.settings, "bootstrap"));
  return snap.exists() && snap.data().done === true;
}

export async function bootstrapAdmin(
  uid: string,
  name: string,
  email: string,
): Promise<void> {
  const db = getDbInstance();
  const bootRef = doc(db, COLLECTIONS.settings, "bootstrap");
  const bootSnap = await getDoc(bootRef);
  if (!bootSnap.exists()) {
    await setDoc(bootRef, { done: false });
  }
  await setDoc(doc(db, COLLECTIONS.admins, uid), {
    name,
    email,
    createdAt: Date.now(),
  });
  await updateDoc(bootRef, { done: true });
}

export async function isAdmin(uid: string): Promise<boolean> {
  const db = getDbInstance();
  const snap = await getDoc(doc(db, COLLECTIONS.admins, uid));
  return snap.exists();
}

export async function fetchAdmins(): Promise<AdminUser[]> {
  const db = getDbInstance();
  const snap = await getDocs(collection(db, COLLECTIONS.admins));
  return snap.docs.map((d) => ({
    uid: d.id,
    ...(d.data() as Omit<AdminUser, "uid">),
  }));
}
