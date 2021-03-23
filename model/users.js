const User = require('./schemas/user');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findOne({ _id: id });
};

const findByVerifyToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const create = async ({ email, password, subscription, verificationToken }) => {
  const user = new User({ email, password, subscription, verificationToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerifyToken = async (id, verificationToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verificationToken });
};

// const updateAvatar = async (id, avatarURL) => {
//   return await User.updateOne({ _id: id }, { avatarURL });
// };

const updateAvatar = async (id, avatarURL, imgIdCloud) => {
  return await User.updateOne({ _id: id }, { avatarURL, imgIdCloud });
};

module.exports = {
  findByEmail,
  findById,
  findByVerifyToken,
  create,
  updateToken,
  updateVerifyToken,
  updateAvatar,
};
