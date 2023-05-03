import { Schema, SchemaTypes } from "mongoose";
import { IUser } from "./users.interface";

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    profileImg: {
      type: String,
      required: false,
    },
    dob: {
      type: String || SchemaTypes.Date,
      required: false,
    },
    role: {
      type: [String],
      required: false,
      default: ['USER'],
    },
  },
  { timestamps: true },
);