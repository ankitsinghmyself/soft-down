import mongoose from "mongoose";

const softwareCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a software category name"],
  },
  description: {
    type: String,
    required: [false, "Please provide a software category description"],
  },
  image: {
    type: String,
    required: [true, "Please provide a software category image"],
  },
});

const SoftwareCategory =
  mongoose.models.softwareCategories ||
  mongoose.model("softwareCategories", softwareCategorySchema);

export default SoftwareCategory;
