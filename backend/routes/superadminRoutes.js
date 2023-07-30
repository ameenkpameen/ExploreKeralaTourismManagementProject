const express = require('express');
const { loginSuperAdmin, registersuperAdmin, addDestination, getDestinations, getPropertiesNotifications, listItem, getAllUsersList, getAllAdminsList, blockUser, unblockUser, deleteDestImage, editDestination, blockOwner, unblockOwner, blockDestination, unblockDestination, addBanner, getBanners, addCoupen, getCoupens, blockCoupen, unblockCoupen, editCoupen, unlistBanner, listBanner, getDashBoardData } = require('../controllers/superadminCountrollers');
const router = express.Router()
const upload = require('../middlewares/multer')
const {verifySuperadminToken} = require('../middlewares/superadminMiddlewares/verifySuperadminToken')

router.route("/login").post(loginSuperAdmin)
router.route("/signup").post(registersuperAdmin)
router.post("/adddestination",upload.single('image'),verifySuperadminToken,addDestination)
router.post("/addbanner",upload.single('image'),verifySuperadminToken,addBanner)
router.get("/getdestinations",verifySuperadminToken,getDestinations)
router.get("/getbanners",verifySuperadminToken,getBanners)
router.get("/getcoupens",verifySuperadminToken,getCoupens)
router.get("/getpropertiesnotifications",verifySuperadminToken,getPropertiesNotifications)
router.get("/getallusers/:pagenumber/:dataperpage",verifySuperadminToken,getAllUsersList)
router.get("/getalladmins/:pagenumber/:dataperpage",verifySuperadminToken,getAllAdminsList)
router.post('/listitem/:id',verifySuperadminToken,listItem)
router.post('/blockuser/:id',verifySuperadminToken,blockUser)
router.post('/unblockuser/:id',verifySuperadminToken,unblockUser)
router.post('/blockcoupen/:id',verifySuperadminToken,blockCoupen)
router.post('/unblockcoupen/:id',verifySuperadminToken,unblockCoupen)
router.post('/unlistbanner/:id',verifySuperadminToken,unlistBanner)
router.post('/listbanner/:id',verifySuperadminToken,listBanner)
router.post('/blockowner/:id',verifySuperadminToken,blockOwner)
router.post('/unblockowner/:id',verifySuperadminToken,unblockOwner)
router.post('/blockdestination/:id',verifySuperadminToken,blockDestination)
router.post('/unblockdestination/:id',verifySuperadminToken,unblockDestination)
router.post('/deletedestinationimage',verifySuperadminToken, deleteDestImage);
router.post('/editestination',verifySuperadminToken,editDestination)
router.post('/addcoupen',verifySuperadminToken,addCoupen)
router.post('/editcoupen',verifySuperadminToken,editCoupen)
router.get('/getdashboarddata',verifySuperadminToken,getDashBoardData)

module.exports = router