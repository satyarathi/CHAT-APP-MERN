import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullname: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
