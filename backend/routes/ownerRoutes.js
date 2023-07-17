const express = require('express');
const { loginAdmin, getProfile, editAdminProfile, addHomestays, getDestinations, addCabs, addHotel, getMyProperties, registerOwner, loginOwner, editOwnerProfile, getPropertyDetails, getCabDetails, getHomeStayDetails, getHotelDetails, deleteImage, deleteCabImage, editCabData, editHomestayData, editHotelData, deleteCabProperty, deleteHomestayProperty, deleteHotelProperty, getPropertyOrders, deleteHomeStayImage, deleteHotelImage, addBanner } = require('../controllers/ownerControllers')
const router = express.Router()
const upload = require('../middlewares/multer')

router.route("/signup").post(registerOwner)
router.route("/login").post(loginOwner)
router.get("/getprofile/:id",getProfile)
router.put('/editownerprofile/:id',editOwnerProfile)

router.post('/addhomestay',addHomestays)
router.post('/addhotel',addHotel)
router.post('/addcabs',addCabs)
router.get('/getdestinations',getDestinations)
router.get('/getmyproperties/:id',getMyProperties)
router.get('/getcabdetails/:id',getCabDetails)
router.get('/gethomestaydetails/:id',getHomeStayDetails)
router.get('/gethoteldetails/:id',getHotelDetails)
router.post('/deletecabimage', deleteCabImage);
router.post('/deletehomestayimage', deleteHomeStayImage);
router.post('/deletehotelimage', deleteHotelImage);
router.post('/editcabdata',editCabData)
router.post('/edithomestaydata',editHomestayData)
router.post('/edithoteldata',editHotelData)
router.delete('/deletecabproperty/:id',deleteCabProperty)
router.delete('/deletehomstayproperty/:id',deleteHomestayProperty)
router.delete('/deletehotelproperty/:id',deleteHotelProperty)
router.get('/getorders/:id',getPropertyOrders)
router.post("/addbanner",upload.single('image'),addBanner)

module.exports = router