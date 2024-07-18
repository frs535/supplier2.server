import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
    },
    code: {
        type: String,
        default: ""
    },
    title:{
        type: String,
        default: ""
    },
    icon: {
        type: String,
        default: "UilFolder"
    },
    url: {
        type: String,
        default: "#!"
    },
    sections:[],
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;