const express = require('express');
const { registerUser, loginUser, getProfile, editProfile, getDestinations, getFilteredData, paymentHandle, saveOrder, getOrdersData, getBanners, getDestinationPropertiesData, cancelOrder, getOrderDetails, getCoupens, coupenSave, walletOrderChange, stripeOrderChange, getDestinationNames, getDestinationDatas, getOwnersData } = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/userMiddlewares/verifyToken');
const router = express.Router()

router.post("/signup",registerUser)
router.post("/login",loginUser)
router.get("/getprofile/:id",verifyToken,getProfile)
router.put('/editprofile/:id',verifyToken,editProfile)
router.get('/getdestinations',getDestinations)
router.get('/getdestinationdatas/:pagenumber/:dataperpage',verifyToken,getDestinationDatas)
router.get('/getbanners',getBanners)
router.post('/getfiltereddata',getFilteredData)
router.post('/payment',paymentHandle)
router.post('/ordersave',saveOrder)
router.get('/getorders/:id',verifyToken,getOrdersData)
router.get('/destinationproperties/:destination',verifyToken,getDestinationPropertiesData)
router.post('/cancelorder/:id/:type',verifyToken,cancelOrder)
router.get('/getorderdetails/:id',verifyToken,getOrderDetails)
router.get('/getcoupens/:type',verifyToken,getCoupens)
router.post('/coupensave',verifyToken,coupenSave)
router.post('/walletorderchange',verifyToken,walletOrderChange)
router.post('/stripeorderchange',verifyToken,stripeOrderChange)
router.get('/getdestinationnames',verifyToken,getDestinationNames)
router.get('/getownerdata/:id',verifyToken,getOwnersData)

module.exports = router