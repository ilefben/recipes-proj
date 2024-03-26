import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  name:String,
  creator: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Export the model directly using export default
const RecipePost = mongoose.model("RecipePost", recipeSchema);
export default RecipePost;
