const express = require("express");
const router = express.Router();
const AdminControllers = require("../controllers/admin.controllers");

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Создать администратора
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, admin_name]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               admin_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Администратор создан
 *       409:
 *         description: Пользователь уже существует
 */
router.post("/", AdminControllers.createAdmin);

/**
 * @swagger
 * /api/admin/auth:
 *   post:
 *     summary: Авторизация администратора
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       409:
 *         description: Неверные данные
 */
router.post("/auth", AdminControllers.authorization);

/**
 * @swagger
 * /api/admin/otp:
 *   post:
 *     summary: Подтверждение OTP кода
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная верификация
 *       409:
 *         description: Неверный код OTP
 */
router.post("/otp", AdminControllers.isVerified);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Получить всех администраторов
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Список админов
 */
router.get("/", AdminControllers.getAll);

module.exports = router;
