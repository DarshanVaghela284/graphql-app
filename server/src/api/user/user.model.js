import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    unique: true,
    length: 10,
  },
  email: {
    type: String,
    default: null,
    sparse: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  //   display_picture_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Media",
  //     default: null,
  //   },
});

export default mongoose.model("User", userSchema);
