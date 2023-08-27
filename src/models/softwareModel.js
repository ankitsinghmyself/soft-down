import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a software name"],
    },
    description: {
        type: String,
        required: [false, "Please provide a software description"],
    },
    category: {
        type: String,
        required: [true, "Please provide a software category"],
    },
    link: {
        type: String,
        required: [true, "Please provide a software link"],
    },
    image: {
        type: String,
        required: [true, "Please provide a software image"],
    },
    
})

const Software = mongoose.models.softwares || mongoose.model("softwares", userSchema);

export default Software;