var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

router.route('/').get(UserController.index).post(UserController.create);
router.route('/search').get(UserController.search);
router.route('/:id').get(UserController.show).post(UserController.update).delete(UserController.destroy);

module.exports = router;
