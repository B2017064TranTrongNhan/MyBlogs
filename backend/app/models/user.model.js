const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]{2,}$/.test(v); // Kiểm tra xem tên người dùng chỉ chứa các ký tự chữ và số, không có khoảng trắng và có ít nhất 2 ký tự
      },
      message: 'Tên người dùng không hợp lệ',
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
