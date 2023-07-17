const express = require('express');
const { loginSuperAdmin, registersuperAdmin, addDestination, getDestinations, getPropertiesNotifications, listItem, getAllUsersList, getAllAdminsList, blockUser, unblockUser, deleteDestImage, editDestination, blockOwner, unblockOwner, blockDestination, unblockDestination, addBanner, getBanners, addCoupen, getCoupens, blockCoupen, unblockCoupen, editCoupen } = require('../controllers/superadminCountrollers');
const router = express.Router()
const upload = require('../middlewares/multer')

router.route("/login").post(loginSuperAdmin)
router.route("/signup").post(registersuperAdmin)
router.post("/adddestination",upload.single('image'),addDestination)
router.post("/addbanner",upload.single('image'),addBanner)
router.get("/getdestinations",getDestinations)
router.get("/getbanners",getBanners)
router.get("/getcoupens",getCoupens)
router.get("/getpropertiesnotifications",getPropertiesNotifications)
router.get("/getallusers",getAllUsersList)
router.get("/getalladmins",getAllAdminsList)
router.post('/listitem/:id',listItem)
router.post('/blockuser/:id',blockUser)
router.post('/unblockuser/:id',unblockUser)
router.post('/blockcoupen/:id',blockCoupen)
router.post('/unblockcoupen/:id',unblockCoupen)
router.post('/blockowner/:id',blockOwner)
router.post('/unblockowner/:id',unblockOwner)
router.post('/blockdestination/:id',blockDestination)
router.post('/unblockdestination/:id',unblockDestination)
router.post('/deletedestinationimage', deleteDestImage);
router.post('/editestination',editDestination)
router.post('/addcoupen',addCoupen)
router.post('/editcoupen',editCoupen)

module.exports = router