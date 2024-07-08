import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        phoneNumber: {
            type: String,
            required: false,
            max: 50,
            unique: true,
            default: ""
        },
        email: {
            type: String,
            required: false,
            max: 50,
            unique: true,
            default: ""
        },
        defaultDeliveryAddress: String,
    },
{ timestamps: true }
);

const  Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;