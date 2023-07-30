const Chat  = require('../models/chatModel')

const createChat = async (req , res ) => {
    console.log(req.body);
    try {
      const findChat = await Chat.findOne(
            {
                  members : {$all : [req.body.senderId , req.body.receiverId]}
            }
      )

      if(findChat){
            res.status(201).json({
                  exists:true,
                  result:findChat
            })
      }else{
            const newChat = new Chat(
                  {
                        members : [req.body.senderId , req.body.receiverId]
                  }
            )
            
            
                  const result = await newChat.save()
                  if(result) {
                        res.status (200).json({message : "new chat created" , result : result})
                  } else {
                        res.status(404).json({error : "Failed to create chat"})
                  }
            
      }
    }catch(err) {
      res.status(500).json({error : "Internal server Error"})
    }
      
}

const getChat = async (req , res ) => {
    console.log(req.params);
      try {
            const userId = req.params.userId
            const chat = await Chat.find(
                  {
                        members : {$in : [userId]}
                  }
            ).sort({updatedAt : -1})
            if(chat) {
                  res.status(200).json({message : "user chat" , chat : chat} )
            } else {
                  res.status(404).json({error : "No chat history" , chat : false})
            }
      }catch(error) {
            res.status(500).json({error : "Internal server Error"})
      }
}

const findChat = async (req , res ) => {
      try{
            const firstId = req.params.firstId
            const secondId = req.params.secondId

            const chat = await Chat.findOne(
                  {
                        members : {$all : [firstId , secondId]}
                  }
            )
            if(chat) {
                  res.status(200).json({message : "Personal chat" , chat : chat})
            }
      } catch(error) {
            res.status(500).json({error : "Internal server Error"})
      }
}

module.exports = {
      createChat,
      getChat,
      findChat
}