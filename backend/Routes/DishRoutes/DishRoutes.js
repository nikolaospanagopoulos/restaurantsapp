import express from "express";

import {
  getDishes,
  getDish,
  addDish,
  updateDish,
} from "../../Controllers/DishControllers/DishControllers.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getDishes).post(addDish);
router.route("/:id").get(getDish).put(updateDish)

export default router;
