import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            min: 2,
            max: 100,
        },
        lastName: {
            type: String,
            min: 2,
            max: 100,
        },
        login: {
            type: String,
            required: false,
            max: 50,
            //unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        occupation: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        partnerId : {
            type: String,
            required: true
        },
        blocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;