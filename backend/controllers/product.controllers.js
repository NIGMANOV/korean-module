const Product = require("../models/product.models");

class ProductController {
  // Функция отвечает за создания продукта
  async createProduct(req, res) {
    try {
      const {
        name,
        description,
        gtin,
        brand,
        countryOfOrigin,
        weight,
        company,
      } = req.body;

      if (
        !name ||
        !description ||
        !gtin ||
        !brand ||
        !countryOfOrigin ||
        !weight ||
        !company
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existing = await Product.findOne({ where: { gtin } });
      if (existing) {
        return res
          .status(409)
          .json({ message: "Product with this GTIN already exists" });
      }

      const product = await Product.create({
        name,
        description,
        gtin,
        brand,
        countryOfOrigin,
        weight,
        company,
      });

      return res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Функция отвечает за получения всех продуктов
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Функция отвечает за получения продукта по его id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new ProductController();
