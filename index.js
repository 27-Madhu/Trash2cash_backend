import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import verifyToken from "./middleware/verifyToken.js"; // ✅ If not already imported


// Models
import RegisterModel from "./models/Register.js";
import Contact from "./models/contact.js";
import ScrapItem from "./models/ScrapItem.js"; 

// Configs
dotenv.config();
const app = express();
app.use(express.json());

// CORS Setup
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "DELETE", "GET"],
  credentials: true
}));

// File Upload Setup with Multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve Static Files (Uploaded Images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Trash2Cash", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

// ================== ROUTES ================== //

// ✅ Registration Route
app.post('/register', async (req, res) => {
  try {
    const { fname, lname, phone, address, pincode, city, email, password, Cpassword } = req.body;

    if (password !== Cpassword) {
      return res.status(400).json({ error: "❌ Passwords do not match" });
    }

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterModel({
      fname, lname, phone, address, pincode, city, email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "✅ Registration Successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// In your backend (Express) server

app.get("/api/total-users", async (req, res) => {
  try {
    const totalUsers = await RegisterModel.countDocuments();  // Count total number of users
    res.status(200).json({ totalUsers });
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json({ message: "Error fetching user count" });
  }
});



// ✅ Login Route


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RegisterModel.findOne({ email });

    if (!user) {
      return res.status(400).json("❌ User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("❌ Incorrect password");
    }

    // ✅ Just send success
    res.status(200).json("Success");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("❌ Server error");
  }
  // LoginPage.jsx

if (res.data === "Success") {
  const userData = { email }; // ✅ Store email as profile info
  login(userData);            // Save to context
  navigate("/");              // Go to Home
}
});





// ✅ Forgot Password
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await RegisterModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });

    res.json({ message: "✅ Reset link sent!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await RegisterModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ message: "✅ Password reset successful!" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// ✅ Contact Form Submission
app.post("/contact", async (req, res) => {
  const { name, email, number, message } = req.body;

  if (!name || !email || !number || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const contact = new Contact({ name, email, number, message });
    await contact.save();
    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// ✅ Admin: Get All Registrations
app.get("/admin/registers", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ✅ Admin: Delete a Registration
app.delete("/admin/registers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await RegisterModel.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ✅ Admin: Get All Contacts
app.get("/admin/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ✅ Admin: Delete a Contact
app.delete("/admin/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// ✅ Sell Scrap Form Submission (with image upload)

  app.post("/api/sell-scrap", upload.single("itemImage"), async (req, res) => {
    try {
      const { itemName, itemDescription, categoryData, pickupDetails } = req.body;
      const itemImage = req.file ? req.file.filename : null;
  
      const parsedCategories = JSON.parse(categoryData); // Category string -> Object
      const parsedPickup = JSON.parse(pickupDetails); // pickupDetails string -> Object
  
      const categoriesArray = Object.entries(parsedCategories).map(([categoryName, subCats]) => {
        const subcategoryList = Object.entries(subCats).map(([subName, qty]) => ({
          name: subName,
          quantity: qty,
        }));
        return {
          name: categoryName,
          subcategories: subcategoryList,
        };
      });
  
      const newScrapItem = new ScrapItem({
        itemName,
        itemDescription,
        itemImage,
        categories: categoriesArray,
        pickupDetails: parsedPickup, // 👈 Important!
      });
  
      await newScrapItem.save();
      res.status(200).json({ success: true, message: "Scrap item submitted!" });
    } catch (error) {
      console.error("Error submitting scrap:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
  // ✅ Admin: Get All Scrap Orders
  app.get('/api/scrap-orders', async (req, res) => {
    try {
      const orders = await ScrapItem.find(); // ✅ सही Model name
      console.log("Orders fetched:", orders);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching scrap orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
// Your DELETE route
app.delete('/api/admin/delete-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ScrapItem.findByIdAndDelete(id); // ✅ Correct model

    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

// ✅ Get user-specific orders
app.get("/api/my-orders", verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const orders = await ScrapItem.find().sort({ createdAt: -1 });

    // Filter orders where pickupDetails.contact matches the user's email
    const userOrders = orders.filter(
      (order) =>
        order.pickupDetails &&
        order.pickupDetails.contact &&
        order.pickupDetails.contact === userEmail
    );

    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
  
  
  

// ✅ Server Start
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
