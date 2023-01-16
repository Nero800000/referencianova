


const routes = require("express")

const router =routes.Router()

const userController = require('../controllers/userController')
const verifyToken = require('../helpers/checkToken')

//const {imageUpload}  = require('../helpers/image-ulpload')

router.post("/register",userController.viewData)
router.post('/login', userController.login)
router.get("/checkuser", userController.checkUser) 
router.get("/:id", userController.getUserById) 

router.patch(
    "/edit/:id",
    verifyToken,
    userController.editUser
  );
  



module.exports = router