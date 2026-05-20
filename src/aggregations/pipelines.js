//1. Sales Summary

const salesSummaryPipeline = () => {
  return [
    { $match: { status: "completed" } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$total_amount" },
        averageOrderValue: { $avg: "$total_amount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
        averageOrderValue: { $round: ["$averageOrderValue", 2] },
      },
    },
  ];
};

const salesByCategoryPipleLine = () => [
  { $match: { status: "completed" } },
  { $unwind: "$products" },
  {
    $lookup: {
      from: "products",
      localField: "products.product",
      foreignField: "_id",
      as: "product",
    },
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$product.category",
      totalSales: {
        $sum: { $multiply: ["$products.quantity", "$product.price"] },
      },
      totalQuantity: { $sum: "$products.quantity" },
    },
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalSales: { $round: ["$totalSales", 2] },
      totalQuantity: 1,
    },
  },
  { $sort: { totalSales: -1 } },
];

const topSellingPipleLine = () => [
  { $match: { status: "completed" } },
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.product",
      totalSold: { $sum: "$products.quantity" },
    },
  },
  { $sort: { totalSold: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product",
    },
  },
  { $unwind: "$product" },
  {
    $project: {
      _id: 0,
      title: "$product.title",
      totalSold: 1,
    },
  },
];

const userPurchasesPipleline = () => [
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$user",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$total_amount" },
    },
  },
  {
    $lookup: {
      from: "users",
      locaField: "_id",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      userName: "$user.name",
      totalOrders: 1,
      totalSpent: { $round: ["$totalSpent", 2] },
    },
  },
  { $sort: { totalSpent: -1 } },
];

const orders = [
  {
    _id: "A",
    total_amount: 2,
    totalSpent: 5,
  },
  {
    _id: "B",
    total_amount: 1,
    totalSpent: 1,
  },
];


