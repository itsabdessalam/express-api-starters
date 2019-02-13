const router = require('express').Router(),
	UserController = require('../../controllers/UserController');

router.route('/').get(UserController.index).post(UserController.store);
router
	.route('/:id([0-9a-fA-F]{24})')
	.get(UserController.show)
	.put(UserController.update)
	.delete(UserController.destroy);
router.route('/search').get(UserController.search);

module.exports = router;
