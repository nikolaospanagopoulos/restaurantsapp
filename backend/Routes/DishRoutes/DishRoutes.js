import express from 'express'

import {getDishes} from '../../Controllers/DishControllers/DishControllers.js'

const router = express.Router({mergeParams:true})


router.route('/').get(getDishes)


export default router