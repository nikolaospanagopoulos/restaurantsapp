import express from 'express'
import { register, login, getMe } from '../../Controllers/authControllers/authControllers.js'
//import protect and special roles middleware
import {protect} from '../../Middleware/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect,getMe)
export default router