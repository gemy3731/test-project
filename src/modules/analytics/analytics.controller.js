import { Order } from "../../DB/models/Orders"

const getSalesSummary = async (req, res) => {
    const result = await Order.aggregate(salesSummaryPipeline());
}
const getCategorySummary = async (req, res) => {
    const result = await Order.aggregate(salesByCategoryPipleLine());
}