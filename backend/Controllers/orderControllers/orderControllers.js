import { asyncHandler } from "../../Middleware/async.js";
import { Order } from "../../Models/OrderModel.js";
import { ErrorResponse } from "../../Utilis/errorResponse.js";

//post /api/v1/orders
//protected
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

//get order by id
//get api/v1/orders/:id
//protected
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
    
  );

  if (order) {
    res.status(200).json(order);
  } else {
    return next(new ErrorResponse(`order not found`, 404));
  }
});

//update order to paid
//put api/v1/orders/:id/pay
//protected
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email,
    };
    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    return next(new ErrorResponse(`order not found`, 404));
  }
});


//get orders
//get api/v1/orders
//private owner admin
export const getOrders = asyncHandler(async(req,res,next) => {
  const orders = res.advancedResults
  res.status(200).json(res.advancedResults)
})

//get my orders
//get api/v1/orders/myorders
//private
export const getMyOrders = asyncHandler(async(req,res,next) => {
  const orders = await Order.find({user:req.user._id})
  res.status(200).json(orders)
})

//update order to paid
//put api/v1/orders/:id/deliver
//owner admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.DeliveredAt = Date.now();
    
    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    return next(new ErrorResponse(`order not found`, 404));
  }
});