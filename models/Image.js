import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: ""
        },
        url256: {
            type: String,
            default: ""
        },
        url512: {
            type: String,
            default: ""
        },
        url1024: {
            type: String,
            default: ""
        },
        destination: {
            type: String,
            enum: ["logo", "manager", "product"],
            required: true,
        },
        description: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;