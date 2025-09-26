export const triggerMpesaPayment = async (
  orderId: string,
  amount: number,
  phone: string
) => {
  console.log("STK PUSH DATA", orderId, amount, phone);

  const response = await fetch("http://localhost:5000/api/lelann/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, amount, phone }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`M-Pesa payment failed: ${errorText}`);
  }

  return response.json();
};
