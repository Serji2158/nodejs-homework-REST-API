const { nanoid } = require("nanoid");
const User = require("../service/schemas/users");
const { findByField } = require("../model/users");

const EmailService = require("./email");
const { ErrorHandler } = require("../helpers/errorHandler");
const UserRepository = require("../model/users");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
require("dotenv").config();

class UserService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
    this.repositories = {
      users: new UserRepository(),
    };
    this.emailService = new EmailService();
  }

  async create(body) {
    const verifyToken = nanoid();
    const { email } = body;

    try {
      await this.emailService.sendEmail(verifyToken, email);
    } catch (e) {
      throw new ErrorHandler(503, e.message, "Service unavailable");
    }

    const data = await this.repositories.users.create({ ...body, verifyToken });
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async getCurrentUserInfo(id) {
    const data = await this.repositories.users.getCurrentUserInfo(id);
    return data;
  }

  async verify({ token }) {
    const user = await this.repositories.users.findByField({
      verifyToken: token,
    });
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null });
      return true;
    }
    return false;
  }

  async repeatVerify(veryfyToken, email) {
    await this.emailService.sendEmail(veryfyToken, email);
  }

  async updateAvatar(id, pathFile) {
    try {
      const { secure_url: avatar, public_id: idCloudAvatar } =
        await this.#uploadCloud(pathFile);
      const oldAvatar = await this.repositories.users.getAvatar(id);

      this.cloudinary.uploader.destroy(
        oldAvatar.idCloudAvatar,
        (err, res) => {}
      );
      await this.repositories.users.updateAvatar(id, avatar, idCloudAvatar);
      await fs.unlink(pathFile);
      return avatar;
    } catch (err) {
      throw new ErrorHandler(500, "Error upload avatar");
    }
  }
  #uploadCloud = (pathFile) => {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        {
          folder: "Avatars",
          transformation: { width: 250, height: 250, crop: "fill" },
        },
        (error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  };

  // Ниже - моя редакция  криейт и верифай///
  // async create(body) {
  //   const verifyToken = nanoid();
  //   const { email, name } = body;
  //   try {
  //     await this.emailService.sendEmail(verifyToken, email, name);
  //   } catch (e) {
  //     throw new ErrorHandler(503, e.message, "Service unavailable");
  //   }
  //   const data = await this.repositories.users.create({ ...body, verifyToken });
  //   return data;
  // }

  // async verify({ token }) {
  //   const user = await this.repositories.users.findByField({
  //     verifyToken: token,
  //   });
  //   if (user) {
  //     await user.updateOne({ verify: true.valueOf, verifyToken: null });
  //     return true;
  //   }
  //   return false;
  // }
}

module.exports = UserService;
