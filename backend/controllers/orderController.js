import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// reate a new order
export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      deliveryOption,
      paymentMethod,
      street,
      city,
      apartment,
      county,
      deliveryFee = 0,
      items, // array of { productId, quantity, price }
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in the order" });
    }

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Add delivery fee
    const total = subtotal + deliveryFee;

    
    // create order with items
    const order = await prisma.order.create({
      data: {
        firstName,
        lastName,
        phone,
        deliveryOption,
        paymentMethod,
        street,
        city,
        apartment,
        county,
        subtotal,
        status: "pending",
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true }, 
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body; // e.g. { status: "paid", message: "Payment successful" }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: message || `Order updated to ${status}`,
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
