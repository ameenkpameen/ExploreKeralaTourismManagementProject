import axios from "axios";
import superadminaxiosInstance from "../utils/superadminAxiosApi";
import cloudinaryUpload from "../utils/cloudinaryAPI";



export const superAdminLogin = (email,password)=> superadminaxiosInstance.post(`/superadmin/login`,{email,password})
export const superAdminAddCoupen = (type,expiry,percentage,maxoffer,coupencode)=> superadminaxiosInstance.post(`/superadmin/addcoupen`,{type,expiry,percentage,maxoffer,coupencode})
export const superAdminAddDestination = (formData,config)=>superadminaxiosInstance.post(`/superadmin/adddestination`,formData,config)
export const superAdminAddBanner = (formData,config)=>superadminaxiosInstance.post(`/superadmin/addbanner`,formData,config)
export const superAdminEditCoupen = (id,type,expiry,percentage,maxoffer,coupencode)=>superadminaxiosInstance.post(`/superadmin/editcoupen`,{id,type,expiry,percentage,maxoffer,coupencode})
export const superAdminGetAdmins = (pageNumber,dataPerPage)=>superadminaxiosInstance.get(`/superadmin/getalladmins/${pageNumber}/${dataPerPage}`)
export const superAdminGetBanners = ()=>superadminaxiosInstance.get(`/superadmin/getbanners`)
export const superAdminGetCoupens = ()=>superadminaxiosInstance.get(`/superadmin/getcoupens`)
export const superAdminGetUsers = (pageNumber,dataPerPage)=>superadminaxiosInstance.get(`/superadmin/getallusers/${pageNumber}/${dataPerPage}`)
export const superAdminBlockOwner = (id)=> superadminaxiosInstance.post(`/superadmin/blockowner/${id}`)
export const superAdminUnBlockOwner = (id)=> superadminaxiosInstance.post(`/superadmin/unblockowner/${id}`)
export const superAdminBlockUser = (id)=> superadminaxiosInstance.post(`/superadmin/blockuser/${id}`)
export const superAdminUnBlockUser = (id)=> superadminaxiosInstance.post(`/superadmin/unblockuser/${id}`)
export const superAdminListBanner = (id)=> superadminaxiosInstance.post(`/superadmin/listbanner/${id}`)
export const superAdminUnListBanner = (id)=> superadminaxiosInstance.post(`/superadmin/unlistbanner/${id}`)
export const superAdminBlockCoupen = (id)=> superadminaxiosInstance.post(`/superadmin/blockcoupen/${id}`)
export const superAdminUnBlockCoupen = (id)=> superadminaxiosInstance.post(`/superadmin/unblockcoupen/${id}`)
export const superAdminGetDestinations = ()=> superadminaxiosInstance.get(`/superadmin/getdestinations`)
export const superAdminEditDestination = (destinationData)=> superadminaxiosInstance.post(`/superadmin/editestination`,{destinationData})
export const superAdminDeletedestImage = (public_id,id)=> superadminaxiosInstance.post(`/superadmin/deletedestinationimage`,{public_id,id})
export const superAdminBlockDestination = (id)=> superadminaxiosInstance.post(`/superadmin/blockdestination/${id}`)
export const superAdminUnBlockDestination = (id)=> superadminaxiosInstance.post(`/superadmin/unblockdestination/${id}`)
export const superAdminGetPropNotifications = ()=>superadminaxiosInstance.get(`/superadmin/getpropertiesnotifications`)
export const superAdminListItem = (id)=> superadminaxiosInstance.post(`/superadmin/listitem/${id}`)
export const getNumberDatas = ()=> superadminaxiosInstance.get(`/superadmin/getdashboarddata`)



export const uploadCloudinary = (formData)=> axios.post(`${cloudinaryUpload}`,formData);