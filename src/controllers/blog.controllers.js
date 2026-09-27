import Post from "../models/post.model.js";

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post fetched successfully!",
      post: post,
    });
  } catch (err) {
    console.log(`Error in the getPost controller! ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully!",
      posts: posts,
    });
  } catch (err) {
    console.log(`Error in the getPosts controller! ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const newPost = await Post.create({ title, content });
    return res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post: newPost,
    });
  } catch (err) {
    console.log(`Error in the addPost controller! ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      post: post,
    });
  } catch (err) {
    console.log(`Error in the updatePost controller! ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (err) {
    console.log(`Error in the deletePost controller! ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
