const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.register = async (req, res) => {
  try {
    //console.log(req.body)
    if(!req.body){
      res.status(400).json({message: "Data can not be empty"})
    }
    const { userName, email, password } = req.body;

    //Kiểm tra tính hợp lệ của mật khẩu
    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters' });
    }

    // Kiểm tra tính hợp lệ của tên người dùng và email
    const validUsername = /^[a-zA-Z0-9]+$/.test(userName) && userName.length >= 2;
    const validEmail = validator.isEmail(email);
    if (!validUsername || !validEmail) {
      return res.status(400).json({ message: 'Username consists of alphanumeric only and at least 2 characters' });
    }

    // Kiểm tra xem tên người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Kiểm tra xem địa chỉ email đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Tạo một đối tượng người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = new User({ userName, email, password});
    await newUser.save();

    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server erorr' });
  }
};

// Hàm xử lý đăng nhập
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Tìm user dựa trên user name
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'User name not found' });
    }

    // Kiểm tra mật khẩu
    if (password !== user.password) {
      return res.status(400).json({ message: 'Password wrong' });
    }

    // Tạo token khi đăng nhập thành công
    const token = jwt.sign({ id: user._id }, "blogs");

    res.status(200).json({ message: 'Login successfully', token, id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server erorr' });
  }
};


