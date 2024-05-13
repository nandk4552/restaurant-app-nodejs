const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "title and address are required",
      });
    }
    // create a new restaurant obj
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    //save the new restaurant
    await newRestaurant.save();

    // success response
    return res.status(200).send({
      success: true,
      message: "Restaurant created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create restaurant API",
      error,
    });
  }
};
//get all restaurant controller
const getAllRestaurantController = async (req, res) => {
  try {
    //get all restuarants from db
    const restaurants = await restaurantModel.find({});
    //validation
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    //success response
    return res.status(200).send({
      success: true,
      message: "All restaurants fetched successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all restaurant API",
      error,
    });
  }
};

// get restaurant by ID
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not found",
      });
    }
    console.log(restaurantID);
    // get restaurant by id from DB
    const restaurant = await restaurantModel.findById(restaurantID);

    //validation
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    // success response
    return res.status(200).send({
      success: true,
      message: "Restaurant fetched successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get restaurant by ID API",
      error,
    });
  }
};
// delete restaurant by id from db
const deleteRestaurantByIdController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    // id validation
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not found",
      });
    }
    // check and delete existing restaurant from db
    await restaurantModel.findByIdAndDelete(restaurantID);

    //success response
    return res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete restaurant by ID API",
      error,
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantByIdController,
};
