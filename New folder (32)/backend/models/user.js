import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
    },
    father_name: {
      type: String,
    },
    identity_card_number: {
      type: Number,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    role: {
      type: [String],
      default: ["user"],
      enum: ["user", "manager", "boss"],
    },
    phoneNumber: {
      type: Number,
    },
    gender: {
      type: String,
    },
    description: {},
    birthday: {
      type: Number,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    gameRequests: {
      type: [String],
      default: [],
    },
    games: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

export default mongoose.model("User", userSchema);
