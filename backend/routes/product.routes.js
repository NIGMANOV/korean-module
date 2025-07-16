const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controllers");
const upload = require("../middlewares/middlewares.upload");

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создание продукта
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [gtin, brand, countryOfOrigin, name, description, weight]
 *             properties:
 *               gtin:
 *                 type: string
 *               brand:
 *                 type: string
 *               countryOfOrigin:
 *                 type: string
 *               name:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   fr:
 *                     type: string
 *               description:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   fr:
 *                     type: string
 *               weight:
 *                 type: object
 *                 properties:
 *                   gross:
 *                     type: number
 *                   net:
 *                     type: number
 *                   unit:
 *                     type: string
 *               company:
 *                 type: object
 *     responses:
 *       201:
 *         description: Продукт создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", upload.single("image"), ProductController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить все продукты
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Список продуктов
 */
router.get("/", ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить продукт по ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найден продукт
 *       404:
 *         description: Продукт не найден
 */
router.get("/:id", ProductController.getProductById);

module.exports = router;
