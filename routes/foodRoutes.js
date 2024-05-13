const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getByRestaurantByIdController,
  updateFoodByIdController,
  deleteFoodByIdController,
} = require("../controllers/foodController");
const router = express.Router();

//routes
//* CREATE FOOD || POST || /api/v1/food/create
router.post("/create", authMiddleware, createFoodController);

//* GET ALL FOOD || GET || /api/v1/food/get-all
router.get("/get-all", getAllFoodController);

//* GET FOOD BY ID || GET || /api/v1/food/get/:id
router.get("/get/:id", getFoodByIdController);

//* GET FOOD BY RESTAURANT || GET || /api/v1/food/get-food-by-restaurant/:id
router.get("/get-food-by-restaurant/:id", getByRestaurantByIdController);

//* UPDATE FOOD BY ID || PUT || /api/v1/food/update/:id
router.put("/update/:id", authMiddleware, updateFoodByIdController);

//* DELETE FOOD BY ID || DELETE || /api/v1/food/delete/:id
router.delete("/delete/:id", authMiddleware, deleteFoodByIdController);

module.exports = router;
