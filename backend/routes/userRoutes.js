const express = require('express');
const { registerUser, loginUser, getProfile, editProfile, getDestinations, getFilteredData, paymentHandle, saveOrder, getOrdersData, getBanners, getDestinationPropertiesData, cancelOrder, getOrderDetails, getCoupens, coupenSave } = require('../controllers/userControllers');
const router = express.Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.get("/getprofile/:id",getProfile)
router.put('/editprofile/:id',editProfile)
router.get('/getdestinations',getDestinations)
router.get('/getbanners',getBanners)
router.post('/getfiltereddata',getFilteredData)
router.post('/payment',paymentHandle)
router.post('/ordersave',saveOrder)
router.get('/getorders/:id',getOrdersData)
router.get('/destinationproperties/:destination',getDestinationPropertiesData)
router.post('/cancelorder/:id/:type',cancelOrder)
router.get('/getorderdetails/:id',getOrderDetails)
router.get('/getcoupens/:type',getCoupens)
router.post('/coupensave',coupenSave)

module.exports = router