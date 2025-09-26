const express = require ("express");
const {
  createOrder,
  updateOrderStatus,
  getOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/orderController.js");

const router = express.Router();

// POST /api/orders → create order
router.post("/", createOrder);

// POST /api/orders/:id/status
router.post("/:id/status", updateOrderStatus);

// GET /api/orders → fetch all orders
router.get("/", getOrders);

// GET /api/orders/:id → fetch single order
router.get("/:id", getOrderById);

// DELETE /api/orders/:id → delete order
router.delete("/:id", deleteOrder);

module.exports = router;
