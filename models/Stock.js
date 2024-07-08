import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
    {
        warehouseId: {
            type: String,
            required: true,
            index: true,
        },
        catalogId: {
            type: String,
            required: true,
            index: true,
        },
        specificationId: {
            type: String,
            default: "",
        },
        quantity:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true },
);

const Stock = mongoose.model("Stock", stockSchema,);
export default Stock;