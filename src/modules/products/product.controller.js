import { Product } from "../../DB/models/Products.js";
import { sendCreate, sendRes } from "../../utils/sendMsg.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    sendCreate(res, "Product created");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category.toLowercase();
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    sendRes(
      res,
      { products, pagination: { page: Number(page), limit: Number(limit) } },
      "Products fetched",
      200
    );
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    sendRes(res, product, "Product fetched");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const product = await Product.findByIdAndUpdate(id, body, { new: true, runvalidators: true });
    if(!product) throw new Error("Product not found");
    sendRes(res, product, "Product updated");
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if(!product) throw new Error("Product not found");
    sendRes(res, product, "Product deleted");
  } catch (error) {
    next(error);
  }
};
