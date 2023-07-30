const express = require('express')
const chat_router = express.Router()

const { createChat, getChat, findChat } = require('../controllers/chatController')

chat_router.post('/create' , createChat)
chat_router.get('/getchat/:userId', getChat)
chat_router.get('/find/:firstId/:secondId' , findChat)

module.exports = chat_router