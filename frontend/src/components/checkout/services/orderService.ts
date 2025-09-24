// checkout/services/orderService.ts
export const createOrder = async (orderData: any) => {
  const response = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};
