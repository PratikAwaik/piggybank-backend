const router = require("express").Router();
const usersController = require("../controllers/users");

/* get all users */
router.get("/", usersController.getAllUsers);

/* register user */
router.post("/register", usersController.registerUser);

/* login user */
router.post("/login", usersController.loginUser);

module.exports = router;
