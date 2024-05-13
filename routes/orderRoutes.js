const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { placeOrderController, orderStatusController } = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

//routes
//* PLACE ORDER || POST || /api/v1/order/placeorder
router.post("/placeorder", authMiddleware, placeOrderController);

//* ORDER STATUS || POST || /api/v1/order/order-status/:id
router.post("/order-status/:id", authMiddleware,adminMiddleware, orderStatusController);

module.exports = router;
