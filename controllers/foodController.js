const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    //validation
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    //create a new food obj
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    //save food to db
    await newFood.save();

    //success response
    return res.status(201).send({
      success: true,
      message: "Food Item created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// get all foods from db
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    //validation for foods
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No foods found",
      });
    }
    //success response
    return res.status(200).send({
      success: true,
      message: "All foods fetched successfully",
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all food API",
      error,
    });
  }
};

// get food by id from db
const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    //validation for id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    //get food by id
    const food = await foodModel.findById(foodId);
    //validation for food
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    //success response
    return res.status(200).send({
      success: true,
      message: "Food fetched successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food by ID API",
      error,
    });
  }
};

// get food by restaurant id from db
const getByRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    //validation for id
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not found",
      });
    }
    //get food by restaurant id
    const restaurantFood = await foodModel.find({
      restaurant: restaurantId,
    });
    //validation for food
    if (!restaurantFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    //success response
    return res.status(200).send({
      success: true,
      message: "Food based on restaurant was found",
      restaurantFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food by ID API",
      error,
    });
  }
};

// update food by id from db
const updateFoodByIdController = async (req, res) => {
  try {
    //check food id
    const foodId = req.params.id;
    //validation for id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    //find the food based on the id
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    // get all the details of food obj
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    //update the food in db based on food id
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    //validation for updated food item
    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    //success response
    return res.status(200).send({
      success: true,
      message: "Food updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

//delete food by id
const deleteFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    //validation for id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    //find the food based on the id
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    //delete the food from db
    await foodModel.findByIdAndDelete(foodId);
    //success response
    return res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getByRestaurantByIdController,
  updateFoodByIdController,
  deleteFoodByIdController, 
};
