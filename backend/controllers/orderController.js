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
      subtotal,
      items, // array of { productId, quantity, price }
    } = req.body;

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
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true }, // return items too
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
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
