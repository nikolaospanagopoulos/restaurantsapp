import express from "express";

import {
  getDishes,
  getDish,
  addDish,
  updateDish,
  deleteDish,
} from "../../Controllers/DishControllers/DishControllers.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getDishes).post(addDish);
router.route("/:id").get(getDish).put(updateDish).delete(deleteDish)

export default router;
