import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
        index: true,
    },
    number: String,
    date: Date,
    manager: {
        id: String,
        name: String,
        phone: String,
        email: String,
    },
    customer: {
        id: String,
        name: String,
    },
    contact: {
        id: String,
        name: String,
    },
    expirationTo: Date,
    currency: String,
    purchaseOfAllProducts: Boolean,
    paymentTerms: String,
    termsOfDelivery: String,
    other: String,
    includesVAT: Boolean,
    customerInformation: String,
    goods:[
        {
            lineNumber: Number,
            product: {
                id: String,
                name: String,
            },
            characteristic: {
                id: String,
                name: String,
            },
            pack: {
                id: String,
                name: String,
            },
            deliveryDate: Date,
            quantity: Number,
            price: Number,
            discountPercent: Number,
            discountAmount: Number,
            amount: Number,
            tax: String,
            amountTaxes: Number,
            comment: String,
        }
    ]
},
    { timestamps: true }
);

const Proposal = mongoose.model("Proposal", ProposalSchema);
export default Proposal;