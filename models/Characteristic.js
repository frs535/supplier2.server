import mongoose from "mongoose";

const CharacteristicSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
        index: true,
        },
        name: String,
        fullName: String,
        attributes: [
            {
                property: String,
                value: String
            }
        ]

},
    { timestamps: true }
)

const Characteristic = mongoose.model("Characteristic", CharacteristicSchema);
export default Characteristic;