import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
    {
        name: String,
        organisation: {
            id: String,
            name: String,
            inn: String,
            kpp: String
        },
        account: {
            id: String,
            number: String,
            bank: String,
            swiftbik: String
        },
        phoneNumbers:[
            {
                number: String,
                availableWhatsapp: Boolean
            }
        ],
        emails:[],
        addresses: [],
        telegram: String,
        vk: String,
        workTime: String,
        deliverTerms:[
            {
                deliveryType: String,
                name: String,
                explanation: String
            }
        ],
        priceOfTypes: [
            {
                id: {
                    type: String,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                }
            }
        ],
        warehauses: [
            {
                id: {
                    type: String,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    { timestamps: true }
);

const  Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;