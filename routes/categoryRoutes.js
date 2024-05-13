const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

//routes
//* CREATE CATEGORY || POST || /api/v1/category/create
router.post("/create", authMiddleware, createCategoryController);

//* GET ALL CATEGORY || GET || /api/v1/category/get-all
router.get("/get-all", getAllCategoryController);

//* UPDATE CATEGORY || PUT || /api/v1/category/update/:id
router.put("/update/:id", authMiddleware, updateCategoryController);

//* DELETE CATEGORY || DELETE || /api/v1/category/delete/:id
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
