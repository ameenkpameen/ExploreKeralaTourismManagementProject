const express = require('express')
const message_router = express.Router()
const { addMessage, getMessages } = require('../controllers/messageController')

message_router.post('/add' , addMessage)
message_router.get('/:chatId' , getMessages)



module.exports = message_router