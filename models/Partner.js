import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        agreementId: String,
        priceTypeId: String,
        deliveryAddress:[
            String
        ],
        manager: {
            id: String,
            name: String,
            phone: String,
            email: String
        },
        companies:[
            {
                id: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                priceTypeId: String,
                inn: String,
                kpp : String,
                contractId: String
            }
        ]
    },
        { timestamps: true }
    );

const Partner = mongoose.model("Partner", partnerSchema);

export default Partner;