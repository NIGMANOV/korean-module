const express = require("express");
const sequelize = require("./database/sequelize");
const cors = require("cors");
const Admin = require("./models/admin.models");
const Products = require("./models/product.models");
const AdminRoutes = require("./routes/admin.routes");
const ProductRoutes = require("./routes/product.routes");
const { swaggerUi, swaggerSpec } = require("./utils/swagger.utils");
const path = require("path");

const PORT = 3000;
const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Эндпоинты API
app.use("/api/admin", AdminRoutes);
app.use("/api/products", ProductRoutes);

app.listen(PORT, async () => {
  try {
    // Подключение ORM sequelize
    await sequelize.authenticate();
    console.log("Соединение с БД успешно установлено");
    // Поключение таблицы admins
    await Admin.sync({ force: true });
    console.log("Таблица admins создана заново");
    await Products.sync({ force: true });
    // Поключение таблицы products
    console.log("Таблица products создана заново");
    // Консоль для проверки запущен ли сервер по нашему порту или нет
    console.log(`Сервер запущен на порту ${PORT}`);
  } catch (e) {
    console.error("Ошибка подключения к БД:", e.message);
  }
});
