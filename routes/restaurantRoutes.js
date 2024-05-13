const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantByIdController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//* CREATE RESTAURANT || POST || api/v1/restaurant/create
router.post("/create", authMiddleware, createRestaurantController);

//* GET ALL RESTAURANTS || GET || api/v1/restaurant/get-all
router.get("/get-all", getAllRestaurantController);

//* GET RESTAURANT BY ID || GET || api/v1/restaurant/get/:id
router.get("/get/:id", getRestaurantByIdController);

//* DELETE RESTAURANT BY ID || GET || api/v1/restaurant/delete/:id
router.delete("/delete/:id", authMiddleware, deleteRestaurantByIdController);

module.exports = router;
