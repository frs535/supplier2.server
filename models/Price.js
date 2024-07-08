import mongoose from "mongoose";
import { nanoid } from 'nanoid'

const priceSchema = new mongoose.Schema(
    {
        // id: {
        //     type: String,
        //     required: true,
        //     default: () => nanoid(36),
        //     index: { unique: true },
        // },
        partnerId: {
            type: String,
            index: true,
        },
        catalogId: {
            type: String,
            required: true,
            index: true,
        },
        companyId: {
            type: String,
            default: "",
            index: true,
        },
        prices:[
            {
                priority: Number,
                value: {
                    type: Number,
                    default: 0
                },
                includeTax :{
                    type: Boolean,
                    default: false
                },
                currency: String,
                unit: {
                    id: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    }
                },
                multiple: {
                    type: Number,
                    default: 1
                },
                priceTypeId: String
            }
        ]
    },
    { timestamps: true },
);

const Price = mongoose.model("Price", priceSchema,);
export default Price;