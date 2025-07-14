const Admin = require("../models/admin.models");
const otpGenerate = require("../utils/otp.utils");

class AdminControllers {
  // Функция отвечает за создания адина
  async createAdmin(req, res) {
    try {
      const { email, password, admin_name, otp } = req.body;
      if (!email || !password || !admin_name) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const otpCode = otpGenerate();
      const candidate = await Admin.findOne({ where: { email } });

      if (candidate) {
        return res
          .status(409)
          .json({ message: "The user with this email already exists" });
      }

      const newAdmin = {
        admin_name: admin_name,
        email: email,
        password: password,
        otp: otpCode,
      };

      const createAdmin = await Admin.create(newAdmin);

      return res.status(201).json({
        message: "The user was successfully created",
        admin: createAdmin,
      });
    } catch (error) {
      console.error("Error when creating an administrator:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Функция отвечает за проверку верификации аккаунта
  async isVerified(req, res) {
    try {
      const { otp, email } = req.body;

      const candidate = await Admin.findOne({ where: { email } });

      if (!candidate || candidate.otp !== otp) {
        return res.status(409).json({ message: "Incorrect OTP code" });
      }

      candidate.is_verified = true;
      candidate.otp = null;
      await candidate.save();

      return res.status(200).json({
        message: "Verification was successful",
      });
    } catch (error) {
      console.error("Verification failed:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Функция отвечает за авторизацию
  async authorization(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const candidate = await Admin.findOne({ where: { email } });

      if (!candidate) {
        return res
          .status(409)
          .json({ message: "The email or password is incorrect" });
      }

      if (!candidate.is_verified) {
        return res.status(409).json({
          message:
            "Enter the OTP code that was sent to your email for authorization",
        });
      }

      return res.status(201).json({
        message: "You have successfully logged in",
      });
    } catch (error) {
      console.error("Error during authorization:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Функция отвечает за получения всех администраторов сайта
  async getAll(req, res) {
    try {
      const allAdmins = await Admin.findAll();
      return res.status(200).json({
        message: "All site administrators have been receivedl",
        allAdmins,
      });
    } catch (error) {
      console.error("An error has occurred:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new AdminControllers();
