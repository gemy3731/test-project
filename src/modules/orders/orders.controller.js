import { Order } from "../../DB/models/Orders.js";
import { sendRes } from "../../utils/sendMsg.js";

const getAllorders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("products.product", "title category price")
      .skip(skip)
      .limit(Number(limit));

    sendRes(
      res,
      { orders, pagination: { page: Number(page), limit: Number(limit) } },
      "Orders fetched"
    );
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("products.product", "title category price");
    sendRes(res, order, "Order fetched");
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res) => {
  try {
    if(!req.body.products || !req.body.products.length) throw new Error("Order must have at least one product");
    await Order.create({_id:req.user.id,...req.body})
    sendRes(res, "Order created");
  } catch (error) {
    next(error);
  }
};


