const mongoose = require("mongoose");

//user schema object
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);
