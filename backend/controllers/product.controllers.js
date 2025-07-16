const Product = require("../models/product.models");
const upload = require("../middlewares/middlewares.upload");
const path = require("path");

class ProductController {
  // Функция отвечает за создания продукта
  async createProduct(req, res) {
    try {
      // Если multer загрузил файл, он будет в req.file
      let imageUrl = null;
      if (req.file) {
        // Сформируем путь для клиента (например, /uploads/filename)
        imageUrl = `/uploads/${req.file.filename}`;
      }

      // Парсим поля из req.body (тебе возможно надо будет добавить body-parser для multipart/form-data)
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

      // Проверка на уникальность gtin
      const existing = await Product.findOne({ where: { gtin } });
      if (existing) {
        return res
          .status(409)
          .json({ message: "Product with this GTIN already exists" });
      }

      // Важно: name, description, weight, company у тебя JSONB — возможно, из формы они приходят как строки, их нужно распарсить:
      const parsedName = typeof name === "string" ? JSON.parse(name) : name;
      const parsedDescription =
        typeof description === "string" ? JSON.parse(description) : description;
      const parsedWeight =
        typeof weight === "string" ? JSON.parse(weight) : weight;
      const parsedCompany =
        typeof company === "string" ? JSON.parse(company) : company;

      const product = await Product.create({
        name: parsedName,
        description: parsedDescription,
        gtin,
        brand,
        countryOfOrigin,
        weight: parsedWeight,
        company: parsedCompany,
        imageUrl,
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
