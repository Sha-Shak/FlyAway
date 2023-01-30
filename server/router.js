const router = require('express').Router();
const userController = require('./controllers/users');
const apiController = require('./controllers/api')
const { authMiddleware } = require('./middlewares.js/auth');

router.post('/signin', userController.login);

router.post('/signup', userController.createUser);

router.get('/profile', authMiddleware, userController.profile);
router.get('/airport/:search', apiController.searchAirport );
router.get('/flight-search', apiController.flightSearch)

module.exports = router;