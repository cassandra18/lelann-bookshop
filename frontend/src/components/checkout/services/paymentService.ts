// checkout/services/paymentService.ts
export const triggerMpesaPayment = async (orderId: string, amount: number, phone: string) => {
  const response = await fetch("http://localhost:5000/api/payments/mpesa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, amount, phone }),
  });

  if (!response.ok) throw new Error("M-Pesa payment failed");
  return response.json();
};
