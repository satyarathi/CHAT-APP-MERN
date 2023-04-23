import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
   sender: {
      type:  Schema.Types.ObjectId,
      ref: "User"
    },
   content:{
    type: String, time: true
   },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
  },
  {
    timestamps: true
  }
);

export default model('Message', messageSchema);