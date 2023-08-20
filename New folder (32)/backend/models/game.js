import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {},
    numberOfUser: {
      type: Number,
    },
    gameUsers: {
      type: [String],
      default: [],
    },
    requests: {
      type: [String],
      default: [],
    },

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

export default mongoose.model("Game", gameSchema);
