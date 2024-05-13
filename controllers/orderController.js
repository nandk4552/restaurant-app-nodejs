const orderModel = require("../models/orderModel");

// place order controller
const placeOrderController = async (req, res) => {
  try {
    //get all the order details items from user
    const { cart } = req.body;
    //validation for cart
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "food cart is required",
      });
    }
    let total = 0;
    //calculate price
    cart.map((i) => {
      total += i.price;
    });

    //create new order object
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    //save order object
    await newOrder.save();

    //success response
    return res.status(201).send({
      success: true,
      message: "order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

// order status controller
const orderStatusController = async (req, res) => {
  try {
    //get id from url
    const orderId = req.params.id;

    //validation for orderId
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Order ID not found",
      });
    }
    //get status from user
    const { status } = req.body;

    //find order by id in db
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    //success response
    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};
module.exports = { placeOrderController, orderStatusController };
