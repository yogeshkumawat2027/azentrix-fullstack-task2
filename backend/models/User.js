import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
     email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    }, 
} , { timestamps : true});


export default mongoose.model("User" , userSchema);