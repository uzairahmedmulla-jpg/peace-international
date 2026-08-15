export function firebaseErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  const message = err instanceof Error ? err.message : String(err);

  if (
    code === "unavailable" ||
    message.toLowerCase().includes("offline") ||
    message.toLowerCase().includes("client is offline")
  ) {
    return "Cannot reach the fees database. Make sure the Firestore database is created in the Firebase console (Build → Firestore Database → Create database) and that you are online.";
  }
  if (code === "permission-denied") {
    return "Access denied. The Firestore security rules may not be deployed yet — paste the contents of firestore.rules into the Firestore → Rules tab and publish.";
  }
  if (code === "not-found" || message.includes("not found")) {
    return "Database not found. Create the Firestore database in the Firebase console for project peace-app-2f752.";
  }
  return message;
}
