import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});


const Contact = mongoose.model("Contact", contactSchema);
export default Contact;  // ✅ Default export
