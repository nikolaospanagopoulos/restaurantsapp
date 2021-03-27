import { asyncHandler } from "../../Middleware/async.js";
import { Order } from "../../Models/OrderModel.js";
import { ErrorResponse } from "../../Utilis/errorResponse.js";

export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    return next(new ErrorResponse(`no order items`, 400));
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      deliveryAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
