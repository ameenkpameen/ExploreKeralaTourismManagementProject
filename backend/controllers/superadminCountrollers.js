const asyncHandler = require('express-async-handler')
const Superadmin = require('../models/superadminModel')
const Destination = require('../models/destinationModel')
const superAdminGenerateToken = require('../utils/generateToken')
const fs = require('fs')
const path = require('path')
const { uploadToCloudinary } = require('../cloudinary')
const Cab = require('../models/cabsModel')
const Hotel = require('../models/hotelModel')
const HomeStay = require('../models/homestayModel')
const User = require('../models/userModel')
const Owner = require('../models/ownerModel')
const Banner = require('../models/bannerModal')
const Coupen = require('../models/coupenModel')
const BASE_URL = 'http://localhost:5000/public/images'
require('dotenv').config();
const cloudinary = require('cloudinary').v2;



const loginSuperAdmin = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    const superadmin = await Superadmin.findOne({ email })
    if(superadmin && (await superadmin.matchPassword(password))){
        res.json({
            _id:superadmin._id,
            firstname: superadmin.firstname,
            lastname: superadmin.lastname,
            phonenumber: superadmin.phonenumber,
            email: superadmin.email,
            token:superAdminGenerateToken(superadmin._id),
            isAdmin:superadmin.isAdmin,
            isSuperAdmin: superadmin.isSuperAdmin
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password !')
    }

    
})


const registersuperAdmin = asyncHandler(async (req,res)=>{
    const {firstname, lastname, phonenumber, email, password} = req.body
    
    const superadminExists = await Superadmin.findOne({ email })
     
    if(superadminExists) {
        res.status(400)
        throw new Error(`SuperAdmin ${email} already exists`)
    }

    const superadmin = await Superadmin.create({
        firstname,
        lastname,
        phonenumber,
        email,
        password
    })


    if(superadmin){
        res.status(201).json({
            _id:superadmin._id,
            firstname: superadmin.firstname,
            lastname: superadmin.lastname,
            phonenumber: superadmin.phonenumber,
            email: superadmin.email,
            token:superAdminGenerateToken(superadmin._id),
            isAdmin:superadmin.isAdmin,
            isSuperAdmin: superadmin.isSuperAdmin
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

    
})



const addDestination = asyncHandler(async (req,res)=>{

            const {destination, district, spots,image_url,public_id} = req.body
            const spot= spots.split(',')
            
            
            const destinationExists = await Destination.findOne({ destination })
            if(destinationExists) {
                res.status(400)
                throw new Error(`Destination ${destination} already exists`)
            }

            const destinationdata = await Destination.create({
                destination,
                district,
                spots:spot,
                image:image_url,
                public_id
            })


            if(destinationdata){
                res.status(201).json({
                    success:true,
                    destinationdata
                })
            }else{
                res.status(400)
                throw new Error('Error occured! Please try again')
            }
    
    
})


const addBanner = asyncHandler(async (req,res)=>{
    const {heading, description,image_url,public_id} = req.body
    const bannerdata = await Banner.create({
        heading,
        description,
        image:image_url,
        public_id
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

})

const addCoupen = asyncHandler(async (req,res)=>{
    const {type, expiry,percentage,maxoffer,coupencode} = req.body

    try {
        const coupenExists = await Coupen.findOne({ coupencode })

            if(coupenExists){
                res.status(201).json({
                    success:false
                })
            }else{
                const coupendata = await Coupen.create({
                    propertytype:type,
                    expirydate:expiry,
                    percentage:percentage,
                    maxoffer:maxoffer,
                    coupencode:coupencode
                })
            
                if(coupendata){
                    res.status(201).json({
                        success:true,
                        coupendata
                    })
                }else{
                    res.status(400)
                    throw new Error('Error occured! Please try again')
                }
            }
    } catch (error) {
        console.log(error);
    }

})


const editCoupen = asyncHandler(async (req,res)=>{
    const {id,type, expiry,percentage,maxoffer,coupencode} = req.body
    const coupendata = await Coupen.findOneAndUpdate({_id:id},{
        $set:
            {
                propertytype:type,
                expirydate:expiry,
                percentage:percentage,
                maxoffer:maxoffer,
                coupencode:coupencode
            }
    })

    if(coupendata){
        res.status(201).json({
            success:true,
            coupendata
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

})




const getDestinations = asyncHandler(async (req,res)=>{

       
    try{

        const destinationdata = await Destination.find({})
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


})



const getBanners = async (req,res)=>{
    try{
        const bannerdata = await Banner.find({})
        if(bannerdata){
            res.status(201).json({
                bannerdata
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }

}



const getCoupens = async (req,res)=>{
    try{
        const coupendata = await Coupen.find({})
        if(coupendata){
            res.status(201).json({
                coupendata
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }

}



const getPropertiesNotifications = asyncHandler(async (req,res)=>{

       
    try{
        
        const cabsData = await Cab.find({status:false}).populate('propertyholder')
        const hotelData = await Hotel.find({status:false}).populate('propertyholder')
        const homestayData = await HomeStay.find({status:false}).populate('propertyholder')
        // console.log(cabsData);
        // console.log(hotelData);
        // console.log(homestayData);
        if(cabsData){
            res.status(201).json({
                cabsData:cabsData,
                homestayData:homestayData,
                hotelData:hotelData
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }


})




const getAllUsersList = asyncHandler(async (req,res)=>{

    try{
        
        const usersdata = await User.find({})
        
        if(usersdata){
            res.status(201).json({
                data:usersdata
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }


})


const getAllAdminsList = asyncHandler(async (req,res)=>{

    try{
        
        const adminsdata = await Owner.find({})
        
        if(adminsdata){
            res.status(201).json({
                adminsdata:adminsdata
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }


})





const listItem = asyncHandler(async(req,res)=>{
     try {
        const id = req.params.id
        console.log("herererer");
        const homestaydata = await HomeStay.findOneAndUpdate({_id:id},{
            $set: {
                status:true
        }},{new:true})

        if(homestaydata){
            console.log("homestaya");
            res.status(201).json({
                data:homestaydata
            })
        }else if(!homestaydata){
            console.log(id);
            console.log("hoteladaa");
            const hotelData = await Hotel.findOneAndUpdate({_id:id},{
                $set: {
                    status:true
            }},{new:true})

            if(hotelData){
                res.status(201).json({
                    data:hotelData
                })
            }else{
                console.log("cabdata");
                const cabData = await Cab.findOneAndUpdate({_id:id},{
                    $set: {
                        status:true
                }},{new:true})

                if(cabData){
                    res.status(201).json({
                        data:cabData
                    })
                }
            }
        }
        
     } catch (error) {
        console.log(error);
     }
})

const blockUser = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await User.findOneAndUpdate({_id:id},{
           $set: {
               status:"inActive"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})

const unblockUser = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await User.findOneAndUpdate({_id:id},{
           $set: {
               status:"active"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})

const blockCoupen = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Coupen.findOneAndUpdate({_id:id},{
           $set: {
               status:"inActive"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})


const unblockCoupen = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Coupen.findOneAndUpdate({_id:id},{
           $set: {
               status:"active"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})


const blockOwner = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Owner.findOneAndUpdate({_id:id},{
           $set: {
               status:"inActive"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})



const unblockOwner = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Owner.findOneAndUpdate({_id:id},{
           $set: {
               status:"active"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})


const deleteDestImage = async(req,res)=>{
    try {
        const { public_id, id } = req.body;
        console.log(public_id,id);
        const result = await cloudinary.uploader.destroy(public_id);
        console.log("result="+result);
        if(result){
            const finalresult = await Destination.updateOne(
                { _id: id },
                { image : null, public_id:null}
              );

            if(finalresult){
                console.log(finalresult);
                res.status(201).json({
                    success: true
                })
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}


const editDestination = async(req,res)=>{
    console.log(req.body);
    const {destination, district, spots,image,public_id} = req.body.destinationData
     
            if (Array.isArray(spots)) {
                var spot= spots
            }else{
                spot= spots.split(',')
            }
            
    const id = req.body.destinationData._id;
    try {
        const result = await Destination.findOneAndUpdate({_id:id},
            {$set:{
                destination,
                district,
                spots: spot,
                image: image,
                public_id,
            }},
            {new:true})
          if(result){
              res.status(201).json({
                  data:result
              })
          }
    } catch (error) {
        console.log(error);
    }
    

}

const blockDestination = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Destination.findOneAndUpdate({_id:id},{
           $set: {
               status:"inActive"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})

const unblockDestination = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Destination.findOneAndUpdate({_id:id},{
           $set: {
               status:"active"
       }},{new:true})

       if(result){
           res.status(201).json({
               data:result
           })
       }
    } catch (error) {
       console.log(error);
    }
})

module.exports = {loginSuperAdmin,
                  registersuperAdmin,
                  addDestination,
                  addBanner,
                  getBanners,
                  getCoupens,
                  getDestinations,
                  getPropertiesNotifications,
                  listItem,
                  getAllUsersList,
                  getAllAdminsList,
                  blockUser,
                  unblockUser,
                  blockOwner,
                  unblockOwner,
                  blockDestination,
                  unblockDestination,
                  deleteDestImage,
                  editDestination,
                  addCoupen,
                  blockCoupen,
                  unblockCoupen,
                  editCoupen
                }