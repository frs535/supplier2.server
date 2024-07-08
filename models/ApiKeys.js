
import mongoose from "mongoose";

const ApiKeysSchema = new mongoose.Schema(
    {
        Key: {
            type: String,
            unique: true
        },

        blocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const ApiKeys = mongoose.model("ApiKeys", ApiKeysSchema);
export default ApiKeys;