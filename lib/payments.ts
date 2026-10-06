// Payment initialization belongs on the server. Never expose PAYSTACK_SECRET_KEY.
export async function initializePayment() {
  return {
    mode: "demo",
    status: "unpaid",
    message: "Live payments are not configured. No money has been charged.",
  } as const;
}
