import mongoose from 'mongoose';

const AttributeSchema = new mongoose.Schema({
        id:{
            type: String,
            required: true,
            max: 32,
            min: 32,
            unique: true,
            index: true
        },
        name: String,
},
    { timestamps: true }
)

const Attribute = mongoose.model("Attribute", AttributeSchema);
export default Attribute;