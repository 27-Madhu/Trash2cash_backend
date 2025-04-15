import mongoose from "mongoose";

// ✅ Subcategory Schema
const subCategorySchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

// ✅ Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
  subcategories: [subCategorySchema],
});

// ✅ Pickup Details Schema
const pickupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String }, // Optional
});

// ✅ Main Scrap Item Schema with pickupDetails
const scrapItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String },
    itemImage: { type: String },
    categories: [categorySchema],
    pickupDetails: pickupSchema, // 👈 Added here
  },
  { timestamps: true }
);

// ✅ Exporting the model
const ScrapItem = mongoose.model("ScrapItem", scrapItemSchema);
export default ScrapItem;
