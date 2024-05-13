const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "title is required",
      });
    }
    //create a new category object
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });

    //save category
    await newCategory.save();
    //success response
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create category API",
      error,
    });
  }
};

//get all categories from db
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    //validate categories
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    // success response
    return res.status(200).send({
      success: true,
      message: "All categories fetched successfully",
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
};

//update category by id from db
const updateCategoryController = async (req, res) => {
  try {
    //category Id
    const categoryID = req.params.id;
    if (!categoryID) {
      return res.status(404).send({
        success: false,
        message: "Category ID not found",
      });
    }
    //get old category like title and imageUrl
    const { title, imageUrl } = req.body;

    // get the catrgory from the db
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryID,
      {
        title,
        imageUrl,
      },
      { new: true }
    );

    //validation
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    //success response
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
};

//delete category by id from db
const deleteCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    //validation of category id
    if (!categoryID) {
      return res.status(404).send({
        success: false,
        message: "Category ID not found",
      });
    }
    //check if the category exists
    const category = await categoryModel.findById(categoryID);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    //delete category from db
    await categoryModel.findByIdAndDelete(categoryID);

    //success response
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    consoe.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
