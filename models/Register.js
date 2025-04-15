import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true }, 
});


const RegisterModel = mongoose.model("Register", RegisterSchema);
export default RegisterModel;
