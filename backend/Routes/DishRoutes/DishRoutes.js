import express from "express";

import {
  getDishes,
  getDish,
  addDish,
  updateDish,
  deleteDish,
} from "../../Controllers/DishControllers/DishControllers.js";

//import protect middleware
import {protect} from '../../Middleware/auth.js'

//import advanced results middleware
import {advancedResults} from '../../Middleware/advancedResults.js'
import {Dish} from '../../Models/DishModel.js'
const router = express.Router({ mergeParams: true });

router.route("/").get(advancedResults(Dish,{
  path: "restaurant",
  select: "name description",
}),getDishes).post(protect,addDish);
router.route("/:id").get(getDish).put(protect,updateDish).delete(protect,deleteDish)

export default router;
