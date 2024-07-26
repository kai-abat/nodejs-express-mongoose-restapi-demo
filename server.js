const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./model/productModel");

// mongodb
// user: dbKai
// password: dbKai1234

// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", () => console.log("connected to database"));

// middleware to understand json
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});
// add product
app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all product
app.get("/product", async (req, res, next) => {
  try {
    const product = await Product.find();
    console.log("product", product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get 1 product by id
app.get("/product/:id", getProduct, (req, res, next) => {
  res.send(res.product);
});

// update
app.put("/product/:id", getProduct, async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any prodyct with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/product/:id", getProduct, async (req, res) => {
  try {
    console.log("getProduct:", res.product);
    console.log("getProduct:", req.body.name);
    console.log("getProduct:", req.body.quantity);
    console.log("getProduct:", req.body.price);
    console.log("getProduct:", req.body.image);
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.quantity && req.body.quantity != null) {
      res.product.quantity = req.body.quantity;
    }
    if (req.body.price && req.body.price != null) {
      res.product.price = req.body.price;
    }
    if (req.body.image && req.body.image != null) {
      res.product.image = req.body.image;
    }

    const updatedProduct = await res.product.save();

    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete
app.delete("/product/:id", getProduct, async (req, res, next) => {
  try {
    await res.product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product || product === null) {
      return res
        .status(404)
        .json({ message: `Cannot find any prodyct with ID ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

// start the express server
mongoose
  .connect(
    "mongodb+srv://dbKai:dbKai1234@cluster0.zwaucls.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("server started"));
  })
  .catch((err) => {
    console.log(err);
  });
