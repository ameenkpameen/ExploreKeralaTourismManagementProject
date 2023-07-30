const mongoose = require('mongoose')

const messageSchema =  mongoose.Schema(
      {
            chatId : {
                  type : String
            },
            senderId : {
                  type : String
            },
            text : {
                  type : String
            },
            type : {
                  type : String,
                  default:"text"
            }
      },
      {
            timestamps : true
      }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message