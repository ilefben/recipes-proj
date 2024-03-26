//import { updatePost}  from "../../client/src/api/index.js";
import RecipePost from "../models/recipeSchema.js";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();
export const getPosts = async (req, res) => {
  try {
    const recipeSchema = await RecipePost.find();
    res.status(200).json(recipeSchema);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await RecipePost.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createRecipe = async (req, res) => {
  const post = req.body;
  const newRecipe = new RecipePost({
   ...post,creator:req.userId,createdAt:new Date().toISOString()
  });

  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, selectedFile, creator, instructions } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id ");

  const updatedPost = {
    title,
    ingredients,
    selectedFile,
    creator,
    instructions,
    _id: id,
  };
  await RecipePost.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });
  res.json(updatedPost);
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that id:${id}`);
  await RecipePost.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated !" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id .");
  const post = await RecipePost.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await RecipePost.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
export default router;
