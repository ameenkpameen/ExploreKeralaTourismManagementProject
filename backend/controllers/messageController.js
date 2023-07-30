const Message = require('../models/messageModel')
const Chat = require('../models/chatModel')

const addMessage = async (req , res , next) => {
      try{
            if(req.body.type){
                  const {chatId , senderId ,text, type} = req.body
                  const message = new Message(
                        {
                              chatId : chatId,
                              senderId : senderId,
                              text : text,
                              type: 'image'
                        }
                  )
                  const result = await message.save()
                  const chatUpdate = await Chat.findByIdAndUpdate(chatId , {$set : {updatedAt : new Date()}})
                  if(result) {
                        res.status(200).json({message : "Added Message" , result : result})
                  } else {
                        res.status(404).json({error : "Failed to send message"})
                  }

                  
            }else{
                  const {chatId , senderId ,text} = req.body
                  const message = new Message(
                        {
                              chatId : chatId,
                              senderId : senderId,
                              text : text
                        }
                  )
                  const result = await message.save()
                  const chatUpdate = await Chat.findByIdAndUpdate(chatId , {$set : {updatedAt : new Date()}})
                  if(result) {
                        res.status(200).json({message : "Added Message" , result : result})
                  } else {
                        res.status(404).json({error : "Failed to send message"})
                  }

            }
      }catch(err) {
            res.status(500).json({error : "Internal server Error"})
      }
}

const getMessages = async (req , res , next) => {
      try{
            const {chatId} = req.params
            const messageData = await Message.find({chatId : chatId})
            if(messageData) {
                  res.status(200).json({message : "Messages" , messageData : messageData})
            } else {
                  res.status(404).json({error : "Failed to fetch messages"})
            }
      }catch(err) {
            res.status(500).json({error : "Internal server Error"})
      }
}

module.exports = {
      addMessage,
      getMessages
}