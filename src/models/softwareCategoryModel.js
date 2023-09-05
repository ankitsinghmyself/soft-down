import mongoose from "mongoose";

const softwareCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a software category name"],
    trim: true,
    maxLength: [50, "Software category name can not be more than 50 characters"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const SoftwareCategory =
  mongoose.models.softwareCategories ||
  mongoose.model("softwareCategories", softwareCategorySchema);

export default SoftwareCategory;
