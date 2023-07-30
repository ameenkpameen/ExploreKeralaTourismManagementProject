const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const Destination = require('../models/destinationModel')
const Hotel = require('../models/hotelModel')
const Cab = require('../models/cabsModel')
const HomeStay = require('../models/homestayModel')
const {userGenerateToken} = require('../utils/generateToken')
const Order = require('../models/ordersModel')
const Banner = require('../models/bannerModal')
const Coupen = require('../models/coupenModel')
const Owner = require('../models/ownerModel')
require("dotenv").config()
const stripe = require('stripe')(process.env.STRPE_SECRET_TEST)

const registerUser = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {firstname, lastname, phonenumber, email, password} = req.body
    
    const userExists = await User.findOne({ email })
     
    if(userExists) {
        res.status(400)
        throw new Error(`User ${email} already exists`)
    }

    const user = await User.create({
        firstname,
        lastname,
        phonenumber,
        email,
        password
    })


    if(user){
        res.status(201).json({
            _id:user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber,
            email: user.email,
            token:userGenerateToken(user._id),
            isAdmin:user.isAdmin,
            status:user.status,
            isSuperAdmin: user.isSuperAdmin
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

    
})


const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    
    const user = await User.findOne({ email })
     
    if(user && (await user.matchPassword(password))){
        const token = userGenerateToken(user._id)
        res.json({
            _id:user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber,
            email: user.email,
            wallet: user.wallet,
            status:user.status,
            token:token,
            isAdmin:user.isAdmin,
            isSuperAdmin: user.isSuperAdmin
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password !')
    }

    
})


const getProfile = async(req,res)=>{
    const id = req.params.id
    console.log(id);
    const user = await User.findOne({ _id:id })
    if(user){
        if(user.status === 'inActive'){
            res.json({
                user:user,
                blocked:true
            })
        }else{
            res.json({
                user:user
            })
        }
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }
}



const editProfile = async(req,res)=>{
    const id = req.params.id

    const data = await User.findOneAndUpdate({ _id:id },{
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            email: req.body.email
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


const getDestinations = async(req, res) =>{
    console.log(req.body);
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

const getDestinationDatas = async(req, res) =>{
    const pageNumber = req.params.pagenumber
    const limit = req.params.dataperpage
    try{
        const countOfDestination = await Destination.countDocuments({status:'active'})
        const numberOfPages = Math.ceil(countOfDestination/limit)
        const skippable = (pageNumber -1) * limit
        const destinationdata = await Destination.find({status:'active'}).skip(skippable).limit(limit)
        if(destinationdata){
            res.status(201).json({
                destinationdata,
                numberOfPages
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }
}


const getDestinationNames = async(req, res) =>{
    try{
        const nameArray =[]
        const destinationdata = await Destination.find({status:'active'})
        if(destinationdata){
            destinationdata.map((element)=>{
                nameArray.push(element.destination)
            })
            res.status(201).json({
                nameArray: nameArray
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }
}

const getOwnersData = async(req, res) =>{
    const id = req.params.id
    try{
        const ownerData = await Owner.findOne({_id:id})
        if(ownerData){
            res.status(201).json({
                ownerData
            })
        }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
    }catch(error){
        console.log(error);
    }
}


const getBanners = async(req, res) =>{
    try{

        const bannerdata = await Banner.find({status:'list'}).populate('productId')
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


const getFilteredData = async(req,res)=>{
    
   try {
        const newFromDate = new Date(req.body.fromDate)
        const newToDate = new Date(req.body.toDate)
        const dates = [];
        while (newFromDate < newToDate) {
            dates.push(new Date(newFromDate));
            newFromDate.setDate(newFromDate.getDate() + 1);
          }
      if(req.body.type === 'Hotel'){
         const hoteldata = await Hotel.find({status:true,destination:req.body.destination,capacity:{$gte:req.body.numberOfPeople},netprice:{$lte:req.body.priceLimit},
            ordered: {
                $nin: dates
            }
         })
          if(hoteldata){
            res.status(201).json({
                data:hoteldata
            })
          }
      }else if(req.body.type === 'HomeStay'){
        const homestaydata = await HomeStay.find({
            status:true,
            destination: req.body.destination,
            capacity: { $gte: req.body.numberOfPeople },
            netprice: { $lte: req.body.priceLimit },
            ordered: {
                $nin: dates
              }
          })

          if(homestaydata){
            res.status(201).json({
                data:homestaydata
            })
          }
      }else{
        const cabdata = await Cab.find({status:true,destination:req.body.destination,seatingCapacity:{$gte:req.body.numberOfPeople},minCharge:{$lte:req.body.priceLimit},
            ordered: {
                $nin: dates
              }
        })

          if(cabdata){
            res.status(201).json({
                data:cabdata
            })
          }
      }
   } catch (error) {
      console.log(error);
   }
    
}

const paymentHandle = async(req,res)=>{
    let {amount, id} = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"INR",
            description:"ExploreKerala Tourism Partner",
            payment_method:id,
            confirm:true
        })
        res.json({
            message: "Payment Successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error);

        res.json({
            message:"Payment Failed",
            success:false
        })
    }
}


const saveOrder = async(req,res)=>{
    const data = req.body;
     try {
        const newFromDate = new Date(data.fromdate)
        const newToDate = new Date(data.todate)
        const dates = [];
        const saveData = await Order.create({
            propertyholder: data.propertyholder,
            property: data.propertyId,
            costomer: data.costomerId,
            propertyname: data.propertyname,
            destination: data.destination,
            type:data.propertytype,
            fromDate: newFromDate,
            toDate: newToDate,
            numberofdays: data.numberofdays,
            discount:data.discount,
            amountpaid: 0,
            amounttobepaid: data.amountBalance+data.amountpayable
        })

        // if(saveData){
        //     while (newFromDate < newToDate) {
        //         dates.push(new Date(newFromDate));
        //         newFromDate.setDate(newFromDate.getDate() + 1);
        //       }
        //     if(data.propertytype === 'Cab'){
        //         var dateUpdated = await Cab.findOneAndUpdate(
        //           { _id: data.propertyId },
        //           { $push: { ordered: { $each: dates } } },
        //           { new: true }
        //         )
        //     }else if(data.propertytype === 'HomeStay'){
        //         dateUpdated = await HomeStay.findOneAndUpdate(
        //             { _id: data.propertyId },
        //             { $push: { ordered: { $each: dates } } },
        //             { new: true }
        //           )
        //     }else if(data.propertytype === 'Hotel'){
        //         dateUpdated = await Hotel.findOneAndUpdate(
        //             { _id: data.propertyId },
        //             { $push: { ordered: { $each: dates } } },
        //             { new: true }
        //         )
        //     }

        //     if(saveData && data.paymentMethod === 'wallet'){
        //         const walletResult = await User.findOneAndUpdate({_id:data.costomerId},
        //             { $inc: { wallet: -data.amountpayable } },{new:true}
        //             )
        //     }

            if(saveData){
                res.status(201).json({
                    data:saveData
                })
            }else{
            res.status(400)
            throw new Error('Error occured! Please try again')
        }
     } catch (error) {
         console.log(error);  
     }
}


const getOrdersData = async(req,res)=>{
    const id = req.params.id
    try {
        const data = await Order.find({costomer:id}).populate('property')
        if(data){
            data.map( (element)=>{
                const dateToCheck = new Date(element.fromDate);
                const currentDate = new Date();
                if (dateToCheck >= currentDate) {

                  } else {
                    const update = async(element)=>{
                        var updatedDate = await Order.findOneAndUpdate({_id: element._id},{
                            $set:{
                                status: 'delivered'
                            }
                        },{new:true})
                    }
                    update(element)
                  }
            })
            const newdata = await Order.find({costomer:id}).populate('property')
            res.status(201).json({
                data: newdata
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const cancelOrder = async(req,res)=>{
    const id = req.params.id
    const type = req.params.type
    try {
        const data = await Order.findOneAndUpdate({_id:id},{
            $set: {
                status: 'cancelled',
        }},{new:true})
        if(data){
            const updatedUser = await User.findOneAndUpdate ({_id:data.costomer},
                { $inc: { wallet: data.amountpaid } },{new:true}
            )
            const fromDate = new Date(data.fromDate);
            const toDate = new Date(data.toDate);
            const dates = []
            while (fromDate < toDate) {
                dates.push(new Date(fromDate));
                fromDate.setDate(fromDate.getDate() + 1);
              }
            if(type === 'Cab'){
                var dateUpdated = await Cab.findOneAndUpdate(
                    {_id:data.property},
                    {$pull:{ordered: {$in :dates}}},
                    {new:true})
            }else if(type === 'Hotel'){
                dateUpdated = await Hotel.findOneAndUpdate(
                    {_id:data.property},
                    {$pull:{ordered: {$in :dates}}},
                    {new:true})
            }else{
                dateUpdated = await HomeStay.findOneAndUpdate(
                    {_id:data.property},
                    {$pull:{ordered: {$in :dates}}},
                    {new:true})
            }
            
            if(updatedUser && dateUpdated){
                res.status(201).json({
                    data: updatedUser
                })
            }else{
                res.status(400)
            }
        }else{
            res.status(400)
        }
    } catch (error) {
        console.log(error);
    }
}


const getOrderDetails = async(req,res)=>{
    const id = req.params.id
    try {
        const data = await Order.findOne({_id:id}).populate('property')
        if(data){
            res.status(201).json({
                Orderdata: data
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const getCoupens = async(req,res)=>{
    const type = req.params.type
    console.log(type);
    try {
        const today = new Date();
        const data = await Coupen.find({propertytype:type,status:'active',expirydate: { $gt: today }})
        if(data){
            res.status(201).json({
                data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const coupenSave = async(req,res)=>{
    const code = req.body.coupenCode
    const costomer = req.body.costomer
    const price = req.body.price
    try {
        const coupen = await Coupen.findOne({coupencode:code,status:'active'})
        if(coupen){
            if(!coupen.usersused.includes(costomer)){
                const discount = price * coupen.percentage/100
                if(discount > coupen.maxoffer){
                    var lastDiscount = coupen.maxoffer
                }else{
                    lastDiscount = price * coupen.percentage/100
                }
                // const updateCoupen = await Coupen.findOneAndUpdate({coupencode:code},{
                //     $push:{usersused:costomer}
                // })
                if(lastDiscount){
                    res.status(201).json({
                        success:true,
                        discount:lastDiscount
                    })
                }
            }else{
                res.status(201).json({
                    costomer:true
                })
            }
        }else{
            res.status(201).json({
                coupen:true
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}


const getDestinationPropertiesData = async(req,res)=>{
    const destination = req.params.destination
    try {
        const cabData = await Cab.find({destination:destination,status:true})
        const hotelData = await Hotel.find({destination:destination,status:true})
        const homestayData = await HomeStay.find({destination:destination,status:true})
        if(cabData && hotelData && homestayData){
            var combinedArray = [...cabData, ...hotelData, ...homestayData];
        }
        if(combinedArray !== []){
            res.status(201).json({
                combinedArray
            })
        }else{
            res.status(400)
        }
    } catch (error) {
        console.log(error);
    }
}


const walletOrderChange = async(req,res)=>{
    const newFromDate = new Date(req.body.fromDate)
    const newToDate = new Date(req.body.toDate)
    const dates = [];
    const tobepaid = (req.body.amountPayable - req.body.discount)
    try {
        const orderChange = await Order.findOneAndUpdate({_id:req.body.orderId},
            {
                $set:{
                    paymentmethod:'wallet',
                    status:'confirmed',
                    amountpaid:req.body.amountPayable,
                    amounttobepaid:tobepaid,
                    discount:req.body.discount
                }
            },{new:true})
    
            if(orderChange){
                if(req.body.coupenCode !== '' && req.body.discount > 0){
                    const updateCoupen = await Coupen.findOneAndUpdate({coupencode:req.body.coupenCode},{
                            $push:{usersused:req.body.costomerId}
                    })
                }
            }
    
            if(orderChange ){
                        while (newFromDate < newToDate) {
                            dates.push(new Date(newFromDate));
                            newFromDate.setDate(newFromDate.getDate() + 1);
                        }
                        if(req.body.type === 'Cab'){
                            var dateUpdated = await Cab.findOneAndUpdate(
                              { _id: req.body.property },
                              { $push: { ordered: { $each: dates } } },
                              { new: true }
                            )
                        }else if(req.body.type === 'HomeStay'){
                            dateUpdated = await HomeStay.findOneAndUpdate(
                                { _id: req.body.property },
                                { $push: { ordered: { $each: dates } } },
                                { new: true }
                              )
                        }else if(req.body.type === 'Hotel'){
                            dateUpdated = await Hotel.findOneAndUpdate(
                                { _id: req.body.property },
                                { $push: { ordered: { $each: dates } } },
                                { new: true }
                            )
                        }
                    if(orderChange){
                        const walletResult = await User.findOneAndUpdate({_id:req.body.costomerId},
                                        { $inc: { wallet: -req.body.amountPayable } },{new:true}
                                        )
                        if(walletResult){
                            res.status(201).json({
                                data:orderChange,
                                success:true
                            })
                        }
                    }
            }
    } catch (error) {
        console.log(error);
    }
    
}

const stripeOrderChange = async(req,res)=>{
    const newFromDate = new Date(req.body.orderData.fromDate)
    const newToDate = new Date(req.body.orderData.toDate)
    const dates = [];
    const tobepaid = ((req.body.orderData.amounttobepaid)/2 - req.body.discount)
    console.log(req.body);
    try {
        const amountPaid = req.body.orderData.amounttobepaid/2
        const orderChange = await Order.findOneAndUpdate({_id:req.body.orderData._id},
            {
                $set:{
                    paymentmethod:'stripe',
                    status:'confirmed',
                    amountpaid:amountPaid,
                    amounttobepaid:tobepaid,
                    discount:req.body.discount
                }
            },{new:true})

            if(orderChange){
                if(req.body.coupenCode !== '' && req.body.discount > 0){
                    const updateCoupen = await Coupen.findOneAndUpdate({coupencode:req.body.coupenCode},{
                            $push:{usersused:req.body.orderData.costomer}
                    })
                }
            }
            if(orderChange ){
                while (newFromDate < newToDate) {
                    dates.push(new Date(newFromDate));
                    newFromDate.setDate(newFromDate.getDate() + 1);
                }
                if(req.body.orderData.type === 'Cab'){
                    var dateUpdated = await Cab.findOneAndUpdate(
                      { _id: req.body.orderData.property._id },
                      { $push: { ordered: { $each: dates } } },
                      { new: true }
                    )
                }else if(req.body.orderData.type === 'HomeStay'){
                    dateUpdated = await HomeStay.findOneAndUpdate(
                        { _id: req.body.orderData.property._id },
                        { $push: { ordered: { $each: dates } } },
                        { new: true }
                      )
                }else if(req.body.orderData.type === 'Hotel'){
                    dateUpdated = await Hotel.findOneAndUpdate(
                        { _id: req.body.orderData.property._id },
                        { $push: { ordered: { $each: dates } } },
                        { new: true }
                    )
                }
            if(orderChange){
                    res.status(201).json({
                        data:orderChange,
                        success:true
                    })
            }
         }
    } catch (error) {
        console.log(error);
    }
}



module.exports = { registerUser,
                   loginUser,
                   getProfile,
                   editProfile,
                   getDestinations,
                   getFilteredData,
                   paymentHandle,
                   saveOrder,
                   getOrdersData,
                   getBanners,
                   getDestinationPropertiesData,
                   cancelOrder,
                   getOrderDetails,
                   getCoupens,
                   coupenSave,
                   walletOrderChange,
                   stripeOrderChange,
                   getDestinationNames,
                   getDestinationDatas,
                   getOwnersData

                 }