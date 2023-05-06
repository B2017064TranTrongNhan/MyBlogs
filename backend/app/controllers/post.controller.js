const Post = require("../models/post.model");

// Lấy danh sách tất cả các post
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").sort({createdAt: -1});
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Lấy thông tin của một post theo id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Lấy danh sách tất cả các post của một user theo id của user đó
exports.getDashboard = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).populate("author").sort({createdAt: -1});
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Thêm mới một post
exports.addPost = async (req, res, next) => {
  try {
    // Tạo object post mới với thông tin được lấy từ request
    const { title, content } = req.body;
    const createdAt = new Date().toISOString();
    const post = new Post({ title, content, author: req.userId, createdAt });

    // Lưu post mới vào database
    const savedPost = await post.save();

    // Trả về thông tin post mới đã được lưu vào database
    res.status(201).json({ message: "Post created!", post: savedPost });
  } catch (error) {
    next(error);
  }
};


exports.updatePost = async (req, res) => {
  try {
    if (!req.body){
      return res.status(400).json({message: "Data to update can not be empty"})
    }
    const { title, content } = req.body;
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findOneAndUpdate({_id: postId, author: userId}, {$set: {title: title, content: content}}, {new : true});

    if (!post) {
      return res.status(404).json({ message: "Post to be updated not found" });
    }

    res.json({ message: "Post to be updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


exports.deletePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findOneAndDelete({ _id: postId, author: userId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post was deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

