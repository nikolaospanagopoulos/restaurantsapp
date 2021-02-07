import express from "express";

import {
  getDishes,
  getDish,
  addDish,
} from "../../Controllers/DishControllers/DishControllers.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getDishes).post(addDish);
router.route("/:id").get(getDish)

export default router;
