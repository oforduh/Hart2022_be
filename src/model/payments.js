import mongoose from "mongoose";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

const schema = new mongoose.Schema(
  {
    fName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lName: {
      type: String,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      // validate is inbuilt while validator is a package
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    amount: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },

    // Role
    transactionReference: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", schema);
export default userModel;
