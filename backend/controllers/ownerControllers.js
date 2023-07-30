const asyncHandler = require('express-async-handler')
const Owner = require('../models/ownerModel')
// import adminGenerateToken from '../utils/generateToken'
const {adminGenerateToken} = require('../utils/generateToken')
const HomeStay = require('../models/homestayModel')
const Destination = require('../models/destinationModel')
const Cab = require('../models/cabsModel')
const Order = require('../models/ordersModel')
const Hotel = require('../models/hotelModel')
const Banner = require('../models/bannerModal')
const User = require('../models/userModel')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const moment = require('moment');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
  });

const registerOwner = asyncHandler(async (req,res)=>{
    const {firstname, lastname, phonenumber, email, password} = req.body
    const adminExists = await Owner.findOne({ email })
     
    if(adminExists) {
        res.status(400)
        throw new Error(`Owner ${email} already exists`)
    }

    const admin = await Owner.create({
        firstname,
        lastname,
        phonenumber,
        email,
        password
    })


    if(admin){
        res.status(201).json({
            _id:admin._id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            phonenumber: admin.phonenumber,
            email: admin.email,
            token:adminGenerateToken(admin._id),
            isAdmin:admin.isAdmin,
            isSuperAdmin: admin.isSuperAdmin
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }
})


const loginOwner = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    const owner = await Owner.findOne({ email })
     
    if(owner && (await owner.matchPassword(password))){
        const token = adminGenerateToken(owner._id)
        res.json({
            _id:owner._id,
            firstname: owner.firstname,
            lastname: owner.lastname,
            phonenumber: owner.phonenumber,
            email: owner.email,
            status: owner.status,
            token:token
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password !')
    }

    
})




const getProfile = async(req,res)=>{
    const id = req.params.id
    const owner = await Owner.findOne({ _id:id })
    if(owner){
        res.json({
            owner:owner
        })
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }
}



const editOwnerProfile = async(req,res)=>{
    const id = req.params.id

    const data = await Owner.findOneAndUpdate({ _id:id },{
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
            image: req.body.image_url,
            public_id: req.body.public_id
    }},{new:true})

    if(data){
        res.status(201).json({
            data
        })
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }
}



const addHomestays = async(req,res)=>{
    try{
        const {admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,description} = req.body
        
                const document = newDocument.documentData
                const images = newImages.urlArray
                const propertyExists = await HomeStay.findOne({ propertyname,destination,address })
    
                if(propertyExists) {
                    res.status(400)
                    throw new Error(`Property ${propertyname} already exists`)
                }
            
                const data = await HomeStay.create({ 
                    propertyholder:admin_id,
                    propertyname,
                    destination,
                    district,
                    address,
                    description,
                    type,
                    capacity,
                    baseprice,
                    netprice,
                    images: images,
                    document:document
                })
            
                if(data){
                    res.status(201).json({
                        success:true,
                        _id:data._id,
                        propertyname:data.propertyname,
                        destination:data.destination,
                        district:data.district,
                        address:data.address,
                        description:data.description,
                        type:data.type,
                        capacity:data.capacity,
                        baseprice:data.baseprice,
                        netprice:data.netprice,

                    })
                }else{
                    res.status(400)
                    throw new Error('Occured an error !')
                }
        
        
    }catch(error){
        console.log(error);
    }
    
}



const addHotel = async(req,res)=>{
    try{
        const {admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,description,numberOfRooms} = req.body
        
                const document = newDocument.documentData
                const images = newImages.urlArray
                const propertyExists = await HomeStay.findOne({ propertyname,destination,address })
    
                if(propertyExists) {
                    res.status(400)
                    throw new Error(`Property ${propertyname} already exists`)
                }
            
                const data = await Hotel.create({ 
                    propertyholder:admin_id,
                    propertyname,
                    destination,
                    district,
                    address,
                    description,
                    type,
                    capacity,
                    numberOfRooms,
                    baseprice,
                    netprice,
                    images: images,
                    document:document
                })
            
                if(data){
                    res.status(201).json({
                        success:true,
                        _id:data._id,
                        propertyname:data.propertyname,
                        destination:data.destination,
                        district:data.district,
                        address:data.address,
                        description:data.description,
                        type:data.type,
                        capacity:data.capacity,
                        baseprice:data.baseprice,
                        netprice:data.netprice,
                    })
                }else{
                    res.status(400)
                    throw new Error('Occured an error !')
                }
        
        
    }catch(error){
        console.log(error);
    }
    
}



const addCabs = async(req,res)=>{
    try{
        const {admin_id,registerNumber,brandname,modelname,destination,district,seatingCapacity,fuelType,minCharge,extraFair,newDocument,newImages} = req.body
                const document = newDocument.documentData
                const images = newImages.urlArray
                const propertyExists = await Cab.findOne({ registerNumber })
    
                if(propertyExists) {
                    res.status(400)
                    throw new Error(`Property ${registerNumber} already exists`)
                }
            
                const data = await Cab.create({ 
                    propertyholder:admin_id,
                    registerNumber,
                    brandname,
                    modelname,
                    destination,
                    district,
                    seatingCapacity,
                    minCharge,
                    fuelType,
                    extraFair,
                    images: images,
                    document:document
                })
            
                if(data){
                    res.status(201).json({
                        success: true,
                        registerNumber:data.registerNumber,
                        brandname:data.brandname,
                        modelname:data.modelname,
                        destination:data.destination,
                        district:data.district,
                        seatingCapacity:data.seating,
                        minCharge:data.minCharge,
                        fuelType:data.fuelType,
                        extraFair:data.extraFai
                    })
                }else{
                    res.status(400)
                    throw new Error('Occured an error !')
                }
        
        
    }catch(error){
        console.log(error);
    }
    
}



const getDestinations = async(req, res) =>{
    try{

        const destinationdata = await Destination.find({status:'active'})
        if(destinationdata){
            res.status(201).json({
                destinationdata
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }
}



const getMyProperties = async(req, res) =>{
    try{
        const id = req.params.id
        const cabsdata = await Cab.find({propertyholder:id})
        const homestaydata = await HomeStay.find({propertyholder:id})
        const hoteldata = await Hotel.find({propertyholder:id})
        
        if(cabsdata && homestaydata && hoteldata){
            res.status(201).json({
                cabsdata:cabsdata,
                homestaydata:homestaydata,
                hoteldata:hoteldata
            })
        }

    }catch(error){
        console.log(error);
    }
}



const getCabDetails = async(req, res) =>{
    try{
        const id = req.params.id
        const cabsdata = await Cab.find({_id:id})
        

        if(cabsdata){
            res.status(201).json({
                cabsdata:cabsdata,
            })
        }

    }catch(error){
        console.log(error);
    }
}



const getHomeStayDetails = async(req, res) =>{
    try{
        const id = req.params.id
        const homestaydata = await HomeStay.find({_id:id})
        
        if(homestaydata){
            res.status(201).json({
                homestaydata:homestaydata,
            })
        }

    }catch(error){
        console.log(error);
    }
}



const getHotelDetails = async(req, res) =>{
    try{
        const id = req.params.id
        const hoteldata = await Hotel.find({_id:id})
        
        if(hoteldata){
            res.status(201).json({
                hoteldata:hoteldata,
            })
        }

    }catch(error){
        console.log(error);
    }
}



const deleteCabImage = async(req,res)=>{
    try {
        const { public_id, id } = req.body;
        const result = await cloudinary.uploader.destroy(public_id);
        if(result){
            const finalresult = await Cab.updateOne(
                { _id: id },
                { $pull: { images: { public_id: public_id } } }
              );

            if(finalresult){
                res.status(201).json({
                    success: true
                })
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}


const deleteHomeStayImage = async(req,res)=>{
    try {
        const { public_id, id } = req.body;
        const result = await cloudinary.uploader.destroy(public_id);
        if(result){
            const finalresult = await HomeStay.updateOne(
                { _id: id },
                { $pull: { images: { public_id: public_id } } }
              );

            if(finalresult){
                res.status(201).json({
                    success: true
                })
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

const deleteHotelImage = async(req,res)=>{
    try {
        const { public_id, id } = req.body;
        const result = await cloudinary.uploader.destroy(public_id);
        if(result){
            const finalresult = await Hotel.updateOne(
                { _id: id },
                { $pull: { images: { public_id: public_id } } }
              );

            if(finalresult){
                res.status(201).json({
                    success: true
                })
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}



const editCabData = async(req,res)=>{
    try {
        const id = req.body.cabData._id
        const data = await Cab.findOneAndUpdate(
            {_id:id},
            req.body.cabData,
            {new:true}
            )

        if(data){
            res.status(201).json({
                data
            })
        }
    } catch (error) {
       console.log(error);   
    }
}



const editHomestayData = async(req,res)=>{
    try {
        const id = req.body.homestayData._id
        const data = await HomeStay.findOneAndUpdate(
            {_id:id},
            req.body.homestayData,
            {new:true}
            )

        if(data){
            res.status(201).json({
                data
            })
        }
    } catch (error) {
       console.log(error);   
    }
}



const editHotelData = async(req,res)=>{
    try {
        const id = req.body.hotelData._id
        const data = await Hotel.findOneAndUpdate(
            {_id:id},
            req.body.hotelData,
            {new:true}
            )

        if(data){
            res.status(201).json({
                data
            })
        }
    } catch (error) {
       console.log(error);   
    }
}



const deleteCabProperty = async(req,res)=>{
    try {
        const id = req.params.id
        const result = await Cab.deleteOne({ _id: id })
        if(result){
            res.status(201).json({
                data:result
            })
        }
    } catch (error) {
        console.log(error);
    }
}




const deleteHomestayProperty = async(req,res)=>{
    try {
        const id = req.params.id
        const result = await HomeStay.deleteOne({ _id: id })
        if(result){
            res.status(201).json({
                data:result
            })
        }
    } catch (error) {
        console.log(error);
    }
}




const deleteHotelProperty = async(req,res)=>{
    try {
        const id = req.params.id
        const result = await Hotel.deleteOne({ _id: id })
        if(result){
            res.status(201).json({
                data:result
            })
        }
    } catch (error) {
        console.log(error);
    }
}



const getPropertyOrders = async(req,res)=>{
    try {
        const id = req.params.id
        const pageNumber = req.params.pagenumber
        const limit = req.params.dataperpage


        const orderCount = await Order.countDocuments({propertyholder:id})
        const numberOfPages = Math.ceil(orderCount/limit)
        const skippable = (pageNumber -1) * limit
        const orders = await Order.find({propertyholder:id}).skip(skippable).limit(limit).populate('costomer')
        if(orders){
            res.status(201).json({
                orders,
                numberOfPages
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const addBanner = async (req,res)=>{
    const {heading, description,image_url,public_id,productId,createdby,type} = req.body
    const bannerdata = await Banner.create({
        heading,
        description,
        image:image_url,
        public_id,
        productId,
        createdby,
        type,
    })
    if(bannerdata){
        res.status(201).json({
            success:true,
            bannerdata
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

}

const approveOrderStatus = async (req,res)=>{
    const id = req.params.id
    const orderData = await Order.findOneAndUpdate({_id:id},{$set:{status:'approved'}},{new:true})
    
    if(orderData){
        res.status(201).json({
            data:orderData,
            success:true,
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

}


const getTypeData = async(req,res)=>{
    const id = req.params.id
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todayOrders = await Order.countDocuments({
            propertyholder: id, // Match the specific propertyholder id
            createdAt: {
              $gte: today, // createdAt >= today
              $lt: tomorrow // createdAt < tomorrow
            }
          });
        if(todayOrders ===0 || todayOrders >0){
            let totalsOrders = await Order.countDocuments({propertyholder:id})
            if(totalsOrders === 0 || totalsOrders > 0){
                let cabCount = await Cab.countDocuments({propertyholder:id})
                if(cabCount ===0 || cabCount > 0){
                    let homestayCount = await HomeStay.countDocuments({propertyholder:id})
                    if(homestayCount === 0 || homestayCount > 0){
                        let hotelCount = await Hotel.countDocuments({propertyholder:id})
                        if(hotelCount === 0 || hotelCount > 0){
                            let myPropertis = cabCount+homestayCount+hotelCount
                            if(myPropertis ===0 || myPropertis>0){
                                const unlistedCabs = await Cab.countDocuments({propertyholder:id,status:false})
                                const unlistedHomeStays = await HomeStay.countDocuments({propertyholder:id,status:false})
                                const unlistedHotels = await Hotel.countDocuments({propertyholder:id,status:false})
                                let unlistedProperties = unlistedCabs+unlistedHomeStays+unlistedHotels
                                if(unlistedProperties ===0 || unlistedProperties >0){
                                    let pendingOrders = await Order.countDocuments({propertyholder:id,status:"Pending"})
                                    res.status(201).json({
                                        todayOrders:todayOrders,
                                        totalOrders:totalsOrders,
                                        cabCount:cabCount,
                                        homestayCount:homestayCount,
                                        hotelCount:hotelCount,
                                        myPropertis:myPropertis,
                                        unlistedProperties:unlistedProperties,
                                        pendingOrders:pendingOrders
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
        
            
        
        // let Cab = 0
        // let HomeStay = 0
        // let Hotel = 0
        // if(typeData){
        //     typeData.map((element)=>{
        //         if(element.type === 'Cab'){
        //              Cab = Cab+1
        //         }else if(element.type === 'HomeStay'){
        //               HomeStay = HomeStay+1
        //         }else{
        //             Hotel= Hotel+1
        //         }
        //     })
        //     const names = ['Cab','HomeStay','Hotel']
        //     const values = [Cab, HomeStay, Hotel]
        //     res.status(201).json({
        //         names:names,
        //         values:values
        //     })
        // }
    } catch (error) {
        console.log(error);
    }
}


const getChartsData = async(req,res)=>{
    const id = req.params.id
    try {
        let Cab = 0
        let HomeStay = 0
        let Hotel = 0
        const typeData = await Order.find({propertyholder:id})
        if(typeData){
            typeData.map((element)=>{
                if(element.type === 'Cab'){
                     Cab = Cab+1
                }else if(element.type === 'HomeStay'){
                      HomeStay = HomeStay+1
                }else{
                    Hotel= Hotel+1
                }
            })
            const names = ['Cab','HomeStay','Hotel']
            const values = [Cab, HomeStay, Hotel]
            res.status(201).json({
                names:names,
                values:values
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const getWeekOrders = async(req,res)=>{
    const id = req.params.id
    try {
        const startDate = moment().subtract(7, 'days').startOf('day');
        const endDate = moment().subtract(1, 'day').endOf('day');
        const daysOfLastWeek = [];
        const cabOrderCount = [];
        const homestayOrderCount = []
        const hotelOrderCount = []

        for (let date = startDate; date <= endDate; date = date.clone().add(1, 'day')) {
            const startOfDay = date.clone().startOf('day');
            const endOfDay = date.clone().endOf('day');
            var orders = await Order.find({
              propertyholder: id,
              type: 'Cab',
              createdAt: { $gte: startOfDay, $lte: endOfDay }
            });
            daysOfLastWeek.push(
                date.format('dddd')
              );
            cabOrderCount.push(orders.length)
        }

        for (let date = startDate; date <= endDate; date = date.clone().add(1, 'day')) {
            const startOfDay = date.clone().startOf('day');
            const endOfDay = date.clone().endOf('day');
            var orders = await Order.find({
              propertyholder: id,
              type: 'HomeStay',
              createdAt: { $gte: startOfDay, $lte: endOfDay }
            });
            homestayOrderCount.push(orders.length)
        }

        for (let date = startDate; date <= endDate; date = date.clone().add(1, 'day')) {
            const startOfDay = date.clone().startOf('day');
            const endOfDay = date.clone().endOf('day');
            var orders = await Order.find({
              propertyholder: id,
              type: 'Hotel',
              createdAt: { $gte: startOfDay, $lte: endOfDay }
            });
            hotelOrderCount.push(orders.length)
        }


          res.status(201).json({
            Days:daysOfLastWeek,
            Cabs:cabOrderCount,
            HomeStays:homestayOrderCount,
            Hotels:hotelOrderCount

          })

    } catch (error) {
        console.log(error);
    }
}


const getPendingOrders = async(req,res)=>{
    const id = req.params.id
    try {
        const count = await Order.countDocuments({propertyholder:id,status:'Pending'})
        if(count){
            res.status(201).json({
                OrderCount:count
            })
        }
    } catch (error) {
        console.log(error);
    }
}



const getOrderStatuses = async(req,res)=>{
    const id = req.params.id
    try {
        let Confirmed = 0
        let Cancelled = 0
        let Pending = 0
        let Approved = 0
        const statusData = await Order.find({propertyholder:id})
        if(statusData){
            statusData.map((element)=>{
                if(element.status === 'confirmed'){
                    Confirmed = Confirmed+1
                }else if(element.status === 'cancelled'){
                    Cancelled = Cancelled+1
                }else if (element.status === 'Pending'){
                    Pending= Pending+1
                }else{
                    Approved=Approved+1
                }
            })
            const names = ['Confirmed','Cancelled','Pending','Approved']
            const values = [Confirmed, Cancelled, Pending, Approved]
            res.status(201).json({
                names:names,
                values:values
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const getTypeNumberData = async(req,res)=>{
    const id = req.params.id
    try {
        let values = []
        const cabNumber = await Cab.countDocuments({ propertyholder: id })
        if(cabNumber){
            values.push(cabNumber)
            const homestayNumber = await HomeStay.countDocuments({ propertyholder: id })
            if(homestayNumber){
                values.push(homestayNumber)
                const hotelNumber = await Hotel.countDocuments({ propertyholder: id })
                if(hotelNumber){
                    values.push(hotelNumber)
                    res.status(201).json({
                        values: values
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}



const getUsersData = async(req, res) =>{
    const id = req.params.id
    try{
        const userData = await User.findOne({_id:id})
        if(userData){
            res.status(201).json({
                userData
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }
}


module.exports = {registerOwner,
                     loginOwner,
                     getProfile,
                     editOwnerProfile,
                     addHomestays,
                     getDestinations,
                     addCabs,addHotel,
                     getMyProperties,
                     getCabDetails,
                     getHomeStayDetails,
                     getHotelDetails,
                     deleteCabImage,
                     deleteHomeStayImage,
                     deleteHotelImage,
                     editCabData,
                     editHomestayData,
                     editHotelData,
                     deleteCabProperty,
                     deleteHomestayProperty,
                     deleteHotelProperty,
                     getPropertyOrders,
                     addBanner,
                     approveOrderStatus,
                     getTypeData,
                     getTypeNumberData,
                     getChartsData,
                     getOrderStatuses,
                     getWeekOrders,
                     getPendingOrders,
                     getUsersData
                     
                    }