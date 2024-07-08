import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
        //index: { unique: true}
    },
    article:String,
    name: String,
    category: String,
    rating: Number,
    factory: String,
    group: String,
    description: String,
    weight: Number,
    length: Number,
    volume: Number,
    area: Number,
    weightName: String,
    volumeName: String,
    lengthName: String,
    areaName: String,
    storeUnit: {
        name: {
            type: String,
            required: true
        },
        id:{
            type: String,
            required: true
        }
    },
    tax: {
        value: String,
        name: String,
        id: String
    },
    searchId: {
        type: String,
        required: true
    },
    attributes: [
        {
            name: String,
            id: String
        }
    ],
},
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;