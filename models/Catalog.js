import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
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
    name:{
        type: String,
        default: ""
    },
    child:[],
});

const Catalog = mongoose.model("Catalog", CatalogSchema);
export default Catalog;