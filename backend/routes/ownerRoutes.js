const express = require('express');
const { loginAdmin, getProfile, editAdminProfile, addHomestays, getDestinations, addCabs, addHotel, getMyProperties, registerOwner, loginOwner, editOwnerProfile, getPropertyDetails, getCabDetails, getHomeStayDetails, getHotelDetails, deleteImage, deleteCabImage, editCabData, editHomestayData, editHotelData, deleteCabProperty, deleteHomestayProperty, deleteHotelProperty, getPropertyOrders, deleteHomeStayImage, deleteHotelImage, addBanner, approveOrderStatus, getTypeData, getTypeNumberData, getChartData, getChartsData, getOrderStatuses, getWeekOrders, getPendingOrders, getUsersData } = require('../controllers/ownerControllers')
const router = express.Router()
const upload = require('../middlewares/multer');
const { verifyOwnerToken } = require('../middlewares/ownerMiddlewares/verifyOwnerToken');

router.route("/signup").post(registerOwner)
router.route("/login").post(loginOwner)
router.get("/getprofile/:id",verifyOwnerToken,getProfile)
router.put('/editownerprofile/:id',verifyOwnerToken,editOwnerProfile)

router.post('/addhomestay',verifyOwnerToken,addHomestays)
router.post('/addhotel',verifyOwnerToken,addHotel)
router.post('/addcabs',verifyOwnerToken,addCabs)
router.get('/getdestinations',getDestinations)
router.get('/getmyproperties/:id',verifyOwnerToken,getMyProperties)
router.get('/getcabdetails/:id',verifyOwnerToken,getCabDetails)
router.get('/gethomestaydetails/:id',getHomeStayDetails)
router.get('/gethoteldetails/:id',verifyOwnerToken,getHotelDetails)
router.post('/deletecabimage',verifyOwnerToken, deleteCabImage);
router.post('/deletehomestayimage',verifyOwnerToken, deleteHomeStayImage);
router.post('/deletehotelimage',verifyOwnerToken, deleteHotelImage);
router.post('/editcabdata',verifyOwnerToken,editCabData)
router.post('/edithomestaydata',verifyOwnerToken,editHomestayData)
router.post('/edithoteldata',verifyOwnerToken,editHotelData)
router.delete('/deletecabproperty/:id',verifyOwnerToken,deleteCabProperty)
router.delete('/deletehomstayproperty/:id',verifyOwnerToken,deleteHomestayProperty)
router.delete('/deletehotelproperty/:id',verifyOwnerToken,deleteHotelProperty)
router.get('/getorders/:id/:pagenumber/:dataperpage',verifyOwnerToken,getPropertyOrders)
router.post("/addbanner",verifyOwnerToken,upload.single('image'),addBanner)
router.post('/approveorderstatus/:id',verifyOwnerToken,approveOrderStatus)
router.get('/gettypedata/:id',verifyOwnerToken,getTypeData)
router.get('/getchartdata/:id',verifyOwnerToken,getChartsData)
router.get('/gettypenumber/:id',verifyOwnerToken,getTypeNumberData)
router.get('/getorderstatuses/:id',verifyOwnerToken,getOrderStatuses)
router.get('/getweekorders/:id',verifyOwnerToken,getWeekOrders)
router.get('/getpendingordercount/:id',verifyOwnerToken,getPendingOrders)
router.get('/getuserdata/:id',verifyOwnerToken,getUsersData)

module.exports = router