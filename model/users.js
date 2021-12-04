const User = require('../service/schemas/users')

class UserRepository {
  constructor() {
    this.model = User
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id })
    return result
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email })
    return result
  }

  async findByField(field) {
    const result = await this.model.findOne(field)
    return result
  }

  async create(body) {
    // eslint-disable-next-line new-cap
    const user = new this.model(body)
    return user.save()
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token })
  }

  async updateAvatar(id, avatar, idCloudAvatar) {
    await this.model.updateOne({ _id: id }, { avatar, idCloudAvatar })
  }

  async getAvatar(id) {
    const { avatar, idCloudAvatar } = await this.model.findOne({ _id: id })
    return { avatar, idCloudAvatar }
  }

  async getCurrentUserInfo(id) {
    const user = await this.model.findOne(
      { _id: id },
      '_id email avatar createdAt subscription'
    )
    return user
  }
}

module.exports = UserRepository

// const updateAvatar = async (id, avatar, idUserCloud = null) => {
//   return await User.updateOne({ _id: id }, { avatar, idUserCloud });
// };

// const getAvatar = async (id) => {
//   const { avatar, idUserCloud } = await User.findOne({ _id: id });
//   return { avatar, idUserCloud };
// };

// const findByField = async (field) => {
//   const result = await User.findOne(field);
//   return result;
// };

// module.exports = {
//   updateAvatar,
//   getAvatar,
//   findByField,
// };
