const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// SCHEMAS
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: String,
});

// MODELS
const userModel = mongoose.model("User", userSchema);
const productModel = mongoose.model("Product", productSchema);
const Categoria = mongoose.model("Categoria", categoriaSchema);

// ENDPOINTS

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).json({ message: "Email not found", alert: false });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password", alert: false });
      return;
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", alert: true, data: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// USERS

// Registrar usuario
app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ message: "Email id is already registered", alert: false });
    } else {
      const newUser = new userModel(req.body);
      await newUser.save();
      res.status(200).json({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Obtener usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Obtener usuario por ID
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    
    if (!user) {
      res.status(404).json({ message: "User not found", alert: false });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Modificar usuario
app.put("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
    
    if (!updatedUser) {
      res.status(404).json({ message: "User not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Eliminar usuario
app.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await userModel.findByIdAndRemove(userId);
    
    if (!deletedUser) {
      res.status(404).json({ message: "User not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// CATEGORIAS

// Obtener CATEGORIA
app.get("/categorias", async (req, res) => {
  try {
    const categories = await Categoria.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// CREAR CATEGORIA
app.post("/categorias", async (req, res) => {
  try {
    const newCategoria = new Categoria(req.body);
    await newCategoria.save();
    res.status(201).json({ message: "Categoria created successfully", data: newCategoria });
  } catch (error) {
    console.error("Error creating categoria:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Modificar CATEGORIA
app.put("/categorias/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId;
    const updatedCategoria = await Categoria.findByIdAndUpdate(categoriaId, req.body, { new: true });
    
    if (!updatedCategoria) {
      res.status(404).json({ message: "Categoria not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "Categoria updated successfully", data: updatedCategoria });
  } catch (error) {
    console.error("Error updating categoria:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// ELIMINAR CATEGORIA
app.delete("/categorias/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId;
    const deletedCategoria = await Categoria.findByIdAndRemove(categoriaId);
    
    if (!deletedCategoria) {
      res.status(404).json({ message: "Categoria not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "Categoria deleted successfully", data: deletedCategoria });
  } catch (error) {
    console.error("Error deleting categoria:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// PRODUCTOS


// Obtener productos

app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find({})
      
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});


// Crear producto
app.post("/uploadProduct", async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Modificar producto
app.put("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
    
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Eliminar producto
app.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await productModel.findByIdAndRemove(productId);
    
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found", alert: false });
      return;
    }
    
    res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// API
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.listen(PORT, () => console.log("Server is running at port : " + PORT));
