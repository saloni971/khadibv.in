const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/Product"); // Adjust the path as necessary
const Cart=require("../models/Cart");
const CartItem = require("../models/CartItem");
const isAuthenticated=require("../middlewares/isAuthenticated");


// Home Route (No session check needed here, as it's a public page)
router.get("/", (req, res) => {
  res.render("index", { user: req.session.user || null });
});

// Uniform Route (Ensure user is logged in)
router.get("/uniforms", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Uniforms" category
    const category = await Category.findOne({ name: "uniforms" });

    if (!category) {
      console.error("Category 'Uniforms' not found.");
      return res.status(404).send("Category 'Uniforms' not found.");
    }

    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Uniforms' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Uniforms' category.`);
    }

    res.render("uniforms", { products });
  } catch (err) {
    console.error("Error fetching uniforms:", err);
    res.status(500).send("An error occurred while fetching uniforms.");
  }
});
/// Kurti Route (Ensure user is logged in)
router.get("/kurti", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Kurtis" category
    const category = await Category.findOne({ name: "kurti" });

    if (!category) {
      console.error("Category 'Kurtis' not found.");
      return res.status(404).send("Category 'Kurtis' not found.");
    }

    const products = await Product.find({ category: category._id });

    res.render("kurti", { products });
  } catch (err) {
    console.error("Error fetching kurtis:", err);
    res.status(500).send("An error occurred while fetching kurtis.");
  }
});
//BEDSHEET ROUTE
router.get("/bedsheets", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }
  try {
    const category = await Category.findOne({ name: "bedsheets" });

    if (!category) {
      console.error("Category 'Bedsheets' not found.");
      return res.status(404).send("Category 'Bedsheets' not found.");
    }

    const products = await Product.find({ category: category._id });
    res.render("bedsheet", { products }); // Make sure this matches `bedsheet.ejs`
  } catch (err) {
    console.error("Error fetching bedsheets:", err);
    res.status(500).send("An error occurred while fetching bedsheets.");
  }
});


//PANTS ROUTE
router.get("/pants", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }
  
try {
  const category = await Category.findOne({ name: "pants" });

  if (!category) {
    console.error("Category 'pants' not found.");
    return res.status(404).send("Category 'pants' not found.");
  }

  const products = await Product.find({ category: category._id });
  res.render("pants", { products }); 
} catch (err) {
  console.error("Error fetching pants:", err);
  res.status(500).send("An error occurred while fetching pants.");
}
});
//bags route
router.get("/bags", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }
  
try {
  const category = await Category.findOne({ name: "bags" });

  if (!category) {
    console.error("Category 'bags' not found.");
    return res.status(404).send("Category 'bags' not found.");
  }

  const products = await Product.find({ category: category._id });
  res.render("bags", { products }); 
} catch (err) {
  console.error("Error fetching bags:", err);
  res.status(500).send("An error occurred while fetching bags.");
}
});





// Cart Route (Ensure user is logged in)
router.get("/cart", isAuthenticated, async (req, res) => {
  try {
    console.log("Session Data:", req.session); // Debug session

    if (!req.session.user) {
      console.log("User  not logged in.");
      return res.render("cart", { cart: [] });
    }

    const userId = req.session.user.id; // Access the user ID from the session
    console.log("User  ID:", userId);

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    console.log("Cart Found:", cart);

    if (!cart) {
      console.log("Cart is empty.");
      return res.render("cart", { cart: [] });
    }

    // Get all cart items and populate product data
    const cartItems = await CartItem.find({ cartId: cart._id })
      .populate('productID') // Populate the productID field
      .lean(); // Convert to plain JavaScript objects
    console.log("Cart Items:", cartItems);

    res.render("cart", { cart: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/chat", (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  res.render("chat", { title: "chat" });
});



// Wishlist Route (Ensure user is logged in)
router.get("/wishlist", (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  res.render("wishlist", { title: "Wishlist" });
});

// Get User Route (Check if user is logged in)
router.get("/getUser", (req, res) => {
  console.log("Checking session:", req.session); // Debugging session state

  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false, message: "User not logged in" });
  }
});

module.exports = router;