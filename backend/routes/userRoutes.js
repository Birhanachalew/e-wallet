const express = require('express')

const {
  register,
  login,
  currentUser,
  getUsers,
  verify,
  getImage,
  updateProfile,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/current_user').get(protect, currentUser)
router.route('/get_users').get(protect, getUsers)
router.route('/get_image').get(protect, getImage)
router.route('/verify/:id').put(protect, admin, verify)
router.route('/profile').put(protect, updateProfile)

module.exports = router
